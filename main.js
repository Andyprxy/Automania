import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// 1. SETUP SCENE
const scene = new THREE.Scene();

// 2. SETUP CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// 3. SETUP RENDERER
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // IMPORTANT: Allows CSS background to show through if needed
  antialias: true // Makes lines smooth
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. ADD OBJECT (Torus Knot - looks technical and complex)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff88,  // Neon Green to match theme
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

// 5. ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // Rotate the object
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

// 6. RESIZE HANDLER (Keeps 3D full screen when phone rotates)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
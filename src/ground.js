// Import the three.js module
import * as THREE from "three";

// Create a scene, a camera, and a renderer (see previous examples)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set the renderer size to match the window size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer canvas element to the document body
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
// Add some objects to the scene (see other examples)
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Define a function to animate the scene
function animate() {
  // Request the browser to call this function again before the next repaint
  requestAnimationFrame(animate);

  // Update any animations or transformations in the scene (see other examples)


  // Render the scene using the camera
  renderer.render(scene, camera);
}

// Start the animation loop by calling the animate function once
animate();

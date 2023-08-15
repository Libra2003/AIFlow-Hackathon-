import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onKeyPress } from './onKeyPress';
import { onClick_Scatter } from './onClick_Scatter';
import { onMouseMove, onMouseUp } from './onMouseMove';
import { onDoubleClick } from './onDoubleClick';

import "./main.css";

// Create the scene
const scene = new THREE.Scene(); // Create a new 3D scene
scene.background = new THREE.Color(0x87ceeb); // Set the scene background color to sky blue

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Create a perspective camera
camera.position.set(0, 10, 10); // Set the initial camera position

// Create the renderer
const renderer = new THREE.WebGLRenderer(); // Create a WebGL renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set the renderer size to match the window
document.body.appendChild(renderer.domElement); // Append the renderer's DOM element to the body

// Create the plane
const geometry = new THREE.PlaneGeometry(10, 10, 100); // Create a plane geometry
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Create a basic material with white color
const planeMesh = new THREE.Mesh(geometry, material); // Create a mesh with the plane geometry and material
material.side = THREE.DoubleSide; // Set the material to render both sides of the geometry
planeMesh.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
scene.add(planeMesh); // Add the plane mesh to the scene

// Create grid helper
const size = 10; // Set the size of the grid
const divisions = 10; // Set the number of divisions in the grid
const gridHelper = new THREE.GridHelper(size, divisions); // Create a grid helper
gridHelper.position.y = 0.001; // Set the grid slightly above the plane
scene.add(gridHelper); // Add the grid helper to the scene

// Create orbit controls
let controls = new OrbitControls(camera, renderer.domElement); // Create orbit controls for camera interaction

// Create raycaster and mouse vector
const raycaster = new THREE.Raycaster(); // Create a raycaster to cast rays for picking objects
const mouse = new THREE.Vector2(); // Create a 2D vector to store mouse coordinates

const boxMeshes = []; // Array to store box meshes

// Create buttons for actions
const copyButton = document.createElement('button'); // Create a "Copy" button element
copyButton.textContent = 'Copy'; // Set the button text
copyButton.style.position = 'absolute'; // Set button position to absolute
copyButton.style.top = '5px'; // Set top position
copyButton.style.left = '10px'; // Set left position
document.body.appendChild(copyButton); // Add the button to the DOM

// Create "Place" button
const placeButton = document.createElement('button'); // Create a "Place" button element
placeButton.textContent = 'Place'; // Set the button text
placeButton.style.position = 'absolute'; // Set button position to absolute
placeButton.style.top = '60px'; // Set top position
placeButton.style.left = '10px'; // Set left position
document.body.appendChild(placeButton); // Add the button to the DOM

// Create "Cancel" button
const cancelButton = document.createElement('button'); // Create a "Cancel" button element
cancelButton.textContent = 'Cancel'; // Set the button text
cancelButton.style.position = 'absolute'; // Set button position to absolute
cancelButton.style.top = '120px'; // Set top position
cancelButton.style.left = '10px'; // Set left position
document.body.appendChild(cancelButton); // Add the button to the DOM

// Flags for different actions
let copying = false; // Flag for copying action
let placing = false; // Flag for placing action
let selectedBox = null; // Currently selected box
let isDragging = false; // Flag for dragging action
let offset = new THREE.Vector3(); // Offset for dragging

// Button click event listeners
copyButton.addEventListener('click', () => {
    copying = true;
    placing = false;
    copyButton.disabled = true;
    placeButton.disabled = false;
    cancelButton.disabled = false;
});

placeButton.addEventListener('click', () => {
    placing = true;
    copying = false;
    copyButton.disabled = false;
    placeButton.disabled = true;
    cancelButton.disabled = false;
    console.log(placing);
});

cancelButton.addEventListener('click', () => {
    copying = false;
    placing = false;
    copyButton.disabled = false;
    placeButton.disabled = false;
    cancelButton.disabled = true;
});


window.addEventListener('dblclick', (event) => {
    const result = onDoubleClick(event, placing, isDragging, mouse, raycaster, camera, selectedBox, offset, controls, boxMeshes, planeMesh, camera);
    controls = result.controls;
    isDragging = result.isDragging;
    selectedBox = result.selectedBox;
    console.log("main: ", isDragging);
}, false);

window.addEventListener('mousemove', (event) => {

    onMouseMove(event, isDragging, selectedBox, mouse, raycaster, planeMesh, camera, offset, controls);
    console.log("mouseMove: "+ isDragging);
    console.log("selectedBox: "+ selectedBox);


}, false);

window.addEventListener('click', (event) => {
 
     onClick_Scatter(event, mouse, raycaster, camera, planeMesh, placing,copying, boxMeshes, placeButton, scene, cancelButton);
 
}, false);


window.addEventListener('keydown', (event) => {
    onKeyPress(event, selectedBox,geometry);
}, false);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

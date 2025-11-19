import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
camera.position.z = 5;

const controls = new PointerLockControls(camera, document.body);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1,1,1,2);
const material = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
var x = 2;

const planeGeometry = new THREE.PlaneGeometry(100,100);
const planeMaterial = new THREE.MeshBasicMaterial({
	color: 0x808080,
	roughness: 0.8,
	metalness: 0.1
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0,-1,0)
plane.rotation.x = -Math.PI/2
scene.add(plane)

/*
const gridSize = 100; // Size of the grid
const divisions = 10; // Number of divisions along each axis
const colorCenterLine = 0x444444; // Color of the center line (optional)
const colorGrid = 0x888888; // Color of the grid lines (optional)

const gridHelper = new THREE.GridHelper(gridSize, divisions, colorCenterLine, colorGrid);
//const gridHelper = new THREE.GridHelper(gridSize, divisions);
scene.add(gridHelper);
*/
const keysPressed = {};
document.addEventListener('DOMContentLoaded', ()=>{
	document.addEventListener('keydown', (event)=>{
		keysPressed[event.code] = true;
		console.log("Key down detected")
	})
	document.addEventListener('keyup', (event)=>{
		keysPressed[event.code] = false;
		console.log("Key up detected")
	})
});
function animate(){
	cube.rotation.x += 0.01
	cube.rotation.y += 0.01
	const moveSpeed = 0.1;
	const rotateSpeed = 0.01;
	if(keysPressed['KeyW']) {
		camera.translateZ(-moveSpeed);
		console.log("key press event processed")
	}
	if(keysPressed['KeyS']) camera.translateZ(moveSpeed)
	if(keysPressed['KeyA']) camera.translateX(-moveSpeed)
	if(keysPressed['KeyD']) camera.translateX(moveSpeed)

	if(keysPressed['ArrowLeft']) camera.rotation.y += rotateSpeed;
	if(keysPressed['ArrowRight']) camera.rotation.y -= rotateSpeed;
	if(keysPressed['ArrowUp']) camera.rotation.x += rotateSpeed;
	if(keysPressed['ArrowDown']) camera.rotation.x -= rotateSpeed;
	
	if(keysPressed['KeyJ']){
		let geometry = new THREE.BoxGeometry(1,1,1,1,1,2);
		let material = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe: true});
		let cube = new THREE.Mesh(geometry, material);
		cube.position.set(x,0,0)
		x += 2 
		scene.add(cube);
		keysPressed['KeyJ'] = false; 
	}

	renderer.render(scene, camera);
}


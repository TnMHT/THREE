import "./style.css";

import * as THREE from "three";
import gsap from "gsap";

console.log(THREE);
console.log(gsap);

// SCENE
const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");

// GROUP
// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial({ color: "#FFC0CB" })
// );

// const cube2 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial({ color: "#FFC0CB" })
// );
// cube2.position.x = -2;

// const cube3 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial({ color: "#FFC0CB" })
// );
// cube3.position.y = 2;

// group.add(cube1);
// group.add(cube2);
// group.add(cube3);

// CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: "#FFC0CB",
});

// MESH
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.8, -0.5, 1);
scene.add(mesh);

// AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// CAMERA
const sizes = {
	width: 800,
	height: 600,
};
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	1000
);

// SETTING THE CAMERA POSITION
camera.position.set(1, 1, 4);
scene.add(camera);

camera.lookAt(mesh.position);
console.log(mesh.position.distanceTo(camera.position));

// SCALE
mesh.scale.set(2, 0.5, 0.5);

// ROTATE
mesh.rotation.reorder("YXZ"); // BEFORE CHANGING THE ROTATION
mesh.rotation.y = Math.PI / 2;
mesh.rotation.x = Math.PI / 2;
mesh.rotation.z = Math.PI / 2;

// QUATERNION

// RENDERER
const renderer = new THREE.WebGLRenderer({
	canvas: canvas!, // Non-Null assertion
});

renderer.setSize(sizes.width, sizes.height);

let time = Date.now();

// ANIMATIONS

gsap.to(mesh.position, {
	x: 2,
	duration: 1,
	delay: 1,
});

// CLOCK
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);

	// TIME
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	// console.log(deltaTime);

	// Making sure our object moves at a different speed then our frame rate
	mesh.rotation.x = Math.sin(elapsedTime);
	mesh.rotation.y = Math.cos(elapsedTime);
	// Render
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();

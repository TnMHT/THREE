import "./style.css";

import * as THREE from "three";
import gsap from "gsap";
import { OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

console.log(THREE);
console.log(OrbitControls);

// CURSOR
const cursor = {
	x: 0,
	y: 0,
};
window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5); // THE NEGATIVE IS TO INVERT THE AXIS
});

// SCENE
const scene = new THREE.Scene();
const canvas: HTMLElement = document.querySelector(".webgl")!;

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
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({
	color: "#535bf2",
});

// MESH
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.8, -0.5, 1);
scene.add(mesh);

// AXES HELPER
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// CAMERA
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
window.addEventListener("resize", () => {
	// UPDATE SIZES
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// UPDATE CAMERA
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// UPDATE RENDERER
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		document.exitFullscreen();
	}
});
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(
	75, // VERTICAL FOV IN DEGREES
	aspectRatio, // ASPECT RATIO
	0.1, // NEAR - HOW CLOSE THE CAMERA WILL BE
	100 // FAR - HOW FAR THE CAMERA WILL BE
);

// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// ORTHOGRAPHIC CAMERA SPECIFIES HOW FAR THE CAMERA CAN SEE IN EARCH DIRECTION
// const camera = new OrthographicCamera(
// 	-1 * aspectRatio, // LEFT
// 	1 * aspectRatio, // RIGHT
// 	1, // TOP
// 	-1, // BOTTOM
// 	0.1, // NEAR
// 	100 // FAR
// );

// SETTING THE CAMERA POSITION
camera.position.set(0, 0, 3);
scene.add(camera);

camera.lookAt(mesh.position);

// SCALE
mesh.scale.set(1, 1, 1);

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //

// ANIMATIONS

// GSAP
// gsap.to(mesh.position, {
// 	x: 2,
// 	duration: 1,
// 	delay: 1,
// });
let time = Date.now();
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
	// mesh.rotation.z = Math.sin(elapsedTime);
	mesh.rotation.y = Math.cos(elapsedTime);

	// UPDATE CAMERA
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(mesh.position);

	// UPDATE CONTROLS
	controls.update;
	// RENDER
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();

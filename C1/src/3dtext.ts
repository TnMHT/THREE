import './style.css';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// SCENE
const scene = new THREE.Scene();
const canvas: HTMLElement = document.querySelector('.webgl')!;

// AXES HELPER,
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const fontLoader = new FontLoader();
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/7.png');

fontLoader.load(
	// resource URL
	'/Space-Grotesk.json',

	// onLoad callback
	(font) => {
		// CREATING TEXT GEOMETRY
		console.log(font);
		const textGeometry = new TextGeometry('Hello THREE', {
			font: font,
			size: 0.5,
			height: 0.2,
			curveSegments: 5,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5,
		});
		textGeometry.computeBoundingBox();
		textGeometry.center();
		const material = new THREE.MeshMatcapMaterial({
			matcap: matcapTexture,
		});
		const text = new THREE.Mesh(textGeometry, material);
		scene.add(text);

		const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 30, 45);
		for (let i = 0; i < 500; i++) {
			const donut = new THREE.Mesh(donutGeometry, material);
			donut.position.x = (Math.random() - 0.5) * 10;
			donut.position.y = (Math.random() - 0.5) * 10;
			donut.position.z = (Math.random() - 0.5) * 10;
			donut.rotation.x = Math.random() * Math.PI;
			donut.rotation.y = Math.random() * Math.PI;

			const scale = Math.random();
			donut.scale.set(scale, scale, scale);

			scene.add(donut);
		}
	}
);

// CAMERA
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(
	75, // VERTICAL FOV IN DEGREES
	aspectRatio, // ASPECT RATIO
	0.1, // NEAR - HOW CLOSE THE CAMERA WILL BE
	100 // FAR - HOW FAR THE CAMERA WILL BE
);
camera.position.set(0, 0, 3);
scene.add(camera);
// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// RENDERER
const renderer = new THREE.WebGLRenderer({
	canvas: canvas!, // Non-Null assertion
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //
renderer.render(scene, camera);

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();

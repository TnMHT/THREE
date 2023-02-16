import './style.css'


import * as THREE from 'three';

console.log(THREE)


//
const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl')
// BLACK CUBE
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: '#FFC0CB'
})


// MESH
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// CAMERA
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(
    75, sizes.width / sizes.height,
    0.1, 1000
)
camera.position.z = 3
camera.position.x 
scene.add(camera)

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
}); 
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)


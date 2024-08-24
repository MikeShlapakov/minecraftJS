import * as THREE from './node_modules/three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// renderer setup 
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor("#55bbff")
document.body.appendChild(renderer.domElement);

// camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
camera.position.set(2,2,2)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0,0,0);
controls.update();
// scene setup
const scene = new THREE.Scene();

let sun;
function setupLights() {
    sun = new THREE.DirectionalLight();
    sun.intensity = 1.5;
    sun.position.set(50, 50, 50);
    sun.castShadow = true;

    // Set the size of the sun's shadow box
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 200;
    sun.shadow.bias = -0.0001;
    sun.shadow.mapSize = new THREE.Vector2(2048, 2048);
    scene.add(sun);
    scene.add(sun.target);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.2;
    scene.add(ambient);
}

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color: "#aabbcc"});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

function animation(){
    requestAnimationFrame(animation)

    renderer.render(scene, camera)
}

setupLights();
animation();
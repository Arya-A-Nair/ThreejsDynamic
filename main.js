import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	80,
	window.innerWidth / innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const cylinder = new THREE.CylinderGeometry(2, 2, 10, 100);
const cylinder2 = new THREE.CylinderGeometry(2, 0, 5, 100);
const material = new THREE.MeshStandardMaterial({
	color: 0xff6347,
});
const hemisphere=new THREE.SphereGeometry(2)

const cylinderMesh = new THREE.Mesh(cylinder, material);
const cylinder2Mesh = new THREE.Mesh(cylinder2, material);
const hemisphereMesh=new THREE.Mesh(hemisphere,material)
cylinderMesh.position.set(0, 5, 0);
cylinder2Mesh.position.set(0, -2.5, 0);
hemisphereMesh.position.set(0,10,0)

scene.add(cylinderMesh, cylinder2Mesh,hemisphereMesh);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 0, 0);
// scene.add(pointLight);
let color=0x1db8ce
const Spotlight = new THREE.AmbientLight(color, 0.8);
const gridHelper = new THREE.GridHelper(200, 50,);

scene.add(gridHelper, Spotlight);

const controls = new OrbitControls(camera, renderer.domElement);



document.querySelectorAll('input[type=color]').forEach(function(picker) {

  var targetLabel = document.querySelector('label[for="' + picker.id + '"]'),
    codeArea = document.createElement('span');

  codeArea.innerHTML = picker.value;
  targetLabel.appendChild(codeArea);

  picker.addEventListener('change', function() {
    codeArea.innerHTML = picker.value;
    targetLabel.appendChild(codeArea);
    color=picker.value
  });
});


function animate() {
	requestAnimationFrame(animate);
	controls.update;
  Spotlight.color.set(color)
	renderer.render(scene, camera);
}
animate();



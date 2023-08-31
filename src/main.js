import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import starsTexture from '../assets/img/stars.jpg';
import sunTexture from '../assets/img/sun.jpg';
import mercuryTexture from '../assets/img/mercury.jpg';
import venusTexture from '../assets/img/venus.jpg';
import earthTexture from '../assets/img/earth.jpg';
import marsTexture from '../assets/img/mars.jpg';
import jupiterTexture from '../assets/img/jupiter.jpg';
import saturnTexture from '../assets/img/saturn.jpg';
import staurnRingTexture from '../assets/img/saturn ring.png';
import uranusTexture from '../assets/img/uranus.jpg';
import uranusRingTexture from '../assets/img/uranus ring.png';
import neptuneTexture from '../assets/img/neptune.jpg';
import plutoTexture from '../assets/img/pluto.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);

// camera
camera.position.set( -90 ,140, 140 );
orbit.update();

//ambient light
const ambientLight = new THREE.AmbientLight(0x33333);
scene.add( ambientLight );

//stars as background
const cubeTexturerLoader = new THREE.CubeTextureLoader();
scene.background = cubeTexturerLoader.load( [
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture,
	starsTexture
] );

// texture loader for every planets and sun
const textureLoader = new THREE.TextureLoader();

// THE SUN 
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial( {
	map : textureLoader.load(sunTexture)
} );
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add( sun );

// the mercury

const mercuryGeo = new THREE.SphereGeometry(3.6, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial( {
	map : textureLoader.load(mercuryTexture)
} );
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
sun.add( mercury );
mercury.position.x = 28;


//point light 

const pointLight = new THREE.PointLight( 0xFFFFFF, 2, 1400 );
//pointLight.position.set( 50, 50, 50 );
scene.add( pointLight );

function animate() {
	sun.rotateY(0.004);
	mercury.rotateY(0.004);
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

// function animate() {
// 	requestAnimationFrame( animate );
// 	renderer.render( scene, camera );
// }
// animate();


// window resize
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight )
} )
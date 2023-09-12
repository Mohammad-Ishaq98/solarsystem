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
import saturnRingTexture from '../assets/img/saturn ring.png';
import uranusTexture from '../assets/img/uranus.jpg';
import uranusRingTexture from '../assets/img/uranus ring.png';
import neptuneTexture from '../assets/img/neptune.jpg';
import plutoTexture from '../assets/img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


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

//create planet function 

function creatPlanetFunction ( size, texture, position , ring) { 
	const geo = new THREE.SphereGeometry(size, 30 ,30);
	const mat = new THREE.MeshStandardMaterial( {
		map : textureLoader.load(texture)
	} );
	const mesh = new THREE.Mesh(geo, mat);
	const obj = new THREE.Object3D();
	scene.add(obj);
	//ring logic
	if (ring) {
		const ringGeo = new THREE.RingGeometry(ring.innderRadius, ring.outerRadius, 32);
		const ringMat = new THREE.MeshBasicMaterial({
			map : textureLoader.load(ring.texture),
			side : THREE.DoubleSide
		});
		const ringMesh = new THREE.Mesh(ringGeo, ringMat);
		obj.add(ringMesh);
		ringMesh.position.x = position;
		ringMesh.rotation.x = (Math.PI / 2);
	}
	obj.add(mesh);
	mesh.position.x = position;
	return {mesh, obj};

}
// the mercury
const mercury = creatPlanetFunction( 3.2, mercuryTexture, 28 );
//the venbus
const venus = creatPlanetFunction( 5.2, venusTexture, 44 );
// the earth
const earth = creatPlanetFunction(6, earthTexture, 62);
//the mars
const mars = creatPlanetFunction(4, marsTexture, 78);
//the jupitar
const jupitar = creatPlanetFunction(12, jupiterTexture, 100);
// the saturn 
const saturn = creatPlanetFunction(10, saturnTexture, 138, {
	innderRadius : 10,
	outerRadius : 20,
	texture : saturnRingTexture
});
//the uranus 
const uranus = creatPlanetFunction(10, uranusTexture, 176, {
	innderRadius : 10,
	outerRadius : 20,
	texture : uranusRingTexture
});
// the neptune
const neptune = creatPlanetFunction(7, neptuneTexture, 200);
// the pluto
const pluto = creatPlanetFunction(2.8, plutoTexture, 250);

//point light 
const pointLight = new THREE.PointLight( 0xFFFFFF, 8000, 90000);
scene.add( pointLight );

//animate function
function animate() {
	// self axix rotation
	sun.rotateY(0.004);
	mercury.mesh.rotateY(0.004)
	venus.mesh.rotateY(0.002);
	earth.mesh.rotateY(0.02);
	mars.mesh.rotateY(0.018);
	jupitar.mesh.rotateY(0.04);
	saturn.mesh.rotateY(0.038);
	uranus.mesh.rotateY(0.003);
	neptune.mesh.rotateY(0.032);
	pluto.mesh.rotateY(0.008);
	
	// rotation around sun
	mercury.obj.rotateY(0.04);
	venus.obj.rotateY(0.015);
	earth.obj.rotateY(0.01);
	mars.obj.rotateY(0.008);
	jupitar.obj.rotateY(0.02);
	saturn.obj.rotateY(0.0009);
	uranus.obj.rotateY(0.0004);
	neptune.obj.rotateY(0.0001);
	pluto.obj.rotateY(0.004);

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
// window resize 
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight )
} )


import * as THREE from '../node_modules/three/src/Three.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3)

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);



// Background

const spaceTexture = new THREE.TextureLoader().load('../assets/images/20210911-IMG_8093.jpg');
scene.background = spaceTexture;

// Ground

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry( 10, 10 ),
  new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
);
plane.rotation.x = - Math.PI / 2;
plane.position.y = - 1;
scene.add( plane );

plane.receiveShadow = true;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }

document.body.onscroll = moveCamera;
moveCamera();

//Animation Loop

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.0;

    // controls.update();

    renderer.render(scene, camera);
}

animate();

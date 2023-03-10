import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const light1 = new THREE.DirectionalLight(0xefefff, 1);
light1.position.set(-3, 6, 0);
scene.add(light1);
const hemisphereLight = new THREE.HemisphereLight('white', 0x000000, 1.5);
hemisphereLight.position.set(0, 10, 0);
scene.add(hemisphereLight);
// const directionalLightHelper1 = new THREE.DirectionalLightHelper(light1, 5);
// scene.add(directionalLightHelper1);


const orbCtrl = new OrbitControls(camera, renderer.domElement);
orbCtrl.target.set(0, 0.5, 0);
orbCtrl.update();

const grid = new THREE.GridHelper(5000, 1000, 0x000000, 0x000000);
grid.position.y = 0;
grid.material.transparent = true;
grid.material.opacity = 0.3;
scene.add(grid);

const loader = new GLTFLoader();
let mixer;
let hand01, hand11L, hand11R, hand12L, hand12R, hand21L, hand21R;
const hand01Pos = { x: 0, y: 0, z: 0 };
const hand01Rot = { y: 0 }; 
const hand11LPos = { x: -0.392473, y: 0, z: -0.984889 };
const hand11LRot = { y: 0 };
const hand11RPos = { x: 0.392473, y: 0, z: -0.984889 };
const hand11RRot = { y: 0 };
const hand12LPos = { x: -0.197845, y: 0, z: -1.59443 };
const hand12LRot = { y: 0 };
const hand12RPos = { x: 0.197845, y: 0, z: -1.59443 };
const hand12RRot = { y: 0 };
const hand21LPos = { x: -0.262186 , y: 0 , z: -1.151901 };
const hand21LRot = { y: 0 };
const hand21RPos = { x: 0.262186 , y: 0 , z: -1.151901 };
const hand21RRot = { y: 0 };


loader.load("./assets/hand01.gltf", function (gltf) {
  hand01 = gltf.scene;
  hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
  scene.add(hand01);
});

loader.load("./assets/hand11L.gltf", function (gltf) {
  hand11L = gltf.scene;
  hand11L.position.set(hand11LPos.x, hand11LPos.y, hand11LPos.z);
  hand01.add(hand11L);
  hand11L.rotation.y = hand11LRot.y;
});

loader.load("./assets/hand11R.gltf", function (gltf) {
  hand11R = gltf.scene;
  hand11R.position.set(hand11RPos.x, hand11RPos.y, hand11RPos.z);
  hand01.add(hand11R);
  hand11R.rotation.y = hand11RRot.y;
});

loader.load("./assets/hand12L.gltf", function (gltf) {
  hand12L = gltf.scene;
  hand12L.position.set(hand12LPos.x, hand12LPos.y, hand12LPos.z);
  hand01.add(hand12L);
  hand12L.rotation.y = hand12LRot.y;
});

loader.load("./assets/hand12R.gltf", function (gltf) {
  hand12R = gltf.scene;
  hand12R.position.set(hand12RPos.x, hand12RPos.y, hand12RPos.z);
  hand01.add(hand12R);
  hand12R.rotation.y = hand12RRot.y;
});

loader.load("./assets/hand21L.gltf", function (gltf) {
  hand21L = gltf.scene;
  hand21L.position.set(hand21LPos.x, hand21LPos.y, hand21LPos.z);
  hand11L.add(hand21L); 
  hand21L.rotation.y = hand21LRot.y;
});
loader.load("./assets/hand21R.gltf", function (gltf) {
  hand21R = gltf.scene;
  hand21R.position.set(hand21RPos.x, hand21RPos.y, hand21RPos.z);
  hand11R.add(hand21R); 
  hand21R.rotation.y = hand21RRot.y;
});


const clock = new THREE.Clock();

function render() {
  requestAnimationFrame(render);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);

  if (hand11L) {
    hand21L.rotation.y = hand21LRot.y;
    if (hand21L) {
      hand21L.rotation.y = -hand11LRot.y ; 
    }
    if (hand21R) {
      hand21R.rotation.y = +hand11LRot.y ; 
    }
  }

  renderer.render(scene, camera);
}


const gui = new GUI();
gui.add({refresh: () => {window.location.reload();}, }, 'refresh').name('Refresh').domElement.parentElement.style.order = -1;

gui.add(hand01Pos, 'x', -2, 2).name('좌우').onChange(() => {
  if (hand01) {
    hand01.position.x = hand01Pos.x;
  }
});
gui.add(hand01Pos, 'y', 0, 2).name('높이').onChange(() => {
  if (hand01) {
    hand01.position.y = hand01Pos.y;
  }
});
gui.add(hand01Pos, 'z', -2, 2).name('앞뒤').onChange(() => {
  if (hand01) {
    hand01.position.z = hand01Pos.z;
  }
});
gui.add(hand01Rot, 'y', -Math.PI, Math.PI).name('회전').onChange(() => {
  if (hand01) {
    hand01.rotation.y = hand01Rot.y;
  }
});

gui.add(hand11LRot, 'y', 0, 1.4).name('관절B').onChange(() => {
  if (hand11L) {
    hand11L.rotation.y = hand11LRot.y;
  }
  if (hand11R) {
    hand11R.rotation.y = -hand11LRot.y;
  }

  if (hand12L) {
    hand12L.rotation.y = hand11LRot.y;
  }
  if (hand12R) {
    hand12R.rotation.y = -hand11LRot.y;
  }

});


render();


function animate() {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);
}
animate();



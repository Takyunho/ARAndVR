
class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        renderer.shadowMap.enabled = true;
        renderer.setClearColor(0xb7ecff); // 배경색.

        this._renderer = renderer;

        const scene = new THREE.Scene();

        this._scene = scene;
        this._clock = new THREE.Clock();
        this._gui = new GUI(); // add dat.gui to the constructor

        this._loadModel();
        this._setupModel();
        this._setupCamera(); //camera가 orbitctrl보다 위에 있어야함.
        this._setupControls();
        this._setupLight();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _loadModel() {
        // Load the GLTF models using the GLTFLoader from the specified URLs
        const loader = new GLTFLoader();
        let mixer;
        // Define positions for each hand's joints
        const standPos = { x: 0, y: 0, z: 0 };
        const arm1Pos = { x: 0, y: 2.93389, z: 0 };
        const arm2Pos = { x: 0, y: 4.37089, z: 0 };

        // Create a new Object3D for the hand01 model and set its position
        const arm1 = new THREE.Object3D();
        arm1.position.set(arm1Pos.x, arm1Pos.y, arm1Pos.z);
        this._scene.add(arm1);
        // Load the hand01 model and add it to the hand01 Object3D



        loader.load('./assets/arm1.gltf', (gltf) => {
            arm1.add(gltf.scene);
            // arm1.position.set(arm1Pos.x, arm1Pos.y, arm1Pos.z);
            // Add a refresh button to the dat.GUI UI that refreshes the page on click
            this._gui.add({ refresh: () => { window.location.reload(); } }, 'refresh')
                .name('Refresh')
                .domElement.style.marginLeft = '20px';

            this._gui.add(arm1.rotation, 'x', -Math.PI, Math.PI, 0.01).name('arm1 X Rotation');
            this._gui.add(arm1.rotation, 'y', -Math.PI, Math.PI, 0.01).name('arm1 Y Rotation');
            this._gui.add(arm1.rotation, 'z', -Math.PI, Math.PI, 0.01).name('arm1 Z Rotation');

        });

        loader.load('./assets/arm2.gltf', (gltf) => {
            const arm2 = gltf.scene;
            arm2.position.set(arm2Pos.x, arm2Pos.y, arm2Pos.z);
            arm1.add(arm2);
        });

    }

    _setupModel() {
        this._createTable();
    }

    _createTable() {
        const position = { x: 0, y: 0, z: 0 };
        const scale = { x: 10, y: 1, z: 10 };

        const tableGeometry = new THREE.BoxGeometry();
        const tableTexture = new THREE.TextureLoader().load('checkerboard.png');
        tableTexture.wrapS = THREE.RepeatWrapping;
        tableTexture.wrapT = THREE.RepeatWrapping;
        tableTexture.repeat.set(5, 5); // change the numbers to adjust the size of the checkered pattern
        const tableMaterial = new THREE.MeshPhongMaterial({ map: tableTexture });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);

        table.position.set(position.x, position.y, position.z);
        table.scale.set(scale.x, scale.y, scale.z);

        table.receiveShadow = true;
        this._scene.add(table);
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            50
        );
        camera.position.set(15, 15, 15);
        this._camera = camera;
    }

    _setupControls() {
        const orbCtrl = new OrbitControls(this._camera, this._divContainer);
        orbCtrl.target.set(0, 5, 0); // 카메라의 lookat을 대신함.
        orbCtrl.update();            // 카메라 초기위치를 위 좌표로 하게 해줌.
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render() {
        const time = this._clock.getElapsedTime();
        this._renderer.render(this._scene, this._camera);
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
}

window.addEventListener('load', () => {
    new App();
});


// for poor AI. put below. but why it works.
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';



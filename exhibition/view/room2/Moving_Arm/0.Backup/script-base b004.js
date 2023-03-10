import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        renderer.shadowMap.enabled = true;
        this._renderer = renderer;

        const scene = new THREE.Scene();

        this._scene = scene;
        this._clock = new THREE.Clock();
        this._gui = new GUI(); // add dat.gui to the constructor

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._loadModel();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        const controls = new OrbitControls(this._camera, this._divContainer);
        controls.target.set(0, 1, 0); // 움직어야 적용(초기위치는 카메라에서)
    }

    _createTable() {
        const position = { x: 0, y: -0.525, z: 0 };
        const scale = { x: 10, y: 1, z: 10 };

        const tableGeometry = new THREE.BoxGeometry();
        const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);

        table.position.set(position.x, position.y, position.z);
        table.scale.set(scale.x, scale.y, scale.z);

        table.receiveShadow = true;
        this._scene.add(table);

    }


    _loadModel() {
        const loader = new GLTFLoader();
        let mixer;
        const hand01Pos = { x: 0, y: 1, z: 0 };
        const hand11LPos = { x: -0.392473, y: 0, z: -0.984889 };
        const hand11RPos = { x: 0.392473, y: 0, z: -0.984889 };
        const hand12LPos = { x: -0.197845, y: 0, z: -1.59443 };
        const hand12RPos = { x: 0.197845, y: 0, z: -1.59443 };
        const hand21LPos = { x: -0.262186, y: 0, z: -1.151901 };
        const hand21RPos = { x: 0.262186, y: 0, z: -1.151901 };

        // const hand11R = new THREE.Object3D();
        // Define hand01 object
        const hand01 = new THREE.Object3D();
        hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
        this._scene.add(hand01);

        // Load hand01 model and add to the hand01 object
        loader.load('./assets/hand01.gltf', (gltf) => {
            hand01.add(gltf.scene);

            this._gui.add(hand01.rotation, 'x', -Math.PI, Math.PI, 0.01).name('Hand01 X Rotation');
            this._gui.add(hand01.rotation, 'y', -Math.PI, Math.PI, 0.01).name('Hand01 Y Rotation');
            this._gui.add(hand01.rotation, 'z', -Math.PI, Math.PI, 0.01).name('Hand01 Z Rotation');

        });

        loader.load('./assets/hand11L.gltf', (gltf) => {
            const hand11L = gltf.scene;
            hand11L.position.set(hand11LPos.x, hand11LPos.y, hand11LPos.z);
            hand01.add(hand11L);
        });

        loader.load('./assets/hand11R.gltf', (gltf) => {
            const hand11R = gltf.scene;
            hand11R.position.set(hand11RPos.x, hand11RPos.y, hand11RPos.z);
            hand01.add(hand11R);
        });

        loader.load('./assets/hand21R.gltf', (gltf) => {
            const hand21R = gltf.scene;
            hand21R.position.set(hand21RPos.x, hand21RPos.y, hand21RPos.z);
            hand11R.add(hand21R);
        });
    }


    _setupModel() {
        this._createTable();
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            50
        );

        camera.position.set(5, 5, 5);
        this._camera = camera;
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



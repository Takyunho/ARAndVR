import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
// import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

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
        
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _createTable() {
        const position = { x: 0, y: -0.525, z: 0 };
        const scale = { x: 10, y: 1, z: 10 }; 
        
        const tableGeometry = new THREE.BoxGeometry();
        const tableMaterial = new THREE.MeshPhongMaterial({color: 0x878787 });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);

        table.position.set(position.x, position.y, position.z);
        table.scale.set(scale.x, scale.y, scale.z);

        table.receiveShadow = true;
        this._scene.add(table);

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

    render(time) {
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

window.onload = function () {
    new App();
}


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
        const loader = new GLTFLoader();
        let mixer;
        let arm1, arm2, arm3, arm4, hand01, hand11L, hand11R, hand12L, hand12R, hand21L, hand21R;
        // const standPos = { x: 0, y: 0, z: 0 }; //skip
        const arm1Pos = { x: 0, y: 2.93389, z: 0 };
        const arm2Pos = { x: 0, y: 1.437, z: 0 };
        const arm3Pos = { x: 0, y: 3.26085, z: 0 };
        const arm4Pos = { x: 0, y: 3.26276, z: 0 };
        const hand01Pos = { x: -0.025787, y: 3.2286, z: -0.084646 };
        const hand11LPos = { x: -0.392473, y: 0.984889, z: 0 };
        const hand11RPos = { x: 0.392473, y: 0.984889, z: 0 };
        const hand12LPos = { x: -0.197845, y: 1.59443, z: 0 };
        const hand12RPos = { x: 0.197845, y: 1.59443, z: 0 };
        const hand21LPos = { x: -0.262186, y: 1.151901, z: 0 };
        const hand21RPos = { x: 0.262186, y: 1.151901, z: 0 };
        
        const sound1 = new Audio('./sound/RobocopSound.mp3');
        const sound2 = new Audio('./sound/RobocopSound.mp3');

        const addSoundCallback = (guiController) => {
            guiController.onChange(() => {
                sound1.play();
            });
        };

        loader.load('./assets/arm1.gltf', (gltf) => {
            arm1 = new THREE.Object3D();
            arm1.position.set(arm1Pos.x, arm1Pos.y, arm1Pos.z);
            arm1.add(gltf.scene);
            this._scene.add(arm1);

            this._gui.add({ refresh: () => { window.location.reload(); } }, 'refresh')
                .name('Refresh')
                .domElement.style.marginLeft = '20px';

            this._gui.add(arm1.rotation, 'y', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
                .name('arm1 Z');
            addSoundCallback(this._gui.__controllers[this._gui.__controllers.length - 1]);
            
        });


        loader.load('./assets/arm2.gltf', (gltf) => {
            arm2 = gltf.scene;
            arm2.position.set(arm2Pos.x, arm2Pos.y, arm2Pos.z);
            arm1.add(arm2);
        
            this._gui.add(arm2.rotation, 'x', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
                .name('arm2 X');
            addSoundCallback(this._gui.__controllers[this._gui.__controllers.length - 1]);
        });
        
        loader.load('./assets/arm3.gltf', (gltf) => {
            arm3 = gltf.scene;
            arm3.position.set(arm3Pos.x, arm3Pos.y, arm3Pos.z);
            arm2.add(arm3);
            this._gui.add(arm3.rotation, 'x', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
                .name('arm3 X');
            addSoundCallback(this._gui.__controllers[this._gui.__controllers.length - 1]);
        });
        
        
        loader.load('./assets/arm4.gltf', (gltf) => {
            arm4 = gltf.scene;
            arm4.position.set(arm4Pos.x, arm4Pos.y, arm4Pos.z);
            arm3.add(arm4);
            this._gui.add(arm4.rotation, 'x', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
                .name('arm4 X');
            addSoundCallback(this._gui.__controllers[this._gui.__controllers.length - 1]);
        });

        loader.load('./assets/hand01.gltf', (gltf) => {
            hand01 = gltf.scene;
            hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
            arm4.add(hand01);
            this._gui.add(hand01.rotation, 'y', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
                .name('hand Z');
            addSoundCallback(this._gui.__controllers[this._gui.__controllers.length - 1]);
        });

        loader.load('./assets/hand11L.gltf', (gltf) => {
            hand11L = gltf.scene;
            hand11L.position.set(hand11LPos.x, hand11LPos.y, hand11LPos.z);
            hand01.add(hand11L);
        
            this._gui.add(hand11L.rotation, 'z', 0, 1.3, 0.01)
            .name('hand y')
            .onChange(() => {
                sound2.play();
                hand11R.rotation.z = -hand11L.rotation.z;
                hand12L.rotation.z = +hand11L.rotation.z;
                hand12R.rotation.z = -hand11L.rotation.z;
                hand21L.rotation.z = -hand11L.rotation.z;
                hand21R.rotation.z = +hand11L.rotation.z;
            });
            
        });

        loader.load('./assets/hand11R.gltf', (gltf) => {
            hand11R = gltf.scene;
            hand11R.position.set(hand11RPos.x, hand11RPos.y, hand11RPos.z);
            hand01.add(hand11R);
        });

        loader.load('./assets/hand12L.gltf', (gltf) => {
            hand12L = gltf.scene;
            hand12L.position.set(hand12LPos.x, hand12LPos.y, hand12LPos.z);
            hand01.add(hand12L);
        });

        loader.load('./assets/hand12R.gltf', (gltf) => {
            hand12R = gltf.scene;
            hand12R.position.set(hand12RPos.x, hand12RPos.y, hand12RPos.z);
            hand01.add(hand12R);
        });

        loader.load('./assets/hand21L.gltf', (gltf) => {
            hand21L = gltf.scene;
            hand21L.position.set(hand21LPos.x, hand21LPos.y, hand21LPos.z);
            hand11L.add(hand21L);
        });

        loader.load('./assets/hand21R.gltf', (gltf) => {
            hand21R = gltf.scene;
            hand21R.position.set(hand21RPos.x, hand21RPos.y, hand21RPos.z);
            hand11R.add(hand21R);
        });


        ///////stand. not act.
        loader.load('./assets/stand.gltf', (gltf) => {
            const stand = gltf.scene;
            stand.position.set(0, 0, 0);
            this._scene.add(stand);
        });
    }

    _setupModel() {
        this._createTable();
    }

    _createTable() {
        const scale = { x: 25, y: 1, z: 25 };
        const position = { x: 0, y: -scale.y / 2, z: 0 };

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
            100
        );
        camera.position.set(15, 20, 20);
        this._camera = camera;
    }

    _setupControls() {
        const orbCtrl = new OrbitControls(this._camera, this._divContainer);
        orbCtrl.target.set(0, 8, 0); // 카메라의 lookat을 대신함.
        orbCtrl.update();            // 카메라 초기위치를 위 좌표로 하게 해줌.
    }

    _setupLight() {
        const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        light1.position.set(-1, 10, -1);
        this._scene.add(light1);

        const pointLightintensity = 0.2;

        const light2 = new THREE.PointLight(0xffffff, pointLightintensity);
        light2.position.set(5, 10, 5);
        this._scene.add(light2);
        // const light2Helper = new THREE.PointLightHelper(light2, 1);
        // this._scene.add(light2Helper);


        const light3 = new THREE.PointLight(0xffffff, 2 * pointLightintensity);
        light3.position.set(-5, 13, 5);
        this._scene.add(light3);
        // const light3Helper = new THREE.PointLightHelper(light3, 1);
        // this._scene.add(light3Helper);

        const light4 = new THREE.PointLight(0xffffff, pointLightintensity);
        light4.position.set(5, 5, -5);
        this._scene.add(light4);
        // const light4Helper = new THREE.PointLightHelper(light4, 1);
        // this._scene.add(light4Helper);

        const lightH = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
        this._scene.add(lightH);
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


import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { DRACOLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/RGBELoader.js';




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

        this._loadModel();
        // this._setupModel();
        this._setupCamera(); //camera가 orbitctrl보다 위에 있어야함.
        this._setupControls();
        this._setupLight();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _loadModel() {


        // Load mixerroom 17a model
        new GLTFLoader().load('./assets/boot1_05.gltf', (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {   //properties
                    child.material.roughness = 0.9;
                    child.material.metalness = 0.8;
                    child.material.emissive.set(0xffffff); // set to white
                    child.material.emissiveIntensity = 3; // increase intensity
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
            this._scene.add(gltf.scene);
        }, undefined, (error) => {
            console.error(`Failed to load GLTF file: ${error}`);
        });

        // new GLTFLoader().load('./assets/Gen_MixerRoom_17t.gltf', (gltf) => {
        //     gltf.scene.traverse((child) => {
        //         if (child.isMesh) {   //properties
        //             child.material.roughness = 0.4;
        //             child.material.metalness = 0.8;
        //             // child.material.clearcoat = 0;
        //             // child.material.clearcoatRoughness = 0.5;
        //             child.receiveShadow = true;
        //             child.castShadow = true;
        //         }
        //     });
        //     this._scene.add(gltf.scene);
        // }, undefined, (error) => {
        //     console.error(`Failed to load GLTF file: ${error}`);
        // });

        // new GLTFLoader().load('./assets/Gen_MixerRoom_17f.gltf', (gltf) => {
        //     gltf.scene.traverse((child) => {
        //         if (child.isMesh) {      //properties
        //             // child.material.shininess = 30;
        //             child.material.roughness = 0.9;
        //             child.material.metalness = 0.5;
        //             // child.material.clearcoat = 0.0;
        //             // child.material.clearcoatRoughness = 0.5;
        //             child.receiveShadow = true;
        //             child.castShadow = true;
        //         }
        //     });
        //     this._scene.add(gltf.scene);
        // }, undefined, (error) => {
        //     console.error(`Failed to load GLTF file: ${error}`);
        // });

        // new GLTFLoader().load('./assets/Gen_MixerRoom_17p.gltf', (gltf) => {
        //     gltf.scene.traverse((child) => {
        //         if (child.isMesh) {      //properties
        //             child.position.set(-1, 7, 0);
        //         }
        //     });
        //     this._scene.add(gltf.scene);
        // }, undefined, (error) => {
        //     console.error(`Failed to load GLTF file: ${error}`);
        // });

        // new GLTFLoader().load('./assets/Gen_MixerRoom_17g.gltf', (gltf) => {
        //     gltf.scene.traverse((child) => {
        //         if (child.isMesh) {   //properties
        //             child.material.transparent = true;
        //             child.material.opacity = 0.8;
        //             child.material.roughness = 0;
        //             child.material.metalness = 0;
        //             child.material.clearcoat = 0;
        //         }
        //     });
        //     this._scene.add(gltf.scene);
        // }, undefined, (error) => {
        //     console.error(`Failed to load GLTF 17g file: ${error}`);
        // });


        // //test shadow
        // const dum1Geometry = new THREE.BoxGeometry();
        // const dum1 = new THREE.Mesh(dum1Geometry);
        // dum1.position.set(5, 1, 0);
        // this._scene.add(dum1);
        // dum1.castShadow = true;

    }

    // _setupModel() {
    //     this._createTable();
    //     this._createwall();
    // }

    // _createTable() {
    //     // Load HDR environment map
    //     // new RGBELoader().load('./HDR/dancing_hall_1k.hdr', (texture) => {
    //     new RGBELoader().load('./HDR/royal_esplanade_1k.hdr', (texture) => {
    //         texture.mapping = THREE.EquirectangularReflectionMapping;
    //         this._scene.environment = texture;
    //         // Create render target
    //         const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    //         renderTarget.texture.format = THREE.RGBAFormat;
    //         renderTarget.texture.type = THREE.FloatType;
    //         renderTarget.texture.generateMipmaps = false;
    //         //...
    //     }, undefined, (error) => {
    //         console.error(`Failed to load HDR file: ${error}`);
    //     });

    //     const platformPosition = { x: 0, y: -0.41, z: 0 };
    //     const platformScale = { x: 30, y: 1, z: 30 };

    //     const platformTableGeometry = new THREE.BoxGeometry();
    //     const platformTableMaterial = new THREE.MeshPhongMaterial({
    //         color: 0x505050,
    //         // shininess: 10,
    //     });


    //     const platformTable1 = new THREE.Mesh(platformTableGeometry, platformTableMaterial);
    //     platformTable1.position.set(platformPosition.x, platformPosition.y, platformPosition.z);
    //     platformTable1.scale.set(platformScale.x, platformScale.y, platformScale.z);

    //     platformTable1.receiveShadow = true;
    //     this._scene.add(platformTable1);
    // }

    // _createwall() {
    //     const wallposition1 = { x: 0, y: 5, z: -5 };
    //     const wallposition2 = { x: -15, y: 5, z: 5 };
    //     const wallposition3 = { x: 15, y: 5, z: 5 };
    //     // const wallscale = { x: 10, y: 10, z: 10 };

    //     const wallGeometry1 = new THREE.PlaneGeometry(30, 10)
    //     const wallGeometry2 = new THREE.PlaneGeometry(20, 10)
    //     wallGeometry2.rotateY(Math.PI / 2);
    //     const wallGeometry3 = new THREE.PlaneGeometry(20, 10)
    //     wallGeometry3.rotateY(-Math.PI / 2);
    //     const wallMaterial1 = new THREE.MeshStandardMaterial({
    //         color: 0x909090,
    //         // roughness: 0.9,
    //         metalness: 0.2,
    //     });


    //     const wall_1 = new THREE.Mesh(wallGeometry1, wallMaterial1);
    //     wall_1.position.set(wallposition1.x, wallposition1.y, wallposition1.z);
    //     // wall.scale.set(wallscale.x, wallscale.y, wallscale.z);
    //     wall_1.receiveShadow = true;
    //     wall_1.castShadow = true;
    //     this._scene.add(wall_1);

    //     const wall_2 = new THREE.Mesh(wallGeometry2, wallMaterial1);
    //     wall_2.position.set(wallposition2.x, wallposition2.y, wallposition2.z);
    //     wall_2.receiveShadow = true;
    //     wall_2.castShadow = true;
    //     this._scene.add(wall_2);

    //     const wall_3 = new THREE.Mesh(wallGeometry3, wallMaterial1);
    //     wall_3.position.set(wallposition3.x, wallposition3.y, wallposition3.z);
    //     wall_3.receiveShadow = true;
    //     wall_3.castShadow = true;
    //     this._scene.add(wall_3);
    // }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.set(-1, 5, 12);
        this._camera = camera;
    }

    _setupControls() {
        const orbCtrl = new OrbitControls(this._camera, this._divContainer);
        orbCtrl.target.set(-1, 3, 0); // 카메라의 lookat을 대신함.
        orbCtrl.update();            // 카메라 초기위치를 위 좌표로 하게 해줌.
    }

    _setupLight() {
        // const lightH = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.1);
        // this._scene.add(lightH);

        const Directlight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        Directlight1.position.set(-2, 10, 2);
        Directlight1.lookAt(0, 15, 0);// 효과없음. 
        this._scene.add(Directlight1);

        const Directlight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        Directlight2.position.set(1, 15, 10);
        Directlight2.lookAt(0, 15, 0); // 효과없음. 
        this._scene.add(Directlight2);

        const pointLightintensity = 0.3;

        const PointLight1 = new THREE.PointLight(0xffffff, pointLightintensity);
        PointLight1.position.set(-12, 1, 10);
        this._scene.add(PointLight1);
        const Pointlight2 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight2.position.set(-4, 1, 10);
        this._scene.add(Pointlight2);
        const Pointlight3 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight3.position.set(4, 1.5, 10);
        this._scene.add(Pointlight3);
        const Pointlight4 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight4.position.set(12, 1, 10);
        this._scene.add(Pointlight4);

        // const Directlight2Helper = new THREE.DirectionalLightHelper(Directlight2, 1);
        // this._scene.add(Directlight2Helper);
        // const PointLight1Helper = new THREE.PointLightHelper(PointLight1, 1);
        // this._scene.add(PointLight1Helper);
        // const Pointlight2Helper = new THREE.PointLightHelper(Pointlight2, 1);
        // this._scene.add(Pointlight2Helper);
        // const Pointlight3Helper = new THREE.PointLightHelper(Pointlight3, 1);
        // this._scene.add(Pointlight3Helper);
        // const Pointlight4Helper = new THREE.PointLightHelper(Pointlight4, 1);
        // this._scene.add(Pointlight4Helper);

        Directlight1.castShadow = true;
        Directlight1.shadow.camera.left = -20;
        Directlight1.shadow.camera.right = 20;
        Directlight1.shadow.camera.top = 20;
        Directlight1.shadow.camera.bottom = -20
        // Directlight1.shadow.bias = 0.1;
        // Directlight1.shadow.mapSize.width = 2048;
        // Directlight1.shadow.mapSize.height = 2048;
        // Directlight1.shadow.camera.near = 0.5;
        // Directlight1.shadow.camera.far = 500;
        // Directlight1.shadow.camera.fov = 75;
        // Directlight1.shadow.radius = 3;

        // const cameraHelper = new THREE.CameraHelper(Directlight1.shadow.camera); //helper
        // this._scene.add(cameraHelper);

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



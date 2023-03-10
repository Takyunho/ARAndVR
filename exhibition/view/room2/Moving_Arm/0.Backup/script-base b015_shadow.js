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
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // high quality
        // renderer.shadowMap.numSamples = 16;
        renderer.setClearColor(0xb7ecff); // 배경색.
        this._renderer = renderer;
        const scene = new THREE.Scene();
        this._scene = scene;
        this._clock = new THREE.Clock();
        this.arm1Rot = { x: 0, y: 0, z: 0 };
        this.arm2Rot = { x: 0, y: 0, z: 0 };
        this.arm3Rot = { x: 0, y: 0, z: 0 };
        this.arm4Rot = { x: 0, y: 0, z: 0 };
        this.hand01Rot = { x: 0, y: 0, z: 0 };
        this.hand11LRot = { x: 0, y: 0, z: 0 };
        // this.hand11RRot = { x: 0, y: 0, z: 0 }; //not use
        // this.hand12LRot = { x: 0, y: 0, z: 0 };
        // this.hand12RRot = { x: 0, y: 0, z: 0 };
        // this.hand21LRot = { x: 0, y: 0, z: 0 };
        // this.hand21RRot = { x: 0, y: 0, z: 0 };

        this._loadModel();
        this._createGuiControls();
        this._setupModel();
        this._setupCamera(); //camera가 orbitctrl보다 위에 있어야함.
        this._setupControls();
        this._setupLight();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }


    _loadModel() {
        const RobotArms = new GLTFLoader();
        let arm1, arm2, arm3, arm4, hand01, hand11L, hand11R, hand12L, hand12R, hand21L, hand21R;

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


        RobotArms.load('./assets/arm1.gltf', (gltf) => {
            arm1 = new THREE.Object3D();
            arm1.position.set(arm1Pos.x, arm1Pos.y, arm1Pos.z);
            arm1.add(gltf.scene);
            setTimeout(() => {
                this._scene.add(arm1);
            }, 800);
            this.arm1 = arm1;
            arm1.receiveShadow = true;
            arm1.castShadow = true;
            arm1.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });


        RobotArms.load('./assets/arm2.gltf', (gltf) => {
            arm2 = gltf.scene;
            arm2.position.set(arm2Pos.x, arm2Pos.y, arm2Pos.z);
            setTimeout(() => {
                arm1.add(arm2);
            }, 800);
            this.arm2 = arm2;
            arm2.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });

        RobotArms.load('./assets/arm3.gltf', (gltf) => {
            arm3 = gltf.scene;
            arm3.position.set(arm3Pos.x, arm3Pos.y, arm3Pos.z);
            setTimeout(() => {
                arm2.add(arm3);
            }, 200);
            this.arm3 = arm3;
            arm3.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });

        RobotArms.load('./assets/arm4.gltf', (gltf) => {
            arm4 = gltf.scene;
            arm4.position.set(arm4Pos.x, arm4Pos.y, arm4Pos.z);
            setTimeout(() => {
                arm3.add(arm4);
            }, 200);
            this.arm4 = arm4;
            arm4.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });

        RobotArms.load('./assets/hand01.gltf', (gltf) => {
            hand01 = gltf.scene;
            hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
            setTimeout(() => {
                arm4.add(hand01);
            }, 800);
            this.hand01 = hand01;
            hand01.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

        });

        RobotArms.load('./assets/hand11L.gltf', (gltf) => {
            hand11L = gltf.scene;
            hand11L.position.set(hand11LPos.x, hand11LPos.y, hand11LPos.z);
            setTimeout(() => {
                hand01.add(hand11L);
            }, 200);
            this.hand11L = hand11L;
            hand11L.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });

        RobotArms.load('./assets/hand11R.gltf', (gltf) => {
            hand11R = gltf.scene;
            hand11R.position.set(hand11RPos.x, hand11RPos.y, hand11RPos.z);
            setTimeout(() => {
                hand01.add(hand11R);
            }, 200);
            this.hand11R = hand11R;
            hand11R.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });

        RobotArms.load('./assets/hand12L.gltf', (gltf) => {
            hand12L = gltf.scene;
            hand12L.position.set(hand12LPos.x, hand12LPos.y, hand12LPos.z);
            setTimeout(() => {
                hand01.add(hand12L);
            }, 200);
            this.hand12L = hand12L;
        });

        RobotArms.load('./assets/hand12R.gltf', (gltf) => {
            hand12R = gltf.scene;
            hand12R.position.set(hand12RPos.x, hand12RPos.y, hand12RPos.z);
            setTimeout(() => {
                hand01.add(hand12R);
            }, 200);
            this.hand12R = hand12R;
        });

        RobotArms.load('./assets/hand21L.gltf', (gltf) => {
            hand21L = gltf.scene;
            hand21L.position.set(hand21LPos.x, hand21LPos.y, hand21LPos.z);
            setTimeout(() => {
                hand11L.add(hand21L);
            }, 200);
            this.hand21L = hand21L;
            hand21L.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

        });

        RobotArms.load('./assets/hand21R.gltf', (gltf) => {
            hand21R = gltf.scene;
            hand21R.position.set(hand21RPos.x, hand21RPos.y, hand21RPos.z);
            setTimeout(() => {
                hand11R.add(hand21R);
            }, 200);
            this.hand21R = hand21R;
            hand21R.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });

        });

        ///////stand. not act.
        RobotArms.load('./assets/stand.gltf', (gltf) => {
            const stand = gltf.scene;
            stand.position.set(0, 0, 0);
            setTimeout(() => {
                this._scene.add(stand);
            }, 800);
            this.stand = stand;
            // stand.castShadow = true;
            stand.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
        });


        // //test shadow
        // const dum1Geometry = new THREE.BoxGeometry();
        // const dum1 = new THREE.Mesh(dum1Geometry);
        // dum1.position.set(5, 1, 0);
        // this._scene.add(dum1);
        // dum1.castShadow = true;

    }

    _createGuiControls() {
        const gui = new GUI();

        const self = this;
        const arm1 = this._scene.getObjectByName('Arm1');
        const sound0 = new Audio('./sound/dingA.mp3');
        sound0.volume = 0.8;
        const sound1 = new Audio('./sound/drill2.mp3');
        const sound2 = new Audio('./sound/drill3.mp3');
        const sound3 = new Audio('./sound/drill3.mp3');
        const sound4 = new Audio('./sound/drill3.mp3');
        const sound5 = new Audio('./sound/drill2.mp3');
        const sound6 = new Audio('./sound/drill1.mp3');

        gui.add({
            refresh: () => {
                sound0.play();
                setTimeout(() => {
                    window.location.reload();
                }, 950);
            }
        }, 'refresh')
            .name('Refresh')
            .domElement.style.marginLeft = '20px';

        gui.add(this.arm1Rot, 'y', -Math.PI / 2, Math.PI / 2, 0.1).name('arm1 Y').onChange(() => {
            sound1.play();
            if (this.arm1) {
                this.arm1.rotation.y = this.arm1Rot.y;
            }
        });

        gui.add(this.arm2Rot, 'x', -Math.PI / 2, Math.PI / 2, 0.1).name('arm2 X').onChange(() => {
            sound2.play();
            if (this.arm2) {
                this.arm2.rotation.x = this.arm2Rot.x;
            }
        });


        gui.add(this.arm3Rot, 'x', -Math.PI / 2, Math.PI / 2, 0.1).name('arm3 X').onChange(() => {
            sound3.play();
            if (this.arm3) {
                this.arm3.rotation.x = this.arm3Rot.x;
            }
        });


        gui.add(this.arm4Rot, 'x', -Math.PI / 2, Math.PI / 2, 0.1).name('arm4 X').onChange(() => {
            sound4.play();
            if (this.arm4) {
                this.arm4.rotation.x = this.arm4Rot.x;
            }
        });


        gui.add(this.hand01Rot, 'y', -Math.PI / 2, Math.PI / 2, 0.1).name('hand5 Y').onChange(() => {
            sound5.play();
            if (this.hand01) {
                this.hand01.rotation.y = this.hand01Rot.y;
            }
        });

        gui.add(this.hand11LRot, 'z', 0, 1.3, 0.1).name('hand Grab').onChange(() => {
            sound6.play();
            if (this.hand11L) {
                this.hand11L.rotation.z = this.hand11LRot.z;
                this.hand11R.rotation.z = -this.hand11LRot.z;
                this.hand12L.rotation.z = this.hand11LRot.z;
                this.hand12R.rotation.z = -this.hand11LRot.z;
                this.hand21L.rotation.z = -this.hand11LRot.z;
                this.hand21R.rotation.z = this.hand11LRot.z;
            }
        });
    }

    _setupModel() {
        this._createTable();


    }

    _createTable() {
        const flatformscale = { x: 30, y: 1, z: 30 };
        const position = { x: 0, y: -flatformscale.y / 2, z: 0 };
        const tableGeometry = new THREE.BoxGeometry();
        const tableTexture = new THREE.TextureLoader().load('checkerboard.png');
        const mapbump = new THREE.TextureLoader().load('checkerboard_bump.png');
        tableTexture.wrapS = THREE.RepeatWrapping;
        tableTexture.wrapT = THREE.RepeatWrapping;
        tableTexture.repeat.set(5, 5); // change the numbers to adjust the size of the checkered pattern
        mapbump.wrapS = THREE.RepeatWrapping;
        mapbump.wrapT = THREE.RepeatWrapping;
        mapbump.repeat.set(5, 5); // change the numbers to adjust the size of the checkered pattern
        const tableMaterial = new THREE.MeshStandardMaterial({
            map: tableTexture,
            // normalMap: mapbump,
            bumpMap: mapbump,
            bumpScale: 0.1,
            roughness: 0.3,
            // metalness: 0.3,
            // emissive: 0x202020,
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(position.x, position.y, position.z);
        table.scale.set(flatformscale.x, flatformscale.y, flatformscale.z);

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
        camera.position.set(20, 20, 20);
        this._camera = camera;
    }

    _setupControls() {
        const orbCtrl = new OrbitControls(this._camera, this._divContainer);
        orbCtrl.target.set(0, 9, 0); // 카메라의 lookat을 대신함.
        orbCtrl.update();            // 카메라 초기위치를 위 좌표로 하게 해줌.
    }

    _setupLight() {
        // const lightH = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.1);
        // this._scene.add(lightH);

        const Directlight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        Directlight1.position.set(-5, 15, 5);
        Directlight1.lookAt(0, 15, 0);// 효과없음. 
        this._scene.add(Directlight1);

        const Directlight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        Directlight2.position.set(5, 1, 5);
        Directlight2.lookAt(0, 15, 0); // 효과없음. 
        this._scene.add(Directlight2);
        
        const pointLightintensity = 0.3;
        
        const PointLight1 = new THREE.PointLight(0xffffff, pointLightintensity);
        PointLight1.position.set(2, 13, -1);
        this._scene.add(PointLight1);
        const Pointlight2 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight2.position.set(-5.5, 11, 5);
        this._scene.add(Pointlight2);
        const Pointlight3 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight3.position.set(-3, 15.5, 4);
        this._scene.add(Pointlight3);
        const Pointlight4 = new THREE.PointLight(0xffffff, pointLightintensity);
        Pointlight4.position.set(5, 5, -5);
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
        // Directlight1.shadow.bias = 0.1;
        // Directlight1.shadow.mapSize.width = 2048;
        // Directlight1.shadow.mapSize.height = 2048;
        // Directlight1.shadow.camera.near = 0.5;
        // Directlight1.shadow.camera.far = 500;
        // Directlight1.shadow.camera.fov = 75;
        Directlight1.shadow.camera.left = -10;
        Directlight1.shadow.camera.right = 10;
        Directlight1.shadow.camera.top = 20;
        Directlight1.shadow.camera.bottom = -10
        // Directlight1.shadow.radius = 3;

        // const cameraHelper = new THREE.CameraHelper(Directlight1.shadow.camera);
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



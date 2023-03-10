RobotArms.load('./assets/hand01.gltf', (gltf) => {
    hand01 = gltf.scene;
    hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
    setTimeout(() => {
        arm4.add(hand01);
    }, 500);
    this.hand01 = hand01;
    hand01.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
            child.material.emissive = new THREE.Color(1, 0, 0); // set red emission
            child.material.emissiveIntensity = 1; // adjust the intensity
        }
    });
});

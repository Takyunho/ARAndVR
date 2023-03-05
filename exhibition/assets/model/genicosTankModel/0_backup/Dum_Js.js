




const wall_3 = new THREE.Mesh(wallGeometry3, wallMaterial1);
wall_3.position.set(wallposition3.x, wallposition3.y, wallposition3.z);
wall_3.receiveShadow = true;
wall_3.castShadow = true;
this._scene.add(wall_3);
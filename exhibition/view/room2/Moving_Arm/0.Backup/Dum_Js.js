









loader.load('./assets/hand01.gltf', (gltf) => {
  hand01 = gltf.scene;
  hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
  arm4.add(hand01);

  this._gui.add(hand01.rotation, 'y', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
      .name('hand Z')
      .onChange(() => {
          sound5.play();
      });
});


loader.load('./assets/hand01.gltf', (gltf) => {
  hand01 = gltf.scene;
  hand01.position.set(hand01Pos.x, hand01Pos.y, hand01Pos.z);
  arm4.add(hand01);

  this._gui.add(hand01.rotation, 'y', -0.5 * Math.PI, 0.5 * Math.PI, 0.01)
      .name('hand Z')
      .onChange(() => {
          sound5.play();
      });
  loadArmTimeout(arm4);
});



// needs cleaned up :)
var chars = "안녕하세요"; // om
chars = chars.split(""); // make array
var font_size = 8;

AFRAME.registerComponent("acanvas", {
  dependencies: ["draw"],
  init: function () {
    this.draw = this.el.components.draw; //get access to the draw component
    this.draw.canvas.width = "512";
    this.draw.canvas.height = "512";
    this.cnvs = this.draw.canvas;
    var columns = this.cnvs.width / font_size;
    this.drops = [];
    for (var x = 0; x < columns; x++) {
      this.drops[x] = 1;
    }
    this.ctx = this.draw.ctx;
  },
  tick: function () {
    this.ctx.fillStyle = "rgba(0,0,0,0.05)";
    this.ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
    this.ctx.fillStyle = "#0F0";
    this.ctx.font = font_size + "px helvetica";

    for (var i = 0; i < this.drops.length; i++) {
      var txt = chars[Math.floor(Math.random() * chars.length)];
      this.ctx.fillText(txt, i * font_size, this.drops[i] * font_size);

      if (
        this.drops[i] * font_size > this.cnvs.height &&
        Math.random() > 0.975
      ) {
        this.drops[i] = 0; // back to the top!
      }
      this.drops[i]++;
    }
    this.draw.render();
  },
});

//~ -----------------------------------------------------------------

// AFRAME.registerComponent("yolo", {
//   dependencies: ["draw"],
//   //? init: function() {} ==> component가 처음 초기화될 때 호출
//   init: function () {
//     this.draw = this.el.components.draw; //get access to the draw component
//     console.log(this.draw)
//     this.cnvs = this.draw.canvas;
//     console.log(this.cnvs)
//     this.cnvs.width = "512";
//     this.cnvs.height = "512";
//     this.ctx = this.draw.ctx;
//     this.ctx.fillStyle = "#fff"
//   },
//   //? tick: function () {} ==> render loop가 호출될 때 마다 호출 (계속되는 변화를 체크할 때 사용)
//   tick: function () {
//     this.ctx.fillStyle = "#0F0";

//     // var img = document.getElementById("picture");
//     // this.ctx.drawImage(img, 0, 0, 500, 500);
//     // this.draw.render();

//   },
// });



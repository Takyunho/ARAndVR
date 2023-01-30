const canvasToVideo = () => {
  // 이미지를 캔버스가 참조해서 그림
  const canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let img = document.getElementById("picture");
  // console.log(img);

  // setInterval(function () {
  //   ctx.drawImage(img, 0, 0, 480, 270);
  // }, 1000);

  function updateCanvas() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(updateCanvas);
  }
  requestAnimationFrame(updateCanvas);




  // 캔버스를 비디오로 바꾸기
  const video = document.querySelector("#video-canvas");

  // const stream = canvasElt.captureStream(25); // 25 FPS
  const stream = canvas.captureStream();
  console.log(stream)
  
  video.srcObject = stream;
  console.log(video)
  console.log(video.srcObject)

  
};

canvasToVideo();

const zoomElement = document.querySelector("#body");
let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function (e) {
  // console.log(e)
  // console.log(zoom);
  if (e.deltaY > 0 && (zoom > 1)) { // 축소제한하기
    zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
  } else if( e.deltaY < 0 && (zoom < 2)){ // 확대제한하기
    zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
  }
});


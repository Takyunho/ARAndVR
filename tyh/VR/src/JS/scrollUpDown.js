
let step = 0;
let offset = 0;


// 스크롤 다운
document.getElementById("scrollDown").addEventListener("click", () => {
  console.log(step)

  if (step >= 0 && step < 5) {
    offset -= 200;
    step += 1;
    console.log("down")
    document.getElementById("tbody").style.marginTop = offset + "px";
  }
  
});

// 스크롤 업
document.getElementById("scrollUp").addEventListener("click", () => {
  console.log(step)

  if (step > 0) {
    offset += 200;
    console.log("up")
    document.getElementById("tbody").style.marginTop = offset + "px";
    step -= 1;
  }
  
});


const LIST = document.querySelectorAll(".list");    //# 메뉴 버튼 리스트
const MENU_BTN = document.querySelectorAll("#menuBtn");   //# 메뉴 버튼
const PAGE = document.querySelectorAll("#page");    //# 메인 페이지
const MAIN_VIDEO = document.querySelectorAll(".main-video");    //# 비디오
const MAIN_A_VIDEO = document.querySelectorAll("#main-a-video");    //# a-video


LIST[0].addEventListener("click", function (e) {    // 이벤트 버블링 활용
  if (e.target == MENU_BTN[0]) {
    closeTab(); // 다 닫은다음에
    openTab(0); // 특정탭만 열자

    // 만약에 비디오가 있으면 비디오 오픈/클로즈 실행
    if (MAIN_A_VIDEO[0]) {
      closeVideo();
      openVideo(0);
    } else {
      closeVideo();
    }
  }
  if (e.target == MENU_BTN[1]) {
    closeTab();
    openTab(1);

    if (MAIN_A_VIDEO[1]) {
      closeVideo();
      openVideo(1);
    } else {
      closeVideo();
    }
  }
  if (e.target == MENU_BTN[2]) {
    closeTab();
    openTab(2);

    if (MAIN_A_VIDEO[2]) {
      closeVideo();
      openVideo(2);
    } else {
      closeVideo();
    }
  }
  if (e.target == MENU_BTN[3]) {
    closeTab();
    openTab(3);

    if (MAIN_A_VIDEO[3]) {
      closeVideo();
      openVideo(3);
    } else {
      closeVideo();
    }
  }
  if (e.target == MENU_BTN[4]) {
    closeTab();
    openTab(4);

    if (MAIN_A_VIDEO[4]) {
      closeVideo();
      openVideo(4);
    } else {
      closeVideo();
    }
  }
});

const openTab = (i) => {
  PAGE[i].classList.remove("hide");
  PAGE[i].classList.add("show");
};

const closeTab = () => {
  for (let i = 0; i < MENU_BTN.length; i++) {
    PAGE[i].classList.remove("show");
    PAGE[i].classList.add("hide");
  }
};

const openVideo = (i) => {
  MAIN_A_VIDEO[i].setAttribute("visible", true);
};

const closeVideo = () => {
  for (let i = 0; i < MAIN_A_VIDEO.length; i++) {
    MAIN_A_VIDEO[i].setAttribute("visible", false);
  }
};






// for (let i = 0; i < MENU_BTN.length; i++) {
//   MENU_BTN[i].addEventListener("click", function () {
//     // 1번 페이지 빼고 다 안보이게
//     if (i == 0) {
//       PAGE[0].classList.remove("hide");
//       PAGE[1].classList.add("hide");
//       PAGE[2].classList.add("hide");
//       PAGE[3].classList.add("hide");
//       PAGE[4].classList.add("hide");

//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", true);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     // 2번 페이지 빼고 다 안보이게
//     if (i == 1) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "block";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", true);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     if (i == 2) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "block";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", true);
//     }
//     if (i == 3) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "block";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     if (i == 4) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "block";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }

//   });
// }

// // function showPage() {
// //   PAGE[0].style.display = "block";
// //   PAGE[1].style.display = "none";
// //   PAGE[2].style.display = "none";
// //   PAGE[3].style.display = "none";
// //   PAGE[4].style.display = "none";
// //   MAIN_A_VIDEO[0].setAttribute("visible", true);
// //   MAIN_A_VIDEO[1].setAttribute("visible", false);
// //   MAIN_A_VIDEO[2].setAttribute("visible", false);
// // }

// const NEXT_BTN = document.querySelectorAll("#menu-btn-next");
// // console.log(NEXT_BTN);
// const PREV_BTN = document.querySelectorAll("#menu-btn-prev");
// // console.log(PREV_BTN);

// for (let i = 0; i < NEXT_BTN.length; i++) {
//   NEXT_BTN[i].addEventListener("click", function () {
//     // 두번째 페이지로
//     if (i == 0) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "block";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", true);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     // 세번째 페이지로
//     if (i == 1) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "block";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", true);
//     }
//     // 네번째 페이지로
//     if (i == 2) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "block";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     // 다섯번째 페이지로
//     if (i == 3) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "block";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }

//   })
// }

// for (let i = 0; i < PREV_BTN.length; i++) {
//   PREV_BTN[i].addEventListener("click", function () {
//     // 첫번째 페이지로
//     if (i == 0) {
//       PAGE[0].style.display = "block";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", true);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     // 두번째 페이지로
//     if (i == 1) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "block";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", true);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }
//     // 세번째 페이지로
//     if (i == 2) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "block";
//       PAGE[3].style.display = "none";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", true);
//     }
//     // 네번째 페이지로
//     if (i == 3) {
//       PAGE[0].style.display = "none";
//       PAGE[1].style.display = "none";
//       PAGE[2].style.display = "none";
//       PAGE[3].style.display = "block";
//       PAGE[4].style.display = "none";
//       MAIN_A_VIDEO[0].setAttribute("visible", false);
//       MAIN_A_VIDEO[1].setAttribute("visible", false);
//       MAIN_A_VIDEO[2].setAttribute("visible", false);
//     }

//   })
// }

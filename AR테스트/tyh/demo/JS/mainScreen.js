//# video.js를 위한 player
var player = videojs("main-video-0", {});
var player2 = videojs("main-video-1", {});
// console.log(player);

//# 메뉴 버튼
const menu_btn_1 = document.querySelectorAll("#menu-btn-1"); // 첫번째 tap
const menu_btn_2 = document.querySelectorAll("#menu-btn-2"); // 두번째 tap
const menu_btn_3 = document.querySelectorAll("#menu-btn-3");
const menu_btn_4 = document.querySelectorAll("#menu-btn-4");
const menu_btn_5 = document.querySelectorAll("#menu-btn-5");
// const menu_btn_6 = document.querySelectorAll("#menu-btn-6"); // 여섯번째 tap

//# 첫번째 비디오
const ex_video = document.querySelector("#main_video-0"); // video.js의 video
const a_video = document.querySelector("#a-video-0"); // a-video
//# 두번째 비디오
const ex_video2 = document.querySelector("#main_video-1");
const a_video2 = document.querySelector("#a-video-1"); // a-video

//# 메인 페이지
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");
// const page6 = document.querySelector("#page6");

//@ 첫번째 버튼 클릭했을때
for (let i = 0; i < menu_btn_1.length; i++) {
  menu_btn_1[i].addEventListener("click", function () {
    // 1번 페이지 빼고 다 안보이게
    page1.style.display = "block";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "none";
    page5.style.display = "none";
    // page6.style.display = "none";

    // 첫번째 영상만 보이게 하기
    a_video.setAttribute("visible", true);
    a_video2.setAttribute("visible", false);

    // 두번째 영상 멈추기
    player2.pause();
    play_pause_icon_2.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화
  });
}

//@ 두번째버튼 클릭했을때
for (let i = 0; i < menu_btn_2.length; i++) {
  menu_btn_2[i].addEventListener("click", function () {
    // 2번 페이지 빼고 다 안보이게
    page1.style.display = "none";
    page2.style.display = "block";
    page3.style.display = "none";
    page4.style.display = "none";
    page5.style.display = "none";
    // page6.style.display = "none";

    // 두번째 영상만 보이게 하기
    a_video2.setAttribute("visible", true);
    a_video.setAttribute("visible", false);

    // 첫번째 영상 멈추기
    player.pause();
    play_pause_icon_1.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화
  });
}

//@ 세번째버튼 클릭했을때
for (let i = 0; i < menu_btn_3.length; i++) {
  menu_btn_3[i].addEventListener("click", function () {
    // 3번 페이지 빼고 다 안보이게
    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "block";
    page4.style.display = "none";
    page5.style.display = "none";
    // page6.style.display = "none";

    // 모든 영상 멈추기
    player.pause();
    player2.pause();
    play_pause_icon_1.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화
    play_pause_icon_2.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화

    // 모든 영상 안보이게하기
    a_video.setAttribute("visible", false);
    a_video2.setAttribute("visible", false);
  });
}

//@ 네번째버튼 클릭했을때
for (let i = 0; i < menu_btn_4.length; i++) {
  menu_btn_4[i].addEventListener("click", function () {
    // 4번 페이지 빼고 다 안보이게
    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "block";
    page5.style.display = "none";
    // page6.style.display = "none";

    // 모든 영상 멈추기
    player.pause();
    player2.pause();
    play_pause_icon_1.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화
    play_pause_icon_2.innerText = "play_arrow"; // 버튼 텍스트 재생버튼으로 초기화

    // 모든 영상 안보이게하기
    a_video.setAttribute("visible", false);
    a_video2.setAttribute("visible", false);
  });
}







// --------------------------------------------------------------------------------------------

//* 버튼 클릭시 재생하기 / 멈추기
const play_pause_btn_1 = document.querySelector(".play-pause-btn-1");
const play_pause_btn_2 = document.querySelector(".play-pause-btn-2");
const play_pause_icon_1 = document.querySelector("#playPause1");
const play_pause_icon_2 = document.querySelector("#playPause2");

play_pause_btn_1.addEventListener("click", function () {
  //! video 요소를 가져와서 이벤트 거는게 아니라 Player에다가 이벤트를 걸어야 함
  let isPaused = player.paused();
  // let isPlaying = !player.paused();

  if (isPaused) {
    // 멈춰있다면 재생하기
    player.play();
    play_pause_icon_1.innerText = "pause";
  } else {
    // 재생중이면 멈추기
    player.pause();
    play_pause_icon_1.innerText = "play_arrow";
  }
});

play_pause_btn_2.addEventListener("click", function () {
  let isPaused = player2.paused();

  if (isPaused) {
    // 멈춰있다면 재생하기
    player2.play();
    play_pause_icon_2.innerText = "pause";
  } else {
    // 재생중이면 멈추기
    player2.pause();
    play_pause_icon_2.innerText = "play_arrow";
  }
});
//? 반복문 돌려도 될 듯 



//* 음소거 버튼 클릭시 소리 on/off 하기
const muted_btn_1 = document.querySelector(".muted-btn-1");
const muted_btn_2 = document.querySelector(".muted-btn-2");
const music_on_off_1 = document.querySelector("#musicOnOff1");
const music_on_off_2 = document.querySelector("#musicOnOff2");

muted_btn_1.addEventListener("click", function () {
  let isMuted = player.muted();

  // 음소거면
  if (isMuted) {
    // 음소거 풀고 아이콘 바꾸기
    player.muted(false);
    music_on_off_1.innerText = "volume_up";
  } else {
    player.muted(true);
    music_on_off_1.innerText = "volume_off";
  }
});

muted_btn_2.addEventListener("click", function () {
  let isMuted = player2.muted();

  // 음소거면
  if (isMuted) {
    // 음소거 풀고 아이콘 바꾸기
    player2.muted(false);
    music_on_off_2.innerText = "volume_up";
  } else {
    player2.muted(true);
    music_on_off_2.innerText = "volume_off";
  }
});

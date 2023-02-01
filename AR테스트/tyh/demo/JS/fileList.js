const fileListUrl = `https://mds.idb.ai:50000/mp4_list `; // 영상파일 리스트 불러오는 api

const getFileListData = async () => {
  const response = await fetch(fileListUrl);
  const resJSON = await response.text();
  return resJSON;
};
getFileListData().then((result) => {
  // console.log(result); // string으로 넘어옴

  let replaceStr = result.replace("[", ""); // 앞의 [ 제거
  replaceStr = replaceStr.replace("]", ""); // 뒤의 ] 제거
  replaceStr = replaceStr.replace(/{/g, ""); // { 모두 제거
  replaceStr = replaceStr.replace(/}/g, ""); // } 모두 제거
  replaceStr = replaceStr.replace(/'/g, ""); // ' 모두제거
  replaceStr = replaceStr.replace(/path: /g, "")
  replaceStr = replaceStr.replace(/fname: /g, "")
  let splitStrArr = replaceStr.split(", "); // 콤마 기준으로 나눠서 배열로 생성

  const pathArr = [];
  const fileNameArr = [];

  splitStrArr.find((e, i) => {
    if (e.substring(0, 6) == "/media") {
      pathArr.push(e)
    } else {
      fileNameArr.push(e)
    }
  })

  showFileList(pathArr, fileNameArr);
}); // getFileListData 끝



//^ 텍스트 데이터를 화면에 바인딩
function showFileList(pathArr, fileNameArr) {
  console.log(pathArr);
  console.log(fileNameArr);

  const tbody = document.getElementById("tbody");

  fileNameArr.forEach((element, index) => {
    let temp = document.createElement("tr");
    temp.innerHTML = `<td class="file__name btn" id="fileData${index}"></td>`;

    tbody.append(temp);
    const file_name = document.querySelectorAll(".file__name")
    file_name[index].innerHTML = `${index + 1}.  ${element}`;


    // click 시 비디오 소스 바꾸기
    file_name[index].addEventListener("click", () => {
      // console.log(file_name[index])
      const subVideo = document.querySelector("#sub-video");
      // console.log(subVideo);
      
      subVideo.innerHTML = `
        <source src="https://mds.idb.ai:9443${pathArr[index]}">
      `
      console.log(subVideo);
    })

  });


  // showVideo(pathArr, fileNameArr);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~  동영상 재생
// for (let i = 0; i < sub_video.length; i++) {
//   // 비디오의 개수만큼만 플레이어 만들면 되니까
//   subPlayer.push((window["subPlayer" + i] = videojs("sub-video-" + i, {}))); //^ 동적으로 변수만들기
// }
// console.log(subPlayer);


// function showVideo(pathArr, fileNameArr) {
  

  // subVideo.setAttribute('src', `https://mds.idb.ai:9443/media/rtsp/cam1/2023/01/31/13/202301311332.mp4`);

//   const fileList = document.querySelectorAll(".model-file-data");
//   // console.log(fileList);
//   // console.log(fileList.length);

//   //# 중앙 스크린
//   const sub_page = document.querySelectorAll("#sub-page");
//   //# 재생, 일시정지 버튼과 아이콘
//   const sub_play_pause_btn = document.querySelectorAll("#sub-play-pause-btn");
//   const sub_play_pause_icon = document.querySelectorAll("#sub-play-pause-icon");
//   //# 음소거 on off 버튼과 아이콘
//   const sub_muted_btn = document.querySelectorAll("#sub-muted-btn");
//   const sub_muted_icon = document.querySelectorAll("#sub-muted-icon");


//   for (let i = 0; i < fileList.length; i++) {

//     //^ 각각의 테이블 클릭시 영상 보여주기
//     fileList[i].addEventListener("click", function () {
//       sub_page[i].style.display = "block";
//       sub_a_video[i].setAttribute("visible", true);
//       subPlayer[i].pause();
//       sub_play_pause_icon[i].innerText = "play_arrow";

//       if (fileList[i - 1] !== undefined) {
//         sub_page[i - 1].style.display = "none";
//         sub_a_video[i - 1].setAttribute("visible", false);
//         subPlayer[i - 1].pause();
//         sub_play_pause_icon[i - 1].innerText = "play_arrow";
//       }
//       if (fileList[i + 1] !== undefined) {
//         sub_page[i + 1].style.display = "none";
//         sub_a_video[i + 1].setAttribute("visible", false);
//         subPlayer[i + 1].pause();
//         sub_play_pause_icon[i + 1].innerText = "play_arrow";
//       }

//     });


//     // 재생, 일시정지
//     sub_play_pause_btn[i].addEventListener("click", function () {
//       let isPaused = subPlayer[i].paused();
//       // console.log(isPaused)
//       // let isPlaying = !player.paused();

//       if (isPaused) {
//         subPlayer[i].play();
//         sub_play_pause_icon[i].innerText = "pause";
//       } else {
//         subPlayer[i].pause();
//         sub_play_pause_icon[i].innerText = "play_arrow";
//       }

//       subPlayer[i].loop(true) // 계속 반복
//     });


//     sub_muted_btn[i].addEventListener("click", function () {
//       let isMuted = subPlayer[i].muted();

//       if (isMuted) {
//         subPlayer[i].muted(false);
//         sub_muted_icon[i].innerText = "volume_up";
//       } else {
//         subPlayer[i].muted(true);
//         sub_muted_icon[i].innerText = "volume_off";
//       }

//     });

//   }
  
// }

  


//TODO: 파일 클릭시 비디오 재생시키기
//# 비디오도 동적으로 받아와서 body의 맨 위에 insertinject
//? 비디오와 파일리스트의 개수를 비교해서 같아야함? 아니면 비디오가 없는 파일들도 있을까?
//# 파일 리스트의 개수만큼 sub-screen 을 동적으로 생성해서 #main2에 insert
//# 파일 리스트의 개수만큼 반복해서 클릭 이벤트
//# 각각의 파일을 눌렀을 때 sub-screen이 바뀌도록

//idea
// 1. player 생성
// 2. video 동적으로 불러옴
// 3. file list 동적으로 불러옴
// 4. 스크린, 재생버튼, 음소거버튼 동적으로 생성
// 5. 이벤트 걸기

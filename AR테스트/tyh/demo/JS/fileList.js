const fileListUrl = `https://mds.idb.ai:50000/mp4_list`; // 영상파일 리스트 불러오는 api


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



function showFileList(pathArr, fileNameArr) {
  // console.log(pathArr);
  // console.log(fileNameArr);

  const tbody = document.getElementById("tbody");

  fileNameArr.forEach((element, index) => {
    let temp = document.createElement("tr");
    temp.innerHTML = `<td class="file__name btn" id="fileData${index}"></td>`;

    tbody.append(temp);
    const file_name = document.querySelectorAll(".file__name")
    file_name[index].innerHTML = `${index + 1}.  ${element}`;


    // click 시 비디오 소스 바꾸기
    file_name[index].addEventListener("click", () => {
      const subVideo = document.querySelector("#sub-video");
      // console.log(subVideo);
      
      subVideo.innerHTML = `
        <source src="https://mds.idb.ai:9999${pathArr[index]}">
      `
      // console.log(subVideo);
    })

  });

}



//idea
// 1. player 생성
// 2. video 동적으로 불러옴
// 3. file list 동적으로 불러옴
// 4. 스크린, 재생버튼, 음소거버튼 동적으로 생성
// 5. 이벤트 걸기

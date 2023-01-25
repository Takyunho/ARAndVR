const modelFileUrl = `http://221.160.83.102:58787/rest/get_model_files`; // 모델 파일정보를 불러오는 api

const getModelFileData = async () => {
  const response = await fetch(modelFileUrl);
  const resJSON = await response.text(); // text
  return resJSON;
};
getModelFileData().then((result) => {
  // console.log(result); // string으로 넘어옴
  let replaceStr = result.replace("[", ""); // 앞의 [ 제거
  replaceStr = replaceStr.replace("]", ""); // 뒤의 ] 제거
  replaceStr = replaceStr.replace(/'/g, ""); // ' 모두제거
  let splitStr = replaceStr.split(", "); // 콤마 기준으로 나눠서 배열로 생성
  // console.log(splitStr);

  let fileNameArr = [];

  splitStr.forEach((element, index) => {
    // console.log(element);
    if (element != "") fileNameArr[index] = element.replace("/ai/models/", "");
  });
  // console.log(fileNameArr);

  textBinding(fileNameArr);
}); // getModelFileData 끝


//^ 텍스트 데이터를 화면에 바인딩
function textBinding(fileNameArr) {
  const modelFile = document.getElementById("modelFile");
  const tbody = document.getElementById("tbody");

  fileNameArr.forEach((element, index) => {
    // console.log(element)
    let temp = document.createElement("tr");
    // temp.classList.add("model-file-tbody");
    temp.innerHTML = `
        <td class="model-file-data" id="modelFileData${index}"></td>
    `;
    tbody.append(temp);
    document.getElementById(`modelFileData${index}`).innerHTML = `${index + 1}.  ${element}`;
  });
} // textBinding() 끝
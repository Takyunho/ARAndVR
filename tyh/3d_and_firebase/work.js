
//@ modal control
const workMsgBtn = document.getElementById('workMsgBtn');
const blackBG = document.querySelector('.black-background');
const modalCloseBtn = document.querySelector('#modal-close-btn');

workMsgBtn.addEventListener('click', () => {
  blackBG.classList.toggle("upDown-slide")
  // jQuery('.black-background').show();
})

modalCloseBtn.addEventListener('click', () => {
  blackBG.classList.remove("upDown-slide")
  // jQuery('.black-background').hide();
})

//@ firebase message push
const urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let from = document.getElementById('from');
let to = document.getElementById('to');
from.value = user	// 초기값 설정

  console.log(document.getElementById("message").value)

//@ send message
function send_msg() {
  fetch("https://ar.idb.ai:50000/send_noti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      message: document.getElementById("message").value,
    }),
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}


//@ Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzASyAzwQJFCn2oYC1mLpzCEzVK775wV1RHNRK",	// 만든키
  authDomain: "test-6ab08.firebaseapp.com",	// 만든 도메인
  projectId: "test-6ab08",	// 아이디0
  storageBucket: "test-6ab08.appspot.com",	// 만든버킷저장소
  messagingSenderId: "343867546285",	// 아이디1
  appId: "1:243867546285:web:9c4b6ee033f0b6d9bdc424",	 // 아이디2
});

// token값 알아내기
const messaging = firebase.messaging();

messaging.requestPermission()		// 등록 토큰에 엑세스
  .then(function () {
    console.log("Have permission");
    return messaging.getToken();
  })
  .then(function (token) {
    console.log("토큰입니다", token);
    fetch("https://ar.idb.ai:50000/save_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user,
        user_token: token,
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json))
  })
  .catch(function (err) {
    console.log("Error Occured", err)
  });


const receiveBox = document.querySelector(".receive-box");
const receiveBoxClose = document.querySelector('#receive-close-btn');

  //@ 메시지 받을 때 실행됨
messaging.onMessage(function (payload) {
  console.log("received payload", payload)
  console.log("Message received. ", JSON.stringify(payload));
  //notificationElement.innerHTML = notificationElement.innerHTML + " " + payload.data.notification;
  //notificationElement.innerHTML = notificationElement.innerHTML + " " + payload.notification.title;

  // console.log("쿼리스트링", user)
  // console.log("from의 값", from.value)
  // console.log("to의 값", to.value)
  // console.log(receiveBox)
  // undefined 랑 null일때 처리하는거 있었는데
  if (payload.notification !== undefined) {
    // body가 있을 경우, 알람 띄우기
    receiveBox.classList.add('upDown-slide')
    document.getElementById("recv").value = payload.notification.body;





    receiveBoxClose.addEventListener('click', () => {
      console.log("click")
      receiveBox.classList.remove('upDown-slide');
    })
  }
  
});



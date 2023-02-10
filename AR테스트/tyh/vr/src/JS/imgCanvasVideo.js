//* yolo rtsp
const video = document.getElementById("video");
const videoSrc = "https://ar.idb.ai:8443/rtsp/cam1/index.m3u8";
if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoSrc;
} else if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
}

//* - 일반 rtsp1
// var video_rtsp = document.getElementById("video-rtsp1");
// // var videoSrc_rtsp = "https://ar.idb.ai:8443/rtsp/cam1/index.m3u8";
// // var videoSrc_rtsp = "https://mds.idb.ai:9443/media/rtsp/cam1/2023/01/31/13/202301311332.mp4";
// if (video_rtsp.canPlayType("application/vnd.apple.mpegurl")) {
//   video_rtsp.src = videoSrc_rtsp;
// } else if (Hls.isSupported()) {
//   var hls2 = new Hls();
//   hls2.loadSource(videoSrc_rtsp);
//   hls2.attachMedia(video_rtsp);
// }


// 일반 video태그로 mp4(rtsp) 띄우기
// const video_mp4 = document.querySelector("#video-rtsp2")
// video_mp4.setAttribute('src', "http://218.145.103.108:9000//media/rtsp/cam1/2023/01/31/10/202301311052.mp4");
// console.log(video_mp4)

// video.js로 rtsp mp4 파일 api로 받아서 띄우기
// const video3_src = document.querySelector("#video3 source");
// video3_src.src = "https://ar.idb.ai:8443/rtsp/cam1/index.m3u8";
// console.log(video3)
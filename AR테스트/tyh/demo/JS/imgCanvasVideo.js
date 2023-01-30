  // yolo rtsp
const video = document.getElementById('video');
  const videoSrc = 'http://183.111.79.81:8000/rtsp/cam1/index.m3u8';
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);


  // 일반 rtsp
  var video_rtsp = document.getElementById('video-rtsp2');
	var videoSrc_rtsp = 'https://ar.idb.ai:8443/rtsp/cam1/index.m3u8';
	var hls2 = new Hls();
	hls2.loadSource(videoSrc_rtsp);
	hls2.attachMedia(video_rtsp);
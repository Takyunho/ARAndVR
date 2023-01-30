  const video = document.getElementById('video');
  const videoSrc = 'http://183.111.79.81:8000/rtsp/cam1/index.m3u8';
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);

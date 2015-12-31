var canvas = document.getElementById('cursor-canvas');
var ctx = canvas.getContext('2d');

var goFullscreen = function(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
};

var isFullscreen = function() {
  return (
      !!document.fullScreenElement ||
      !!document.mozFullScreenElement ||
      !!document.webkitFullscreenElement ||
      !!document.msFullscreenElement);
};

document.body.addEventListener('click', function() {
  goFullscreen(canvas);
});

var fullscreenEvents = [
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'fullscreenchange',
    'MSFullscreenChange'];

var fullscreenEventFunction = function(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.rect(100, 100, 100, 100);
  ctx.stroke();

  // Red rectangle
  ctx.beginPath();
  ctx.lineWidth="6";
  ctx.strokeStyle="red";
  ctx.rect(5,5,290,140);
  ctx.stroke();

  var text = isFullscreen() ? "Fullscreen" : "Not fullscreen";
  ctx.fillText(text, 10, 50);
};

for (var i = 0; i < fullscreenEvents.length; ++i) {
  document.body.addEventListener(fullscreenEvents[i], fullscreenEventFunction);
}

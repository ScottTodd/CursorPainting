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

var startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
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

  var text = isFullscreen() ? 'Fullscreen' : 'Not fullscreen';
  ctx.fillText(text, 10, 50);
};

for (var i = 0; i < fullscreenEvents.length; ++i) {
  document.body.addEventListener(fullscreenEvents[i], fullscreenEventFunction);
}

document.body.addEventListener('mousemove', function(e) {
  var x = e.clientX;
  var y = e.clientY;

  ctx.fillStyle = '#000000';
  ctx.rect(x, y, 1, 1);
  ctx.fill();
});

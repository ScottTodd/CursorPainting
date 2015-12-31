var canvas = document.getElementById('cursor-canvas');
var ctx = canvas.getContext('2d');

var isFullscreen = function() {
  return (
      !!document.fullScreenElement ||
      !!document.mozFullScreenElement ||
      !!document.webkitFullscreenElement ||
      !!document.msFullscreenElement);
};

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

var startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
  goFullscreen(canvas);
});

var mousemoveFunction = function(e) {
  // Draw a dot where the mouse is.
  var x = e.clientX;
  var y = e.clientY;

  ctx.fillStyle = '#000000';
  ctx.rect(x, y, 1, 1);
  ctx.fill();
};

var touchmoveFunction = function(e) {
  for (var i = 0; i < e.touches.length; ++i) {
    var touch = e.touches[i];

    // Draw a dot where the touch is.
    var x = touch.clientX;
    var y = touch.clientY;

    ctx.fillStyle = '#000000';
    ctx.rect(x, y, 1, 1);
    ctx.fill();
  }
};

window.addEventListener('resize', function() {
  if (isFullscreen()) {
    // Resize canvas to match screen size.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

var enterFullscreen = function() {
  document.body.addEventListener('mousemove', mousemoveFunction);
  document.body.addEventListener('touchstart', touchmoveFunction);
  document.body.addEventListener('touchmove', touchmoveFunction);
};

var exitFullscreen = function() {
  // Clear canvas :(
  // TODO: properly translate/rescale canvas contents between modes?
  canvas.width = 0;
  canvas.height = 0;

  document.body.removeEventListener('mousemove', mousemoveFunction);
  document.body.removeEventListener('touchstart', touchmoveFunction);
  document.body.removeEventListener('touchmove', touchmoveFunction);
};

var fullscreenEvents = [
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'fullscreenchange',
    'MSFullscreenChange'];

var fullscreenEventFunction = function(e) {
  if (isFullscreen()) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
};

for (var i = 0; i < fullscreenEvents.length; ++i) {
  document.body.addEventListener(fullscreenEvents[i], fullscreenEventFunction);
}

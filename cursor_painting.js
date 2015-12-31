var canvas = document.getElementById('cursor-canvas');

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

document.body.addEventListener('click', function() {
  goFullscreen(canvas);
});

var fullscreenEvents = [
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'fullscreenchange',
    'MSFullscreenChange'];

var fullscreenEventFunction = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  ctx.rect(100, 100, 100, 100);
  ctx.stroke();

  // Red rectangle
  ctx.beginPath();
  ctx.lineWidth="6";
  ctx.strokeStyle="red";
  ctx.rect(5,5,290,140);
  ctx.stroke();
};

for (var i = 0; i < fullscreenEvents.length; ++i) {
  document.body.addEventListener(fullscreenEvents[i], fullscreenEventFunction);
}

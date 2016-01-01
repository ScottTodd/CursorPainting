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

// Previous cursor position [x, y].
var previousCursorPosition = [];
// Previous touch positions [[x, y], [x, y], [x, y]].
// Indices are Touch.identifier values.
var previousTouchPositions = [];
// Previous touch statuses. True if still active, false otherwise.
// Indices are Touch.identifier values.
var previousTouchStatuses = [];

var mousemoveFunction = function(e) {
  var x = e.clientX;
  var y = e.clientY;

  if (previousCursorPosition.length == 0) {
    // Draw a dot where the mouse is.
    ctx.fillStyle = '#000000';
    ctx.rect(x, y, 1, 1);
    ctx.fill();
  } else {
    // Draw a line from the previous to current mouse position.
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(previousCursorPosition[0], previousCursorPosition[1]);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  previousCursorPosition[0] = x;
  previousCursorPosition[1] = y;
};

var touchmoveFunction = function(e) {
  for (var i = 0; i < e.touches.length; ++i) {
    var touch = e.touches[i];
    var identifier = touch.identifier;

    var x = touch.clientX;
    var y = touch.clientY;

    if (!previousTouchStatuses[identifier]) {
      // Draw a dot where the touch is.
      ctx.fillStyle = '#000000';
      ctx.rect(x, y, 1, 1);
      ctx.fill();
    } else {
      // Draw a line from the previous to current touch position.
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(previousTouchPositions[identifier][0],
                 previousTouchPositions[identifier][1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    previousTouchStatuses[identifier] = true;
    if (previousTouchPositions[identifier] === undefined) {
      previousTouchPositions[identifier] = [x, y];
    } else {
      previousTouchPositions[identifier][0] = x;
      previousTouchPositions[identifier][1] = y;
    }
  }
};

var touchendFunction = function(e) {
  for (var i = 0; i < e.changedTouches.length; ++i) {
    var identifier = e.changedTouches[i].identifier;
    previousTouchStatuses[identifier] = false;
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
  document.body.addEventListener('touchend', touchendFunction);
};

var exitFullscreen = function() {
  // Clear canvas :(
  // TODO: properly translate/rescale canvas contents between modes?
  canvas.width = 0;
  canvas.height = 0;

  previousCursorPosition.length = 0;
  previousTouchPositions.length = 0;
  previousTouchStatuses.length = 0;

  document.body.removeEventListener('mousemove', mousemoveFunction);

  document.body.removeEventListener('touchstart', touchmoveFunction);
  document.body.removeEventListener('touchmove', touchmoveFunction);
  document.body.removeEventListener('touchend', touchendFunction);
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

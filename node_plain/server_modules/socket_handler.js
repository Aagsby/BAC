var moduleState = {
  counter: 0
}

var initializeHandlers = function(socket) {
  socket.on('test_ping', function(time) {
    moduleState.counter += 1;
    socket.emit('test_pong', {time: time, c: moduleState.counter});
    socket.emit('change_color', randomColourGrayScale());
  });
}

function randomColour() {
  return 'rgb(' + ranInt(0, 256) + ',' + ranInt(0, 256) + ',' + ranInt(0,256) + ')';
}

function randomColourGrayScale() {
  var brightness = ranInt(0, 256);
  return 'rgb(' + brightness + ',' + brightness + ',' + brightness + ')';
}

function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = initializeHandlers
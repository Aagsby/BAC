var initializeHandlers = function(socket,nsp) {
  nsp.emit('debug','Connected to namespace');
  socket.on('test_ping', function(time) {
    nsp.to(socket.id).emit('test_pong', time);
    nsp.to(socket.id).emit('change_color', randomColourGrayScale());
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

module.exports = {
  initializeHandlers: initializeHandlers
}
var socket = io();
socket.on('room', function(msg) {
  socket = io('/' + msg);

  socket.on('debug',function(msg) {
    console.log(msg);
  });

  socket.on('change_color', function(color) {
    console.log('received color: ' + color);
    $('html').css('background', color);
  });

  socket.on('test_pong', function(time) {
    console.log($.now() - time + 'ms');
    setTimeout(function(){
      socket.emit('test_ping', $.now());
    }, 1000);
  });
  socket.emit('test_ping',$.now());
})
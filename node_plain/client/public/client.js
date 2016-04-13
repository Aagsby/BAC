var socket = io();

socket.on('server_change',function() {
  socket.disconnect();
  socket.connect();
})

socket.on('debug',function(msg) {
  console.log(msg);
});

socket.on('change_color', function(color) {
  console.log('received color: ' + color);
  $('html').css('background', color);
});

socket.on('test_pong', function(data) {
  console.log($.now() - data.time + 'ms');
  document.getElementById('counter').innerHTML = data.c;
  setTimeout(function(){
    console.log('sent time')
    socket.emit('test_ping', $.now());
    socket.emit('second_ping', $.now());
  }, 1000);
});
socket.emit('test_ping',$.now());

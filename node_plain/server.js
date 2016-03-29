// Server Modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Hot Swapping Modules
var fs = require('fs');

app.use("", express.static(path.join(__dirname, 'client/public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var socketHandler = require('./server_modules/socket_handler.js');

var fsTimeout = false;
fs.watch('./server_modules/socket_handler.js', function(e) {
    if (!fsTimeout) {
      var name = require.resolve('./server_modules/socket_handler.js');
      delete require.cache[name];
      socketHandler = require('./server_modules/socket_handler.js');
      io.emit('server_change');
      console.log('socketHandler changed');
      fsTimeout = setTimeout(function() { fsTimeout=false }, 2500)
    }
});

io.on('connection', function(socket){
  socketHandler(socket);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
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


function addModuleChangeListener(module, config) {
  fs.watch(module, function(e) {
      if (!fsTimeout) {
        if(typeof config === 'object' && typeof config.pre === 'function') {
          config.pre();
        }
        var name = require.resolve(module);
        delete require.cache[name];
        socketHandler = require(module);
        fsTimeout = setTimeout(function() { fsTimeout=false }, 2500)
        if(typeof config === 'object' && typeof config.post === 'function') {
          config.post();
        }
      }
  });
}

addModuleChangeListener('./server_modules/socket_handler.js', {
  post: function(){io.emit('server_change')}
});
//addModuleChangeListener('./server_modules/other_module.js');

io.on('connection', function(socket){
  socketHandler(socket);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
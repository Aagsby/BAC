var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
var uid = require('uid');

app.use("", express.static(path.join(__dirname, 'client/public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var socketHandler = require('./server_modules/socket_handler.js');
var currentSocketNameSpace = '';
var allNameSpaces = {};

function printAllNameSpaces() {
  console.log('\n=======\nStart NameSpaces Printout\n=======');
  for(var nspName in allNameSpaces) {
    console.log();
    console.log(nspName);
    console.log('Active: ' + allNameSpaces[nspName].active);
    console.log('NumConnections: ' + allNameSpaces[nspName].connections);
  }
  setTimeout(printAllNameSpaces, 5000);
}
setTimeout(printAllNameSpaces, 5000);

function cleanEmptyNameSpaces() {
  for(var nspName in allNameSpaces) {
    if(allNameSpaces[nspName].connections === 0 && !allNameSpaces[nspName].active) {
      delete allNameSpaces[nspName];
      delete io.nsps[nspName];
    }
  }
}

function initializeNewSocketNameSpace() {
  if(allNameSpaces[currentSocketNameSpace]) {
    allNameSpaces[currentSocketNameSpace].active = false;
  }

  currentSocketNameSpace = 'socket_' + uid(16);
  var thisNameSpaceName = currentSocketNameSpace

  var nsp = io.of('/' + currentSocketNameSpace);

  allNameSpaces[thisNameSpaceName] = {
    active: true,
    nameSpace: nsp,
    connections: 0
  }

  nsp.on('connection', function(socket) {
    allNameSpaces[thisNameSpaceName].connections += 1;
    socketHandler.initializeHandlers(socket, nsp);
    socket.on('disconnect', function(socket) {
      allNameSpaces[thisNameSpaceName].connections -= 1;
      if(!allNameSpaces[thisNameSpaceName].active && allNameSpaces[thisNameSpaceName].connections === 0) {
        delete allNameSpaces[thisNameSpaceName];
        delete io.nsps[thisNameSpaceName];
      }
    });
  });
}

var fsTimeout = false;
fs.watch('./server_modules/socket_handler.js', function(e) {
    if (!fsTimeout) {
      var name = require.resolve('./server_modules/socket_handler.js');
      delete require.cache[name];
      socketHandler = require('./server_modules/socket_handler.js');
      initializeNewSocketNameSpace();
      cleanEmptyNameSpaces();
      fsTimeout = setTimeout(function() { fsTimeout=false }, 2500)
    }
});

io.on('connection', function(socket){
  io.to(socket.id).emit('room', currentSocketNameSpace);
});

initializeNewSocketNameSpace();
http.listen(3000, function(){
  console.log('listening on *:3000');
});
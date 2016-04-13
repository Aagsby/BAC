// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})
socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("connection:lobby", {})

channel.on("test_pong", data => {
	console.log(($.now() - data.time) + 'ms')
  $('#counter').html(data.counter)
	setTimeout(function(){channel.push("test_ping",{time: $.now()})}, 1000);
});

channel.on("color", data => {
	$('html').css('background', data.c);
});

channel.join()
  .receive("ok", resp => { channel.push("test_ping",{time: $.now()}); })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket

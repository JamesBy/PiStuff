$(document).ready(function(){

	var socket = io("http://192.168.0.17:3000");

 //  	socket.on('news', function (data) {
 //    	console.log(data);
	// });
    // socket.emit('Hello', { my: 'data' });

	$( ".btn" ).on('touchstart click',function() {
      	// $('form').submit(function(){
      var dname = $(this).attr("id");
       socket.emit('move', dname);
      console.log(dname);
        // $('#m').val('');
        // return false;
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });

     });
	$( ".btn" ).mouseup(function() {
  		socket.emit('move', 'stop');
	});
});

$( ".btn" ).mousedown(function() {
//   // var soc?ket = io.connect('http://192.168.0.17:3000/socket.io/socket.io.js');
//    socket.emit('chat message', 'HHHHAAAAAAAAAAAA');
//    console.log('sentit');
//    console.log("Hello there!!!");
// 	socket.emit('my other event', { my: 'data' });
//     return false;
});
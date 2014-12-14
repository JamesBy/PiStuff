$(document).ready(function(){
  
	window.socket = io("http://89.100.207.53:3000");
	
	window.G_touchdown = false;
	window.G_Tolerance = 50;
	window.G_Status = 0;
	window.G_padSize = 600;

	var $ddiv = $('#invtPad');
	var offset = $ddiv.offset();
	var width = $ddiv.outerWidth();
	var height = $ddiv.height();

	window.G_X = offset.left + width / 2;
	window.G_Y = offset.top + height / 2;

});


function changeMode(newMode){
  switch (newMode){
	case "motors":
	  touchPad();

	  break;
	case "servos":
	  break;
  }
}


function touchPad(){
	console.log("Pan tilt you bastard!!");
  
	var box1 = document.getElementById('invtPad');
	var startx = 0;
	var dist = 0;
 
	box1.addEventListener('touchstart', function(e){
		window.G_touchdown = true;

		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger);
		var startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser;
		var startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser;

		var X =  startX - window.G_X;//window.G_startX; 
		var Y =  startY - window.G_Y;//window.G_startY;
		callMover(X,Y);
		e.preventDefault();
	}, false);


	$(box1).mousedown(function(e){//.on('touchstart',function() {
		window.G_touchdown = true;
		var X =  event.pageX - window.G_X;//window.G_startX; 
		var Y =  event.pageY - window.G_Y;//window.G_startY;
		callMover(X,Y);
	});

 
	box1.addEventListener('touchmove', function(e){
		var touchobj = e.changedTouches[0]; // reference first touch point for this event;
		var whereX = parseInt(touchobj.clientX);
		var whereY = parseInt(touchobj.clientY);

		if (window.G_touchdown){
			var X =  whereX - window.G_X;//window.G_startX; 
			var Y =  whereY - window.G_Y;//window.G_startY;
			callMover(X,Y);
		}
		e.preventDefault();
	}, false);


	$(box1).mousemove(function( event ) {
		if (window.G_touchdown){
			var X =  event.pageX - window.G_X;//window.G_startX; 
			var Y =  event.pageY - window.G_Y;//window.G_startY;
			callMover(X,Y);
		}
	});


	function callMover(X,Y){


			console.log("yo x = "+x+" and y = "+y);


			// if ((window.G_Status !== 0)&&((Y>window.G_padSize)||(X>window.G_padSize)||(X<-window.G_padSize)||(X<-window.G_padSize))) {
			// 	// STOPALL
			// 	window.G_touchdown = false;
			// 	stopper();
			// 	console.log("first status");

			// }else if(X>window.G_Tolerance){
				
			// 	if (Y<-window.G_Tolerance){

			// 		if (window.G_Status !== 1){
			// 			//forwardsRight
			// 			window.G_Status = 1;
			// 			socket.emit('move', 'forwardsRight');
			// 			console.log("Forwards Right");
			// 		}

			// 	}else if(Y>window.G_Tolerance){
						
			// 		if (window.G_Status !== 2){
			// 			//backright
			// 			window.G_Status = 2;
			// 			socket.emit('move', 'backRight');
			// 			console.log("Back Right");
			// 		}
				
			// 	}else {

			// 		if (window.G_Status !== 3){
			// 			//right
			// 			window.G_Status = 3;
			// 			socket.emit('move', 'right');
			// 			console.log("Right");
			// 		}

			// 	}
				
			// }else if(X<-window.G_Tolerance){
				
			// 	if (Y<-window.G_Tolerance){
					
			// 		if (window.G_Status !== 4){
			// 			//forwardsleft
			// 			window.G_Status = 4;
			// 			socket.emit('move', 'forwardsLeft');
			// 			console.log("Forwards left");
			// 		}

			// 	}else if(Y>window.G_Tolerance){

			// 		if (window.G_Status !== 5){
			// 			//backleft
			// 			window.G_Status = 5;
			// 			socket.emit('move', 'backLeft');
			// 			console.log("Back left");
			// 		}
			// 	}else {

			// 		if (window.G_Status !== 6){
			// 			//left
			// 			window.G_Status = 6;
			// 			socket.emit('move', 'left');
			// 			console.log("Left");
			// 		}
			// 	}
			// }else if(Y<-window.G_Tolerance){

			// 	if (window.G_Status !== 7){
			// 		//forwards
			// 		window.G_Status = 7;
			// 		socket.emit('move', 'forwards');
			// 			console.log("Forwards");
			// 	}
			// }else if(Y>window.G_Tolerance){

			// 	if (window.G_Status !== 8){
			// 		//back
			// 		window.G_Status = 8;
			// 		socket.emit('move', 'back');
			// 		console.log("Back");
			// 	}

			// }else if (window.G_Status !== 0){

			// 	// STOPALL
			// 	stopper();
			// 	console.log("center");
			// 	window.G_Status = 0;

			// }		
		
	}

 
	box1.addEventListener('touchend', function(e){
		console.log("touchend");
		stopper();
	}, false);

	$(box1).mouseup(function() {
		stopper();
	});
}


function resetThings(){
	window.G_touchdown = false;
	window.G_Status = 0;
	window.G_Stoppercalled = false;
}

function stopper(){

	callStopper();
	var tid = setInterval(callStopper, 10000);
	window.socket.on('messageSuccess', function (data) {
		console.log("all has stopped successfully");
  		clearInterval(tid);
		resetThings();
	});

	function callStopper() {
		console.log("Call stopper");
		// window.socket.emit('move', 'stop');
	}
}


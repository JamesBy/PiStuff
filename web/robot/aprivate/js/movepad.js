window.G_touchPadHandles = "";
window.G_panTiltHandles = "";

$(document).ready(function(){
	console.log("Movepad loaded...well done you.");  
	window.socket = io("http://89.100.207.53:3000");

	changeMode("motors");

	window.G_touchMode = "motors";
	
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
		var box1 = document.getElementById('invtPad');
		box1.removeEventListener('touchstart', window.G_panTiltHandles.pTouchStart);
		box1.removeEventListener('touchmove', window.G_panTiltHandles.pTouchMove);
		box1.removeEventListener('touchend', window.G_panTiltHandles.pTouchEnd);
		$( "#invtPad" ).off(); // Remove mouseup, down etc

	   	$('#moveButton').attr("disabled", true);
		$('#ptButton').removeAttr('disabled');
	   	window.G_touchPadHandles = touchPad();
	 	break;

	case "servos":
		var box1 = document.getElementById('invtPad');
		box1.removeEventListener('touchstart', window.G_touchPadHandles.touchStrt);
		box1.removeEventListener('touchmove', window.G_touchPadHandles.touchMve);
		box1.removeEventListener('touchend', window.G_touchPadHandles.touchNd);
		$( "#invtPad" ).off(); // Remove mouseup, down etc

		$('#ptButton').attr("disabled", true);
		$('#moveButton').removeAttr('disabled');
	   	window.G_panTiltHandles = ptPad();
	 	break;
  }
}


function touchPad(){
	// Return pointers to event handler functions - so they can be removed
	var retHanldes = new Object();
  
	var box1 = document.getElementById('invtPad');
	var startx = 0;
	var dist = 0;

 	// Need handles of functions so they can be removed
	box1.addEventListener('touchstart', touchStrt);

	function touchStrt(e){
		window.G_touchdown = true;
		typeOut("touchstart");

		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger);
		var startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser;
		var startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser;

		var X =  startX - window.G_X;//window.G_startX; 
		var Y =  startY - window.G_Y;//window.G_startY;
		callMover(X,Y);
		e.preventDefault();
	}//, false);
	retHanldes.touchStrt = touchStrt;


	$(box1).mousedown(function(e){//.on('touchstart',function() {
		window.G_touchdown = true;
		var X =  event.pageX - window.G_X;//window.G_startX; 
		var Y =  event.pageY - window.G_Y;//window.G_startY;
		callMover(X,Y);
	});

 
	box1.addEventListener('touchmove', touchMve);
	function touchMve(e){
		typeOut("touchmove");

		var touchobj = e.changedTouches[0]; // reference first touch point for this event;
		var whereX = parseInt(touchobj.clientX);
		var whereY = parseInt(touchobj.clientY);

		if (window.G_touchdown){
			var X =  whereX - window.G_X;//window.G_startX; 
			var Y =  whereY - window.G_Y;//window.G_startY;
			callMover(X,Y);
		}
		e.preventDefault();
	}//, false);
	retHanldes.touchMve = touchMve;
	


	$(box1).mousemove(function( event ) {
		if (window.G_touchdown){
			var X =  event.pageX - window.G_X;//window.G_startX; 
			var Y =  event.pageY - window.G_Y;//window.G_startY;
			callMover(X,Y);
		}
	});


	function callMover(X,Y){

		if ((window.G_Status !== 0)&&((Y>window.G_padSize)||(X>window.G_padSize)||(X<-window.G_padSize)||(X<-window.G_padSize))) {
			// STOPALL
			window.G_touchdown = false;
			stopper();

		}else if(X>window.G_Tolerance){
			
			if (Y<-window.G_Tolerance){

				if (window.G_Status !== 1){
					//forwardsRight
					window.G_Status = 1;
					socket.emit('move', 'forwardsRight');
					console.log("Forwards Right");
				}

			}else if(Y>window.G_Tolerance){
					
				if (window.G_Status !== 2){
					//backright
					window.G_Status = 2;
					socket.emit('move', 'backRight');
					console.log("Back Right");
				}
			
			}else {

				if (window.G_Status !== 3){
					//right
					window.G_Status = 3;
					socket.emit('move', 'right');
					console.log("Right");
				}

			}
			
		}else if(X<-window.G_Tolerance){
			
			if (Y<-window.G_Tolerance){
				
				if (window.G_Status !== 4){
					//forwardsleft
					window.G_Status = 4;
					socket.emit('move', 'forwardsLeft');
					console.log("Forwards left");
				}

			}else if(Y>window.G_Tolerance){

				if (window.G_Status !== 5){
					//backleft
					window.G_Status = 5;
					socket.emit('move', 'backLeft');
					console.log("Back left");
				}
			}else {

				if (window.G_Status !== 6){
					//left
					window.G_Status = 6;
					socket.emit('move', 'left');
					console.log("Left");
				}
			}
		}else if(Y<-window.G_Tolerance){

			if (window.G_Status !== 7){
				//forwards
				window.G_Status = 7;
				socket.emit('move', 'forwards');
					console.log("Forwards");
			}
		}else if(Y>window.G_Tolerance){

			if (window.G_Status !== 8){
				//back
				window.G_Status = 8;
				socket.emit('move', 'back');
				console.log("Back");
			}

		}else if (window.G_Status !== 0){
			// STOPALL
			stopper();
			console.log("center");
			window.G_Status = 0;
		}		
	}

 
	box1.addEventListener('touchend', touchNd);
	function touchNd(e){
		console.log("touchend");
		stopper();
	}//, false);
	retHanldes.touchNd = touchNd;

	$(box1).on('mouseup mouseout',function() {
		stopper();
	});


	typeOut("Move Around Mode");
	return retHanldes;
}


function stopper(){

	callStopper();
	var tid = setInterval(callStopper, 10000);
	window.socket.on('messageSuccess', function (data) {
		console.log(data);
  		clearInterval(tid);
		resetThings();
	});

}

function callStopper() {

	console.log("Call stopper");
	window.socket.emit('move', 'stop');
}

function resetThings(){
	window.G_touchdown = false;
	window.G_Status = 0;
	window.G_Stoppercalled = false;
}



function ptPad(){

	var retHandles = new Object();
	retHandles.lastx = retHandles.lasty = 0; 

	var $ddiv = $('#invtPad');
	retHandles.divWidth = $ddiv.outerWidth();
	retHandles.divHeight = $ddiv.height();


	var sensitivity = 40; //this ... genius variable ... is the amount of calls you want
	//to socket io in the width and height of the touchpad (holds true on responsive - subject to reload)
	retHandles.xGrad = retHandles.divWidth / sensitivity;
	retHandles.yGrad = retHandles.divHeight / sensitivity;

	


	var box1 = document.getElementById('invtPad');
	box1.addEventListener('touchstart', pTouchStart);
	function pTouchStart(e){
		window.G_touchdown = true;
		// typeOut("touchstart");

		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger);
		var startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser;
		var startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser;

		var X =  startX - window.G_X;//window.G_startX; 
		var Y =  startY - window.G_Y;//window.G_startY;
		panTilt(X,Y);
		e.preventDefault();
	}
	retHandles.pTouchStart = pTouchStart



	$(box1).mousedown(function(e){//.on('touchstart',function() {
		window.G_touchdown = true;
		var X =  event.pageX - window.G_X;//window.G_startX; 
		var Y =  event.pageY - window.G_Y;//window.G_startY;
		panTilt(X,Y);
	});

 
	box1.addEventListener('touchmove', pTouchMove);
	function pTouchMove(e){
		typeOut("Move");
		var touchobj = e.changedTouches[0]; // reference first touch point for this event;
		var whereX = parseInt(touchobj.clientX);
		var whereY = parseInt(touchobj.clientY);

		if (window.G_touchdown){
			var X =  whereX - window.G_X;//window.G_startX; 
			var Y =  whereY - window.G_Y;//window.G_startY;
			panTilt(X,Y);
		}
		e.preventDefault();
	}
	retHandles.pTouchMove = pTouchMove;


	$(box1).mousemove(function( event ) {
		if (window.G_touchdown){
			var X =  event.pageX - window.G_X;//window.G_startX; 
			var Y =  event.pageY - window.G_Y;//window.G_startY;
			panTilt(X,Y);
		}
	});

	box1.addEventListener('touchend', touchNd);
	function touchNd(e){
		window.G_touchdown = false;
	}//, false);
	retHandles.touchNd = touchNd;

	$(box1).on('mouseup mouseout',function() {
		window.G_touchdown = false;
	});

	function panTilt(X,Y){
		X=-X;

		if ((Y>window.G_padSize)||(X>window.G_padSize)||(X<-window.G_padSize)||(X<-window.G_padSize)) {
			// STOPALL
			window.G_touchdown = false;
		
		} else { 
			if (((X-retHandles.lastx)> retHandles.xGrad)||((X-retHandles.lastx) < -retHandles.xGrad)){
				retHandles.lastx =  X;
				var value = 150 + (5*(Math.round(X/retHandles.xGrad)));
				console.log("pan "+value);
				window.socket.emit('pan', value);
			}

			if (((Y-retHandles.lasty)> retHandles.yGrad)||((Y-retHandles.lasty) < -retHandles.yGrad)){
				retHandles.lasty =  Y;
				// console.log("tilt : "+Math.round(Y/retHandles.yGrad));
				var value = 150 + (5*(Math.round(Y/retHandles.yGrad)));
				console.log("tilt"+value);
				window.socket.emit('tilt', value);
			}
		}

		window.socket.on('panTiltSuccess', function (data) {
			console.log(data);
		});
	}

 
	// box1.addEventListener('touchend', pTouchEnd);
	// function pTouchEnd(e){
	// 	typeOut("Pan tilt touchend");
	// }
	// retHandles.pTouchEnd = pTouchEnd;

	// $(box1).on('mouseup mouseout',function() {
	// 	resetThings();
	// });
	typeOut("Pan Tilt Mode");
	return retHandles;

}


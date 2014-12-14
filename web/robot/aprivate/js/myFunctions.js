jQuery(document).ready(function($) {

	window.G_state = 0;
	window.G_stack = Array();
	window.G_pieAStatus = 0;
	window.G_pieBStatus = 0;
	window.G_timerStarted = false;

	typeOut("Hello there nothing happening yet....");
	checkStatus();
});



var G_bootCount = 0;

function checkStatus(){
	G_bootCount++;

	typeOut("Status check...");
	pinger("b",function(answer){
		console.log("ping answer: "+answer);

		if(answer){
			// PI B is on
			typeOut("Checking B status");
			$.post( "action.php", { action: "bstatus" }, function( data ) {
				if (data){
					typeOut(""+data);
					if ((data.split('-')[0]).trim()==="streamer"){

						if (window.G_timerStarted === false){
							startShutdownTimer();
						}

						$('#pieBSquare').css('background-color','#3ADF00');
						window.G_pieBStatus = 1;

						statObj = myParse(data);
						
						if (statObj['streamer']==="on"){
							$('#streamdiv').append('<img class="img-responsive" src="http://89.100.207.53:3001/?action=stream" alt="Streamer Off" style="margin: 0px auto;"/>');
						} else {
							fireStreamer();
						}

						if (statObj['node'] === "on"){
							$.getScript('http://89.100.207.53:3000/socket.io/socket.io.js',function(){
								$.getScript('js/movepad.js');
								$('#invtPad').css('display','block');
								$('#ptButton').removeAttr('disabled');
							});
						} else {
							fireNode();
						}
					} 
				}
			});

		} else {
			if (G_bootCount < 2){
				// Pi B is off
				pinger("a",function(ansr){
					if(ansr){
						typeOut("Calling pi A");
						switchOnB();
						typeOut("Waiting 60 seconds for B to boot...tap tap");
						setTimeout(function(){
							// Give B 60 seconds to fire up
							typeOut("Checking pi B again.");
							if (G_bootCount < 2){
								checkStatus();
							}
						},60000);
					}else{
						typeOut("Looks like we are out of luck....\nNo pi today.")
					}
				});
			} else {
				typeOut("Looks like we are out of luck....\nNo pi today.")
			}
		}
	});
}

function pinger(whichOne,callback){
	var answer = false;

	typeOut("Pingpi -"+whichOne);
	$.post( "action.php", { action: "pingpi"+whichOne }, function( data ) {
		data = data.trim();
		if (data){
			var dataS = data.trim();
			if (dataS.length<1){
				// No Answer
				typeOut("PI "+whichOne+" is not responding to pingpi");
				$('#pie'+whichOne.toUpperCase()+'Square').css('background-color','#F00');
				if (typeof(callback) !== 'undefined'){
					callback(false);
				} 
			}else {
				// It is ON
				$('#pie'+whichOne.toUpperCase()+'Square').css('background-color','#3ADF00');
				typeOut("PI "+whichOne+" answered pingpi in "+dataS+" seconds");
				if (typeof(callback) !== 'undefined'){
					callback(true);
				} 
			}
		} else {
			typeOut("PI "+whichOne+" is not responding to pingpi");
			$('#pie'+whichOne.toUpperCase()+'Square').css('background-color','#F00');
			if (typeof(callback) !== 'undefined'){
				callback(false);
			} 
		}
	});
}


function startShutdownTimer(){
	if(window.myaddress !== "346e2e4570a5b4f780e24258e248094e4d72affe"){ //dev computer
		// First run
		if (window.G_timerStarted == false){
			typeOut("Calling first timer");
			$.post( "action.php", { action: "stayon" }, function( data ) {
					typeOut(data.toString());
			});
		}

		setInterval(function(){
			typeOut("Calling timer");
			$.post( "action.php", { action: "stayon" }, function( data ) {
				typeOut(data.toString());
			});
		}, 240000);// 4 min
	} else {
		typeOut("Hi Jamie");
	}
}


function fireStreamer(){
	typeOut("Calling fire streamer");
	$.post( "action.php", { action: "fireStreamer" }, function( data ) {
		if (data.toString().trim().indexOf("Resource id") > -1){
			$('#streamdiv').append('<img class="img-responsive" src="http://89.100.207.53:3001/?action=stream" alt="Streamer Off" style="margin: 0px auto;"/>');
		} 
		typeOut(data.toString());
	});
}


function fireNode(){
	typeOut("Calling fire node");
	$.post("action.php",{ action : "fireNode"}, function(data){
		typeOut(data.toString());
		typeOut("Waiting for node...");
		setTimeout(function(){
			typeOut("Calling socket io");
			$.getScript('http://89.100.207.53:3000/socket.io/socket.io.js',function(){
				typeOut("Calling Movepad");
				$.getScript('js/movepad.js');
				$('#invtPad').css('display','block');
				$('#ptButton').removeAttr('disabled');
			});
		}, 15000);
	});
}


function switchOnB(){
	typeOut("Calling switch on B");
	$.post( "action.php", { action: "bon" }, function( data ) {
		typeOut(data.toString());
	});
}

function switchOffB(){
	typeOut("Calling standby fire up");
	$.post( "action.php", { action: "boff" }, function( data ) {
		typeOut(data.toString());
	});
}


function typeOut(txt,dDiv){
	if (window.G_state !== 'typing'){
		var saveState = window.G_state;
		window.G_state = 'typing';
		dDiv = typeof dDiv !== 'undefined' ? dDiv : $('#readout p');

		var $el = dDiv,
	    txtLen = txt.length,
	    timeOut,
	    char = 0;

	    var humanize = 5;
	    timeOut = setInterval(function() {
	        $el.append(txt[char]);
	        $('#readout').scrollTop($el.height());
	        char++;
	        if (char == txtLen) {
	            window.G_state = saveState;
	            clearTimeout(timeOut);
	            if (window.G_stack.length > 0){
	            	typeOut(window.G_stack.shift());
	            }	
	        }
	    }, humanize);
	    $el.append("<br>");
	    
	} else {
		window.G_stack.push(txt);
	}
}


$(document).ajaxStart(function () { 
       // Show Loading
       $('#loadgif').css('display','inline');
       }).ajaxStop(function () { 
       // Hide Loader
       $('#loadgif').css('display','none');
}); 


function myParse(data){
	var retObj = new Array();
	var darray = data.split(",");
		for (key in darray) {
			var kvs = darray[key].split("-");
				kvs[0] = kvs[0].trim();
				kvs[1] = kvs[1].trim();
				retObj[kvs[0]] = kvs[1];
		}
	return(retObj);
}



jQuery(document).ready(function($) {

	window.G_state = 0;
	window.G_stack = Array();
	
	typeOut("Hello there nothing happening yet....");
	

	// setTimeout(function(){

	// 		typeOut("<br>Click the console to try connection...");

	// }, 3000);
	// $('#dash').click(function(){

	// 	actionDash();

	// });

	// var i=2;
	// while(i>0){

	// 	actionDash();
	// 	i--;
	// }
	state0Funkt();
	
});

function actionDash(){
	console.log(window.G_state);
	console.log(window.G_stack);

	switch (window.G_state){

		case 'typing':
			window.G_stack.push('call');
			break;
		case 0:

			state0Funkt();

			break;
		case 1:

			state1Funkt();

			break;

	}

}

function state0Funkt(){

	typeOut("Calling board a");
	$.post( "action.php", { action: "connecta" }, function( data ) {
		if(data){
			window.G_state = 1;
			typeOut("Board A is awake");
			state1Funkt();
		}
	});

}

function state1Funkt(){

	typeOut("Calling board b");
	$.post( "action.php", { action: "connectb" }, function( data ) {
		if(data){
			typeOut("Board b is awake");
			// window.G_state = 1;
		}
	});

}




function switchOnB(){

	typeOut("Calling standby fire up");
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
		dDiv = typeof dDiv !== 'undefined' ? dDiv : $('#dash');

		var $el = dDiv,
	    // txt = $el.text(),
	    txtLen = txt.length,
	    timeOut,
	    char = 0;

	    var humanize = 10;//Math.round(Math.random() * (200 - 30)) + 30;
	    timeOut = setInterval(function() {
	        // var type = txt[char];//.substring(0, char);
	        $el.append(txt[char]);
	        // typeIt();
	        char++;

	        if (char == txtLen) {
	            // $el.text($el.text().slice(0, -1)); // remove the '|'
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


    // for (var i = 0; i < txt.length; i++) {
    // 	dDiv.append(txt[i]).delay( 1000 );


    // };


	// $el.text('|');

	// (function typeIt() {   
	//     var humanize = Math.round(Math.random() * (200 - 30)) + 30;
	//     timeOut = setTimeout(function() {
	//         char++;
	//         var type = txt.substring(0, char);
	//         $el.text(type + '|');
	//         typeIt();

	//         if (char == txtLen) {
	//             $el.text($el.text().slice(0, -1)); // remove the '|'
	//             clearTimeout(timeOut);
	//         }

	//     }, humanize);
	// }());

}
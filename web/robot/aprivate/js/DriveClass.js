// DriveClass.prototype = {
//     constructor: DriveClass,
var gpio = require("pi-gpio");


// // Constructor
// function Foo(bar) {
//   // always initialize all instance properties
//   bar = bar;
//   this.baz = 'baz'; // default value
// }
// // class methods
// Foo.prototype.fooBar = function() {

// };
// // export the class
// module.exports = Foo;
leftFor = 19;
leftBak = 21;
rightFor = 24;
rightBak = 26;


function dobj(){

	// this.gpio = require("pi-gpio");

	this.leftFor = 19;
	this.leftBak = 21;
	this.rightFor = 24;
	this.rightBak = 26;

};

dobj.openAll = function(gpio){
    // function openAll()  {
    	gpio.open(leftFor, "output");
		gpio.open(leftBak, "output");
		gpio.open(rightFor, "output");
		gpio.open(rightBak, "output");

    };

dobj.closeAll = function(gpio){

    
    // function closeAll()  {
    	gpio.write(leftBak, 0, function() { // turn off pin 16 
			gpio.close(leftBak); // then Close pin 16 
		});
		gpio.write(rightBak, 0, function() { // turn off pin 16 
			gpio.close(rightBak); // then Close pin 16 
		});
		gpio.write(rightFor, 0, function() { // turn off pin 16 
			gpio.close(rightFor); // then Close pin 16 
		});
		
		gpio.write(leftFor, 0, function() { // turn off pin 16 
			gpio.close(leftFor); // then Close pin 16 
			process.exit(0); // and terminate the program 
			console.log("Shut down!!");
		});
    };


	dobj.stopAll = function(){
    	// function stopAll()  {
  		// stopLeft();
		// stopRight();
		gpio.write(rightBak, 0);
		gpio.write(rightFor, 0);
		gpio.write(leftBak, 0);
		gpio.write(leftFor, 0);
    };


	dobj.stopLeft = function(){
    	gpio.write(leftBak, 0);
		gpio.write(leftFor, 0);
    };

    dobj.stopRight = function(){
    	gpio.write(rightBak, 0);
		gpio.write(rightFor, 0);
    };

    dobj.rightForwards=  function(){
    	gpio.write(rightBak, 0,function(){
			gpio.write(rightFor, 1);
		});
    };

 	dobj.rightBack = function(){
    	gpio.write(rightFor, 0,function(){
			gpio.write(rightBak, 1);
		});
    };

    dobj.leftForwards = function(){
    	gpio.write(leftBak, 0,function(){
			gpio.write(leftFor, 1);
		});
    };

	dobj.leftBack = function(){
    	gpio.write(leftFor, 0,function(){
			gpio.write(leftBak, 1);
		});
    };


// DrvMoto = new DriveClass();

module.exports = dobj;

// exports.ahsure = ahsure;










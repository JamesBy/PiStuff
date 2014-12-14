<?include "partials/header.php";?>

<div class="row">
    <div class="col-lg-8 col-lg-offset-1">
        <div id="headiv" class="bGrade">
            <a id="pagetop"><h1>Gallery</h1></a>
        </div>
        <!-- <img id="swipehelp" class="img-responsive" src="img/swipehelp1.png"> -->
        <a id="introduction"><h2 class="h2div bGrade">Introduction</h2></a>
        <p>So Where to begin.....</p>
        <p>I first saw the raspberry PI when I helped a friend with a home security project. I thought hey I could do something cool with that.</p>
        <p>So the basic idea of the project was to build something with the raspberry pi that I could control over the internet. 
            After some deliberation I decided a robot was the way to go. So here we are - I have a robot in my home that I can control over the internet using any normal web browser on <b>desktop or mobile</b>.</p> 
        <p>The base for machinary for the project is the <a href="http://4tronix.co.uk/store/index.php?rt=product/product&path=43&product_id=171" target="blank">4TRONIX INITIO 4WD ROBOT KIT FOR RASPBERRY PI</a></p>
        <p>The inito came out of the box with a lot of the equipment that I wanted:</p>
        <ul>
            <li>Chassis</li>
            <li>Motors</li>
            <li>An interface between pi and motors</li>
        </ul>
        <p>It also has:</p>
        <ul>
            <li>Servo pan tilt mechanism</li>
            <li>Distance sensors</li>
            <li>Wheel revolution sensors</li>
        </ul>
        <p>With all of these components pretty much ready to go out of the box I had more time to focus on the code and connectivity of the project.</p>
        <p>So once I had the Initio assembled it was time for the Juicy stuff</p>
        <a id="howit"><h2 class="h2div bGrade">How it works</h2></a>
        <br />
        <p>Briefly, The raspberry pi is the brain of the robot. Among other things it has a CPU with linux based operating system (I'm running raspian), a usb WI fi connection, camera input and GPIO pins for connection to motors, servos etc.
         So the pi has the ability to take input from the outside world, or run programs stored in its own memory and transfer the inputs and outputs to the components on the robot or back out to the web.</p>
        <p>The other piece of this project is the web side. So without going into detail on how the internet works, the web interface (part of this page) is stored on a server. I have my own server 
            from <a href="http://cloudatcost.com/" target="blank">Cloudatcost.com</a>. Its a little better than a normal hosting account in that you actually own the server so you have full access and control.</p>
        <p>So the server language is PHP the client side runs as a normal web page using html, css, javascript. On top of these I use jQuery and Bootstrap to make the page look great on mobile.</p>
        <p>The video streaming os done using <a href="http://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi" target="blank">MJPG-Streamer</a></p>
        <p>For quick interaction between the pi and the webpage controler I run node.js and <a href="http://socket.io/docs/" target="blank">socket IO</a>
         on the PI. This is a <b>direct connection</b> between the web page and the robot which bypasses the server, speeding up reaction times.</p>
        <br />
        <img class="img-responsive" src="img/robotconnectivity.png">
        <a id="look"><h2 class="h2div bGrade">Videos</h2></a>
        <br />
        <h2>Split screen</h2>
        <p>This vid shows the website loading, connecting to the robot and then moving it around at will over the internet.</p>
        <div class="videoWrapper">
            <iframe width="420" height="315" src="//www.youtube.com/embed/y-Ma4R5xhPo" frameborder="0" allowfullscreen=""></iframe></br>
        </div>
        <h2>Yes and No</h2>
        <p>Some simple movement of the servos</p>
        <div class="videoWrapper">
            <iframe width="420" height="315" src="//www.youtube.com/embed/5fHaokaQs0s" frameborder="0" allowfullscreen=""></iframe></br>
        </div>
    </div>
</div>

<?include "partials/footer.php";?>
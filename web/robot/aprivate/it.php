<?include("partials/header.php");?>

<div class="row">
    <div id="loaderdiv">
        <img id="loadgif" src="img/loader.gif" style="display:none;">
    </div>

    <div id = "pagewrap">
        <div id="streamdiv" class="col-md-12 col-centered">
            <!-- <img class="img-responsive" src="http://109.255.194.19:3001/?action=stream" alt="Streamer Off"/> -->
        </div>
        <div id="invtPad" style="display:none;">
            <div id="tPad"></div>
        </div>
    </div>

    <div id="pagewrap" class="row dashrow">
        <div id="dashboard" class="col-md-6 col-xs-12 pull right">
            <div class="row">
                <div class="col-md-6 pull-left" style="display: flex;">
                    <div id="pieASquare" class="led" onclick="pinger('a')" ></div>
                    <p>&nbsp;Pie A</p>
                </div>
                <div class="col-md-6 pull-right" style="display: flex;">
                    <div id="pieBSquare" class="led" onclick="pinger('b')"></div>
                    <p>&nbsp;Pie B</p>
                </div>
            </div>
            <div id="toggleControlType">
                    <button id="moveButton" class="btn btn-primary col-xs-6 col-md-6 pull-left" onclick="changeMode('motors')" disabled>Move</button>
                    <button id="ptButton" class="btn btn-default col-xs-6 col-md-6 pull-right" onclick="changeMode('servos')" disabled>Pan tilt</button>
            </div> 
        </div>
        <div id="readout" class="col-md-6 col-xs-12 pull-left"><p></p></div>
        <form action="/robot/index.php">
            <button type="submit" class="btn btn-primary btn-lg col-xs-12 col-md-12" >Home</button>
        </form>
    </div>

    


</div>
<!-- <div class="row" style="text-align: center;">
    <div id="buttons">
        <div class="btn-group btn-block">
            <button type="button" class="btn btn-default" onclick="pinger('a')">Ping A</button>
            <button type="button" class="btn btn-default" onclick="pinger('b')">Ping B</button>
            <button type="button" class="btn btn-default">Right</button>
        </div>
    </div>
</div> -->
<!-- <div id="testDiv">
</div-->


<script src="js/movepad.js"></script>
<?include "partials/footer.php";?>





<?




// session_start();
// require_once('class.mySsh.php');
// // die(json_encode($_POST['what']));
// // echo NiceSSH::connect('a');

// echo "Hello<br>";


// $connection = ssh2_connect('89.100.207.53', '3003');

// ssh2_auth_password($connection, 'pi', 'pi');
// // echo NiceSSH::pinger('a');
// $stream = ssh2_exec($connection, 'for i in $(atq | cut -f 1); do atrm $i; done');
// //stream_set_blocking($stream,true);
// stream_get_contents($stream); 
// echo ($stream);

//$stream = ssh2_exec($connection, "at -f ~/robot/offtime.txt now + 5 min");
//stream_get_contents($stream); 
// killall shutdown
// stream_set_blocking($stream,true);
//echo ($stream);



// $connection = ssh2_connect('109.255.194.19', '3003');

// ssh2_auth_password($connection, 'pi', 'pi');

// // echo(ssh2_exec($connection, "robot/sta"));

// // stream_set_blocking($stream,true);

// // $stream = ssh2_exec($connection, "ls -l");
// $stream = ssh2_exec($connection, "startStream.sh");

// $errorStream = ssh2_fetch_stream($stream, SSH2_STREAM_STDERR);

// // Enable blocking for both streams
// stream_set_blocking($errorStream, true);
// stream_set_blocking($stream, true);

// // Whichever of the two below commands is listed first will receive its appropriate output.  The second command receives nothing
// echo "Output: " . stream_get_contents($stream);
// echo "Error: " . stream_get_contents($errorStream);

// // Close the streams        
// fclose($errorStream);
// fclose($stream);


?>
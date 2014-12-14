<?include("partials/header.php");?>

<div class="row">
    <div id="loaderdiv">
        <img id="loadgif" src="img/loader.gif" style="display:none;">
    </div>

    <div class= "pagewrap">
        <div id="streamdiv" class="col-md-12 col-centered">
        </div>
        <div id="invtPad" style="display:none;">
            <div id="tPad"></div>
        </div>
    </div>

    <div class="row dashrow pagewrap">
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

<?include "partials/footer.php";?>

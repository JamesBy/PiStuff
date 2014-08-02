<?include("header.php");?>


<embed src="streamvlc.asx">

	<object type="application/x-vlc-plugin" data="109.255.194.19:3252" width="400" height="300" id="video1">
     <param name="movie" value="109.255.194.19:3252"/>
     <embed type="application/x-vlc-plugin" name="video1"
     autoplay="no" loop="no" width="400" height="300"
     target="109.255.194.19:3252" />
     <a href="109.255.194.19:3252">Download Video1</a>
</object>


<embed src="streamvlc.asx" width="352" height="300" autostart="true">


<!-- <div id = "pagewrap">
<div id="invisibox">
  <div class="col-md-12 col-centered">
  </div>
</div>  

<div id="invtPad"></div>
</div> <!--pagewrap>
 -->

<!-- <div id = "pagewrap">
    <div class="col-md-12 col-centered">
        <img class="img-responsive" src="http://109.255.194.19:3001/?action=stream" alt="Streamer Off"/>
    </div>
    <div id="invtPad">
        <div id="tPad"></div>
    </div>
</div> -->

<div id = "pagewrap">

    <div id="dash" class="col-xs-6"></div>

</div>


<script src="js/myFunctions.js"></script>
</body>
</html>
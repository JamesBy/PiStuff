<?include "partials/header.php";?>

<div class="row">
    <div class="col-lg-8 col-lg-offset-1">
        <div id="headiv" class="bGrade">
            <a id="pagetop"><h1>Power Supply</h1></a>
        </div>
        <!-- <img id="swipehelp" class="img-responsive" src="img/swipehelp1.png"> -->
        <!-- <a id="introduction"><h2 class="h2div bGrade"></h2></a> -->
        <p>The power supply for the robot is an ongoing issue. The Initio Robot comes with a battery pack for 6 aa batteries. The PirCon controller uses this +- 7 volts to power the motors
            It also supplies the 5volts that the raspberry Pi runs on.</p>
        <p>So the problem with this set up was that the robot only had about 2 hours standby time. For the core intended use for the Robot this was not acceptable. Ideally I would like the Robot to be on all of the time 
            so that if I ever want to log on and take a look around the house I could.</p>
        <P>So After some research I decided to buy a Pi model A which uses less power than the B. So now the Pi model A is the stand by PI. Its sole purpose is to listen to the internet for a connection call from the website. When it gets the order it 
        Switches on the power to the Pi model B. </P>
        <p>The whole system is set up to shut itself back down to standby mode if there is no connection from the website for a period of time.</p>
        <p>With this configuration I now have about two days Standby time!</p>
        <p>Although this is a massive improvement I would like the robot to be on standby indefinitely. I havent Quite figured this one out yet. Maybe some kind of docking station perhaps?</p>
        
    </div>
</div>

<?include "partials/footer.php";?>

<?php 
require_once('Net/SSH2.php');



if (isset($_POST['powerDown'])){

    $ssh = new Net_SSH2('109.255.194.19:3003');
    if (!$ssh->login('pi', 'pi')) {
        exit('Login Failed');
    }

    // echo $ssh->exec('pwd');
    echo $ssh->exec('/home/pi/robot/stopStream.sh');

    die;



}

session_start();


if (isset($_POST['submit'])){ 


    $pas = $_POST['password']; 

    if ($pas === "kkkk"){


        // echo fireupRobot();




        $_SESSION['logged_in'] = TRUE; 
        header("Location: home.php");
    } else {
        header("Location: index.php");     
        exit; 

    }


}else{    
    //If the form button wasn't submitted go to the index page (login screen)
    header("Location: index.php");     
    exit; 
} 

function fireupRobot(){

    $ssh = new Net_SSH2('109.255.194.19:3003');
    if (!$ssh->login('pi', 'pi')) {
        exit('Login Failed');
    }

    // echo $ssh->exec('pwd');
    return($ssh->exec('/home/pi/robot/startStream.sh'));


}
?>
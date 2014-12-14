<?php 

session_start();
require_once('class.mySsh.php');

if (isset($_POST['action'])){
    switch ($_POST['action']){
        case "stayon":
            die(NiceSSH::stayon());
            break;
        case "connecta":
            die(NiceSSH::connect('a'));
            break;
        case "connectb":
            die(NiceSSH::connect('b'));
            break;
        case "fireStreamer":
            die(NiceSSH::fireStreamer());
            break;
        case "fireNode":
            die(NiceSSH::fireNode());
            break;
        case "bon":
            die(NiceSSH::startB());
            break;
        case "bstatus":
            die(NiceSSH::bStatus());
            break;
        case "pingpia":
            die(NiceSSH::pinger('a'));
            break;
        case "pingpib":
            die(NiceSSH::pinger('b'));
            break;

        case "boff":
            break;
    }
}

?>
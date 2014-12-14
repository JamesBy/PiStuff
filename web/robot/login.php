<?php
if (isset($_POST['password'])){
    session_start();
        $pas = $_POST['password']; 
        if (sha1($pas) === "0eddda8340737e35b650c8d54c64af8d93d996f2"){
            $_SESSION['logged_in'] = TRUE; 
            header("Location: aprivate/home.php");
    }else{    
        header("Location: index.php");     
        exit; 
    } 
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>Robot Online</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="aprivate/css/myStyle.css" rel="stylesheet">
</head>

<body style="text-align: center;">
    <title>ROBOT</title>
    <h2 style="margin-top: 100px">Log TF IN</h2>
    <div id="wrapper" class="col-xs-12" style="clear:both;">
        <table>
            <form name="login" action="login.php" class="form-horizontal" method="post">
                <tr>
                    <td>
                    </td>
                    <td>
                        <input type="password" class="form-control" name="password" placeholder="Password" required>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td style="text-align: center;">
                    <input type="submit" name="submit" class="btn btn-primary" value="FIRE ME UP!!!">
                </td>
                </tr>
            </form>  
        </table>
    </div>
</body>
</html>



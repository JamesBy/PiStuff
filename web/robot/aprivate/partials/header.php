<?
session_start();
if ($_SESSION['logged_in'] !== TRUE ){
  header("Location: ../index.php"); 
  exit; 
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>Robot Online</title>
    <link rel="shortcut icon" href="img/favicon.ico">

    <!-- Bootstrap -->
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function($) {
            window.myaddress = "<?echo sha1($_SERVER['REMOTE_ADDR']);?>";
        });
    </script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/boostrap_Lumen.min.css" rel="stylesheet">
    <link href="css/myStyle.css" rel="stylesheet">
</head>

<body>

   
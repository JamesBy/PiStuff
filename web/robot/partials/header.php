<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="img/favicon.ico">

    <title>Pi Robot Project</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/boostrap_Lumen.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/index.css" rel="stylesheet">
    <link href="css/simple-sidebar.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a class="menuHead" href="/robot/index.php"><p>Home</p></a>
                </li>
                <li>
                    <a class="menuHead" href="/robot/latest.php"><p>Latest Goings On</p></a>
                </li> 
                <li>
                    <a class="menuHead" href="/robot/power.php"><p>Power Supply</p></a>
                </li>
                <li>
                    <a class="menuHead" href="/robot/code.php"><p>Code Talk</p></a>
                </li>
                <hr>
                <?if ((strpos($_SERVER['REQUEST_URI'], 'index.php') !== FALSE)||(trim($_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']) === "www.jbyrne.biz/robot/")):?>
                    <li>
                        <a class="menuH2" href="#introduction"><p>Introduction</p></a>
                    </li>
                    <li>
                        <a class="menuH2" href="#look"><p>Take a look</p></a>
                    </li>
                    <li>
                        <a class="menuH2" href="#howit"><p>How it works</p></a>
                    </li>
                    <hr>
                
                <?endif;?>

                <?session_start();?>
                <?if ((isset($_SESSION['logged_in']))&&($_SESSION['logged_in'] == TRUE )):?>
                    <li>
                        <a class="menuHead" href="/robot/aprivate/home.php"><p>Control Center</p></a>
                    </li>
                <?else:?>
                    <form action="/robot/login.php" method="post">
                        <div class="input-group input-group-sm col-xs-10 col-xs-offset-1">
                                <input type="password" name="password" class="form-control" placeholder="Enter log in code">
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-primary">Log in</button>
                            </span>
                        </div><!-- /input-group -->
                    </form>
                <?endif;?>
               
                <hr>
                <br>
            </ul>
        </div>
        <div><img id="menuarrow" src="img/menuarrow.png"></div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
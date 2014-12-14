<?php 
require_once('Net/SSH2.php');

class NiceSSH { 
    // SSH Host 
    private static $ssh_host = '89.100.207.53'; 
    // SSH Port 
    private static $ssh_portForA = 3251; 
    private static $ssh_portForB = 3003; 

    private static $ssh_auth_user = 'pi'; 
    private static $ssh_auth_pass = 'pi'; 
    
    public function connect($whichOne) { 

        switch (trim(strtolower($whichOne))) {
            case 'a':
                $port = self::$ssh_portForA;
                $user = self::$ssh_auth_user;
                $pass = self::$ssh_auth_pass;
                break;
            case 'b':
                $port = self::$ssh_portForB;
                $user = self::$ssh_auth_user;
                $pass = self::$ssh_auth_pass;
                break;
        }

        if (!function_exists("ssh2_connect")) die("function ssh2_connect doesn't exist");

        if(!($_SESSION['con'.$whichOne] = ssh2_connect(self::$ssh_host, $port))){
            return(json_encode($session['con'.$whichOne]));
        } else {
            // try to authenticate with username root, password secretpassword
            if(!ssh2_auth_password($_SESSION['con'.$whichOne], $user, $pass)) {
                return("fail: unable to authenticate\n");
            } else {
                // allright, we're in!
                return('session : con'.$whichOne.' '.($_SESSION['con'.$whichOne]));
            }
        }
    }
    public function stayon(){
        $connection = ssh2_connect(self::$ssh_host, self::$ssh_portForB);
        ssh2_auth_password($connection, self::$ssh_auth_user, self::$ssh_auth_pass);

        $stream = ssh2_exec($connection, 'for i in $(atq | cut -f 1); do atrm $i; done');
        stream_set_blocking($stream,true);
        stream_get_contents($stream); 
        
        $stream = ssh2_exec($connection, "at -f ~/robot/offtime.txt now + 5 min");
        stream_get_contents($stream); 
        // killall shutdown
        // stream_set_blocking($stream,true);
        return($stream);
    }

    public function fireStreamer(){
        $connection = ssh2_connect(self::$ssh_host, self::$ssh_portForB);
        ssh2_auth_password($connection, self::$ssh_auth_user, self::$ssh_auth_pass);
        $stream = ssh2_exec($connection, "sudo bash robot/startStream.sh");
        stream_get_contents($stream); 
        // stream_set_blocking($stream,true);
        return($stream);
    }


    public function fireNode(){
        $connection = ssh2_connect(self::$ssh_host, self::$ssh_portForB);
        ssh2_auth_password($connection, self::$ssh_auth_user, self::$ssh_auth_pass);
        $stream = ssh2_exec($connection, "node robot/index.js");
        stream_get_contents($stream); 
        return($stream);
    }

    public function startB(){
        $connection = ssh2_connect(self::$ssh_host, self::$ssh_portForA);
        ssh2_auth_password($connection, self::$ssh_auth_user, self::$ssh_auth_pass);
        $stream = ssh2_exec($connection, "sudo python d/bon.py");
        stream_get_contents($stream); 
        return($stream);
    }

     public function bstatus(){
        $connection = ssh2_connect(self::$ssh_host, self::$ssh_portForB);
        ssh2_auth_password($connection, self::$ssh_auth_user, self::$ssh_auth_pass);
        $stream = ssh2_exec($connection, "bash robot/chat/status.sh");
        stream_set_blocking( $stream, true ); 
        // usleep(500000);
        $ret = stream_get_contents($stream); 
        // $ret=fread($stream,4096); 
        return($ret);
    }

    public function exec($cmd) { 
        if (!($stream = ssh2_exec($this->connection, $cmd))) { 
            throw new Exception('SSH command failed'); 
        } 
        stream_set_blocking($stream, true); 
        $data = ""; 
        while ($buf = fread($stream, 4096)) { 
            $data .= $buf; 
        } 
        fclose($stream); 
        return $data; 
    } 

    public function disconnect() { 
        $this->exec('echo "EXITING" && exit;'); 
        $this->connection = null; 
    }

    public function pinger($whichpi){
    // Function to check response time
        $domain = self::$ssh_host;
        $port = $whichpi==='a' ? self::$ssh_portForA : self::$ssh_portForB;

        $starttime = microtime(true);
        $file      = fsockopen ($domain, $port, $errno, $errstr, 4);
        $stoptime  = microtime(true);
        $status    = 0;

        if (!$file) $status = -1;  // Site is down
        else {
            fclose($file);
            $status = ($stoptime - $starttime);
            // $status = floor($status);
            $status = round($status,4);
        }
        return $status;
    }

    public function __destruct() { 
        $this->disconnect(); 
    } 
} 
?> 
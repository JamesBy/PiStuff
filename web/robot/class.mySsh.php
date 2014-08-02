<?php 
require_once('Net/SSH2.php');

class NiceSSH { 
    // SSH Host 
    private static $ssh_host = '109.255.194.19'; 
    // SSH Port 
    private static $ssh_portForA = 3251; 
    private static $ssh_portForB = 3001; 

    private static $ssh_auth_user = 'pi'; 
    private static $ssh_auth_pass = 'pi'; 

    
    // // SSH Server Fingerprint 
    // private $ssh_server_fp = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 
    // // SSH Username 
    // // SSH Public Key File 
    // private $ssh_auth_pub = '/home/pi/.ssh/id_rsa.pub'; 
    // // SSH Private Key File 
    // private $ssh_auth_priv = '/home/pi/.ssh/id_rsa'; 
    // // SSH Private Key Passphrase (null == no passphrase) 
    // // SSH Connection 
    
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
        // log in at server1.example.com on port 22
        if(!($session['connection'] = ssh2_connect(self::$ssh_host, $port))){
            return(json_encode($session['connection']));
        } else {
            // try to authenticate with username root, password secretpassword
            if(!ssh2_auth_password($session['connection'], $user, $pass)) {
                return("fail: unable to authenticate\n");
            } else {
                // allright, we're in!
                return(true);
            }
        }
    }




    public function startB(){

         // // execute a command
                // if (!($stream = ssh2_exec($con, "ls -al" ))) {
                //     return("fail: unable to execute command\n");
                // } else {
                //     // collect returning data from command
                //     stream_set_blocking($stream, true);
                //     $data = "";
                //     while ($buf = fread($stream,4096)) {
                //         $data .= $buf;
                //     }
                //     fclose($stream);
                //     return($data);
                // }



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
    public function __destruct() { 
        $this->disconnect(); 
    } 
} 
?> 
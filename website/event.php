<?php
include("sql.php");
header("Access-Control-Allow-Origin: *");

function makecode() {
    $text = "";
    $possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for ($i = 0; $i < 10; $i++) $text .= substr($possible,rand(0,strlen($possible)),1);
  
    return $text;
}
if (isset($_GET["kid"]) and ctype_digit($_GET["kid"]) and isset($_GET["clicks"]) and ctype_digit($_GET["clicks"])) {
    $kid=$_GET["kid"];
    $clicks=$_GET["clicks"];
    $res=$sql->query("SELECT * FROM users WHERE kid='$kid' LIMIT 1");
    if ($row=$res->fetch_assoc()) {
        $uid = $row["id"];
        $now = time();
        $rclicks = 0;
        $rextra = 0;
        $res1=$sql->query("SELECT * FROM `event` WHERE `uid`='$uid' LIMIT 1");
        if ($row1=$res1->fetch_assoc()) {
            $last = $row1["last"];
            $cks = $row1["clicks"];
            $extra = $row1["extra"];
            $clicks = max($cks,$clicks);
            $dc = $clicks-$cks;
            $dt = min(300,$now-$last);
            if ($dc>$dt) {
                $rclicks = $cks + $dt + min($extra,$dc-$dt);
                $rextra = $extra - min($extra,$dc-$dt);
            } else {
                $rextra = min(300,$extra + ($dt-$dc));
                $rclicks = $clicks;
            }
            if (!$sql->query("UPDATE `event` SET `last` = '$now', `clicks` = '$rclicks', `extra` = '$rextra' WHERE `uid` = $uid")) {
                echo json_encode(array("success"=>false,"error"=>"Something went wrong2"));
                exit();
            }
        } else {
            $rclicks = min(300,max($clicks,1));
            $rextra = 300;
            if (!$sql->query("INSERT INTO `event` (`uid`, `last`, `clicks`, `extra`) VALUES ('$uid', '$now', '$rclicks', '$rextra');")) {
                echo json_encode(array("success"=>false,"error"=>"Something went wrong"));
                exit();
            }
        }
        $res2=$sql->query("SELECT SUM(clicks) as total FROM `event`");
        if ($row2=$res2->fetch_assoc()) {
            echo json_encode(array("success"=>true,"value"=>$row2["total"]*4,"player"=>$rclicks));
            $mils = floor(($row2["total"]*4)/1000000);
            if ($mils>0 && $mils<=10 && !file_exists("mils/$mils")) {
                file_put_contents("mils/$mils","".time());
                require_once('TwitterAPIExchange.php');
                $settings = array(
                    'oauth_access_token' => "oauth_access_token",
                    'oauth_access_token_secret' => "oauth_access_token_secret",
                    'consumer_key' => "consumer_key",
                    'consumer_secret' => "consumer_secret"
                );
                $code=makecode();
                $url = 'https://api.twitter.com/1.1/statuses/update.json';
                $requestMethod = 'POST';
                /** POST fields required by the URL above. See relevant docs as above **/
                $postfields = array(
                    'status' => 'We reached '.$mils.'.000.000 clicks. Here is your reward: '.$code, 
                );
                /** Perform a POST request and echo the response **/
                $twitter = new TwitterAPIExchange($settings);
                $twitter->buildOauth($url, $requestMethod)->setPostfields($postfields)->performRequest();
                if ($mils==1) {
                    $currency="AS";
                    $amount=25;
                    $text="25 Ascension Sphere";
                } else if ($mils==2) {
                    $currency="PG";
                    $amount=40;
                    $text="40 Prana Gems";
                } else if ($mils==3) {
                    $currency="CC";
                    $amount=70;
                    $text="70 Cosmic Coins";
                } else if ($mils==4) {
                    $currency="PK";
                    $amount=15;
                    $text="15 Keys";
                } else if ($mils==5) {
                    $currency="KU";
                    $amount=100;
                    $text="10 Hero Keys";
                } else if ($mils==6) {
                    $currency="UM";
                    $amount=500;
                    $text="500 Universe Marbles";
                } else if ($mils==7) {
                    $currency="SD";
                    $amount=1500000;
                    $text="1.500.000 Star Dust";
                } else if ($mils==8) {
                    $currency="AS";
                    $amount=50;
                    $text="50 Ascension Sphere";
                } else if ($mils==9) {
                    $currency="PG";
                    $amount=100;
                    $text="100 Prana Gems";
                } else if ($mils==10) {
                    $currency="CC";
                    $amount=200;
                    $text="200 Cosmic Coins";
                }
                if (!$sql->query("INSERT INTO `coupons`(`id`, `currency`, `amount`, `hero`, `levels`, `code`, `expires`, `text`) VALUES (NULL,'".$currency."',".$amount.",0,0,'".$code."',NOW()+INTERVAL 1 MONTH,'".$text."')")) {
                    unlink("mils/$mils");
                }
            }
            
        } else {
            echo json_encode(array("success"=>false,"error"=>"Something went wrong2"));
        }
    } else {
        echo json_encode(array("success"=>false,"error"=>"Unknown player (Join Tournament/vote in poll first)"));
    }
} else {
    echo json_encode(array("success"=>false,"error"=>"Invalid parameters"));
}
?>
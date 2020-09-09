<?php
include_once("sql.php");
include_once("functions.php");

$__SECRET="secret"; // set by gaia

function getTid() {
    return intval(floor((time()+12*60*60)/(24*60*60)));
}

function createCapcha() {
    global $HERO;
    $bans = [150,175,114,205,181,128,108,149,107,185,161,207,163];
    $question = random_int(0,1000)%2;
    $pl = random_int(3,5);
    $picks = [];
    $all = [];
    while (count($picks)<$pl) {
        $rnd = random_int(0,count($HERO)-20);
        if (!in_array($rnd,$bans) and !in_array($rnd,$picks) && $HERO[$rnd]["type"]==($question?2:3) && $HERO[$rnd]["rarity"]<5) {
            $picks[]=$rnd;
            $all[]=$rnd;
        }
    }
    while (count($all)<9) {
        $rnd = random_int(0,count($HERO)-20);
        if (!in_array($rnd,$bans) and !in_array($rnd,$all) && $HERO[$rnd]["type"]!==($question?2:3)  && $HERO[$rnd]["rarity"]<5) {
            $all[]=$rnd;
        }
    }
    shuffle($all);
    return [
        "question"=>$question,
        "picks"=>$picks,
        "all"=>$all
    ];
}

function createTournament($tid) {
    global $sql;
    if ($sql->query("INSERT INTO `tournaments` (`id`, `status`, `date`, `tid`) VALUES (NULL, '0', CURRENT_TIMESTAMP, '$tid');")) {
        return $sql->insert_id;
    } else return -1;
}

function validateSetup($tid,$setup,$bhero) {
    global $MONSTERS,$HERO;
    $SIZE = 30;
    if (count($setup)!=$SIZE) {
        echo json_encode(array("success"=>false,"error"=>"Bad setup count"));
        return false;
    }
    $cost=0;
    $used=array();
    $hero=tid2heroes($tid,$bhero);
    $max=tid2max($tid);
    $counts=array();
    $units=0;
    for ($i=0; $i<$SIZE; $i+=6) $counts[]=0;
    for ($pos=0; $pos<$SIZE; ++$pos) {
        if (isset($setup[$pos])) $val = $setup[$pos];
        else {
            echo json_encode(array("success"=>false,"error"=>"$pos not filled"));
            return false;
        }
        $row=floor($pos/6);
        if ($val>=0 and $val<count($MONSTERS)) {
            $cost+=$MONSTERS[$val]["cost"];
            ++$units;
        } else if ($val<-1 and $val>=-2-count($HERO)) {
            $hid=-2-$val;
            if ($hero[$hid]==0) {
                echo json_encode(array("success"=>false,"error"=>"Can't use Hero $hid $val"));
                return false;
            } else if (isset($used[$hid])) {
                echo json_encode(array("success"=>false,"error"=>"Duplicated hero"));
                return false;
            } else {
                $used[$hid]=true;
            }
            ++$counts[$row];
            if ($counts[$row]>$max) {
                echo json_encode(array("success"=>false,"error"=>"Only $max heroes per row"));
                return false;
            }
            ++$units;
        } else if ($val!=-1) {
            echo json_encode(array("success"=>false,"error"=>"Unknown unit $val"));
            return false;
        }
    }
    $maxfol=tid2fol($tid);
    if ($cost>$maxfol) {
        echo json_encode(array("success"=>false,"error"=>"Too much followers"));
        return false;
    }
    if ($units<18) {
        echo json_encode(array("success"=>false,"error"=>"Place at least 18 units"));
        return false;
    }
    return true;
}

function validateSetup2($setup,$hero,$grid,$followers) {
    global $MONSTERS,$HERO;
    $SIZE = 30;
    if (count($setup)!=$SIZE) {
        echo json_encode(array("success"=>false,"error"=>"Bad setup count"));
        return false;
    }
    $cost=0;
    $used=array();
    $units=0;
    for ($pos=0; $pos<$SIZE; ++$pos) {
        if (isset($setup[$pos])) $val = $setup[$pos];
        else {
            echo json_encode(array("success"=>false,"error"=>"$pos not filled"));
            return false;
        }
        if ($val>=0 and $val<count($MONSTERS)) {
            $cost+=$MONSTERS[$val]["cost"];
        } else if ($val<-1 and $val>=-2-count($HERO)) {
            $hid=-2-$val;
            if ($hero[$hid]==0) {
                echo json_encode(array("success"=>false,"error"=>"Can't use Hero $hid $val"));
                return false;
            } else if (isset($used[$hid])) {
                echo json_encode(array("success"=>false,"error"=>"Duplicated hero"));
                return false;
            } else {
                $used[$hid]=true;
            }
        } else if ($val!=-1) {
            echo json_encode(array("success"=>false,"error"=>"Unknown unit $val"));
            return false;
        }
        if ($grid[$pos]==4 and $val!=-1) {
            echo json_encode(array("success"=>false,"error"=>"Filled no unit cell"));
            return false;
        }
        if ($grid[$pos]==8 and $val<-1) {
            echo json_encode(array("success"=>false,"error"=>"Filled no hero cell"));
            return false;
        }
    }
    if ($cost>$followers) {
        echo json_encode(array("success"=>false,"error"=>"Too much followers"));
        return false;
    }
    return true;
}

function fvalidateSetup($setup,$hero,$maxfol) {
    global $MONSTERS,$HERO;
    $SIZE = 18;
    if (count($setup)!=$SIZE) {
        echo json_encode(array("success"=>false,"error"=>"Bad setup count"));
        return false;
    }
    $cost=0;
    $used=array();
    $counts=array();
    $units=0;
    $max=7;
    for ($i=0; $i<$SIZE; $i+=6) $counts[]=0;
    for ($pos=0; $pos<$SIZE; ++$pos) {
        if (isset($setup[$pos])) $val = $setup[$pos];
        else {
            echo json_encode(array("success"=>false,"error"=>"$pos not filled"));
            return false;
        }
        $row=floor($pos/6);
        if ($val>=0 and $val<count($MONSTERS)) {
            $cost+=$MONSTERS[$val]["cost"];
            ++$units;
        } else if ($val<-1 and $val>=-2-count($HERO)) {
            $hid=-2-$val;
            if (!isset($hero[$hid]) or $hero[$hid]==0) {
                echo json_encode(array("success"=>false,"error"=>"Can't use Hero $hid $val"));
                return false;
            } else if (isset($used[$hid])) {
                echo json_encode(array("success"=>false,"error"=>"Duplicated hero"));
                return false;
            } else {
                $used[$hid]=true;
            }
            ++$counts[$row];
            if ($counts[$row]>$max) {
                echo json_encode(array("success"=>false,"error"=>"Only $max heroes per row"));
                return false;
            }
            ++$units;
        } else if ($val!=-1) {
            echo json_encode(array("success"=>false,"error"=>"Unknown unit $val"));
            return false;
        }
    }
    if ($cost>$maxfol) {
        echo json_encode(array("success"=>false,"error"=>"Too much followers"));
        return false;
    }
    return true;
}

function validateSetupWB($setup,$hero,$fols,$mode) {
    global $MONSTERS,$HERO;
    $SIZE = 6;
    if (count($setup)!=$SIZE) {
        echo json_encode(array("success"=>false,"error"=>"Bad setup count"));
        return false;
    }
    $cost=0;
    $used=array();
    $units=0;
    for ($pos=0; $pos<$SIZE; ++$pos) {
        if (isset($setup[$pos])) $val = $setup[$pos];
        else {
            echo json_encode(array("success"=>false,"error"=>"$pos not filled"));
            return false;
        }
        if ($val>=0 and $val<count($MONSTERS)) {
            $cost+=$MONSTERS[$val]["cost"];
            ++$units;
        } else if ($val<-1 and $val>=-2-count($HERO)) {
            if ($mode==0) {
                echo json_encode(array("success"=>false,"error"=>"Can't use Heroes"));
                return false;
            }
            $hid=-2-$val;
            if ($hero[$hid]==0) {
                echo json_encode(array("success"=>false,"error"=>"Can't use Hero $hid $val"));
                return false;
            } else if (isset($used[$hid])) {
                echo json_encode(array("success"=>false,"error"=>"Duplicated hero"));
                return false;
            } else {
                $used[$hid]=true;
            }
            ++$units;
        } else if ($val!=-1) {
            echo json_encode(array("success"=>false,"error"=>"Unknown unit $val"));
            return false;
        }
    }
    if ($cost>$fols) {
        echo json_encode(array("success"=>false,"error"=>"Too much followers"));
        return false;
    }
    return true;
}

function register($uid,$tid,$setup,$hero,$promo) {
    global $sql;
    if (validateSetup($tid,$setup,$hero)) {
        $res=$sql->query("SELECT * FROM tournaments WHERE tid=$tid LIMIT 1");
        if ($res) {
            $cid=-1;
            if ($row=$res->fetch_assoc()) {
                $cid=$row["id"];
            } else {
                $cid=createTournament($tid);
            }
            $res->free();
            if ($cid!=-1) {
                $jsonhero=json_encode($hero);
                $jsonsetup=json_encode($setup);
                $jsonpromo=json_encode($promo);
                $hash=sha1($jsonsetup);
                $res1=$sql->query("SELECT * FROM setups WHERE (tid=$cid AND hash='$hash') OR (uid=$uid AND tid=$cid) LIMIT 1");
                if ($res1) {
                    if ($row=$res1->fetch_assoc()) {
                        if ($row["hash"]==$hash) {
                            echo json_encode(array("success"=>false,"error"=>"Setup already in use"));
                        } else if ($row["uid"]==$uid) {
                            echo json_encode(array("success"=>false,"error"=>"Player already registered"));
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"Unknown error"));
                        }
                    } else {
                        $res2=$sql->query("INSERT INTO `setups` (`uid`, `tid`, `hash`, `setup`, `hero`, `promo`) VALUES ('$uid', '$cid', '$hash', '$jsonsetup', '$jsonhero', '$jsonpromo');");
                        if ($res2) {
                            echo json_encode(array("success"=>true));
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"setup DDBB error"));
                        }
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"register DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"create tournament DDBB error"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"tournament DDBB error"));
        }
    }
}

function register2($uid,$tid,$setup) {
    global $sql;
    $res=$sql->query("SELECT * FROM tournaments2 WHERE tid=$tid LIMIT 1");
    if ($row=$res->fetch_assoc()) {
        $hero = json_decode($row["heroes"],true);
        $grid = json_decode($row["grid"],true);
        $followers = intval($row["followers"]);
        if (validateSetup2($setup,$hero,$grid,$followers)) {
            $jsonsetup=json_encode($setup);
            $hash=sha1($jsonsetup);
            $res1=$sql->query("SELECT * FROM setups2 WHERE (tid=$tid AND `hash`='$hash') OR (`uid`=$uid AND tid=$tid) LIMIT 1");
            if ($res1) {
                if ($row=$res1->fetch_assoc()) {
                    if ($row["hash"]==$hash) {
                        echo json_encode(array("success"=>false,"error"=>"Setup already in use"));
                    } else if ($row["uid"]==$uid) {
                        echo json_encode(array("success"=>false,"error"=>"Player already registered"));
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"Unknown error"));
                    }
                } else {
                    $res2=$sql->query("INSERT INTO `setups2` (`uid`, `tid`, `hash`, `setup`) VALUES ('$uid', '$tid', '$hash', '$jsonsetup');");
                    if ($res2) {
                        echo json_encode(array("success"=>true));
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"setup DDBB error"));
                    }
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"register DDBB error"));
            }
        } 
    } else {
        echo json_encode(array("success"=>false,"error"=>"tournament DDBB error"));
    }
}

function doHeros() {
    global $HERO;
    $ret = array();
    for ($i=0; $i<count($HERO); ++$i) {
        $ret[$i]=0;
    }
    $amount = 0;
    $base = 0;
    $times = 0;
    srand(time());
    while ($amount<10) {
        $rnd = rand(0,count($HERO)-1);
        if ($HERO[$rnd]["rarity"]<=3 and $ret[$rnd]==0) {
            if ($amount==0) {
                $ret[$rnd]=rand(1,99);
                ++$amount;
                $base = hero2score($rnd,$ret[$rnd]);
            } else {
                $lvl = rand(1,99);
                $score = hero2score($rnd,$lvl);
                $ratio = max($score/$base,$base/$score);
                if ($ratio<2 and $times<2000) {
                    $ret[$rnd]=$lvl;
                    ++$amount;
                }
            }
        }
        ++$times;
    }
    return $ret;
}

function calcFollowers($hero) {
    global $HERO;
    $followers = 0;
    for ($i=0; $i<count($hero); ++$i) {
        if ($hero[$i]>0) {
            $followers += hero2score($i,$hero[$i]);
        }
    }
    return floor($followers)/4;
}

function fregister($uid,$tid,$setup) {
    global $sql;
    $res=$sql->query("SELECT * FROM ftournaments WHERE id=$tid AND `status`=0 LIMIT 1");
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        if (fvalidateSetup($setup,json_decode($row["heroes"]),$row["followers"])) {
            $jsonsetup=json_encode($setup);
            $hash=sha1($jsonsetup);
            $res1=$sql->query("SELECT COUNT(*) AS amount FROM fsetups WHERE tid=$tid LIMIT 1");
            $row1=$res1->fetch_assoc();
            $res2=$sql->query("INSERT INTO `fsetups` (`uid`, `tid`, `hash`, `setup`, `wr`, `position`) VALUES ('$uid', '$tid', '$hash', '$jsonsetup', '0', '0');");
            if ($res2) {
                echo json_encode(array("success"=>true));
                if ($row1["amount"]>=63) {
                    $sql->query("UPDATE `ftournaments` SET `status`=1 WHERE id=$tid LIMIT 1");
                    $base = doHeros();
                    $hero = json_encode($base);
                    $followers = calcFollowers($base); 
                    $sql->query("INSERT INTO `ftournaments` (`id`, `created`, `completed`, `status`, `heroes`, `followers`) VALUES (NULL, CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000', '0', '$hero', '$followers');");
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Could not join"));
            }
        }
    } else {
        echo json_encode(array("success"=>false,"error"=>"Tournament is full"));
    }
}

function file_post_contents($url, $data) {
    $postdata = http_build_query($data);

    $opts = array('http' =>
        array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata
        )
    );
    $context = stream_context_create($opts);
    return file_get_contents($url, false, $context);
}

//$damage=evalWB($wb,$level,$mode,$setup,$hero);
function evalWB($id,$level,$mode,$setup,$hero,$promo) {
    global $HERO;
    $sj = json_encode($setup);
    $hj = json_encode($hero);
    $pj = json_encode($promo);
    $pw = json_encode(array_fill(0,count($HERO),0));
    $out=shell_exec("node /usr/share/nginx/script/wbsim.js $id $level $sj $hj $pj $pw 2>&1");
    //file_put_contents("wbdata.txt",$out.":"."node /home/ec2-user/wbsim.js $id $level $sj $hj 2>&1\n",FILE_APPEND);
    return intval($out);
}

function evalFight($psetup,$phero,$esetup,$ehero,$ppromo,$epromo) {
    $out = file_post_contents("http://localhost:3000/",array(
        "A"=>json_encode($psetup),
        "B"=>json_encode($esetup),
        "hA"=>json_encode($phero),
        "hB"=>json_encode($ehero),
        "pA"=>json_encode($ppromo),
        "pB"=>json_encode($epromo)
    ));
    /*$ps = json_encode($psetup);
    $ph = json_encode($phero);
    $es = json_encode($esetup);
    $eh = json_encode($ehero);
    $pp = json_encode($ppromo);
    $ep = json_encode($epromo);
    $out=shell_exec("node /usr/share/nginx/script/bsim.js $ps $ph $es $eh $pp $ep 2>&1");*/
    return intval($out);
}

function getUserEntries($uid) { // amount of flashes entered today
    global $sql;
    $res=$sql->query("SELECT COUNT(*) as `amount` FROM fsetups s, ftournaments t WHERE s.uid=$uid AND s.tid=t.id AND t.created>DATE_SUB(NOW(), INTERVAL 1 DAY)");
    if ($row=$res->fetch_assoc()) {
        return intval($row["amount"]);
    }
    return 0;
}

//doWB($wbid,$uid,$damage,$wbhp);
function doWB($bid,$uid,$damage,$wbhp,$isSuper) {
    global $WB,$WBM,$sql;
    if ($sql->query("INSERT INTO `WBD` (`bid`, `uid`, `damage`, `moment`) VALUES ('$bid', '$uid', '$damage', CURRENT_TIMESTAMP);")) {
        $res=$sql->query("SELECT COUNT(*) as atks FROM WBD WHERE bid=$bid GROUP BY bid");
        if ($row=$res->fetch_assoc()) {
            $limit=($isSuper?1200:1600);
            if ($row["atks"]>=$limit) { // wb is dead, spawn new
                // kill previous boss
                $sql->query("UPDATE WB SET `status`=1 WHERE id=$bid LIMIT 1");
                // spawn a new boss
                $res1=$sql->query("SELECT `mid`, `mode` FROM `WB` WHERE id>=".($bid-50)." LIMIT 50");
                $modes = array(0,0,0,0);
                $ids = array(0,0,0,0,0);
                while ($row1=$res1->fetch_assoc()) {
                    ++$ids[array_search($row1["mid"],$WB)];
                    ++$modes[$row1["mode"]];
                }
                $forceWB = false; // swb
                $forceNH = false;
                $forceH = false;
                if ($modes[2]+$modes[3]<=5) $forceWB = true;
                if ($modes[0]+$modes[2]<=20) $forceNH = true;
                if ($modes[1]+$modes[3]<=20) $forceH = true;
                $now=time();
				do { // if we need a NH, prevent bornag from spawning
					$wb = $WB[rand(0,count($WB)-1)];
					for ($i=0; $i<count($ids); ++$i) {
						if ($ids[$i]<7) $wb=$WB[$i];
					}
				} while ($forceNH && $wb==186);
                $lvl = 1;
                $mode = rand(0,count($WBM)-1);
                if ($wb==186) $mode=1; // force ha when bornag
                if ($forceNH) $mode=0;
                if ($forceH) $mode=1;
                if ($forceWB or (rand()/getrandmax())<0.1) $mode+=2;
                $res1=$sql->query("SELECT MAX(`level`) AS mlvl FROM WB WHERE mid=$wb AND mode=$mode GROUP BY mid");
                if ($row1=$res1->fetch_assoc()) {
                    $lvl = $row1["mlvl"]+1;
                }
                
                $sql->query("INSERT INTO `WB` (`id`, `mid`, `level`, `spawn`, `killed`, `mode`, `status`) VALUES 
                             (NULL, '$wb', '$lvl', '$now', '0', '$mode', '0');");
            }
            return 1;
        } else {
            echo json_encode(array("success"=>false,"error"=>"Something went wrong1"));
        }
    } else {
        echo json_encode(array("success"=>false,"error"=>"Something went wrong"));
    }
}

if (isset($_POST["action"])) {
    $action=$_POST["action"];
    if ($action=="register") { // t1
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["name"]) and isset($_POST["pid"]) and isset($_POST["tid"])) {
                $name=$sql->real_escape_string($_POST["name"]);
                $pid=$sql->real_escape_string($_POST["pid"]);
                $tid=$sql->real_escape_string($_POST["tid"]);
                $kid=0;
                if (isset($_POST["kid"])) {
                    $kid=$sql->real_escape_string($_POST["kid"]);
                }
                $res=$sql->query("SELECT * FROM users WHERE pid='$pid' LIMIT 1");
                if ($res) {
                    $uid=-1;
                    if ($row=$res->fetch_assoc()) {
                        $uid=$row["id"];
                        if ($row["kid"]==0 && $kid!=0) {
                            $sql->query("UPDATE `users` SET kid=$kid WHERE id=$uid LIMIT 1");
                        }
                        if ($row["name"]!=$name && $name!="") {
                            $sql->query("UPDATE `users` SET `name`='$name' WHERE id=$uid LIMIT 1");
                        }
                    } else {
                        if ($sql->query("INSERT INTO `users` (`id`, `name`, `pid`, `public`, `score`, `kid`) VALUES (NULL, '$name', '$pid', '0', '0', '$kid');")) {
                            $uid=$sql->insert_id;
                        }
                    }
                    $res->free();
                    if ($uid!==-1) {
                        if (isset($_POST["setup"]) and isset($_POST["hero"])) {
                            $setup=json_decode(urldecode($_POST["setup"]),true);
                            $hero=json_decode(urldecode($_POST["hero"]),true);
                            $promo=json_decode(urldecode($_POST["promo"]),true);
                            if (!is_null($setup) and !is_null($hero) and !is_null($promo)) {
                                register($uid,$tid,$setup,$hero,$promo);
                            } else {
                                echo json_encode(array("success"=>false,"error"=>"JSON error"));
                            }
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"Missing setup"));
                        }
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"user create DDBB error"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"user DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="register2") { // t2
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["name"]) and isset($_POST["pid"])) {
                $name=$sql->real_escape_string($_POST["name"]);
                $pid=$sql->real_escape_string($_POST["pid"]);
                $kid=0;
                if (isset($_POST["kid"])) {
                    $kid=$sql->real_escape_string($_POST["kid"]);
                }
                $res=$sql->query("SELECT * FROM users WHERE pid='$pid' LIMIT 1");
                if ($res) {
                    $uid=-1;
                    if ($row=$res->fetch_assoc()) {
                        $uid=$row["id"];
                        if ($row["kid"]==0 && $kid!=0) {
                            $sql->query("UPDATE `users` SET kid=$kid WHERE id=$uid LIMIT 1");
                        }
                        if ($row["name"]!=$name && $name!="") {
                            $sql->query("UPDATE `users` SET `name`='$name' WHERE id=$uid LIMIT 1");
                        }
                    } else {
                        if ($sql->query("INSERT INTO `users` (`id`, `name`, `pid`, `public`, `score`, `kid`) VALUES (NULL, '$name', '$pid', '0', '0', '$kid');")) {
                            $uid=$sql->insert_id;
                        }
                    }
                    $res->free();
                    if ($uid!==-1) {
                        if (isset($_POST["setup"])) {
                            $setup=json_decode(urldecode($_POST["setup"]),true);
                            $tid=getTid();
                            if (!is_null($setup)) {
                                register2($uid,$tid,$setup);
                            } else {
                                echo json_encode(array("success"=>false,"error"=>"JSON error"));
                            }
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"Missing setup"));
                        }
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"user create DDBB error"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"user DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="fregister") { // flash
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["name"]) and isset($_POST["pid"]) and isset($_POST["tid"])) {
                $name=$sql->real_escape_string($_POST["name"]);
                $pid=$sql->real_escape_string($_POST["pid"]);
                $tid=$sql->real_escape_string($_POST["tid"]);
                $kid=0;
                if (isset($_POST["kid"])) {
                    $kid=$sql->real_escape_string($_POST["kid"]);
                }
                $res=$sql->query("SELECT * FROM users WHERE pid='$pid' LIMIT 1");
                if ($res) {
                    $uid=-1;
                    if ($row=$res->fetch_assoc()) {
                        $uid=$row["id"];
                        if ($row["kid"]==0 && $kid!=0) {
                            $sql->query("UPDATE `users` SET kid=$kid WHERE id=$uid LIMIT 1");
                        }
                        if ($row["name"]!=$name && $name!="") {
                            $sql->query("UPDATE `users` SET `name`='$name' WHERE id=$uid LIMIT 1");
                        }
                    } else {
                        if ($sql->query("INSERT INTO `users` (`id`, `name`, `pid`, `public`, `score`, `kid`) VALUES (NULL, '$name', '$pid', '0', '0', '$kid');")) {
                            $uid=$sql->insert_id;
                        }
                    }
                    $res->free();
                    if ($uid!==-1) {
                        if (getUserEntries($uid)<8) {
                            if (isset($_POST["setup"])) {
                                $setup=json_decode(urldecode($_POST["setup"]),true);
                                if (!is_null($setup)) {
                                    $fp = fopen('/tmp/ftournament.txt', 'w+');
                                    if(flock($fp, LOCK_EX | LOCK_NB)) {
                                        fregister($uid,$tid,$setup);
                                        flock($fp, LOCK_UN);
                                        fclose($fp);
                                    } else {
                                        echo json_encode(array("success"=>false,"error"=>"Someone else is registering"));
                                    }
                                } else {
                                    echo json_encode(array("success"=>false,"error"=>"JSON error"));
                                }
                            } else {
                                echo json_encode(array("success"=>false,"error"=>"Missing setup"));
                            }
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"You can only join 8 Flash Tournaments"));
                        }
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"user create DDBB error"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"user DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="vote") { // poll
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"]) and isset($_POST["kid"]) and isset($_POST["vote"]) and ctype_digit($_POST["kid"]) and ctype_digit($_POST["vote"])) {
                $qid = floor(time()/(24*60*60));
                $pid=$_POST["pid"];
                $kid=$_POST["kid"];
                $vote=$_POST["vote"];
                $res=$sql->query("INSERT INTO `poll` (`qid`, `kid`, `pid`, `vote`) VALUES ('$qid','$kid','$pid','$vote');");
                if ($sql->affected_rows>0) {
                    echo json_encode(array("success"=>true));
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Already voted"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="keyevent") {
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"]) && isset($_POST["pick"]) and ctype_digit($_POST["pick"])) {
                $now=time();
                $res1=$sql->query("SELECT * FROM events WHERE `end`>$now LIMIT 1");
                $row1=$res1->fetch_assoc();
                $eid=$row1["id"];
                $pid=$_POST["pid"];
                $res = $sql->query("SELECT k.id,k.data FROM keyevent k, users u WHERE k.eid = $eid AND k.uid=u.id AND u.pid = '$pid' LIMIT 1");
                if ($res->num_rows!=0) {
                    $row = $res->fetch_assoc();
                    $edata = json_decode($row["data"],true);
                    $keid =$row["id"];
                    $fails=0;
                    for ($i=0; $i<count($edata); ++$i) {
                        if ($edata[$i]) ++$fails;
                    }
                    if ($fails<=4) {
                        $edata[]=intval($_POST["pick"]);
                        $edata2 = $sql->real_escape_string(json_encode($edata));
                        $sql->query("UPDATE keyevent SET `data`='$edata2' WHERE id=$keid LIMIT 1");
                        $curr="PK";
                        if (count($edata)%4==3) $curr="KU";
                        echo json_encode(array("success"=>true,"curr"=>$curr));
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"No lives left"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Unknown event"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="sfcell") { // lucky followers
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"])) {
                if (isset($_POST["cell"]) and ctype_digit($_POST["cell"]) and $_POST["cell"]>=0 and $_POST["cell"]<=11) {
                    $pid=$_POST["pid"];
                    $cell=$_POST["cell"];
                    $res = $sql->query("SELECT f.id,f.seed,f.open,f.times,f.ended FROM followers f, users u WHERE f.uid=u.id AND u.pid = '$pid' AND f.status=0 ORDER BY f.eid DESC LIMIT 1");
                    if ($res->num_rows!=0) {
                        $row = $res->fetch_assoc();
                        $fid = $row["id"];
                        $seed = $row["seed"];
                        $open = $row["open"];
                        $ended = $row["ended"];
                        $times = $row["times"];
                        $b0 = ($open&15)-1;
                        $b1 = (($open>>4)&15)-1;
                        $b2 = (($open>>8)&15)-1;
                        if ($b2!=-1) {
                            echo json_encode(array("success"=>false,"error"=>"Already picked 3 times"));
                        } else if ($b0==$cell or $b1==$cell or $b2==$cell) {
                            echo json_encode(array("success"=>false,"error"=>"Already picked '$cell'"));
                        } else {
                            $pt = array(
                                25000,
                                20000,
                                15000,
                                10000,
                                7500,
                                5000,
                                2500,
                                1500,
                                1000,
                                750,
                                500,
                                250
                            );
                            srand($seed);
                            shuffle($pt);
                            if ($b0==-1) $b0=$cell;
                            else if ($b1==-1) $b1=$cell;
                            else $b2=$cell;
                            $open=(($b2+1)<<8)+(($b1+1)<<4)+($b0+1);
                            if ($b2!=-1) $ended=time()+15*60;
                            else $ended=0;
                            if ($sql->query("UPDATE followers SET `ended`=FROM_UNIXTIME($ended),`open`=$open WHERE id=$fid LIMIT 1")) {
                                echo json_encode(array("success"=>true,"followers"=>$pt[$cell]));
                            } else {
                                echo json_encode(array("success"=>false,"error"=>"Something very bad"));
                            }
                        }
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"Something went wrong"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Hummm no nice"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Unknown"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="lottery") { // lottery
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"])) {
                $now=time();
                $res1=$sql->query("SELECT * FROM events WHERE `end`>$now LIMIT 1");
                $row1=$res1->fetch_assoc();
                $eid=$row1["id"];
                $pid=$_POST["pid"];
                $res=$sql->query("INSERT INTO `lottery` (`id`, `uid`, `num`, `eid`) VALUES (NULL, (SELECT id FROM users WHERE pid='$pid' LIMIT 1), (SELECT `val` FROM (SELECT MAX(num)+1 as `val` FROM lottery WHERE eid=$eid) subquery), $eid)");
                if ($sql->affected_rows>0) {
                    echo json_encode(array("success"=>true));
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Bad params"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="prizes") { // easter
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"]) and ctype_xdigit($_POST["pid"])) {
                $pid=$_POST["pid"];
                if (isset($_POST["point"])) {
                    if (ctype_digit($_POST["point"])) {
                        $sql->query("INSERT INTO easter VALUES ('$pid',".$_POST["point"].") ON DUPLICATE KEY UPDATE value = ".$_POST["point"]);
                    }
                }
                $res1=$sql->query("SELECT p.id,p.prize FROM prizes p, users u WHERE u.pid='$pid' AND u.id=p.uid AND p.status=0");
                if ($res1->num_rows>0) {
                    $list="";
                    $prizes = array();
                    $currs = array();
                    while ($row1=$res1->fetch_assoc()) {
                        $prize = json_decode($row1["prize"],true);
                        if ($list!="") $list.=",";
                        $list.=$row1["id"];
                        foreach ($prize as $key=>$value) {
                            if ($key=="HERO") {
                                if (isset($prize["LVL"])) $prizes[]=array(
                                    "key"=>"HERO",
                                    "value"=>intval($value),
                                    "extra"=>intval($prize["LVL"])
                                );
                                else $prizes[]=array(
                                    "key"=>"HERO",
                                    "value"=>intval($value),
                                );
                            } else if ($key!="LVL") {
                                if (!isset($currs[$key])) $currs[$key]=0;
                                $currs[$key]+=intval($value);
                            }
                        }
                    }
                    foreach ($currs as $curr=>$amount) {
                        $prizes[]=array(
                            "key"=>$curr,
                            "value"=>$amount,
                        );
                    }
                    echo json_encode(array("success"=>true,"prizes"=>$prizes));
                    $sql->query("UPDATE prizes SET `status`=1 WHERE id IN ($list)");
                } else {
                    echo json_encode(array("success"=>false,"error"=>"No prizes"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Bad params"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="clear") { // clear t1
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"]) and ctype_alnum($_POST["pid"]) and isset($_POST["tid"]) and ctype_digit($_POST["tid"])) {
                $pid=$_POST["pid"];
                $tid=$_POST["tid"]-17347;
                $res=$sql->query("DELETE FROM setups WHERE tid=$tid AND uid=(SELECT id FROM users WHERE pid LIKE '$pid')"); // bug #1 ?
                if ($sql->affected_rows>0) {
                    echo json_encode(array("success"=>true));
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Not joined"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="clear2") { // clear t2
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["pid"]) and ctype_alnum($_POST["pid"])) {
                $pid=$_POST["pid"];
                $tid=getTid();
                $res=$sql->query("DELETE FROM setups2 WHERE tid=$tid AND uid=(SELECT id FROM users WHERE pid LIKE '$pid')");
                if ($sql->affected_rows>0) {
                    echo json_encode(array("success"=>true));
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Not joined"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="wb") { // attack wb
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET and isset($_POST["pid"]) and ctype_alnum($_POST["pid"]) and isset($_POST["kid"]) and ctype_digit($_POST["kid"])) {
            $setup=json_decode(urldecode($_POST["setup"]),true);
            $hero=json_decode(urldecode($_POST["hero"]),true);
            $promo=json_decode(urldecode($_POST["promo"]),true);
            $pid=$_POST["pid"];
            $kid=$_POST["kid"];
            $client_wbid=$_POST["wbid"];
            if (!is_null($setup) and !is_null($hero) and !is_null($promo)) {
                $res=$sql->query("SELECT * FROM users WHERE pid='$pid' LIMIT 1");
                if ($res) {
                    $uid=-1;
                    if ($row=$res->fetch_assoc()) {
                        $uid=$row["id"];
                    } else {
                        if ($sql->query("INSERT INTO `users` (`id`, `name`, `pid`, `public`, `score`, `kid`) VALUES (NULL, '', '$pid', '0', '0', '$kid');")) {
                            $uid=$sql->insert_id;
                        }
                    }
                    $res->free();
                    if ($uid!==-1) {
                        $res2=$sql->query("SELECT TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP(),MAX(moment))) as moment FROM WBD WHERE uid=$uid");
                        if ($row2=$res2->fetch_assoc()) {
                            if (!is_null($row2["moment"]) and $row2["moment"]<5) {
                                echo json_encode(array("success"=>false,"error"=>"Wait 5 seconds"));
                                exit();
                            }
                        }
                        $res1=$sql->query("SELECT * FROM WB WHERE `status`= 0 LIMIT 1");
                        if ($row1=$res1->fetch_assoc()) {
                            $wbid=$row1["id"];
                            $wb=$row1["mid"];
                            $level=$row1["level"];
                            $mode=$row1["mode"]%2;
                            $isSuper=false;
							if ($wbid != $client_wbid) { // wrong wb
								echo json_encode(array("success"=>false,"error"=>"A new WB has spawned, please refresh"));
								exit();
							}
                            if ($row1["mode"]>1) $isSuper=true;
                            if ($isSuper) {
                                $res3=$sql->query("SELECT COUNT(*) as `atks` FROM WBD WHERE `uid`=$uid AND bid=$wbid");
                                if ($row3=$res3->fetch_assoc()) {
                                    if ($row3["atks"]>=5) { // swb threshold
                                        echo json_encode(array("success"=>false,"error"=>"Maximum 5 attacks"));
                                        exit();
                                    }
                                }
                            }
                            $wbhp=wbHp($level,$mode);
                            $damage=evalWB($wb,$level,$mode,$setup,$hero,$promo);
                            if (validateSetupWB($setup,$hero,$_POST["fol"],$mode)) {
                                $fp = fopen('/tmp/attacking.txt', 'w+');
                                if(flock($fp, LOCK_EX | LOCK_NB)) {
                                    if (doWB($wbid,$uid,$damage,$wbhp,$isSuper)==1) {
                                        echo json_encode(array(
                                            "success"=>true,
                                            "name"=>wbName($wb,$isSuper),
                                            "id"=>$wb,
                                            "lvl"=>$level,
                                            "damage"=>$damage
                                        ));
                                    }
                                    flock($fp, LOCK_UN);
                                    fclose($fp);
                                } else {
                                    echo json_encode(array("success"=>false,"error"=>"Someone else is attacking"));
                                } 
                            }
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"No World Boss available"));
                        }                           
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"user create DDBB error"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"user DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"JSON error"));
            }
        } else echo json_encode(array("success"=>false,"error"=>"Bad data"));
    } else if ($action=="check") { // is that used ?
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET and isset($_POST["pid"]) and ctype_alnum($_POST["pid"])) {
            $pid=$_POST["pid"];
            $res=$sql->query("SELECT TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP(),moment)) as moment FROM mutex WHERE pid='$pid' LIMIT 1");
            if ($row=$res->fetch_assoc()) {
                if ($row["moment"]<3) {
                    echo json_encode(array("success"=>false,"error"=>"DB error"));
                    exit();
                }
                $sql->query("UPDATE mutex SET moment = CURRENT_TIMESTAMP WHERE pid='$pid' LIMIT 1");
            } else {
                $sql->query("INSERT INTO `mutex` (`pid`, `moment`) VALUES ('$pid', CURRENT_TIMESTAMP)");
            }
            echo json_encode(array("success"=>true));
        } else echo json_encode(array("success"=>false,"error"=>"Bad data"));
    } else if ($action=="public") { // toggle username display on website
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET and isset($_POST["pid"]) and ctype_alnum($_POST["pid"])) {
            $pid=$_POST["pid"];
            $sql->query("UPDATE users SET public = NOT public WHERE pid='$pid' LIMIT 1");
            echo json_encode(array("success"=>true));
        } else echo json_encode(array("success"=>false,"error"=>"Bad data"));
    } else if ($action=="auction") { // bid
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            if (isset($_POST["name"]) and isset($_POST["pid"]) and isset($_POST["hid"]) and isset($_POST["bid"]) and isset($_POST["kid"])) {
                $name=$sql->real_escape_string($_POST["name"]);
                $pid=$sql->real_escape_string($_POST["pid"]);
                $hid=$sql->real_escape_string($_POST["hid"]);
                $bid=$sql->real_escape_string($_POST["bid"]);
                $kid=$sql->real_escape_string($_POST["kid"]);
                $res=$sql->query("SELECT * FROM users WHERE pid='$pid' LIMIT 1");
                if ($res) {
                    $uid=-1;
                    if ($row=$res->fetch_assoc()) {
                        $uid=$row["id"];
                        if ($row["kid"]==0 && $kid!=0) {
                            $sql->query("UPDATE `users` SET kid=$kid WHERE id=$uid LIMIT 1");
                        }
                        if ($row["name"]!=$name && $name!="") {
                            $sql->query("UPDATE `users` SET `name`='$name' WHERE id=$uid LIMIT 1");
                        }
                    } else {
                        if ($sql->query("INSERT INTO `users` (`id`, `name`, `pid`, `public`, `score`, `kid`) VALUES (NULL, '$name', '$pid', '0', '0', '$kid');")) {
                            $uid=$sql->insert_id;
                        }
                    }
                    $res->free();
                    if ($uid!==-1) {
                        $now=time();
                        $res1 = $sql->query("SELECT * FROM auction WHERE `status`=0 AND hero=$hid LIMIT 1");
                        if ($row1=$res1->fetch_assoc()) {
                            $pbid = $row1["bid"];
                            $pholder = $row1["holder"];
                            $prize = json_encode(array("UM"=>$pbid));
                            if (abs(intval(ceil($pbid*1.1))-intval($bid))<$bid*0.05) {
                                $res=$sql->query("UPDATE auction SET holder=$uid, ends=ends+60, bid=$bid WHERE `status`=0 AND ends>$now AND bid=$pbid AND hero=$hid  LIMIT 1");
                                if ($sql->affected_rows>0) {
                                    $sql->query("INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, '0', '0', CURRENT_TIMESTAMP, '$pholder', '$prize');");
                                    echo json_encode(array("success"=>true));
                                } else {
                                    echo json_encode(array("success"=>false,"error"=>"Bid desync2"));
                                }
                            } else {
                                echo json_encode(array("success"=>false,"error"=>"Bid desync ".intval(ceil($pbid*1.1))." ".intval($bid)));
                            }
                        } else {
                            echo json_encode(array("success"=>false,"error"=>"Unknown hero"));
                        }
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"user create DDBB error"));
                    }
                } else {
                    echo json_encode(array("success"=>false,"error"=>"user DDBB error"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="dungeon") { // dungeon fight
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            $now=time();
            $res=$sql->query("SELECT * FROM events WHERE `end`>$now AND `type`=3 LIMIT 1");
            if ($res->num_rows>0 and isset($_POST["pid"]) and isset($_POST["max"]) and isset($_POST["setup"]) and isset($_POST["hero"])) {
                $row = $res->fetch_assoc();
                $eid = $row["id"];
                $max=$_POST["max"];
                $pid=$sql->real_escape_string($_POST["pid"]);
                $res0=$sql->query("SELECT id,kid FROM users WHERE pid='$pid' LIMIT 1");
                $row0=$res0->fetch_assoc();
                $uid=$row0["id"];
                if ($row0["kid"]==0) {
                    echo json_encode(array("success"=>false,"error"=>"Can't participate"));
                    exit();
                }
                $setup=json_decode(urldecode($_POST["setup"]),true);
                $hero=json_decode(urldecode($_POST["hero"]),true);
                $promo=json_decode(urldecode($_POST["promo"]),true);
                $lvl = 1;
                $res = $sql->query("SELECT `level` FROM dungeon WHERE eid = $eid AND `uid` = $uid LIMIT 1");    
                if ($res->num_rows==1 and $row = $res->fetch_assoc()) {
                    $lvl = intval($row["level"]);
                } else {
                    $res = $sql->query("INSERT INTO `dungeon`(`uid`, `eid`, `level`) VALUES ($uid,$eid,1)");
                }
                $wins=0;
                $continue=true;
                while ($continue) {
                    $res1 = $sql->query("SELECT `hero`,`setup` FROM dlvl WHERE eid = $eid AND `lvl`=$lvl LIMIT 1");
                    if ($res1->num_rows>0 and $row1=$res1->fetch_assoc()) {
                        $lsetup=json_decode($row1["setup"],true);
                        $lhero=json_decode($row1["hero"],true);
                        $lpromo=array_fill(0,count($HERO),0);
                        while (count($lhero)<count($HERO)) $lhero[]=0;
                        while (count($hero)<count($HERO)) $hero[]=0;
                        $bres = evalFight($setup,$hero,$lsetup,$lhero,$promo,$lpromo);
                        if ($bres==1) {
                            ++$lvl;
                            ++$wins;
                        } else {
                            $continue=false;
                        }
                    } else {
                        $continue=false;
                        echo json_encode(array("success"=>false,"error"=>"No levels left"));
                    }
                    if ($max==0 or $wins>25 or time()>$now+1) $continue=false;
                }
                if ($wins>0) {
                    $sql->query("UPDATE dungeon SET `level`= $lvl WHERE eid = $eid AND `uid`='$uid' LIMIT 1");
                    $prize = json_encode(array("SD"=>2500*$wins));
                    $sql->query("INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, '0', '0', CURRENT_TIMESTAMP, '$uid', '$prize');");
					// fix #34
					$res1 = $sql->query("SELECT `hero`,`setup` FROM dlvl WHERE eid = $eid AND `lvl`=$lvl LIMIT 1");
                    if ($res1->num_rows>0 and $row1=$res1->fetch_assoc()) {
                        $lsetup=json_decode($row1["setup"],true);
                        $lhero=json_decode($row1["hero"],true);
                        $lpromo=array_fill(0,count($HERO),0);
					}
					// end #34
                }
                echo json_encode(array("success"=>true,"data"=>array(
                    "enemy"=> "Dungeon Floor[$lvl]",
                    "date"=> time()*1000,
                    "setup"=> $setup,
                    "shero"=> $hero,
                    "spromo"=> $promo,
                    "player"=> $lsetup,
                    "phero"=> $lhero,
                    "ppromo"=> $lpromo,
                    "lvl"=>$lvl
                )));
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong data"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="halloween") { // halloween
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET and isset($_POST["pid"]) and isset($_POST["setup"]) and isset($_POST["hero"]) and isset($_POST["pid"]) and ctype_digit($_POST["kid"])) {
            $now=time();
            $pid = $_POST["pid"];
            $kid = $_POST["kid"];
            $res=$sql->query("SELECT `floor` FROM halloween WHERE `pid`='$pid' LIMIT 1");
            $create=false;
            $won = false;
            $floor = 1;
            if ($row = $res->fetch_assoc()) {
                $floor = intval($row["floor"]);
                if ($floor===1001) {
                    echo json_encode(array("success"=>false,"error"=>"You already beat it"));
                    exit();
                }
            } else {
                $create=true;
            }
            $setup=json_decode(urldecode($_POST["setup"]),true);
            $hero=json_decode(urldecode($_POST["hero"]),true); 
            $LEVELS = json_decode(file_get_contents("h1343421.json"),true);
            $lsetup = $LEVELS[$floor-1];
            $bres = evalFight($setup,$hero,$lsetup,$hero,array_fill(0, count($HERO), 0),array_fill(0, count($HERO), 0));
            if ($bres==1) {
                ++$floor;
                $won=true;
            }

            if ($create) {
                $res = $sql->query("INSERT INTO `halloween`(`pid`, `kid`, `floor`) VALUES ('$pid',$kid,$floor)");
            } else if ($won) {
                $res = $sql->query("UPDATE `halloween` SET `floor`=$floor WHERE `pid`='$pid' LIMIT 1;");
            } 
            echo json_encode(array("success"=>true,"data"=>array(
                "beat"=> $won?($floor-1):0,
                "level"=> $won?($floor-1):$floor,
                "setup"=> $lsetup,
            )));
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="points") { // get easter points status
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            $res = $sql->query("SELECT SUM(`value`) as `suma` FROM `easter` WHERE 1");
            if ($row = $res->fetch_assoc()) {
                echo json_encode(array(
                    "success"=>true,
                    "points"=>$row["suma"],
                ));
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong db"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="createCapcha") { // create a capcha
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            $capcha = json_encode(createCapcha());
            $capcha=$sql->real_escape_string($capcha);
            $pid2="";
            if (isset($_POST["pid"])) $pid2=$sql->real_escape_string($_POST["pid"]);
            $worked = $sql->query("INSERT INTO `capcha` (`id`, `created`, `data`, `solved`, `pid`) VALUES (NULL, CURRENT_TIMESTAMP, '$capcha', '0', '$pid2')");
            if ($worked) {
                echo json_encode(array(
                    "success"=>true,
                    "id"=>$sql->insert_id,
                ));
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong db"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="checkCapcha") { // check a capcha
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) {
            $id = $_POST["id"];
            $res1 = $sql->query("SELECT `data` FROM `capcha` WHERE `id`=$id LIMIT 1");
            if ($row = $res1->fetch_assoc()) {
                $cdata = json_decode($row["data"],true);
                $solution = json_decode($_POST["solution"],true);
                $valid = true;
                $mistakes = 0;
                for ($i=0; $i<count($solution); ++$i) {
                    if (in_array($cdata["all"][$solution[$i]],$cdata["picks"])) {
                        unset($cdata["picks"][array_search($cdata["all"][$solution[$i]],$cdata["picks"])]);
                    } else {
                        $mistakes+=1;
                    }
                }
                $mistakes+=count($cdata["picks"]);
                if ($mistakes<=1) { // allow one mistake
                    $sql->query("UPDATE `capcha` SET `solved`=1 WHERE `id`=$id LIMIT 1");
                }
                echo json_encode(array("success"=>$mistakes<=1,"error"=>"Wrong solution"));
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong db"));
            }
        } else {
            echo json_encode(array("success"=>false,"error"=>"Wrong auth"));
        }
    } else if ($action=="coupon") { // use coupon
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET and isset($_POST["code"]) and isset($_POST["pid"]) and ctype_alnum($_POST["pid"])) {
            $valid=true;
            $code=$_POST["code"];
            $pid=$_POST["pid"];
            if (strlen($code)!=10) $valid=false;
            if (strpos($code,"'")!==false) $valid=false;
            if (strpos($code,'"')!==false) $valid=false;
            if (strpos($code,"`")!==false) $valid=false;
            if (strpos($code,";")!==false) $valid=false;
            if (strpos($code,"\\")!==false) $valid=false;
            if (!ctype_print($code)) $valid=false;
            if ($valid) {
                $res = $sql->query("SELECT * FROM coupons WHERE `code`='$code' AND expires>NOW() LIMIT 1;");
                if ($res->num_rows==1 and $row = $res->fetch_assoc()) {
                    $cid = $row["id"];
                    $currency = $row["currency"];
                    $amount=$row["amount"];
                    $hero=$row["hero"];
                    $levels=$row["levels"];
                    $text=$row["text"];
                    $res1=$sql->query("INSERT INTO `claimed` (`cid`, `pid`) VALUES ('$cid', '$pid');"); 
                    if ($res1) {
                        echo json_encode(array(
                            "success"=>true,
                            "hero"=>$hero,
                            "currency"=>$currency,
                            "levels"=>$levels,
                            "text"=>$text,
                            "amount"=>$amount,
                        ));
                            
                    } else {
                        echo json_encode(array("success"=>false,"error"=>"You already claimed the coupon"));
                    }      
                } else {
                    echo json_encode(array("success"=>false,"error"=>"Unknown Coupon"));
                }
            } else {
                echo json_encode(array("success"=>false,"error"=>"Wrong Coupon"));
            }
        }
    } else if ($action=="finder") { // ?
        if (isset($_POST["key"]) and $_POST["key"]==$__SECRET) file_put_contents("finder.txt",$_POST["pid"].".\n",FILE_APPEND);
    } else {
        echo json_encode(array("success"=>false,"error"=>"Wrong action"));
    }
} else {
    echo json_encode(array("success"=>false,"error"=>"Nothing todo"));
}
$sql->close();
?>

<?php
    include_once("sql.php");
    include_once("questions.php");
    include_once("data.php");
    header("Access-Control-Allow-Origin: *");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    function getTid() {
        return intval(floor((time()+12*60*60)/(24*60*60)));
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
        return floor($followers);
    }
    $kid=0;
    if (isset($_GET["kid"]) and ctype_digit($_GET["kid"])) {
        $kid=$_GET["kid"];
    }
    $version=json_decode(file_get_contents("data.json"),true);
    
    if (file_exists("ranking.json")) {
        $seasons=json_decode(file_get_contents("ranking.json"),true);
        $data=array_merge($version,$seasons);
    } else {
        $data=$version;
    }
    $qid = floor(time()/(24*60*60));
    if (isset($questions[$qid])) {
        $res = $sql->query("SELECT vote,COUNT(*) as `amount` FROM poll WHERE qid=$qid GROUP BY vote");
        $votes=array();
        $responses = array_slice($questions[$qid],1);
        for ($i=0; $i<count($responses); ++$i) {
            $votes[]=0;
        }
        while ($row=$res->fetch_assoc()) {
            if ($qid<17474) $votes[$row["vote"]]+=$row["amount"];
            else {
                for ($i=0; $i<count($responses); ++$i) {
                    if ($row["vote"]&pow(2,$i)) $votes[$i]+=$row["amount"];
                }
            }
        }
        $voted=false;
        $res1 = $sql->query("SELECT vote FROM poll WHERE qid=$qid AND kid=$kid LIMIT 1");
        if ($row1 = $res1->fetch_assoc()) {
            $voted=$row1["vote"];
        }
        $data["poll"] = array(
            "question"=>$questions[$qid][0],
            "responses"=>$responses,
            "votes"=>$votes,
            "voted"=>$voted
        );
    } else {
        $data["poll"] = array(
            "question"=>"There is no question today",
            "responses"=>array("Come tomorrow"),
            "votes"=>[0],
            "voted"=>0
        );
    }
    $data["WB"]["dealt"]=0;
    $res2 = $sql->query("SELECT SUM(WBD.damage) AS dealt FROM WBD, WB, users WHERE users.kid=$kid AND WB.status=0 AND WB.id=WBD.bid AND WBD.uid=users.id GROUP BY WBD.bid");
	function bigintval($value) {
		$value = trim($value);
		if (ctype_digit($value)) {
			return $value;
		}
		$value = preg_replace("/[^0-9](.*)$/", '', $value);
		if (ctype_digit($value)) {
			return $value;
		}
		return 0;
	}
    if ($row2 = $res2->fetch_assoc()) {
        $data["WB"]["dealt"]=bigintval($row2["dealt"]);
    }
    $res3 = $sql->query("SELECT score,public FROM users WHERE kid=$kid LIMIT 1");
    if ($row3 = $res3->fetch_assoc()) {
        $data["tournament"]["score"]=intval($row3["score"]);
        $data["isPublic"]=$row3["public"]?true:false;
    }
    $res4 = $sql->query("SELECT A.id,A.ends,A.hero,A.bid,A.flash,U.name FROM auction A, users U WHERE A.`status`=0 AND U.id=A.holder");
    $now=time();
    $data["auction"]=array();
    while ($row4 = $res4->fetch_assoc()) {
        $aid = $row4["id"];
        if ($row4["ends"]<=$now) {
            $sql->query("UPDATE auction SET `status`=1 WHERE id=$aid LIMIT 1");
        } else {
            $data["auction"][]=array(
                "hero"=>intval($row4["hero"]),
                "timer"=>(intval($row4["ends"])-$now)*1000,
                "bid"=>intval($row4["bid"]),
                "bidname"=>$row4["name"],
                "flash"=>$row4["flash"]
            );
        }
    }
    // flash tournaments
    /*$data["flash"] = array(
        "current"=>array(),
        "history"=>array()
    );
    $res5 = $sql->query("SELECT * FROM ftournaments WHERE `status`=0 LIMIT 1");
    
    if ($res5->num_rows==1 and $row5 = $res5->fetch_assoc()) {
        $tid = $row5["id"];
        $res6 = $sql->query("SELECT u.kid FROM fsetups f, users u WHERE f.uid=u.id AND f.tid=$tid LIMIT 64");
        $players = array();
        while ($row6=$res6->fetch_assoc()) {
            $players[]=$row6["kid"];
        }
        $data["flash"]["current"]=array(
            "id"=>intval($row5["id"]),
            "hero"=>json_decode($row5["heroes"],true),
            "followers"=>intval($row5["followers"]),
            "joined"=>in_array($kid,$players),
            "players"=>count($players)
        );
        $res7 = $sql->query("SELECT f.tid FROM fsetups f, users u WHERE u.kid = $kid AND u.id=f.uid");
        $prev = array();
        while ($row7=$res7->fetch_assoc()) {
            $prev[]=$row7["tid"];
        }
        rsort($prev);
        $i=0;
        while ($i<count($prev) and count($data["flash"]["history"])<7 and $i<7) {
            if (file_exists("cache/".$prev[$i].".log")) {
                $data["flash"]["history"][]=json_decode(file_get_contents("cache/".$prev[$i].".log"),true);
            }
            ++$i;
        }
    } else {
        $arr=array_fill(0,100,0);
        $data["flash"]["current"]=array(
            "id"=>1,
            "hero"=>$arr,
            "followers"=>1337,
            "joined"=>false,
            "players"=>64
        );
        $res7 = $sql->query("SELECT f.tid FROM fsetups f, users u WHERE u.kid = $kid AND u.id=f.uid");
        $prev = array();
        while ($row7=$res7->fetch_assoc()) {
            $prev[]=$row7["tid"];
        }
        rsort($prev);
        $i=0;
        while ($i<count($prev) and count($data["flash"]["history"])<7 and $i<7) {
            if (file_exists("cache/".$prev[$i].".log")) {
                $data["flash"]["history"][]=json_decode(file_get_contents("cache/".$prev[$i].".log"),true);
            }
            ++$i;
        }
    }*/
    
    $now=time();
    $res=$sql->query("SELECT * FROM events WHERE `end`>$now LIMIT 1");
    if ($res->num_rows>0) {
        $row = $res->fetch_assoc();
        $eid=$row["id"];
        if ($row["type"]==0) {
            $res1 = $sql->query("SELECT l.num FROM lottery l, users u WHERE l.eid=$eid AND l.uid=u.id AND u.kid = $kid");
            $res2 = $sql->query("SELECT COUNT(*) as `pool` FROM lottery  WHERE eid=$eid");
            $nums = array();
            while ($row1=$res1->fetch_assoc()) {
                $nums[]=$row1["num"];
            }
            $row2 = $res2->fetch_assoc();
            $data["lottery"]=array(
                "numbers"=>$nums,
                "pool"=>round($row2["pool"]*0.7),
                "expires"=>($row["end"]-time())*1000,
            );
        } else if ($row["type"]==1) {
            
            $res5 = $sql->query("SELECT * FROM ftournaments WHERE `status`=0 LIMIT 1");
            
            if ($res5->num_rows==1 and $row5 = $res5->fetch_assoc()) {
                $data["flash"] = array(
                    "current"=>array(),
                    "history"=>array()
                );
                $tid = $row5["id"];
                $res6 = $sql->query("SELECT u.kid FROM fsetups f, users u WHERE f.uid=u.id AND f.tid=$tid LIMIT 64");
                $players = array();
                while ($row6=$res6->fetch_assoc()) {
                    $players[]=$row6["kid"];
                }
                $thero = json_decode($row5["heroes"],true);
                while (count($thero)<count($HERO)) $thero[]=0;
                $data["flash"]["current"]=array(
                    "id"=>intval($row5["id"]),
                    "hero"=>json_decode($row5["heroes"],true),
                    "followers"=>intval($row5["followers"]),
                    "joined"=>in_array($kid,$players),
                    "players"=>count($players),
                    "promo"=>array_fill(0,count($HERO),0)
                );
                $res7 = $sql->query("SELECT f.tid FROM fsetups f, users u WHERE u.kid = $kid AND u.id=f.uid");
                $prev = array();
                while ($row7=$res7->fetch_assoc()) {
                    $prev[]=$row7["tid"];
                }
                rsort($prev);
                $i=0;
                while ($i<count($prev) and count($data["flash"]["history"])<7 and $i<7) {
                    if (file_exists("cache/".$prev[$i].".log")) {
                        $data["flash"]["history"][]=json_decode(file_get_contents("cache/".$prev[$i].".log"),true);
                    }
                    ++$i;
                }
            } else {
                $base = doHeros();
                $hero = json_encode($base);
                $followers = calcFollowers($base); 
                $sql->query("INSERT INTO `ftournaments` (`id`, `created`, `completed`, `status`, `heroes`, `followers`) VALUES (NULL, CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000', '0', '$hero', '$followers');");
            }
        } else if ($row["type"]==2) {
            $data["super"]=1;
        } else if ($row["type"]==3) {
            $lvl = 1;
            $res = $sql->query("SELECT d.level FROM dungeon d, users u WHERE d.eid = $eid AND u.id = d.uid AND u.kid = $kid LIMIT 1");    
            if ($res->num_rows==1 and $row = $res->fetch_assoc()) {
                $lvl = intval($row["level"]);
            }
            $res1 = $sql->query("SELECT `hero`,`setup` FROM dlvl WHERE eid = $eid AND `lvl`=$lvl LIMIT 1");
            if ($row1=$res1->fetch_assoc()) {
                $heros = json_decode($row1["hero"],true);
                while (count($heros)<count($HERO)) $heros[]=0;
                $data["dungeon"]=array(
                    "lvl"=>$lvl,
                    "setup"=>json_decode($row1["setup"],true),
                    "hero"=>$heros,
                    "promo"=>array_fill(0,count($HERO),0)
                );
            }
        } else if ($row["type"]==4) {
            $res = $sql->query("SELECT f.id,f.seed,f.open,UNIX_TIMESTAMP(f.ended) as `ended` FROM followers f, users u WHERE f.eid = $eid AND f.uid=u.id AND u.kid = $kid AND f.status=0 LIMIT 1");
            $seed=null;
            $open=0;
            $ended=time()+60*60;
            $valid = true;
            if ($res->num_rows!=0) {
                $row = $res->fetch_assoc();
                $fid = $row["id"];
                $seed = $row["seed"];
                $open = $row["open"];
                $ended = $row["ended"];
                if ($ended<time() and $ended>0) {
                    $sql->query("UPDATE followers SET `status`=1 WHERE id=$fid LIMIT 1");
                }
            } 
            if ($res->num_rows==0 or ($ended<time() and $ended>0)) {
                $res1 = $sql->query("SELECT id FROM users WHERE kid = $kid LIMIT 1");
                $row1 = $res1->fetch_assoc();
                $uid = $row1["id"];

                $res2 = $sql->query("SELECT COUNT(*) as `amount` FROM followers f, users u WHERE f.eid = $eid AND f.uid=u.id AND u.kid = $kid");
                $row2 = $res2->fetch_assoc();
                $amount = $row2["amount"];
                if ($amount<8) {
                    $seed = random_int(0,pow(2,32)-1);
                    $ended=0;
                    $open=0;
                    $sql->query("INSERT INTO `followers` (`id`, `eid`, `uid`, `status`, `seed`, `open`, `ended`) VALUES (NULL, $eid, $uid, '0', '$seed', '0', '0');");
                } else {
                    $valid=false;
                }
            }
            if ($valid) {
                $opened = array();
                $slots = array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1);
                $b0 = ($open&15)-1;
                $b1 = (($open>>4)&15)-1;
                $b2 = (($open>>8)&15)-1;
                if ($b0!=-1) {
                    $opened[]=$b0;
                    $slots[$b0]=1;
                }
                if ($b1!=-1) {
                    $opened[]=$b1;
                    $slots[$b1]=1;
                }
                if ($b2!=-1) {
                    $opened[]=$b2;
                    $slots[$b2]=1;
                }
                
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
                for ($i=0; $i<count($pt); ++$i) {
                    if ($slots[$i]==1 or $b2!=-1) $slots[$i]=$pt[$i];
                }
                $data["followers"]=array(
                    // unopen
                    "current"=>$slots,
                    "open"=>$opened,
                    "timeleft"=>($ended)*1000
                );
            }
        } else if ($row["type"]==5) {
            $res = $sql->query("SELECT k.data FROM keyevent k, users u WHERE k.eid = $eid AND k.uid=u.id AND u.kid = $kid LIMIT 1");
            $datar = array();
            if ($res->num_rows!=0) {
                $row = $res->fetch_assoc();
                $datar = json_decode($row["data"],true);
            } else {
                $res1 = $sql->query("SELECT id FROM users WHERE kid = $kid LIMIT 1");
                $row1 = $res1->fetch_assoc();
                $uid = $row1["id"];
                $arrmysql = $sql->real_escape_string(json_encode($datar));
                $sql->query("INSERT INTO `keyevent` (`id`, `eid`, `uid`, `data`) VALUES (NULL, $eid, $uid, '$arrmysql');");
            }
            $data["keys"]=$datar;
        } else if ($row["type"]==6) {
            $data["cc"]=true;
        } else if ($row["type"]==7) {
            $data["pge"]=true;
        } else if ($row["type"]==8) {
            $data["adventure"]=true;
        }
    }
   
        $data["lto"] = json_decode(
            //'[{"offer":0,"id":42,"start":-1,"finish":-1,"curr":"UM","price":1000,"level":1,"promo":0,"notify":false},{"offer":1,"id":43,"start":-1,"finish":-1,"curr":"UM","price":2000,"level":1,"promo":0,"notify":false},{"offer":2,"id":44,"start":-1,"finish":-1,"curr":"UM","price":5000,"level":1,"promo":0,"notify":false},{"offer":3,"id":20,"start":18309,"finish":18315,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false},{"offer":4,"id":96,"start":18316,"finish":18322,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":5,"id":130,"start":18323,"finish":18329,"curr":"KRED","price":300,"level":1,"promo":0,"notify":false},{"offer":6,"id":113,"start":18330,"finish":18336,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":7,"id":148,"start":18337,"finish":18343,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":8,"id":20,"start":18344,"finish":18350,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false},{"offer":9,"id":96,"start":18351,"finish":18357,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":10,"id":130,"start":18358,"finish":18364,"curr":"KRED","price":300,"level":1,"promo":0,"notify":false},{"offer":11,"id":113,"start":18365,"finish":18371,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":12,"id":148,"start":18372,"finish":18378,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":13,"id":20,"start":18379,"finish":18385,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false},{"offer":14,"id":96,"start":18386,"finish":18392,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":15,"id":130,"start":18393,"finish":18399,"curr":"KRED","price":300,"level":1,"promo":0,"notify":false},{"offer":16,"id":113,"start":18400,"finish":18406,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":17,"id":148,"start":18407,"finish":18413,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":18,"id":20,"start":18414,"finish":18420,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false},{"offer":19,"id":96,"start":18421,"finish":18427,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":20,"id":130,"start":18428,"finish":18434,"curr":"KRED","price":300,"level":1,"promo":0,"notify":false},{"offer":21,"id":113,"start":18435,"finish":18441,"curr":"KRED","price":200,"level":1,"promo":0,"notify":false},{"offer":22,"id":8,"start":18309,"finish":18311,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":50}},{"offer":23,"id":70,"start":18312,"finish":18314,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":100}},{"offer":24,"id":79,"start":18315,"finish":18317,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},{"offer":25,"id":25,"start":18318,"finish":18320,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":50}},{"offer":26,"id":96,"start":18321,"finish":18323,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":100}},{"offer":27,"id":37,"start":18324,"finish":18326,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":50}},{"offer":28,"id":95,"start":18327,"finish":18329,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":29,"id":167,"start":18330,"finish":18332,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},{"offer":30,"id":169,"start":18333,"finish":18335,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":100}},{"offer":31,"id":26,"start":18336,"finish":18338,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},{"offer":32,"id":52,"start":18339,"finish":18341,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":50}},{"offer":33,"id":182,"start":18342,"finish":18344,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":50}},{"offer":34,"id":169,"start":18345,"finish":18347,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":100}},{"offer":35,"id":92,"start":18348,"finish":18350,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":100}},{"offer":36,"id":12,"start":18351,"finish":18353,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":37,"id":26,"start":18354,"finish":18356,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":38,"id":141,"start":18357,"finish":18359,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":50}},{"offer":39,"id":113,"start":18360,"finish":18362,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":100}},{"offer":40,"id":18,"start":18363,"finish":18365,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":41,"id":79,"start":18366,"finish":18368,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":42,"id":129,"start":18369,"finish":18371,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},{"offer":43,"id":179,"start":18372,"finish":18374,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},{"offer":44,"id":16,"start":18375,"finish":18377,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":25}},{"offer":45,"id":66,"start":18378,"finish":18380,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},{"offer":46,"id":18,"start":18381,"finish":18383,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},{"offer":47,"id":20,"start":18384,"finish":18386,"curr":"KRED","price":150,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":48,"id":10,"start":18387,"finish":18389,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":25}},{"offer":49,"id":81,"start":18390,"finish":18392,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},{"offer":50,"id":182,"start":18393,"finish":18395,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":50}},{"offer":51,"id":70,"start":18396,"finish":18398,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},{"offer":52,"id":19,"start":18399,"finish":18401,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":50}},{"offer":53,"id":45,"start":18402,"finish":18404,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":25}},{"offer":54,"id":178,"start":18405,"finish":18407,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},{"offer":55,"id":67,"start":18408,"finish":18410,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":100}},{"offer":56,"id":167,"start":18411,"finish":18413,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},{"offer":57,"id":78,"start":18414,"finish":18416,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":50}},{"offer":58,"id":20,"start":18417,"finish":18419,"curr":"KRED","price":150,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},{"offer":59,"id":129,"start":18420,"finish":18422,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},{"offer":60,"id":53,"start":18423,"finish":18425,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":61,"id":174,"start":18426,"finish":18428,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":100}},{"offer":62,"id":15,"start":18429,"finish":18431,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},{"offer":63,"id":182,"start":18432,"finish":18434,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":50}},{"offer":64,"id":65,"start":18435,"finish":18437,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},{"offer":65,"id":45,"start":18438,"finish":18440,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":25}},{"offer":66,"id":23,"start":18441,"finish":18443,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},{"offer":67,"id":66,"start":18309,"finish":18309,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":68,"id":26,"start":18310,"finish":18310,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":69,"id":22,"start":18311,"finish":18311,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":70,"id":182,"start":18312,"finish":18312,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":71,"id":113,"start":18313,"finish":18313,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":72,"id":24,"start":18314,"finish":18314,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":73,"id":53,"start":18315,"finish":18315,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":74,"id":174,"start":18316,"finish":18316,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":75,"id":86,"start":18317,"finish":18317,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":76,"id":14,"start":18318,"finish":18318,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":77,"id":15,"start":18319,"finish":18319,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":78,"id":183,"start":18320,"finish":18320,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":79,"id":68,"start":18321,"finish":18321,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":80,"id":165,"start":18322,"finish":18322,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":81,"id":64,"start":18323,"finish":18323,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":82,"id":10,"start":18324,"finish":18324,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":83,"id":82,"start":18325,"finish":18325,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":84,"id":176,"start":18326,"finish":18326,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":85,"id":23,"start":18327,"finish":18327,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":86,"id":12,"start":18328,"finish":18328,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":87,"id":22,"start":18329,"finish":18329,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":88,"id":143,"start":18330,"finish":18330,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":89,"id":142,"start":18331,"finish":18331,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":90,"id":45,"start":18332,"finish":18332,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":91,"id":93,"start":18333,"finish":18333,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":92,"id":127,"start":18334,"finish":18334,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":93,"id":45,"start":18335,"finish":18335,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":94,"id":16,"start":18336,"finish":18336,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":95,"id":166,"start":18337,"finish":18337,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":96,"id":37,"start":18338,"finish":18338,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":97,"id":69,"start":18339,"finish":18339,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":98,"id":69,"start":18340,"finish":18340,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":99,"id":70,"start":18341,"finish":18341,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":100,"id":148,"start":18342,"finish":18342,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":101,"id":21,"start":18343,"finish":18343,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":102,"id":140,"start":18344,"finish":18344,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":103,"id":150,"start":18345,"finish":18345,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":104,"id":141,"start":18346,"finish":18346,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":105,"id":12,"start":18347,"finish":18347,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":106,"id":68,"start":18348,"finish":18348,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":107,"id":93,"start":18349,"finish":18349,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":108,"id":141,"start":18350,"finish":18350,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":109,"id":25,"start":18351,"finish":18351,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":110,"id":18,"start":18352,"finish":18352,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":111,"id":45,"start":18353,"finish":18353,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":112,"id":149,"start":18354,"finish":18354,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":113,"id":130,"start":18355,"finish":18355,"curr":"UM","price":15000,"level":1,"promo":0,"notify":false},{"offer":114,"id":127,"start":18356,"finish":18356,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":115,"id":67,"start":18357,"finish":18357,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":116,"id":66,"start":18358,"finish":18358,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":117,"id":111,"start":18359,"finish":18359,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":118,"id":17,"start":18360,"finish":18360,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":119,"id":24,"start":18361,"finish":18361,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":120,"id":167,"start":18362,"finish":18362,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":121,"id":18,"start":18363,"finish":18363,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":122,"id":22,"start":18364,"finish":18364,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":123,"id":64,"start":18365,"finish":18365,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":124,"id":167,"start":18366,"finish":18366,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":125,"id":26,"start":18367,"finish":18367,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":126,"id":14,"start":18368,"finish":18368,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":127,"id":62,"start":18369,"finish":18369,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":128,"id":63,"start":18370,"finish":18370,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":129,"id":81,"start":18371,"finish":18371,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":130,"id":32,"start":18372,"finish":18372,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":131,"id":37,"start":18373,"finish":18373,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":132,"id":78,"start":18374,"finish":18374,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":133,"id":70,"start":18375,"finish":18375,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":134,"id":37,"start":18376,"finish":18376,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":135,"id":148,"start":18377,"finish":18377,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":136,"id":142,"start":18378,"finish":18378,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":137,"id":46,"start":18379,"finish":18379,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":138,"id":150,"start":18380,"finish":18380,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":139,"id":149,"start":18381,"finish":18381,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":140,"id":176,"start":18382,"finish":18382,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":141,"id":129,"start":18383,"finish":18383,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":142,"id":113,"start":18384,"finish":18384,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":143,"id":19,"start":18385,"finish":18385,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":144,"id":127,"start":18386,"finish":18386,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":145,"id":176,"start":18387,"finish":18387,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":146,"id":181,"start":18388,"finish":18388,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":147,"id":24,"start":18389,"finish":18389,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":148,"id":78,"start":18390,"finish":18390,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":149,"id":167,"start":18391,"finish":18391,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":150,"id":46,"start":18392,"finish":18392,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":151,"id":142,"start":18393,"finish":18393,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":152,"id":96,"start":18394,"finish":18394,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":153,"id":86,"start":18395,"finish":18395,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":154,"id":94,"start":18396,"finish":18396,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":155,"id":68,"start":18397,"finish":18397,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":156,"id":169,"start":18398,"finish":18398,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":157,"id":128,"start":18399,"finish":18399,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":158,"id":12,"start":18400,"finish":18400,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":159,"id":25,"start":18401,"finish":18401,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":160,"id":63,"start":18402,"finish":18402,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":161,"id":11,"start":18403,"finish":18403,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":162,"id":92,"start":18404,"finish":18404,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":163,"id":183,"start":18405,"finish":18405,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":164,"id":150,"start":18406,"finish":18406,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":165,"id":95,"start":18407,"finish":18407,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":166,"id":177,"start":18408,"finish":18408,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":167,"id":66,"start":18409,"finish":18409,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":168,"id":53,"start":18410,"finish":18410,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":169,"id":78,"start":18411,"finish":18411,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":170,"id":183,"start":18412,"finish":18412,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":171,"id":93,"start":18413,"finish":18413,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":172,"id":86,"start":18414,"finish":18414,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":173,"id":86,"start":18415,"finish":18415,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":174,"id":68,"start":18416,"finish":18416,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":175,"id":129,"start":18417,"finish":18417,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":176,"id":79,"start":18418,"finish":18418,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":177,"id":67,"start":18419,"finish":18419,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":178,"id":176,"start":18420,"finish":18420,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":179,"id":30,"start":18421,"finish":18421,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":180,"id":13,"start":18422,"finish":18422,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":181,"id":142,"start":18423,"finish":18423,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":182,"id":22,"start":18424,"finish":18424,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":183,"id":142,"start":18425,"finish":18425,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":184,"id":46,"start":18426,"finish":18426,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":185,"id":82,"start":18427,"finish":18427,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":186,"id":20,"start":18428,"finish":18428,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":187,"id":166,"start":18429,"finish":18429,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":188,"id":110,"start":18430,"finish":18430,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":189,"id":140,"start":18431,"finish":18431,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},{"offer":190,"id":53,"start":18432,"finish":18432,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":191,"id":78,"start":18433,"finish":18433,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":192,"id":66,"start":18434,"finish":18434,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":193,"id":129,"start":18435,"finish":18435,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":194,"id":11,"start":18436,"finish":18436,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":195,"id":14,"start":18437,"finish":18437,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":196,"id":17,"start":18438,"finish":18438,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":197,"id":38,"start":18439,"finish":18439,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":198,"id":38,"start":18440,"finish":18440,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},{"offer":199,"id":82,"start":18441,"finish":18441,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":200,"id":70,"start":18442,"finish":18442,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},{"offer":201,"id":130,"start":18443,"finish":18443,"curr":"UM","price":15000,"level":1,"promo":0,"notify":false},{"offer":202,"id":94,"start":18444,"finish":18444,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},{"offer":203,"id":205,"start":18330,"finish":18343,"curr":"KRED","price":300,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":300}}]',
            '[{"offer":0,"id":42,"start":-1,"finish":-1,"curr":"UM","price":1000,"level":1,"promo":0,"notify":false},{"offer":1,"id":43,"start":-1,"finish":-1,"curr":"UM","price":2000,"level":1,"promo":0,"notify":false},{"offer":2,"id":44,"start":-1,"finish":-1,"curr":"UM","price":5000,"level":1,"promo":0,"notify":false},{"offer":3,"id":185,"start":-1,"finish":-1,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false}]',
            true
        );
    //}
    $tid = getTid();
    $res = $sql->query("SELECT * FROM tournaments2 WHERE tid = $tid LIMIT 1");
    if ($row=$res->fetch_assoc()) {
        
        $hero = json_decode($row["heroes"],true);
        $promo = json_decode($row["promo"],true);
        $grid = json_decode($row["grid"],true);
        $vals = json_decode($row["vals"],true);

        $res1 = $sql->query("SELECT COUNT(*) as `players` FROM setups2 WHERE tid = $tid GROUP BY tid");
        $row1 = $res1->fetch_assoc();
        $res2 = $sql->query("SELECT u.name FROM setups2 s, users u WHERE u.kid = $kid AND u.id =s.uid AND s.tid=$tid LIMIT 1");
        $players = $row1["players"];
        $joined = $res2->num_rows!=0;
        $followers = floatval($row["followers"]);
        $data["tour"]=array(
            "current"=>array(
                "hero"=>$hero,
                "followers"=>$followers,
                "joined"=>$joined,
                "players"=>$players,
                "promo"=>$promo,
                "grid"=>$grid,
                "vals"=>$vals
            )
        );
    }
    $LEVELS = json_decode(file_get_contents("h1343421.json"),true);
    $res = $sql->query("SELECT `floor` FROM halloween WHERE `kid` = $kid LIMIT 1");
    $level=1;
    if ($row=$res->fetch_assoc()) {
        $level = intval($row["floor"]);
    }
    $data["halloween"]=array(
        "level"=>$level,
        "setup"=>($level<1001)?$LEVELS[$level-1]:[]
    );
                    
    $res = $sql->query("SELECT SUM(`value`) as `suma` FROM `easter` WHERE 1");
    if ($row = $res->fetch_assoc()) {
        $data["easter"]=array("value"=>$row["suma"]);
    }
    $data["status"]=array("text"=>"","id"=>0);
    $sql->close();
    echo json_encode($data);
?>
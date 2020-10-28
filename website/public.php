<?php
    include_once("sql.php");
    include_once("questions.php");
    include_once("data.php");
	include_once("functions.php");
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
    
    $data=$version;
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
	$data["WB"]["modifier"]=1;
    $res2 = $sql->query("SELECT WBD.bid, SUM(WBD.damage) AS dealt FROM WBD, WB, users WHERE users.kid=$kid AND WB.status=0 AND WB.id=WBD.bid AND WBD.uid=users.id GROUP BY WBD.bid");
	function bigintval($value) {
		$value = trim($value);
		if (ctype_digit($value)) {
			return $value;
		}
		$value = str_replace('.', '', $value);
		$value = preg_replace("/[^0-9](.*)$/", '', $value);
		if (ctype_digit($value)) {
			return $value;
		}
		return 0;
	}
    if ($row2 = $res2->fetch_assoc()) {
        $data["WB"]["dealt"]=bigintval($row2["dealt"]);
		$data["WB"]["modifier"]=wbRewardModifier($row2["bid"]);
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
                "pool"=>round($row2["pool"]*1.05),
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
			$amount = 0;
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
                    "timeleft"=>($ended)*1000,
					"completed"=>$amount
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
        '[{"offer":0,"id":42,"start":-1,"finish":-1,"curr":"UM","price":1000,"level":1,"promo":0,"notify":false},
        {"offer":1,"id":43,"start":-1,"finish":-1,"curr":"UM","price":2000,"level":1,"promo":0,"notify":false},
        {"offer":2,"id":44,"start":-1,"finish":-1,"curr":"UM","price":5000,"level":1,"promo":0,"notify":false},
        {"offer":3,"id":185,"start":-1,"finish":-1,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":4,"id":33,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false}
        ,{"offer":5,"id":34,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":6,"id":35,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":7,"id":48,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":8,"id":49,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":50,"id":35,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":10,"id":59,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":11,"id":60,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":12,"id":61,"start":-1,"finish":-1,"curr":"UM","price":200,"level":1,"promo":0,"notify":false},
        {"offer":13,"id":168,"start":18553,"finish":18559,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":14,"id":62,"start":18553,"finish":18553,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":15,"id":53,"start":18554,"finish":18554,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":16,"id":47,"start":18555,"finish":18557,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},
        {"offer":17,"id":70,"start":18555,"finish":18555,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":18,"id":195,"start":18556,"finish":18556,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":19,"id":36,"start":18557,"finish":18557,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":20,"id":63,"start":18558,"finish":18560,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":50}},
        {"offer":21,"id":82,"start":18558,"finish":18558,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":22,"id":165,"start":18559,"finish":18559,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":23,"id":205,"start":18560,"finish":18566,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":24,"id":196,"start":18560,"finish":18560,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":25,"id":7,"start":18561,"finish":18563,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":25}},
        {"offer":26,"id":47,"start":18561,"finish":18561,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":27,"id":109,"start":18562,"finish":18562,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":28,"id":89,"start":18563,"finish":18563,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":29,"id":136,"start":18564,"finish":18566,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":50}},
        {"offer":30,"id":89,"start":18564,"finish":18564,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":31,"id":9,"start":18565,"finish":18565,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":32,"id":67,"start":18566,"finish":18566,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":33,"id":168,"start":18567,"finish":18573,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":34,"id":64,"start":18567,"finish":18569,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},
        {"offer":35,"id":150,"start":18567,"finish":18567,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":36,"id":165,"start":18568,"finish":18568,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":37,"id":65,"start":18569,"finish":18569,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":38,"id":18,"start":18570,"finish":18572,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},
        {"offer":39,"id":102,"start":18570,"finish":18570,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":40,"id":111,"start":18571,"finish":18571,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":41,"id":197,"start":18572,"finish":18572,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":42,"id":129,"start":18573,"finish":18575,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},
        {"offer":43,"id":88,"start":18573,"finish":18573,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":44,"id":180,"start":18574,"finish":18580,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":45,"id":142,"start":18574,"finish":18574,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":46,"id":79,"start":18575,"finish":18575,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":47,"id":16,"start":18576,"finish":18578,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":25}},
        {"offer":48,"id":142,"start":18576,"finish":18576,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":49,"id":88,"start":18577,"finish":18577,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":50,"id":166,"start":18578,"finish":18578,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":51,"id":109,"start":18579,"finish":18581,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},
        {"offer":52,"id":143,"start":18579,"finish":18579,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":53,"id":76,"start":18580,"finish":18580,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":54,"id":175,"start":18581,"finish":18587,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":55,"id":180,"start":18581,"finish":18581,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":56,"id":70,"start":18582,"finish":18584,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":100}},
        {"offer":57,"id":108,"start":18582,"finish":18582,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":58,"id":10,"start":18583,"finish":18583,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":59,"id":148,"start":18584,"finish":18584,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":60,"id":109,"start":18585,"finish":18587,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},
        {"offer":61,"id":166,"start":18585,"finish":18585,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":62,"id":89,"start":18586,"finish":18586,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":63,"id":14,"start":18587,"finish":18587,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":64,"id":175,"start":18588,"finish":18594,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":65,"id":15,"start":18588,"finish":18590,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},
        {"offer":66,"id":16,"start":18588,"finish":18588,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":67,"id":11,"start":18589,"finish":18589,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":68,"id":110,"start":18590,"finish":18590,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":69,"id":47,"start":18591,"finish":18593,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"PG","amount":75}},
        {"offer":70,"id":52,"start":18591,"finish":18591,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":71,"id":198,"start":18592,"finish":18592,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":72,"id":25,"start":18593,"finish":18593,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":73,"id":177,"start":18594,"finish":18596,"curr":"KRED","price":30,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":50}},
        {"offer":74,"id":183,"start":18594,"finish":18594,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":75,"id":96,"start":18595,"finish":18601,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":76,"id":132,"start":18595,"finish":18595,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":77,"id":78,"start":18596,"finish":18596,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":78,"id":21,"start":18597,"finish":18599,"curr":"KRED","price":10,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":25}},
        {"offer":79,"id":184,"start":18597,"finish":18597,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":80,"id":51,"start":18598,"finish":18598,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":81,"id":25,"start":18599,"finish":18599,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":82,"id":26,"start":18600,"finish":18602,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":75}},
        {"offer":83,"id":81,"start":18600,"finish":18600,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":84,"id":182,"start":18601,"finish":18601,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":85,"id":180,"start":18602,"finish":18608,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false},
        {"offer":86,"id":86,"start":18602,"finish":18602,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":87,"id":79,"start":18603,"finish":18605,"curr":"KRED","price":100,"level":1,"promo":0,"notify":false,"extra":{"curr":"AS","amount":75}},
        {"offer":88,"id":36,"start":18603,"finish":18603,"curr":"UM","price":250,"level":1,"promo":0,"notify":false},
        {"offer":89,"id":168,"start":18604,"finish":18604,"curr":"UM","price":10000,"level":1,"promo":0,"notify":false},
        {"offer":90,"id":91,"start":18605,"finish":18605,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":91,"id":100,"start":18606,"finish":18608,"curr":"KRED","price":250,"level":1,"promo":0,"notify":false,"extra":{"curr":"CC","amount":100}},
        {"offer":92,"id":136,"start":18606,"finish":18606,"curr":"UM","price":750,"level":1,"promo":0,"notify":false},
        {"offer":93,"id":89,"start":18607,"finish":18607,"curr":"UM","price":2500,"level":1,"promo":0,"notify":false},
        {"offer":94,"id":46,"start":18608,"finish":18608,"curr":"UM","price":750,"level":1,"promo":0,"notify":false}]',
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
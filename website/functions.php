<?php
include_once("data.php");
$__start=0;
function doHeader($title) {
    global $__start;
    $__start=microtime(true);
    $html='
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="favicon.ico" />

            <title>'.$title.'</title>
            <meta name="description" content="Official Webpage for Cosmos Quest">
            <meta name="author" content="GAIABYTE">

            <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css?v=1.0">
            <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>
            
            <!--[if lt IE 9]>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
            <![endif]-->
        </head>
        <body>
            <div id="layout">';

    echo $html;
}

function doMenu($selected=false) {
    $items = array(
        array(
            "url"=>"tournament.php",
            "title"=>"Tournaments"
        ),array(
            "url"=>"tournament2.php",
            "title"=>"Tournaments: Pro"
        ),array(
            "url"=>"ftournament.php",
            "title"=>"Flash Tournaments"
        ),array(
            "url"=>"highscores.php",
            "title"=>"Highscores"
        ),array(
            "url"=>"wb.php",
            "title"=>"World Bosses"
        ),array(
            "url"=>"dungeon.php",
            "title"=>"Dungeons"
        ),array(
            "url"=>"lottery.php",
            "title"=>"Lottery"
        ),array(
            "url"=>"wevents.php",
            "title"=>"Weekly Events"
        ),array(
            "url"=>"user.php",
            "title"=>"Search User"
        ),array(
            "url"=>"poll.php",
            "title"=>"Poll results"
        ),array(
            "url"=>"stats.php",
            "title"=>"Unit Stats"
        )
    );
    $items2 = array(
        array(
            "url"=>"http://www.kongregate.com/games/GaiaByte/cosmos-quest",
            "title"=>"PLAY!",
            "target"=>"_blank"
        ),array(
            "url"=>"http://cosmos-quest.wikia.com/wiki/Cosmos_Quest_Wiki",
            "title"=>"Wiki",
            "target"=>"_blank"
        )
    );
    $menu="";
    foreach ($items as $pos=>$item) {
        $extra="";
        if ($selected==$item["url"]) $extra=" pure-menu-selected";
        $menu.='<li class="pure-menu-item'.$extra.'"><a class="pure-menu-link" href="'.$item["url"].'"';
        if (isset($item["target"])) $menu.=' target="'.$item["target"].'"';
        $menu.='>'.$item["title"].'</a></li>';
    }
    $menu2="";
    foreach ($items2 as $pos=>$item) {
        $menu2.='<li class="pure-menu-item"><a class="pure-menu-link" href="'.$item["url"].'"';
        if (isset($item["target"])) $menu2.=' target="'.$item["target"].'"';
        $menu2.='>'.$item["title"].'</a></li>';
    }
    // pure-menu-selected
    $html='<!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link">
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <div id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="/">
                <img src="img/icon.gif" id="gicon">
            </a>

            <ul class="pure-menu-list">
                '.$menu.'
            </ul>
            <span class="pure-menu-heading divisor">
                Useful links
            </span>
            <ul class="pure-menu-list">
                '.$menu2.'
            </ul>
        </div>
    </div>';
    echo $html;
}

function doContent($inside,$title="") {
    $html='
    <div id="main">
        <div class="header">
            <h1>'.$title.'</h1>
        </div>

        <div class="content">
        '.$inside.'
        </div>';
    echo $html;
}

function doFooter() {
    global $__start,$sql;
    $time=microtime(true)-$__start;
    $html='
        <div class="footer">
            <div class="legal pure-g">
                <div class="pure-u-1-2">
                    <p class="footer-left">
                        <a href="tos.php">Terms of Service</a> · 
                        <a href="privacy.php">Privacy Policy</a> ·
                        <a href="cookies.php">Cookies Policy</a><br>
                        <a href="http://gaiabyte.com" target="_blank">GAIABYTE</a>
                    </p>
                </div>
            
                <div class="pure-u-1-2">
                    <p class="footer-right">
                        Loaded in '.sprintf("%.04f",$time).'s<br>
                        © 2017 GAIABYTE SL All rights reserved.
                    </p>
                </div>
            </div>
        </div>'."
    </div><script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-101789501-1', 'auto');
  ga('send', 'pageview');

</script>".'
<script src="ui.js"></script>  
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
<script>
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#252e39"
    },
    "button": {
      "background": "#14a7d0"
    }
  },
  "theme": "classic",
  "position": "bottom-right",
  "content": {
    "href": "cookies.php"
  }
})});
</script>  
</body>
</html>';
    echo $html;
    try {
        $sql->close();
    } catch (Exception $e) {
        
    }
}

function doStatus($i) {
    $res=array("Registration","Running","Done");
    return $res[$i];
}

function doTournament($i) {
    $res=array();
    if ($i<17415) $res=array("Elimination","Swiss");
    else if ($i<17456) $res=array("Elimination","Round Robin");
    else if ($i<=17555) $res=array("Double Elimination","Round Robin");
    else if ($i<=17654) $res=array("Round Robin","20 Round League","5 lives");
    else if ($i<=17825) $res=array("Round Robin","25 Round League","5 lives");
    else if ($i<17928) $res=array("Round Robin","30 Round League","5 Lives","Swiss");
    else if ($i<18039) $res=array("30 Round League","5 Lives","Multilevel");
    else if ($i<18170) $res=array("Page Rank","5 Lives","Multilevel");
    else $res=array("Page Rank","5 Lives","Lane League");
    return $res[$i%count($res)];
}

function doHero($i) {
    $res=array();
    if ($i<17415) $res=array("Legendary","No Heroes","User Heroes","Common","Rare");
    else if ($i<17456) $res=array("Super Common","No Heroes","User Heroes","All LvL 99","One per line");
    else if ($i<17499) $res=array("Random Heroes","No Heroes","User Heroes","All LvL 99","One per line");
    else if ($i<=17555) $res=array(
        "No Heroes",
        "Air Only",
        "All Random LvL",
        "Your Common",
        "Earth Only",
        "Random LvL 99",
        "Your Rares",
        "Fire Only",
        "All LvL 99",
        "Your Legendaries",
        "Water Only",
    );
    else if ($i<=17654) {
        $res=array(
            "Your Common", 
            "No heroes", 
            "Random Rare", 
            "Water and Fire", 
            "Your Legendary", 
            "Random Common", 
            "Random Super", 
            "Your Rare", 
            "Earth and Air", 
            "Random Legendary" 
        );
    } else if ($i<=17825) {
        $res=array(
            "No Heroes",
            "Your Common",
            "Random Rare",
            "Your Legendary",
            "Random Heroes",
            "Random Common",
            "Your Rare",
            "Random Legendary",
            "Your Heroes",
            "Random Super"
        );
    } else if ($i<17928) {
        $res=array(
            "Your Common",
            "Random Legendary",
            "Random Season",
            "Your Rare",
            "No Heroes",
            "Random Event",
            "Your Legendary",
            "Random Rare",
            "Random Chest",
            "Your Heroes",
            "Random Common",
            "Random Quest",
            "Random Ascended"
        );
    } else if ($i<18039){
        $res=array(
            "Your Common",
            "Random Legendary",
            "Your Rare",
            "No Heroes",
            "Random Promotion 5",
            "Your Legendary",
            "Random Rare",
            "Random Common",
            "Your Heroes",
            "Random Heroes",
            "Random Ascended"
        );
    } else if ($i<=18373) {
        $res=array(
            "Your Common",
            "Rare & Legendary",
            "Your Heroes",
            "Common & Rare",
            "Legendary & Ascended",
            "Your Rare",
            "Super Legendary",
            "Random Promotion 5",
            "Your Legendary",
            "Super Ascended",
            "No Heroes"
        );
    } else if ($i<=18558) { //S11
        $res=array(
            "Your Heroes",
            "No Heroes",
            "Super Ascended",
            "Your Legendary",
            "Random P6",
            "Your Common",
            "Random",
            "Random Legendary", 
            "Your Rare",
            "Random Common",
            "Super Rare",
        );
    } else {
        $res=array(
            "Your Heroes",
            "Boring Common & Rare",
            "Tanks",
            "Your Legendary",
            "Air & Fire",
            "Your Common",
            "Random Rare",
            "Super Legendary",
            "Your Rare",
            "Random Chest",
            "Water & Earth",
        );
    }
    return $res[$i%count($res)];
}

function doFollowers($i) {
    $res=array("30.000","600.000","9.000.000");
    if ($i<17415) return $res[$i%3];
    else return number_format(tid2fol($i),0,",",".");
}

function doCost($i) {
    if ($i<=17349) return 10;
    else if ($i<17456) $res=array(50,100,200,200,100,50,100);
    else if ($i<=17555) $res=array(50,100,200,500,100,50,100);
    else if ($i<18039) $res=array(100,100,200,500,100,100,10);
    else $res=array(125, 125, 250, 400, 125, 125, 50);
    return $res[$i%7];
}

function doRound($pos,$total) {
    $start=1;
    while (ceil($total/2)>=$pos&&$total>=3) {
        ++$start;
        $total=ceil($total/2);
    }
    return $start;
}

function doPG($pos) {
    if ($pos<1) return 1;
    else if ($pos<=10) return 25;
    else if ($pos<=25) return 20;
    else if ($pos<=50) return 15;
    else if ($pos<=100) return 10;
    else if ($pos<=200) return 8;
    else if ($pos<=400) return 6;
    else if ($pos<=600) return 4;
    else if ($pos<=1000) return 2;
    else return 1;
}

function doPG1($pos) {
    if ($pos<1) return 1;
    else if ($pos<=10) return 25;
    else if ($pos<=25) return 20;
    else if ($pos<=50) return 16;
    else if ($pos<=100) return 14;
    else if ($pos<=200) return 12;
    else if ($pos<=400) return 10;
    else if ($pos<=600) return 8;
    else if ($pos<=1000) return 6;
    else return 4;
}

function doPG2($pos,$tid) {
    $cost = doCost($tid);
    if ($cost==10) return doPG1($pos);
    else if ($cost==100) {
        if ($pos<=10) return 40;
        else return floor(doPG1($pos)*1.5);
    } else if ($cost==200) return doPG1($pos)*2;
    else if ($cost==500) return doPG1($pos)*4;
}

function doPG3($pos,$tid) {
    $TPG = array(
        "0"=> array( 30, 25, 21, 19, 17, 15, 13, 11, 9 ),
        "10"=> array( 25, 20, 16, 14, 12, 10, 8, 6, 4 ),
        "50"=> array( 30, 25, 21, 19, 17, 15, 13, 11, 9 ),
        "100"=> array( 40, 30, 24, 21, 18, 15, 12, 9, 6 ),
        "125"=> array( 55, 45, 39, 35, 33, 30, 27, 24, 21 ),
        "200"=> array( 50, 40, 32, 28, 24, 20, 16, 12, 8 ),
        "250"=> array( 80, 70, 62, 58, 54, 50, 46, 42, 38 ),
        "400"=> array( 120, 105, 97, 89, 81, 77, 73, 69, 65 ),
        "500"=> array( 100, 80, 64, 54, 48, 40, 32, 24, 16 )
    );
    $price = doCost($tid);
    if ($pos<1) return 1;
    else if ($pos<=10) return $TPG[$price][0];
    else if ($pos<=25) return $TPG[$price][1];
    else if ($pos<=50) return $TPG[$price][2];
    else if ($pos<=100) return $TPG[$price][3];
    else if ($pos<=200) return $TPG[$price][4];
    else if ($pos<=400) return $TPG[$price][5];
    else if ($pos<=600) return $TPG[$price][6];
    else if ($pos<=1000) return $TPG[$price][7];
    else return $TPG[$price][8];
}

function getPG($cid,$pos) {
    if ($cid<=160) return doPG($pos);
    else if ($cid<=208) return doPG1($pos);
    else if ($cid<=18039-17347) return doPG2($pos,$cid+17347);
    else if ($cid<=1211) return doPG3($pos,$cid+17347);
    else return doPG3($pos,$cid+17347+4); // S12 delay
}

function doReward($pos,$total,$price) {
    $pool=$price*$total*0.7;
    $prized=ceil($total*0.1);
    $exp=1+1/$prized;
    $sum=0;
    $val=0;
    for ($i=1; $i<=$prized; ++$i) {
        $sum+=1/pow($i,$exp);
        if ($i==$pos) $val=1/pow($i,$exp);
    }
    return round($pool*($val/$sum));
}

function doReward2($pos,$total,$price) {
    $pool=$price*$total*1000;

    return round(pos2perc2($pos,$total)*$pool);
}

$ESEASONS = array("Season 1","Season 2","Season 3","Season 4","Season 5","Season 6","Season 7","Season 8","Season 9","Season 10","Season 11");
$EMODES = array("Elimination","Swiss","Round Robin","Dbl. Elim.","20r League","5 lives","25r League","30r League","Multilevel","Page Rank","Lane League");
$EHERO = array(
    "Legendary",
    "No Heroes",
    "User Heroes",
    "Common",
    "Rare",
    "Super Common", // 5
    "All LvL 99",
    "One per line",
    "Random Heroes",
    "Air Only",
    "All Random LvL", // 10
    "Your Common",
    "Earth Only",
    "Random LvL 99",
    "Your Rares",
    "Fire Only", // 15
    "Your Legendaries",
    "Water Only",
    "Random Common",
    "Random Rare",
    "Random Legendary",//20
    "Earth and Air",
    "Water and Fire",
    "Random Super",
    "Random Chest",
    "Random Quest", //25
    "Random Season",
    "Random Event",
    "Random Ascended",
    "Random 5 Promotion",
    "Rare & Legendary", // 30
    "Your Heroes",
    "Common & Rare",
    "Legendary & Ascended",
    "Super Legendary",
    "Random Promotion 5", // 35
    "Super Ascended",
    "Random 6 Promotion",
    "Super Rare",
);


$EFOL=array("30k","600k","9M","Rnd[100k-1M]","Rnd[10M-20M]","Rnd[80M-120M]","Rnd[50k-1.5M]","Rnd[5M-25M]","Rnd[50M-125M]","Rnd[30k,9M]","Rnd[30k,10B]","Rnd[5M,70M]","Rnd[50M,600M]","Adaptative","Low","Mid","High");
$SDATA = array(
    // Season 1
    array(
        "MODE"=>array(0,1),
        "HERO"=>array(0,1,2,3,4),
        "FOL"=>array(0,1,2)
    ),
    // Season 2
    array(
        "MODE"=>array(0,2),
        "HERO"=>array(5,1,2,6,7),
        "FOL"=>array(3,4,5)
    ),
    // Season 3
    array(
        "MODE"=>array(2,3),
        "HERO"=>array(8,1,2,6,7),
        "FOL"=>array(3,4,5)
    ),
    // season 4
    array(
        "MODE"=>array(2,3),
        "HERO"=>array(1,9,10,11,12,13,14,15,6,16,17),
        "FOL"=>array(6,7,8)
    ),
    array(
        "MODE"=>array(2,4,5),
        "HERO"=>array(11,1,19,22,16,18,23,14,21,20),
        "FOL"=>array(9,10,11,12,12)
    ),
    array(
        "MODE"=>array(2,6,5),
        "HERO"=>array(1,11,19,16,8,18,14,20,2,23),
        "FOL"=>array(13)
    ),
    array(
        "MODE"=>array(2,7,5,1),
        "HERO"=>array(11,20,26,14,1,27,16,19,24,2,18,25,28),
        "FOL"=>array(13)
    ),array(
        "MODE"=>array(6,7,8),
        "HERO"=>array(11,
        20,
        14,
        1,
        29,
        16,
        19,
        18,
        2,
        8,
        28),
        "FOL"=>array(13)
    ),array(
        "MODE"=>array(9,5,8),
        "HERO"=>array(
            11,
            30,
            31,
            32,
            33,
            14,
            34,
            35,
            16,
            36,
            1
        ),
        "FOL"=>array(14,15,16)
    ),array(
        "MODE"=>array(9,5,10),
        "HERO"=>array(
            11,
            30,
            31,
            32,
            33,
            14,
            34,
            35,
            16,
            36,
            1
        ),
        "FOL"=>array(14,15,16)
    ),array(
        "MODE"=>array(9,5,10),
        "HERO"=>array(
            31,
            1,
            36,
            16,
            37,
            11,
            8,
            1,
            14,
            4,
            38
        ),
        "FOL"=>array(14,15,16)
    )
);


function tid2season($tid) {
    if ($tid<17415) return 0;
    else if ($tid<17456) return 1;
    else if ($tid<17499)return 2;
    else if ($tid<=17555) return 3;
    else if ($tid<=17654) return 4;
    else if ($tid<=17825) return 5;
    else if ($tid<=17928) return 6;
    else if ($tid<=18039) return 7;
    else if ($tid<=18170) return 8;
    else if ($tid<=18373) return 9;
    else return 10;
}

function tid2mode($tid) {
    global $SDATA;
    $season = tid2season($tid);
    return $SDATA[$season]["MODE"][$tid%count($SDATA[$season]["MODE"])];
}

function tid2hero($tid) {
    global $SDATA;
    $season = tid2season($tid);
    return $SDATA[$season]["HERO"][$tid%count($SDATA[$season]["HERO"])];
}

function tid2followers($tid) {
    global $SDATA;
    $season = tid2season($tid);
    return $SDATA[$season]["FOL"][$tid%count($SDATA[$season]["FOL"])];
}



function doRarity($r) {
    if ($r==0) return "Common";
    else if ($r==1) return "Rare";
    else if ($r==2) return "Legendary";
    else if ($r==3) return "Ascended";
    else if ($r==5) return "World Boss";
    else return $r;
}

function doType($t) {
    $ELEM = array("Air","Earth","Fire","Water","Void");
    return $ELEM[$t];
}

function doUnit($uid) {
    global $HERO,$MONSTERS;
    $ELEM = array("air","earth","fire","water","void");
    $PEANA = array("peana0","peana1","peana2","peana3");
    $html='<span style="display:none">'.$uid.'</span>';
    if ($uid>=0) {
        $style='width:75px;
        border: 10px solid transparent;
        background: url(img/'.$ELEM[$MONSTERS[$uid]["type"]].'.png), url(img/peana.png);
        background-size: 85px 85px, 85px 85px;
        background-repeat: no-repeat, no-repeat;
        background-position: -5px 0px, -5px 0px;';
        $html.='<img src="img/'.$MONSTERS[$uid]["img"].'.png" 
            style="'.$style.'"
            title="'.$MONSTERS[$uid]["name"].'" alt="'.$MONSTERS[$uid]["name"].'">';
    } else if ($uid<-1 and -(2+$uid)<count($HERO)) {
        $ELEM = array("air","earth","fire","water","void");
        $style='width:75px;
        border: 15px solid transparent;
        background: url(img/'.$ELEM[$HERO[-(2+$uid)]["type"]].'.png), url(img/'.$PEANA[$HERO[-(2+$uid)]["rarity"]].'.png);
        background-size: 85px 85px, 85px 85px;
        background-repeat: no-repeat, no-repeat;
        background-position: -5px 5px, -5px 5px;';
        $html.='<img src="img/'.$HERO[-(2+$uid)]["img"].'.png" 
        style="'.$style.'"
        title="'.$HERO[-(2+$uid)]["name"].'" alt="'.$HERO[-(2+$uid)]["name"].'">';
    } else {
        $html.="Empty";
    }
    return $html;
}

function doSelect($name,$key,$arr,$selected=-1) {
    $html=$name.': <select id="'.$key.'" onchange="update();">
        <option value="-1"'.($selected==-1?" selected":"").'>Any</option>';
    foreach ($arr as $id=>$name) {
        $html.='<option value="'.$id.'"'.($selected==$id?" selected":"").'>'.$name.'</option>';
    }
    $html.="</select>";
    return $html;
}

function wbName($id,$isSuper=false) {
    global $HERO;
    if ($isSuper) return "SUPER ".$HERO[$id]["name"];
    return $HERO[$id]["name"];
}

function wbHitsRequired($wbId, $isSuper=false) {
    global $sql;
	$res = $sql->query("SELECT bid, COUNT(DISTINCT uid) AS p FROM WBD WHERE bid < $wbId GROUP BY bid ORDER BY bid DESC LIMIT 20");
	$avg = 0;
	while ($row=$res->fetch_assoc()) {
		$avg += $row["p"];
	}
	$avg = ceil($avg/20);
	return $avg * ($isSuper ? 2 : 3);
}

function wbRewardModifier($wbId) {
	return ($wbId > 1282 ? wbHitsRequired($wbId) / 1600 : 1);
}

function wbHp($lvl,$mode) {
    $base=10000000;
    if ($mode==0) {
        $base=1800000;
    } else if ($mode==1) {
        $base=15000000;
    }
    return intval(pow(1.02,$lvl-1)*$base);
}
function wbReward($level,$id) {
    if ($id<21) return round(((4000-($level-1))*pow(1.02,$level-1)));
    else return round(((8000-($level-1))*pow(1.02,$level-1)));
}
function calcReward($dmg,$total,$totalsq,$id,$mode,$level) {
    $reward = wbReward($level,$id);
    if ($id<21) return round((sqrt($dmg)/$totalsq)*$reward);
    else if ($mode==0) return round(($dmg/$total)*$reward);
    else return round((sqrt($dmg)/$totalsq)*$reward);
}

function pos2perc($pos,$total) {
    $padding = 1; // 0 beneficiates top 1 greater than 0 punished top 1
    $k = 0.3; // smaller than 1 more equal rewards greater than 2 less equal rewards

    // no touch
    $sum = 0;

    for ($i=1; $i<=$total; ++$i) {
        $sum+=1/($i*$k+$padding);
    }  
    return 1/($pos*$k+$padding)/$sum;
}
function pos2perc2($pos,$total) {
    $padding = 2; // 0 beneficiates top 1 greater than 0 punished top 1
    $k = 0.1; // smaller than 1 more equal rewards greater than 2 less equal rewards

    // no touch
    $sum = 0;

    for ($i=1; $i<=$total; ++$i) {
        $sum+=1/($i*$k+$padding);
    }  
    return 1/($pos*$k+$padding)/$sum;
}

$names = [
		"ladymaligryn","antoinette","marionette","esmeralda","reaper","vermin","rumble","stench","arathon","sylnir","raelan","jalrok","sagittaria","will","merida","sully",
		"john","valentina","alan","yuri","ignis","caeli","silex","pluvia","hetfield","lars","kirklee","rob","kingpyros","youngpyros","babypyros","egg","kilkenny","annie",
		"mechamary","hans","yetithepostman","galla","yisus","adam","emily","adrian","casper","higgs","boson","electra","newt","retia","myrmillo","scinda","thrace","bornag",
		"lili","achocoknight","chocoknight","sharkjellyn","mrcotton","smith","acrei","crei","catzar","cathos","tetra","awanderer","minerva","helga","ophelia","agatha",
		"anerissa","mother","nerissa","murphy","bortles", "thumper", "daisy", "gizmo", "willow", "adybbuk", "aedana", "ajade", "amahatma",
		"spike", "riptide", "ember", "cloud", "b-day", "thewanderer", "maunder", "transient", "cupid", "aurora", "orin", "flint", "blossom",
		"aseethe", "seethe", "ruin", "raze", "kedari", "5-12-6", "fir", "frosty", "maraudermagnus", "corsaircharles", "buccaneerbeatrice", "raiderrose",
		"adefile", "guy", "cliodhna", "sanqueen", "billy", "doyenne", "ahattori", "ahirate", "atakeda", "ahosokawa",
		"aneptunius", "alordkirk", "athert", "ashygu", "dybbuk", "edana", "jade", "mahatma", "neil", "defile", "putrid", "taint",
		"pokerface", "luxurious", "dicemaster", "kryton", "hidoka", "liucheng", "kumu-san", "masterlee", "hawking", "abavah",
		"flynn", "leaf", "sparks", "leprechaun", "bavah", "boor", "bylar", "adagda", "hattori", "hirate", "takeda", "hosokawa", "moak", "arigr", "dorth",
		"rua", "arshen", "aatzar", "apontus", "bubbles", "dagda", "ganah", "toth", "sexysanta", "santaclaus", "reindeer", "christmaself", "lordofchaos", "ageror",
		"ageum", "atr0n1x", "aauri", "arei", "aathos", "aalpha", "rigr", "hallinskidi", "hama", "alvitr", "koldis", "sigrun", "neptunius", "lordkirk", "thert", "shygu",
		"ladyodelith", "dullahan", "jackoknight", "werewolf", "gurth", "koth", "zeth", "atzar", "xarth", "oymos", "gaiabyte", "aoyuki", "spyke", "zaytus", "petry",
		"chroma", "pontus", "erebus", "ourea", "groth", "brynhildr", "veildur", "geror", "aural", "rudean", "undine", "ignitor", "forestdruid", "geum", "aeris",
		"aquortis", "tronix", "taurus", "kairy", "james", "nicte", "auri", "faefyr", "ailen", "rei", "geron", "jet", "athos", "nimue", "carl", "alpha", "shaman",
		"hunter", "bewat", "pyromancer", "rokka", "valor", "nebra", "tiny", "ladyoftwilight", "",
		"A1", "E1", "F1", "W1", "A2", "E2", "F2", "W2", "A3", "E3", "F3", "W3", "A4", "E4", "F4", "W4", "A5", "E5", "F5", "W5", "A6", "E6", "F6", "W6",
		"A7", "E7", "F7", "W7", "A8", "E8", "F8", "W8", "A9", "E9", "F9", "W9", "A10", "E10", "F10", "W10", "A11", "E11", "F11", "W11", "A12", "E12", "F12", "W12",
		"A13", "E13", "F13", "W13", "A14", "E14", "F14", "W14", "A15", "E15", "F15", "W15", "A16", "E16", "F16", "W16", "A17", "E17", "F17", "W17", "A18", "E18", "F18", "W18",
		"A19", "E19", "F19", "W19", "A20", "E20", "F20", "W20", "A21", "E21", "F21", "W21", "A22", "E22", "F22", "W22", "A23", "E23", "F23", "W23", "A24", "E24", "F24", "W24",
		"A25" ,"E25", "F25", "W25", "A26", "E26", "F26", "W26", "A27", "E27", "F27", "W27", "A28", "E28", "F28", "W28", "A29", "E29", "F29", "W29", "A30", "E30", "F30", "W30",
		"A31", "E31", "F31", "W31", "A32", "E32", "F32", "W32", "A33", "E33", "F33", "W33", "A34", "E34", "F34", "W34", "A35", "E35", "F35", "W35", "A36", "E36", "F36", "W36",
		"A37", "E37", "F37", "W37", "A38", "E38", "F38", "W38", "A39", "E39", "F39", "W39", "A40", "E40", "F40", "W40", "A41", "E41", "F41", "W41", "A42", "E42", "F42", "W42",
		"A43", "E43", "F43", "W43", "A44", "E44", "F44", "W44", "A45", "E45", "F45", "W45"];
$aliases = ['ladyoftwilight'=>'lot','pyromancer'=>'pyro','forestdruid'=>'fdruid','werewolf'=>'ww','jackoknight'=>'jack','ladyodelith'=>'odelith',
		'lordkirk'=>'kirk','neptunius'=>'nep','hosokawa'=>'hoso','hallinskidi'=>'hall','christmaself'=>'elf','leprechaun'=>'lep',
		'dicemaster'=>'dice','luxuriusmaximus'=>'lux','pokerface'=>'poker','alordkirk'=>'akirk','aneptunius'=>'anep','ahosokawa'=>'ahoso',
		'cliodhna'=>'clio','buccaneerbeatrice'=>'beatrice','corsaircharles'=>'charles','maraudermagnus'=>'magnus','raiderrose'=>'rose','5-12-6'=>'melf',
		'thewanderer'=>'wanderer','b-day'=>'bday','masterlee'=>'lee','sharkjellyn'=>'shark','chocoknight'=>'choco','achocoknight'=>'achoco','yetithepostman'=>'yeti',
		'babypyros'=>'bpyros','youngpyros'=>'ypyros','kingpyros'=>'kpyros','kirklee'=>'kyle',
		'lordofchaos'=>'loc','motherofallkodamas'=>'moak','lord of chaos'=>'loc','mother of all kodamas'=>'moak','super lord of chaos'=>'super loc',
		'super mother of all kodamas'=>'super moak','super kryton'=>'super kryton','super doyenne'=>'super doyenne','super bornag'=>'super bornag'];
$baseIndex = array_search('ladyoftwilight', $names) + 2;

function getAlias($u) {
	global $aliases;
	$u = strtolower(str_replace("SUPER: ", "super ", $u));
	$u2 = explode(":", $u);
	return (array_key_exists($u2[0], $aliases) ? $aliases[$u2[0]] : $u2[0]).(count($u2) > 1 ? ":".$u2[1] : "");
}

function getAliasFromCode($u) {
	global $names, $baseIndex;
	$unit = $names[$u + $baseIndex];
	return getAlias($unit);
}

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

function bint($num, $mode = 0) {
	$prefixes = [[" k"," M"," G"," T"," P"],[" k"," M"," B"," T"," Q"],[" k"," Mn"," Md"," Bn"," Bd"]];
	if ($num>=1e17) {
		if ($num>=1e18) return floor($num/1e15).$prefixes[$mode][4];
		else return round($num/1e15, 2).$prefixes[mode][4];
	} else if ($num>=1e14) {
		if ($num>=1e15) return floor($num/1e12).$prefixes[$mode][3];
		else return round($num/1e12, 2).$prefixes[mode][3];
	} else if ($num>=1e11) {
		if ($num>=1e12) return floor($num/1e9).$prefixes[$mode][2];
		else return round($num/1e9, 2).$prefixes[mode][2];
	} else if ($num>=1e8) {
		if ($num>=1e9) return floor($num/1e6).$prefixes[$mode][1];
		else return round($num/1e6, 2).$prefixes[mode][1];
	} else if ($num>=1e5) {
		if ($num>=1e6) return floor($num/1e3).$prefixes[$mode][0];
		else return round($num/1e3, 2).$prefixes[mode][0];
	} else {
		return $num;
	}
}
?>

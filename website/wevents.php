<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Weekly Events");
doMenu("wevents.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
function ts2wid($ts) {
    return ceil((($ts/(24*60*60))-18379)/7)-1;
}
function wid2begin($wid) {
    return date("Y/m/d 00:00",(($wid*7)+18379)*(24*60*60));
}
function wid2end($wid) {
    return date("Y/m/d 23:59",(($wid*7)+18385)*(24*60*60));
}
$content='';
$path = "events/";
$events = [null,"games",null,"sj",null,null];
$names = ["UNKNOWN","G.A.M.E.S.","UNKNOWN","Space Journey","UNKNOWN","UNKNOWN"];
if (isset($_GET["id"]) and ctype_digit($_GET["id"])) {
    $cid=$sql->real_escape_string($_GET["id"]);
    if (($cid%6)==3) {
        $possible = scandir($path.$events[$_GET["id"]%count($events)]);
        $desired = wid2end($_GET["id"]);
        $dy = substr($desired,0,4);
        $dm = substr($desired,5,2);
        $dd = substr($desired,8,2);
        $dt = mktime(0,0,0,$dm,$dd,$dy);
        $best = null;
        $bestt = null;
        foreach ($possible as $p) {
            if ($p!="." and $p!="..") {
                $y=substr($p,0,4);
                $m=substr($p,4,2);
                $d=substr($p,6,2);
                $diff = abs(mktime(0,0,0,$m,$d,$y)-$dt);
                if ($best===null or $bestt>$diff) {
                    $best = $p;
                    $bestt = $diff;
                }
            }
        }
        $fpath = $path.$events[$_GET["id"]%count($events)]."/".$best;
        if (file_exists($fpath)) {
            $players = explode("\n",file_get_contents($fpath));
            $p=[];
            $pids = [];
            foreach ($players as $player) {
                $pdata = json_decode($player,true);
                $pids[]=$pdata["PlayerId"];
                $p[]=$pdata;
            }
            $pidlist = "'".implode("','",$pids)."'";
            $res = $sql->query("SELECT id,pid,`name`,public FROM users WHERE pid IN ($pidlist)");
            $content.='<h3>Space Journey '.$cid.'<h3><h3>Participants: '.count($players).'</h3>
                <table class="pure-table pure-table-striped center">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Reward ID</th>
                    </tr>
                </thead>

                <tbody>
            ';
            $piddata = [];
            while ($row=$res->fetch_array()) {
                $piddata[$row["pid"]]=$row;
            }
            $pool = [
                "Ascension Spheres: 450\nPrana Gems: 200\nCosmic Coins: 450\nUniverse Marbles: 1000\nJohn: 36 Levels\nValentina: 36 Levels\nAlan: 36 Levels\nYuri: 36 Levels",
                "Ascension Spheres: 325\nPrana Gems: 150\nCosmic Coins: 325\nUniverse Marbles: 750\nJohn: 27 Levels\nValentina: 27 Levels\nAlan: 27 Levels\nYuri: 27 Levels",
                "Ascension Spheres: 240\nPrana Gems: 110\nCosmic Coins: 240\nUniverse Marbles: 500\nJohn: 18 Levels\nValentina: 18 Levels\nAlan: 18 Levels\nYuri: 18 Levels",
                "Ascension Spheres: 170\nPrana Gems: 80\nCosmic Coins: 170\nUniverse Marbles: 250\nJohn: 9 Levels\nValentina: 9 Levels\nAlan: 9 Levels\nYuri: 9 Levels",
                "Ascension Spheres: 120\nPrana Gems: 60\nCosmic Coins: 120\nUniverse Marbles: 200\nValentina: 9 Levels\nAlan: 9 Levels\nYuri: 9 Levels",
                "Ascension Spheres: 80\nPrana Gems: 40\nCosmic Coins: 80\nUniverse Marbles: 150\nValentina: 9 Levels\nAlan: 9 Levels\nYuri: 9 Levels",
                "Ascension Spheres: 50\nPrana Gems: 28\nCosmic Coins: 50\nUniverse Marbles: 100\nAlan: 9 Levels\nYuri: 9 Levels",
                "Ascension Spheres: 20\nPrana Gems: 18\nCosmic Coins: 20\nUniverse Marbles: 50\nAlan: 9 Levels\nYuri: 9 Levels",
                "Ascension Spheres: 10\nPrana Gems: 10\nCosmic Coins: 10\nUniverse Marbles: 20\nYuri: 9 Levels"
            ];
            $pid=0;
            $pl = [0,1,2,9,24,49,99,499,999999];
            for ($i=0; $i<count($p);) {
                $waypoint = $p[min(count($p)-1,$pl[$pid])]["Value"];
                while ($i<count($p) and $p[$i]["Value"]>=$waypoint) {
                    $p[$i]["pool"]=$pid;
                    ++$i;
                }
                ++$pid;
            }
            $results=[];
            foreach ($p as $pos=>$player) {
                $row=$piddata[$player["PlayerId"]];
                $cells=array();
                $cells[] = $pos+1;
                $name=$row["id"];
                if ($row["public"]) $name=$row["name"];
                $cells[]='<a href="user.php?id='.$row["id"].'">'.$name.'</a>';
                $cells[]=$player["Value"];
                if ($player["Value"]>0) $cells[]='<span title="'.htmlspecialchars($pool[$player["pool"]]).'">'.($player["pool"]+1)."</span>";
                else $cells[]="-";
                $results[]='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
            }
            $content.=implode("",$results)."</tbody></table>";
        } else {
            $content .= "<h2>No Data Yet</h2>";
        }
    } else if (($cid%6)==1) {
        $possible = scandir($path.$events[$_GET["id"]%count($events)]);
        $desired = wid2end($_GET["id"]);
        $dy = substr($desired,0,4);
        $dm = substr($desired,5,2);
        $dd = substr($desired,8,2);
        $dt = mktime(0,0,0,$dm,$dd,$dy);
        $best = null;
        $bestt = null;
        foreach ($possible as $p) {
            if ($p!="." and $p!="..") {
                $y=substr($p,0,4);
                $m=substr($p,4,2);
                $d=substr($p,6,2);
                $diff = abs(mktime(0,0,0,$m,$d,$y)-$dt);
                if ($best===null or $bestt>$diff) {
                    $best = $p;
                    $bestt = $diff;
                }
            }
        }
        $fpath = $path.$events[$_GET["id"]%count($events)]."/".$best;
        if (file_exists($fpath)) {
            $players = explode("\n",file_get_contents($fpath));
            $p=[];
            $pids = [];
            foreach ($players as $player) {
                $pdata = json_decode($player,true);
                $pids[]=$pdata["PlayerId"];
                $p[]=$pdata;
            }
            $pidlist = "'".implode("','",$pids)."'";
            $res = $sql->query("SELECT id,pid,`name`,public FROM users WHERE pid IN ($pidlist)");
            $content.='<h3>G.A.M.E.S '.$cid.'<h3><h3>Participants: '.count($players).'</h3>
                <table class="pure-table pure-table-striped center">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Reward ID</th>
                    </tr>
                </thead>

                <tbody>
            ';
            $piddata = [];
            while ($row=$res->fetch_array()) {
                $piddata[$row["pid"]]=$row;
            }
            $pool = [
                "Ascension Spheres: 750\nPrana Gems: 400\nCosmic Coins: 750\nUniverse Marbles: 2500\nSagittaria: 36 Levels\nWill: 36 Levels\nMerida: 36 Levels\nSully: 36 Levels",
                "Ascension Spheres: 500\nPrana Gems: 250\nCosmic Coins: 500\nUniverse Marbles: 1500\nSagittaria: 27 Levels\nWill: 27 Levels\nMerida: 27 Levels\nSully: 27 Levels",
                "Ascension Spheres: 250\nPrana Gems: 150\nCosmic Coins: 250\nUniverse Marbles: 1000\nSagittaria: 18 Levels\nWill: 18 Levels\nMerida: 18 Levels\nSully: 18 Levels",
                "Ascension Spheres: 150\nPrana Gems: 100\nCosmic Coins: 170\nUniverse Marbles: 750\nSagittaria: 15 Levels\nWill: 15 Levels\nMerida: 15 Levels\nSully: 15 Levels",
                "Ascension Spheres: 100\nPrana Gems: 75\nCosmic Coins: 120\nUniverse Marbles: 500\nSagittaria: 12 Levels\nWill: 12 Levels\nMerida: 12 Levels\nSully: 12 Levels",
                "Ascension Spheres: 50\nPrana Gems: 50\nCosmic Coins: 50\nUniverse Marbles: 300\nSagittaria: 9 Levels\nWill: 9 Levels\nMerida: 9 Levels\nSully: 9 Levels",
                "Ascension Spheres: 35\nPrana Gems: 35\nCosmic Coins: 35\nUniverse Marbles: 200\nSagittaria: 6 Levels\nWill: 6 Levels\nMerida: 6 Levels\nSully: 6 Levels",
                "Ascension Spheres: 20\nPrana Gems: 20\nCosmic Coins: 20\nUniverse Marbles: 100\nSagittaria: 3 Levels\nWill: 3 Levels\nMerida: 3 Levels\nSully: 3 Levels",
                "Ascension Spheres: 10\nPrana Gems: 10\nCosmic Coins: 10\nUniverse Marbles: 50\nSagittaria: 1 Levels\nWill: 1 Levels\nMerida: 1 Levels\nSully: 1 Levels"
              ];
            $pid=0;
            $pl = [0,1,2,9,24,49,99,499,999999];
            for ($i=0; $i<count($p);) {
                $waypoint = $p[min(count($p)-1,$pl[$pid])]["Value"];
                while ($i<count($p) and $p[$i]["Value"]>=$waypoint) {
                    $p[$i]["pool"]=$pid;
                    ++$i;
                }
                ++$pid;
            }
            $results=[];
            foreach ($p as $pos=>$player) {
                $row=$piddata[$player["PlayerId"]];
                $cells=array();
                $cells[] = $pos+1;
                $name=$row["id"];
                if ($row["public"]) $name=$row["name"];
                $cells[]='<a href="user.php?id='.$row["id"].'">'.$name.'</a>';
                $cells[]=$player["Value"];
                if ($player["Value"]>0) $cells[]='<span title="'.htmlspecialchars($pool[$player["pool"]]).'">'.($player["pool"]+1)."</span>";
                else $cells[]="-";
                $results[]='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
            }
            $content.=implode("",$results)."</tbody></table>";
        } else {
            $content .= "<h2>No Data Yet</h2>";
        }
    } else {
        $content .= "<h2>No Data Yet</h2>";
    }
} else {
    $res = $sql->query("SELECT id,`end` FROM events WHERE `type`=0 ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Event</th>
            </tr>
        </thead>

        <tbody>
    ';
    echo ts2wid(time());
    for ($i=3; $i<=ts2wid(time()); ++$i) {
        $cells=array();
        if (ts2wid(time())>$i) $cells[]='<a href="wevents.php?id='.$i.'">'.$i.'</a>';
        else $cells[]=$i;
        $cells[]=wid2begin($i);
        $cells[]=wid2end($i);
        $cells[]=$names[$i%count($names)];
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $content.='</tbody></table>';

    /*$content.='<div class="pages">';
    if ($page>0) $content.='<a href="lottery.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="lottery.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="lottery.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="lottery.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="lottery.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';*/
}
doContent($content,"Weekly Events");
doFooter();
?>

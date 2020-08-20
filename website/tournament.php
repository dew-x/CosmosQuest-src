<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Tournaments");
doMenu("tournament.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}

$content='';
if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $m="P";
    if (isset($_GET["m"])) $m=$_GET["m"];
    $cid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT id,status,UNIX_TIMESTAMP(`date`) as ts,tid,amount FROM tournaments WHERE id = $cid");
    $content='<div class="cqform">
    View:
    <input type="radio" id="filter1"
     name="filter" value="resulttbl" onchange="document.getElementById(\'resulttbl\').style.display=\'table\';document.getElementById(\'winratiotbl\').style.display=\'none\';"'.($m=="W"?"":" checked").'>
    <label for="filter1">Results</label>
    
    <input type="radio" id="filter2"
     name="filter" value="winratiotbl" onchange="document.getElementById(\'resulttbl\').style.display=\'none\';document.getElementById(\'winratiotbl\').style.display=\'table\';"'.($m=="W"?" checked":"").'>
    <label for="filter2">Win Ratio</label>
    </div><br>';
    if ($row=$res->fetch_assoc()) {
        $mode=doTournament($row["tid"]);
        if ($mode=="Swiss") {
            $content.='
                <table id="resulttbl" class="pure-table pure-table-striped center" style="display:'.($m=="W"?"none":"table").'">
                <thead>
                    <tr>
                        <th>TOP</th>
                        <th>Round</th>
                        <th>Player</th>
                        <th>Prana Gems</th>
                        <th>Universe Marbles</th>
                    </tr>
                </thead>
                <tbody>
            ';
        } else {
            $content.='
                <table id="resulttbl" class="pure-table pure-table-striped center" style="display:'.($m=="W"?"none":"table").'">
                <thead>
                    <tr>
                        <th>TOP</th>
                        <th>Player</th>
                        <th>Prana Gems</th>
                        <th>Star Dust</th>
                    </tr>
                </thead>
                <tbody>
            ';
        }
        $content1='<table id="winratiotbl" class="pure-table pure-table-striped center" style="display:'.($m=="W"?"table":"none").'">
        <thead>
            <tr>
                <th>TOP</th>
                <th>Player</th>
                <th>W-D-L</th>
                <th>Win %</th>
            </tr>
        </thead>
        <tbody>';
        $res->free();
        $res1 = $sql->query("SELECT u.id,u.name,u.public,p.pos,p.wins,p.draw,p.loss,p.wr,p.wrpos FROM positions p, users u WHERE p.tid = $cid AND p.uid = u.id ORDER BY p.pos ASC");
        $wrp=array();
        while ($row1=$res1->fetch_assoc()) {
            // content
            $cells=array();
            $cells[]=number_format($row1["pos"],0,",",".");
            if ($mode=="Swiss") $cells[]=doRound($row1["pos"],$row["amount"]);
            $name=$row1["id"];
            if ($row1["public"]) $name=$row1["name"];
            $cells[]='<a href="user.php?id='.$row1["id"].'">'.$name.'</a>';
            $cells[]=number_format(getPG($cid,$row1["pos"]),0,",",".").'<img src="img/pg.png" class="pure-img">';
            if ($cid>=308) $cells[]=number_format(doReward2($row1["pos"],$row["amount"],doCost($row["tid"])),0,",",".").'<img src="img/sd.png" class="pure-img">';
            else $cells[]=number_format(doReward($row1["pos"],$row["amount"],doCost($row["tid"])),0,",",".").'<img src="img/um.png" class="pure-img">';
            $content.='<tr id="P'.$row1["pos"].'"><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
            // content1
            $wrp[$row1["wrpos"]]=$row1;
        }
        ksort($wrp);
        foreach ($wrp as $pos=>$row1) {
            $name=$row1["id"];
            if ($row1["public"]) $name=$row1["name"];
            $cells1=array();
            $cells1[]=number_format($row1["wrpos"],0,",",".");
            $cells1[]='<a href="user.php?id='.$row1["id"].'">'.$name.'</a>';
            $cells1[]=$row1["wins"].'-'.$row1["draw"].'-'.$row1["loss"];
            $cells1[]=sprintf("%.02f",$row1["wr"]*100);
            $content1.='<tr id="W'.$row1["wrpos"].'"><td class="big">'.implode('</td><td class="small">',$cells1).'</td></tr>';
        }
        $res1->free();
    }
    $content1.='</tbody></table>';
    $content.='</tbody></table>'.$content1;
} else {
    $res = $sql->query("SELECT id,status,UNIX_TIMESTAMP(`date`) as ts,tid,amount FROM tournaments ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Tournament</th>
                <th>Hero</th>
                <th>Followers</th>
                <th>Prize pool</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="tournament.php?id='.$row["id"].'">'.$row["id"].'</a>';
        $cells[]=date("Y/m/d",$row["ts"]);
        $cells[]=doStatus($row["status"]);
        $cells[]=doTournament($row["tid"]);
        $cells[]=doHero($row["tid"]);
        $cells[]=doFollowers($row["tid"]);
        $pp=(doCost($row["tid"])*$row["amount"]*0.7);
        if ($row["amount"]==0) {
            $res1 = $sql->query("SELECT COUNT(*) FROM setups WHERE tid=".$row["id"]);
            if ($row1=$res1->fetch_array()) {
                $pp=(doCost($row["tid"])*$row1[0]*0.7);
            }
            $res1->free();
        }
        if ($row["tid"]<=17654) $cells[]=number_format(round($pp,min(0,2-strlen($pp))),0,",",".").'<img src="img/um.png" class="pure-img">';
        else $cells[]=number_format(round(($pp/0.7)*1000),0,",",".").'<img src="img/sd.png" class="pure-img">';
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM tournaments");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="tournament.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="tournament.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="tournament.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="tournament.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="tournament.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Tournaments");
doFooter();
?>

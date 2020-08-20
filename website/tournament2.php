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

function rperc($i,$t,$p) {
    $total = (1.0-pow(1.0+(1.0/$t),$t))/(-(1.0/$t));
    $curr = pow(1.0+(1.0/$t),$t-$i);
    $prize = $p*$curr/$total;
    return round($prize);
}

function getPrize($pos,$total) {
    $ASPERC = 2.0; 
    $PGPERC = 20.0;
    $ASperENTRY = 1.5;
    $PGperENTRY = 2.5;
    $CCperENTRY = 10.0;

    $ASPOOL = $ASperENTRY*$total;
    $PGPOOL = $PGperENTRY*$total;
    $CCPOOL = $CCperENTRY*$total;

    $ASindex = round($ASPERC/100.0*$total);
    $PGindex = round(($PGPERC+$ASPERC)/100.0*$total);
    $CCplayers = $total - $PGindex;
    $ASplayers = $ASindex;
    $PGplayers = $PGindex-$ASindex;
    if ($pos<=$ASplayers) return '{"AS":'.rperc($pos,$ASplayers,$ASPOOL).'}';
    else if ($pos<=$PGplayers) return '{"PG":'.rperc($pos-$ASplayers,$PGplayers,$PGPOOL).'}';
    else return '{"CC":'.rperc($pos-$PGplayers,$CCplayers,$CCPOOL).'}';
}

function get2AS($pos,$total) {
    $res = json_decode(getPrize($pos,$total),true);
    if (isset($res["AS"])) return $res["AS"];
    else return 0;
}
function get2PG($pos,$total) {
    $res = json_decode(getPrize($pos,$total),true);
    if (isset($res["PG"])) return $res["PG"];
    else return 0;
}
function get2CC($pos,$total) {
    $res = json_decode(getPrize($pos,$total),true);
    if (isset($res["CC"])) return $res["CC"];
    else return 0;
}
$content='';
if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $cid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT id,status,tid FROM tournaments2 WHERE id = $cid");
    $content='<br>';
    if ($row=$res->fetch_assoc()) {
        $content.='
            <table id="resulttbl" class="pure-table pure-table-striped center">
            <thead>
                <tr>
                    <th>TOP</th>
                    <th>Player</th>
                    <th>Ascension Spheres</th>
                    <th>Prana Gems</th>
                    <th>Cosmic Coins</th>
                </tr>
            </thead>
            <tbody>
        ';
        $res->free();
        $res1 = $sql->query("SELECT u.id,u.name,u.public,p.pos FROM positions2 p, users u WHERE p.tid = $cid AND p.uid = u.id ORDER BY p.pos ASC");
        $wrp=array();
        while ($row1=$res1->fetch_assoc()) {
            // content
            $cells=array();
            $cells[]=number_format($row1["pos"],0,",",".");
            $name=$row1["id"];
            if ($row1["public"]) $name=$row1["name"];
            $cells[]='<a href="user.php?id='.$row1["id"].'">'.$name.'</a>';
            $cells[]=number_format(get2AS($row1["pos"],$res1->num_rows),0,",",".").'<img src="img/as.png" class="pure-img">';
            $cells[]=number_format(get2PG($row1["pos"],$res1->num_rows),0,",",".").'<img src="img/pg.png" class="pure-img">';
            $cells[]=number_format(get2CC($row1["pos"],$res1->num_rows),0,",",".").'<img src="img/cc.png" class="pure-img">';
            $content.='<tr id="P'.$row1["pos"].'"><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
        }
        $res1->free();
    }
    $content.='</tbody></table>';
} else {
    $res = $sql->query("SELECT id,`status`,tid,followers FROM tournaments2 WHERE `status`>0 ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Followers</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="tournament2.php?id='.$row["id"].'">'.$row["id"].'</a>';
        $cells[]=date("Y/m/d",$row["tid"]*24*60*60+12*60*60);
        $cells[]=doStatus($row["status"]);
        $cells[]=number_format($row["followers"],0,",",".");
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM tournaments2");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="tournament2.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="tournament2.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="tournament2.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="tournament2.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="tournament2.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Tournaments: Pro");
doFooter();
?>

<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Dungeon");
doMenu("dungeon.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$content='';

if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $cid=$sql->real_escape_string($_GET["id"]);
    $content='';

    $content.='
        <table id="resulttbl" class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>TOP</th>
                <th>Player</th>
                <th>Max Level</th>
                <th>Star Dust</th>
            </tr>
        </thead>
        <tbody>
    ';
    $res = $sql->query("SELECT d.level, u.name, u.public, u.id FROM users u, dungeon d WHERE d.eid = $cid AND u.id=d.uid ORDER BY d.level DESC");
    $pos=1;
    $pool=null;
    $amount=$res->num_rows;
    $cache = null;
    if (file_exists("duncache/".$cid.".json")) {
        $cache = json_decode(file_get_contents("duncache/".$cid.".json"),true);
    }
    while ($row=$res->fetch_assoc()) {
        // content
        if ($pool===null) $pool=$row["level"]*1000000;
        $prize="-";
        if ($cid==60)  $prize = round($pool*pos2perc2($pos,$amount));
        $cells=array();
        $cells[]=number_format($pos,0,",",".");
        $name=$row["id"];
        if ($row["public"]) $name=$row["name"];
        $cells[]='<a href="user.php?id='.$row["id"].'">'.$name.'</a>';
        $cells[]=number_format($row["level"],0,",",".");
        if ($cache==null) {
            $cells[]=$prize=="-"?$prize:number_format($prize,0,",",".");
        } else {
            $cells[]=number_format($cache[$pos-1]["prize"],0,",",".");
        }
        $content.='<tr id="P'.$pos.'"><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
        ++$pos;
    }
    $content.='</tbody></table>';
} else {
    $res = $sql->query("SELECT id,`end` FROM events WHERE `type`=3 ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="dungeon.php?id='.$row["id"].'">'.ceil($row["id"]/4).'</a>';
        $cells[]=date("Y/m/d",$row["end"]-12*60*60);
        $cells[]=$row["end"]<time()?"Finished":"Ongoing";
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM events WHERE `type`=3");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="dungeon.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="dungeon.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="dungeon.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="dungeon.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="dungeon.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Dungeon");
doFooter();
?>

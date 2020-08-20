<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - World Bosses");
doMenu("wb.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$content='';
if (isset($_GET["id"])and ctype_digit($_GET["id"])) {
    $bid=$sql->real_escape_string($_GET["id"]);
    $res1 = $sql->query("SELECT * FROM WB WHERE id=$bid LIMIT 1");
    if ($res1->num_rows==0) exit();
    $row1=$res1->fetch_assoc();
    $res = $sql->query("SELECT users.id,users.name,users.public,WBD.moment,SUM(WBD.damage) AS dmg,COUNT(*) as `times` FROM WBD,users WHERE WBD.bid=$bid AND users.id = WBD.uid GROUP BY WBD.uid ORDER BY dmg DESC,moment ASC");
    
    $data=array();
    $pos=1;
    $total=0;
    $totalsq=0;
    $cache=null;
    $val=1000;
    if ($bid>=338) $val=1200;
    else if ($bid>538) {
        $val=1700;
        if ($row1["mode"]%2==1) {
            if ($row1["mid"]==72) $val=950;
            else if ($row1["mid"]==87) $val=900;
            else if ($row1["mid"]==106) $val=750;
            else if ($row1["mid"]==126) $val=1700;
        }
    }
    if (file_exists("wbcache/".$bid.".json")) {
        $cache=json_decode(file_get_contents("wbcache/".$bid.".json"),true);
    }
    while ($row=$res->fetch_assoc()) {
        $data[]=array(
            $pos,
            $row["id"],
            $row["public"]?$row["name"]:$row["id"],
            $row["dmg"],
            $row["times"]
        );
        ++$pos;
        $total+=$row["dmg"];
        $totalsq+=sqrt($row["dmg"]);
    }
    $content='<table class="pure-table pure-table-striped center">
        <tr>
            <td>ID</td>
            <td>'.$bid.'</td>
        </tr>
        <tr>
            <td>Boss</td>
            <td>'.($row1["mode"]>1?"SUPER: ":"").$HERO[$row1["mid"]]["name"].'</td>
        </tr>
        <tr>
            <td>Level</td>
            <td>'.$row1["level"].'</td>
        </tr>
        <tr>
            <td>Mode</td>
            <td>'.($row1["mode"]%2==0?"No Heroes":"Anything").'</td>
        </tr>
        <tr>
            <td>Damage</td>
            <td>'.($row1["id"]<81?number_format(wbHp($row1["level"],$row1["mode"]%2),0,",","."):number_format($total,0,",",".")).'</td>
        </tr>
        <tr>
            <td>Reward</td>
            <td>'.($row1["id"]<81?number_format(wbReward($row1["level"],$row1["id"]),0,",","."):number_format(round(log($total)*($row1["mode"]%2==0?$val:750)*($row1["mode"]>1?2:1)),0,",",".")).'</td>
        </tr>
        <tr>
            <td>Status</td>
            <td>'.($row1["status"]==0?"Alive":($row1["status"]==1?"Pending":"Killed")).'</td>
        </tr>
        <tr>
            <td>DPS</td>
            <td>'.round($total/($row1["status"]<=1?(time()-$row1["spawn"]):($row1["killed"]-$row1["spawn"]))).'</td>
        </tr>
    </table>
    <br><br>
    <table class="pure-table pure-table-striped center">
    <thead>
        <tr>
            <th>TOP</th>
            <th>Player</th>
            <th>Damage</th>
            <th>Attacks</th>
            <th>Reward</th>
        </tr>
    </thead>
    <tbody>';
    
    foreach ($data as $info) {
        $cells=array();
        $cells[]=$info[0];
        $cells[]='<a href="user.php?id='.$info[1].'">'.$info[2].'</a>';
        $cells[]=number_format($info[3],0,",",".");
        $cells[]=$info[4];
        if ($row1["id"]<81) {
            $reward = calcReward($info[3],$total,$totalsq,$row1["id"],$row1["mode"],$row1["level"]);
            $cells[]=$row1["status"]==2?($reward+intval($info[0]>=count($data)-100)):"-";
        } else if ($row1["id"]==81) {
            $perc = pos2perc($info[0],$pos);
            $reward = round(log($total)*($row1["mode"]==0?$val:750));
            $cells[]=$row1["status"]==2?round(max($reward*$perc,1)):"-";
        } else if ($cache!=null) {
            $mul=$cache[$info[1]]["mul"];
            $prize=$cache[$info[1]]["prize"];
            $extra=isset($cache[$info[1]]["extra"])?$cache[$info[1]]["extra"]:0;
            if ($mul==1 and $extra==0) $cells[]=$row1["status"]==2?number_format($prize,0,",","."):"-";
            else if ($mul==1) $cells[]=$row1["status"]==2?number_format($prize,0,",",".").'+<span class="hl">'.number_format($extra,0,",",".").'</span>':"-";
            else $cells[]=$row1["status"]==2?number_format($prize,0,",",".").'+<span class="hl">'.number_format(round($prize*($mul-1)),0,",",".").'</span>':"-";
        } else {
            $perc = pos2perc2($info[0],$pos);
            $reward = round(log($total)*($row1["mode"]%2==0?$val:750)*($row1["mode"]>1?2:1));
            $cells[]=$row1["status"]==2?round(max($reward*$perc,1)):"-";
        }
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $res1->free();
    $content.='</tbody></table>';
} else {
    $res = $sql->query("SELECT id,spawn,mid,`level`,mode,`status` FROM WB ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Spawned</th>
                <th>Boss</th>
                <th>Level</th>
                <th>Mode</th>
                <th>Damage</th>
                <th>Reward</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="wb.php?id='.$row["id"].'">'.$row["id"].'</a>';
        $cells[]=date("Y/m/d H:i",$row["spawn"]);
        $cells[]=($row["mode"]>1?"SUPER: ":"").$HERO[$row["mid"]]["name"];
        $cells[]=$row["level"];
        $cells[]=$row["mode"]%2==0?"No Heroes":"Anything";
        if ($row["id"]<81) {
            $cells[]=number_format(wbHp($row["level"],$row["mode"]),0,",",".");
            $cells[]=number_format(wbReward($row["level"],$row["id"]),0,",",".");
        } else {
            //$cells[]=number_format($row["damage"],0,",",".");
            $cells[]="-";
            //$cells[]=number_format(round(log($row["damage"])*($row["mode"]==0?1000:750)),0,",",".");
            $cells[]="-";
        }
        $cells[]=$row["status"]==0?"Alive":($row["status"]==1?"Pending":"Killed");
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM WB");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="wb.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="wb.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="wb.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="wb.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="wb.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"World Bosses");
doFooter();
?>

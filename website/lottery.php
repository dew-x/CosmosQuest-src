<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Lottery");
doMenu("lottery.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$content='';
if (isset($_GET["id"]) and ctype_digit($_GET["id"])) {
    $cid=$sql->real_escape_string($_GET["id"]);
    $path = "lcache/lottery_".$cid.".log";
    if (file_exists($path)) {
        $data = json_decode(file_get_contents($path),true);
        $m = $data["random"]["max"];
        $res = $sql->query("SELECT u.name,u.id,u.public,l.num FROM lottery l, users u WHERE l.eid=$cid AND l.num IN (".implode(",",$data["random"]["data"]).") AND u.id = l.uid LIMIT 10");
        $content.='<h3>Lottery '.$cid.'<h3><h3>Participants: '.$m.'</h3>
            <table class="pure-table pure-table-striped center">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Ticket</th>
                    <th>Player</th>
                    <th>Prize</th>
                </tr>
            </thead>

            <tbody>
        ';
        $results = array();
        for ($i=0; $i<count($data["random"]["data"]); ++$i) $results[]="";
        while ($row=$res->fetch_array()) {
            $cells=array();
            $pos = array_search($row["num"],$data["random"]["data"]);
            $cells[] = $pos+1;
            $cells[]=$row["num"];
            $name=$row["id"];
            if ($row["public"]) $name=$row["name"];
            $cells[]='<a href="user.php?id='.$row["id"].'">'.$name.'</a>';
            if ($pos==0) $cells[]=round($m*0.4)." AS";
            else if ($pos==1) $cells[]=round($m*0.2)." AS";
            else if ($pos==2) $cells[]=round($m*0.1)." AS";
            else $cells[]=round($m*0.05)." AS";
            $results[$pos]='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
        }
        $content.=implode("",$results)."</tbody></table><br>";
        $content .= '<h3>You can verify the numbers at <a href="https://api.random.org/verify">https://api.random.org/verify</a></h3><h3>Random</h3><textarea align="center" style="color:black" rows="6" cols="80">'.json_encode($data["random"]).'</textarea><h3>Signature</h3><textarea align="center" style="color:black" rows="6" cols="80">'.$data["signature"]."</textarea><br>";
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
                <th>Date</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="lottery.php?id='.$row["id"].'">'.ceil($row["id"]/4).'</a>';
        $cells[]=date("Y/m/d",$row["end"]-12*60*60);
        $cells[]=$row["end"]<time()?"Finished":"Ongoing";
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM events WHERE `type`=0");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="lottery.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="lottery.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="lottery.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="lottery.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="lottery.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Lottery");
doFooter();
?>

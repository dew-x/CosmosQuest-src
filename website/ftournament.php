<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Flash Tournaments");
doMenu("ftournament.php");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$content='';
if (isset($_GET["id"])) {
    $cid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT id,`status`,UNIX_TIMESTAMP(`created`) as ts FROM ftournaments WHERE id = $cid");
    $content='';
    if ($row=$res->fetch_assoc()) {
        $content.='
            <table id="resulttbl" class="pure-table pure-table-striped center"">
            <thead>
                <tr>
                    <th>TOP</th>
                    <th>Player</th>
                    <th>Win Ratio</th>
                </tr>
            </thead>
            <tbody>
        ';
        $res->free();
        $res1 = $sql->query("SELECT u.id,u.name,u.public,p.position,p.wr FROM fsetups p, users u WHERE p.tid = $cid AND p.uid = u.id ORDER BY p.position ASC");
        $wrp=array();
        while ($row1=$res1->fetch_assoc()) {
            // content
            $cells=array();
            $cells[]=number_format($row1["position"],0,",",".");
            $name=$row1["id"];
            if ($row1["public"]) $name=$row1["name"];
            $cells[]='<a href="user.php?id='.$row1["id"].'">'.$name.'</a>';
            $cells[]=sprintf("%.02f %%",$row1["wr"]*100);
            $content.='<tr id="P'.$row1["position"].'"><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
            // content1
        }
    }
    $content.='</tbody></table>';
} else {
    $res = $sql->query("SELECT id,status,UNIX_TIMESTAMP(`created`) as ts FROM ftournaments ORDER BY id DESC LIMIT $offset,$_PAGE");
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
        $cells[]='<a href="ftournament.php?id='.$row["id"].'">'.$row["id"].'</a>';
        $cells[]=date("Y/m/d H:i:s",$row["ts"]);
        $cells[]=doStatus($row["status"]);
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM ftournaments");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="ftournament.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="ftournament.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="ftournament.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="ftournament.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="ftournament.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Flash Tournaments");
doFooter();
?>

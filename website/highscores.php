<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Highscores");
$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$res = $sql->query("SELECT id,name,public,score FROM users ORDER BY score DESC, id ASC LIMIT $offset,$_PAGE");
doMenu("highscores.php");
$content='
    <table class="pure-table pure-table-striped center">
    <thead>
        <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Points</th>
        </tr>
    </thead>

    <tbody>
';
$pos=0;
while ($row=$res->fetch_assoc()) {
    $name=$row["public"]?$row["name"]:$row["id"];
    $content.='<tr><td>'.number_format($offset+1+$pos,0,",",".").'</td><td><a href="user.php?id='.$row["id"].'">'.$name.'</a></td><td>'.number_format($row["score"],0,",",".").'</td></tr>';
    ++$pos;
}
$res->free();
$content.='</tbody></table>';
$res = $sql->query("SELECT COUNT(*) FROM users");
$pages=1;
if ($row=$res->fetch_array()) {
    $pages=ceil($row[0]/$_PAGE);
}
$res->free();
$content.='<div class="pages">';
if ($page>0) $content.='<a href="highscores.php">&lt;&lt;</a> ';
if ($page>0) $content.='<a href="highscores.php?p='.($page-1).'">&lt;</a> ';
$content.='<a href="highscores.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
if ($page<$pages-1) $content.='<a href="highscores.php?p='.($page+1).'">&gt;</a> ';
if ($page<$pages-1) $content.='<a href="highscores.php?p='.($pages-1).'">&gt;&gt;</a>';
$content.='</div>';
doContent($content,"Highscores");
doFooter();
?>

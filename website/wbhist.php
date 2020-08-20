<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - World Bosses");
doMenu("wb.php");
$res = $sql->query("SELECT WB.mode, AVG(WBD.damage) as dmg FROM WB,WBD WHERE WB.id=WBD.bid GROUP BY WB.mode ORDER BY WB.id DESC");
$content='
    <table class="pure-table pure-table-striped center">
    <thead>
        <tr>
            <th>ID</th>
            <th>Mode</th>
            <th>Average</th>
        </tr>
    </thead>

    <tbody>
';
while ($row=$res->fetch_assoc()) {
    $cells=array();
    $cells[]=$row["id"];
    $cells[]=$row["mode"]==0?"No Heroes":"Anything";
    $cells[]=number_format($row["dmg"],0,",",".");
    $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
}
$res->free();
$content.='</tbody></table>';

doContent($content,"World Bosses");
doFooter();
?>

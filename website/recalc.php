<?php
    include_once("sql.php");
    $q="SELECT u.id,p.pos,t.amount FROM users u, positions p, tournaments t WHERE p.uid=u.id AND t.id=p.tid";
    $res=$sql->query($q);
    $users=[];
    while ($row=$res->fetch_assoc()) {
        if (!isset($users[$row["id"]])) $users[$row["id"]]=0;
        $users[$row["id"]]+=($row["amount"]-$row["pos"])+1;
    }
    foreach ($users as $id=>$score) {
        $sql->query("UPDATE users SET score=$score WHERE id=$id LIMIT 1");
    }
?>
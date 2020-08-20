<?php
include_once("sql.php");
$res = $sql->query("SELECT `data`,`solved` FROM capcha WHERE id>=28406");
$data = [];
while ($row=$res->fetch_assoc()) {
    $data[]=$row;
}
file_put_contents("log/cstudy.json",json_encode($data));
echo "DONE";
?>
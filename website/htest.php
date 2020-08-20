<?php
include_once("data.php");
$tid=17460;
$hero=tid2heroes($tid,array_fill(0,count($HERO),0));
echo json_encode($hero);
?>
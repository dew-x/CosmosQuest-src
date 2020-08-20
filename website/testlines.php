<?php
    include("data.php");
    $base=0;
    $hero = array();
    for ($i=0; $i<count($HERO); ++$i) $hero[]=100;
    for ($i=0; $i<11; ++$i) {
        echo json_encode(tid2heroes($i+22-(17499%11)+17499,$hero))."<br>";
    }
?>
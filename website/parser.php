<?php

$data = json_decode(file_get_contents("cstudy.json"),true);
$hero = [];
foreach($data as $captcha) {
    $d = json_decode($captcha["data"],true);
    foreach ($d["all"] as $h) {
        if (!isset($hero[$h])) $hero[$h]=["ok"=>0,"fail"=>0];
        if ($captcha["solved"]) $hero[$h]["ok"]+=1;
        else $hero[$h]["fail"]+=1;
    }
}
foreach ($hero as $hid=>$hdata) {
    $hero[$hid]["ratio"]=$hero[$hid]["ok"]/($hero[$hid]["ok"]+$hero[$hid]["fail"]);
}
function cmp($a,$b) {return $a["ratio"]-$b["ratio"]<0?1:-1;}
uasort($hero,"cmp");

$toban = [];
foreach ($hero as $hid=>$hdata) {
    echo "$hid: ".$hdata["ratio"]."<br>\n";
    if ($hdata["ratio"]<=0.35) $toban[]=$hid;
}
echo json_encode($toban);
?>

<?php
include("sql.php");
include("data.php");
if (!isset($_GET["aaaaa"])) exit();
$res = $sql->query("SELECT * FROM auction WHERE `status`=2 AND ends>0");
$data = array();
$minv = -1;
$maxv = -1;
$income = 0;
while ($row=$res->fetch_assoc()) {
    if (!isset($data[$row["hero"]])) $data[$row["hero"]]=array();
    $data[$row["hero"]][]=array(
        "bid"=>$row["bid"],
        "ends"=>$row["ends"]
    );
    if ($minv==-1) {
        $minv = $row["ends"];
        $maxv = $row["ends"];
    } else {
        $minv = min($minv,$row["ends"]);
        $maxv = max($maxv,$row["ends"]);
    }
    $income += $row["bid"];
}

function cmp($a,$b) {
    return $a["ends"]-$b["ends"];
}

$span = ($maxv-$minv)/(24*60*60);

printf("%.0f UM everyday\n",$income/$span);

foreach ($data as $hid=>$arr) {
    usort($arr,"cmp");
    echo $HERO[$hid]["name"]."\n";
    $total = 0;
    $min = $arr[0]["bid"];
    $max = $arr[0]["bid"];
    for ($i=0; $i<count($arr); ++$i) {
        $min = min($min,$arr[$i]["bid"]);
        $max = max($max,$arr[$i]["bid"]);
        $total += $arr[$i]["bid"];
    }
    printf("RPD:%.0f AVG:%.0f MIN:%.0f MAX:%.0f\n",$total/$span,$total/count($arr),$min,$max);
}
?>
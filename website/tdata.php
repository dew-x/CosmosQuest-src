<?php
include_once("sql.php");
$data=array(
    "battles"=>array(),
    "players"=>array(),
);

if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $tid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT * FROM tournaments WHERE id = $tid AND `status`=2 LIMIT 1");
    if ($row=$res->fetch_assoc()) {
        $res = $sql->query("SELECT uid,pos,wr,wins,draw,loss,wrpos FROM positions WHERE tid = $tid");
        while ($row=$res->fetch_assoc()) {
            $data["players"][$row["uid"]]=array();
            $data["players"][$row["uid"]]["position"]=$row["pos"];
            $data["players"][$row["uid"]]["winratio"]=$row["wr"];
            $data["players"][$row["uid"]]["wins"]=$row["wins"];
            $data["players"][$row["uid"]]["draw"]=$row["draw"];
            $data["players"][$row["uid"]]["loss"]=$row["loss"];
            $data["players"][$row["uid"]]["winratiopos"]=$row["wrpos"];
        }
        $res = $sql->query("SELECT uid,setup,hero,promo FROM setups WHERE tid = $tid");
        while ($row=$res->fetch_assoc()) {
            $data["players"][$row["uid"]]["setup"]=$row["setup"];
            $data["players"][$row["uid"]]["hero"]=$row["hero"];
            $data["players"][$row["uid"]]["promo"]=$row["promo"];
        }
        $res = $sql->query("SELECT rid,aid,bid,result FROM battles WHERE tid = $tid");
        while ($row=$res->fetch_assoc()) {
            $data["battles"][] =array(
                "round"=>$row["rid"],
                "left"=>$row["aid"],
                "right"=>$row["bid"],
                "result"=>$row["result"]
            );
        }
    }
    
    
}
header('Content-Type: application/json');
echo json_encode($data);
?>

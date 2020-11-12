<?php
include_once("sql.php");
$data=array(
    "battles"=>array(),
    "players"=>array(),
);

if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $tid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT * FROM tournaments2 WHERE id = $tid AND `status`=2 LIMIT 1");
    if ($row=$res->fetch_assoc()) {
		$realTid = $row["tid"];
        $res = $sql->query("SELECT uid,pos FROM positions2 WHERE tid = $tid");
        while ($row=$res->fetch_assoc()) {
            $data["players"][$row["uid"]]=array();
            $data["players"][$row["uid"]]["position"]=$row["pos"];
        }
        $res = $sql->query("SELECT uid,setup FROM setups2 WHERE tid = $realTid");
        while ($row=$res->fetch_assoc()) {
            $data["players"][$row["uid"]]["setup"]=$row["setup"];
        }
        $res = $sql->query("SELECT rid,aid,bid,result FROM battles2 WHERE tid = $tid");
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

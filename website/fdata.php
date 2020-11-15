<?php
include_once("sql.php");
$data=[];

if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $tid=$sql->real_escape_string($_GET["id"]);
	if (file_exists("cache/".$tid.".log")) {
		$data=json_decode(file_get_contents("cache/".$tid.".log"),true);
	}
}
header('Content-Type: application/json');
echo json_encode($data);
?>

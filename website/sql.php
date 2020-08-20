<?php
$sql = new mysqli("host", "user", "pass", "table");
if ($sql->connect_error) {
    die('DBERROR (' . $sql->connect_errno . ') '
            . $sql->connect_error);
}
?>
<?php
include_once("functions.php");

echo tid2fol(18035);
print_r(tid2heroes(18035,array_fill(0,count($HERO),99)));
print_r(doHeros2(18035,-1));

?>
<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Enable User");
$msg="";
if (isset($_POST["username"])) {
    if (isset($_POST["enable"])) {
        $name=$sql->real_escape_string($_POST["username"]);
        /*$query="UPDATE users SET public=1 WHERE LOWER(name)='".strtolower($name)."' LIMIT 1;";
        $res=$sql->query($query);
        if ($res and $sql->affected_rows>0) {
            $msg='<div class="ok"><div class="vac">'.$name.' is now public</div></div>';
        } else {
            $msg='<div class="error"><div class="vac">'.$name.' not found or public</div></div>';
        }*/
    } else {
        $msg='<div class="error"><div class="vac">You must accept the conditions</div></div>';
    }
}
doMenu("enable.php");
$content='
    <p>
        In order to respect users privacy you must enable your username to be public in order to be able to see it.
    </p>
    '.$msg.'
    <form class="pure-form cqform" action="enable.php" method="POST">
        <label for="username">Kongregate Username*</label><br>
        <input id="username" name="username" type="text" placeholder="Username">
        <label for="enable" class="pure-checkbox">
            <input id="enable" name="enable" type="checkbox" value=""> I\'m the owner of this Kongregate account<br> and I give GaiaByte permission to make it public.
        </label>
        <button type="submit" class="pure-button pure-button-primary">Make username public</button>
    </form>
    * Make sure to participate in at least one tournament in order to be inside the system.
';
doContent($content,"Enable User");
doFooter();
?>

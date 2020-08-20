<?php
include_once("sql.php");
include_once("functions.php");
include_once("data.php");
doHeader("Cosmos Quest - User");

function hex2str($hex) {
    $str = '';
    for($i=0;$i<strlen($hex);$i+=2) $str .= chr(hexdec(substr($hex,$i,2)));
    return $str;
}
function int2bin($num,$len) {
    $str = decbin($num);
    while (strlen($str)<$len) $str="0".$str;
    return $str;
}
function str2bin($str) {
    $bin = "";
    $chars = "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for ($i=0; $i<strlen($str); ++$i) {
        $cid = strpos($chars,substr($str,$i,1));
        if ($cid!==false) $bin.=int2bin($cid,6);
    }
    return $bin;
}
function binary2hex($str) {
    $ret = "";
    while ((strlen($str)%8)!=0) $str.="0";
    for ($i=0; $i<strlen($str); $i+=8) {
        $hex = dechex(bindec(substr($str,$i,8)));
        while (strlen($hex)<2) $hex="0".$hex;
        $ret.=$hex;
    }
    return $ret;
}
function encodeBattle($result,$left,$right,$tid,$rid,$ls,$lh,$lp,$rs,$rh,$rp) {
    global $HERO,$MONSTERS;
    // header
    
    $binstr="1".($result?"1":"0").int2bin($tid,16).int2bin($rid,6).int2bin(strlen($left),6).int2bin(strlen($right),6);
    $binstr.=str2bin($left);
    $binstr.=str2bin($right);

    $hlen = ceil(log(count($HERO),2));
    $mlen = ceil(log(count($MONSTERS),2));
    $plen = 3;
    $llen = 7;

    for ($i=0; $i<30; ++$i) {
        if ($ls[$i]<-1) {
            $hid=-($ls[$i]+2);
            $binstr.="1".int2bin($hid,$hlen).int2bin($lh[$hid]>99?100:$lh[$hid],$llen).int2bin($lp[$hid],$plen);
        } else {
            $binstr.="0".int2bin($ls[$i]+1,$mlen);
        }
    }
    for ($i=0; $i<30; ++$i) {
        if ($rs[$i]<-1) {
            $hid=-($rs[$i]+2);
            $binstr.="1".int2bin($hid,$hlen).int2bin($rh[$hid]>99?100:$rh[$hid],$llen).int2bin($rp[$hid],$plen);
        } else {
            $binstr.="0".int2bin($rs[$i]+1,$mlen);
        }
    }
    $hexstr = binary2hex($binstr);
    echo "BIN[$binstr]HEX[$hexstr]";
    return base64_encode(pack('H*',$hexstr));
    //$strstr = hex2str($hexstr);
    //return base64_encode($strstr);
}
$content='';
$uid=-1;
if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $uid=$_GET["id"];
} else if (isset($_POST["username"])) {
    $q=strtolower($sql->real_escape_string($_POST["username"]));
    $res=$sql->query("SELECT id FROM users WHERE LOWER(name)='$q' AND public=1 LIMIT 1;");
    if ($res and $row=$res->fetch_array()) {
        $uid=$row[0];
    }
    $res->free();
}
doMenu("user.php");
if ($uid!==-1) {
    $res=$sql->query("SELECT * FROM users WHERE id=$uid LIMIT 1;");
    $row=$res->fetch_assoc();
    $name=$row["public"]?$row["name"]:$row["id"];
    $content='
        <h3>'.$name.'</h3>
        Score: '.number_format($row["score"],0,",",".").'<br>
    ';
    $content.='
        <h3>Last 10 Tournaments</h3>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>Tournament</th>
                <th>Position</th>
                <th>Points</th>
                <th>W-D-L</th>
                <th>WR %</th>
                <th>WR Pos</th>
            </tr>
        </thead>
        <tbody>
    ';
    $res2=$sql->query("SELECT p.tid,p.pos,t.amount,p.wins,p.draw,p.loss,p.wr,p.wrpos FROM positions p, tournaments t WHERE p.uid=$uid AND p.tid=t.id ORDER BY p.tid DESC LIMIT 10");
    while ($row2=$res2->fetch_assoc()) {
        $content.='<tr><td><a href="tournament.php?id='.$row2["tid"].'#P'.$row2["pos"].'">'.number_format($row2["tid"],0,",",".").'</a></td>
            <td>'.number_format($row2["pos"],0,",",".").'</td>
            <td>'.number_format(($row2["amount"]-$row2["pos"]+1)*doCost($row2["tid"]+17347),0,",",".").'</td>
            <td>'.$row2["wins"].'-'.$row2["draw"].'-'.$row2["loss"].'</td>
            <td>'.sprintf("%.02f",$row2["wr"]*100).'</td>
            <td><a href="tournament.php?id='.$row2["tid"].'&m=W#W'.$row2["wrpos"].'">'.number_format($row2["wrpos"],0,",",".").'</a></td>
        </tr>';
    }
    $content.='</tbody></table>';
    $content.='
        <h3>Flash Tournaments</h3>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>Tournament</th>
                <th>Position</th>
                <th>WR %</th>
            </tr>
        </thead>
        <tbody>
    ';
    $res3=$sql->query("SELECT tid,wr,position FROM fsetups WHERE uid=$uid ORDER BY tid DESC");
    while ($row3=$res3->fetch_assoc()) {
        $content.='<tr>
            <td><a href="ftournament.php?id='.$row3["tid"].'#P'.$row3["position"].'">'.number_format($row3["tid"],0,",",".").'</a></td>
            <td>'.number_format($row3["position"],0,",",".").'</td>
            <td>'.sprintf("%.02f",$row3["wr"]*100).' %</td>
        </tr>';
    }
    $content.='</tbody></table>';
    $content.='
        <h3>Last 50 battles</h3>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>Tournament</th>
                <th>Round</th>
                <th>Fight</th>
                <th>Result</th>
                <th>Replay</th>
            </tr>
        </thead>
        <tbody>
    ';
    $res->free();
    $res1=$sql->query("SELECT t.tid AS rtid,b.tid,b.rid,b.aid,b.bid,b.result,
            u1.name AS an,u1.public AS ap,u2.name AS bn,u2.public AS bp,
            s1.setup AS `as`, s1.hero AS `ah`, s1.promo AS `apr`,
            s2.setup AS `bs`, s2.hero AS `bh`, s2.promo AS `bpr`
        FROM battles b, tournaments t, users u1, users u2, setups s1, setups s2 
        WHERE (b.aid=$uid OR b.bid=$uid) AND b.aid=u1.id AND b.bid=u2.id AND t.id = b.tid AND s1.tid=b.tid AND s1.uid=b.aid AND s2.tid=b.tid AND s2.uid=b.bid 
        ORDER BY b.tid DESC, b.rid DESC LIMIT 50");
    $i=0;
    while ($row1=$res1->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="tournament.php?id='.$row1["tid"].'">'.number_format($row1["tid"],0,",",".").'</a>';
        $cells[]=number_format($row1["rid"]+1,0,",",".");
        $cells[]='<a href="user.php?id='.$row1["aid"].'">'.($row1["ap"]?$row1["an"]:$row1["aid"]).'</a> vs <a href="user.php?id='.$row1["bid"].'">'.($row1["bp"]?$row1["bn"]:$row1["bid"]).'</a>';
        $cells[]=($row1["result"]?($row1["bp"]?$row1["bn"]:$row1["bid"]):($row1["ap"]?$row1["an"]:$row1["aid"]))." WINS";
        /*$battle=base64_encode(json_encode(array(
            "winner"=>($row1["result"]?($row1["bp"]?$row1["bn"]:$row1["bid"]):($row1["ap"]?$row1["an"]:$row1["aid"])),
            "left"=>($row1["ap"]?$row1["an"]:$row1["aid"]),
            "right"=>($row1["bp"]?$row1["bn"]:$row1["bid"]),
            "date"=>$row1["rtid"]*(24*60*60*1000),
            "title"=>"Tournament ".$row1["tid"]." Round ".($row1["rid"]+1),
            "setup"=>json_decode($row1["as"],true),
            "shero"=>tid2heroes($row1["rtid"],json_decode($row1["ah"],true)),
            "player"=>json_decode($row1["bs"],true),
            "phero"=>tid2heroes($row1["rtid"],json_decode($row1["bh"],true)),
            "spromo"=>$row1["apr"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["apr"],true)),
            "ppromo"=>$row1["bpr"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["bpr"],true)),
        )));*/
        $battle=encodeBattle($row1["result"],($row1["ap"]?$row1["an"]:$row1["aid"]),($row1["bp"]?$row1["bn"]:$row1["bid"]),$row1["rtid"],$row1["rid"],
            json_decode($row1["as"],true),
            tid2heroes($row1["rtid"],json_decode($row1["ah"],true)),
            $row1["apr"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["apr"],true)),
            json_decode($row1["bs"],true),
            tid2heroes($row1["rtid"],json_decode($row1["bh"],true)),
            $row1["bpr"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["bpr"],true))
        );
        $cells[]='<button class="btn" data-clipboard-text="'.$battle.'">
            Copy
        </button>';
        $content.='<tr><td>'.implode('</td><td>',$cells).'</td></tr>';
        ++$i;
    }
    $content.='</tbody></table><script>
        new Clipboard(\'.btn\');
    </script>';
    $res1->free();
} else {
    $content.='
    <form class="pure-form cqform" action="user.php" method="POST">
        <label for="username">Username</label><br>
        <input id="username" name="username" type="text" placeholder="Username">
        <button type="submit" class="pure-button pure-button-primary">Search</button>
    </form>';
}
doContent($content,"User");
doFooter();
?>

<?php
    include_once("sql.php");
    include_once("questions.php");
    include_once("data.php");
    header("Access-Control-Allow-Origin: *");
    if (isset($_GET["kid"]) and ctype_digit($_GET["kid"])) {
        $kid=$_GET["kid"];
        $data = array();
        $mtid=floor(time()/(24*60*60))-8;
        $res1=$sql->query("SELECT t.tid AS rtid,b.tid,b.rid,b.result,
            u1.name AS an,u2.name AS bn,
            s1.setup AS `as`, s1.hero AS `ah`, s1.promo AS `ap`,
            s2.setup AS `bs`, s2.hero AS `bh`, s2.promo AS `bp`
        FROM battles b, tournaments t, users u, users u1, users u2, setups s1, setups s2 
        WHERE u.kid=$kid AND (t.tid >= $mtid AND t.id = b.tid AND (b.aid=u.id OR b.bid=u.id)) AND b.aid=u1.id AND b.bid=u2.id AND s1.tid=b.tid AND s1.uid=b.aid AND s2.tid=b.tid AND s2.uid=b.bid 
        ORDER BY tid DESC, b.rid DESC");
        /*SELECT t.tid AS tid,b.rid,b.result,
            u1.name AS an,u2.name AS bn,
            s1.setup AS `as`, s1.hero AS `ah`, s2.setup AS `bs`, s2.hero AS `bh`
        FROM battles b, tournaments t, users u1, users u2, setups s1, setups s2 
        WHERE t.tid > $mtid AND (u1.kid=$kid OR u2.kid=$kid) AND b.aid=u1.id AND b.bid=u2.id AND t.id = b.tid AND s1.tid=b.tid AND s1.uid=b.aid AND s2.tid=b.tid AND s2.uid=b.bid 
        ORDER BY b.tid DESC, b.rid DESC*/
        while ($row1=$res1->fetch_assoc()) {
            $tid = $row1["rtid"];
            $rid = $row1["rid"];
            if (!isset($data[$tid])) $data[$tid]=array();
            $i=1;
            while (isset($data[$tid][$rid])) {
                $rid=$row1["rid"].".$i";
                ++$i;
            }
            $data[$tid][$rid]=array(
                "winner"=>($row1["result"]?$row1["bn"]:$row1["an"]),
                "left"=>$row1["an"],
                "right"=>$row1["bn"],
                "date"=>$tid*(24*60*60*1000),
                "title"=>"Tournament ".$row1["tid"]." Round ".($row1["rid"]+1),
                "setup"=>json_decode($row1["as"],true),
                "shero"=>tid2heroes($tid,json_decode($row1["ah"],true)),
                "player"=>json_decode($row1["bs"],true),
                "phero"=>tid2heroes($tid,json_decode($row1["bh"],true)),
                "spromo"=>$row1["ap"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["ap"],true)),
                "ppromo"=>$row1["bp"]==""?array_fill(0,count($HERO),0):tid2promo($row1["rtid"],json_decode($row1["bp"],true)),
            );
        }
        echo json_encode($data);
    } else {
        echo json_encode(array());
    }
?>
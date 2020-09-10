<?php
    include_once("sql.php");
    include_once("functions.php");
    $res = $sql->query("SELECT t.tid,s.tid as cid,COUNT(*) AS amount FROM setups s, tournaments t WHERE s.tid=(SELECT MAX(id) FROM tournaments) AND s.tid=t.id GROUP BY t.tid,s.tid");
    $pool=0;
    if ($row=$res->fetch_assoc()) {
        $pool=(doCost($row["tid"])*$row["amount"]*0.7);
    }
    $res->free();
    $res1 = $sql->query("SELECT * FROM WB WHERE status=0 LIMIT 1");
    $wbdmg=0;
    $wbatk=0;
    $isSuper = false;
    if ($res1->num_rows==1 and $row1=$res1->fetch_assoc()) {
        $unid = $row1["id"];
        $bid = $row1["mid"];
        
        $wblvl = $row1["level"];
        $wbmode = $row1["mode"]%2;
        
        if ($row1["mode"]>1) $isSuper=true;
        
        $res2 = $sql->query("SELECT SUM(`damage`) AS damages, COUNT(*) AS atks FROM WBD WHERE bid=$unid GROUP BY bid");
        if ($row2=$res2->fetch_assoc()) {
            $wbdmg=$row2["damages"];
            $wbatk = $row2["atks"];
        }
        $res2->free();
    } else {
        $now=time();
        $wb = $WB[rand(0,count($WB)-1)];
        $lvl = 1;
        $mode = rand(0,count($WBM)-1);
        if (rand()/getrandmax()<0.1) $mode+=2;
        $res1=$sql->query("SELECT MAX(`level`) AS mlvl FROM WB WHERE mid=$wb AND mode=$mode GROUP BY mid");
        if ($row1=$res1->fetch_assoc()) {
            $lvl = $row1["mlvl"]+1;
        }
        $sql->query("INSERT INTO `WB` (`id`, `mid`, `level`, `spawn`, `killed`, `mode`, `status`) VALUES 
                        (NULL, '$wb', '$lvl', '$now', '0', '$mode', '0');");
        $bid = $wb;
        $unid = $sql->insert_id;
        $wblvl = $lvl;
        $wbmode = $mode;
    }
    $wbname = wbName($bid);
    if ($isSuper) $wbname="SUPER ".$wbname;
    $res1->free();
    $limit=1600;
    if ($isSuper) $limit=1200;
    $data=array(
        "version"=>"v4.8.4.2",
        "tournament"=>array(
            "pool"=>$pool
        ),
        "WB"=>array(
            "id"=>$bid,
            "uid"=>$unid,
            "name"=>$wbname,
            "atk"=>$limit-$wbatk,
            "dmg"=>$wbdmg,
            "lvl"=>$wblvl,
            "mode"=>$wbmode
        ),
        "news"=>"Second community update! Check changelog for details."
    );
    file_put_contents("data.json",json_encode($data));
     
    // load lineups
    /*$q="SELECT s.promo,s.hero,s.uid FROM setups s WHERE s.tid>537 AND s.tid = (SELECT MAX(tid) FROM setups s2 WHERE s.uid=s2.uid)";
    $res2 = $sql->query($q);
    $pd = array();
    while ($row2=$res2->fetch_assoc()) {
        $p = json_decode($row2["promo"],true);
        $l = json_decode($row2["hero"],true);
        for ($i=0; $i<count($p); ++$i) {
            if (!isset($pd[$i])) $pd[]=array(0,0,0,0,0,0);
            if ($l[$i]==99) ++$pd[$i][$p[$i]];
        }
    }
    $gdata = array();
    for ($i=0; $i<count($pd); ++$i) {
        $total = array_sum($pd[$i]);
        if ($total==0) {
            $gdata[] = array(
                "p1"=>-1,
                "p5"=>-1,
                "p"=>-1,
                "o"=>-1,
            );
        } else {
            $others = ($pd[$i][1]+$pd[$i][2]+$pd[$i][3]+$pd[$i][4]+$pd[$i][5]);
            if ($others==0) $others=1;
            $gdata[] = array(
                "p1"=>($pd[$i][1]+$pd[$i][2]+$pd[$i][3]+$pd[$i][4]+$pd[$i][5])/$total,
                "p5"=>$pd[$i][5]/$total,
                "p"=>($pd[$i][1]+$pd[$i][2]*2+$pd[$i][3]*3+$pd[$i][4]*4+$pd[$i][5]*5)/$others,
                "o"=>$total,
            );
        }
    }
    file_put_contents("pcache/global.json",json_encode($gdata));*/
?>
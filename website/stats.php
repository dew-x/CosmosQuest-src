<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Tournament Stats");
doMenu("stats.php");

$offset=0;
$page=0;
$_PAGE=25;
if (isset($_GET["p"])&&ctype_digit($_GET["p"])) {
    $offset=$_GET["p"]*$_PAGE;
    $page=$_GET["p"];
}
$legend = '
<br>Extra information:<br>
-Setup Usage: Percentage of times a Unit is used.<br>
-Row Usage: Percentage of Rows that contains the Unit.<br>
-Ratio: Average placement of setups containing the Unit.<br>
-Utility: How strong are setups containing this Unit over the ones that doesn\'t contain it.<br>
<br>
* You can sort the columns clicking on the header.<br>
** You can click on the Unit image for detailed unit information.<br><br>
';
$toggle='
<div class="cqform">
View:
<input type="radio" id="filter1"
 name="filter" value="all" onchange="sort(this);" checked>
<label for="filter1">All</label>

<input type="radio" id="filter2"
 name="filter" value="hero" onchange="sort(this);">
<label for="filter2">Heroes</label>

<input type="radio" id="filter3"
 name="filter" value="monster" onchange="sort(this);">
<label for="filter3">Monsters</label>
</div><br>
<script>
function sort(e) {
    var heroes = document.getElementsByClassName(\'hero\');
    var monsters = document.getElementsByClassName(\'monster\');
    if (e.value=="all" || e.value=="hero") {
        for(i=0; i<heroes.length; i++) {
            heroes[i].style.display="table-row";
        }
    } else {
        for(i=0; i<heroes.length; i++) {
            heroes[i].style.display="none";
        }
    }
    if (e.value=="all" || e.value=="monster") {
        for(i=0; i<monsters.length; i++) {
            monsters[i].style.display="table-row";
        }
    } else {
        for(i=0; i<monsters.length; i++) {
            monsters[i].style.display="none";
        }
    }
}
function update(e) {
    var query="";
    var ids=["sid","mid","hid","fid","uid"];
    var url = [location.protocol, "//", location.host, location.pathname].join("");
    for (var i=0; i<ids.length; ++i) {
        if (document.getElementById(ids[i])) {
            var val=document.getElementById(ids[i]).value;
            if (val!=="-1") {
                if (query!="") query+="&";
                query+=ids[i]+"="+val;
            }
        }
    }
    window.location=url+"?"+query;
}
</script>
';
$content='';
if (isset($_GET["id"])&&ctype_digit($_GET["id"])) {
    $tid=$sql->real_escape_string($_GET["id"]);
    $res = $sql->query("SELECT uid,gusage,rusage,score,fiability FROM stats WHERE tid=$tid");
    $content='';
    if ($res->num_rows==0) {
        $content.='Computing stats refreshing...';
        header("Refresh:3");
        $res1 = $sql->query("SELECT s.setup,p.pos FROM setups s, positions p WHERE s.tid=$tid AND p.tid=$tid AND s.uid=p.uid");
        $data=array();
        while ($row1=$res1->fetch_assoc()) {
            $data[$row1["pos"]]=json_decode($row1["setup"],true);
        }
        ksort($data);
        $units=array();
        $cu=0; // unit count
        $cr=0; // row count
        $mp=0; // max pos
        foreach ($data as $pos=>$setup) {
            $unique=array();
            for ($i=0; $i<count($setup); ++$i) {
                if (!isset($setup[$i])) {
                    print_r($setup);
                    exit();
                }
                $uid = $setup[$i];
                $unique[$uid]=1;
                if (!isset($units[$uid])) {
                    $units[$uid]=array(
                        "seen"=>0,
                        "rseen"=>0,
                        "sum"=>0,
                        "pos"=>array()
                    );
                }
                ++$units[$uid]["seen"];
                $units[$uid]["sum"]+=$pos;
                $units[$uid]["pos"][$pos]=1;
                $mp = max($mp,$pos);
                if (($i%6)==5) {
                    foreach (array_keys($unique) as $uid) {
                        ++$units[$uid]["rseen"];
                    }
                    $unique=array();
                    ++$cr;
                }
                ++$cu;
            }
        }
        $db="";
        $sid=tid2season($tid+17347);
        $mid=tid2mode($tid+17347);
        $hid=tid2hero($tid+17347);
        $fid=tid2followers($tid+17347);
        foreach ($units as $uid=>$stats) {
            $avg = $stats["sum"]/$stats["seen"];
            $usingsum = 0;
            $nusingsum = 0;
            $usingcount = 0;
            $nusingcount = 0;
            for ($i=1; $i<=$mp; ++$i) {
                if (isset($stats["pos"][$i])) {
                    ++$usingcount;
                    $usingsum+=$i;
                } else {
                    ++$nusingcount;
                    $nusingsum+=$i;
                }
            }
            $usingavg = $usingcount?1-(($usingsum/$usingcount)/$mp):0;
            $nusingavg = $nusingcount?1-(($nusingsum/$nusingcount)/$mp):0;
            if ($nusingavg==0) $utility = 1;
            else $utility = $usingavg/$nusingavg;
            $line="('$tid', '$uid', '$sid', '$mid', '$hid', '$fid', '".
            ($stats["seen"]/$cu)."', '".($stats["rseen"]/$cr)."', '".(1-$avg/$mp)."', '".($utility)."')";
            if ($db=="") {
                $db="INSERT INTO `stats` 
                    (`tid`, `uid`, `sid`, `mid`, `hid`, `fid`, `gusage`, `rusage`, `score`, `fiability`) 
                    VALUES 
                    $line";
            } else {
                $db.=",$line";
            }
        }
        $sql->query($db);
    } else {
        $content.='
            <h3>Viewing Tournament '.$tid.'</h3>
            '.$legend.'
            '.$toggle.'
            <table class="pure-table pure-table-striped center table-sort">
            <thead>
                <tr>
                    <th>Unit</th>
                    <th>Setup Usage</th>
                    <th>Row Usage</th>
                    <th>Ratio</th>
                    <th>Utility</th>
                </tr>
            </thead>

            <tbody>
        ';
        while ($row=$res->fetch_assoc()) {
            $cells=array();
            $cells[]='<a href="stats.php?uid='.$row["uid"].'">'.doUnit($row["uid"]).'</a>';
            $cells[]=sprintf("%.02f %%",$row["gusage"]*100);
            $cells[]=sprintf("%.02f %%",$row["rusage"]*100);
            $cells[]=sprintf("%.02f %%",$row["score"]*100);
            $cells[]=sprintf("%.02f %%",$row["fiability"]*100);
            $content.='<tr class="'.($row["uid"]<-1?"hero":"monster").'"><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
        }
        $content.='</tbody></table>
        <script src="js/light-table-sorter.min.js"></script>
        <script>LightTableSorter.init()</script>'.$legend;
    }
    $res->free();
} else if (isset($_GET["uid"]) and is_numeric($_GET["uid"])) {
    $uid=$_GET["uid"];
    $name="Empty Cell";
    if ($uid<-1) $name=$HERO[-($uid+2)]["name"];
    else if ($uid>=0) $name=$MONSTERS[$uid]["name"];

    $where="";
    $keys = array("sid","mid","hid","fid");
    $names= array("Season","Mode","Hero","Followers");
    $arrs = array($ESEASONS,$EMODES,$EHERO,$EFOL);
    $search='<form class="center"><input type="hidden" name="uid" id="uid" value="'.$uid.'">';
    foreach ($keys as $pos=>$key) {
        if (isset($_GET[$key]) and ctype_digit($_GET[$key])) {
            if ($where!="") $where.=" AND ";
            $where.="`$key` = ".$_GET[$key];
            $search.=doSelect($names[$pos],$key,$arrs[$pos],$_GET[$key]);
        } else {
            $search.=doSelect($names[$pos],$key,$arrs[$pos]);
        }
    }
    $search.='</form><br>';
    if ($where=="") $where="1";
    $query="SELECT * FROM stats WHERE uid=$uid AND $where ORDER BY tid DESC";
    $res = $sql->query($query);

    $content.='
        <h3>Viewing '.$name.'</h3>
        <center>'.doUnit($uid).'</center>
        '.$legend.'
        '.$search.'
        <table class="pure-table pure-table-striped center table-sort">
        <thead>
            <tr>
                <th>ID</th>
                <th>Season</th>
                <th>Mode</th>
                <th>Hero</th>
                <th>Followers</th>
                <th>Setup Usage</th>
                <th>Row Usage</th>
                <th>Ratio</th>
                <th>Utility</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $sid=tid2season($row["tid"]+17347);
        $mid=tid2mode($row["tid"]+17347);
        $hid=tid2hero($row["tid"]+17347);
        $fid=tid2followers($row["tid"]+17347);
        $cells=array();
        $cells[]='<a href="stats.php?id='.$row["tid"].'">'.$row["tid"].'</a>';
        $cells[]='<a href="stats.php?sid='.$sid.'">'.$ESEASONS[$sid].'</a>';
        $cells[]='<a href="stats.php?mid='.$mid.'">'.$EMODES[$mid].'</a>';
        $cells[]='<a href="stats.php?hid='.$hid.'">'.$EHERO[$hid].'</a>';
        $cells[]='<a href="stats.php?fid='.$fid.'">'.$EFOL[$fid].'</a>';
        $cells[]=sprintf("%.02f %%",$row["gusage"]*100);
        $cells[]=sprintf("%.02f %%",$row["rusage"]*100);
        $cells[]=sprintf("%.02f %%",$row["score"]*100);
        $cells[]=sprintf("%.02f %%",$row["fiability"]*100);
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>
    <script src="js/light-table-sorter.min.js"></script>
    <script>
    LightTableSorter.init()
    function update(e) {
        var query="";
        var ids=["sid","mid","hid","fid","uid"];
        var url = [location.protocol, "//", location.host, location.pathname].join("");
        for (var i=0; i<ids.length; ++i) {
            if (document.getElementById(ids[i])) {
                var val=document.getElementById(ids[i]).value;
                if (val!=="-1") {
                    if (query!="") query+="&";
                    query+=ids[i]+"="+val;
                }
            }
        }
        window.location=url+"?"+query;
    }
    </script>'.$legend;
} else if (isset($_GET["sid"]) or isset($_GET["mid"]) or isset($_GET["hid"]) or isset($_GET["fid"])) {
    $where="";
    $mode="";
    $keys = array("sid","mid","hid","fid");
    $names= array("Season","Mode","Hero","Followers");
    $arrs = array($ESEASONS,$EMODES,$EHERO,$EFOL);
    $search='<form class="center">';
    foreach ($keys as $pos=>$key) {
        if (isset($_GET[$key]) and ctype_digit($_GET[$key])) {
            if ($where!="") $where.=" AND ";
            $where.="`$key` = ".$_GET[$key];
            if ($mode!="") $mode.=", ";
            $mode.=$arrs[$pos][$_GET[$key]];
            $search.=doSelect($names[$pos],$key,$arrs[$pos],$_GET[$key]);
        } else {
            $search.=doSelect($names[$pos],$key,$arrs[$pos]);
        }
    }
    $search.='</form><br>';
    if ($mode=="") $mode="Everything";
    if ($where=="") $where="1";
    $query="SELECT uid,AVG(gusage) as gusage,AVG(rusage) as rusage,AVG(score) as score,AVG(fiability) as fiability FROM stats WHERE $where GROUP BY uid";
    $res = $sql->query($query);
    $content.='
        <h3>Viewing '.$mode.'</h3>
        '.$legend.'
        '.$search.'
        '.$toggle.'
        <table class="pure-table pure-table-striped center table-sort">
        <thead>
            <tr>
                <th>Unit</th>
                <th>Setup Usage</th>
                <th>Row Usage</th>
                <th>Ratio</th>
                <th>Utility</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $cells=array();
        $cells[]='<a href="stats.php?uid='.$row["uid"].'">'.doUnit($row["uid"]).'</a>';
        $cells[]=sprintf("%.02f %%",$row["gusage"]*100);
        $cells[]=sprintf("%.02f %%",$row["rusage"]*100);
        $cells[]=sprintf("%.02f %%",$row["score"]*100);
        $cells[]=sprintf("%.02f %%",$row["fiability"]*100);
        $content.='<tr class="'.($row["uid"]<-1?"hero":"monster").'"><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $content.='</tbody></table>
    <script src="js/light-table-sorter.min.js"></script>
    <script>LightTableSorter.init()</script>'.$legend;
} else {
    $res = $sql->query("SELECT id,status,UNIX_TIMESTAMP(`date`) as ts,tid,amount FROM tournaments WHERE status = 2 ORDER BY id DESC LIMIT $offset,$_PAGE");
    $content='
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Season</th>
                <th>Mode</th>
                <th>Hero</th>
                <th>Followers</th>
            </tr>
        </thead>

        <tbody>
    ';
    while ($row=$res->fetch_assoc()) {
        $sid=tid2season($row["tid"]);
        $mid=tid2mode($row["tid"]);
        $hid=tid2hero($row["tid"]);
        $fid=tid2followers($row["tid"]);
        $cells=array();
        $cells[]='<a href="stats.php?id='.$row["id"].'">'.$row["id"].'</a>';
        $cells[]=date("Y/m/d",$row["ts"]);
        $cells[]='<a href="stats.php?sid='.$sid.'">'.$ESEASONS[$sid].'</a>';
        $cells[]='<a href="stats.php?mid='.$mid.'">'.$EMODES[$mid].'</a>';
        $cells[]='<a href="stats.php?hid='.$hid.'">'.$EHERO[$hid].'</a>';
        $cells[]='<a href="stats.php?fid='.$fid.'">'.$EFOL[$fid].'</a>';
        $content.='<tr><td class="big">'.implode('</td><td class="small">',$cells).'</td></tr>';
    }
    $res->free();
    $content.='</tbody></table>';
    $res = $sql->query("SELECT COUNT(*) FROM tournaments");
    $pages=1;
    if ($row=$res->fetch_array()) {
        $pages=ceil($row[0]/$_PAGE);
    }
    $res->free();
    $content.='<div class="pages">';
    if ($page>0) $content.='<a href="stats.php">&lt;&lt;</a> ';
    if ($page>0) $content.='<a href="stats.php?p='.($page-1).'">&lt;</a> ';
    $content.='<a href="tournament.php?p='.$page.'">'.($page*$_PAGE+1).'-'.(($page+1)*$_PAGE).'</a> ';
    if ($page<$pages-1) $content.='<a href="stats.php?p='.($page+1).'">&gt;</a> ';
    if ($page<$pages-1) $content.='<a href="stats.php?p='.($pages-1).'">&gt;&gt;</a>';
    $content.='</div>';
}
doContent($content,"Tournament Stats");
doFooter();
?>

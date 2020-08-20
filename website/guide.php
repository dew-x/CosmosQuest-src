<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest - Unit Guide");
doMenu("guide.php");
$content='';
if (isset($_GET["secret"]) and $_GET["secret"]=="secret") {
    if (isset($_GET["id"]) and ctype_digit($_GET["id"])) {
        
    } else {
        $data = json_decode(file_get_contents("pcache/global.json"),true);
        $content.='
            <h3>Cosmos Quest Units</h3>
            <table class="pure-table pure-table-striped center table-sort">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Element</th>
                    <th>Rarity</th>
                    <th>Promo 1+ %</th>
                    <th>Promo 5 %</th>
                    <th>Average promo</th>
                    <th>99 owners</th>
                </tr>
            </thead>

            <tbody>
        ';
        for ($i=0; $i<count($HERO); ++$i) {
            if ($HERO[$i]["rarity"]!=5) {
                $cells=array();
                $cells[]='<a href="guide.php?id='.$i.'&secret=secret">'.(-($i+2))."</a>";
                $cells[]=$HERO[$i]["name"];
                $cells[]=doUnit(-($i+2));
                $cells[]=doType($HERO[$i]["type"]);
                $cells[]=doRarity($HERO[$i]["rarity"]);
                if (isset($data[$i])) {
                    $cells[]=sprintf("%.02f",$data[$i]["p1"]*100);
                    $cells[]=sprintf("%.02f",$data[$i]["p5"]*100);
                    $cells[]=sprintf("%.02f",$data[$i]["p"]);
                    $cells[]=sprintf("%d",$data[$i]["o"]);
                } else {
                    $cells[]="-";
                    $cells[]="-";
                    $cells[]="-";
                    $cells[]="-";
                }
                $content.='<tr class="hero"><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
            }
        }
        $content.='</tbody></table>
        <script src="js/light-table-sorter.min.js"></script>
        <script>LightTableSorter.init()</script>';
    }
} else {
    $legend = '';
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
    </script>
    ';
    $data=json_decode(file_get_contents("hdata.json"),true);
    if (isset($_GET["id"]) and ctype_digit($_GET["id"])) {
        
        $content.='
        <h3>'.$HERO[$_GET["id"]]["name"].'</h3>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Result</th>
            </tr>
        </thead>

        <tbody>';
        $w = 0;
        $d = 0;
        $l = 0;
        foreach ($data[$_GET["id"]]["hero"] as $hid=>$res) {
            $cells=array();
            $cells[]=$hid;
            $cells[]=$HERO[$hid]["name"];
            $cells[]='<span style="color:'.($res==1?'green">WIN':($res==0?'blue">DRAW':'red">LOSS'))."</span>";
            $content.='<tr><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
            if ($res==1) ++$w;
            else if ($res==0) ++$d;
            else ++$l;
        }
        $first=null;
        $last=null;
        $m=0;
        for ($i=0; $i<count($data[$_GET["id"]]["mons"]); ++$i) {
            $res = $data[$_GET["id"]]["mons"][$i];
            if ($res!=1 and $first==null) $first=$i;
            if ($res!=-1) $last=$i;
            if ($res==1) $m+=2;
            else if ($res==0) $m+=1;
        }
        $m/=count($data[$_GET["id"]]["mons"])*2;
        $begin=max(0,floor($first/4)-1);
        $end=min(count($data[$_GET["id"]]["mons"])/4,floor($last/4)+2);
        $s = ($w*2+$d-$l)/($w+$d+$l);
        $content.='</tbody></table>
        <br><br>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Percentage</th>
            </tr>
        </thead>

        <tbody>
        <tr><td>Wins</td><td>'.$w.'</td><td>'.sprintf("%.02f",$w/($w+$d+$l)*100).' %</td></tr>
        <tr><td>Draws</td><td>'.$d.'</td><td>'.sprintf("%.02f",$d/($w+$d+$l)*100).' %</td></tr>
        <tr><td>Loses</td><td>'.$l.'</td><td>'.sprintf("%.02f",$l/($w+$d+$l)*100).' %</td></tr>
        <tr><td>Hero Score</td><td>'.round($s*100).'</td><td>-</td></tr>
        <tr><td>Monster Score</td><td>'.sprintf("%.02f",$m*100).'</td><td>-</td></tr>
        </tbody>
        </table>';
        $content.='<br><br>
        <table class="pure-table pure-table-striped center">
        <thead>
            <tr>
                <th>Tier</th>
                <th>Air</th>
                <th>Earth</th>
                <th>Fire</th>
                <th>Water</th>
            </tr>
        </thead>

        <tbody>';
        for ($i=$begin; $i<$end; ++$i) {
            $cells=array();
            $cells[]="Tier ".($i+1);
            for ($j=0; $j<4; ++$j) {
                $cells[]=$MONSTERS[$i*4+$j]["name"].' <span style="color:'.($data[$_GET["id"]]["mons"][$i*4+$j]==1?'green">WIN':($data[$_GET["id"]]["mons"][$i*4+$j]==0?'blue">DRAW':'red">LOSS'))."</span>";;
            }
            $content.='<tr><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
        }
        $content.='</tbody>
        </table>';
    } else {
        $content.='
            <h3>Cosmos Quest Units</h3>
            '.$legend.'
            '.$toggle.'
            <table class="pure-table pure-table-striped center table-sort">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Element</th>
                    <th>Rarity</th>
                    <th>Hp</th>
                    <th>Atk</th>
                    <th>Points</th>
                    <th>Hero</th>
                    <th>Monster</th>
                </tr>
            </thead>

            <tbody>
        ';
        for ($i=0; $i<count($MONSTERS); ++$i) {
            $cells=array();
            $cells[]=$i;
            $cells[]=$MONSTERS[$i]["name"];
            $cells[]=doUnit($i);
            $cells[]=doType($MONSTERS[$i]["type"]);
            $cells[]="-";
            $cells[]=$MONSTERS[$i]["hp"];
            $cells[]=$MONSTERS[$i]["atk"];
            $cells[]=round(pow($MONSTERS[$i]["atk"]*$MONSTERS[$i]["hp"],1.5));
            $cells[]="-";
            $cells[]="-";
            $content.='<tr class="monster"><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
        }
        for ($i=0; $i<count($HERO); ++$i) {
            if ($HERO[$i]["rarity"]!=5) {
                $cells=array();
                $cells[]='<a href="guide.php?id='.$i.'">'.(-($i+2))."</a>";
                $cells[]=$HERO[$i]["name"];
                $cells[]=doUnit(-($i+2));
                $cells[]=doType($HERO[$i]["type"]);
                $cells[]=doRarity($HERO[$i]["rarity"]);
                $cells[]=$HERO[$i]["hp"];
                $cells[]=$HERO[$i]["atk"];
                $cells[]=round(pow($HERO[$i]["atk"]*$HERO[$i]["hp"],1.5));
                if (isset($data[$i])) {
                    $w = 0;
                    $d = 0;
                    $l = 0;
                    foreach ($data[$i]["hero"] as $hid=>$res) {
                        if ($res==1) ++$w;
                        else if ($res==0) ++$d;
                        else ++$l;
                    }
                    $m=0;
                    for ($j=0; $j<count($data[$i]["mons"]); ++$j) {
                        $res = $data[$i]["mons"][$j];
                        if ($res==1) $m+=2;
                        else if ($res==0) $m+=1;
                    }
                    $m/=count($data[$i]["mons"])*2;
                    $s = ($w*2+$d-$l)/($w+$d+$l);
                    $cells[]=round($s*100);
                    $cells[]=sprintf("%.02f",$m*100);
                } else {
                    $cells[]="-";
                    $cells[]="-";
                }
                $content.='<tr class="hero"><td>'.implode('</td><td class="small">',$cells).'</td></tr>';
            }
        }
        $content.='</tbody></table>
        <script src="js/light-table-sorter.min.js"></script>
        <script>LightTableSorter.init()</script>';
    }
}
doContent($content,"Unit Guide");
doFooter();
?>

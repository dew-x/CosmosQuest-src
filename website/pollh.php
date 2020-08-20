<?php
include_once("sql.php");
include_once("functions.php");
include_once("questions.php");
doHeader("Cosmos Quest - Poll Hidden Results");
doMenu("poll.php");
$content='';
$data = json_decode(file_get_contents("pollh.json"),true);
$qid = floor(time()/(24*60*60))-1;
$pkeys = array_keys($questions);
sort($pkeys);
for ($i=0; $i<count($pkeys); ++$i) {
    if (!isset($data[$pkeys[$i]]) && $pkeys[$i]<$qid) {
        $qid = $pkeys[$i];
        break;
    }
}
if (isset($questions[$qid]) and !isset($data[$qid])) {
    //$res = $sql->query("SELECT vote,SUM(COUNT()) as `amount` FROM poll WHERE qid=$qid GROUP BY vote");
    $res = $sql->query("SELECT x.vote,SUM(x.joined) as `amount`
        FROM (
            SELECT p.vote,(
                SELECT COUNT(*) FROM users u, setups s WHERE u.id=s.uid AND p.kid = u.kid GROUP BY u.id
            ) AS joined FROM poll p WHERE p.qid = $qid
        ) x GROUP BY x.vote");
    $votes=array();
    $responses = array_slice($questions[$qid],1);
    for ($i=0; $i<count($responses); ++$i) {
        $votes[]=0;
    }
    while ($row=$res->fetch_assoc()) {
        if ($qid<17474 and $row["vote"]<count($responses)) $votes[$row["vote"]]+=$row["amount"];
        else {
            for ($i=0; $i<count($responses); ++$i) {
                if ($row["vote"]&pow(2,$i)) $votes[$i]+=$row["amount"];
            }
        }
    }
    $data[$qid] = array(
        "question"=>$questions[$qid][0],
        "responses"=>$responses,
        "votes"=>$votes,
    );
    file_put_contents("pollh.json",json_encode($data,JSON_PRETTY_PRINT));
}
krsort($data);
foreach ($data as $q=>$qd) {
    $content.='<div class="pollarea"><h2>'.$qd["question"].'</h2>';
    $total=0;
    $max=0;
    for ($i=0; $i<count($qd["votes"]); ++$i) {
        $total+=$qd["votes"][$i];
        $max=max($max,$qd["votes"][$i]);
    }
    for ($i=0; $i<count($qd["votes"]); ++$i) {
        $content.='
        <span>'.$qd["responses"][$i].'</span>
        <div class="wrapper">
            <div class="progress-bar">
                <span class="progress-bar-fill" style="width: '.sprintf("%.02f",$qd["votes"][$i]/$total*100).'%;">'.($max==$qd["votes"][$i]?"<b>".$qd["votes"][$i]."</b>":$qd["votes"][$i]).'</span>
            </div>
        </div>';
    }
    if (isset($qd["comment"])) {
        $content.='<span class="comment">* '.$qd["comment"].'<span>';
    }
    $content.='</div>';
}
doContent($content,"Poll Results");
doFooter();
?>

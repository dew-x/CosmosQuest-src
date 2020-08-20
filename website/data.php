<?php
include_once("mons.php");
$HERO = getHero();
$MONSTERS = getMonsters();
$PROMO = getPromo();

$WB = array(72,87,106,126,186);
$WBM = array("No Heroes","Heroes");
/*season 1
function tid2fol($tid) {
    $counts=array(30000,600000,9000000);
    return $counts[$tid%count($counts)];
}

function tid2heroes($tid,$hero) {
    global $HERO;
    if ($tid%5==2) return $hero;
    else if ($tid%5==1) {
        $ret=array();
        for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
        return $ret;
    } else if ($tid%5==3) {
        $ret=array();
        for ($i=0; $i<count($HERO); ++$i) {
            if ($HERO[$i]["rarity"]==0) $ret[]=1;
            else $ret[]=0;
        }
        return $ret;
    } else if ($tid%5==4) {
        $ret=array();
        for ($i=0; $i<count($HERO); ++$i) {
            if ($HERO[$i]["rarity"]==0) $ret[]=10;
            else if ($HERO[$i]["rarity"]==1) $ret[]=1;
            else $ret[]=0;
        }
        return $ret;
    } else if ($tid%5==0) {
        $ret=array();
        for ($i=0; $i<count($HERO); ++$i) {
            if ($HERO[$i]["rarity"]==0) $ret[]=50;
            else if ($HERO[$i]["rarity"]==1) $ret[]=10;
            else $ret[]=1;
        }
        return $ret;
    } 
}*/
/* season 2 */
function doRandom($max,$seed) {
    $multiplier = 48271;
    $modulus = 2147483647;
    $mq = floor($modulus / $multiplier);
    $mr = $modulus % $multiplier;
    for ($i=0; $i<=$seed%20; ++$i) {
        $temp = $multiplier * ($seed % $mq) - ($mr * floor($seed / $mq));
        if ($temp > 0){
            $seed = $temp;
        } else {
            $seed = $temp + $modulus;
        }
    }
    return round(($seed/$modulus)*$max);
} 
function doRandomLog($min,$max,$tid) {
    $rnd = doRandom(15485867,$tid)/15485867;
    return round($min + exp(log($min)+((log($max)-log($min))*$rnd)));
}

function doRandomLog2($min,$max,$tid) {
    seedRNG($tid);
    $rnd = getFRNG();
    return round($min + exp(log($min)+((log($max)-log($min))*$rnd)));
}

$_SEED = 0;

function seedRNG($seed) {
    global $_SEED; 
    $_SEED = $seed % 2147483647;
    if ($_SEED <= 0) $_SEED += 2147483646;  
    for ($i=0; $i<100; ++$i) getRNG();
}

function getRNG() {
    global $_SEED;
    $_SEED = $_SEED * 16807 % 2147483647;
    return $_SEED;
}

function getFRNG() {
    return (getRNG() - 1) / 2147483646;   
}
function hero2fol($hero,$level,$promotion=0) {
    global $HERO,$PROMO;
    $hp = $HERO[$hero]["hp"];
    $atk =  $HERO[$hero]["atk"];
    $points = $level - 1;
    
    if ($HERO[$hero]["rarity"]==1) $points *= 2+($HERO[$hero]["rarity"]+1)*($promotion>=3);
    else if ($HERO[$hero]["rarity"]==2) $points *= 6+($HERO[$hero]["rarity"]+1)*($promotion>=3);
    else if ($HERO[$hero]["rarity"]==3) $points *= 12+($HERO[$hero]["rarity"]+1)*($promotion>=3);
    else if ($HERO[$hero]["rarity"]==0) $points *= 1+($HERO[$hero]["rarity"]+1)*($promotion>=3);
    $points = floor($points);

    $fhp = $hp + round($points*$hp/($hp+$atk));
    $fatk = $atk + round($points*$atk/($hp+$atk));
    if ($promotion>=1) $fhp+=$PROMO[$hero]["hp"];
    if ($promotion>=2) $fatk+=$PROMO[$hero]["atk"];
    if ($promotion>=4) {
        $fhp+=$PROMO[$hero]["both"];
        $fatk+=$PROMO[$hero]["both"];
    }
    return pow($fhp*$fatk,1.5);
}

/*function hero2fol($hid,$lvl,$promo=0) {
    global $HERO;
    $atk = $HERO[$hid]["atk"];
    $hp = $HERO[$hid]["hp"];
    $atk0 = $HERO[$hid]["atk"];
    $hp0 = $HERO[$hid]["hp"];
    if ($HERO[$hid]["rarity"]>3) return 0;
    $points = $lvl - 1;
    if ($HERO[$hid]["rarity"]==1) $points *= 2;
    else if ($HERO[$hid]["rarity"]==2) $points *= 6;
    else if ($HERO[$hid]["rarity"]==3) $points *= 12;
   
    $hp = $hp0 + round($points*$hp0/($hp0+$atk0));
    $atk = $atk0 + round($points*$atk0/($hp0+$atk0));
    
}*/

function tid2fol($tid) {
    global $HERO;
    if ($tid<17499) {
        $counts=array(100000,10000000,80000000);
        $range=array(900000,10000000,40000000);
        return $counts[$tid%count($counts)]+doRandom($range[$tid%count($counts)],$tid);
    } else if ($tid<17509) {
        $counts=array( 50000, 5000000,50000000);
        $range=array(1450000,20000000,75000000);
        return $counts[$tid%count($counts)]+doRandom($range[$tid%count($counts)],$tid);
    } else if ($tid<=17555) {
        $counts=array(    50000, 5000000,  5000000,  50000, 5000000,  5000000, 5000000, 5000000,100000000, 20000000, 5000000);
        $range= array(125000000,70000000,125000000,9000000,70000000,125000000,40000000,70000000,100000000,100000000,70000000);
        return $counts[$tid%count($counts)]+doRandom($range[$tid%count($counts)],$tid);
    } else if ($tid<=17654) {
        $min=array(  30000,      30000, 5000000, 50000000, 50000000);
        $max=array(9000000,10000000000,70000000,600000000,600000000);
        return doRandomLog($min[$tid%count($min)],$max[$tid%count($min)],$tid);
    } else if ($tid<=17825) {
        $arr = array();
        $mul = $tid%4;
        $lvls = array(20,30,40,50,60,70,80);
        for ($i=0; $i<count($HERO); ++$i) {
            $arr[]=$lvls[$mul];
        }
        $hero = tid2heroes($tid,$arr);
        $fols = 0;
        for ($i=0; $i<count($hero); ++$i) {
            if ($hero[$i]>0) {
                $fols+=hero2fol($i,$hero[$i]);
            }
        } 
        if ($fols==0) return doRandomLog(30000,1000000000,$tid);
        return round($fols);
    } else if ($tid<17928) {
        if ($tid==17830) return 17835078;
        $arr = array();
        for ($i=0; $i<count($HERO); ++$i) {
            $arr[]=99;
        }
        $hero = tid2heroes($tid,$arr);
        $fols = 0;
        for ($i=0; $i<count($hero); ++$i) {
            if ($hero[$i]>0) {
                $fols+=hero2fol($i,$hero[$i]);
            }
        }
        if ($tid%13==0) $fols=1829370;
        else if ($tid%13==3) $fols=15257500;
        else if ($tid%13==6) $fols=240027500;
        else if ($tid%13==9) $fols=1798387500;
        if ($fols==0) return doRandomLog2(30000,1000000000,$tid);
        seedRNG($tid);
        $rnd = getRNG();
        $num = $rnd%191;
        $num = ($num+10)/floatval(100);
        return round($fols*$num);
    } else if ($tid<18039) {
        if ($tid==17830) return 17835078;
        $arr = array();
        $parr = array();
        for ($i=0; $i<count($HERO); ++$i) {
            $arr[]=99;
            $parr[]=5;
        }
        $hero = tid2heroes($tid,$arr);
        $promo = tid2promo($tid,$parr);
        $fols = 0;
        $amount = 0;
        for ($i=0; $i<count($hero); ++$i) {
            if ($hero[$i]>0) {
                $fols+=hero2fol($i,$hero[$i])*($promo[$i]+5)/5;
                ++$amount;
            }
        }
        if ($fols==0) return doRandomLog2(30000,1000000000,$tid);
        seedRNG($tid);
        $rnd = getRNG();
        $num = $rnd%50;
        $num = ($num+30)/floatval(100);
        return round(($fols/$amount)*10*$num);
    } else {
        $arr = array();
        $parr = array();
        for ($i=0; $i<count($HERO); ++$i) {
            $arr[]=99;
            $parr[]=2;
        }
        $hero = tid2heroes($tid,$arr);
        $promo = tid2promo($tid,$parr);
        $fols = 0;
        $amount = 0;
        for ($i=0; $i<count($hero); ++$i) {
            if ($hero[$i]>0) {
                $fols+=hero2fol($i,$hero[$i],$promo[$i]);
                ++$amount;
            }
        }
        if ($fols==0) return doRandomLog2(30000,1000000000,$tid);
        $base = ($fols/$amount);
        $vals = array(4,9,20);
        return round($base*$vals[$tid%count($vals)]);
    }
}

function tid2heroes($tid,$hero) {
    global $HERO;
    if ($tid<17415) {
        global $HERO;
        if ($tid%5==2) return $hero;
        else if ($tid%5==1) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%5==3) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0) $ret[]=1;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==4) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["rarity"]==0) $ret[]=10;
                else if ($HERO[$i]["rarity"]==1) $ret[]=1;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==0) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["rarity"]==0) $ret[]=50;
                else if ($HERO[$i]["rarity"]==1) $ret[]=10;
                else $ret[]=1;
            }
            return $ret;
        } 
    } else if ($tid<17456) {
        $ignore = array(20,42,43,44);
        if ($tid%5==2) return $hero;
        else if ($tid%5==1) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%5==3) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==4) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and !in_array($i,$ignore)) $ret[]=99;
                else if ($HERO[$i]["rarity"]==1 and !in_array($i,$ignore)) $ret[]=50;
                else if ($HERO[$i]["rarity"]==2 and !in_array($i,$ignore)) $ret[]=15;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==0) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["rarity"]==0) $ret[]=1000;
                else $ret[]=0;
            }
            return $ret;
        }
    } else if ($tid<17499) {
        $ignore = array(20,42,43,44);
        if ($tid%5==2) return $hero;
        else if ($tid%5==1) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%5==3) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==4) {
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and !in_array($i,$ignore)) $ret[]=99;
                else if ($HERO[$i]["rarity"]==1 and !in_array($i,$ignore)) $ret[]=50;
                else if ($HERO[$i]["rarity"]==2 and !in_array($i,$ignore)) $ret[]=15;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%5==0) {
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(200*($HERO[$i]["rarity"]+1),$seed);
                if ($rnd<=99 && $i!=20) $ret[]=$rnd;
                else $ret[]=0;
                $seed+=$rnd;
            }
            return $ret;
        }
    } else if ($tid<=17555) {
        $ignore = array(20,65,66,67,68,69,70,71,72,80,81,82);
        /*
            No Heroes
            Air Only
            All Heroes Random LvL
            Your Common
            Earth Only
            Random Heroes LvL 99
            Your Rares
            Fire Only
            All LvL 99
            Your Legendaries
            Water Only
        */
        if ($tid%11==0) { // No Heroes
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%11==1) { // Air Only
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["type"]==0 and !in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==2) { // All Heroes Random LvL
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(98,$seed)+1;
                if (!in_array($i,$ignore)) $ret[]=$rnd;
                else $ret[]=0;
                $seed+=$rnd*$tid;
            }
            return $ret;
        } else if ($tid%11==3) { // Your Common
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==4) { // Earth Only
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["type"]==1 and !in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==5) { // Random Heroes LvL 99
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(500,$seed);
                if (!in_array($i,$ignore) and $rnd%5==0) $ret[]=99;
                else $ret[]=0;
                $seed+=$rnd*$tid;
            }
            return $ret;
        } else if ($tid%11==6) { // Your Rares
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==7) { // Fire Only
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["type"]==2 and !in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==8) { // All LvL 99
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { // Your Legendaries
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==10) { // Water Only
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if ($HERO[$i]["type"]==3 and !in_array($i,$ignore)) $ret[]=99;
                else $ret[]=0;
            }
            return $ret;
        }
    } else if ($tid<=17654) {
        $ignore = array(20,65,66,67,68,69,70,71,72,80,81,82,86,87,92);
        $ignore2 = array(20,51,52,53,55,56,57,58,65,66,67,68,69,70,71,72,73,74,75,80,81,82,86,87,92);
        /*
            "Your Common",
            "No heroes",
            "Random Rare",
            "Water and Fire",
            "Your Legendary",
            "Random Common",
            "Random Super",
            "Your Rare",
            "Earth and Air",
            "Random Legendary"
        */
        if ($tid%10==0) { // "Your Common"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==1) { // "No heroes"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%10==2) { // "Random Rare"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(150,$seed);
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and !in_array($i,$ignore) and $rnd<=99) $ret[]=$rnd;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        } else if ($tid%10==3) { // "Water and Fire"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(500,$seed);
                if (($HERO[$i]["type"]==3 or $HERO[$i]["type"]==2) and !in_array($i,$ignore) and $rnd%4==0) $ret[]=99;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        } else if ($tid%10==4) { // "Your Legendary"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==5) { // "Random Common"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(150,$seed);
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and !in_array($i,$ignore) and $rnd<=99) $ret[]=$rnd;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        } else if ($tid%10==6) { // "Random Super"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(400,$seed);
                if (!in_array($i,$ignore2) and $rnd>=100+$HERO[$i]["rarity"]*80) $ret[]=1000;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        } else if ($tid%10==7) { // "Your Rare"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==8) { // "Earth and Air"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(500,$seed);
                if (($HERO[$i]["type"]==0 or $HERO[$i]["type"]==1) and !in_array($i,$ignore) and $rnd%4==0) $ret[]=99;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        } else if ($tid%10==9) { // "Random Legendary"
            $ret=array();
            $seed = $tid;
            for ($i=0; $i<count($HERO); ++$i) {
                $rnd = doRandom(170,$seed);
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and !in_array($i,$ignore) and $rnd<=99) $ret[]=$rnd;
                else $ret[]=0;
                $seed+=$rnd+$tid;
            }
            return $ret;
        }
    } else if ($tid<=17825) {
        if ($tid%10==0) { // none,
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%10==1) { // ycommon,
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==2) { // rrare,
            $ret=array();
            $seed = $tid;
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==1 && array_search($i,$picks)===false) {
                        if ($seed%($i+1)==0) $picks[]=$i;
                        else ++$seed;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $ret[$i]=$seed%99;
                } else {
                    $ret[$i]=0;
                }
                $seed+=$i;
            }
            return $ret;
        } else if ($tid%10==3) { // ylegends,
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==4) { // rhero,
            $ret=array();
            $seed = $tid;
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]<=3 && array_search($i,$picks)===false) {
                        if ($seed%($i+1)==0) $picks[]=$i;
                        else ++$seed;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                    else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                    else $ret[$i]=$seed%99;
                } else {
                    $ret[$i]=0;
                }
                $seed+=$i;
            }
            return $ret;
        } else if ($tid%10==5) { // rcommon,
            $ret=array();
            $seed = $tid;
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==0 && array_search($i,$picks)===false) {
                        if ($seed%($i+1)==0) $picks[]=$i;
                        else ++$seed;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $ret[$i]=$seed%99;
                } else {
                    $ret[$i]=0;
                }
                $seed+=$i;
            }
            return $ret;
        } else if ($tid%10==6) { // yrare,
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==7) { // rlegends,
            $ret=array();
            $seed = $tid;
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==2 && array_search($i,$picks)===false) {
                        if ($seed%($i+1)==0) $picks[]=$i;
                        else ++$seed;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $ret[$i]=$seed%99;
                } else {
                    $ret[$i]=0;
                }
                $seed+=$i;
            }
            return $ret;
        } else if ($tid%10==8) { // yhero,
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%10==9) { // rsuper
            $ret=array();
            $seed = $tid;
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==2 && array_search($i,$picks)===false) {
                        if ($seed%($i+1)==0) $picks[]=$i;
                        else ++$seed;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $ret[$i]=1000;
                } else {
                    $ret[$i]=0;
                }
                $seed+=$i;
            }
            return $ret;
        }
    } else if ($tid<17928) {
        if ($tid==17830) return array(0,23,0,0,0,0,0,0,0,0,0,84,0,0,0,0,0,53,0,70,0,0,4,0,0,98,0,0,0,0,0,67,0,0,0,0,0,26,0,43,5,85,0,0,0,0,34,0,0,0,0,0,32,0,86,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,39,0,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
        if ($tid%13==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==1) { //"Random Legendary",
            $ret=array();
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==2 && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%2==0) $picks[]=$i;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==2) { //"Random Season",
            $ret=array();
            $sel = array(
                33,34,35,
                48,49,50,
            59,60,61,
            83,84,85,
            102,103,104,105,132,133,134,135);
            seedRNG($tid);
            $picks = array();
            while (count($picks)<12) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if (array_search($i,$sel)!==false && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if (($rnd%5)==0) $picks[]=$i;
                    }
                }   
            } 
            $rnd = getRNG();
            $superfactor = ($rnd%5)==0;
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    //$ret[$i]=$rnd%99;
                    if ($superfactor) {
                        $ret[$i]=1000;
                    } else {
                        if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                        else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                        else $ret[$i]=$rnd%99;
                    }
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==3) { //"Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==4) { //"No Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%13==5) { //"Random Event",
            $ret=array();
            $sel = array(0,1,2,
                20,
                42,43,44,
                51,52,53,
                73,74,75,76,
                96,97,98,99,
                101,
                107,108,109,
                113,136,137,138,139);
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if (array_search($i,$sel)!==false && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%5==0) $picks[]=$i;
                    }
                }   
            } 
            $rnd = getRNG();
            $superfactor = $rnd%5==0;
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                    if ($superfactor) {
                        $ret[$i]=1000;
                    } else {
                        if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                        else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                        else $ret[$i]=$rnd%99;
                    }
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==6) { //"Your Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==7) { //"Random Rare",
            $ret=array();
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==1 && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%2==0) $picks[]=$i;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==8) { //"Random Chest",
            $ret=array();
            $sel = array(7,8,9,
                10,11,12,
                13,14,15,
                16,17,18,
                21,22,23,
                24,25,26,
                30,31,32,
                36,37,38,
                45,46,47,
                62,63,64,
                77,78,79,
                93,94,95,
                110,111,112,
                140,141,142);
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if (array_search($i,$sel)!==false && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%5==0) $picks[]=$i;
                    }
                }   
            } 
            $rnd = getRNG();
            $superfactor = $rnd%5==0;
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                    if ($superfactor) {
                        $ret[$i]=1000;
                    } else {
                        if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                        else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                        else $ret[$i]=$rnd%99;
                    }
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==9) { //"Your Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==10) { //"Random Common",
            $ret=array();
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==0 && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%2==0) $picks[]=$i;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==11) { //"Random Quest",
            $ret=array();
            $sel = array(3,4,5,6,19,27,28,29,39,40,41,54,55,56,57,58,88,89,90,91,114,115,116,117,118,119,120,121,122,123,124,125);
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if (array_search($i,$sel)!==false && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%5==0) $picks[]=$i;
                    }
                }   
            } 
            $rnd = getRNG();
            $superfactor = $rnd%5==0;
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    $ret[$i]=$rnd%99;
                    if ($superfactor) {
                        $ret[$i]=1000;
                    } else {
                        if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                        else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                        else $ret[$i]=$rnd%99;
                    }
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        } else if ($tid%13==12) { //"Random Ascended"
            $ret=array();
            seedRNG($tid);
            $picks = array();
            while (count($picks)<18) {
                for ($i=0; $i<count($HERO); ++$i) {
                    if ($HERO[$i]["rarity"]==3 && array_search($i,$picks)===false) {
                        $rnd = getRNG();
                        if ($rnd%5==0) $picks[]=$i;
                    }
                }   
            } 
            for ($i=0; $i<count($HERO); ++$i) {
                if (array_search($i,$picks)!==false) {
                    $rnd = getRNG();
                    if ($HERO[$i]["rarity"]<=1) $ret[$i]=1000;
                    else if ($HERO[$i]["rarity"]==2) $ret[$i]=99;
                    else $ret[$i]=$rnd%99;
                } else {
                    $ret[$i]=0;
                }
            }
            return $ret;
        }
    } else if ($tid<18039) {
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"Random Legendary",
            return doHeros_($tid,2);
        } else if ($tid%11==2) { // "Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==3) { //"No Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%11==4) { // "Random Promotion 5",
            return doHeros_($tid,-1);
        } else if ($tid%11==5) { //"Your Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"Random Rare",
            return doHeros_($tid,1);
        } else if ($tid%11==7) { //"Random Common",
            return doHeros_($tid,0);
        } else if ($tid%11==8) { //"Your Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Heroes",
            return doHeros_($tid,-1);
        } else if ($tid%11==10) { //"Random Ascended"
            return doHeros_($tid,3);
        }
    } else if ($tid<18170) {
        // ycommon,rrarelegends,yhero,rcommonrare,rlegendsascended,yrare,rsuper,rpromo5,ylegends,rsupera,none
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"Random Legendary",
            return doHeros2($tid,[1,2]);
        } else if ($tid%11==2) { // "Your Hero",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==3) { //"Random common rare",
            return doHeros2($tid,[0,1]);
        } else if ($tid%11==4) { // "Random legends ascended",
            return doHeros2($tid,[2,3]);
        } else if ($tid%11==5) { //"Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"Random Super",
            return doHeros2($tid,[0,1,2],1000);
        } else if ($tid%11==7) { //"Random promo5",
            return doHeros2($tid,[0,1,2,3]);
        } else if ($tid%11==8) { //"Your Legends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Super A",
            return doHeros2($tid,[3],1000);
        } else if ($tid%11==10) { //"No heroes"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        }
    } else if ($tid<=18373) {
        // ycommon,rrarelegends,yhero,rcommonrare,rlegendsascended,yrare,rsuper,rpromo5,ylegends,rsupera,none
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"Random Legendary",
            return doHeros3($tid,[1,2]);
        } else if ($tid%11==2) { // "Your Hero",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==3) { //"Random common rare",
            return doHeros3($tid,[0,1]);
        } else if ($tid%11==4) { // "Random legends ascended",
            return doHeros3($tid,[2,3]);
        } else if ($tid%11==5) { //"Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"Random Super",
            return doHeros3($tid,[0,1,2],1000);
        } else if ($tid%11==7) { //"Random promo5",
            return doHeros3($tid,[0,1,2,3]);
        } else if ($tid%11==8) { //"Your Legends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Super A",
            return doHeros3($tid,[3],1000);
        } else if ($tid%11==10) { //"No heroes"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        }
    } else {
        // "Your Heroes","No Heroes","Super Ascended","Your Legendary","Random P6","Your Common","Random","Random Legendary", "Your Rare","Random Common","Super Rare",
        seedRNG($tid);
        $tmp = getRNG()%4;
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"Random Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%11==2) { // "Your Hero",
            return doHeros3($tid,[3],1000);
        } else if ($tid%11==3) { //"Random common rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==4) { // "Random legends ascended",
            return doHeros3($tid,[$tmp]);
        } else if ($tid%11==5) { //"Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"Random Super",
            return doHeros3($tid,[0,1,2,3]);
        } else if ($tid%11==7) { //"Random promo5",
            return doHeros3($tid,[2]);
        } else if ($tid%11==8) { //"Your Legends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($hero)) $ret[]=$hero[$i];
                else $ret[]=0;
            }
            return $ret;
            
        } else if ($tid%11==9) { //"Random Super A",
            return doHeros3($tid,[0]);
        } else if ($tid%11==10) { //"No heroes"
            return doHeros3($tid,[1],1000);
        }
    }
}

function hero2score($i,$lvl) {
    global $HERO;
    $hp=$HERO[$i]["hp"];
    $atk=$HERO[$i]["atk"];
    $points=1;
    if ($HERO[$i]["rarity"]==1) $points=2;
    else if ($HERO[$i]["rarity"]==2) $points=6;
    else if ($HERO[$i]["rarity"]==3) $points=12;
    $points*=$lvl;
    $sum = $hp+$atk;
    $fhp = $hp + floor(($hp/$sum)*$points);
    $fatk = $atk + floor(($atk/$sum)*$points);
    $score = $fhp*$fatk;
    return $score*sqrt($score);
}

function doHeros_($tid,$rarity) {
    seedRNG($tid);
    global $HERO;
    $ret = array();
    for ($i=0; $i<count($HERO); ++$i) {
        $ret[$i]=0;
    }
    $amount = 0;
    $base = 0;
    $times = 0;
    while ($amount<20) {
        $rnd = getRNG()%count($HERO);
        if (($HERO[$rnd]["rarity"]==$rarity||($rarity==-1 and $HERO[$rnd]["rarity"]<5)) and $ret[$rnd]==0) {
            if ($amount==0) {
                $ret[$rnd]=(getRNG()%110)+1;
                if ($ret[$rnd]>=100) $ret[$rnd]=1000;
                ++$amount;
                $base = hero2score($rnd,$ret[$rnd]);
            } else {
                $lvl = (getRNG()%110)+1;
                if ($lvl>=100) $lvl=1000;
                $score = hero2score($rnd,$lvl);
                $ratio = max($score/$base,$base/$score);
                if ($ratio<2 || $times>4000) {
                    $ret[$rnd]=$lvl;
                    ++$amount;
                }
            }
        }
        ++$times;
    }
    return $ret;
}
function doHeros2($tid,$rarity=-1,$level=-1) {
    global $HERO;
    $POOLS = array(
        array(0,1,2,3,4,5,6,19,20,27,28,29,39,40,41,42,43,44,51,52,53,54,55,56,57,58,73,74,75,76,80,88,89,90,91,96,97,98,99,101,107,108,109,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,130,136,137,138,139,148,152,153,154,155,156,157,158,159,160,161,162,163,164,168),
        array(7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,30,31,32,33,34,35,36,37,38,45,46,47,48,49,50,59,60,61,62,63,64,65,66,67,68,69,70,71,77,78,79,81,82,83,84,85,86,92,93,94,95,100,102,103,104,105,110,111,112,131,132,133,134,135,140,141,142,143,144,145,146,147,149,150,151,165,166,167,169,170)
    );
    $AMOUNTS = array(5,10,15,20,25);
    $limit = $AMOUNTS[$tid%count($AMOUNTS)];
    $pool = $POOLS[$tid%count($POOLS)];
    $ret = array();
    for ($i=0; $i<count($HERO); ++$i) {
        $ret[$i]=0;
    }
    $amount = 0;
    $base = 0;
    $times = 0;
    $max = 5000;
    seedRNG($tid);
    while ($amount<$limit && --$max) {
        $rnd = getRNG()%count($pool);
        $hid = $pool[$rnd];
        if ($ret[$hid]==0 && (($rarity==-1&&$HERO[$hid]["rarity"]<5) || (in_array($HERO[$hid]["rarity"],$rarity)))) {
            if ($amount==0) {
                $ret[$hid]=(getRNG()%99)+1;
                if ($level!==-1) $ret[$hid]=$level;
                ++$amount;
                $base = hero2score($hid,$ret[$hid]);
            } else {
                $lvl = (getRNG()%99)+1;
                if ($level!==-1) $lvl=$level;
                $score = hero2score($hid,$lvl);
                $ratio = max($score/$base,$base/$score);
                if ($ratio<2 || $times>4000) {
                    $ret[$hid]=$lvl;
                    ++$amount;
                }
            }
        }
        ++$times;
    }
    return $ret;
}

function doHeros3($tid,$rarity=-1,$level=-1) {
    global $HERO;
    $POOLS = [
        [0,1,2,3,4,5,6,19,20,27,28,29,39,40,41,42,43,44,51,52,53,54,55,56,57,58,73,74,75,76,80,88,89,90,91,96,97,98,99,101,107,108,109,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,130,136,137,138,139,148,152,153,154,155,156,157,158,159,160,161,162,163,164,175,180,185],
        [7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,30,31,32,33,34,35,36,37,38,45,46,47,48,49,50,59,60,61,62,63,64,65,66,67,68,69,70,71,77,78,79,81,82,83,84,85,86,92,93,94,95,100,102,103,104,105,110,111,112,131,132,133,134,135,140,141,142,143,144,145,146,147,149,150,151,165,166,167,169,170,171,172,173,174,176,177,178,179,181,182,183,184,187,188,189,190,191,192,193,194]
    ];
    $AMOUNTS = array(5,10,15,20,25);
    $limit = $AMOUNTS[$tid%count($AMOUNTS)];
    $pool = $POOLS[$tid%count($POOLS)];
    $ret = array();
    for ($i=0; $i<count($HERO); ++$i) {
        $ret[$i]=0;
    }
    $amount = 0;
    $base = 0;
    $times = 0;
    $max = 5000;
    seedRNG($tid);
    while ($amount<$limit && --$max) {
        $rnd = getRNG()%count($pool);
        $hid = $pool[$rnd];
        if ($ret[$hid]==0 && (($rarity==-1&&$HERO[$hid]["rarity"]<5) || (in_array($HERO[$hid]["rarity"],$rarity)))) {
            if ($amount==0) {
                $ret[$hid]=(getRNG()%99)+1;
                if ($level!==-1) $ret[$hid]=$level;
                ++$amount;
                $base = hero2score($hid,$ret[$hid]);
            } else {
                $lvl = (getRNG()%99)+1;
                if ($level!==-1) $lvl=$level;
                $score = hero2score($hid,$lvl);
                $ratio = max($score/$base,$base/$score);
                if ($ratio<2 || $times>4000) {
                    $ret[$hid]=$lvl;
                    ++$amount;
                }
            }
        }
        ++$times;
    }
    return $ret;
}


function tid2promo($tid,$promo) {
    global $HERO;
    if ($tid<17888) {
        return array_fill(0,count($HERO),0);
    } else if ($tid<17928) {
        if ($tid==17830) return array(0,23,0,0,0,0,0,0,0,0,0,84,0,0,0,0,0,53,0,70,0,0,4,0,0,98,0,0,0,0,0,67,0,0,0,0,0,26,0,43,5,85,0,0,0,0,34,0,0,0,0,0,32,0,86,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,39,0,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
        if ($tid%13==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==0 and $i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==1) { //"Random Legendary",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==2) { //"Random Season",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==3) { //"Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==1 and $i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==4) { //"No Heroes",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==5) { //"Random Event",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==6) { //"Your Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]==2 and $i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==7) { //"Random Rare",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==8) { //"Random Chest",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==9) { //"Your Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($HERO[$i]["rarity"]<=3 and $i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%13==10) { //"Random Common",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==11) { //"Random Quest",
            return array_fill(0,count($HERO),0);
        } else if ($tid%13==12) { //"Random Ascended"
            return array_fill(0,count($HERO),0);
        }
    } else if ($tid<18039) {
        seedRNG($tid);
        $rnd = getRNG()%6;
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"Random Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==2) { // "Your Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==3) { //"No Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%11==4) { // "Random Promotion 5",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=5;
            return $ret;
        } else if ($tid%11==5) { //"Your Legendary",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"Random Rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==7) { //"Random Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==8) { //"Your Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Heroes",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==10) { //"Random Ascended"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        }
    } else if ($tid<=18373) {

        // ycommon,rrarelegends,yhero,rcommonrare,rlegendsascended,yrare,rsuper,rpromo5,ylegends,rsupera,none
        seedRNG($tid);
        $rnd = getRNG()%6;
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==1) { //"rrarelegends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==2) { // "Your Hero",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==3) { //"common rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==4) { // "legend ascended",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==5) { //"Your rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"rsuper",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==7) { //"Random promo 5",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=5;
            return $ret;
        } else if ($tid%11==8) { //"Your Legends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Super",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==10) { //"None"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        }
    } else {
        // ycommon,rrarelegends,yhero,rcommonrare,rlegendsascended,yrare,rsuper,rpromo5,ylegends,rsupera,none
        seedRNG($tid);
        $rnd = getRNG()%6;
        if ($tid%11==0) { //"Your Common",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
            
        } else if ($tid%11==1) { //"rrarelegends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=0;
            return $ret;
        } else if ($tid%11==2) { // "Your Hero",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==3) { //"common rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==4) { // "legend ascended",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=6;
            return $ret;
        } else if ($tid%11==5) { //"Your rare",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==6) { //"rsuper",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=getRNG()%6;
            return $ret;
        } else if ($tid%11==7) { //"Random promo 5",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==8) { //"Your Legends",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) {
                if (!isset($HERO[$i]["rarity"])) error_log("HERO $i undefined rarity");
                else if ($i<count($promo)) $ret[]=$promo[$i];
                else $ret[]=0;
            }
            return $ret;
        } else if ($tid%11==9) { //"Random Super",
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        } else if ($tid%11==10) { //"None"
            $ret=array();
            for ($i=0; $i<count($HERO); ++$i) $ret[]=$rnd;
            return $ret;
        }
    }
}

function tid2max($tid) {
    if ($tid<17499) {
        $arr=array(6,6,6,6,1);
        return $arr[$tid%count($arr)];
    } else {
        return 6;
    }
}
?>
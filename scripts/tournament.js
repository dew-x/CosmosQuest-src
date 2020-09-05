var mysql      = require('mysql');
var PlayFab = require("playfab-sdk/Scripts/PlayFab/PlayFab.js");
var PlayFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer.js");
const fs = require('fs');
var connection = mysql.createConnection({
    host     : 'host',
    user     : 'user',
    password : 'password',
    database : 'database'
  });
  var Twitter = require('twitter');
  var tclient = new Twitter({
    consumer_key: 'consumer_key',
    consumer_secret: 'consumer_secret',
    access_token_key: 'access_token_key',
    access_token_secret: 'access_token_secret'
  });
  var request = require('sync-request');
  var KONGAPI = "KONGAPI";
  var playfabId = "E3FA";
  PlayFab.settings.titleId = playfabId;
  var playfabSecret = "playfabSecret";
  PlayFab.settings.developerSecretKey = playfabSecret;
var TYPES = [3,0,1,2];
var Q = [];

var start=Date.now();
connection.connect();

function kongstat(kid,score) {
    if (kid!==0) {
        var url="https://api.kongregate.com/api/submit_statistics.json";
        var res = request('POST', url, {
            headers: {       
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: "api_key="+KONGAPI+"&user_id="+kid+"&tournaments11="+score
        });
    }
}

function doQueue() {
    if (Q.length>0) {
        var elem=Q.shift();
        playfab(elem);
    } else {
        connection.query('SELECT id,tid FROM tournaments WHERE status=1 ORDER BY tid ASC LIMIT 1', function (error, results, fields) {
            if (error) throw error;
            var tid=results[0].tid;
            var cid=results[0].id;
            connection.query('UPDATE tournaments SET status=2 WHERE id='+cid, function (a,b,c) {});
            connection.end();
        });
    }
}

function doKey() {
    var content=fs.readFileSync('/home/ec2-user/coupons.csv','utf8');
    var arr = content.split(",");
    var ret = arr.pop();
    fs.writeFileSync('/home/ec2-user/coupons.csv',arr.join(","));
    if (ret=="") ret="ain-gq5h-7io";
    var c="=.:#@!~&%?/¬|".split("");
    var len=Math.round(Math.random()*4)+2;
    for (var i=0; i<len; ++i) {
        var a=c[Math.floor(Math.random()*c.length)];
        ret=a+ret+a;
    }
    return ret;
}

function playfab(params) {
    PlayFabServer.ExecuteCloudScript(
        params, function (a,b) {
            if (a!=null) {
                ++params.retries;
                if (params.retries<10) Q.push(params);
            } else {
            }
            doQueue();
        }
    );
}

function mfight(rowA,rowB,heroA,heroB,promoA,promoB) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB,undefined,undefined,promoA,promoB);
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function fight(a,b) {
    var dmga=0;
    var dmgb=0;
    var awin=0;
    var bwin=0;
    var draw=0;
    for (var i=0; i<5; ++i) {
        var fres = mfight(a.setup.slice(i*6,(i+1)*6),b.setup.slice(i*6,(i+1)*6),a.hero,b.hero,a.promo,b.promo);
        if (fres.result==0) ++draw;
        else if (fres.result==1) ++awin;
        else ++bwin;
        dmga+=fres.dmga;
        dmgb+=fres.dmgb;
    }
    var ret = {
        dmga: dmga,
        dmgb: dmgb,
        result: undefined,
        draw: false,
        awin: awin,
        bwin: bwin,
        draws: draw,
    }
    if (awin>bwin) ret.result=0;
    else if (bwin>awin) ret.result=1;
    else {
        ret.draw=true;
        if (dmga>dmgb) ret.result=0;
        else if (dmgb>dmga) ret.result=1;
        else ret.result=Math.floor(Math.random()*2)%2;
    }
    return ret;
}

/*function computeTHERO() {
    var all99=Array(HERO.length);
    var superCommon=Array(HERO.length);
    var oneperline=Array(HERO.length);
    var none=Array(HERO.length);
    var ignore = [20,42,43,44];
    for (var i=0; i<HERO.length; ++i) {
        // oneperline
        if (HERO[i].rarity==2 && ignore.indexOf(i)===-1) oneperline[i]=15;
        else if (HERO[i].rarity==1 && ignore.indexOf(i)===-1) oneperline[i]=50;
        else if (HERO[i].rarity==0 && ignore.indexOf(i)===-1) oneperline[i]=99;
        else oneperline[i]=0;
        // superCommon
        if (HERO[i].rarity==0) superCommon[i]=1000;
        else superCommon[i]=0;
        // all99
        if (ignore.indexOf(i)===-1) all99[i]=99;
        else all99[i]=0;
        none[i]=0; 
    }
    if (Math.floor(Date.now()/(24*60*60*1000))<=17351) legen[20]=0;
    var THERO = [superCommon,none,undefined,all99,oneperline];
    return THERO;
}*/

function RNG(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
    for (var i=0; i<100; ++i) this.next();
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
RNG.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
};


/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
RNG.prototype.nextFloat = function (opt_minOrMax, opt_max) {
// We know that result of next() will be 1 to 2147483646 (inclusive).
    return (this.next() - 1) / 2147483646;
};
function hero2score(i,lvl) {
    hp=HERO[i]["hp"];
    atk=HERO[i]["atk"];
    points=1;
    if (HERO[i]["rarity"]==1) points=2;
    else if (HERO[i]["rarity"]==2) points=6;
    else if (HERO[i]["rarity"]==3) points=12;
    points*=lvl;
    sum = hp+atk;
    fhp = hp + Math.floor((hp/sum)*points);
    fatk = atk + Math.floor((atk/sum)*points);
    score = fhp*fatk;
    return score*Math.sqrt(score);
}

function doHeros(tid,rarity,level) {
    var POOLS = [
        [0,1,2,3,4,5,6,19,20,27,28,29,39,40,41,42,43,44,51,52,53,54,55,56,57,58,73,74,75,76,80,88,89,90,91,96,97,98,99,101,107,108,109,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,130,136,137,138,139,148,152,153,154,155,156,157,158,159,160,161,162,163,164,175,180,185],
        [7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,30,31,32,33,34,35,36,37,38,45,46,47,48,49,50,59,60,61,62,63,64,65,66,67,68,69,70,71,77,78,79,81,82,83,84,85,86,92,93,94,95,100,102,103,104,105,110,111,112,131,132,133,134,135,140,141,142,143,144,145,146,147,149,150,151,165,166,167,169,170,171,172,173,174,176,177,178,179,181,182,183,184,187,188,189,190,191,192,193,194]
    ];
    var AMOUNTS = [5,10,15,20,25];
    var limit = AMOUNTS[tid%AMOUNTS.length];
    var pool = POOLS[tid%POOLS.length];
    ret = [];
    for (i=0; i<HERO.length; ++i) {
        ret[i]=0;
    }
    amount = 0;
    base = 0;
    times = 0;
    max = 5000;
    var rng = new RNG(tid);
    while (amount<limit && --max) {
        rnd = rng.next()%pool.length;
        hid = pool[rnd];
        if (ret[hid]==0 && ((rarity==-1&&HERO[hid].rarity<5) || (rarity.indexOf(HERO[hid].rarity)!==-1))) {
            if (amount==0) {
                ret[hid]=(rng.next()%99)+1;
                if (level!==undefined) ret[hid]=level;
                ++amount;
                base = hero2score(hid,ret[hid]);
            } else {
                lvl = (rng.next()%99)+1;
                if (level!==undefined) lvl=level;
                score = hero2score(hid,lvl);
                ratio = Math.max(score/base,base/score);
                if (ratio<2 || times>4000) {
                    ret[hid]=lvl;
                    ++amount;
                }
            }
        }
        ++times;
    }
    return ret;
}

function computeTPROMO(tid) {
    var ycommon=Array(HERO.length);
    var yrare=Array(HERO.length);
    var ylegends=Array(HERO.length);
    var yhero=Array(HERO.length);
    var none=Array(HERO.length);
    var rng = new RNG(tid);
    var rnd = rng.next()%6;
    var rcommon=Array(HERO.length);
    var rfull=Array(HERO.length);
    var rlegend=Array(HERO.length);

    var rsupera=Array(HERO.length);
    var rsuperr=Array(HERO.length);

    var rpromo6=Array(HERO.length);

    for (var i=0; i<HERO.length; ++i) {
        // none
        none[i]=0; 
        rpromo6[i]=6;
        rcommon[i]=rnd;
        rfull[i]=rng.next()%6;
        rlegend[i]=rnd;
        rsuperr[i]=rnd;
        rsupera[i]=rnd;
        // ycommon
        if (HERO[i].rarity==0) ycommon[i]=-1;
        else ycommon[i]=0;
        // yrares
        if (HERO[i].rarity==1) yrare[i]=-1;
        else yrare[i]=0;
        // ylegends
        if (HERO[i].rarity==2) ylegends[i]=-1;
        else ylegends[i]=0;
        // yhero
        yhero[i]=-1;
    }

    return [yhero,none,rsupera,ylegends,rpromo6,ycommon,rfull,rlegend,yrare,rcommon,rsuperr];

}

function computeTHERO(tid) {
    var ycommon=Array(HERO.length);
    var yrare=Array(HERO.length);
    var ylegends=Array(HERO.length);
    var yhero=Array(HERO.length);
    var none=Array(HERO.length);

    var rcommon=doHeros(tid,[0]);
    var rlegend=doHeros(tid,[2]);
    var rfull=doHeros(tid,[0,1,2,3]);

    var rsuperr=doHeros(tid,[1],1000);
    var rsupera=doHeros(tid,[3],1000);
    var rng = new RNG(tid);
    var rpromo6=doHeros(tid,[rng.next()%4]);

    for (var i=0; i<HERO.length; ++i) {
        // none
        none[i]=0; 
        // ycommon
        if (HERO[i].rarity==0) ycommon[i]=-1;
        else ycommon[i]=0;
        // yrares
        if (HERO[i].rarity==1) yrare[i]=-1;
        else yrare[i]=0;
        // ylegends
        if (HERO[i].rarity==2) ylegends[i]=-1;
        else ylegends[i]=0;
        // yhero
        yhero[i]=-1;
    }
    /*
    Your Heroes
    No Heroes
    Super Ascended (Level 1,000 Ascended)
    Your Legendary
    Random P6 (All same rarity)
    Your Common
    Random (Complete random, random rarity, promo, everything)
    Random Legendary 
    Your Rare
    Random Common
    Super Rare (Level 1,000 Rares) 
    */
    return [yhero,none,rsupera,ylegends,rpromo6,ycommon,rfull,rlegend,yrare,rcommon,rsuperr];
}

function pos2perc(pos,total) {
    var padding = 2; // 0 beneficiates top 1 greater than 0 punished top 1
    var k = 0.1; // smaller than 1 more equal rewards greater than 2 less equal rewards

    // no touch
    var sum = 0;

    for (var i=1; i<=total; ++i) {
        sum+=1/(i*k+padding);
    }

    
    return 1/(pos*k+padding)/sum;
}

function tprize(pos,total,price) {
    var pool=price*total*1000;
    return Math.round(pool*pos2perc(pos,total));
}

function tid2cost(tid) {
    if (tid<=17349) return 10;
    var arr=[125,125,250,400,125,125,50];
    return arr[tid%7];
}

var TPG = {
    "0":[30,25,21,19,17,15,13,11,9],
    "10":[25,20,16,14,12,10,8,6,4],
    "50":[30,25,21,19,17,15,13,11,9],
    "100": [40,30,24,21,18,15,12,9,6],
    "125": [55,45,39,35,33,30,27,24,21],
    "200": [50,40,32,28,24,20,16,12,8],
    "250": [80,70,62,58,54,50,46,42,38],
    "400": [120,105,97,89,81,77,73,69,65],
    "500": [100,80,64,54,48,40,32,24,16],
}

function pos2pg(pos,tid) {
    var price = tid2cost(tid);
    if (pos<1) return 1;
    else if (pos<=10) return TPG[price][0];
    else if (pos<=25) return TPG[price][1];
    else if (pos<=50) return TPG[price][2];
    else if (pos<=100) return TPG[price][3];
    else if (pos<=200) return TPG[price][4];
    else if (pos<=400) return TPG[price][5];
    else if (pos<=600) return TPG[price][6];
    else if (pos<=1000) return TPG[price][7];
    else return TPG[price][8];
}

function elimination(players, battles) {
    var len=Math.pow(2,Math.ceil(Math.log2(players.length)));
    var brackets=Array(len).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        if (i*2<len) brackets[i*2]=i;
        else {
            if (brackets[((i*2)%len)+1]!==undefined) console.log("BAD");
            brackets[((i*2)%len)+1]=i;
        }
    }
    var round=0;
    var pos=players.length;
    while (len>1) {
        var eliminated=[];
        var next=Array(len/2).fill(undefined);
        for (var i=0; i<len; i+=2) {
            if (brackets[i+1]==undefined) {
                battles.push({
                    rid: round,
                    aid: players[brackets[i]].id,
                    bid: 0,
                    result: 0
                });
                next[i/2]=brackets[i];
            } else {
                var fres=fight(players[brackets[i]],players[brackets[i+1]]);
                battles.push({
                    rid: round,
                    aid: players[brackets[i]].id,
                    bid: players[brackets[i+1]].id,
                    result: fres.result
                });
                if (fres.result==0) {
                    next[i/2]=brackets[i];
                    eliminated.push({id:brackets[i+1],dmg:fres.dmgb});
                } else {
                    next[i/2]=brackets[i+1];
                    eliminated.push({id:brackets[i],dmg:fres.dmga});
                }
            }
        }
        eliminated.sort(function (a,b) {
            return a.dmg-b.dmg;
        });
        for (var i=0; i<eliminated.length; ++i) {
            players[eliminated[i].id].pos=pos;
            --pos;
        }
        ++round;
        len/=2;
        brackets=next;
    }
    players[next[0]].pos=pos;
}

function swiss(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            w: 0,
            dmg: 0,
            fighted: []
        }
    }
    while (ladder.length>1) {
        var rounds=Math.min(7,Math.floor(Math.log2(ladder.length)));
        for (var i=0; i<rounds; ++i) {
            var used=[];
            for (var j=0; j<ladder.length; ++j) {
                if (used.indexOf(j)===-1) { 
                    var next=j+1;
                    while (next<ladder.length && ladder[j].fighted.indexOf(ladder[next].pid)!==-1) {
                        ++next;
                    }
                    used.push(j);
                    used.push(next);
                    if (next>=ladder.length) {
                        battles.push({
                            rid: round,
                            aid: players[ladder[j].pid].id,
                            bid: 0,
                            result: 0
                        });
                        ++ladder[j].w;
                    } else {
                        var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                        ladder[j].fighted.push(ladder[next].pid);
                        ladder[next].fighted.push(ladder[j].pid);
                        battles.push({
                            rid: round,
                            aid: players[ladder[j].pid].id,
                            bid: players[ladder[next].pid].id,
                            result: fres.result
                        });
                        if (fres.result==0) {
                            ++ladder[j].w;
                        } else {
                            ++ladder[next].w;
                        }
                        ladder[j].dmg+=fres.dmga;
                        ladder[next].dmg+=fres.dmgb;
                    }
                }
            }
            ladder.sort(function (a,b) {
                if (a.w==b.w) return b.dmg-a.dmg;
                else return b.w-a.w;
            });
            ++round;
        }
        var mid=Math.ceil(ladder.length/2);
        while (ladder.length>mid) {
            var toDel = ladder.pop();
            players[toDel.pid].pos=pos;
            --pos;
        }
        for (var i=0; i<ladder.length; ++i) {
            ladder[i].w=0;
            ladder[i].dmg=0; 
            ladder[i].fighted=[]; 
        }
    }
    players[ladder[0].pid].pos=pos;
}

function roundrobin(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            w: 0,
            dmg: 0
        }
    }
    var end=false;
    while (!end) {
        var groups=Array(Math.ceil(ladder.length/8));
        for (var i=0; i<ladder.length; ++i) {
            if (groups[i%groups.length]==undefined) groups[i%groups.length]=[];
            groups[i%groups.length].push(i);    
        }
        var toDel = [];
        for (var i=0; i<groups.length; ++i) {
            for (var j=0; j<groups[i].length; ++j) {
                for (var k=j+1; k<groups[i].length; ++k) {
                    var aid=groups[i][j];
                    var bid=groups[i][k];
                    var fres=fight(players[ladder[aid].pid], players[ladder[bid].pid]);
                    battles.push({
                        rid: round,
                        aid: players[ladder[aid].pid].id,
                        bid: players[ladder[bid].pid].id,
                        result: fres.result
                    });
                    if (fres.result==0) {
                        ++ladder[aid].w;
                    } else {
                        ++ladder[bid].w;
                    }
                    ladder[aid].dmg+=fres.dmga;
                    ladder[bid].dmg+=fres.dmgb;
                }
            }
            var top3 = [];
            while (top3.length<3) {
                var bestID=-1;
                for (var j=0; j<groups[i].length; ++j) {
                    if (top3.indexOf(j)===-1) {
                        if (bestID==-1) bestID=j;
                        else if (ladder[groups[i][j]].w>ladder[groups[i][bestID]].w) bestID=j;
                        else if (ladder[groups[i][j]].w==ladder[groups[i][bestID]].w&&ladder[groups[i][j]].dmg>ladder[groups[i][bestID]].dmg) bestID=j;
                    }
                }
                top3.push(bestID);
            }
            for (var j=0; j<groups[i].length; ++j) {
                if (top3.indexOf(j)===-1) toDel.push(ladder[groups[i][j]].pid);
            }
        }
        ladder.sort(function (a,b) {
            if (a.w==b.w) return b.dmg-a.dmg;
            else return b.w-a.w;
        });
        for (var i=ladder.length-1; i>=0; --i) {
            ladder[i].w=0;
            ladder[i].dmg=0;
            if (toDel.indexOf(ladder[i].pid)!==-1) {
                players[ladder[i].pid].pos=pos;
                --pos;
                ladder.splice(i,1);
            } 
        }
        if (ladder.length<=3) {
            for (var i=ladder.length-1; i>=0; --i) {
                players[ladder[i].pid].pos=pos;
                --pos;
            }
            end=true;
        }
        ++round;
    }
}

function doubleElim(players, battles) {
    var len=Math.pow(2,Math.ceil(Math.log2(players.length)));
    var brackets=Array(len).fill(undefined);
    var losers=[];
    for (var i=0; i<players.length; ++i) {
        if (i*2<len) brackets[i*2]=i;
        else {
            if (brackets[((i*2)%len)+1]!==undefined) console.log("BAD");
            brackets[((i*2)%len)+1]=i;
        }
    }
    var round=0;
    var pos=players.length;
    while (len>1) {
        losers.push([]);
        var next=Array(len/2).fill(undefined);
        for (var i=0; i<len; i+=2) {
            if (brackets[i+1]==undefined) {
                battles.push({
                    rid: round,
                    aid: players[brackets[i]].id,
                    bid: 0,
                    result: 0
                });
                next[i/2]=brackets[i];
                losers[round].push(undefined);
            } else {
                var fres=fight(players[brackets[i]],players[brackets[i+1]]);
                battles.push({
                    rid: round,
                    aid: players[brackets[i]].id,
                    bid: players[brackets[i+1]].id,
                    result: fres.result
                });
                if (fres.result==0) {
                    next[i/2]=brackets[i];
                    losers[round].push(brackets[i+1]);
                } else {
                    next[i/2]=brackets[i+1];
                    losers[round].push(brackets[i]);
                }
            }
        }
        ++round;
        len/=2;
        brackets=next;
    }
    losers[round]=[brackets[0]];
    var survivors=losers[0];
    var lID = 1;
    var mode = 1;
    while (survivors.length>1||lID<losers.length) {
        var next=[];
        //console.log(survivors.length);
        if (lID<losers.length&&survivors.length==losers[lID].length) {
            //console.log("Read",lID);
            for (var i=0; i<survivors.length; ++i) {
                next.push(losers[lID][i]);
                next.push(survivors[i]);
            }
            ++lID;
        } else {
            //console.log("Solve");
            var eliminated=[];
            for (var i=0; i<survivors.length; i+=2) {
                if (survivors[i+1]==undefined&&survivors[i]==undefined) {
                    next.push(undefined);
                } else if (survivors[i+1]==undefined) {
                    battles.push({
                        rid: round,
                        aid: players[survivors[i]].id,
                        bid: 0,
                        result: 0
                    });
                    next.push(survivors[i]);
                } else if (survivors[i]==undefined) {
                    battles.push({
                        rid: round,
                        aid: players[survivors[i+1]].id,
                        bid: 0,
                        result: 0
                    });
                    next.push(survivors[i+1]);
                } else {
                    var fres=fight(players[survivors[i]],players[survivors[i+1]]);
                    battles.push({
                        rid: round,
                        aid: players[survivors[i]].id,
                        bid: players[survivors[i+1]].id,
                        result: fres.result
                    });
                    if (fres.result==0) {
                        next.push(survivors[i]);
                        eliminated.push({id:survivors[i+1],dmg:fres.dmgb});
                    } else {
                        next.push(survivors[i+1]);
                        eliminated.push({id:survivors[i],dmg:fres.dmga});
                    }
                }
            }
            //console.log("Elim",eliminated.length);
            eliminated.sort(function (a,b) {
                return a.dmg-b.dmg;
            });
            for (var i=0; i<eliminated.length; ++i) {
                players[eliminated[i].id].pos=pos;
                --pos;
            }
            ++round;
            if (mode%2==1) next.reverse();
            ++mode;
        }
        survivors=next;
    }
    players[survivors[0]].pos=pos;
}

function expected(A, B) {
    return 1 / (1 + Math.pow(10,((B - A) / 400)));
}


function elo(old, exp, score) {
    var k=32;
    return Math.round(old + k * (score - exp));
}

function league20(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            w: 0,
            dmg: 0,
            elo: 1000
        }
    }
    var unique = [];
    while (round<30) {
        var done = [];
        for (var j=0; j<ladder.length; ++j) {
            if (done.indexOf(j)===-1) {
                // find a match for the player
                next = j+1;
                while ((next<players.length&&unique.indexOf(ladder[j].pid+"_"+ladder[next].pid)!==-1) || done.indexOf(next)!==-1) {
                    ++next;
                }
                if (next<ladder.length) {
                    // avoid repeat
                    done.push(j);
                    done.push(next);
                    unique.push(ladder[j].pid+"_"+ladder[next].pid);
                    unique.push(ladder[next].pid+"_"+ladder[j].pid);
                    // fight
                    var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: players[ladder[next].pid].id,
                        result: fres.result
                    });
                    // elo
                    var expA=expected(ladder[j].elo,ladder[next].elo);
                    var expB=expected(ladder[next].elo,ladder[j].elo);
                    if (fres.result==0) {
                        ++ladder[j].w;
                        ladder[j].elo = elo(ladder[j].elo,expA,1);
                        ladder[next].elo = elo(ladder[next].elo,expB,0);
                    } else {
                        ++ladder[next].w;
                        ladder[j].elo = elo(ladder[j].elo,expA,0);
                        ladder[next].elo = elo(ladder[next].elo,expB,1);
                    }
                    ladder[j].dmg+=fres.dmga;
                    ladder[next].dmg+=fres.dmgb;
                } else {
                    done.push(j);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: 0,
                        result: 0
                    });
                }
            }
        }
        ladder.sort(function (a,b) {
            if (a.elo==b.elo) {
                if (b.w==a.w) return b.dmg-a.dmg;
                else return b.w-a.w;
            } else return b.elo-a.elo;
        });
        ++round;
    }
    var pos=players.length;
    for (var j=pos-1; j>=0; --j) {
        players[ladder[j].pid].pos=pos;
        --pos;
    }
}

function random5(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            dmg: 0,
            lives: Math.min(5,players.length)
        }
    }
    var unique = [];
    var any=true;
    while (any) {
        shuffle(ladder);
        any=false;
        var done = [];
        for (var j=0; j<ladder.length; ++j) {
            if (done.indexOf(j)===-1) {
                // find a match for the player
                next = j+1;
                while ((next<ladder.length&&unique.indexOf(ladder[j].pid+"_"+ladder[next].pid)!==-1) || done.indexOf(next)!==-1) {
                    ++next;
                }
                if (next<ladder.length) {
                    any=true;
                    // avoid repeat
                    done.push(j);
                    done.push(next);
                    unique.push(ladder[j].pid+"_"+ladder[next].pid);
                    unique.push(ladder[next].pid+"_"+ladder[j].pid);
                    // fight
                    var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: players[ladder[next].pid].id,
                        result: fres.result
                    });
                    // elo
                    if (fres.result==0) {
                        --ladder[next].lives;
                    } else {
                        --ladder[j].lives;
                    }
                    ladder[j].dmg+=fres.dmga;
                    ladder[next].dmg+=fres.dmgb;
                } else {
                    done.push(j);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: 0,
                        result: 0
                    });
                }
            }
        }
        ladder.sort(function (a,b) {
            if (a.lives==b.lives) {
                return b.dmg-a.dmg;
            } else return b.lives-a.lives;
        });
        while (ladder[ladder.length-1].lives==0) {
            players[ladder[ladder.length-1].pid].pos=pos;
            --pos;
            ladder.pop();
        }
        ++round;
    }
    for (var j=ladder.length-1; j>=0; --j) {
        players[ladder[j].pid].pos=pos;
        --pos;
    }
}

function multilevel(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            dmg: 0,
            level: 0
        }
    }
    var cap=-50;
    shuffle(ladder);
    var unique = [];          
    while (ladder.length) {
        var done = [];
        for (var j=ladder.length-1; j>=0; --j) {
            if (done.indexOf(j)===-1) {
                next = j-1;
                while ((next>=0&&unique.indexOf(ladder[j].pid+"_"+ladder[next].pid)!==-1) || done.indexOf(next)!==-1) {
                    --next;
                }
                if (next>=0) {
                    done.push(j);
                    done.push(next);
                    unique.push(ladder[j].pid+"_"+ladder[next].pid);
                    unique.push(ladder[next].pid+"_"+ladder[j].pid);
                    var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: players[ladder[next].pid].id,
                        result: fres.result
                    });
                    // elo
                    if (fres.result==0) {
                        ++ladder[j].level;
                        --ladder[next].level;
                    } else {
                        --ladder[j].level;
                        ++ladder[next].level;
                    }
                    ladder[j].dmg+=fres.dmga;
                    ladder[next].dmg+=fres.dmgb;
                } else {
                    done.push(j);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: 0,
                        result: 0
                    });
                    ladder[j].level+=0.5;
                }
            }
        }
        
        ladder.sort(function (a,b) {
            if (a.level==b.level) {
                return a.dmg-b.dmg;
            } else return a.level-b.level;
        });
        while (ladder.length && ladder[0].level<=cap) {
            players[ladder[0].pid].pos=pos;
            --pos;
            ladder.shift();
        }
        ++round;
        cap+=2;
    }
}

function pagerank(players, battles) {
    var data = [];
    for (var i=0; i<players.length; ++i) {
        data.push({
            id: i,
            rank: 1/players.length,
            newrank: undefined,
            link: [],
            w: 0,
            d: 0,
            l: 0,
        })
        for (var j=0; j<i-1; ++j) {
            var res = fight(players[j],players[i]);
            if (res.result==0) {
                data[j].w++;
                data[i].l++;
                data[j].link.push(i);
            } else if (res.result==1) {
                data[i].w++;
                data[i].link.push(j);
                data[j].l++;
            } else {
                data[j].link.push(i);
                data[i].link.push(j);
                data[j].d++;
                data[i].d++;
            }
        }
    }

    for (var i=0; i<1000; ++i) {
        for (var j=0; j<data.length; ++j) {
            data[j].newrank = 0;
            for (var k=0; k<data[j].link.length; ++k) {
                var other = data[data[j].link[k]];
                data[j].newrank += other.rank/(other.d+other.l);
            }
        }
        for (var j=0; j<data.length; ++j) {
            data[j].rank = data[j].newrank; 
        }
    }
    data.sort(function (a,b) {return b.rank-a.rank});
    var used = Array(players.length).fill(0);
    for (var i=0; i<data.length; ++i) {
        players[data[i].id].pos=i+1;
        var done = used[data[i].id];
        for (var j=0; j<data.length; ++j) {
            if (j!=i) {
                if (data[i].link.indexOf(data[j].id)!==-1&&data[j].link.indexOf(data[i].id)===-1) {
                    battles.push({
                        rid: done,
                        aid: players[data[i].id].id,
                        bid: players[data[j].id].id,
                        result: 0
                    });
                    ++done;
                    ++used[data[j].id];
                    if (done>=25) break;
                }
            }
        }
        if (done<25) {
            for (var j=data.length-1; j>=0; --j) {
                if (j!=i) {
                    if (data[i].link.indexOf(data[j].id)===-1&&data[j].link.indexOf(data[i].id)!==-1) {
                        battles.push({
                            rid: done,
                            aid: players[data[i].id].id,
                            bid: players[data[j].id].id,
                            result: 1
                        });
                        ++done;
                        ++used[data[j].id];
                        if (done>=25) break;
                    }
                }
            }
        }
    }
}

function laneleague(players, battles) {
    var round=0;
    var pos=players.length;
    var ladder=Array(players.length).fill(undefined);
    for (var i=0; i<players.length; ++i) {
        ladder[i]={
            pid: i,
            w: 0,
            dmg: 0,
            wf: 0,
            dmgf: 0,
        }
    }
    var unique = [];
    while (round<36) {
        var done = [];
        for (var j=0; j<ladder.length; ++j) {
            if (done.indexOf(j)===-1) {
                // find a match for the player
                next = j+1;
                while ((next<ladder.length&&unique.indexOf(ladder[j].pid+"_"+ladder[next].pid)!==-1) || done.indexOf(next)!==-1) {
                    ++next;
                }
                if (next<ladder.length) {
                    // avoid repeat
                    done.push(j);
                    done.push(next);
                    unique.push(ladder[j].pid+"_"+ladder[next].pid);
                    unique.push(ladder[next].pid+"_"+ladder[j].pid);
                    // fight
                    var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                    ladder[j].w+=fres.awin*3+fres.draws;
                    ladder[j].dmg+=fres.dmga;
                    ladder[next].w+=fres.bwin*3+fres.draws;
                    ladder[next].dmg+=fres.dmgb;
                } else {
                    done.push(j);
                }
            }
        }
        ladder.sort(function (a,b) {
            if (b.w==a.w) return b.dmg-a.dmg;
            else return b.w-a.w;
        });
        ++round;
    }
    var round=0;
    var unique = [];
    while (round<36) {
        var done = [];
        for (var j=0; j<ladder.length; ++j) {
            if (done.indexOf(j)===-1) {
                // find a match for the player
                next = j+1;
                while ((next<ladder.length&&unique.indexOf(ladder[j].pid+"_"+ladder[next].pid)!==-1) || done.indexOf(next)!==-1) {
                    ++next;
                }
                if (next<ladder.length) {
                    // avoid repeat
                    done.push(j);
                    done.push(next);
                    unique.push(ladder[j].pid+"_"+ladder[next].pid);
                    unique.push(ladder[next].pid+"_"+ladder[j].pid);
                    // fight
                    var fres=fight(players[ladder[j].pid],players[ladder[next].pid]);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: players[ladder[next].pid].id,
                        result: fres.result
                    });
                    ladder[j].w+=fres.awin*3+fres.draws;
                    ladder[j].dmg+=fres.dmga;
                    ladder[next].w+=fres.bwin*3+fres.draws;
                    ladder[next].dmg+=fres.dmgb;
                    ladder[j].wf+=fres.awin*3+fres.draws;
                    ladder[j].dmgf+=fres.dmga;
                    ladder[next].wf+=fres.bwin*3+fres.draws;
                    ladder[next].dmgf+=fres.dmgb;
                } else {
                    done.push(j);
                    battles.push({
                        rid: round,
                        aid: players[ladder[j].pid].id,
                        bid: 0,
                        result: 0
                    });
                }
            }
        }
        ++round;
        var alpha = round/36;
        var beta = 1-alpha;
        ladder.sort(function (a,b) {
            var bw = b.w*beta+b.wf*alpha;
            var aw = a.w*beta+a.wf*alpha;
            if (Math.abs(bw-aw)<1) return b.dmgf-a.dmgf;
            else return bw-aw;
        });
        
    }
    ladder.sort(function (a,b) {
        if (b.wf==a.wf) return b.dmgf-a.dmgf;
        else return b.wf-a.wf;
    });
    var pos=players.length;
    for (var j=pos-1; j>=0; --j) {
        players[ladder[j].pid].pos=pos;
        --pos;
    }
}



function doWR(players) {
    var scores = [];
    for (var i=0; i<players.length; ++i) {
        scores.push({
            id: i,
            wins: 0,
            draw: 0,
            loss: 0,
            damage: 0,
        });
    }
    for (var i=0; i<players.length-1; ++i) {
        for (var j=i+1; j<players.length; ++j) {
            var fres=fight(players[i],players[j]);
            if (fres.draw) {
                scores[i].draw++;
                scores[j].draw++;           
            } else if (fres.result==0) {
                scores[i].wins++;
                scores[j].loss++;
            } else if (fres.result==1) {
                scores[j].wins++;
                scores[i].loss++;
            }
            scores[i].damage+=fres.admg;
            scores[j].damage+=fres.bdmg;
        }
    }
    scores.sort(function (a,b) {
        if (a.wins==b.wins) {
            if (a.loss==b.loss) {
                if (a.draw==b.draw) {
                    return b.damage-a.damage;
                } else return b.draw-a.draw;
            } else return a.loss-b.loss;
        } else return b.wins-a.wins;
    });
    for (var i=0; i<scores.length; ++i) {
        var id=scores[i].id;
        players[id].wr=scores[i].wins/(scores[i].wins+scores[i].draw+scores[i].loss);
        players[id].wrw=scores[i].wins;
        players[id].wrd=scores[i].draw;
        players[id].wrl=scores[i].loss;
        players[id].wrp=i+1;
    }
}

function pos2pk(pos) {
    if (pos<=10) return 5;
    else if (pos<=20) return 4;
    else if (pos<=30) return 3;
    else if (pos<=40) return 2;
    else if (pos<=50) return 1;
    else return 0;
}

function makecode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}


connection.query('SELECT id,tid FROM tournaments WHERE status=0 ORDER BY tid ASC LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    for (var row of results) {
        var tid=row.tid;
        var cid=row.id;
        connection.query('SELECT s.uid,s.setup,s.hero,s.promo,u.name,u.pid,u.score,u.kid FROM setups s, users u WHERE s.tid='+cid+' AND s.uid = u.id', function (error, results, fields) {
            var THERO=computeTHERO(tid);
            var TPROMO=computeTPROMO(tid);
            if (error) throw error;
            connection.query('UPDATE tournaments SET status=1, amount='+results.length+' WHERE id='+cid, function (a,b,c) {});
            var players=[];
            for (var setup of results) {
                var player = {
                    pid: setup.pid,
                    kid: setup.kid,
                    name: setup.name,
                    id: setup.uid,
                    score: setup.score,
                    setup: JSON.parse(setup.setup),
                    hero: JSON.parse(setup.hero),
                    promo: JSON.parse(setup.promo),
                    pos: -1,
                    wr: 0,
                    wrw: 0,
                    wrd: 0,
                    wrl: 0,
                    wrp: -1
                };
                for (var i=0; i<THERO[tid%THERO.length].length; ++i) {
                    player.hero[i]=THERO[tid%THERO.length][i]==-1?player.hero[i]:THERO[tid%THERO.length][i];
                }
                for (var i=0; i<THERO[tid%THERO.length].length; ++i) {
                    player.promo[i]=TPROMO[tid%THERO.length][i]==-1?player.promo[i]:TPROMO[tid%THERO.length][i];
                }
                players.push(player);
            }
            var battles = [];
            doWR(players);
            shuffle(players);

            if (tid%3==0) pagerank(players,battles);
            else if (tid%3==1) random5(players,battles);
            else if (tid%3==2) laneleague(players,battles);
            //else if (tid%4==3) swiss(players,battles);
            for (var i=0; i<battles.length; ++i) {
                connection.query("INSERT INTO `battles` (`tid`, `rid`, `aid`, `bid`, `result`) VALUES ('"+cid+"', '"+battles[i].rid+"', '"+battles[i].aid+"', '"+battles[i].bid+"', '"+battles[i].result+"')", function (error, results, fields) {
                });
            }
            var final = {
                tid: tid,
                amount: players.length,
                top10: ["UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN","UNKNOWN"]
            }
            for (var i=0; i<players.length; ++i) {
                if (players[i].pos>=1 && players[i].pos<=10) final.top10[players[i].pos-1]=players[i].name;
                players[i].score+=(players.length-players[i].pos+1)*tid2cost(tid);
                connection.query("INSERT INTO `positions` (`tid`, `uid`, `pos`, `wr`, `wins`, `draw`, `loss`, `wrpos`) VALUES ('"+cid+"', '"+players[i].id+"', '"+players[i].pos+"', '"+players[i].wr+"', '"+players[i].wrw+"', '"+players[i].wrd+"', '"+players[i].wrl+"', '"+players[i].wrp+"')", function (error, results, fields) {
                });
                connection.query("UPDATE `users` SET score="+players[i].score+" WHERE id="+players[i].id, function (error, results, fields) {
                });
                kongstat(players[i].kid,players[i].score);
                Q.push({
                    PlayFabId: players[i].pid,
                    "FunctionName": "secret",
                    "FunctionParameter": {
                        pid: players[i].pid,
                        UM: 0,
                        SD: tprize(players[i].pos,players.length,tid2cost(tid)),
                        PG: pos2pg(players[i].pos,tid),
                        PK: pos2pk(players[i].wrp),
                        HERO: -1,
                        tid: tid,
                        top: players[i].pos,
                        wr: players[i].wr,
                        amount: players.length,
                        sec: "secret"
                    }
                });
            }
            Q.push({
                PlayFabId: "secret",
                "FunctionName": "secret",
                "FunctionParameter": {
                    data: final,
                }
            });
            doQueue();
            var currency="PK";
            var amount=1;
            var code=makecode();
            var text="1 Key";
            connection.query("INSERT INTO `coupons`(`id`, `currency`, `amount`, `hero`, `levels`, `code`, `expires`, `text`) VALUES (NULL,'"+currency+"',"+amount+",0,0,'"+code+"',NOW()+INTERVAL 1 WEEK,'"+text+"')", function (error, results, fields) {
                if (error) throw error;
                tclient.post('statuses/update', {status: 'Tournament '+cid+' winner: '+final.top10[0]+'. One coupon: '+code},  function(error, tweet, response) {
                    if(error) throw error;
                });
            });
            
        });
    }
});
/*Q.push({
    PlayFabId: "2036659F3F22AC2F",
    "FunctionName": "time",
    "FunctionParameter": {}
});
Q.push({
    PlayFabId: "2036659F3F22AC2F",
    "FunctionName": "time",
    "FunctionParameter": {}
});
doQueue();
connection.end();*/

process.on('exit', function (code) {
  console.log((Date.now()-start)/1000);
});
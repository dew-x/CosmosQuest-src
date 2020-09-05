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

var Q = [];

var start=Date.now();
connection.connect();

function mfight(rowA,rowB,hero,promo,grid,vals) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",hero,hero,undefined,undefined,promo,promo,grid,vals);
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
function fight(a,b,hero,promo,grid,vals) {
    var dmga=0;
    var dmgb=0;
    var awin=0;
    var bwin=0;
    var draw=0;
    for (var i=0; i<5; ++i) {
        var fres = mfight(a.setup.slice(i*6,(i+1)*6),b.setup.slice(i*6,(i+1)*6),hero,promo,grid.slice(i*6,(i+1)*6),vals.slice(i*6,(i+1)*6));
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

function pagerank(players, battles,hero,promo,grid,vals) {
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
            var res = fight(players[j],players[i],hero,promo,grid,vals);
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

function rperc(i,t,p) {
    var total = (1-Math.pow(1+(1/t),t))/(-(1/t));
    var curr = Math.pow(1+(1/t),t-i);
    var prize = p*curr/total;
    return Math.round(prize);
}

function getPrize(pos,total) {
    var ASPERC = 2; 
    var PGPERC = 20;
    var ASperENTRY = 1.5;
    var PGperENTRY = 2.5;
    var CCperENTRY = 10;

    var ASPOOL = ASperENTRY*total;
    var PGPOOL = PGperENTRY*total;
    var CCPOOL = CCperENTRY*total;

    var ASindex = Math.round(ASPERC/100*total);
    var PGindex = Math.round((PGPERC+ASPERC)/100*total);
    var CCplayers = total - PGindex;
    var ASplayers = ASindex;
    var PGplayers = PGindex-ASindex;
    if (pos<=ASplayers) return '{"AS":'+rperc(pos,ASplayers,ASPOOL)+'}';
    else if (pos<=PGplayers) return '{"PG":'+rperc(pos-ASplayers,PGplayers,PGPOOL)+'}';
    else return '{"CC":'+rperc(pos-PGplayers,CCplayers,CCPOOL)+'}';
}
var todo = 0;
++todo;
connection.query('SELECT id,tid,heroes,promo,grid,vals FROM tournaments2 WHERE status=0 ORDER BY tid ASC LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    for (var row of results) {
        var cid=row.id;
        var tid=row.tid;
        ++todo;
        connection.query('SELECT s.uid,s.setup,u.name FROM setups2 s, users u WHERE s.tid='+tid+' AND s.uid = u.id', function (error, results, fields) {
            if (error) throw error;
            ++todo;
            connection.query('UPDATE tournaments2 SET status=1 WHERE id='+cid, function (a,b,c) {--todo;});
            var players=[];
            for (var setup of results) {
                var player = {
                    name: setup.name,
                    id: setup.uid,
                    score: setup.score,
                    setup: JSON.parse(setup.setup),
                    pos: -1,
                };
                players.push(player);
            }
            var battles = [];
            shuffle(players);

            pagerank(players,battles,JSON.parse(row.heroes),JSON.parse(row.promo),JSON.parse(row.grid),JSON.parse(row.vals));
            
            for (var i=0; i<battles.length; ++i) {
                ++todo;
                connection.query("INSERT INTO `battles2` (`tid`, `rid`, `aid`, `bid`, `result`) VALUES ('"+cid+"', '"+battles[i].rid+"', '"+battles[i].aid+"', '"+battles[i].bid+"', '"+battles[i].result+"')", function (error, results, fields) {
                    --todo;
                });
            }
            for (var i=0; i<players.length; ++i) {
                ++todo;
                connection.query("INSERT INTO `positions2` (`tid`, `uid`, `pos`) VALUES ('"+cid+"', '"+players[i].id+"', '"+players[i].pos+"')", function (error, results, fields) {
                    --todo;
                });
                ++todo;
                connection.query("INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, '0', '0', CURRENT_TIMESTAMP, '"+players[i].id+"', '"+getPrize(players[i].pos,players.length)+"');", function (error, results, fields) {
                    --todo;
                });
            }
            --todo;
        });
    }
    --todo;
});

var trytimes=0;

function check() {
    ++trytimes;
    if (trytimes>1000 || todo==0) {
        connection.query('SELECT id FROM tournaments2 WHERE status=1 ORDER BY tid ASC LIMIT 1', function (error, results, fields) {
            if (error) throw error;
            var cid=results[0].id;
            connection.query('UPDATE tournaments2 SET status=2 WHERE id='+cid, function (a,b,c) {});
            connection.end();
            var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            console.log("DONE",utc);
        });
    } else {
        setTimeout(check,1000);
    }
}

setTimeout(check,1000);
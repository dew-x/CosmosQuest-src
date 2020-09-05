var mysql      = require('mysql');
const fs = require('fs');
var connection = mysql.createConnection({
    host     : 'host',
    user     : 'user',
    password : 'password',
    database : 'database'
  });
var TYPES = [3,0,1,2];
var Q = [];

var start=Date.now();
connection.connect();

function mfight(rowA,rowB,heroA,heroB) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB);
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
    for (var i=0; i<3; ++i) {
        var fres = mfight(a.setup.slice(i*6,(i+1)*6),b.setup.slice(i*6,(i+1)*6),a.hero,b.hero);
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
        draw: false
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

connection.query('SELECT id,heroes,followers FROM ftournaments WHERE status=1 OR created>DATE_ADD(NOW(), INTERVAL 1 DAY) LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    if (results.length==0) connection.end();
    for (var row of results) {
        var id=row.id;
        var heroes=JSON.parse(row.heroes);
        var followers = row.followers;
        connection.query('SELECT s.uid,s.setup,u.name FROM fsetups s, users u WHERE s.tid='+id+' AND s.uid = u.id', function (error, results, fields) {
            if (error) throw error;
            var players=[];
            for (var setup of results) {
                var player = {
                    hero: heroes.slice(),
                    name: setup.name,
                    id: setup.uid,
                    setup: JSON.parse(setup.setup),
                    wr: 0,
                    wrw: 0,
                    wrd: 0,
                    wrl: 0,
                    wrp: -1
                };
                players.push(player);
            }
            var battles = [];
            var cache = {
                "date":Date.now(),
                "id":id,
                "hero":heroes,
                "players":Array(players.length)
            }
            doWR(players);
            var UM = [
                10*85,
                9*85,
                8*85,
                7*85,
                6*85,
                5*85,
                4*85,
                3*85,
                2*85,
                1*85
            ];
            for (var i=0; i<players.length; ++i) {
                cache["players"][players[i].wrp-1] = {
                    name: players[i].name,
                    setup: players[i].setup,
                    wr: (players[i].wr*100).toFixed(2)
                };
                var SD=150000;
                var UMS=0;
                var HERO=-1;
                connection.query("UPDATE `fsetups` SET wr="+players[i].wr+",position="+players[i].wrp+" WHERE uid="+players[i].id+" AND tid="+id+" LIMIT 1", function (error, results, fields) {
                });
                if (players[i].wrp<=4) {
                    HERO = 172;
                } else if (players[i].wrp<=9) {
                    HERO=171;
                } else if (players[i].wrp<=16) {
                    HERO = 170;
                }
                if (players[i].wrp<=10) {
                    UMS = UM[players[i].wrp-1]; 
                    
                }
                connection.query("INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, '0', '0', CURRENT_TIMESTAMP, '"+players[i].id+"', '{\"SD\":"+SD+",\"UM\":"+UMS+",\"HERO\":"+HERO+"}');", function (error, results, fields) {
                });
            }
            fs.writeFileSync("/usr/share/nginx/html/cache/"+id+".log",JSON.stringify(cache));
            connection.query("UPDATE `ftournaments` SET status=2,completed=now() WHERE id="+id+" LIMIT 1", function (error, results, fields) {
                connection.end();
            });
        });
    }
});

process.on('exit', function (code) {
  console.log((Date.now()-start)/1000);
});
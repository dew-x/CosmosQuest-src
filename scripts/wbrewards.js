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
var request = require('sync-request');
var KONGAPI = "secret";
var playfabId = "E3FA";
PlayFab.settings.titleId = playfabId;
var playfabSecret = "secret";
PlayFab.settings.developerSecretKey = playfabSecret;

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
            body: "api_key="+KONGAPI+"&user_id="+kid+"&tournaments4="+score
        });
    }
}

function doQueue() {
    if (Q.length>0) {
        var elem=Q.shift();
        playfab(elem);
    } else {
        connection.end();
    }
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

function isSWB(ts) {
    var base = Math.floor(ts/(24*60*60))%9;
    var d = new Date(ts*1000);
    var day = d.getDay();
    var isWeekend = false;
    return (!isWeekend) && base==6;
}

connection.query('SELECT id,mid,level,spawn,mode FROM WB WHERE `status`=1 ORDER BY id ASC', function (error, results, fields) {
    if (error) throw error;
    if (results.length==0) connection.end();
    for (var row of results) {
        var bid=row.id;
        var mid=row.mid;
        var level=row.level;
        var spawn = row.spawn;
        var mode = row.mode%2;
        var isSuper = false;
        if (row.mode>1) isSuper=true;
        var killed = Math.round(Date.now()/1000);
        var name="LORD OF CHAOS";
        if (mid==87) name="MOTHER OF ALL KODAMAS";
        else if (mid==106) name="KRYTON";
        else if (mid==126) name="DOYENNE";
        else if (mid==186) name="BORNAG";
        if (isSuper) name="SUPER "+name;
        connection.query('SELECT users.name,users.pid,users.id,UNIX_TIMESTAMP(WBD.moment) as mmnt,WBD.damage as dmg, WBD.bid FROM WBD, users WHERE (WBD.bid='+bid+' OR WBD.moment>= DATE_SUB(Now(),INTERVAL 48 HOUR)) AND WBD.uid=users.id', function (error, results, fields) {
            if (error) throw error;
            var playerdata={};
            var total = 0;
            for (var attack of results) {
                if (playerdata[attack.pid]==undefined) {
                    playerdata[attack.pid]={
                        uid: attack.id,
                        pid: attack.pid,
                        name: attack.name,
                        dmg: 0,
                        prev: 0,
                        in: 0,
                        cache: 0,
                        min: undefined,
                        any: 0,
                    }
                }
                if (attack.bid==bid) {
                    total+=parseInt(attack.dmg);
                    playerdata[attack.pid].dmg+=parseInt(attack.dmg);
                    if (playerdata[attack.pid].min==undefined || playerdata[attack.pid].min>attack.mmnt) playerdata[attack.pid].min=attack.mmnt;
                    if (isSWB(attack.mmnt)) ++playerdata[attack.pid].in;
                    else ++playerdata[attack.pid].cache;
                } else if (attack.bid<bid) {
                    if (isSWB(attack.mmnt)) ++playerdata[attack.pid].prev;
                }
            }
            var definitive = [];
            for (var pid in playerdata) {
                var pd = playerdata[pid];
                if (pd.min!=undefined) {
                    var mul=1;
                    if (pd.in>0) {
                        pd.in+=pd.cache;
                        if (pd.prev==0) {
                            if (pd.in<=2) mul=2;
                            else mul=(2+pd.in)/pd.in;
                        } else if (pd.prev==1) {
                            if (pd.in<=1) mul=2;
                            else mul=(1+pd.in)/pd.in;
                        }
                    }
                    definitive.push({
                        uid: pd.uid,
                        pid: pd.pid,
                        name: pd.name,
                        dmg: pd.dmg,
                        min: pd.min,
                        mul: mul,
                        pos: -1,
                        prize: 0,
                        fprize: 0,
                        extra: pd.in>0?(isSuper?60:30):0,
                    });
                }
            }
            
            definitive.sort(function (a,b) {
                if (a.dmg==b.dmg) {
                    if (a.min==b.min) {
                        if (Math.random()<0.5) return -1;
                        else return 1;
                    } else return a.min-b.min;
                } else return b.dmg-a.dmg;
            });
            var base = 1700;
            if (mode==0) {
            } else {
                if (mid==72) {base = 950}
                else if (mid==87) {base = 900}
                else if (mid==106) {base = 750}
                else if (mid==126||mid==186) {base = 1700}
            }
            var reward = Math.log(total)*base;
            //reward*=2;
            if (isSuper) reward*=2;
            /*players.sort(function(a,b) {
                return b.dmg-a.dmg;
            });*/
            var top10=[];
            for (var i=0; i<10; ++i) {
                top10.push([definitive[i].name==""?"UNKNOWN":definitive[i].name,definitive[i].dmg]);
            }
            for (var i=0; i<definitive.length; ++i) {
                definitive[i].prize=Math.round(Math.round(Math.max(1,pos2perc(i+1,definitive.length)*reward)));
            }
            var i = 0;
            var tosave={};
            while (i<definitive.length) {
                var e = i+1;
                var toshare=definitive[i].prize;
                var amount=1;
                while (e<definitive.length && definitive[i].dmg==definitive[e].dmg) {
                    toshare+=definitive[e].prize
                    ++e;
                    ++amount;
                }
                for (var j=i; j<e; ++j) {
                    definitive[j].fprize=Math.round(toshare/amount);
                    tosave[definitive[j].uid]={
                        prize: definitive[j].fprize,
                        mul: 1,
                        extra: definitive[j].extra
                    };
                }
                i=e;
            }
            for (var i=0; i<definitive.length; ++i) {
                definitive[i].prize=Math.round(definitive[i].fprize+definitive[i].extra);
                //console.log(players[i].name,players[i].prize,players[i].dmg);
                //kongstat(players[i].kid,players[i].score);
                Q.push({
                    PlayFabId: definitive[i].pid,
                    "FunctionName": "secret",
                    "FunctionParameter": {
                        pid: definitive[i].pid,
                        sec: "secret",
                        n0: top10[0][0],
                        d0: top10[0][1],
                        n1: top10[1][0],
                        d1: top10[1][1],
                        n2: top10[2][0],
                        d2: top10[2][1],
                        n3: top10[3][0],
                        d3: top10[3][1],
                        n4: top10[4][0],
                        d4: top10[4][1],
                        n5: top10[5][0],
                        d5: top10[5][1],
                        n6: top10[6][0],
                        d6: top10[6][1],
                        n7: top10[7][0],
                        d7: top10[7][1],
                        n8: top10[8][0],
                        d8: top10[8][1],
                        n9: top10[9][0],
                        d9: top10[9][1],
                        name: name,
                        spawn: spawn,
                        killed: killed,
                        dealt: definitive[i].dmg,
                        mode: mode,
                        level: level,
                        top: i+1,
                        AS: definitive[i].prize
                    }
                });
            }
            fs.writeFileSync("/usr/share/nginx/html/wbcache/"+bid+".json",JSON.stringify(tosave));  
            connection.query('UPDATE WB SET `status`=2, killed='+killed+' WHERE id='+bid+' LIMIT 1', function (a,b,c) {});
            doQueue();
        });
    }
});

process.on('exit', function (code) {
  console.log((Date.now()-start)/1000);
});
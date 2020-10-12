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

function doQueue() {
    if (Q.length>0) {
        var elem=Q.shift();
        playfab(elem);
    } else {
        connection.query('UPDATE `users` SET score=0', function (error, results, fields) {
            if (error) throw error;
            connection.end();
        });
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

connection.query('SELECT name,pid,score FROM `users` ORDER BY `users`.`score` DESC', function (error, results, fields) {
    if (error) throw error;
    var pos = 1;
    var ranking = [];
    var udata = [];
    for (var row of results) {
        var pid=row.pid;
        var score=row.score;
        var name=row.name;
        if (pos<=100) {
            ranking.push([name,score]);
        }
        udata.push(pid);
        var hid=230;
        if (pos<100) hid=232;
        else if (pos<1000) hid=231;
        if (score>0) {
            Q.push({
                PlayFabId: pid,
                "FunctionName": "secret",
                "FunctionParameter": {
                    pid: pid,
                    UM: 0,
                    SD: Math.ceil(score),
                    PG: 0,
                    CC: 0,
                    PK: Math.ceil(score/100000),
                    AS: 0,
                    FOL: 0,
                    tid: 0,
                    top: 0,
                    amount: 0,
                    HERO: hid,
                    sec: "secret"
                }
            });
        }
        pos+=1;
    }
    doQueue();
    fs.writeFileSync('/home/ec2-user/trank.json',JSON.stringify(ranking));
});

process.on('exit', function (code) {
  console.log((Date.now()-start)/1000);
});
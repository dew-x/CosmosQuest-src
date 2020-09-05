var PlayFab = require("playfab-sdk/Scripts/PlayFab/PlayFab.js");
var PlayFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer.js");
const fs = require('fs');
var request = require('sync-request');
var KONGAPI = "secret";
var playfabId = "E3FA";
PlayFab.settings.titleId = playfabId;
var playfabSecret = "secret";
PlayFab.settings.developerSecretKey = playfabSecret;
var Q = [];

var start=Date.now();

function doQueue() {
    if (Q.length>0) {
        var elem=Q.shift();
        playfab(elem);
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

var last = 0;
var len = 100;
var ranking = [];

function doStep() {
    PlayFabServer.GetLeaderboard({
        StatisticName: "Ranking",
        StartPosition: last,
        MaxResultsCount: len
    }, function (a,b) {
        var done=false;
        if (a==null) {
            var lb = b.data.Leaderboard;
            for (var i=0; i<lb.length; ++i) {
                if (last+1+i<=100) {
                    ranking.push([lb[i].DisplayName,lb[i].StatValue]);
                }
                if (lb[i].StatValue<=800) done=true;
                else {
                    Q.push({
                        PlayFabId: lb[i].PlayFabId,
                        "FunctionName": "secret",
                        "FunctionParameter": {
                            pid: lb[i].PlayFabId,
                            UM: 0,
                            SD: lb[i].StatValue*4000,
                            PG: Math.ceil(lb[i].StatValue/25),
                            CC: 0,
                            FOL: Math.ceil(lb[i].StatValue/400),
                            PK: 0,
                            tid: 0,
                            top: 0,
                            amount: 0,
                            HERO: -1,
                            sec: "secret"
                        }
                    });
                }
            }
            if (lb.length<len) done=true;
            last+=lb.length;
        } else {
            console.log(a);
            done=true;
        }
        if (!done) doStep();
        else {
            doQueue();
            fs.writeFileSync('/home/ec2-user/prank.json',JSON.stringify(ranking));
        }
    });
}

doStep();

process.on('exit', function (code) {
  console.log((Date.now()-start)/1000);
});
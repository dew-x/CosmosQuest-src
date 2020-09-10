var KONGAPI = "secret";
var KGW = "https://api.kongregate.com/api/";
var CQ="secret";
var CQW = "https://cosmosquest.net/api.php";
var XWWW = "application/x-www-form-urlencoded";
var MIRACLES = [
    {time:1,reward:4},
    {time:2,reward:7},
    {time:4,reward:12},

    {time:8,reward:22},
    {time:16,reward:42},
    {time:24,reward:82},

    {time:36,reward:162},
    {time:48,reward:322},
    {time:72,reward:642},
];
var REWARD=[
    {
        c: 0.12,
    },{
        c: 0.06,
    },{
        c: 0.02,
    },{
        c: 0.12,
    },{
        c: 0.06,
    },{
        c: 0.02,
    },{
        c: 0.12,
        t: "FOL",
        v: 400,
        p: 0.0001,
    },{
        c: 0.06,
        t: "FOL",
        v: 2000,
        p: 0.0005,
    },{
        c: 0.02,
        t: "FOL",
        v: 5000,
        p: 0.0015,
    },{
        c: 0.12,
        t: "UM",
        v: 20,
    },{
        c: 0.06,
        t: "UM",
        v: 50,
    },{
        c: 0.02,
        t: "UM",
        v: 200,
    },{
        c: 0.20,
        t: "HERO",
        v: 0,
    }
];

var GREWARD=[
    {
        c:0.185,
        t:"CS",
        v:10,
    },
    {
        c:0.085,
        t:"CS",
        v:25,
    },
    {
        c:0.03,
        t:"CS",
        v:100,
    },
    {
        c:0.185,
        t:"AS",
        v:3,
    },
    {
        c:0.085,
        t:"AS",
        v:10,
    },
    {
        c:0.03,
        t:"AS",
        v:20,
    },
    {
        c:0.4,
        t:"XHERO",
        v:0,
    },
];

var TYPES = [3,0,1,2];
var N = [
    [2,1,3,0],
    [3,2,0,1],
    [0,3,1,2],
    [1,0,2,3]
];

var HERODROP = [
    7,8,9,
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
    140,141,142,
    149,150,151,
    165,166,167,
    176,177,178,
    181,182,183,
    191,192,193,
];

var PVEHERO = Array(HERO.length).fill(1);
var PVEHERO2 = Array(HERO.length).fill(1000);
var PVEPROMO = Array(HERO.length).fill(0);

var PVE = [
    {
        setup: [19,-1,-1,-1,-1,-1],
        r: 100,
    },{
        setup: [0,2,0,2,0,2],
        r: 150,
    },{
        setup: [16,18,-1,-1,-1,-1],
        r: 200,
    },{
        setup: [8,10,7,5,4,6],
        r: 250,
    },{
        setup: [9,11,9,11,9,11],
        r: 300,
    },{
        setup: [13,3,14,12,1,15],
        r: 500,
    },{
        setup: [0,6,8,14,16,18],
        r: 600,
    },{
        setup: [13,15,17,19,15,13],
        r: 700,
    },{
        setup: [14,15,16,17,18,19],
        r: 800,
    },{
        setup: [19,17,18,16,17,19],
        r: 900,
    },{ // 10
        setup: [20,16,21,17,22,18],
        r: 1000,
    },{
        setup: [23,22,21,18,19,17],
        r: 1200,
    },{
        setup: [8,12,16,20,24,28],
        r: 1400,
    },{
        setup: [21,21,25,18,22,26],
        r: 1600,
    },{
        setup: [31,29,23,21,19,-1],
        r: 1800,
    },{ // 15
        setup: [28,30,32,-1,-1,-1],
        r: 2000,
    },{
        setup: [31,29,27,21,19,-1],
        r: 2300,
    },{
        setup: [28,24,18,20,22,26],
        r: 2600,
    },{
        setup: [33,34,35,25,-1,-1],
        r: 2900,
    },{
        setup: [36,30,24,18,12,6],
        r: 3200,
    },{
        setup: [39,36,39,-1,-1,-1],
        r: 3500,
    },{
        setup: [38,37,35,-1,-1,-1],
        r: 3900,
    },{
        setup: [29,30,31,32,33,-1],
        r: 4300,
    },{
        setup: [32,30,28,26,24,22],
        r: 4700,
    },{
        setup: [31,27,31,31,27,31],
        r: 5100,
    },{
        setup: [38,29,25,31,27,32],
        r: 5500
    },{
        setup: [27,27,26,35,34,33],
        r: 6000
    },{
        setup: [32,36,32,28,36,-1],
        r: 6500
    },{
        setup: [32,32,29,26,27,36],
        r:7000
    },{
        setup: [38,37,37,37,-1,-1],
        r: 7500
    },{
        setup: [24,36,34,34,38,33],
        r: 8000
    },{
        setup: [39,36,33,38,32,3],
        r: 8600
    },{
        setup: [38,32,34,32,32,33],
        r: 9200
    },{
        setup: [36,36,32,35,33,30],
        r: 9800
    },{
        setup: [38,36,36,39,31,31],
        r: 10400
    },{
        setup: [36,36,36,38,36,28],
        r: 11000
    },{
        setup: [37,38,38,37,36,29],
        r: 11700
    },{
        setup: [39,39,36,39,37,38],
        r: 12400
    },{
        setup: [36,36,37,39,36,35],
        r: 13100
    },{
        setup: [36,39,36,39,36,39],
        r: 13800
    },{
        setup: [44,42,40,41,45,-1],
        r: 14600
    },{
        setup: [40,41,40,41,40,40],
        r: 15400
    },{
        setup: [45,44,39,36,40,28],
        r: 16200
    },{
        setup: [46,36,38,44,38,36],
        r: 17000
    },{
        setup: [44,43,44,44,41,15],
        r: 17800
    },{
        setup: [38,40,42,40,44,40],
        r: 18700
    },{
        setup: [47,44,45,43,46,-1],
        r: 19600
    },{
        setup: [48,40,40,45,40,40],
        r: 20500
    },{
        setup: [50,50,50,48,-1,-1],
        r: 21400
    },{
        setup: [46,46,46,46,46,46],
        r: 22300
    },{
        setup: [48,41,40,48,41,40],
        r: 23300
    },{
        setup: [46,46,48,51,50,-1],
        r: 24300
    },{
        setup: [44,44,46,50,50,32],
        r: 25300
    },{
        setup: [46,42,44,44,48,48],
        r: 26300
    },{
        setup: [40,50,53,40,38,40],
        r: 27300
    },{
        setup: [47,49,50,48,50,-1],
        r: 28300
    },{
        setup: [50,50,50,47,48,37],
        r: 29300
    },{
        setup: [52,50,53,51,43,26],
        r: 30300
    },{
        setup: [55,54,52,58,28,-1],
        r: 31300
    },{
        setup: [37,48,50,52,51,46],
        r: 32300
    },{
        setup: [44,46,47,48,49,50],
        r: 33300
    },{
        setup: [50,44,52,47,45,51],
        r: 34300
    },{
        setup: [56,55,54,57,-1,-1],
        r: 35300
    },{
        setup: [50,45,51,53,52,45],
        r: 36300
    },{
        setup: [53,52,47,43,46,49],
        r: 37300
    },{
        setup: [49,50,52,40,49,52],
        r: 38300
    },{
        setup: [52,54,50,53,51,50],
        r: 39300
    },{
        setup: [59,58,57,56,-1,-1],
        r: 40300
    },{
        setup: [50,52,50,53,52,50],
        r: 41300
    },{
        setup: [54,52,53,51,52,40],
        r: 42300
    },{
        setup: [53,54,51,54,52,49],
        r: 43300
    },{
        setup: [55,52,52,52,52,39],
        r: 44300
    },{
        setup: [49,56,56,54,51,51],
        r: 45300
    },{
        setup: [53,53,53,53,53,52],
        r: 46300
    },{
        setup: [58,59,57,59,59,-1],
        r: 47300
    },{
        setup: [57,52,55,56,57,54],
        r: 48300
    },{
        setup: [55,56,57,55,56,55],
        r: 49300
    },{
        setup: [58,58,59,59,59,59],
        r: 50300
    },{
        setup: [55,56,56,56,56,56],
        r: 51300
    },{
        setup: [59,59,59,59,59,58],
        r: 52300
    },{
        setup: [61,61,61,61,54,-1],
        r: 53500
    },{
        setup: [58,62,60,58,56,55],
        r: 54700
    },{
        setup: [63,60,59,59,58,59],
        r: 55900
    },{
        setup: [64,61,60,59,60,-1],
        r: 57100
    },{
        setup: [61,65,59,59,59,58],
        r: 58300
    },{
        setup: [62,60,60,60,60,48],
        r: 59500
    },{
        setup: [64,66,62,62,61,-1],
        r: 60700
    },{
        setup: [65,62,60,60,62,59],
        r: 61900
    },{
        setup: [60,60,56,64,66,62],
        r: 63100
    },{
        setup: [68,62,62,62,62,62],
        r: 64300
    },{
        setup: [59,64,66,64,61,61],
        r: 65500
    },{
        setup: [61,64,67,68,68,66],
        r: 66700
    },{
        setup: [70,63,62,62,62,69],
        r: 67900
    },{
        setup: [80,78,76,80,-1,-1],
        r: 69100
    },{
        setup: [77,65,65,68,65,69],
        r: 70300
    },{
        setup: [61,58,71,71,72,72],
        r: 71500
    },{
        setup: [72,69,69,74,74,71],
        r: 72700
    },{
        setup: [70,73,73,75,75,70],
        r: 73900
    },{
        setup: [74,76,78,73,72,74],
        r: 75100
    },{
        setup: [78,79,72,71,71,76],
        r: 76300
    },{// page 21
        setup: [86,79,78,81,84,-1],
        r: 77700
    },{
        setup: [80,76,78,83,90,-1],
        r: 79100
    },{
        setup: [81,82,83,83,86,-1],
        r: 80500
    },{
        setup: [78,76,80,81,78,76],
        r: 81900
    },{
        setup: [78,81,79,78,81,78],
        r: 83300
    },{
        setup: [84,88,90,87,81,-1],
        r: 84700
    },{
        setup: [81,83,80,82,76,82],
        r: 86100
    },{
        setup: [83,81,86,84,87,87],
        r: 87500
    },{
        setup: [83,85,83,84,86,85],
        r: 88900
    },{
        setup: [87,85,83,84,87,84],
        r: 90300
    },{
        setup: [87,85,89,89,84,90],
        r: 91700
    },{
        setup: [82,82,87,88,91,87],
        r: 93100
    },{
        setup: [90,90,94,93,92,95],
        r: 94500
    },{
        setup: [89,98,92,96,92,-1],
        r: 95900
    },{
        setup: [88,92,99,89,90,89],
        r: 97300
    },{
        setup: [91,95,90,93,92,93],
        r: 98700
    },{
        setup: [95,94,95,92,93,93],
        r: 100100
    },{
        setup: [95,94,94,92,88,94],
        r: 101500
    },{
        setup: [99,100,100,98,98,-1],
        r: 102900
    },{
        setup: [107,105,107,105,-1,-1],
        r: 104300
    }
    //121-125 Ascends
    ,{
        setup: [107,106,106,107,-1,-1],
        r: 105700
    },{
        setup: [107,106,105,104,-1,-1],
        r: 107100
    },{
        setup: [106,107,105,105,-1,-1],
        r: 108500
    },{
        setup: [106,107,106,108,-1,-1],
        r: 109900
    },{
        setup: [111,107,104,108,-1,-1],
        r: 111300
    }
    //126-130 Ascends
    ,{
        setup: [111,111,111,102,-1,-1],
        r: 112700
    },{
        setup: [111,107,107,101,-1,-1],
        r: 114100
    },{
        setup: [115,115,111,106,-1,-1],
        r: 115500
    },{
        setup: [115,115,107,104,-1,-1],
        r: 116900
    },{
        setup: [115,115,111,105,-1,-1],
        r: 118300
    }
    //131-135 Ascends
    ,{
        setup: [106,113,115,101,100,-1],
        r: 119700
    },{
        setup: [108,100,104,114,115,-1],
        r: 121100
    },{
        setup: [108,112,113,115,-1,-1],
        r: 122500
    },{
        setup: [104,110,104,115,104,-1],
        r: 123900

    },{
        setup: [116,104,100,119,115,-1],
        r: 125300
    }
    //136-140 Ascends
    ,{
        setup: [111,117,106,116,102,-1],
        r: 126700
    },{
        setup: [117,104,116,104,116,-1],
        r: 128100
    },{
        setup: [104,104,119,110,119,104],
        r: 129500
    },{
        setup: [104,117,104,116,115,107],
        r:130900
    },{
        setup: [104,105,116,110,117,106],
        r: 132300
    },{ //141-145 Ascends - Page 29
        setup: [-21,116,116,115,-1,-1], //1
        r: 133700
    },{
        setup: [-56,113,115,116,-1,-1], //2
        r: 135100
    },{
        setup: [-30,98,119,115,117,-1], //3
        r: 136500
    },{
        setup: [-42,104,116,111,106,-1], //4
        r: 137900
    },{
        setup: [-30,113,115,117,101,-1], //5
        r: 139300
    }
    //146-150 Ascends - Page 30
    ,{
        setup: [-31,115,116,98,117,102], //1
        r: 140700
    },{
        setup: [-42,-31,116,115,-1,-1], //2
        r: 142100
    },{
        setup: [-41,-30,119,108,-1,-1], //3
        r: 143500
    },{
        setup: [-43,-31,111,108,108,-1], //4
        r: 144900
    },{
        setup: [-56,-31,115,111,111,-1], //5
        r: 146300
    }
    //151-155 Ascends - Page 31
    ,{
        setup: [-41,-31,119,119,117,117], //1
        r: 147700
    },{
        setup: [-43,-30,116,117,118,118], //2
        r: 149100
    },{
        setup: [-29,-21,-41,119,117,-1], //3
        r: 150500
    },{
        setup: [-30,-43,-31,116,119,-1], //4
        r: 151900
    },{
        setup: [-29,-21,-41,-43,118,-1], //5
        r: 153300
    }
    //156-160 Ascends - Page 32
    ,{
        setup: [-42,-29,-56,-31,118,118], //1
        r: 154700
    },{
        setup: [-31,-21,-43,-30,117,117], //2
        r: 156100
    },{
        setup: [-29,-41,-43,-30,-56,119], //3
        r: 157500
    },{
        setup: [-31,-56,-41,-42,-29,-30], //4
        r: 158900
    },{
        setup: [-60,-31,-30,118,-1,-1], //5
        r: 160300
    },{
        setup: [-57,-31,-21,-29,117,-1], //1
        r: 161700
    },{
        setup: [-59,-30,-43,-42,118,117], //2
        r: 163100
    },{
       setup: [-57,-21,-43,-30,-31,116], //3
        r: 164500
    },{
        setup: [-58,-31,-56,-29,-30,118], //4
        r: 165900
    },{
        setup: [-90,-41,-56,-31,-30,-43], //5
        r: 167300
    }
//166-170 Ascends - Page 34 - Ascended Jade
,{
        setup: [-57,-91,-31,-29,-1,-1], //1
        r: 168700
    },{
        setup: [-93,-60,-42,-56,-1,-1], //2
        r: 170100
    },{
        setup: [-118,-116,-41,-42,-43,-1], //3
        r: 171500
    },{
        setup: [-119,-59,-30,-56,-21,-1], //4
        r: 172900
    },{
        setup: [-117,-58,-29,-41,-21,-42], //5
        r: 174300
    }
//171-175 Ascends - Page 35 - Ascended Edana
,{
        setup: [-92,-93,-41,-43,-1,-1], //1
        r: 175700
    },{
        setup: [-118,-90,-21,-56,-31,-1], //2
        r: 177100
    },{
        setup: [-116,-60,-58,-29,-1,-1], //3
        r: 178500
    },{
        setup: [-91,-92,-59,-30,-43,-1], //4
        r: 179900
    },{
        setup: [-60,-91,-57,-41,-21,-42], //5
        r: 181300
    }
//176-180 Ascends - Page 36 - Ascended Dybbuk
,{
        setup: [-90,-116,-60,-58,-1,-1], //1
        r: 182700
    },{
        setup: [-119,-116,-117,-59,-43,-1], //2
        r: 184100
    },{
        setup: [-92,-93,-91,-117,-29,-1], //3
        r: 185500
    },{
        setup: [-118,-116,-93,-57,-41,-43], //4
        r: 186900
    },{
        setup: [-119,-117,-116,-58,-60,-29], //5
        r: 188300
    }
];

var peasterMilestones = [
    {
        m: 50,
        curr: "CC",
        q: 50,
    },
    {
        m: 100,
        curr: "PG",
        q: 30,
    },
    {
        m: 160,
        curr: "AS",
        q: 25,
    },
    {
        m: 230,
        curr: "hero",
        id: 161,
    },
    {
        m: 310,
        curr: "PK",
        q: 15,
    },
    {
        m: 400,
        curr: "UM",
        q: 500,
    },
    {
        m: 500,
        t: "solver",
        d: "quest",
    },
    {
        m: 630,
        curr: "EM",
        q: 5,
    },
    {
        m: 800,
        t: "mtr",
    },
    {
        m: 1000,
        curr: "hero",
        id: 162,
    },
    {
        m: 1400,
        t: "solver",
        d: "dq",
    },
    {
        m: 2000,
        t: "dispenser",
        d: "cc",
    },
    {
        m: 3000,
        curr: "hero",
        id: 163,
    },
    {
        m: 4000,
        t: "solver",
        d: "dungeon",
    },
    {
        m: 5500,
        t: "dispenser",
        d: "pg",
    },
    {
        m: 8000,
        t: "wbr",
    },
    {
        m: 11000,
        t: "dispenser",
        d: "um",
    },
    {
        m: 16000,
        t: "solver",
        d: "wb",
    },
    {
        m: 22000,
        t: "mtr",
    },
    {
        m: 30000,
        t: "solver",
        d: "flash",
    },
    {
        m: 35000,
        curr: "hero",
        id: 164,
    },
    {
        m: 41000,
        t: "wbr",
    },
    {
        m: 48000,
        t: "dispenser",
        d: "as",
    },
    {
        m: 57000,
        t: "solver",
        d: "tournament",
    },
    {
        m: 75000,
        t: "silver",
    },
    {
        m: 90000,
        t: "wbr",
    },
    {
        m: 105000,
        t: "em2",
    },
    {
        m: 125000,
        t: "fp4",
    },
];

var dr = [
    {curr:"UM",val:50},
    {curr:"CC",val:10},
    {curr:"PK",val:1},
    {curr:"UM",val:50},
    {curr:"CC",val:10},
    {curr:"KU",val:10}
];

var DAY = 24*60*60*1000;

var vipMultiplier = 1;

function authKong(kid,token) {
    var url = KGW+"authenticate.json";
    var content = "api_key="+KONGAPI+"&user_id="+kid+"&game_auth_token="+token;
    var httpMethod = "post";
    
    // The pre-defined http object makes synchronous HTTP requests
    var response = JSON.parse(http.request(url, httpMethod, content, XWWW, {}));
    return response.success;
}

function statKong(kid,key,stat) {
    var url = KGW+"submit_statistics.json";
    var content = "api_key="+KONGAPI+"&user_id="+kid+"&"+key+"="+stat;
    var httpMethod = "post";
    // The pre-defined http object makes synchronous HTTP requests
    var response = JSON.parse(http.request(url, httpMethod, content, XWWW, {}));
    return response.success;
}

function getItems(kid) {
    var url = KGW+"user_items.json?api_key="+KONGAPI+"&user_id="+kid;
    var content = JSON.stringify({});
    var httpMethod = "get";
    var contentType = "application/json";

    // The pre-defined http object makes synchronous HTTP requests
    var response = JSON.parse(http.request(url, httpMethod, content, contentType, {}));
    if (response && response.success) return response.items;
    else return [];
}

function consumeItem(kid,token,id) {
    var url = KGW+"use_item.json";
    var content = "api_key="+KONGAPI+"&user_id="+kid+"&game_auth_token="+token+"&id="+id;
    var httpMethod = "post";
    
    // The pre-defined http object makes synchronous HTTP requests
    var response = JSON.parse(http.request(url, httpMethod, content, XWWW, {}));
    return response.success;
}

function registerT(name,pid,tid,setup,hero,kid,promo) {
    var s=Array(30).fill(-1);
    for (var i=0; i<30; i+=6) {
        var begin=i;
        for (var j=0; j<6; ++j) {
            if (setup[i+j]!==-1) {
                s[begin]=setup[i+j];
                ++begin;
            }
        }
    }
    
    var content = "action=register&key="+CQ+"&name="+name+"&pid="+pid+"&tid="+tid+"&kid="+kid+"&setup="+encodeURI(JSON.stringify(s))+"&hero="+encodeURI(JSON.stringify(hero))+"&promo="+encodeURI(JSON.stringify(promo));
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) return true;
    else return response.error;
}
function registerT2(name,pid,setup,kid) {
    var s=Array(30).fill(-1);
    for (var i=0; i<30; i+=6) {
        var begin=i;
        for (var j=0; j<6; ++j) {
            if (setup[i+j]!==-1) {
                s[begin]=setup[i+j];
                ++begin;
            }
        }
    }
    
    var content = "action=register2&key="+CQ+"&name="+name+"&pid="+pid+"&kid="+kid+"&setup="+encodeURI(JSON.stringify(s));
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) return true;
    else return response.error;
}
function registerFT(name,pid,tid,setup,kid) {
    var s=Array(18).fill(-1);
    for (var i=0; i<18; i+=6) {
        var begin=i;
        for (var j=0; j<6; ++j) {
            if (setup[i+j]!==-1) {
                s[begin]=setup[i+j];
                ++begin;
            }
        }
    }
    var content = "action=fregister&key="+CQ+"&name="+name+"&pid="+pid+"&tid="+tid+"&kid="+kid+"&setup="+encodeURI(JSON.stringify(s));
    var httpMethod = "post";
    
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) return true;
    else return response.error;
}

function clearT(pid,tid) {
    var content = "action=clear&key="+CQ+"&pid="+pid+"&tid="+tid;
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) return true;
    else return response.error;
}
function clearT2(pid) {
    var content = "action=clear2&key="+CQ+"&pid="+pid;
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) return true;
    else return response.error;
}

function award(p,c,a) {
    try {
        return server.AddUserVirtualCurrency({
            "PlayFabId" : p,
            "VirtualCurrency": c,
            "Amount": a
        });
    } catch (e) {
        return false;
    }
}

function pay(p,c,a) {
    try {
        return server.SubtractUserVirtualCurrency({
            "PlayFabId" : p,
            "VirtualCurrency": c,
            "Amount": a
        });
    } catch (e) {
        return false;
    }
}
function updateS(p,s,v) {
    server.UpdatePlayerStatistics({
        "PlayFabId" : p,
        "Statistics": [
            {
                "StatisticName": s,
                "Value": v
            }
        ]
    });
}

function loadData(id,kid) {
    id=id||currentPlayerId;
    var ret=server.GetUserInternalData({"PlayFabId" : id, "Keys" : ["miracles","mlvl","followers","city","log"]});
    var now=Date.now();
    var data={now:now};
    if (ret && ret.Data) {
        if (ret.Data.miracles) {
            data.miracles=JSON.parse(ret.Data.miracles.Value);
        } else {
            data.miracles=[];
            for (var i=0; i<MIRACLES.length; ++i) {
                data.miracles[i]=now;
            }
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {miracles:JSON.stringify(data.miracles),followers:0} });
        }
        if (ret.Data.log) data.log=JSON.parse(ret.Data.log.Value);
        
        data.followers=ret.Data.followers?parseInt(ret.Data.followers.Value):0;
        data.mlvl=ret.Data.mlvl?parseInt(ret.Data.mlvl.Value):0;
        
        if (ret.Data.city) {
            data.city=JSON.parse(ret.Data.city.Value);
            if (data.city.hero===undefined) data.city.hero=[];
            while (data.city.hero.length<HERO.length) data.city.hero.push(0);
            if (data.city.tour===undefined) data.city.tour=[];

            if (data.city.promo===undefined) data.city.promo=[];
            while (data.city.promo.length<HERO.length) data.city.promo.push(0);

            if (data.city.herowb===undefined) data.city.herowb=[];
            while (data.city.herowb.length<HERO.length) data.city.herowb.push(0);
        } else {
            data.city={
                setup: Array(36).fill(-1),
                result: [0,0,0],
                log: [],
                quests: [],
                hero: [],
                tour: []
            };
            updateS(currentPlayerId,"Ranking",1000);
        }
        if (data.city.tm===undefined) {
            data.city.tm=0;
        }
        if (data.city.easter === undefined) {
            data.city.easter = {
                cclaimable: -1,
                points: 0,
                ppoints: 0,
                claimed: -1,
                questsolver: 0,
                dailysolver: 0,
                dungeonsolver: 0,
                wbsolver: 0,
                flashsolver: 0,
                tournamentsolver: 0,
                freep4: 0,
                doubleem: 0,
                ccdispenser: 0,
                ccdispenserlast: 0,
                pgdispenser: 0,
                pgdispenserlast: 0,
                asdispenser: 0,
                asdispenserlast: 0,
                umdispenser: 0,
                umdispenserlast: 0,
                wbtimer: 0,
                miracles: 0,
                freesilver: 0,
            };
        }

        if (data.city.promotokens===undefined) {
            data.city.promotokens = {
                promo4: 0,
                promo6: 0
            };
        }
        
        var tid=Math.floor(Date.now()/DAY);
        if (data.city.easter.ccdispenser!=0) {
            if (data.city.easter.ccdispenserlast!=tid) {
                if (data.city.easter.ccdispenser===-1) {
                    award(currentPlayerId,"CC",10);
                } else {
                    --data.city.easter.ccdispenser;
                    award(currentPlayerId,"CC",10*3);
                }
                data.city.easter.ccdispenserlast = tid;
            }
        }
        if (data.city.easter.pgdispenser!=0) {
            if (data.city.easter.pgdispenserlast!=tid) {
                if (data.city.easter.pgdispenser===-1) {
                    award(currentPlayerId,"PG",10);
                } else {
                    --data.city.easter.pgdispenser;
                    award(currentPlayerId,"PG",10*3);
                }
                data.city.easter.pgdispenserlast = tid;
            }
        }
        if (data.city.easter.asdispenser!=0) {
            if (data.city.easter.asdispenserlast!=tid) {
                if (data.city.easter.asdispenser===-1) {
                    award(currentPlayerId,"AS",10);
                } else {
                    --data.city.easter.asdispenser;
                    award(currentPlayerId,"AS",10*3);
                }
                data.city.easter.asdispenserlast = tid;
            }
        }
        if (data.city.easter.umdispenser!=0) {
            if (data.city.easter.umdispenserlast!=tid) {
                if (data.city.easter.umdispenser===-1) {
                    award(currentPlayerId,"UM",100);
                } else {
                    --data.city.easter.umdispenser;
                    award(currentPlayerId,"UM",100*3);
                }
                data.city.easter.umdispenserlast = tid;
            }
        }
        if (data.city.easter.freep4) {
            for (var i=0; i<HERO.length; ++i) {
                if (data.city.promo[i]===3) data.city.promo[i]=4; 
            }
        }
        if (data.city.mclaims === undefined) {
            data.city.mclaims=Array(MIRACLES.length).fill(0);
        }
        data.tm=data.city.tm;
        if (data.tm==-1 || data.tm>now) {
            var any=false;
            var done=0;
            var mlvl1=getFOL();
            for (var i=0; i<MIRACLES.length; ++i) {
                while (data.miracles[i]<now) {
                    any=true;
                    done++;
                    data.miracles[i]+=MIRACLES[i].time*60*60*1000*0.9*(1-data.city.easter.miracles);
                    data.followers+=Math.round(MIRACLES[i].reward*(data.mlvl+mlvl1==0?1:2*(data.mlvl+mlvl1))*(1+data.city.mclaims[i]*0.01)*(1+data.city.easter.doubleem));
                    ++data.city.mclaims[i];
                }
            }
            data.amir=done;
            if (any) {
                if (data.city.pass!==undefined) {
                    //if (data.city.easter!==undefined) data.city.easter.points+=done;
                    data.city.pass.miracles+=done;
                }
                if (kid) statKong(kid,"followers",Math.floor(Math.log10(data.followers)*1000));
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {miracles:JSON.stringify(data.miracles),followers:data.followers,city:JSON.stringify(data.city)} });
            }
        }

        if (data.city.xmas2===undefined) {
            data.city.xmas2 = {
                advent: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                v: 1,
            };
        }

        if (data.city.pass===undefined) {
            data.city.pass = {
                id: 1,
                enabled: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                pvp: 0,
                claim: 0,
            }
        }
        if (data.city.pass.id==1) {
            data.city.pass = {
                id: 2,
                isSilver: 0,
                isGold: 0,
                claim: 0,
                sclaim: 0,
                gclaim: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                ftournaments: 0,
                pvp: 0,
                quests: 0,
            }
        }
        if (data.city.pass.id==2) {
            data.city.pass = {
                id: 3,
                isSilver: 0,
                isGold: 0,
                claim: 0,
                sclaim: 0,
                gclaim: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                ftournaments: 0,
                pvp: 0,
                quests: 0,
            }
        }

        if (data.city.pass.id==3) {
            data.city.pass = {
                id: 4,
                isSilver: 0,
                isGold: 0,
                claim: 0,
                sclaim: 0,
                gclaim: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                ftournaments: 0,
                pvp: 0,
                quests: 0,
            }
        }
        if (data.city.pass.id==4) {
            data.city.pass = {
                id: 5,
                isSilver: 0,
                isGold: 0,
                claim: 0,
                sclaim: 0,
                gclaim: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                ftournaments: 0,
                pvp: 0,
                quests: 0,
            }
        }
        if (data.city.pass.id==5) {
            data.city.pass = {
                id: 6,
                isSilver: 0,
                isGold: 0,
                claim: 0,
                sclaim: 0,
                gclaim: 0,
                wb: 0,
                chest: 0,
                miracles: 0,
                tournaments: 0,
                ftournaments: 0,
                pvp: 0,
                quests: 0,
            }
        }
        if (data.city.pvp==undefined) {
            data.city.pvp = {
                attacks: 4,
                next: Date.now(),
                lasts: [],
            }
        } else {
            while (data.city.pvp.lasts.length>=10) data.city.pvp.lasts.shift();
            var toGrant = Math.floor((Date.now()-data.city.pvp.next)/(60*60*1000));
            data.city.pvp.attacks = Math.min(8,data.city.pvp.attacks+toGrant);
            if (data.city.pvp.attacks==8) data.city.pvp.next=Date.now();
            else data.city.pvp.next+=toGrant*(60*60*1000);
        }
        var tid=Math.floor(Date.now()/DAY);
        if (tid>=17830 && tid<=17837) {
            if (data.city.hllwn===undefined || data.city.hllwn.next==undefined) {
                data.city.hllwn = {
                    UM:400,
                    gain: data.city.pass.isGold?11500:0,
                    next: tid,
                }
            }
            while (data.city.hllwn.next!=tid) {
                data.city.hllwn.next=tid;
                data.city.hllwn.UM += 400;
            }
        }
        if (data.city.halloween === undefined) {
            data.city.halloween = {
                hero: Array(HERO.length).fill(1),
                dailyClaimed: 18198,
            } 
            data.city.halloween.hero[96]=0;
            data.city.halloween.hero[72]=0;
            data.city.halloween.hero[87]=0;
            data.city.halloween.hero[106]=0;
            data.city.halloween.hero[126]=0;
            data.city.halloween.hero[186]=0;
        }
        var tid2 = Math.min(18206,tid);
        if (data.city.pass.isSilver==1) {
            if (data.city.hero[190]==0) data.city.hero[190]=1;
        }
        if (data.city.pass.isGold) {
            if (data.city.hero[213]==0) data.city.hero[213]=1;
        }
        
        // Makes the reset on Saturdays 00:00 GMT
        CWC = Math.floor((now-3*DAY)/(7*DAY))+10000;
        if (data.city.WC===undefined||data.city.NWC<CWC) {
            data.city.WC=0;
            if (data.city.easter.freesilver) {
                data.city.WC=1;
                award(currentPlayerId,"SD",850000);
                award(currentPlayerId,"PK",10);
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL"],
                });
            }
            data.city.NWC=CWC;
        }
        var refresh=false;
        var timer = now+85500000;
        var maxdq =1;
        
        if (data.city.daily===undefined || data.city.daily.lvl===undefined || data.city.daily.v===undefined) {
            refresh=true;
        } else if (data.city.daily.timer-DAY<now) {
            refresh=true;
        } else if (data.city.daily.timer2<now) {
            if (data.tm==-1 || data.tm>now) {
                maxdq = Math.max(1,Math.max(data.city.daily.max,data.city.daily.lvl));
                data.city.pass.quests += maxdq;
                var count = 0;
                while (data.city.daily.timer2<now) {
                    data.city.daily.timer2+=76950000;
                    ++count;
                }
                timer = data.city.daily.timer2;
                var top = Math.floor((maxdq-5)/5);
                var prizes = {}
                for (var i=0; i<=top; ++i) {
                    if (prizes[dr[i%dr.length].curr]===undefined) prizes[dr[i%dr.length].curr]=0;
                    prizes[dr[i%dr.length].curr]+=dr[i%dr.length].val*count;
                }
                for (var key in prizes) {
                    award(currentPlayerId,key,prizes[key]);
                }
            } else {
                if (now-data.city.daily.timer2<43200000) timer = data.city.daily.timer2 + 86112000;
            }
            refresh=true;
        }
        if (refresh) {
            if (data.city.daily!==undefined && data.city.daily.v==2) maxdq=Math.min(250,maxdq);
            var daily=doDaily(maxdq);
            data.city.daily={
                max: maxdq,
                lvl: maxdq,
                v: 3,
                setup: daily.setup,
                timer: now*2,
                timer2: timer,
                hero: daily.hero,
            }
            //if (data.city.easter!==undefined) data.city.easter.points+=20;
        }
        if (data.city.WB===undefined) {
            data.city.WB = {
                next:now+DAY/2,
                atks:1,
                log:[]
            }
        }
        while (data.city.WB.next<now && data.city.WB.atks<=6) {
            data.city.WB.atks+=1;
            data.city.WB.next+=(DAY/2-data.city.easter.wbtimer);
        }
        if (data.city.WB.atks>=7) {
            data.city.WB.atks=7;
            data.city.WB.next=now+(DAY/2-data.city.easter.wbtimer);
        }
        if (data.city.flash === undefined) {
            data.city.flash = 0;
        }
        if (data.city.recycle === undefined) {
            data.city.recycle = {
                next: now,
                stage: 0
            }
        }
        if (data.city.recycle.next - Date.now() <= 0 && data.city.recycle.stage !== 0)  data.city.recycle.stage = 0;

        if (data.city.adventure !== undefined && data.city.adventure.time !== undefined && (data.city.adventure.time-Date.now())<0) {
            var advSuccess = Math.floor(Math.random() * 100) + 1;
            if (data.city.adventure.perc >= advSuccess) {
                var prize = randomIntFromInterval(101,200);
                data.city.adventure.prize = prize;
                var pcurr=["CC","PG","AS"];
                award(currentPlayerId,pcurr[data.city.adventure.kind],prize);
                log("[ADVENTURE] Succeed! You have won "+prize+" "+pcurr[data.city.adventure.kind]);
            } else {
                data.city.adventure.prize = -1;
                log("[ADVENTURE] You failed the adventure");
            }
            data.city.adventure.time = undefined;
        }

        if (data.city.training === undefined) {
            data.city.training = {
                time: -1,
                hid: -1,
            };
        } else if (data.city.training.time !== -1 && (data.city.training.time - Date.now()) < -1) {
            data.city.hero[data.city.training.hid] = 99;
            data.city.promo[data.city.training.hid] = 6;
            data.city.training = {
                time: -1,
                hid: -1,
            };
        }

        if (data.city.anniversary == undefined) data.city.anniversary = 2;

        if (data.city.space === undefined) data.city.space = {};
        if (data.city.games === undefined) data.city.games = {};

        if (data.city.space !== undefined && currentSpecialEvent() == "Space Journey" && data.city.space.day !== undefined && Math.floor((Date.now() - (data.city.space.start+(data.city.space.day*DAY))) / DAY) > 0) {
            data.city.space.day++;
            data.city.space.hyperloop+=6;
        }

        if (data.city.games !== undefined && currentSpecialEvent() == "G.A.M.E.S" && data.city.games.day !== undefined && Math.floor((Date.now() - (data.city.games.start+(data.city.games.day*DAY))) / DAY) > 0) {
            data.city.games.day++;
            if (data.city.games.activityFlag) {
                data.city.games.activities.points+=16;
                data.city.games.activityFlag = false;
            } else data.city.games.activities.points+=20;
        }

        if (data.city.captchats == undefined) data.city.captchats=Date.now();
        
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
    } else return undefined;
    var stats = server.GetPlayerStatistics({
        "PlayFabId" : currentPlayerId,
        "StatisticNames": ["Ranking"]
    });
    if (stats.Statistics===undefined || stats.Statistics.length==0) {
        updateS(currentPlayerId,"Ranking",1000);
    }
    return data;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mfight(rowA,rowB,heroA,heroB,promoA,promoB) {
    if (promoA===undefined) promoA = Array(heroA.length).fill(0);
    if (promoB===undefined) promoB = Array(heroB.length).fill(0);
    var res = beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB,undefined,undefined,promoA,promoB);
    return res.result;
}

function getFOL() {
    var items=server.GetUserInventory({"PlayFabId" : currentPlayerId});
    for (var i=0; i<items.Inventory.length; ++i) {
        if (items.Inventory[i].ItemId=="FOL") return items.Inventory[i].RemainingUses;
    }
    return 0;
}

handlers.status = function (args, context) {
    if (authKong(args.kid,args.token)) {
        var data = loadData();
        var items=getItems(args.kid);
        var mlvl = 0;
        for (var i=0; i<items.length; ++i) {
            if (items[i].identifier=="miracle") ++mlvl;
            else if (items[i].identifier=="pack10") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",100);
                }
            } else if (items[i].identifier=="pack25") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",255);
                }
            } else if (items[i].identifier=="pack50") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",525);
                }
            } else if (items[i].identifier=="pack100") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",1100);
                }
            } else if (items[i].identifier=="pack200") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",2300);
                }
            } else if (items[i].identifier=="pack550") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",6500);
                }
            } else if (items[i].identifier=="pack1100") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",13500);
                }
            } else if (items[i].identifier=="wpack10") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",200);
                    award(currentPlayerId,"ET",6);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(25*vipMultiplier);
                    data.city.easter.ppoints+=(25*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack25") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",510);
                    award(currentPlayerId,"ET",20);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(62*vipMultiplier);
                    data.city.easter.ppoints+=(62*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack50") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",1050);
                    award(currentPlayerId,"ET",40);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(125*vipMultiplier);
                    data.city.easter.ppoints+=(125*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack100") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",2200);
                    award(currentPlayerId,"ET",100);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(250*vipMultiplier);
                    data.city.easter.ppoints+=(250*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack200") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",4600);
                    award(currentPlayerId,"ET",250);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack550") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",13000);
                    award(currentPlayerId,"ET",700);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(1375*vipMultiplier);
                    data.city.easter.ppoints+=(1375*vipMultiplier);
                }
            } else if (items[i].identifier=="wpack1100") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"UM",27000);
                    award(currentPlayerId,"ET",1500);
                }
                if (data.city.easter !== undefined) {
                    data.city.easter.points+=(2750*vipMultiplier);
                    data.city.easter.ppoints+=(2750*vipMultiplier);
                }
            } else if (items[i].identifier=="oto1") {
                if (data.city.hero[0]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL","MUL"],
                    });
                    award(currentPlayerId,"ET",40);
                    data.city.hero[0]=1;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(125*vipMultiplier);
                        data.city.easter.ppoints+=(125*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="oto2") {
                if (data.city.hero[1]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL","FOL","MUL","MUL"],
                    });
                    award(currentPlayerId,"ET",100);
                    data.city.hero[1]=1;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(250*vipMultiplier);
                        data.city.easter.ppoints+=(250*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="oto3") {
                if (data.city.hero[2]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL","FOL","FOL","MUL","MUL","MUL"],
                    });
                    award(currentPlayerId,"ET",250);
                    data.city.hero[2]=1;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(500*vipMultiplier);
                        data.city.easter.ppoints+=(500*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="oto4") {
                if (data.city.hero[80]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL5","FOL5","MUL5","MUL5"],
                    });
                    award(currentPlayerId,"ET",650);
                    data.city.hero[80]=1;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(1250*vipMultiplier);
                        data.city.easter.ppoints+=(1250*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="4thjuly") {
                if (data.city.hero[20]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["PG100"],
                    });
                    data.city.hero[20]=1;
                }
            } else if (items[i].identifier=="patrick") {
                if (data.city.hero[96]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    award(currentPlayerId,"AS",100);
                    data.city.hero[96]=1;
                }
            } else if (items[i].identifier=="wc1") {
                if (data.city.WC==1 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL"],
                    });
                    award(currentPlayerId,"ET",100);
                    award(currentPlayerId,"SD",1300000);
                    award(currentPlayerId,"PK",10);
                    data.city.WC=2;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(250*vipMultiplier);
                        data.city.easter.ppoints+=(250*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="wc2") {
                if (data.city.WC==2 && consumeItem(args.kid,args.token,items[i].id)) {
                    server.GrantItemsToUser({
                        "PlayFabId" : currentPlayerId,
                        "ItemIds": ["FOL","FOL","FOL"],
                    });
                    award(currentPlayerId,"ET",300);
                    award(currentPlayerId,"SD",3400000);
                    award(currentPlayerId,"PK",20);
                    data.city.WC=3;
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(625*vipMultiplier);
                        data.city.easter.ppoints+=(625*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="tm1m") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    if (data.city.tm<Date.now()) {
                        data.city.tm = Date.now()+30*DAY;
                    } else {
                        data.city.tm += 30*DAY;
                    }
                    award(currentPlayerId,"ET",100);
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(250*vipMultiplier);
                        data.city.easter.ppoints+=(250*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="tmlt2") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.tm = -1;
                    award(currentPlayerId,"ET",1300);
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(2500*vipMultiplier);
                        data.city.easter.ppoints+=(2500*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="tmlt") {
                data.city.tm = -1;
            } else if (items[i].identifier=="seasonpass1") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.pass.isGold = 1; 
                    award(currentPlayerId,"ET",650);
                    if (data.city.easter !== undefined) {
                        data.city.easter.points+=(1250*vipMultiplier);
                        data.city.easter.ppoints+=(1250*vipMultiplier);
                    }
                }
            } else if (items[i].identifier=="seasonpass") {
                if (consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.pass.isGold = 0;
                }
            } else if (items[i].identifier=="moon") {
                if (data.city.hero[113]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[113]=1;
                    award(currentPlayerId,"SD",5000000);
                }
            } else if (items[i].identifier=="guy") {
                if (data.city.hero[130]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[130]=1;
                    award(currentPlayerId,"AS",666);
                }
            } else if (items[i].identifier=="cupid") {
                if (data.city.hero[148]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[148]=1;
                    data.city.promo[148]=3;
                }
            } else if (items[i].identifier=="mother") {
                if (data.city.hero[168]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[168]=1;
                    data.city.easter.points+=(1250*vipMultiplier);
                    data.city.easter.ppoints+=(1250*vipMultiplier);
                    award(currentPlayerId,"PG",300);
                }
            } else if (items[i].identifier=="ltojames") {
                if (data.city.hero[20]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[20]=1;
                    award(currentPlayerId,"ET",110);
                    data.city.easter.points+=(250*vipMultiplier);
                    data.city.easter.ppoints+=(250*vipMultiplier);
                }
            } else if (items[i].identifier=="ltolepr") {
                if (data.city.hero[96]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[96]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="ltoneil") {
                if (data.city.hero[113]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[113]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="ltoguy") {
                if (data.city.hero[130]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[130]=1;
                    award(currentPlayerId,"ET",380);
                    data.city.easter.points+=(750*vipMultiplier);
                    data.city.easter.ppoints+=(750*vipMultiplier);
                }
            } else if (items[i].identifier=="ltosmith") {
                if (data.city.hero[180]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[180]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="ltocupid") {
                if (data.city.hero[148]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[148]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="ltomother") {
                if (data.city.hero[168]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[168]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(500*vipMultiplier);
                    data.city.easter.ppoints+=(500*vipMultiplier);
                }
            } else if (items[i].identifier=="ltokilkenny") {
                if (data.city.hero[205]==0 && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.hero[205]=1;
                    award(currentPlayerId,"ET",230);
                    data.city.easter.points+=(750*vipMultiplier);
                    data.city.easter.ppoints+=(750*vipMultiplier);
                    award(currentPlayerId,"PG",300);
                }
            } else if (items[i].identifier=="ltocommon") {
                if (ltokred(data) && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.easter.points+=(25*vipMultiplier);
                    data.city.easter.ppoints+=(25*vipMultiplier);
                    award(currentPlayerId,"ET",10);
                }
            } else if (items[i].identifier=="ltorare") {
                if (ltokred(data) && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.easter.points+=(75*vipMultiplier);
                    data.city.easter.ppoints+=(75*vipMultiplier);
                    award(currentPlayerId,"ET",30);
                };
            } else if (items[i].identifier=="ltolegen") {
                if (ltokred(data) && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.easter.points+=(250*vipMultiplier);
                    data.city.easter.ppoints+=(250*vipMultiplier);
                    award(currentPlayerId,"ET",110);
                };
            } else if (items[i].identifier=="ltoascended") {
                if (ltokred(data) && consumeItem(args.kid,args.token,items[i].id)) {
                    data.city.easter.points+=(625*vipMultiplier);
                    data.city.easter.ppoints+=(625*vipMultiplier);
                    award(currentPlayerId,"ET",300);
                };
            } else if (items[i].identifier=="recycle") {
                if (data.city.recycle.stage == 2) {
                    consumeItem(args.kid,args.token,items[i].id);
                    award(currentPlayerId,"ET",110);
                    data.city.easter.points+=(250*vipMultiplier);
                    data.city.easter.ppoints+=(250*vipMultiplier);
                    ++data.city.recycle.stage;
                }
            }
        }
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {mlvl:mlvl,city:JSON.stringify(data.city)} });
        data.mlvl=mlvl;
        if (data!==undefined) {
            return {ok:true,data:data};
        } else {
            return { ok: false, err: "Bad internal"};
        }
    } else {
        return { ok: false, err: "Bad auth"};
    }
}

handlers.purchaseBundle = function (args, context) {
    var ret1 = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (ret1) {
        if (args.bundle=="CC1") {
            if (ret1.VirtualCurrency.SD >= 15000 && pay(currentPlayerId,"SD",15000) && award(currentPlayerId,"CC",1)) {
                log("Buy 1 CC for 15000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="CC20") {
            if (ret1.VirtualCurrency.SD >= 270000 && pay(currentPlayerId,"SD",270000) && award(currentPlayerId,"CC",20)) {
                log("Buy 20 CC for 270000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="CC100") {
            if (ret1.VirtualCurrency.SD >= 1200000 && pay(currentPlayerId,"SD",1200000) && award(currentPlayerId,"CC",100)) {
                log("Buy 100 CC for 1200000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="PG1") {
            if (ret1.VirtualCurrency.SD >= 30000 && pay(currentPlayerId,"SD",30000) && award(currentPlayerId,"PG",1)) {
                log("Buy 1 PG for 30000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="PG5") {
            if (ret1.VirtualCurrency.UM >= 500 && pay(currentPlayerId,"UM",500) && award(currentPlayerId,"PG",5)) {
                log("Buy 5 PG for 15000 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="PG20") {
            if (ret1.VirtualCurrency.SD >= 540000 && pay(currentPlayerId,"SD",540000) && award(currentPlayerId,"PG",20)) {
                log("Buy 20 PG for 540000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="PG100") {
            if (ret1.VirtualCurrency.SD >= 2400000 && pay(currentPlayerId,"SD",2400000) && award(currentPlayerId,"PG",100)) {
                log("Buy 100 PG for 2400000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="AS1") {
            if (ret1.VirtualCurrency.SD >= 60000 && pay(currentPlayerId,"SD",60000) && award(currentPlayerId,"AS",1)) {
                log("Buy 1 AS for 60000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="AS20") {
            if (ret1.VirtualCurrency.SD >= 1080000 && pay(currentPlayerId,"SD",1080000) && award(currentPlayerId,"AS",20)) {
                log("Buy 20 AS for 1080000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="AS100") {
            if (ret1.VirtualCurrency.SD >= 4800000 && pay(currentPlayerId,"SD",4800000) && award(currentPlayerId,"AS",100)) {
                log("Buy 100 AS for 4800000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="BK1") {
            if (ret1.VirtualCurrency.UM >= 100 && pay(currentPlayerId,"UM",100) && award(currentPlayerId,"PK",1)) {
                log("Buy 1 Key for 100 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="BK11") {
            if (ret1.VirtualCurrency.UM >= 1000 && pay(currentPlayerId,"UM",1000) && award(currentPlayerId,"PK",11)) {
                log("Buy 11 Keys for 1000 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="BK25") {
            if (ret1.VirtualCurrency.UM >= 2000 && pay(currentPlayerId,"UM",2000) && award(currentPlayerId,"PK",25)) {
                log("Buy 25 Keys for 2000 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="K1") {
            if (ret1.VirtualCurrency.SD >= 50000 && pay(currentPlayerId,"SD",50000) && award(currentPlayerId,"PK",1)) {
                log("Buy 1 Key for 50000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="K20") {
            if (ret1.VirtualCurrency.SD >= 950000 && pay(currentPlayerId,"SD",950000) && award(currentPlayerId,"PK",20)) {
                log("Buy 20 Keys for 950000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="K100") {
            if (ret1.VirtualCurrency.SD >= 4500000 && pay(currentPlayerId,"SD",4500000) && award(currentPlayerId,"PK",100)) {
                log("Buy 100 Keys for 4500000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="HK1") {
            if (ret1.VirtualCurrency.SD >= 165000 && pay(currentPlayerId,"SD",165000) && award(currentPlayerId,"KU",10)) {
                log("Buy 1 Hero Key for 165000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="HK20") {
            if (ret1.VirtualCurrency.SD >= 3135000 && pay(currentPlayerId,"SD",3135000) && award(currentPlayerId,"KU",200)) {
                log("Buy 20 Hero Keys for 3135000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="HK100") {
            if (ret1.VirtualCurrency.SD >= 15000000 && pay(currentPlayerId,"SD",15000000) && award(currentPlayerId,"KU",1000)) {
                log("Buy 100 Hero Keys for 15000000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="EM1") {
            if (ret1.VirtualCurrency.SD >= 560000 && pay(currentPlayerId,"SD",560000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL"],
                });
                log("Buy 1 Enchant Miracles for 560000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="EM10") {
            if (ret1.VirtualCurrency.SD >= 5300000 && pay(currentPlayerId,"SD",5300000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL"],
                });
                log("Buy 10 Enchant Miracles for 5300000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="EM20") {
            if (ret1.VirtualCurrency.SD >= 10000000 && pay(currentPlayerId,"SD",10000000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL"],
                });
                log("Buy 20 Enchant Miracles for 10000000 SD");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="FOL5") {
            if (ret1.VirtualCurrency.UM >= 2300 && pay(currentPlayerId,"UM",2300)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL","FOL","FOL","FOL","FOL"],
                });
                log("Buy 5 Enchant Miracles for 2300 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="FOL15") {
            if (ret1.VirtualCurrency.UM >= 6000 && pay(currentPlayerId,"UM",6000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL","FOL"],
                });
                log("Buy 15 Enchant Miracles for 6000 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="MUL5") {
            if (ret1.VirtualCurrency.UM >= 2300 && pay(currentPlayerId,"UM",2300)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["MUL","MUL","MUL","MUL","MUL"],
                });
                log("Buy 5 Energy Multipliers for 2300 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="MUL15") {
            if (ret1.VirtualCurrency.UM >= 6000 && pay(currentPlayerId,"UM",6000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL","MUL"],
                });
                log("Buy 15 Energy Multipliers for 6000 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        } else if (args.bundle=="PK5") {
            if (ret1.VirtualCurrency.UM >= 500 && pay(currentPlayerId,"UM",500) && award(currentPlayerId,"PK",5)) {
                log("Buy 5 Keys for 500 UM");
                return { ok: true, update: true};   
            } else return { ok: false, err: "Can't buy" };
        }
    } else return { ok: false, err: "Bad internal"};
}

handlers.fstatus = function (args, context) {
    var data=loadData();
    if (data!==undefined) {
        var headers = {};
        var content = "action=prizes&key="+CQ+"&pid="+currentPlayerId;
        var httpMethod = "post";

        try {
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        } catch (e) {
            return { ok: false, err: "Wrong server request"};
        }

        if (response.success) {
            var update=false;
            for (var i=0; i<response.prizes.length; ++i) {
                var key=response.prizes[i].key;
                var value=response.prizes[i].value;
                var extra=response.prizes[i].extra;
                if (["AS","CC","KU","PG","PK","SD","UM"].indexOf(key)!==-1) award(currentPlayerId,key,value);
                else if (key=="FOL") {
                    update=true;
                    data.followers+=(value||0);
                } else if (key=="HERO" && value!==undefined && value!==null && value>=0) {
                    if (extra==undefined||extra==1) {
                        if (data.city.hero[value]<99) {
                            update=true;
                            ++data.city.hero[value];
                        } else award(currentPlayerId,"PG",12);
                    } else {
                        if (value>=0 && data.city.hero[value]<99) {
                            update=true;
                            data.city.hero[value]=Math.min(99,data.city.hero[value]+extra);
                        } else {
                            var pgr = 1;
                            if (HERO[value].rarity==1) pgr=3;
                            else if (HERO[value].rarity==2) pgr=12; 
                            award(currentPlayerId,"PG",pgr);
                        }
                    }
                }
            } 
            if (update) server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {followers:data.followers,city:JSON.stringify(data.city)}});
        }
        return {ok:true,data:data};
    } else {
        return { ok: false, err: "Bad auth"};
    }
}

handlers.evolution = function (args, context) {
    var ret = server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["meta","followers"]});
    if (ret && ret.Data) {
        var meta={
            species: 0,
            energy: 0,
            omega: 0
        }
        var update=false;
        var followers=parseInt(ret.Data.followers.Value);
        if (ret.Data.meta) meta=JSON.parse(ret.Data.meta.Value);
        if (meta.energy<args.energy) meta.energy=args.energy;
        if (meta.omega<args.omega) meta.omega=args.omega;
        if (meta.species<args.species && args.species<15) {
            var diff=args.species-meta.species;
            award(currentPlayerId,"UM",10*diff);
            followers+=1000*diff;
            meta.species=args.species;
            update=true;
        }

        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {meta:JSON.stringify(meta),followers:followers} });
        return {ok:true,update:update};
    } else {
        return { ok: false, err: "Bad auth"};
    }
}

handlers.panic = function (args, context) {
    var ret = server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["meta"]});
    if (ret && ret.Data && ret.Data.meta) {
        var meta=JSON.parse(ret.Data.meta.Value);
        return {ok:true,energy:meta.energy,omega:meta.omega};
    } else {
        return { ok: false, err: "Bad auth"};
    }
}

handlers.claim = function (args, context) {
    var data=loadData();
    if (data && data.miracles) {
        var mlvl1=getFOL();
        if (args.id>=0 && args.id<MIRACLES.length && data.miracles[args.id]<data.now) {
            data.miracles[args.id]=data.now+MIRACLES[args.id].time*60*60*1000*(1-data.city.easter.miracles);
            data.followers+=Math.round(MIRACLES[args.id].reward*(data.mlvl+mlvl1==0?1:2*(data.mlvl+mlvl1))*(1+data.city.mclaims[args.id]*0.01))*(1+data.city.easter.doubleem);
            statKong(args.kid,"followers",Math.floor(Math.log10(data.followers)*1000));
            data.city.pass.miracles+=1;
            //if (data.city.easter!==undefined) ++data.city.easter.points;
            ++data.city.mclaims[args.id];
        }
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {miracles:JSON.stringify(data.miracles),followers:data.followers,city:JSON.stringify(data.city)} });
        return {ok:true,data:data};
    } else {
        return { ok: false, err: "Bad internal"};
    }
}

handlers.claimall = function (args, context) {
    var data=loadData();
    if (data && data.miracles) {
        var mlvl1=getFOL();
        var done=0;
        for (var i=0; i<MIRACLES.length; ++i) {
            if (data.miracles[i]<data.now) {
                data.miracles[i]=data.now+MIRACLES[i].time*60*60*1000*(1-data.city.easter.miracles);
                data.followers+=Math.round(MIRACLES[i].reward*(data.mlvl+mlvl1==0?1:2*(data.mlvl+mlvl1))*(1+data.city.mclaims[i]*0.01))*(1+data.city.easter.doubleem);
                ++data.city.mclaims[i];
                ++done;
            }
        }
        data.city.pass.miracles+=done;
        //if (data.city.easter!==undefined) data.city.easter.points+=done;
        statKong(args.kid,"followers",Math.floor(Math.log10(data.followers)*1000));
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {miracles:JSON.stringify(data.miracles),followers:data.followers,city:JSON.stringify(data.city)} });
        return {ok:true,data:data,done:done};
    } else {
        return { ok: false, err: "Bad internal"};
    }
}

handlers.open = function (args, context) {
    var data=loadData();
    var ret1 = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret1) {
        var valid=false;
        var hero=false;
        if (args.mode!==undefined && args.mode=="hero") hero=true;
        if (hero) {
            if (ret1.VirtualCurrency.KU>=10) {
                if (pay(currentPlayerId,"KU",10)) valid=true;
            }
        } else {
            if (ret1.VirtualCurrency.BK>0) {
                if (pay(currentPlayerId,"BK",1)) valid=true;
            } else if (ret1.VirtualCurrency.PK>0) {
                if (pay(currentPlayerId,"PK",1)) valid=true;
            } /*else if (ret1.VirtualCurrency.UM>=100) {
                var res = server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": 100
                });
                if (res)valid=true;
            }*/
        }
        if (valid) {
            data.city.pass.chest+=1;
            var rnd=Math.random();
            if (!hero) {
                award(currentPlayerId,"KU",1);
            } else {
                rnd=0.8+rnd/5;
                if (rnd>=1) rnd=0.9999;
            }
            
            var prize = 0;
            while (prize<REWARD.length && rnd>REWARD[prize].c) {
                rnd-=REWARD[prize].c;
                ++prize;
            }
            if (prize>=REWARD.length) prize=0;

            if (REWARD[prize].t=="FOL") {
                var mlvl1=getFOL();
                data.followers+=Math.round(Math.max(REWARD[prize].v*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem),Math.min(3000000000,data.followers)*REWARD[prize].p));
                log("[CHEST] "+Math.round(Math.max(REWARD[prize].v*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem),Math.min(3000000000,data.followers)*REWARD[prize].p))+" followers");
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {followers:Math.round(data.followers)}});
            } else if (REWARD[prize].t=="UM") {
                log("[CHEST] "+REWARD[prize].v+" UM");
                award(currentPlayerId,"UM",REWARD[prize].v);
            } else if (REWARD[prize].t=="HERO") {
                var tiers = HERODROP.length/3;
                var times = 0;
                do {
                    var roll = Math.random();
                    var tid = Math.floor(roll*tiers);
                    var tpos = roll*tiers - tid;
                    var rar = tpos<=0.6?0:tpos<=0.9?1:2;
                    var hpos = tid*3+rar;
                    var hid = HERODROP[hpos];
                } while ((data.city.hero[hid]>=99 || data.city.promo[hid]>0) && times++<500);
                if (data.city.hero[hid]>=99 || data.city.promo[hid]>0) {
                    if (HERO[hid].rarity==0) {
                        log("["+(hero?"HERO":"")+"CHEST] HERO lvl 99 got 1 PG");
                        award(currentPlayerId,"PG",1);
                    } else if (HERO[hid].rarity==1) {
                        log("["+(hero?"HERO":"")+"CHEST] HERO lvl 99 got 3 PG");
                        award(currentPlayerId,"PG",3);
                    } else if (HERO[hid].rarity==2) {
                        log("["+(hero?"HERO":"")+"CHEST] HERO lvl 99 got 12 PG");
                        award(currentPlayerId,"PG",12);
                    }
                } else {
                    ++data.city.hero[hid];
                    log("["+(hero?"HERO":"")+"CHEST] HERO:"+hid);
                }
                prize=-2-hid;
            }
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
            return {ok:true,data:data,result:prize};
        } else {
            return { ok: false, err: "Can't use"};
        }
    } else {
        return { ok: false, err: "Bad internal"};
    }
}

handlers.open10 = function (args, context) {
    var data=loadData();
    var ret1 = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret1) {
        var amount = 10;
        if (args.mul>0 && args.mul<=10) amount=args.mul;
        var valid=false;
        var hero=false;
        if (args.mode!==undefined && args.mode=="hero") hero=true;
        if (hero) {
            if (ret1.VirtualCurrency.KU>=10*amount) {
                if (pay(currentPlayerId,"KU",10*amount)) valid=true;
            }
        } else {
            if (ret1.VirtualCurrency.PK>=1*amount) {
                if (pay(currentPlayerId,"PK",1*amount)) valid=true;
            }
        }
        if (valid) {
            data.city.pass.chest+=amount;
            if (!hero) award(currentPlayerId,"KU",amount);
            var rarr = [];
            var logs = "";
            var followers = 0;
            var UMS = 0;
            var PGS = 0;
            var heros = [];
            var mlvl1=getFOL();
            for (var i=0; i<amount; ++i) {
                var rnd=Math.random();
                if (hero) rnd=0.8+rnd/5;
                if (rnd>=1) rnd=0.9999;
                
                var prize = 0;
                while (prize<REWARD.length && rnd>REWARD[prize].c) {
                    rnd-=REWARD[prize].c;
                    ++prize;
                }
                if (prize>=REWARD.length) prize=0;

                if (REWARD[prize].t=="FOL") {
                    followers+=Math.round(Math.max(REWARD[prize].v*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem),Math.min(3000000000,data.followers)*REWARD[prize].p));
                    data.followers+=Math.round(Math.max(REWARD[prize].v*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem),Math.min(3000000000,data.followers)*REWARD[prize].p));
                } else if (REWARD[prize].t=="UM") {
                    UMS +=REWARD[prize].v;
                } else if (REWARD[prize].t=="HERO") {
                    var tiers = HERODROP.length/3;
                    var times = 0;
                    do {
                        var roll = Math.random();
                        var tid = Math.floor(roll*tiers);
                        var tpos = roll*tiers - tid;
                        var rar = tpos<=0.6?0:tpos<=0.9?1:2;
                        var hpos = tid*3+rar;
                        var hid = HERODROP[hpos];
                    } while ((data.city.hero[hid]>=99 || data.city.promo[hid]>0) && times++<500)
                    if (data.city.hero[hid]>=99 || data.city.promo[hid]>0) {
                        if (HERO[hid].rarity==0) {
                            PGS += 1;
                        } else if (HERO[hid].rarity==1) {
                            PGS += 3;
                        } else if (HERO[hid].rarity==2) {
                            PGS += 12;
                        }
                    } else {
                        ++data.city.hero[hid];
                        heros.push(hid);
                    }
                    prize=-2-hid;
                }
                rarr.push(prize);
            }
            var logstr = "["+amount+(hero?"HERO":"")+"CHEST] ";
            if (UMS>0) {
                award(currentPlayerId,"UM",UMS);
                logstr+=" UM:"+UMS+" ";
            }
            if (followers>0) {
                logstr+=" Followers:"+followers+" ";
            }
            if (PGS>0) {
                award(currentPlayerId,"PG",PGS);
                logstr+=" PG:"+PGS+" ";
            }
            if (heros.length>0) {
                logstr+=" HERO:"+heros.join(",")+" ";
            }
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city),followers:Math.round(data.followers)}});
            return {ok:true,data:data,result:rarr};
        } else {
            return { ok: false, err: "Can't use"};
        }
    } else {
        return { ok: false, err: "Bad internal"};
    }
}

handlers.place = function (args, context) {
    if (authKong(args.kid,args.token)) {
        var data=loadData();
        if (data!==undefined) {
            if (args.pos>=0 && args.pos<data.city.setup.length) {
                var valid=false;
                if (args.id>=-1 && args.id<MONSTERS.length && args.id<140) {
                    data.city.setup[args.pos]=args.id;
                    var score=0;
                    for (var i=0; i<data.city.setup.length; ++i) {
                        if (data.city.setup[i]>=0) score+=MONSTERS[data.city.setup[i]].cost;
                    }
                    if (score<=data.followers) {
                        valid=true;
                    }
                } else if (args.id<=-2 && args.id>-(2+HERO.length)) {
                    data.city.setup[args.pos]=args.id;
                    var count=0;
                    for (var i=0; i<data.city.setup.length; ++i) {
                        if (data.city.setup[i]==args.id) ++count;
                    }
                    var hid=-(args.id+2);
                    if (data.city.hero[hid]>0 && count==1) valid=true; 
                }
                if (valid) {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return { ok:true, data:data };
                } else {
                    return { ok: false, err: "Not valid"};
                }
            } else {
                return { ok: false, err: "Bad params"};
            }
        } else {
            return { ok: false, err: "Bad internal"};
        }
    } else {
        return { ok: false, err: "Wrong user"};
    }
}

handlers.swap = function (args, context) {
    var data=loadData();
    if (data!==undefined) {
        if (args.pos0>=0 && args.pos0<data.city.setup.length && args.pos1>=0 && args.pos1<data.city.setup.length) {
            var tmp=data.city.setup[args.pos0];
            data.city.setup[args.pos0]=data.city.setup[args.pos1];
            data.city.setup[args.pos1]=tmp;
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return { ok:true, data:data };
        } else {
            return { ok: false, err: "Bad params"};
        }
    } else {
        return { ok: false, err: "Bad internal"};
    }
}

handlers.clearall = function (args, context) {
    if (authKong(args.kid,args.token)) {
        var data=loadData();
        if (data!==undefined) {
            data.city.setup=Array(36).fill(-1);
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return { ok:true, data:data };
        } else {
            return { ok: false, err: "Bad internal"};
        }
    } else {
        return { ok: false, err: "Wrong user"};
    }
}

function expected(A, B) {
    return 1 / (1 + Math.pow(10,((B - A) / 400)));
}


function elo(old, exp, score) {
    var k=32;
    return Math.round(old + k * (score - exp));
}

handlers.fight = function (args, context) {
    if (authKong(args.kid,args.token)&&currentPlayerId!=args.id) {
        var reqA=server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["miracles","mlvl","followers","city"]});
        var data = {
            city: JSON.parse(reqA.Data.city.Value),
            followers: parseInt(reqA.Data.followers.Value),
            now: Date.now(),
            mlvl: parseInt(reqA.Data.mlvl.Value),
            miracles: JSON.parse(reqA.Data.miracles.Value)
        };

         
        data.city.pass.pvp+=1;
        var dataA,dataB;
        if (data!==undefined &&data.city.pvp!==undefined) {
            if (data.city.pvp.attacks>0) {
                var rankA=server.GetPlayerStatistics({
                    "PlayFabId": currentPlayerId,
                    "StatisticNames": ["Ranking"]
                });
                var infoA=server.GetUserAccountInfo({
                    "PlayFabId": currentPlayerId,
                });
                if (rankA && infoA) {
                    dataA = {
                        id: currentPlayerId,
                        name: infoA.UserInfo.TitleInfo.DisplayName,
                        elo: rankA.Statistics[0].Value,
                        followers: data.followers,
                        city: data.city
                    }
                } else return {ok: false, err: "Server error1"};
            } else return {ok: false,err:"No charges left"};
        } else return {ok: false,err:"Server error"};

        var reqB=server.GetUserInternalData({"PlayFabId" : args.id, "Keys" : ["followers","city"]});
        var rankB=server.GetPlayerStatistics({
            "PlayFabId": args.id,
            "StatisticNames": ["Ranking"]
        });
        var infoB=server.GetUserAccountInfo({
            "PlayFabId": args.id,
        });
        var eloB = rankB.Statistics===undefined||rankB.Statistics.length==0?1000:rankB.Statistics[0].Value;
        if (rankB && infoB && reqB && reqB.Data && reqB.Data.followers && reqB.Data.city) {
            dataB = {
                id: args.id,
                name: infoB.UserInfo.TitleInfo.DisplayName,
                elo: eloB,
                followers: parseInt(reqB.Data.followers.Value),
                city: JSON.parse(reqB.Data.city.Value)
            }
        } else return {ok: false,err:"Server error2"};
        var valid=true;
        for (var i=0; i<data.city.pvp.lasts.length; ++i) {
            if (data.city.pvp.lasts[i].name==dataB.name && Date.now()-data.city.pvp.lasts[i].time<15*60*1000) valid=false;
        }
        
        if (Math.max(dataA.elo,dataB.elo)-Math.min(dataA.elo,dataB.elo)>1000) return {ok: false, err: "Too weak to fight"};
        if (Math.max(dataA.followers,dataB.followers)/Math.min(dataA.followers,dataB.followers)>100000) return {ok: false, err: "Can't fight"};
        if (dataA.followers<1000||dataB.followers<1000) return {ok: false,err:"Need 1000 followers"};
        if (valid) --data.city.pvp.attacks;
        else return {ok: false,err:"You already attacked this player"};
        data.city.pvp.lasts.push({
            name: dataB.name,
            time: Date.now()
        });
        var row=Math.floor(Math.random()*6);
        // fight
        var rowA = dataA.city.setup.slice(row*6,(row+1)*6);
        var rowB = dataB.city.setup.slice(row*6,(row+1)*6);
        var fres=mfight(rowA,rowB,dataA.city.hero,dataB.city.hero,dataA.city.promo,dataB.city.promo);
        var winA=0;
        var winB=0;
        var expA=expected(dataA.elo,dataB.elo);
        var expB=expected(dataB.elo,dataA.elo);
        var eloA=dataA.elo;
        var eloB=dataB.elo;
        var gainA=0;
        var gainB=0;
        if (fres==1) {
            eloA=elo(eloA,expA,1);
            eloB=elo(eloB,expB,0);
            winA=1;
            winB=-1;
            gainA=Math.ceil(1.1*Math.max(eloA,eloB)/1);
            gainB=Math.ceil(1.1*Math.max(eloA,eloB)/5);
            dataA.city.result[0]+=1;
            dataB.city.result[2]+=1;
        } else if (fres==-1) {
            eloA=elo(eloA,expA,0);
            eloB=elo(eloB,expB,1);
            winA=-1;
            winB=1;
            gainB=Math.ceil(1.1*Math.max(eloA,eloB)/1);
            gainA=Math.ceil(1.1*Math.max(eloA,eloB)/5);
            dataA.city.result[2]+=1;
            dataB.city.result[0]+=1;
        } else {
            eloA=elo(eloA,expA,0.5);
            eloB=elo(eloB,expB,0.5);
            gainB=Math.ceil(1.1*Math.max(eloA,eloB)/2);
            gainA=gainB;
            dataA.city.result[1]+=1;
            dataB.city.result[1]+=1;
        }

        var resA = {
            result: winA,
            enemy: dataB.name,
            date: data.now,
            earn: gainA,
            rank: eloA,
            rankd: eloA-dataA.elo,
            setup: rowA,
            shero: dataA.city.hero,
            player: rowB,
            phero: dataB.city.hero,
            spromo: dataA.city.promo,
            ppromo: dataB.city.promo,
        };
        var resB = {
            result: winB,
            enemy: dataA.name,
            date: data.now,
            earn: gainB,
            rank: eloB,
            rankd: eloB-dataB.elo,
            setup: rowB,
            shero: dataB.city.hero,
            player: rowA,
            phero: dataA.city.hero,
            spromo: dataB.city.promo,
            ppromo: dataA.city.promo,
        }
        updateS(dataA.id,"Ranking",Math.max(1,eloA));
        updateS(dataB.id,"Ranking",Math.max(1,eloB));
        award(dataA.id,"SD",resA.earn);
        award(dataB.id,"SD",resB.earn);
        dataA.city.nextfight=data.now+60*60*1000;
        //if (dataA.city.easter!==undefined) dataA.city.easter.points+=2;
        var tid=Math.floor(Date.now()/(24*60*60*1000));
        dataA.city.log.unshift(resA);
        if (dataA.city.log.length>20) dataA.city.log.pop();
        dataB.city.log.unshift(resB);
        if (dataB.city.log.length>20) dataB.city.log.pop();
        server.UpdateUserInternalData({"PlayFabId" : dataA.id, "Data" : {city:JSON.stringify(dataA.city)}});
        server.UpdateUserInternalData({"PlayFabId" : dataB.id, "Data" : {city:JSON.stringify(dataB.city)}});
        return {ok:true,data:data,battle:resA};
    }
}

function checkSetup(setup,len,fol,hero) {
    var score=0;
    var mcount=0;
    var used={};
    if (setup.length==len) {
        for (var i=0; i<setup.length; ++i) {
            if (setup[i]>=0 && setup[i]<MONSTERS.length) {
                score+=MONSTERS[setup[i]].cost;
                ++mcount;
            } else if (setup[i]<=-2 && setup[i]>-(2+HERO.length) && hero[-(setup[i]+2)]>0) {
                if (used[setup[i]]===undefined) {
                    ++mcount;
                    used[setup[i]]=1;
                } else return {ok: false,err:"Repeated Hero"};
            } else setup[i]=-1;
        }
        if (score>fol) return {ok: false,err:"Bad follower count"};
        else if (mcount==0) return {ok: false,err:"No monsters used"};
        else return mcount;
    } else return {ok: false,err:"Bad setup length"};
}

handlers.pve = function (args, context) {
    var data=loadData();
    if (data===undefined) return {ok: false,err:"Server error"};
    // check enough followers
    var mcount=checkSetup(args.setup,6,data.followers,data.city.hero);
    if (typeof mcount !== "number") return mcount;
    if (args.id<0 || args.id>=PVE.length || args.id>data.city.quests.length) return {ok: false,err:"Unknown quest"};
    // fight
    var rowA = args.setup;
    var rowB = PVE[args.id].setup;
    var fres = mfight(rowA,rowB,data.city.hero,PVEHERO2,data.city.promo,PVEPROMO);
    if (fres==1) {
        var res=1;
        if (mcount<=5) res|=2;
        if (mcount<=4) res|=4;
        if (data.city.quests.length<args.id) {
            data.city.quests.push(res);
            if ((res&1)>0) data.followers+=PVE[args.id].r;
            if ((res&2)>0) data.followers+=PVE[args.id].r*2;
            if ((res&4)>0) data.followers+=PVE[args.id].r*4;
        } else {
            var curr=data.city.quests[args.id];
            if ((curr&1)==0 && (res&1)>0) data.followers+=PVE[args.id].r;
            if ((curr&2)==0 && (res&2)>0) data.followers+=PVE[args.id].r*2;
            if ((curr&4)==0 && (res&4)>0) data.followers+=PVE[args.id].r*4;
            data.city.quests[args.id]|=res;
        }
        if (mcount<=3) {
            for (var i=0; i<args.setup.length; ++i) {
                var hid = -(args.setup[i]+2);
                if (hid>=0) {
                    if (promoData[hid].quest==args.id && data.city.promo[hid]==1) {
                        data.city.promo[hid]=2;
                    }
                }
            }
        }
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city),followers:data.followers}});
    }
    var score = 0;
    for (var i=0; i<data.city.quests.length; ++i) {
        score+=data.city.quests[i];
    }
    statKong(args.kid,"quests",score);
    var result = {
        enemy: "Quest "+(args.id+1),
        date: Date.now(),
        setup: rowA,
        shero: data.city.hero,
        player: rowB,
        phero: PVEHERO2,
        spromo: data.city.promo,
        ppromo: PVEPROMO
    }
    return {ok:true,data:data,battle:result};
}

/*handlers.resetpve = function (args, context) {
    var data=loadData();
    if (data!==undefined) {
        if (data.city.daily!==undefined && data.city.daily.spawn+60*60*1000<data.now && data.city.daily.lvl>1 && data.city.daily.timer-12*60*60*1000<data.now) {
            data.city.daily=undefined;
            delete data.city.daily;
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
        }
        return {ok:true,data:data};
    } else {
        return { ok: false, err: "Bad internal"};
    }
}*/

function hval(hid,lvl) {
    var hp=HERO[hid].hp;
    var atk=HERO[hid].atk;
    var points = lvl - 1;
    if (HERO[hid].rarity==1) points *= 2;
    else if (HERO[hid].rarity==2) points *= 6;
    else if (HERO[hid].rarity==3) points *= 12;
    var nhp = HERO[hid].hp+Math.round(points*hp/(hp+atk));
    var natk = HERO[hid].atk+Math.round(points*atk/(hp+atk));
    var score = nhp*natk;
    if (HERO[hid].skill.type=="pierce") score*=HERO[hid].skill.value/2;
    else if (HERO[hid].skill.type=="buff") score*=HERO[hid].skill.value*2;
    else if (HERO[hid].skill.type=="rico") score*=HERO[hid].skill.value*3;
    else if (HERO[hid].skill.type=="anarchy") score*=HERO[hid].skill.value*3;
    else if (HERO[hid].skill.type=="counter") score*=HERO[hid].skill.value*3;
    else if (HERO[hid].skill.type=="cubetarget") score*=HERO[hid].skill.value*3;
    else if (HERO[hid].skill.type=="payback") score*=HERO[hid].skill.value*3;
    return score*Math.sqrt(score);
}

function doDaily(lvl) {
    var target=Math.pow(1.21-0.42*(1-(350+lvl)/(350+lvl*2)),lvl-1)*2500*(1+lvl/100)*0.8;
    var root=[Math.floor(Math.random()*4),-1,-1,-1,-1,-1];
    for (var i=1; i<5; ++i) {
        root[i]=N[root[i-1]%4][Math.floor(Math.pow(Math.random()*2,2))];
    }
    var hero=PVEHERO.slice();
    var bcost=0;
    for (var i=0; i<5; ++i) {
        if (bcost<target) {
            var fam=root[i];
            var avgleft=(target*0.8-bcost)/(5-i);
            while (fam+4<MONSTERS.length && fam+4<132 && MONSTERS[fam+4].cost<avgleft) {
                fam+=4;
            }
            root[i]=fam;
            bcost+=MONSTERS[root[i]].cost;
        }
    }
    // pick 2 commons, 2 rares, 2 legendaries
    var ignore=[69,72,76,87,98,99,106,126,128,153,154,155,156,198];
    var picks=[];
    while (picks.length<20) {
        var hid=Math.floor(Math.random()*HERO.length);
        if (picks.length<5) {
            if (HERO[hid].rarity==0 && picks.indexOf(hid)===-1 && ignore.indexOf(hid)===-1) picks.push(hid);
        } else if (picks.length<10) {
            if (HERO[hid].rarity==1 && picks.indexOf(hid)===-1 && ignore.indexOf(hid)===-1) picks.push(hid);
        } else if (picks.length<15) {
            if (HERO[hid].rarity==2 && picks.indexOf(hid)===-1 && ignore.indexOf(hid)===-1) picks.push(hid);
        } else {
            if (HERO[hid].rarity==3 && picks.indexOf(hid)===-1 && ignore.indexOf(hid)===-1) picks.push(hid);
        }
    }
    var placed=[];
    for (var pos=0; pos<=4; ++pos) {
        var todo=target-(bcost-MONSTERS[root[pos]].cost);
        var bestid=-1;
        var bestlvl=0;
        for (var i=0;i<picks.length;++i) {
            if (placed.indexOf(picks[i])===-1) {
                if (hval(picks[i],1)<todo) {
                    var lvl=1;
                    while (lvl<9000 && hval(picks[i],lvl<99?lvl+1:(lvl<1000?1000:lvl+1000))<todo) {
                        lvl=lvl<99?lvl+1:(lvl<1000?1000:lvl+1000);
                    }
                    if (bestid==-1 || hval(picks[bestid],bestlvl)<hval(picks[i],lvl)) {
                        bestid=i;
                        bestlvl=lvl;
                    }
                }
            }
        }
        if (bestid!=-1 && hval(picks[bestid],bestlvl)>1.5*MONSTERS[root[pos]].cost) {
            bcost-=MONSTERS[root[pos]].cost;
            bcost+=hval(picks[bestid],bestlvl);
            placed.push(picks[bestid]);
            root[pos]=-(2+picks[bestid]);
            hero[picks[bestid]]=bestlvl;
        }
    }
    return {
        setup:root,
        hero:hero
    };
}

handlers.pved = function (args, context) {
    var content = "action=check&key="+CQ+"&pid="+currentPlayerId;
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (!response.success) return {ok: false,err:response.error};

    var data=loadData();
    var dataA,dataB;
    if (data==undefined) return {ok: false,err:"Server error"};
    // check enough followers
    var mcount=checkSetup(args.setup,6,data.followers,data.city.hero);
    if (typeof mcount !== "number") return mcount;
    // fight
    var rowA = args.setup;
    if (args.max==true) {
        var keep=true;
        var adv=0;
        var update=false;
        var flvl=data.city.daily.lvl;
        var rowB=data.city.daily.setup;
        var thero=(data.city.daily.hero||PVEHERO).slice();
        var prhero=(data.city.daily.promo||PVEPROMO).slice();
        var top=20;
        while (keep&&top>0) {
            flvl=data.city.daily.lvl;
            rowB=data.city.daily.setup;
            var fres = mfight(rowA,rowB,data.city.hero,data.city.daily.hero||PVEHERO,data.city.promo,data.city.daily.promo||PVEPROMO);
            thero=(data.city.daily.hero||PVEHERO).slice();
            prhero=(data.city.daily.promo||PVEPROMO).slice();
            if (fres==1) {
                if (data.city.daily.lvl%5==0) {
                    var pos=Math.floor(data.city.daily.lvl/5)-1;
                    update=true;
                    award(currentPlayerId,dr[pos%dr.length].curr,dr[pos%dr.length].val);
                }
                ++adv;
                data.city.daily.lvl+=1;
                var daily=doDaily(data.city.daily.lvl);
                data.city.daily.setup=daily.setup;
                data.city.daily.hero=daily.hero;
                data.city.daily.promo=daily.promo;
                data.city.pass.quests+=1;
            } else {
                keep=false;
            }
            --top;
        }
        if (adv>0) {
            statKong(args.kid,"daily2",data.city.daily.lvl-1);
        }
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
        var result = {
            enemy: "Daily Fight "+flvl,
            date: data.now,
            setup: rowA,
            shero: data.city.hero,
            player: rowB,
            phero: thero,
            spromo: data.city.promo,
            ppromo: prhero
        }
        return {ok:true,data:data,battle:result,update:update};
    } else {
        var flvl=data.city.daily.lvl;
        var rowB=data.city.daily.setup;
        var fres = mfight(rowA,rowB,data.city.hero,data.city.daily.hero||PVEHERO,data.city.promo,data.city.daily.promo||PVEPROMO);
        var update=false;
        var thero=(data.city.daily.hero||PVEHERO).slice();
        var prhero=(data.city.daily.promo||PVEPROMO).slice();
        if (fres==1) {
            data.city.pass.quests+=1;
            if (data.city.daily.lvl%5==0) {
                var pos=Math.floor(data.city.daily.lvl/5)-1;
                update=true;
                award(currentPlayerId,dr[pos%dr.length].curr,dr[pos%dr.length].val);
            }
            statKong(args.kid,"daily2",data.city.daily.lvl);
            data.city.daily.lvl+=1;
            var daily=doDaily(data.city.daily.lvl);
            data.city.daily.setup=daily.setup;
            data.city.daily.hero=daily.hero;
            data.city.daily.promo=daily.promo;
        }
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
        var result = {
            enemy: "Daily Fight "+flvl,
            date: data.now,
            setup: rowA,
            shero: data.city.hero,
            player: rowB,
            phero: thero,
            spromo: data.city.promo,
            ppromo: prhero
        }
        return {ok:true,data:data,battle:result,update:update};
    }
}
var QH = [3,4,5,6,19,27,28,29,39,40,41,54,55,56,57,58,88,89,90,91,114,115,116,117,118,119,120,121,122,123,124,125,157,158,159,160];
var OQH = [0,1,2,51,52,53,96,113,127,128,129,148,152,161,162,163,168,204,205];
handlers.claimH = function (args, context) {
    var data=loadData();
    if (data) {
        if (args.id>=0 && args.id<(PVE.length/5)) {
            for (var i=args.id*5; i<(args.id+1)*5; ++i) {
                if (data.city.quests[i]!==7) return { ok: false, err: "Criteria not met"};
            }
            if (data.city.hero[QH[args.id]]!==0) return { ok: false, err: "Already claimed"};
            data.city.hero[QH[args.id]]=1;
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return {ok:true,data:data};
        } else return { ok: false, err: "Unknown map"};
    } else return { ok: false, err: "Server error"};
} 

handlers.levelUp = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var prices = [1,3,12];
    if (data&&ret&&(args.mode=="CC"||args.mode=="PG")) {
        var ignore = [73,74,75,97,98,99,137,138,139,153,154,155,156,200,201,202,203,206,207,208,209,218,219,220,221,222,223,224,225,226,227,228,229];
        if (args.mode=="CC"&&(QH.concat(OQH)).indexOf(args.id)===-1) return { ok: false, err: "Only Quest Heroes"};
        if (args.id>=0 && args.id<HERO.length) {
            if (ignore.indexOf(args.id)!==-1) return { ok: false, err: "Can't level up"};
            else if (data.city.hero[args.id]>=99) return { ok: false, err: "Max level"};
            else if (data.city.hero[args.id]<=0) return { ok: false, err: "Hero not Obtained"};
            else if (ret.VirtualCurrency[args.mode]<prices[HERO[args.id].rarity]) return { ok: false, err: "Not enough "+args.mode};
            if (pay(currentPlayerId,args.mode,prices[HERO[args.id].rarity])) {
                ++data.city.hero[args.id];
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,args.mode,prices[HERO[args.id].rarity])
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else return { ok: false, err: "Can't buy" };
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
} 

handlers.levelUp10 = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var prices = [10,30,120];
    if (data&&ret&&(args.mode=="CC"||args.mode=="PG")) {
        var ignore = [73,74,75,97,98,99,137,138,139,153,154,155,156,200,201,202,203,206,207,208,209,218,219,220,221,222,223,224,225,226,227,228,229];
        if (args.mode=="CC"&&(QH.concat(OQH)).indexOf(args.id)===-1) return { ok: false, err: "Only Quest Heroes"};
        if (args.id>=0 && args.id<HERO.length) {
            if (ignore.indexOf(args.id)!==-1) return { ok: false, err: "Can't level up"};
            else if (data.city.hero[args.id]>=90) return { ok: false, err: "Max level"};
            else if (data.city.hero[args.id]<=0) return { ok: false, err: "Hero not Obtained"};
            else if (ret.VirtualCurrency[args.mode]<prices[HERO[args.id].rarity]) return { ok: false, err: "Not enough "+args.mode};
            var ok=true;
            try {
                server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": args.mode,
                    "Amount": prices[HERO[args.id].rarity]
                });
            } catch(e) {
                ok=false;
            }
            if (ok) {
                data.city.hero[args.id]+=10;
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,args.mode,prices[HERO[args.id].rarity]);
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else return { ok: false, err: "Can't buy" };
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
}

handlers.levelUpMax = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var prices = [1,3,12];
    if (data&&ret&&(args.mode=="CC"||args.mode=="PG")) {
        var ignore = [73,74,75,97,98,99,137,138,139,153,154,155,156,200,201,202,203,206,207,208,209,218,219,220,221,222,223,224,225,226,227,228,229];
        if (args.mode=="CC"&&(QH.concat(OQH)).indexOf(args.id)===-1) return { ok: false, err: "Only Quest Heroes"};
        if (args.id>=0 && args.id<HERO.length) {
            if (ignore.indexOf(args.id)!==-1) return { ok: false, err: "Can't level up"};
            else if (data.city.hero[args.id]>=99) return { ok: false, err: "Max level"};
            else if (data.city.hero[args.id]<=0) return { ok: false, err: "Hero not Obtained"};
            else {
                var maxAffoard=undefined;
                var Need = (99 - data.city.hero[args.id]) * prices[HERO[args.id].rarity];
                if (ret.VirtualCurrency[args.mode] >= Need) maxAffoard = Need;
                else maxAffoard = Math.floor(ret.VirtualCurrency[args.mode] / prices[HERO[args.id].rarity]) * prices[HERO[args.id].rarity];
                var ok=true;
                try {
                    server.SubtractUserVirtualCurrency({
                        "PlayFabId" : currentPlayerId,
                        "VirtualCurrency": args.mode,
                        "Amount": maxAffoard
                    });
                } catch(e) {
                    ok=false;
                }
                if (ok) {
                    data.city.hero[args.id]+=(maxAffoard/prices[HERO[args.id].rarity]);
                    try {
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    } catch (e) {
                        award(currentPlayerId,args.maxAffoard);
                        return {ok: false, err: "DB unavailable"};
                    }
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Can't buy" };
            } 
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
}

handlers.levelDev = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var price = 750; //UM
    if (data&&ret) {
        if (args.id!=42&&args.id!=43&&args.id!=44&&args.id!=101) return {ok:false, err: "Only dev heroes"};
        if (args.id>=0 && args.id<HERO.length) {
            if (data.city.hero[args.id]>=99) return { ok: false, err: "Max level"};
            else if (data.city.hero[args.id]<=0) return { ok: false, err: "Hero not Obtained"};
            else if (ret.VirtualCurrency.UM<price) return { ok: false, err: "Not enough UM"};
            else if (pay(currentPlayerId,"UM",750)) {
                ++data.city.hero[args.id];
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,"UM",price);
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else return { ok: false, err: "Can't buy" };
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
}
function ASLVL(lvl,next) {
    if (next===undefined||next==1) return lvl;
    var currlvl = lvl*(lvl-1)/2;
    var nextlvl = (lvl+next)*(lvl+next-1)/2;
    return nextlvl-currlvl;
}

function MAXASLVL(lvl,as) {
    var val = 0.5*(Math.sqrt(8*as+4*lvl*lvl-4*lvl+1)-2*lvl+1);
    return Math.floor(Math.min(99-lvl,val));
}


handlers.levelSuper = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret&&(args.mode=="CC"||args.mode=="AS")) {
        if (HERO[args.id].rarity != 3) return {ok:false, err: "Only Super Heroes"};
        var ignore = [73,74,75,97,98,99,137,138,139,153,154,155,156,200,201,202,203,206,207,208,209,218,219,220,221,222,223,224,225,226,227,228,229];
        if (ignore.indexOf(args.id)!==-1) return { ok: false, err: "Can't level up"};
        if (args.mode=="CC"&&QH.concat([164]).indexOf(args.id)==-1) return {ok:false, err: "Nope."};
        if (args.id>=0 && args.id<HERO.length) {
            if (data.city.hero[args.id]>=99) return { ok: false, err: "Max level"};
            else if (data.city.hero[args.id]<=0) return { ok: false, err: "Hero not Obtained"};
            else {
                var price = data.city.hero[args.id];
                var lvls = 1;
                if (args.multi == "mul") {
                    price = ASLVL(data.city.hero[args.id],10);
                    lvls = 10;
                } else if (args.multi == "max") {
                    var nextlvl = MAXASLVL(data.city.hero[args.id],ret.VirtualCurrency[args.mode]);
                    price = ASLVL(data.city.hero[args.id],nextlvl);
                    lvls = nextlvl;
                }
                if (ret.VirtualCurrency[args.mode]<price) return { ok: false, err: "Not enough Currency"};
                else if (pay(currentPlayerId,args.mode,price)) {
                    data.city.hero[args.id]=Math.min(99,data.city.hero[args.id]+lvls);
                    try {
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    } catch (e) {
                        award(currentPlayerId,args.mode,price);
                        return {ok: false, err: "DB unavailable"};
                    }
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Can't buy" };
            }
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
}

handlers.ascendHero = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var price = 100; //AS
    if (data&&ret) {
        if (args.id>=0 && args.id<HERO.length) {
            if (HERO[args.id].super === undefined) return {ok:false, err: "This hero can't be ascended"};
            if (data.city.hero[args.id]!=99) return { ok: false, err: "Hero is not level 99"};
            if (data.city.hero[HERO[args.id].super]>0) return { ok: false, err: "Already ascended"};
            if (ret.VirtualCurrency.AS<price) return { ok: false, err: "Not enough AS"};
            if (pay(currentPlayerId,"AS",price)) {
                data.city.hero[HERO[args.id].super]=1;
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,"AS",price);
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else return { ok: false, err: "Can't buy" };
        } else return { ok: false, err: "Unknown hero"};
    } else return { ok: false, err: "Server error"};
}

handlers.toPG = function (args,context) {
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var exchange = 1;
    if (args.multiple) exchange = exchange*10;
    else if (args.max) exchange = ret.VirtualCurrency.AS;
    else if (args.x100) exchange = exchange*100;
    if (ret) {
        if (ret.VirtualCurrency.AS<exchange) return { ok: false, err: "Not enough AS"};
        if (pay(currentPlayerId,"AS",exchange)&&award(currentPlayerId,"PG",exchange)) {
            log("Changed "+exchange+" AS to "+exchange+" PG");
            return { ok: true, update: true};   
        }
    } else return { ok: false, err: "Server error"};
}

handlers.toCC = function (args,context) {
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var exchange = 1;
    if (args.multiple) exchange = exchange*10;
    else if (args.max) exchange = ret.VirtualCurrency.AS;
    else if (args.x100) exchange = exchange*100;
    if (ret) {
        if (ret.VirtualCurrency.AS<exchange) return { ok: false, err: "Not enough AS"};
        if (pay(currentPlayerId,"AS",exchange)&&award(currentPlayerId,"CC",exchange*3)) {
            log("Changed "+exchange+" AS to "+(exchange*3)+" CC");
            return { ok: true, update: true};   
        }
    } else return { ok: false, err: "Server error"};
}

var P = [125,125,250,400,125,125,0]

handlers.register = function (args, context) {
    var data=loadData();
    var res=server.GetUserAccountInfo({
        "PlayFabId": currentPlayerId,
    });
    var cur = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data.followers<5000) return {ok: false, err:"At least 5000 followers to join"};
    if (data&&res&&cur&&args.kid>0) {
        var tid=Math.floor(Date.now()/DAY);
        var price=P[tid%P.length];
        if (17349>=tid) price=0;
        if (cur.VirtualCurrency.UM<price) return { ok: false, err: "Not enough Universe Marbles"};
        var name=res.UserInfo.TitleInfo.DisplayName;
        var ret=registerT(name,currentPlayerId,tid,args.setup,data.city.hero,args.kid||0,data.city.promo);
        if (ret===true) {
            if (price>0) {
                server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": price
                });
            }
            data.city.pass.tournaments+=1;
            if (data.city.easter!==undefined) data.city.easter.points+=(25*vipMultiplier);
            data.city.tour.unshift({
                tid:tid,
                top:-1,
                amount: 0
            });
            log("Registered to tournament paying "+price+" UM");
            while (data.city.tour.length>7) data.city.tour.pop(); 
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return {ok:true,data:data,update:true};
        } else return { ok: false, err: ret};
    } else return { ok: false, err: "Server error"};
}

handlers.etregister = function (args, context) {
    var res=server.GetUserAccountInfo({"PlayFabId": currentPlayerId,});
    if (res&&args.kid>0) {
        var name=res.UserInfo.TitleInfo.DisplayName;
        var ret=registerT2(name,currentPlayerId,args.setup,args.kid);
        if (ret===true) {
            //data.city.pass.tournaments+=1;
            log("Registered to extra tournament paying");
            return {ok:true};
        } else return { ok: false, err: ret};
    } else return { ok: false, err: "Server error"};
}

handlers.fregister = function (args, context) {
    var data=loadData();
    var res=server.GetUserAccountInfo({
        "PlayFabId": currentPlayerId,
    });
    var cur = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var now = Date.now();
    if (data.city.flash>now) {
        return { ok: false, err: "Wait to join"};
    } else if (data&&res&&cur&&args.kid>0) {
        var price=100;
        if (cur.VirtualCurrency.UM<price) return { ok: false, err: "Not enough Universe Marbles"};
        var name=res.UserInfo.TitleInfo.DisplayName;
        var ret=registerFT(name,currentPlayerId,args.tid,args.setup,args.kid||0);
        if (ret===true) {
            if (price>0) {
                server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": price
                });
            }
            log("Registered to flash tournament paying 100 UM");
            data.city.pass.ftournaments+=1;
            if (data.city.easter!==undefined) data.city.easter.points+=(5*vipMultiplier);
            data.city.flash = now+5*60*1000; 
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return {ok:true,data:data,update:true};
        } else return { ok: false, err: ret};
    } else return { ok: false, err: "Server error"};
}

handlers.cltour = function (args, context) {
    var data=loadData();
    if (data) {
        var tid=Math.floor(Date.now()/DAY);
        if (data.city.tour[0].tid==tid) {
            var res=clearT(currentPlayerId,tid);
            if (res===true) { 
                data.city.tour.shift();
                if (data.city.easter!==undefined) data.city.easter.points-=(25*vipMultiplier);
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                return {ok:true,data:data};
            } else return { ok: false, err: "Err: "+res};
        } else return { ok: false, err: "You didn't join"};
    } else return { ok: false, err: "Server error"};
}
handlers.etcltour = function (args, context) {
    var res=clearT2(currentPlayerId);
    if (res===true) { 
        return {ok:true};
    } else return { ok: false, err: "Err: "+res};
}

function valsec(sec) {
    return sec=="secret";
}


handlers.secret = function (args, context) {
    if (!valsec(args.sec)) return;
    var data=loadData(args.pid);
    if (data) {
        if (args.UM>0) {
            award(args.pid,"UM",args.UM);
            log("Rewarded "+args.UM+" UM");
        }
        if (args.PG>0) {
            award(args.pid,"PG",args.PG);
            log("Rewarded "+args.PG+" PG");
        }
        if (args.PK>0) {
            award(args.pid,"PK",args.PK);
            log("Rewarded "+args.PK+" PK");
        }
        if (args.SD>0) {
            award(args.pid,"SD",args.SD);
            log("Rewarded "+args.SD+" SD");
        }
        if (args.AS>0) {
            award(args.pid,"AS",args.AS);
            log("Rewarded "+args.AS+" AS");
        }
        if (args.CC>0) {
            award(args.pid,"CC",args.CC);
            log("Rewarded "+args.CC+" CC");
        }
        if (args.FOL>0) {
            var arr=Array(args.FOL).fill("FOL");
            server.GrantItemsToUser({
                "PlayFabId" : currentPlayerId,
                "ItemIds": arr,
            });
            log("Rewarded "+args.FOL+" EM");
        }
        if (args.wr!==undefined) {
            for (var i=0; i<data.city.tour.length; ++i) {
                if (data.city.tour[i].tid==args.tid) {
                    data.city.tour[i].top=args.top;
                    data.city.tour[i].amount=args.amount;
                    data.city.tour[i].wr=args.wr;
                    break;
                }
            }
            if (args.HERO!==undefined && args.HERO>=0) {
                if (args.LVL==undefined||args.LVL==1) {
                    if (data.city.hero[args.HERO]<99) ++data.city.hero[args.HERO];
                    else award(args.pid,"PG",12);
                } else {
                    if (args.HERO>=0 && data.city.hero[args.HERO]<99) data.city.hero[args.HERO]=Math.min(99,data.city.hero[args.HERO]+args.LVL);
                    else {
                        var pgr = 1;
                        if (HERO[args.HERO].rarity==1) pgr=3;
                        else if (HERO[args.HERO].rarity==2) pgr=12; 
                        award(args.pid,"PG",pgr);
                    }
                }
            }
        } else if (args.HERO!==undefined && args.HERO>=0) {
            if (args.LVL==undefined||args.LVL==1) {
                if (data.city.hero[args.HERO]<99) {
                    ++data.city.hero[args.HERO];
                    log("Rewarded HERO:"+args.HERO+" 1 level");
                } else {
                    award(args.pid,"PG",12);
                    log("Rewarded 12 PG for lvl 99 hero");
                }
            } else {
                if (data.city.hero[args.HERO]<99) {
                    data.city.hero[args.HERO]=Math.min(99,data.city.hero[args.HERO]+args.LVL);
                    log("Rewarded HERO:"+args.HERO+" "+args.LVL+" levels");
                } else {
                    var pgr = 1*args.LVL;
                    if (HERO[args.HERO].rarity==1) pgr=2*args.LVL;
                    else if (HERO[args.HERO].rarity==2) pgr=4*args.LVL; 
                    award(args.pid,"PG",pgr);
                    log("Rewarded "+pgr+" PG for lvl 99 hero");
                }
            }
        }  
        server.UpdateUserInternalData({"PlayFabId" : args.pid, "Data" : {city:JSON.stringify(data.city)}});
        return { ok: true };
    }
}

handlers.secret = function (args, context) {
    if (!valsec(args.sec)) return;
    var data=loadData(args.pid);
    if (data) {
        if (args.AS>0) {
            award(args.pid,"AS",args.AS);
            log("Rewarded "+args.AS+" AS for dealing "+args.dealt+" TOP: "+args.top);
        }
        data.city.WB.log.unshift({
            top10: [
                [args.n0,args.d0],
                [args.n1,args.d1],
                [args.n2,args.d2],
                [args.n3,args.d3],
                [args.n4,args.d4],
                [args.n5,args.d5],
                [args.n6,args.d6],
                [args.n7,args.d7],
                [args.n8,args.d8],
                [args.n9,args.d9]
            ],
            name:args.name,
            spawn:args.spawn,
            killed:args.killed,
            dealt: args.dealt,
            mode: args.mode,
            level: args.level,
            top: args.top,
            AS: args.AS
        });
        if (data.city.WB.log.length>7) data.city.WB.log.pop();
        server.UpdateUserInternalData({"PlayFabId" : args.pid, "Data" : {city:JSON.stringify(data.city)}});
    }
}

handlers.secret = function (args, context) {
    var td = server.GetTitleData({
        "Keys": ["tour"]
    });
    var tour = [];
    if (td && td.Data) {
        if (td.Data.tour) tour=JSON.parse(td.Data.tour);
    }
    tour.unshift(args.data);
    while (tour.length>7) tour.pop();
    server.SetTitleData({
        "Key": "tour",
        "Value": JSON.stringify(tour)
    });
}

handlers.vote = function (args, context) {
    var headers = {};
    var content = "action=vote&key="+CQ+"&pid="+currentPlayerId+"&kid="+args.kid+"&vote="+args.vote;
    var httpMethod = "post";
    
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) {
        award(currentPlayerId,"UM",10);
        return { ok: true };
    } else return { ok: false, err: response.error };
}

handlers.buyhero = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (args.hid==44) {
            if (ret.VirtualCurrency.UM>=5000 && data.city.hero[44]==0) {
                var res=server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": 5000
                });
                if (res) {
                    data.city.hero[44]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Server error2" };
            } else return { ok: false, err: "Not enough UM" };
        } else if (args.hid==43) {
            if (ret.VirtualCurrency.UM>=2000 && data.city.hero[43]==0) {
                var res=server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": 2000
                });
                if (res) {
                    data.city.hero[43]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Server error2" };
            } else return { ok: false, err: "Not enough UM" };
        } else if (args.hid==42) {
            if (ret.VirtualCurrency.UM>=1000 && data.city.hero[42]==0) {
                var res=server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": 1000
                });
                if (res) {
                    data.city.hero[42]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Server error2" };
            } else return { ok: false, err: "Not enough UM" };
        } else if (args.hid==101) {
            if (ret.VirtualCurrency.UM>=5000 && data.city.hero[101]==0) {
                var res=server.SubtractUserVirtualCurrency({
                    "PlayFabId" : currentPlayerId,
                    "VirtualCurrency": "UM",
                    "Amount": 5000
                });
                if (res) {
                    data.city.hero[101]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Server error2" };
            } else return { ok: false, err: "Not enough UM" };
        } else {
            return { ok: false, err: "Unknown Hero" };
        }
    } else return { ok: false, err: "Server error" };
}

handlers.buywc = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (data.city.WC!==0) {
            return { ok: false, err: "Come back next week" };
        } else if (ret.VirtualCurrency.UM>=1000) {
            if (pay(currentPlayerId,"UM",1000)) {
                server.GrantItemsToUser({
                    "PlayFabId" : currentPlayerId,
                    "ItemIds": ["FOL"],
                });
                award(currentPlayerId,"SD",850000);
                award(currentPlayerId,"PK",10);
                data.city.WC=1;
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                return {ok:true,data:data,update:true};
            }
        } else return { ok: false, err: "Not enough UM" };
    } else return { ok: false, err: "Server error" };
}

handlers.fightWB = function (args, context) {
    var data=loadData();
    if (data) {
        if (data.city.WB.atks<=0) return { ok: false, err: "No attacks left" };
        var headers = {};
        var content = "action=wb&key="+CQ+"&pid="+currentPlayerId+"&kid="+args.kid+"&wbid="+args.wbid+"&fol="+data.followers+"&setup="+encodeURI(JSON.stringify(args.setup))+"&hero="+encodeURI(JSON.stringify(data.city.hero))+"&promo="+encodeURI(JSON.stringify(data.city.promo));
        var httpMethod = "post";
        try {
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        } catch (e) {
            return { ok: false, err: "Wrong server request"};
        }

        if (response.success) {
            data.city.WB.atks-=1;
            data.city.pass.wb+=1;
            //if (data.city.easter!==undefined) data.city.easter.points+=25;
            for (var i=0; i<args.setup.length; ++i) {
                var hid = -(args.setup[i]+2);
                if (data.city.promo[hid]===3) {
                    ++data.city.herowb[hid];
                    if (data.city.herowb[hid] > HERO[hid].rarity) {
                        data.city.promo[hid]=4;
                    }
                }
            }
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            log("Fight World Boss for "+response.damage+" damage");
            return {ok:true,data:data,battle:{
                name:response.name,
                level:response.lvl,
                damage:response.damage,
                setup:[-(2+parseInt(response.id)),-1,-1,-1,-1,-1],
            }};
        } else return { ok: false, err: response.error };
    } else return { ok: false, err: "Server error" };
}

handlers.auction = function(args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (ret.VirtualCurrency.UM>=args.bid) {
            if (data.city.hero[args.hid]<99) {
                var headers = {};
                var content = "action=auction&key="+CQ+"&pid="+currentPlayerId+"&kid="+args.kid+"&name="+args.name+"&bid="+args.bid+"&hid="+args.hid;
                var httpMethod = "post";
            
                try {
                    var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
                } catch (e) {
                    return { ok: false, err: "Wrong server request"};
                }

                if (response.success) {
                    pay(currentPlayerId,"UM",args.bid);
                    log("Bid "+args.bid+" UM for "+args.hid);
                    return { ok: true };
                } else {
                    return { ok: false, err: response.error };
                }
            } else return { ok: false, err: "Hero is MAX level" };
        } else return { ok: false, err: "Not enough UM" };
    } else return { ok: false, err: "Server error" };
}

handlers.buylot = function(args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (ret.VirtualCurrency.AS>=1) {
            var headers = {};
            var content = "action=lottery&key="+CQ+"&pid="+currentPlayerId;
            var httpMethod = "post";
        
            try {
                var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
            } catch (e) {
                return { ok: false, err: "Wrong server request"};
            }

            if (response.success) {
                pay(currentPlayerId,"AS",1);
                return { ok: true };
            } else {
                return { ok: false, err: response.error };
            }
        } else return { ok: false, err: "Not enough AS" };
    } else return { ok: false, err: "Server error" };
}

handlers.pur = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        var prices = {
            "FOL1K": 10000,
            "FOL20K": 190000,
            "FOL100K": 900000,
        };
        if (prices[args.id]!==undefined && ret.VirtualCurrency.SD>=prices[args.id]) {
            if (pay(currentPlayerId,"SD",prices[args.id])) {
                if (args.id=="FOL1K") data.followers+=1000;
                else if (args.id=="FOL20K") data.followers+=20000;
                else if (args.id=="FOL100K") data.followers+=100000;
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {followers:data.followers}});
                return {ok:true,data:data};
            } else return { ok: false, err: "Not enough SD" };
        } else if (args.id=="SP" && ret.VirtualCurrency.UM>=5000) {
            if (pay(currentPlayerId,"UM",5000)) {
                data.city.pass.isSilver=1;
                if (data.city.hero[132]!=0) award(currentPlayerId,"AS",100);
                else data.city.hero[132]=1;
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                return {ok:true,data:data};
            } else return { ok: false, err: "Not enough UM" };
        } else return { ok: false, err: "Unknown bundle" };
    } else return { ok: false, err: "Server error" };
}

function log(msg) {
    var ret=server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["log"]});
    var log = [];
    if (ret && ret.Data) {
        if (ret.Data.log) {
            log=JSON.parse(ret.Data.log.Value);
        }
        while (log.length>100) {
            log.shift();
        }
        log.push({
            ts: Date.now(),
            msg: msg
        });
    }
    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {log:JSON.stringify(log)}});
}

handlers.dungeon = function (args, context) {
    var data=loadData();
    if (data) {
        var mcount=checkSetup(args.setup,6,data.followers,data.city.hero);
        if (typeof mcount !== "number") return mcount;
        var headers = {};
        var content = "action=dungeon&key="+CQ+"&pid="+currentPlayerId+"&max="+(args.max===undefined?0:1)+"&setup="+encodeURI(JSON.stringify(args.setup))+"&hero="+encodeURI(JSON.stringify(data.city.hero))+"&promo="+encodeURI(JSON.stringify(data.city.promo));
        var httpMethod = "post";

        try {
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        } catch (e) {
            return { ok: false, err: "Wrong server request"};
        }
        
        if (response.success) {
            statKong(args.kid,"dungeon",response.data.lvl);
            return { ok: true, battle: response.data};
        } else {
            return { ok: false, err: response.error };
        }
    } else return { ok: false, err: "Server error" };
}

handlers.togglepublic = function (args, context) {
    var headers = {};
    var content = "action=public&key="+CQ+"&pid="+currentPlayerId;
    var httpMethod = "post";

    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) {
        return { ok: true};
    }  
    return { ok: false, err: "Server error" };
}

handlers.sfcell = function (args, context) {
    var headers = {};
    var content = "action=sfcell&key="+CQ+"&pid="+currentPlayerId+"&cell="+args.cell;
    var httpMethod = "post";

    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) {
        var data=loadData();
        var mlvl1=getFOL(); 
        data.followers+=(response.followers||0)*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem);
        log("[LUCKY FOLLOWERS] Got "+response.followers*(data.mlvl+mlvl1+1)*(1+data.city.easter.doubleem)+" followers");
        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {followers:data.followers}});
        return { ok: true,followers:response.followers};
    } else {
        return { ok: false, err: response.error };
    }
    return { ok: false, err: "Server error" };
}

handlers.keyevent = function (args, context) {
    var headers = {};
    var mode = args.pick?(Math.random()<0.5?1:0):(Math.random()>0.5?1:0);
    var content = "action=keyevent&key="+CQ+"&pid="+currentPlayerId+"&pick="+mode;
    var httpMethod = "post";

    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (response.success) {
        if (response.curr=="PK") award(currentPlayerId,response.curr,1);
        else  award(currentPlayerId,response.curr,10);
        return { ok: true,value:mode};
    } else {
        return { ok: false, err: response.error };
    }
    return { ok: false, err: "Server error" };
}


handlers.claimsp = function (args, context) {
    var data=loadData();
    if (data) {
        var info = [
            [ // Normal
                {
                    text: "Attack World Boss 15 times",
                    obj: 15,
                    rcurr: "AS",
                    ramount: 25,
                    key:"wb",
                },
                {
                    text: "Open 20 Chests",
                    obj: 20,
                    rcurr: "PK",
                    ramount: 5,
                    key:"chest"
                },
                {
                    text: "Claim 40 Miracles",
                    obj: 40,
                    rcurr: "FOL",
                    ramount: 4000000,
                    key:"miracles",
                },
                {
                    text: "Enter 7 Daily Tournaments",
                    obj: 7,
                    rcurr: "PG",
                    ramount: 50,
                    key: "tournaments",
                },
                {
                    text: "Enter 4 Flash Tournaments",
                    obj: 4,
                    rcurr: "UM",
                    ramount: 200,
                    key: "ftournaments",
                },
                {
                    text: "Enter 40 PvP battles",
                    obj: 40,
                    rcurr: "SD",
                    ramount: 300000,
                    key: "pvp"
                },
                {
                    text: "Beat 100 Daily Quest levels",
                    obj: 100,
                    rcurr: "CC",
                    ramount: 30,
                    key: "quests"
                },
            ],[ // Silver
                {
                    text: "Attack World Boss 25 times",
                    obj: 25,
                    rcurr: "AS",
                    ramount: 45,
                    key:"wb",
                },
                {
                    text: "Open 40 Chests",
                    obj: 40,
                    rcurr: "PK",
                    ramount: 15,
                    key:"chest"
                },
                {
                    text: "Claim 75 Miracles",
                    obj: 75,
                    rcurr: "FOL",
                    ramount: 10000000,
                    key:"miracles",
                },
                {
                    text: "Enter 12 Daily Tournaments",
                    obj: 12,
                    rcurr: "PG",
                    ramount: 100,
                    key: "tournaments",
                },
                {
                    text: "Enter 10 Flash Tournaments",
                    obj: 10,
                    rcurr: "UM",
                    ramount: 600,
                    key: "ftournaments",
                },
                {
                    text: "Enter 100 PvP battles",
                    obj: 100,
                    rcurr: "SD",
                    ramount: 750000,
                    key: "pvp"
                },
                {
                    text: "Beat 200 Daily Quest levels",
                    obj: 200,
                    rcurr: "CC",
                    ramount: 60,
                    key: "quests"
                },
            ],[ // Gold
                {
                    text: "Attack World Boss 40 times",
                    obj: 40,
                    rcurr: "AS",
                    ramount: 90,
                    key:"wb",
                },
                {
                    text: "Open 100 Chests",
                    obj: 100,
                    rcurr: "PK",
                    ramount: 40,
                    key:"chest"
                },
                {
                    text: "Claim 200 Miracles",
                    obj: 200,
                    rcurr: "FOL",
                    ramount: 30000000,
                    key:"miracles",
                },
                {
                    text: "Enter 20 Daily Tournaments",
                    obj: 20,
                    rcurr: "PG",
                    ramount: 175,
                    key: "tournaments",
                },
                {
                    text: "Enter 20 Flash Tournaments",
                    obj: 20,
                    rcurr: "UM",
                    ramount: 1400,
                    key: "ftournaments",
                },
                {
                    text: "Enter 200 PvP battles",
                    obj: 200,
                    rcurr: "SD",
                    ramount: 2000000,
                    key: "pvp"
                },
                {
                    text: "Beat 300 Daliy Quest levels",
                    obj: 300,
                    rcurr: "CC",
                    ramount: 120,
                    key: "quests"
                },
            ],
        ];
        if (info[args.a]!==undefined && info[args.a][args.b]!==undefined) {
            if (args.a==1 && !data.city.pass.isSilver) return { ok: false, err: "Silver pass is not purchased" };
            if (args.a==2 && !data.city.pass.isGold) return { ok: false, err: "Gold pass is not purchased" };
            if (args.a==0 && ((data.city.pass.claim&(1<<args.b))>0)) return { ok: false, err: "Already claimed" };
            else if (args.a==1 && ((data.city.pass.sclaim&(1<<args.b))>0)) return { ok: false, err: "Already claimed" };
            else if (args.a==2 && ((data.city.pass.gclaim&(1<<args.b))>0)) return { ok: false, err: "Already claimed" };
            if (data.city.pass[info[args.a][args.b].key]>=info[args.a][args.b].obj) {
                if (args.a==0) data.city.pass.claim = data.city.pass.claim|(1<<args.b);
                if (args.a==1) data.city.pass.sclaim = data.city.pass.sclaim|(1<<args.b);
                if (args.a==2) data.city.pass.gclaim = data.city.pass.gclaim|(1<<args.b);
                if (info[args.a][args.b].rcurr=="FOL") {
                    if (Number.isInteger(info[args.a][args.b].ramount)) data.followers+=info[args.a][args.b].ramount;
                } else {
                    award(currentPlayerId,info[args.a][args.b].rcurr,info[args.a][args.b].ramount);
                }
                log("[SEASONPASS] "+info[args.a][args.b].ramount+" "+info[args.a][args.b].rcurr);
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city),followers:data.followers}});
                return {ok:true,data:data};
            } else return { ok: false, err: "Criteria not met" };
        } else return { ok: false, err: "Unknown" };
    } else return { ok: false, err: "Server error" };
}

handlers.promotion = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var price = [[125,500,1500,3000],[250,1000,3000,6000],[375,1500,4500,9000],[500,2000,6000,12000],[625,2500,7500,15000]];
    var obj = [[25,100,300,600],["QUEST","QUEST","QUEST","QUEST"],[50,200,600,1200],["WB","WB","WB","WB"],[100,400,1200,2400]];
    var curr = ["CC",undefined,"PG",undefined,"AS"];
    if (data && ret) {
        if (obj[data.city.promo[args.hid]][HERO[args.hid].rarity]=="WB"&&data.city.promotokens!==undefined&&data.city.promotokens.promo4!==undefined&&data.city.promotokens.promo4>=1) {
            data.city.promotokens.promo4-=1;
            ++data.city.promo[args.hid];
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
            return {ok:true,data:data,update:true};
        } else if (args.um) {
            var realPrice = price[data.city.promo[args.hid]][HERO[args.hid].rarity];
            if (obj[data.city.promo[args.hid]][HERO[args.hid].rarity]=="WB") {
                realPrice = price[data.city.promo[args.hid]][HERO[args.hid].rarity]-((price[data.city.promo[args.hid]][HERO[args.hid].rarity]/(HERO[args.hid].rarity+1))*data.city.herowb[args.hid]);
            } 
            if (obj[data.city.promo[args.hid]][HERO[args.hid].rarity]=="WB" && data.city.easter.points>=125000) realPrice = 0;

            if (ret.VirtualCurrency.UM<realPrice) return { ok: false, err: "Not enough UM"};
            else if (realPrice == 0) {
                ++data.city.promo[args.hid];
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,"UM",realPrice);
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else if (pay(currentPlayerId,"UM",realPrice)) {
                ++data.city.promo[args.hid];
                try {
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } catch (e) {
                    award(currentPlayerId,"UM",realPrice);
                    return {ok: false, err: "DB unavailable"};
                }
                return {ok:true,data:data,update:true};
            } else return { ok: false, err: "Can't buy" };
        } else {
            var retVC = [ret.VirtualCurrency.CC,undefined,ret.VirtualCurrency.PG,undefined,ret.VirtualCurrency.AS];
            if (curr[data.city.promo[args.hid]] !== undefined) {
                if (retVC[data.city.promo[args.hid]]<obj[data.city.promo[args.hid]][HERO[args.hid].rarity]) return { ok: false, err: "Not enough Currency"};
                else if (pay(currentPlayerId,curr[data.city.promo[args.hid]],obj[data.city.promo[args.hid]][HERO[args.hid].rarity])) {
                    ++data.city.promo[args.hid];
                    try {
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    } catch (e) {
                        award(currentPlayerId,curr[data.city.promo[args.hid]],obj[data.city.promo[args.hid]][HERO[args.hid].rarity]);
                        return {ok: false, err: "DB unavailable"};
                    }
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Can't buy" };
            } else return {ok: false, err: "Promotion Error"};
        }
    } else return { ok: false, err: "Server error" };
}

handlers.training = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (data.city.promo[args.hid] == 5) {
                if (data.city.promotokens !== undefined && data.city.promotokens.promo6 !== undefined && data.city.promotokens.promo6>=1) {
                    data.city.promotokens.promo6-=1;
                    ++data.city.promo[args.hid];
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else if (args.um) {
                    var price = [1000,2000,4000,8000];
                    if (ret.VirtualCurrency.UM<price[HERO[args.hid].rarity]) return { ok: false, err: "Not enough UM"};
                    else {
                        ++data.city.promo[args.hid];
                        try {
                            pay(currentPlayerId,"UM",price[HERO[args.hid].rarity]);
                            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                        } catch (e) {
                            award(currentPlayerId,"UM",realPrice);
                            return {ok: false, err: "DB unavailable"};
                        }
                        return {ok:true,data:data,update:true};
                    }                
                } else {
                    if (data.city.training !== undefined && data.city.training.time == -1 && data.city.training.hid == -1) {
                        var timers = [21600000,43200000,86400000,172800000];
                        data.city.training.hid = args.hid;
                        data.city.training.time = Date.now() + timers[HERO[args.hid].rarity];
                        data.city.hero[args.hid] = 0;
                        for (var i = 0; i < data.city.setup.length; ++i) {
                            if (data.city.setup[i] == -2-args.hid) data.city.setup[i] = -1;
                        }
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                        return {ok:true,data:data,update:true};
                    } else return { ok: false, err: "Training is not available" };  
                }
        } else return { ok: false, err: "Not correct promotion level" };   
    } else return { ok: false, err: "Server error" };     
}

handlers.coupon = function (args, context) {
    if (args.code.length==12) {
        try {
            var res = server.RedeemCoupon({
                "PlayFabId": currentPlayerId,
                "CouponCode": args.code,
            });
            var str="";
            for (var i=0; i<res.GrantedItems.length; ++i) {
                if (str!=="") str+=",";
                str+=res.GrantedItems[i].DisplayName;
            }
            log("[COUPON] Got "+str);
            return { ok: true,prize:str};
        } catch(e) {
            return { ok: false, err: "Invalid Coupon" };
        }
        
    } else {
        var headers = {};
        var content = "action=coupon&key="+CQ+"&pid="+currentPlayerId+"&code="+args.code;
        var httpMethod = "post";
        try {
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        } catch (e) {
            return { ok: false, err: "Wrong server request"};
        }

        if (response.success) {
            if (response.currency=="HERO") {
                var data=loadData();
                if (data) {
                    data.city.hero[response.hero]=Math.min(99,data.city.hero[response.hero]+parseInt(response.levels));
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                }
            } else {
                award(currentPlayerId,response.currency,response.amount);
            }
            log("[COUPON] Got "+response.text);
            return { ok: true,prize:response.text};
        } else {
            return { ok: false, err: response.error };
        }
        return { ok: false, err: "Server error" };
    }
}

handlers.cc3v3nt = function (args, context) {
    var data=loadData();
    if (data) {
        var tid=Math.floor(Date.now()/DAY);
        var events=["key tower","cc","pge","adventure","lottery","flash","swb","dungeon","lucky followers"];
        if (events[tid%events.length]=="cc") {
            if (data.city.cc === undefined || data.city.cc.tid !== tid) {
                data.city.cc = {
                    tid: tid,
                    coins: 0
                }
            }
            if (args.coins>=0 && args.coins<=320) {
                statKong(args.kid,"cosmic",args.coins);
                var toAward = args.coins - data.city.cc.coins;
                if (toAward>0) {
                    data.city.cc.coins=Math.max(data.city.cc.coins,args.coins);
                    award(currentPlayerId,"CC",toAward);
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                }
            } else return {ok: false, err: "Impossible amount of cc"};
        } else return {ok: false, err: "Today is not CC event Day"};
    } else return { ok: false, err: "Server error" };
}
handlers.pge = function (args, context) {
    var data=loadData();
    if (data) {
        var tid=Math.floor(Date.now()/DAY);
        var events=["key tower","cc","pge","adventure","lottery","flash","swb","dungeon","lucky followers"];
        if (events[tid%events.length]=="pge"&&args.card>=0&&args.card<=31) {
            var match=undefined;
            if (data.city.pge === undefined || data.city.pge.tid !== tid) {
                data.city.pge = {};
                data.city.pge.tid=tid;
                data.city.pge.cards = Array(32).fill(-1);
                data.city.pge.picks = Array(32).fill(false);
                data.city.pge.attempts = 8;
                data.city.pge.pg = 0;
                data.city.pge.choice = [-1,-1];
                data.city.pge.done = false;
                match=m4tch4rr4y();
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {match:JSON.stringify(match)}});
            } else {
                var solution=server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["match"]});
                match=JSON.parse(solution.Data.match.Value);
            }
            
            if (data.city.pge.attempts > 0 && !data.city.pge.done) {
                if (data.city.pge.picks[args.card]) return { ok: false, err: "Already matched"};
                if (data.city.pge.choice[0] == -1) {
                    data.city.pge.choice[0] = args.card;
                    data.city.pge.cards[args.card] = match[args.card];
                } else if (data.city.pge.choice[1] == -1) {
                    if (args.card==data.city.pge.choice[0]) return { ok: false, err: "Can't pick same card"};
                    data.city.pge.choice[1] = args.card;
                    data.city.pge.cards[args.card] = match[args.card];
                    if (match[data.city.pge.choice[0]] == match[data.city.pge.choice[1]]) {
                        data.city.pge.pg += 8;
                        data.city.pge.picks[data.city.pge.choice[0]] = true;
                        data.city.pge.picks[data.city.pge.choice[1]] = true;
                    } else {
                        --data.city.pge.attempts;
                    }
                    data.city.pge.choice = [-1,-1];
                }
                var completed = true;
                for (var i = 0; i < data.city.pge.cards.length && completed; ++i) {
                    if (data.city.pge.picks[i] == false) completed = false;
                }
                var update=false;
                if (data.city.pge.attempts == 0 || completed) {
                    award(currentPlayerId,"PG",data.city.pge.pg);
                    data.city.pge.done = true;
                    update=true; 
                }  
                statKong(args.kid,"pairs",data.city.pge.pg/8);
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                return {ok: true,data:data,update:update};
            } return { ok: false, err: "Thank you for playing"};
        } else return {ok: false, err: "Today is not Match Pairs Day"};
    } else return { ok: false, err: "Server error" };     
}
function m4tch4rr4y() {
    var deck = [];
    while (deck.length<32) {
        do {
            card = Math.floor(Math.random() * HERO.length);
        } while (deck.indexOf(card)!==-1 || HERO[card].rarity===5);
        deck.push(card);
        deck.push(card);
    }
    deck.sort(function() {return Math.random() - 0.5});
    return deck;
}
handlers.adventure = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        var tid=Math.floor(Date.now()/DAY);
        var events=["key tower","cc","pge","adventure","lottery","flash","swb","dungeon","lucky followers"];
        if (events[tid%events.length]=="adventure") {
            if (args.kind!==undefined && args.percentage!==undefined && args.kind>=0 && args.kind<=2 && args.percentage>=1 && args.percentage<=100) {
                var retVC = [ret.VirtualCurrency.CC,ret.VirtualCurrency.PG,ret.VirtualCurrency.AS];
                if (retVC[args.kind] >= args.percentage) {
                    if (data.city.adventure === undefined || data.city.adventure.tid !== tid) {
                        data.city.adventure = {
                            tid: tid,
                            time: undefined,
                            kind: undefined,
                            prize: undefined,
                            perc: undefined,
                        }
                    } else if ((data.city.adventure.time-Date.now())>0) return {ok: false, err: "Adventure not available yet"};
                    var curr=["CC","PG","AS"];
                    if (pay(currentPlayerId,curr[args.kind],args.percentage)) {
                        var times = [16200000,28200000,41400000];
                        data.city.adventure.perc = args.percentage;
                        data.city.adventure.kind = args.kind;
                        data.city.adventure.time = Date.now() + times[args.kind];
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                        return {ok: true,data:data,update:true};
                    } else return {ok: false, err: "Error on pay the fee"};
                } else return {ok: false, err: "Not enought currency"};
            } else return {ok: false, err: "Bad arguments"};
        } else return {ok: false, err: "Today is not Adventure Day"};
    } else return { ok: false, err: "Server error" }; 
}
handlers.peaster = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret && args.m !== undefined) {
        var c = parseInt(args.m);
        if (c >= 0 && c < peasterMilestones.length && peasterMilestones[c].m <= data.city.easter.points) {
            if (data.city.easter.claimed < c){
                if (peasterMilestones[c].curr !== undefined) {
                    var curr = peasterMilestones[c].curr;
                    if (curr == "CC" || curr == "PG" || curr == "AS" || curr == "PK" || curr == "UM") award(currentPlayerId,curr,peasterMilestones[c].q);
                    else if (curr == "hero") data.city.hero[peasterMilestones[c].id]=1;
                    else if (curr == "EM") {
                        server.GrantItemsToUser({
                            "PlayFabId" : currentPlayerId,
                            "ItemIds": ["FOL","FOL","FOL","FOL","FOL"],
                        });
                    }
                } else if (peasterMilestones[c].t == "dispenser") {
                    var option = parseInt(args.o);
                    if (peasterMilestones[c].d == "cc") {
                        if (option == -1) data.city.easter.ccdispenser = -1;
                        else data.city.easter.ccdispenser = 60;
                        data.city.easter.ccdispenserlast = 0;
                    } else if (peasterMilestones[c].d == "pg") {
                        if (option == -1) data.city.easter.pgdispenser = -1;
                        else data.city.easter.pgdispenser = 60;
                        data.city.easter.pgdispenserlast = 0;
                    } else if (peasterMilestones[c].d == "um") {
                        if (option == -1) data.city.easter.umdispenser = -1;
                        else data.city.easter.umdispenser = 60;
                        data.city.easter.umdispenserlast = 0;
                    } else if (peasterMilestones[c].d == "as") {
                        if (option == -1) data.city.easter.asdispenser = -1;
                        else data.city.easter.asdispenser = 60;
                        data.city.easter.asdispenserlast = 0;
                    }
                } else if (peasterMilestones[c].t == "solver") {
                    if (peasterMilestones[c].d == "quest") data.city.easter.questsolver=1;
                    else if (peasterMilestones[c].d == "dq") data.city.easter.dailysolver=1;
                    else if (peasterMilestones[c].d == "wb") data.city.easter.wbsolver=1;
                    else if (peasterMilestones[c].d == "dungeon") data.city.easter.dungeonsolver=1;
                    else if (peasterMilestones[c].d == "flash") data.city.easter.flashsolver=1;
                    else if (peasterMilestones[c].d == "tournament") data.city.easter.tournamentsolver=1;
                } else if (peasterMilestones[c].t == "mtr") data.city.easter.miracles+=0.05;
                else if (peasterMilestones[c].t == "wbr") data.city.easter.wbtimer+=60*60*1000;
                else if (peasterMilestones[c].t == "silver") data.city.easter.freesilver=1;
                else if (peasterMilestones[c].t == "em2") data.city.easter.doubleem=1;
                else if (peasterMilestones[c].t == "fp4") data.city.easter.freep4=1;
                ++data.city.easter.claimed;
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                return {ok: true,data:data,update:true};
            } else return {ok: false, err: "Already Claimed"};
        } else return {ok: false, err: "Milestone not reached"};
    } else return { ok: false, err: "Server error" };
}

handlers.lto = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    var content = "";
    var httpMethod = "get";

    try {
        var response = JSON.parse(http.request("https://cosmosquest.net/public.php?kid=secret", httpMethod, content, "", {}));
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }

    if (data && ret && response.lto!==undefined) {
        if (args.offer <= response.lto.length) {
            if (data.city.hero[response.lto[args.offer].id] == 0) {
                if (response.lto[args.offer].curr == "UM") {
                    if (response.lto[args.offer].price <= ret.VirtualCurrency.UM) {
                        if (pay(currentPlayerId,"UM",response.lto[args.offer].price)){
                            data.city.hero[response.lto[args.offer].id]++;
                            if (response.lto[args.offer].extra !== undefined) {
                                if (response.lto[args.offer].extra.curr == "AS") award(currentPlayerId,"AS",response.lto[args.offer].extra.amount);
                                else if (response.lto[args.offer].extra.curr == "PG") award(currentPlayerId,"PG",response.lto[args.offer].extra.amount);
                                else if (response.lto[args.offer].extra.curr == "CC") award(currentPlayerId,"CC",response.lto[args.offer].extra.amount);
                            }
                            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                            return {ok:true,data:data,update:true};
                        }
                    } else return { ok: false, err: "Not enough Universe Marbles"};
                } else return { ok: false, err: "This offer doesn't exists"};
            } else return { ok: false, err: "Already own the hero"};
        } else return { ok: false, err: "Unavailable offer"};
    } else return { ok: false, err: "Server error" };
}
function ltokred(data) {
    var tid=Math.floor(Date.now()/DAY);
    var content = "";
    var httpMethod = "get";

    try {
        var response = JSON.parse(http.request("https://cosmosquest.net/public.php?kid=secret", httpMethod, content, "", {}));
    } catch (e) {
        return false;
    }

    if (data && response && response.lto!==undefined) {
        var purchaseID = 0;
        for (var i = 0; i < response.lto.length; ++i) {
            if (response.lto[i].curr == "KRED" && response.lto[i].extra !== undefined && response.lto[i].start <= tid && response.lto[i].finish >= tid && response.lto[i].lto !== true ) {
                purchaseID = i;
                break;
            }
        }
        if (purchaseID <= response.lto.length) {
            if (data.city.hero[response.lto[purchaseID].id] == 0) {
                data.city.hero[response.lto[purchaseID].id]++;
                if (response.lto[purchaseID].extra !== undefined) {
                    if (response.lto[purchaseID].extra.curr == "AS") award(currentPlayerId,"AS",response.lto[purchaseID].extra.amount);
                    else if (response.lto[purchaseID].extra.curr == "PG") award(currentPlayerId,"PG",response.lto[purchaseID].extra.amount);
                    else if (response.lto[purchaseID].extra.curr == "CC") award(currentPlayerId,"CC",response.lto[purchaseID].extra.amount);
                }
                return true;
            } else return false;
        } else return false;
    } else return false;
}
handlers.recycle = function (args, context) {
    var ret=server.GetUserInternalData({"PlayFabId" : currentPlayerId, "Keys" : ["miracles","mlvl","followers","city","log"]});
    var now=Date.now();
    var data={now:now};
    if (ret && ret.Data) {
        if (ret.Data.miracles) {
            data.miracles=JSON.parse(ret.Data.miracles.Value);
        }
        if (ret.Data.log) data.log=JSON.parse(ret.Data.log.Value);
        
        data.followers=ret.Data.followers?parseInt(ret.Data.followers.Value):0;
        data.mlvl=ret.Data.mlvl?parseInt(ret.Data.mlvl.Value):0;
        
        if (ret.Data.city) {
            data.city=JSON.parse(ret.Data.city.Value);
        }
    }
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret) {
        if (data.city.recycle.stage < 2 || data.city.recycle.stage == 3) {
            var hid = parseInt(args.hid);
            if (data.city.hero[hid] > 1) {
                if (HERO[hid].upgrade.none==0) {
                    if (data.city.recycle.stage == 1 && ret.VirtualCurrency.UM<5000) return { ok: false, err: "Not enough UM"};
                    var kindOfHero = undefined;
                    if (HERO[hid].rarity<=2 && HERO[hid].upgrade.pg==1 && HERO[hid].upgrade.cc==0) kindOfHero = 0;
                    else if (HERO[hid].rarity<=2 && HERO[hid].upgrade.pg==1 && HERO[hid].upgrade.cc==1) kindOfHero = 1;
                    else if (HERO[hid].rarity==3 && HERO[hid].upgrade.as==1 && HERO[hid].upgrade.cc==0) kindOfHero = 2;
                    else if (HERO[hid].rarity==3 && HERO[hid].upgrade.as==1 && HERO[hid].upgrade.cc==1) kindOfHero = 3;

                    var rCosts = [1,3,12];
                    var service = [15,15,10,10];
                    var levelsToGive = data.city.hero[hid] - 1;
                    if (kindOfHero == 0) {
                        var fee = 0;
                        for (var i = 0; i < HERODROP[i].length; ++i) {
                            if (hid == HERODROP) {
                                if (HERO[hid].rarity < 2) fee=45;
                                else fee=60;
                            }
                        }
                        var toGive = Math.ceil((levelsToGive * rCosts[HERO[hid].rarity]) - (levelsToGive * rCosts[HERO[hid].rarity] * (service[HERO[hid].rarity]+fee) / 100));
                        award(currentPlayerId,"PG",toGive);
                    } else if (kindOfHero == 1) {
                        var toGive = Math.ceil((levelsToGive * rCosts[HERO[hid].rarity]) - (levelsToGive * rCosts[HERO[hid].rarity] * service[HERO[hid].rarity] / 100));
                        var toGive2 = Math.round(toGive/3);
                        if (args.choice == 0) award(currentPlayerId,"CC",toGive);
                        else award(currentPlayerId,"PG",toGive2);
                    } else if (kindOfHero == 2) {
                        var toGive = Math.ceil((levelsToGive*(levelsToGive+1)/2) - ((levelsToGive*(levelsToGive+1)/2) * service[HERO[hid].rarity] / 100));
                        award(currentPlayerId,"AS",toGive);
                    } else if (kindOfHero == 3) {
                        var toGive = Math.ceil((levelsToGive*(levelsToGive+1)/2) - ((levelsToGive*(levelsToGive+1)/2) * service[HERO[hid].rarity] / 100));
                        var toGive2 = Math.round(toGive/3);
                        if (args.choice == 0) award(currentPlayerId,"CC",toGive);
                        else award(currentPlayerId,"AS",toGive2);
                    }

                    var obj = [[25,100,300,600],["QUEST","QUEST","QUEST","QUEST"],[50,200,600,1200],["WB","WB","WB","WB"],[100,400,1200,2400]];
                    if (data.city.promo[hid] == 5 || data.city.promo[hid] == 6) {
                        award(currentPlayerId,"AS",Math.round(obj[4][HERO[hid].rarity]-(obj[4][HERO[hid].rarity]*50/100)));
                        award(currentPlayerId,"PG",Math.round(obj[2][HERO[hid].rarity]-(obj[2][HERO[hid].rarity]*50/100)));
                        award(currentPlayerId,"CC",Math.round(obj[0][HERO[hid].rarity]-(obj[0][HERO[hid].rarity]*50/100)));
                    } else if (data.city.promo[hid] >= 3) {
                        award(currentPlayerId,"PG",Math.round(obj[2][HERO[hid].rarity]-(obj[2][HERO[hid].rarity]*50/100)));
                        award(currentPlayerId,"CC",Math.round(obj[0][HERO[hid].rarity]-(obj[0][HERO[hid].rarity]*50/100)));
                    } else if (data.city.promo[hid] >= 1) {
                        award(currentPlayerId,"CC",Math.round(obj[0][HERO[hid].rarity]-(obj[0][HERO[hid].rarity]*50/100)));
                    }
                    log("[RECYCLE] You have recycled "+levelsToGive+ "levels of "+HERO[hid].name);

                    data.city.hero[hid] = 1;
                    data.city.promo[hid] = 0;

                    if (data.city.recycle.stage == 1) pay(currentPlayerId,"UM",5000);
                    
                    if (data.city.recycle.stage == 0) {
                        ++data.city.recycle.stage;
                        if (data.city.easter.points < 150000) data.city.recycle.next = Date.now() + (DAY * 30);
                        else data.city.recycle.next = Date.now() + (DAY * 24);
                    } else ++data.city.recycle.stage;

                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "This hero can't be recycled"};
            } else return { ok: false, err: "Should be at least level 2"};
        } else return { ok: false, err: "Already spent all your recycle tokens"}
    } else return { ok: false, err: "Server error" };
}

handlers.fightH = function (args, context) {
    var data=loadData();
    if (data) {
        var headers = {};
        var content = "action=halloween&key="+CQ+"&pid="+currentPlayerId+"&kid="+args.kid+"&setup="+encodeURI(JSON.stringify(args.setup))+"&hero="+encodeURI(JSON.stringify(data.city.halloween.hero));
        var httpMethod = "post";
        try {
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        } catch (e) {
            return { ok: false, err: "Wrong server request"};
        }
        
    
        if (response.success) {
            if (response.data.beat>0) {
                log("Halloween event beat floor "+response.data.beat);
                award(currentPlayerId,"SG",20);
                statKong(args.kid,"halloween2019",response.data.beat);
                if (response.data.beat==100) {
                    data.city.hero[195]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } else if (response.data.beat==250) {
                    data.city.hero[196]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } else if (response.data.beat==500) {
                    data.city.hero[197]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                } else if (response.data.beat==1000) {
                    data.city.hero[198]=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)}});
                }
            }
            var result = {
                enemy: "Path to Niflheim floor "+(response.data.level),
                date: Date.now(),
                setup: args.setup,
                shero: data.city.halloween.hero,
                player: response.data.setup,
                phero: Array(HERO.length).fill(0),
            }
            return {ok:true,update:(response.data.beat>0),battle:result};
        } else return { ok: false, err: response.error };
    } else return { ok: false, err: "Server error" };
}

handlers.finder = function (args, context) {
    var data=loadData();
    if (data) {
        if (data.city.hero[202]>20) {
            var content = "action=finder&key="+CQ+"&pid="+currentPlayerId;
            var httpMethod = "post";
            var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        }
    }
}

handlers.freep6 = function (args, context) {
    var data=loadData();
    var ret1 = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data && ret1) {
        if (data.city.anniversary !== undefined) {
            if (data.city.anniversary > 0) {
                if (data.city.hero[args.hid] == 99 && data.city.promo[args.hid] < 6) {
                    data.city.promo[args.hid] = 6;
                    data.city.anniversary-=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return {ok:true,data:data,update:true};
                } else return { ok: false, err: "Incorrect Hero"};
            } else return { ok: false, err: "No free p6 left"};
        } else return { ok: false, err: "Anniversary undefined"};
    } else {
        return { ok: false, err: "Bad internal"};
    }  
} 

handlers.buyWbAttack = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (isStGeorge()) {
            if (data.city.WB.atks < 7) {
                if (ret.VirtualCurrency.UM >= 500 && pay(currentPlayerId,"UM",500)) {
                    data.city.WB.atks+=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true};   
                } else return { ok: false, err: "Not enough UM"}; 
            } else return { ok: false, err: "Charges full"};
        } else return { ok: false, err: "Option no available"};
    } else return { ok: false, err: "Server error"};
}

handlers.excet = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (args.id !== undefined && args.id >=0 && args.id <=3) {
            if (currentSpecialEvent() == "Space Journey" && data.city.space !== undefined && data.city.space.hyperloop !== undefined) {
                var et = [50,250,500,1000];
                if (ret.VirtualCurrency.ET >= et[args.id] && pay(currentPlayerId,"ET",et[args.id])) {
                    var ec = [1,5,10,20];
                    data.city.space.hyperloop+=ec[args.id];
                    log("[TICKETS] Exchanged "+et[args.id]+" Tickets for "+ec[args.id]+" Space Journey Hyperloop Jumps");
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true}; 
                } else return { ok: false, err: "Not enough Tickets"}; 
            } else if (currentSpecialEvent() == "G.A.M.E.S" && data.city.games !== undefined && data.city.games.activities.instant !== undefined) {
                var et = [50,250,500,1000];
                if (ret.VirtualCurrency.ET >= et[args.id] && pay(currentPlayerId,"ET",et[args.id])) {
                    var ec = [1,5,10,20];
                    data.city.games.activities.instant+=ec[args.id];
                    log("[TICKETS] Exchanged "+et[args.id]+" Tickets for "+ec[args.id]+" G.A.M.E.S Instant Activities");
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true}; 
                } else return { ok: false, err: "Not enough Tickets"}; 
            } else return { ok: false, err: "No event available"};
        } else return { ok: false, err: "Wrong Arguments"};
    } else return { ok: false, err: "Server error"};
}

handlers.sjupgrade = function (args, context) {
    var data=loadData();
    if (data) {
        if (data.city.space !== undefined && data.city.space.week !== undefined && data.city.space.week == getWeek() && currentSpecialEvent() == "Space Journey") {
            if (data.city.space.start!==undefined && Date.now() < data.city.space.start+(DAY*5)) {
                if (args.upgrade == 0 && data.city.space.upgrades[0] >= 10) return { ok: false, err: "Max level reached"};
                else if(args.upgrade !== 0 && data.city.space.upgrades[args.upgrade] >= 20) return { ok: false, err: "Max level reached"};
                else if (data.city.space.gears >= getSJPrice(data.city.space.upgrades[args.upgrade])) {
                    data.city.space.gears-=getSJPrice(data.city.space.upgrades[args.upgrade]);
                    data.city.space.upgrades[args.upgrade]+=1;
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true}; 
                } else return { ok: false, err: "Not enough gears"};
            } else return { ok: false, err: "Your event time has end"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.sjmission = function (args, context) {
    var data=loadData();
    if (data) {
        if (data.city.space !== undefined && data.city.space.week !== undefined && data.city.space.week == getWeek() && currentSpecialEvent() == "Space Journey") {
            if (data.city.space.start!==undefined && Date.now() < data.city.space.start+(DAY*5)) {
                if (args.mission !== undefined && args.mission >= 0 && args.mission <= 3) {
                    if (data.city.space.current !== undefined && data.city.space.upgrades !== undefined && data.city.space.current.timer == -1) {
                        var endTime = Date.now()+getSJUpgrade(args.mission,"engine",data.city.space.upgrades);
                        var endDay = Math.floor(endTime/(24*60*60*1000));
                        if (currentSpecialEvent(endDay) == "Space Journey" && endTime < data.city.space.start+(DAY*5)) {
                            data.city.space.current.timer = Date.now() + getSJUpgrade(args.mission,"engine",data.city.space.upgrades);
                            data.city.space.current.mission = args.mission;
                            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                            return { ok: true, data:data, update: true}; 
                        } else return { ok: false, err: "Cant start mission"};
                    } else return { ok: false, err: "Mission already running"};
                } else return { ok: false, err: "Incorrent mission"};
            } else return { ok: false, err: "Your event time has end"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.sjclaim = function () {
    var data=loadData();
    if (data&&data.city.captchats!==undefined) {
        if (checkCaptcha(data.city)) {
            if (data.city.space !== undefined && data.city.space.week !== undefined && data.city.space.week == getWeek() && currentSpecialEvent() == "Space Journey") {
                if (data.city.space.start!==undefined && Date.now() < data.city.space.start+(DAY*5)) {
                    if (data.city.space.current !== undefined && data.city.space.current.timer !== -1 && data.city.space.current.mission !== -1 && data.city.space.current.timer < Date.now()) {
                        var values = getSJUpgrade(data.city.space.current.mission,"resources",data.city.space.upgrades);
                        var _gears = randInt(values.gears.min,values.gears.max);
                        var _asteroids = randInt(values.asteroids.min,values.asteroids.max);
                        data.city.space.gears+=_gears;
                        data.city.space.asteroids+=_asteroids;
                        updateS(currentPlayerId,"spacejourney",data.city.space.asteroids);
                        data.city.space.last = {
                            mission: data.city.space.current.mission,
                            gears: _gears,
                            asteroids: _asteroids,
                        };
                        data.city.space.current = {
                            mission: -1,
                            timer: -1,
                        }
                        log("[SPACE] Won "+data.city.space.last.gears+" gears, and "+data.city.space.last.asteroids+" Asteroids on Mission "+(data.city.space.current.mission+1));
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                        return { ok: true, data:data, update: true}; 
                    } else return { ok: false, err: "Nothing to claim"};
                } else return { ok: false, err: "Your event time has end"};
            } else return { ok: false, err: "Event not ready"};
        } else return { ok: false, err: "Captcha Required"};    
    } else return { ok: false, err: "Server error"};
}

handlers.sjHyperloop = function () {
    var data=loadData();
    if (data) {
        if (data.city.space !== undefined && data.city.space.week !== undefined && data.city.space.week == getWeek() && currentSpecialEvent() == "Space Journey") {
            if (data.city.space.start!==undefined && Date.now() < data.city.space.start+(DAY*5)) {
                if (data.city.space.current.mission !== -1 && data.city.space.current.timer !== -1) {
                    if (data.city.space.hyperloop > 0) {
                        data.city.space.hyperloop-=1;
                        data.city.space.current.timer-=1200000;
                        log("[SPACE] Hyperloop used. Reduced 20 minutes of current mission");
                        server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                        return { ok: true, data:data, update: true}; 
                    } else return { ok: false, err: "No hyperloop jumps available"}
                } else return { ok: false, err: "No mission Running"}
            } else return { ok: false, err: "Your event time has end"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggupgrade = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S") {
            if (data.city.games.upgrades !== undefined && data.city.games.upgrades[args.upgrade] < 10 && args.upgrade >= 0 && args.upgrade < 3) {
                var currentFavour=server.GetPlayerStatistics({
                    "PlayFabId": currentPlayerId,
                    "StatisticNames": ["games"]
                });
                if (data.city.games.currentFavour == undefined) data.city.games.currentFavour = currentFavour.Statistics[0].Value;
                var price = 15000 + (data.city.games.upgrades[args.upgrade] * 15000);
                if (data.city.games.currentFavour !== undefined && data.city.games.currentFavour >= price) {
                    data.city.games.currentFavour-=price;
                    // Claim Unclaimed AutoActivities to Avoid Change Values
                    var currentTickRate = 1440000 - (data.city.games.upgrades[1] * 72000);
                    var retAction = { action: "ACTIVITIES", claimed: Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate), favour: 0};
                    var favourAmount = 0;
                    if (data.city.games.automatic !== undefined && (Date.now() - data.city.games.automatic.lastClaim) > currentTickRate) {
                        var actionsNumber = Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate);
                        var extraTime = (Date.now() - data.city.games.automatic.lastClaim) % currentTickRate;
                        for (var i = 0; i < actionsNumber; ++i) {
                            var doubleTick = randInt(1,100);
                            var favourToAdd = data.city.games.automatic.tickValue;
                            if (doubleTick <= (10 * data.city.games.upgrades[2])) favourToAdd*=2;
                            favourAmount+=favourToAdd;
                        }
                        data.city.games.automatic.lastClaim = Date.now() - extraTime;
                        if ((data.city.games.currentFavour+favourAmount) > data.city.games.maxFavour) data.city.games.maxFavour=data.city.games.currentFavour+favourAmount;
                        data.city.games.currentFavour+=favourAmount;
                        retAction.favour = favourAmount;
                        log("[G.A.M.E.S] Won "+favourAmount+" favours");
                    }
                    //Do the Upgrade
                    data.city.games.upgrades[args.upgrade]+=1;
                    updateS(currentPlayerId,"games",data.city.games.currentFavour);
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true, log:retAction }; 
                } else return { ok: false, err: "Not enough favours"};
            } else return { ok: false, err: "Upgrade maxed or icorrect"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggdefenses = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S" && data.city.games.defenses !== undefined && Date.now() < data.city.games.start+(86400000*5)) {
            if (args.defense>=0 && args.defense<=2) {
                var currentFavour=server.GetPlayerStatistics({
                    "PlayFabId": currentPlayerId,
                    "StatisticNames": ["games"]
                });
                if (data.city.games.currentFavour == undefined) data.city.games.currentFavour = currentFavour.Statistics[0].Value;
                var price = 20000;
                if (data.city.games.currentFavour !== undefined && data.city.games.currentFavour >= price) {
                    data.city.games.currentFavour-=price;
                    if (data.city.games.start+DAY > Date.now()) data.city.games.defenses[args.defense]=data.city.games.start+(2*DAY);
                    else if (Date.now() > data.city.games.defenses[args.defense]) data.city.games.defenses[args.defense] = Date.now() + DAY;
                    else data.city.games.defenses[args.defense]+=DAY;
                    updateS(currentPlayerId,"games",data.city.games.currentFavour);
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true}; 
                } else return { ok: false, err: "Not enough favours"};
            } else return { ok: false, err: "Incorrect Args"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggactivity = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret&&data.city.captchats!==undefined) {
        if (checkCaptcha(data.city)) {
            if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S" && Date.now() < data.city.games.start+(86400000*5)) {
                if (args.activity !== undefined && args.activity >= 0 && args.activity <= 2) {
                    if (data.city.games.activities !== undefined && data.city.games.activities.timer == -1 && data.city.games.activities.activity == -1) {
                        if (data.city.games.activities.points > 0 || data.city.games.activities.instant > 0) {
                            if (args.activity == 2 && data.city.games.stamina < 110) return { ok: false, err: "Not enough stamina"};
                            if (data.city.games.activities.instant > 0) {
                                data.city.games.activities.instant-=1;
                                if (args.activity == 2) data.city.games.stamina-=110;
                                if (args.activity == 0) {
                                    if (Date.now() < data.city.games.victim[1]) data.city.games.stamina+=(25+(25*10*data.city.games.upgrades[0]/100));
                                    else data.city.games.stamina+=(50+(50*10*data.city.games.upgrades[0]/100));
                                    data.city.games.automatic.tickValue+=(100+(100*10*data.city.games.upgrades[0]/100));
                                } else if (args.activity == 1) {
                                    data.city.games.stamina+=(110+(110*10*data.city.games.upgrades[0]/100));
                                } else if (args.activity == 2) {
                                    if (Date.now() < data.city.games.victim[2]) data.city.games.automatic.tickValue+=(205+(205*10*data.city.games.upgrades[0]/100));
                                    else data.city.games.automatic.tickValue+=(410+(410*10*data.city.games.upgrades[0]/100));
                                }
                                data.city.games.activities.timer = -1;
                                data.city.games.activities.activity = -1;
                                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                                return { ok: true, data:data, update: true}; 
                            } else {
                                var times = [90000,180000,360000];
                                data.city.games.activities.timer = Date.now()+times[args.activity];
                                data.city.games.activities.activity = args.activity;
                                data.city.games.activities.points-=1;
                                if (args.activity == 2) data.city.games.stamina-=110;
                                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                                return { ok: true, data:data, update: true}; 
                            }
                        } else return { ok: false, err: "Not enough points"};
                    } else return { ok: false, err: "Already running an activity"};
                } else return { ok: false, err: "Incorrect activity"};
            } else return { ok: false, err: "Event not ready"};
        } else return { ok: false, err: "Captcha Required"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggclaim = function (args, context) {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S" && Date.now() < data.city.games.start+(86400000*5)) {
            if (data.city.games.activities !== undefined && data.city.games.activities.timer !== -1 && data.city.games.activities.activity !== -1 && data.city.games.activities.timer < Date.now()) {
                var retAction = undefined;
                var currentTickRate = 1440000 - (data.city.games.upgrades[1] * 72000);
                var favourAmount = 0;
                if (data.city.games.automatic !== undefined && (Date.now() - data.city.games.automatic.lastClaim) > currentTickRate) {
                    retAction = { action: "ACTIVITIES", claimed: Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate), favour: 0};
                    var actionsNumber = Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate);
                    var extraTime = (Date.now() - data.city.games.automatic.lastClaim) % currentTickRate;
                    for (var i = 0; i < actionsNumber; ++i) {
                        var doubleTick = randInt(1,100);
                        var favourToAdd = data.city.games.automatic.tickValue;
                        if (doubleTick <= (10 * data.city.games.upgrades[2])) favourToAdd*=2;
                        favourAmount+=favourToAdd;
                    }
                    data.city.games.automatic.lastClaim = Date.now() - extraTime;
                    var currentFavour=server.GetPlayerStatistics({
                        "PlayFabId": currentPlayerId,
                        "StatisticNames": ["games"]
                    });
                    if (data.city.games.currentFavour == undefined) data.city.games.currentFavour = currentFavour.Statistics[0].Value;
                    if ((data.city.games.currentFavour+favourAmount) > data.city.games.maxFavour) data.city.games.maxFavour=data.city.games.currentFavour+favourAmount;
                    data.city.games.currentFavour+=favourAmount;
                    updateS(currentPlayerId,"games",data.city.games.currentFavour);
                    retAction.favour = favourAmount;
                    log("[G.A.M.E.S] Won "+favourAmount+" favours");
                }
                
                if (data.city.games.activities.activity == 0) {
                    if (Date.now() < data.city.games.victim[1]) data.city.games.stamina+=(25+(25*10*data.city.games.upgrades[0]/100));
                    else data.city.games.stamina+=(50+(50*10*data.city.games.upgrades[0]/100));
                    data.city.games.automatic.tickValue+=(100+(100*10*data.city.games.upgrades[0]/100));
                } else if (data.city.games.activities.activity == 1) {
                    data.city.games.stamina+=(110+(110*10*data.city.games.upgrades[0]/100));
                } else if (data.city.games.activities.activity == 2) {
                    if (Date.now() < data.city.games.victim[2]) data.city.games.automatic.tickValue+=(205+(205*10*data.city.games.upgrades[0]/100));
                    else data.city.games.automatic.tickValue+=(410+(410*10*data.city.games.upgrades[0]/100));
                }
                data.city.games.activities.timer = -1;
                data.city.games.activities.activity = -1;
                
                if ((data.city.games.start + DAY) <= Date.now() && (data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense) + (DAY/4)) <=  Date.now()) {
                    var totalTime = (Date.now() - (data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense)));
                    var timeRanges = Math.floor(totalTime / (DAY/4));
                    if (retAction==undefined) retAction = { action: "DEFENSES", claimed: timeRanges, defended: [0,0,0]};
                    else {
                        retAction.action="MIXEDAUTO";
                        retAction.dclaimed=timeRanges;
                        retAction.defended=[0,0,0];
                    }
                    for (var i = 0; i < timeRanges; ++i) {
                        for (var j = 0; j < 3; ++j) {
                            if (Date.now() >= data.city.games.defenses[j] && Date.now() >= data.city.games.victim[j]) {
                                if (randInt(1,100) <= data.city.games.rolls[j]) {
                                    var actions = ["Hunted","Looted","Killed"];
                                    data.city.games.victim[j] = Date.now()+DAY;
                                    if (j == 1) activityFlag = true;
                                    log("[G.A.M.E.S] Defense Action - "+actions[j]+". This has negative effects for 24h");
                                    retAction.defended[j]+=1;
                                    data.city.games.rolls[j]=10;
                                } else data.city.games.rolls[j]+=10;
                            }
                        }
                        ++data.city.games.lastDefense;
                    }
                }
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                return { ok: true, data:data, update: true, log: retAction}; 
            } else return { ok: false, err: "Nothing to claim"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggautoclaim = function () {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S" && Date.now() < data.city.games.start+(86400000*5)) {
            var currentTickRate = 1440000 - (data.city.games.upgrades[1] * 72000);
            if (data.city.games.automatic !== undefined && (Date.now() - data.city.games.automatic.lastClaim) > currentTickRate) {
                var retAction = { action: "ACTIVITIES", claimed: Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate), favour: 0};
                var actionsNumber = Math.floor((Date.now() - data.city.games.automatic.lastClaim) / currentTickRate);
                var extraTime = (Date.now() - data.city.games.automatic.lastClaim) % currentTickRate;
                var favourAmount = 0;
                for (var i = 0; i < actionsNumber; ++i) {
                    var doubleTick = randInt(1,100);
                    var favourToAdd = data.city.games.automatic.tickValue;
                    if (doubleTick <= (10 * data.city.games.upgrades[2])) favourToAdd*=2;
                    favourAmount+=favourToAdd;
                }
                data.city.games.automatic.lastClaim = Date.now() - extraTime;
                var currentFavours=server.GetPlayerStatistics({
                    "PlayFabId": currentPlayerId,
                    "StatisticNames": ["games"]
                });
                if (data.city.games.currentFavour == undefined) data.city.games.currentFavour = currentFavours.Statistics[0].Value;
                if ((data.city.games.currentFavour+favourAmount) > data.city.games.maxFavour) data.city.games.maxFavour=data.city.games.currentFavour+favourAmount;
                data.city.games.currentFavour+=favourAmount;
                updateS(currentPlayerId,"games",data.city.games.currentFavour);
                retAction.favour = favourAmount;
                log("[G.A.M.E.S] Won "+favourAmount+" favours");
                if ((data.city.games.start + DAY) <= Date.now() && (data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense) + (DAY/4)) <=  Date.now()) {
                    var totalTime = (Date.now() - (data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense)));
                    var timeRanges = Math.floor(totalTime / (DAY/4));
                    retAction.action = "MIXEDAUTO";
                    retAction.dclaimed = timeRanges;
                    retAction.defended = [0,0,0];
                    for (var i = 0; i < timeRanges; ++i) {
                        for (var j = 0; j < 3; ++j) {
                            if (Date.now() >= data.city.games.defenses[j] && Date.now() >= data.city.games.victim[j]) {
                                if (randInt(1,100) <= data.city.games.rolls[j]) {
                                    var actions = ["Hunted","Looted","Killed"];
                                    data.city.games.victim[j] = Date.now()+DAY;
                                    if (j == 1) activityFlag = true;
                                    log("[G.A.M.E.S] Defense Action - "+actions[j]+". This has negative effects for 24h");
                                    retAction.defended[j]+=1;
                                    data.city.games.rolls[j]=10;
                                } else data.city.games.rolls[j]+=10;
                            }
                        }
                        ++data.city.games.lastDefense;
                    }
                }
                server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                return { ok: true, data:data, update: true, log: retAction }; 
            } else return { ok: false, err: "Timer not finished"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.ggautodefense = function () {
    var data=loadData();
    var ret = server.GetUserInventory({"PlayFabId" : currentPlayerId});
    if (data&&ret) {
        if (data.city.games !== undefined && data.city.games.week !== undefined && data.city.games.week == getWeek() && currentSpecialEvent() == "G.A.M.E.S" && Date.now() < data.city.games.start+(86400000*5)) {
            if (data.city.games.start !== undefined && (data.city.games.start + DAY) <= Date.now()) {
                if ((data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense) + (DAY/4)) <=  Date.now()) {
                    var totalTime = (Date.now() - (data.city.games.start + DAY + ((DAY/4)*data.city.games.lastDefense)));
                    var timeRanges = Math.floor(totalTime / (DAY/4));
                    var retAction = { action: "DEFENSES", claimed: timeRanges, defended: [0,0,0]};
                    for (var i = 0; i < timeRanges; ++i) {
                        for (var j = 0; j < 3; ++j) {
                            if (Date.now() >= data.city.games.defenses[j] && Date.now() >= data.city.games.victim[j]) {
                                if (randInt(1,100) <= data.city.games.rolls[j]) {
                                    var actions = ["Hunted","Looted","Killed"];
                                    data.city.games.victim[j] = Date.now()+DAY;
                                    if (j == 1) activityFlag = true;
                                    log("[G.A.M.E.S] Defense Action - "+actions[j]+". This has negative effects for 24h");
                                    retAction.defended[j]+=1;
                                    data.city.games.rolls[j]=10;
                                } else data.city.games.rolls[j]+=10;
                            }
                        }
                        ++data.city.games.lastDefense;
                    }
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return { ok: true, data:data, update: true, log:retAction}; 
                } else return { ok: false, err: "Not ready"};
            } else return { ok: false, err: "This starts after 24h of start"};
        } else return { ok: false, err: "Event not ready"};
    } else return { ok: false, err: "Server error"};
}

handlers.createCaptcha = function(args, context) {
    var data=loadData();

    var content = "action=createCapcha&key="+CQ+"&pid="+currentPlayerId;
    var httpMethod = "post";
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        if (response.success) {
            data.city.captcha = response.id;
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
            return { ok: true, id: response.id};
        } else return { ok: false, err: "Something went wrong"};
    } catch (e) {
        return { ok: false, err: "Wrong server request"};
    }
}

function isStGeorge() {
    var tid=Math.floor(Date.now()/(24*60*60*1000));
    if (tid>=18375 && tid<=18381) return true;
}

function currentSpecialEvent (day) {
    if (day==undefined) day=Math.floor(Date.now()/(24*60*60*1000));
    var eventLoop = ["Event 1","G.A.M.E.S","Event 3","Space Journey","Event 5","Event 6"];
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var week = Math.ceil((((day-18379) + 1)/7));
    if (days[(day-3)%7] !== "Monday") return eventLoop[(week-1)%eventLoop.length];
    else return "No event";
}

function getWeek () {
    return Math.ceil((((Math.floor(Date.now()/(24*60*60*1000))-18379) + 1)/7));
}

function getDayOfTheWeek () {
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return days[(Math.floor(Date.now()/(24*60*60*1000))-3)%7];
}

function getLastDayOccurence (date, day) {
    const d = new Date(date.getTime());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (days.includes(day)) {
        const modifier = (d.getDay() + days.length - days.indexOf(day)) % 7 || 7;
        d.setDate(d.getDate() - modifier);
    }
    return d;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSJPrice (level) {
	return 5000 + (5000 * level);
}

function getSJUpgrade (mission, mode, upgrades) {
    if (mode == "engine") {
      var base = [3600000, 21600000, 43200000, 86400000];
      return (Math.floor(base[mission] - (base[mission] * (6 * upgrades[0]) / 100)));
    } else if (mode == "resources") {
        var base = [
            {
                asteroids: {
                    min: 30,
                    max: 60
                },
                gears: {
                    min: 300,
                    max: 600
                }
            },
            {
                asteroids: {
                    min: 175,
                    max: 350
                },
                gears: {
                    min: 1750,
                    max: 3500
                }
            },
            {
                asteroids: {
                    min: 340,
                    max: 680
                },
                gears: {
                    min: 3400,
                    max: 6800
                }
            },
            {
                asteroids: {
                    min: 680,
                    max: 1360
                },
                gears: {
                    min: 6800,
                    max: 13600
                }
            }
        ];
        var hours = [1,6,12,24];
        var results = {
            asteroids: {
                min: base[mission].asteroids.min + (hours[mission] * 3 * upgrades[1]),
                max: base[mission].asteroids.max + (hours[mission] * 3 * upgrades[1])
            },
            gears: {
                min: base[mission].gears.min + (hours[mission] * 30 * upgrades[2]),
                max: base[mission].gears.max + (hours[mission] * 30 * upgrades[2])
            }
        };
        return ({
            asteroids: {
                min: results.asteroids.min + (hours[mission] * 3 * upgrades[3]),
                max: results.asteroids.max
            },
            gears: {
                min: results.gears.min + (hours[mission] * 30 * upgrades[4]),
                max: results.gears.max
            }
        })
    }
}

handlers.validateCaptcha = function(args, context) {
    var data=loadData();

    var content = "action=checkCapcha&key="+CQ+"&id="+data.city.captcha+"&solution="+encodeURI(JSON.stringify(args.solution));
    var httpMethod = "post";
    delete data.city.captcha;
    try {
        var response = JSON.parse(http.request(CQW, httpMethod, content, XWWW, {}));
        if (response.success) {
            data.city.captchats = Date.now() + 30*60*1000;
            server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
            return {ok:true,data:data};
        }
    } catch (e) {
        
    }
    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
    return {ok:false};
}

function checkCaptcha (city) {
    return city.captchats > Date.now();
}

handlers.startLoopEvent = function () {
    var data=loadData();
    if (data) {
        if (getDayOfTheWeek != "Monday") {
            var startDate = new Date();
            if (getDayOfTheWeek() !== "Tuesday" && getDayOfTheWeek() !== "Wednesday") startDate = getLastDayOccurence(new Date(),"Wednesday");
            if (getDayOfTheWeek() !== "Tuesday") startDate.setHours(0,0,0,0);

            var generalEventEnd = new Date();
            if (getDayOfTheWeek() !== "Tuesday") generalEventEnd = getLastDayOccurence(new Date(),"Tuesday");
            generalEventEnd.setHours(0,0,0,0);
            generalEventEnd = generalEventEnd.getTime() + (DAY * 6);

            if (currentSpecialEvent() == "G.A.M.E.S") {
                if (data.city.games == undefined || data.city.games.week !== getWeek()) {
                    data.city.games = {
                        version: 3,
                        week: getWeek(),
                        day: 0,
                        currentFavour: 0,
                        maxFavour: 0,
                        start: startDate.getTime(),
                        end: generalEventEnd,
                        lastDefense: 0,
                        stamina: 0,
                        automatic: {
                            tickValue: 2000,
                            lastClaim: startDate.getTime(),
                        },
                        activities: {
                            instant: 0,
                            points: 20,
                            timer: -1,
                            activity: -1,
                        },
                        upgrades: [0,0,0],
                        defenses: [startDate.getTime(),startDate.getTime(),startDate.getTime()],
                        victim: [startDate.getTime(),startDate.getTime(),startDate.getTime()],
                        rolls: [10,10,10],
                        activityFlag: false,
                    };
                    updateS(currentPlayerId,"games",0);
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return {ok:true,data:data};
                } else return { ok: false, err: "Can't start event"};
            } else if (currentSpecialEvent() == "Space Journey") {
                if (data.city.space == undefined || data.city.space.week !== getWeek()) {
                    data.city.space = {
                        version: 2,
                        start: startDate.getTime(),
                        end: generalEventEnd,
                        week: getWeek(),
                        day: 0,
                        gears: 10000,
                        asteroids: 0,
                        hyperloop: 6,
                        upgrades: [0,0,0,0,0],
                        current: {
                            mission: -1,
                            timer: -1,
                        },
                        last: {
                            mission: -1,
                            asteroids: 0,
                            gears: 0,
                        }
                    };
                    updateS(currentPlayerId,"spacejourney",0);
                    server.UpdateUserInternalData({"PlayFabId" : currentPlayerId, "Data" : {city:JSON.stringify(data.city)} });
                    return {ok:true,data:data};
                } else return { ok: false, err: "Can't start event"};
            } else return { ok: false, err: "No event available"};
        } else return { ok: false, err: "Can't start event on Monday"};
    } else return { ok: false, err: "Server error"};
}
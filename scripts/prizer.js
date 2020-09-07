var mysql   = require('mysql');
var PlayFab = require("playfab-sdk/Scripts/PlayFab/PlayFab.js");
var PlayFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer.js");
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

const fs = require('fs');
var request = require('sync-request');

var Q = [];
var N = [
    [2,1,3,0],
    [3,2,0,1],
    [0,3,1,2],
    [1,0,2,3]
];

var MONSTERS = [
  {
    name: "KODAMA",
    type: 0,
    img: "0mlg",
    hp: 20,
    atk: 8,
    cost: 500
  },
  {
    name: "SAPLING",
    type: 1,
    img: "038r",
    hp: 44,
    atk: 4,
    cost: 650
  },
  {
    name: "WILL-O'-THE-WHISP",
    type: 2,
    img: "0nj0",
    hp: 16,
    atk: 10,
    cost: 500
  },
  {
    name: "NAVI",
    type: 3,
    img: "0f71",
    hp: 30,
    atk: 6,
    cost: 700
  },
  {
    name: "HARPY",
    type: 0,
    img: "086x",
    hp: 48,
    atk: 6,
    cost: 1950
  },
  {
    name: "ALUX",
    type: 1,
    img: "0cur",
    hp: 30,
    atk: 8,
    cost: 1350
  },
  {
    name: "FOX SPIRIT",
    type: 2,
    img: "02ys",
    hp: 18,
    atk: 16,
    cost: 1950
  },
  {
    name: "DAKUWAQA",
    type: 3,
    img: "0owq",
    hp: 24,
    atk: 12,
    cost: 1950
  },
  {
    name: "GRIFFIN",
    type: 0,
    img: "0gpm",
    hp: 36,
    atk: 12,
    cost: 4000
  },
  {
    name: "CENTAUR",
    type: 1,
    img: "0j0o",
    hp: 26,
    atk: 16,
    cost: 3750
  },
  {
    name: "HELLHOUND",
    type: 2,
    img: "0n11",
    hp: 54,
    atk: 8,
    cost: 4000
  },
  {
    name: "MERMAID",
    type: 3,
    img: "0lgi",
    hp: 18,
    atk: 24,
    cost: 4000
  },
  {
    name: "QUETZALCOATL",
    type: 0,
    img: "0dao",
    hp: 24,
    atk: 26,
    cost: 7500
  },
  {
    name: "ENT",
    type: 1,
    img: "098a",
    hp: 72,
    atk: 10,
    cost: 9000
  },
  {
    name: "WYVERN",
    type: 2,
    img: "0ojf",
    hp: 52,
    atk: 16,
    cost: 11500
  },
  {
    name: "YETI",
    type: 3,
    img: "05fn",
    hp: 36,
    atk: 20,
    cost: 9000
  },
  {
    name: "BAILONG",
    type: 0,
    img: "0i6u",
    hp: 60,
    atk: 20,
    cost: 20500
  },
  {
    name: "SPHINX",
    type: 1,
    img: "01z2",
    hp: 36,
    atk: 40,
    cost: 27000
  },
  {
    name: "CHERUFE",
    type: 2,
    img: "041v",
    hp: 42,
    atk: 24,
    cost: 15500
  },
  {
    name: "HIPPOCAMPUS",
    type: 3,
    img: "004t",
    hp: 78,
    atk: 18,
    cost: 26000
  },
  {
    name: "MANTICORE",
    type: 0,
    img: "03oq",
    hp: 62,
    atk: 34,
    cost: 48000
  },
  {
    name: "ALRAUNE",
    type: 1,
    img: "038l",
    hp: 72,
    atk: 24,
    cost: 35500
  },
  {
    name: "GARGOYLE",
    type: 2,
    img: "00uj",
    hp: 104,
    atk: 20,
    cost: 47000
  },
  {
    name: "HYDRA",
    type: 3,
    img: "05eo",
    hp: 44,
    atk: 44,
    cost: 42000
  },
  {
    name: "ANKA",
    type: 0,
    img: "07sp",
    hp: 106,
    atk: 26,
    cost: 72000
  },
  {
    name: "CHIMERA",
    type: 1,
    img: "0ibi",
    hp: 66,
    atk: 36,
    cost: 57500
  },
  {
    name: "IFRIT",
    type: 2,
    img: "01vq",
    hp: 54,
    atk: 44,
    cost: 57500
  },
  {
    name: "KRAKEN",
    type: 3,
    img: "03dr",
    hp: 92,
    atk: 32,
    cost: 79500
  },
  {
    name: "TYPHON",
    type: 0,
    img: "0luj",
    hp: 78,
    atk: 52,
    cost: 128500
  },
  {
    name: "AMMIT",
    type: 1,
    img: "0lf0",
    hp: 60,
    atk: 60,
    cost: 107500
  },
  {
    name: "PHOENIX",
    type: 2,
    img: "0lal",
    hp: 94,
    atk: 50,
    cost: 160500
  },
  {
    name: "LEVIATHAN",
    type: 3,
    img: "0nob",
    hp: 108,
    atk: 36,
    cost: 120500
  },
  {
    name: "HECATONCHEIRES",
    type: 0,
    img: "0md6",
    hp: 116,
    atk: 54,
    cost: 247500
  },
  {
    name: "MOAI GOLEM",
    type: 1,
    img: "072e",
    hp: 120,
    atk: 48,
    cost: 218000
  },
  {
    name: "BALROG",
    type: 2,
    img: "0cxp",
    hp: 102,
    atk: 58,
    cost: 227000
  },
  {
    name: "POSEIDON",
    type: 3,
    img: "0cf4",
    hp: 80,
    atk: 70,
    cost: 209000
  },
  {
    name: "OPHION",
    type: 0,
    img: "0865",
    hp: 142,
    atk: 60,
    cost: 392500
  },
  {
    name: "AKUPARA",
    type: 1,
    img: "0al5",
    hp: 122,
    atk: 64,
    cost: 344500
  },
  {
    name: "BEELZEBUB",
    type: 2,
    img: "06vm",
    hp: 104,
    atk: 82,
    cost: 393500
  },
  {
    name: "CTHULHU",
    type: 3,
    img: "0gjj",
    hp: 110,
    atk: 70,
    cost: 337500
  },
  {
    name: "THE NORNS",
    type: 0,
    img: "0l22",
    hp: 114,
    atk: 110,
    cost: 701500
  },
  {
    name: "FENRIR",
    type: 1,
    img: "0hly",
    hp: 134,
    atk: 81,
    cost: 565000
  },
  {
    name: "HUITZILOPOCHTLI",
    type: 2,
    img: "0gds",
    hp: 164,
    atk: 70,
    cost: 614500
  },
  {
    name: "JÖRMUNGANDR",
    type: 3,
    img: "06eh",
    hp: 152,
    atk: 79,
    cost: 657500
  },
  {
    name: "WORLD EGG",
    type: 0,
    img: "09jv",
    hp: 164,
    atk: 88,
    cost: 866500
  },
  {
    name: "LICHE",
    type: 1,
    img: "0p6g",
    hp: 128,
    atk: 120,
    cost: 951500
  },
  {
    name: "SURTUR",
    type: 2,
    img: "006w",
    hp: 156,
    atk: 92,
    cost: 859000
  },
  {
    name: "CAILLEACH",
    type: 3,
    img: "0oa6",
    hp: 188,
    atk: 78,
    cost: 887500
  },
  {
    name: "CHRONOS",
    type: 0,
    img: "089d",
    hp: 210,
    atk: 94,
    cost: 1386000
  },
  {
    name: "GEA",
    type: 1,
    img: "0bc7",
    hp: 190,
    atk: 132,
    cost: 1985500
  },
  {
    name: "BAHAMUT",
    type: 2,
    img: "018x",
    hp: 166,
    atk: 130,
    cost: 1584500
  },
  {
    name: "ŌGENOS",
    type: 3,
    img: "0khj",
    hp: 140,
    atk: 128,
    cost: 1199000
  },
  {
    name: "BRAHMA",
    type: 0,
    img: "04ot",
    hp: 200,
    atk: 142,
    cost: 2392500
  },
  {
    name: "YGGDRASIL",
    type: 1,
    img: "0p8r",
    hp: 244,
    atk: 136,
    cost: 3022000
  },
  {
    name: "RA",
    type: 2,
    img: "09r6",
    hp: 168,
    atk: 168,
    cost: 2370500
  },
  {
    name: "NIFLHEIM",
    type: 3,
    img: "05d0",
    hp: 212,
    atk: 122,
    cost: 2079500
  },
  {
    name: "GINNUN",
    type: 0,
    img: "0jaq",
    hp: 226,
    atk: 190,
    cost: 4448500
  },
  {
    name: "KAILAS",
    type: 1,
    img: "03qr",
    hp: 200,
    atk: 186,
    cost: 3586500
  },
  {
    name: "CHAOS",
    type: 2,
    img: "08qe",
    hp: 234,
    atk: 136,
    cost: 2838000
  },
  {
    name: "NŪN",
    type: 3,
    img: "0njr",
    hp: 276,
    atk: 142,
    cost: 3879000
  },
  {
    name: "FURIOUS KODAMA",
    type: 0,
    img: "0mlg",
    hp: 280,
    atk: 196,
    cost: 6427500
  },
  {
    name: "FURIOUS SAPLING",
    type: 1,
    img: "038r",
    hp: 284,
    atk: 190,
    cost: 6267000
  },
  {
    name: "FURIOUS WILL-O'-THE-WHISP",
    type: 2,
    img: "0nj0",
    hp: 288,
    atk: 192,
    cost: 6500500
  },
  {
    name: "FURIOUS NAVI",
    type: 3,
    img: "0f71",
    hp: 286,
    atk: 198,
    cost: 6737500
  },
  {
    name: "FURIOUS HARPY",
    type: 0,
    img: "086x",
    hp: 318,
    atk: 206,
    cost: 8382500
  },
  {
    name: "FURIOUS ALUX",
    type: 1,
    img: "0cur",
    hp: 338,
    atk: 192,
    cost: 8265500
  },
  {
    name: "FURIOUS FOX SPIRIT",
    type: 2,
    img: "02ys",
    hp: 236,
    atk: 292,
    cost: 9045000
  },
  {
    name: "FURIOUS DAKUWAQA",
    type: 3,
    img: "0owq",
    hp: 262,
    atk: 258,
    cost: 8786500
  },
  {
    name: "FURIOUS GRIFFIN",
    type: 0,
    img: "0gpm",
    hp: 280,
    atk: 280,
    cost: 10975500
  },
  {
    name: "FURIOUS CENTAUR",
    type: 1,
    img: "0j0o",
    hp: 330,
    atk: 242,
    cost: 11283500
  },
  {
    name: "FURIOUS HELLHOUND",
    type: 2,
    img: "0n11",
    hp: 392,
    atk: 200,
    cost: 10975500
  },
  {
    name: "FURIOUS MERMAID",
    type: 3,
    img: "0lgi",
    hp: 330,
    atk: 230,
    cost: 10454500
  },
  {
    name: "FURIOUS QUETZALCOATL",
    type: 0,
    img: "0dao",
    hp: 440,
    atk: 206,
    cost: 13644000
  },
  {
    name: "FURIOUS ENT",
    type: 1,
    img: "098a",
    hp: 320,
    atk: 282,
    cost: 13553500
  },
  {
    name: "FURIOUS WYVERN",
    type: 2,
    img: "0ojf",
    hp: 352,
    atk: 244,
    cost: 12585000
  },
  {
    name: "FURIOUS YETI",
    type: 3,
    img: "05fn",
    hp: 360,
    atk: 238,
    cost: 12539500
  },
  {
    name: "FURIOUS BAILONG",
    type: 0,
    img: "0i6u",
    hp: 378,
    atk: 268,
    cost: 16121000
  },
  {
    name: "FURIOUS SPHINX",
    type: 1,
    img: "01z2",
    hp: 382,
    atk: 264,
    cost: 16012500
  },
  {
    name: "FURIOUS CHERUFE",
    type: 2,
    img: "041v",
    hp: 388,
    atk: 266,
    cost: 16577800
  },
  {
    name: "FURIOUS HIPPOCAMPUS",
    type: 3,
    img: "004t",
    hp: 454,
    atk: 232,
    cost: 17091000
  },
  {
    name: "FURIOUS MANTICORE",
    type: 0,
    img: "03oq",
    hp: 428,
    atk: 286,
    cost: 21413000
  },
  {
    name: "FURIOUS ALRAUNE",
    type: 1,
    img: "038l",
    hp: 446,
    atk: 272,
    cost: 21126000
  },
  {
    name: "FURIOUS GARGOYLE",
    type: 2,
    img: "00uj",
    hp: 362,
    atk: 338,
    cost: 21399000
  },
  {
    name: "FURIOUS HYDRA",
    type: 3,
    img: "05eo",
    hp: 416,
    atk: 290,
    cost: 20950500
  },
  {
    name: "FURIOUS ANKA",
    type: 0,
    img: "07sp",
    hp: 454,
    atk: 320,
    cost: 27686500
  },
  {
    name: "FURIOUS CHIMERA",
    type: 1,
    img: "0ibi",
    hp: 450,
    atk: 324,
    cost: 27835500
  },
  {
    name: "FURIOUS IFRIT",
    type: 2,
    img: "01vq",
    hp: 458,
    atk: 318,
    cost: 27791000
  },
  {
    name: "FURIOUS KRAKEN",
    type: 3,
    img: "03dr",
    hp: 440,
    atk: 340,
    cost: 27938500
  },
  {
    name: "FURIOUS TYPHON",
    type: 0,
    img: "0luj",
    hp: 500,
    atk: 348,
    cost: 36290000
  },
  {
    name: "FURIOUS AMMIT",
    type: 1,
    img: "0lf0",
    hp: 516,
    atk: 340,
    cost: 36741500
  },
  {
    name: "FURIOUS PHOENIX",
    type: 2,
    img: "0lal",
    hp: 424,
    atk: 410,
    cost: 36240000
  },
  {
    name: "FURIOUS LEVIATHAN",
    type: 3,
    img: "0nob",
    hp: 490,
    atk: 354,
    cost: 36121500
  },
  {
    name: "FURIOUS HECATONCHEIRES",
    type: 0,
    img: "0md6",
    hp: 554,
    atk: 374,
    cost: 47156000
  },
  {
    name: "FURIOUS MOAI GOLEM",
    type: 1,
    img: "072e",
    hp: 458,
    atk: 458,
    cost: 48035500
  },
  {
    name: "FURIOUS BALROG",
    type: 2,
    img: "0cxp",
    hp: 534,
    atk: 392,
    cost: 47886000
  },
  {
    name: "FURIOUS POSEIDON",
    type: 3,
    img: "0cf4",
    hp: 540,
    atk: 388,
    cost: 47951500
  },
  {
    name: "FURIOUS OPHION",
    type: 0,
    img: "0865",
    hp: 580,
    atk: 430,
    cost: 62274500
  },
  {
    name: "FURIOUS AKUPARA",
    type: 1,
    img: "0al5",
    hp: 592,
    atk: 418,
    cost: 61548000
  },
  {
    name: "FURIOUS BEELZEBUB",
    type: 2,
    img: "06vm",
    hp: 764,
    atk: 328,
    cost: 62721500
  },
  {
    name: "FURIOUS CTHULHU",
    type: 3,
    img: "0gjj",
    hp: 500,
    atk: 506,
    cost: 63628000
  },
  {
    name: "FURIOUS THE NORNS",
    type: 0,
    img: "0l22",
    hp: 496,
    atk: 582,
    cost: 77548500
  },
  {
    name: "FURIOUS FENRIR",
    type: 1,
    img: "0hly",
    hp: 622,
    atk: 468,
    cost: 78527500
  },
  {
    name: "FURIOUS HUITZILOPOCHTLI",
    type: 2,
    img: "0gds",
    hp: 638,
    atk: 462,
    cost: 80013000
  },
  {
    name: "FURIOUS JÖRMUNGANDR",
    type: 3,
    img: "06eh",
    hp: 700,
    atk: 416,
    cost: 78570000
  },
  {
    name: "FURIOUS WORLD EGG",
    type: 0,
    img: "09jv",
    hp: 712,
    atk: 484,
    cost: 101147500
  },
  {
    name: "FURIOUS LICHE",
    type: 1,
    img: "0p6g",
    hp: 580,
    atk: 602,
    cost: 103158500
  },
  {
    name: "FURIOUS SURTUR",
    type: 2,
    img: "006w",
    hp: 690,
    atk: 498,
    cost: 100713000
  },
  {
    name: "FURIOUS CAILLEACH",
    type: 3,
    img: "0oa6",
    hp: 682,
    atk: 500,
    cost: 99672000
  },
  {
    name: "FURIOUS CHRONOS",
    type: 0,
    img: "089d",
    hp: 644,
    atk: 642,
    cost: 132923000
  },
  {
    name: "FURIOUS GEA",
    type: 1,
    img: "0bc7",
    hp: 770,
    atk: 540,
    cost: 134058500
  },
  {
    name: "FURIOUS BAHAMUT",
    type: 2,
    img: "018x",
    hp: 746,
    atk: 552,
    cost: 132125000
  },
  {
    name: "FURIOUS ŌGENOS",
    type: 3,
    img: "0khj",
    hp: 762,
    atk: 536,
    cost: 130511500
  },
  {
    name: "FURIOUS BRAHMA",
    type: 0,
    img: "04ot",
    hp: 834,
    atk: 616,
    cost: 184115000
  },
  {
    name: "FURIOUS YGGDRASIL",
    type: 1,
    img: "0p8r",
    hp: 830,
    atk: 614,
    cost: 181902500
  },
  {
    name: "FURIOUS RA",
    type: 2,
    img: "09r6",
    hp: 746,
    atk: 676,
    cost: 179059500
  },
  {
    name: "FURIOUS NIFLHEIM",
    type: 3,
    img: "05d0",
    hp: 1008,
    atk: 512,
    cost: 185380500
  },
  {
    name: "FURIOUS GINNUN",
    type: 0,
    img: "0jaq",
    hp: 700,
    atk: 906,
    cost: 252527500
  },
  {
    name: "FURIOUS KAILAS",
    type: 1,
    img: "03qr",
    hp: 1022,
    atk: 614,
    cost: 248541000
  },
  {
    name: "FURIOUS CHAOS",
    type: 2,
    img: "08qe",
    hp: 930,
    atk: 690,
    cost: 257020000
  },
  {
    name: "FURIOUS NŪN",
    type: 3,
    img: "0njr",
    hp: 802,
    atk: 802,
    cost: 257924500
  },
  {
    name: "RAGING KODAMA",
    type: 0,
    img: "0mlg",
    hp: 973,
    atk: 950,
    cost: 444349500
  },
  {
    name: "RAGING SAPLING",
    type: 1,
    img: "038r",
    hp: 1187,
    atk: 739,
    cost: 410783500
  },
  {
    name: "RAGING WILL-O'-THE-WHISP",
    type: 2,
    img: "0nj0",
    hp: 815,
    atk: 1139,
    cost: 447190000
  },
  {
    name: "RAGING NAVI",
    type: 3,
    img: "0f71",
    hp: 995,
    atk: 995,
    cost: 492537500
  },
  {
    name: "RAGING HARPY",
    type: 0,
    img: "086x",
    hp: 1089,
    atk: 1138,
    cost: 689803000
  },
  {
    name: "RAGING ALUX",
    type: 1,
    img: "0cur",
    hp: 1110,
    atk: 1116,
    cost: 689367500
  },
  {
    name: "RAGING FOX SPIRIT",
    type: 2,
    img: "02ys",
    hp: 1230,
    atk: 1028,
    cost: 710914500
  },
  {
    name: "RAGING DAKUWAQA",
    type: 3,
    img: "0owq",
    hp: 754,
    atk: 1512,
    cost: 608632000
  },
  {
    name: "RAGING GRIFFIN",
    type: 0,
    img: "0gpm",
    hp: 1105,
    atk: 1457,
    cost: 1021416000
  },
  {
    name: "RAGING CENTAUR",
    type: 1,
    img: "0j0o",
    hp: 1545,
    atk: 1029,
    cost: 1002272500
  },
  {
    name: "RAGING HELLHOUND",
    type: 2,
    img: "0n11",
    hp: 1257,
    atk: 1257,
    cost: 993061000
  },
  {
    name: "RAGING MERMAID",
    type: 3,
    img: "0lgi",
    hp: 1620,
    atk: 939,
    cost: 938082000
  },
  {
    name: "RAGING QUETZALCOATL",
    type: 0,
    img: "0dao",
    hp: 1715,
    atk: 1183,
    cost: 1444918500
  },
  {
    name: "RAGING ENT",
    type: 1,
    img: "098a",
    hp: 1152,
    atk: 1772,
    cost: 1458291500
  },
  {
    name: "RAGING WYVERN",
    type: 2,
    img: "0ojf",
    hp: 1224,
    atk: 1664,
    cost: 1453356500
  },
  {
    name: "RAGING YETI",
    type: 3,
    img: "05fn",
    hp: 1438,
    atk: 1434,
    cost: 1480580500
  },
  {
    name: "RAGING BAILONG",
    type: 0,
    img: "0i6u",
    hp: 1609,
    atk: 1594,
    cost: 2053698000
  },
  {
    name: "RAGING SPHINX",
    type: 1,
    img: "01z2",
    hp: 1639,
    atk: 1639,
    cost: 2201440000
  },
  {
    name: "RAGING CHERUFE",
    type: 2,
    img: "041v",
    hp: 2119,
    atk: 1121,
    cost: 1830521500
  },
  {
    name: "RAGING HIPPOCAMPUS",
    type: 3,
    img: "004t",
    hp: 1419,
    atk: 1929,
    cost: 2264341500
  },
  {
    name: "RAGING MANTICORE",
    type: 0,
    img: "03oq",
    hp: 1994,
    atk: 1709,
    cost: 6290727000
  },
  {
    name: "RAGING ALRAUNE",
    type: 1,
    img: "038l",
    hp: 1842,
    atk: 1902,
    cost: 6557680000
  },
  {
    name: "RAGING GARGOYLE",
    type: 2,
    img: "00uj",
    hp: 1634,
    atk: 2028,
    cost: 6032259000
  },
  {
    name: "RAGING HYDRA",
    type: 3,
    img: "05eo",
    hp: 2018,
    atk: 1808,
    cost: 6969143000
  },
  {
    name: "RAGING ANKA",
    type: 0,
    img: "07sp",
    hp: 2919,
    atk: 1566,
    cost: 9773245000
  },
  {
    name: "RAGING CHIMERA",
    type: 1,
    img: "0ibi",
    hp: 2012,
    atk: 2311,
    cost: 10026327000
  },
  {
    name: "RAGING IFRIT",
    type: 2,
    img: "01vq",
    hp: 1989,
    atk: 2111,
    cost: 8603685000
  },
  {
    name: "RAGING KRAKEN",
    type: 3,
    img: "03dr",
    hp: 2069,
    atk: 2529,
    cost: 11969168000
  },
  {
    name: "RAGING TYPHON",
    type: 0,
    img: "0luj",
    hp: 2082,
    atk: 3174,
    cost: 16987578000
  },
  {
    name: "RAGING AMMIT",
    type: 1,
    img: "0lf0",
    hp: 2279,
    atk: 2842,
    cost: 16483620000
  },
  {
    name: "RAGING PHOENIX",
    type: 2,
    img: "0lal",
    hp: 2578,
    atk: 2388,
    cost: 15274811000
  },
  {
    name: "RAGING LEVIATHAN",
    type: 3,
    img: "0nob",
    hp: 2525,
    atk: 2525,
    cost: 16098453000
  },
  {
    name: "RAGING HECATONCHEIRES",
    type: 0,
    img: "0md6",
    hp: 2540,
    atk: 3487,
    cost: 26358974000
  },
  {
    name: "RAGING MOAI GOLEM",
    type: 1,
    img: "072e",
    hp: 2888,
    atk: 2888,
    cost: 24087491000
  },
  {
    name: "RAGING BALROG",
    type: 2,
    img: "0cxp",
    hp: 3089,
    atk: 2657,
    cost: 23513333000
  },
  {
    name: "RAGING POSEIDON",
    type: 3,
    img: "0cf4",
    hp: 2973,
    atk: 2837,
    cost: 24495221000
  },
  {
    name: "RAGING OPHION",
    type: 0,
    img: "0865",
    hp: 3363,
    atk: 3430,
    cost: 39177027000
  },
  {
    name: "RAGING AKUPARA",
    type: 1,
    img: "0al5",
    hp: 3496,
    atk: 3038,
    cost: 34612964000
  },
  {
    name: "RAGING BEELZEBUB",
    type: 2,
    img: "06vm",
    hp: 2989,
    atk: 3621,
    cost: 35606695000
  },
  {
    name: "RAGING CTHULHU",
    type: 3,
    img: "0gjj",
    hp: 3053,
    atk: 3517,
    cost: 35184287000
  },
  {
    name: "RAGING THE NORNS",
    type: 0,
    img: "0l22",
    hp: 4484,
    atk: 3273,
    cost: 56223440000
  },
  {
    name: "RAGING FENRIR",
    type: 1,
    img: "0hly",
    hp: 3413,
    atk: 4111,
    cost: 52556405000
  },
  {
    name: "RAGING HUITZILOPOCHTLI",
    type: 2,
    img: "0gds",
    hp: 3814,
    atk: 3814,
    cost: 55480717000
  },
  {
    name: "RAGING JÖRMUNGANDR",
    type: 3,
    img: "06eh",
    hp: 3791,
    atk: 3791,
    cost: 54483043000
  },
  {
    name: "RAGING WORLD EGG",
    type: 0,
    img: "09jv",
    hp: 3797,
    atk: 4931,
    cost: 81014620000
  },
  {
    name: "RAGING LICHE",
    type: 1,
    img: "0p6g",
    hp: 4264,
    atk: 4264,
    cost: 77526752000
  },
  {
    name: "RAGING SURTUR",
    type: 2,
    img: "006w",
    hp: 4527,
    atk: 4112,
    cost: 80314766000
  },
  {
    name: "RAGING CAILLEACH",
    type: 3,
    img: "0oa6",
    hp: 4012,
    atk: 4571,
    cost: 78534090000
  },
  {
    name: "RAGING CHRONOS",
    type: 0,
    img: "089d",
    hp: 4834,
    atk: 4834,
    cost: 112958766000
  },
  {
    name: "RAGING GEA",
    type: 1,
    img: "0bc7",
    hp: 4209,
    atk: 5318,
    cost: 105898763000
  },
  {
    name: "RAGING BAHAMUT",
    type: 2,
    img: "018x",
    hp: 4831,
    atk: 4831,
    cost: 112748588000
  },
  {
    name: "RAGING ŌGENOS",
    type: 3,
    img: "0khj",
    hp: 5014,
    atk: 4574,
    cost: 109829937000
  },
  {
    name: "RAGING BRAHMA",
    type: 0,
    img: "04ot",
    hp: 5789,
    atk: 4917,
    cost: 151864280000
  },
  {
    name: "RAGING YGGDRASIL",
    type: 1,
    img: "0p8r",
    hp: 5569,
    atk: 4948,
    cost: 144647311000
  },
  {
    name: "RAGING RA",
    type: 2,
    img: "09r6",
    hp: 4559,
    atk: 6112,
    cost: 147088733000
  },
  {
    name: "RAGING NIFLHEIM",
    type: 3,
    img: "05d0",
    hp: 5299,
    atk: 5299,
    cost: 148792746000
  },
  {
    name: "RAGING GINNUN",
    type: 0,
    img: "0jaq",
    hp: 5277,
    atk: 6419,
    cost: 197143156000
  },
  {
    name: "RAGING KAILAS",
    type: 1,
    img: "03qr",
    hp: 5079,
    atk: 6421,
    cost: 186239297000
  },
  {
    name: "RAGING CHAOS",
    type: 2,
    img: "08qe",
    hp: 5871,
    atk: 5871,
    cost: 202365391000
  },
  {
    name: "RAGING NŪN",
    type: 3,
    img: "0njr",
    hp: 6357,
    atk: 5231,
    cost: 191758841000
  }
];

var HERO = [
    {
      name: "LADY OF TWILIGHT",
      type: 0,
      rarity: 0,
      img: "0fmg",
      hp: 45,
      atk: 20,
      skill: {
        type: "extra",
        target: -1,
        value: 3,
        hid: 0
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TINY",
      type: 1,
      rarity: 1,
      img: "0kbl",
      hp: 70,
      atk: 30,
      skill: {
        type: "buffahe",
        target: -1,
        value: 0.041666666666666664,
        hid: 1
      },
      passive: {
        type: 9,
        value: 0.1
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "NEBRA",
      type: 2,
      rarity: 2,
      img: "0bhl",
      hp: 110,
      atk: 40,
      skill: {
        type: "dmg",
        target: -1,
        value: 20,
        hid: 2
      },
      passive: {
        type: 3,
        value: 0.23
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "VALOR",
      type: 0,
      rarity: 0,
      img: "0ctf",
      hp: 20,
      atk: 10,
      skill: {
        type: "def",
        target: 0,
        value: 2,
        hid: 3
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ROKKA",
      type: 1,
      rarity: 0,
      img: "06ny",
      hp: 30,
      atk: 8,
      skill: {
        type: "def",
        target: 1,
        value: 2,
        hid: 4
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "PYROMANCER",
      type: 2,
      rarity: 0,
      img: "09nf",
      hp: 24,
      atk: 12,
      skill: {
        type: "def",
        target: 2,
        value: 2,
        hid: 5
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BEWAT",
      type: 3,
      rarity: 0,
      img: "02hk",
      hp: 50,
      atk: 6,
      skill: {
        type: "def",
        target: 3,
        value: 2,
        hid: 6
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HUNTER",
      type: 0,
      rarity: 0,
      img: "0ek2",
      hp: 22,
      atk: 14,
      skill: {
        type: "dmg",
        target: 0,
        value: 2,
        hid: 7
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SHAMAN",
      type: 1,
      rarity: 1,
      img: "0kid",
      hp: 40,
      atk: 20,
      skill: {
        type: "def",
        target: 1,
        value: 3,
        hid: 8
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ALPHA",
      type: 2,
      rarity: 2,
      img: "0ezu",
      hp: 82,
      atk: 22,
      skill: {
        type: "aoe",
        target: -1,
        value: 2,
        hid: 9
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 65
    },
    {
      name: "CARL",
      type: 3,
      rarity: 0,
      img: "0fy3",
      hp: 28,
      atk: 12,
      skill: {
        type: "dmg",
        target: 3,
        value: 2,
        hid: 10
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "NIMUE",
      type: 0,
      rarity: 1,
      img: "0egn",
      hp: 38,
      atk: 22,
      skill: {
        type: "def",
        target: 0,
        value: 3,
        hid: 11
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ATHOS",
      type: 1,
      rarity: 2,
      img: "03nd",
      hp: 70,
      atk: 26,
      skill: {
        type: "def",
        target: -1,
        value: 4,
        hid: 12
      },
      passive: {
        type: 2,
        value: 0.21
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 66
    },
    {
      name: "JET",
      type: 2,
      rarity: 0,
      img: "0oai",
      hp: 24,
      atk: 16,
      skill: {
        type: "dmg",
        target: 2,
        value: 2,
        hid: 13
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GERON",
      type: 3,
      rarity: 1,
      img: "0c53",
      hp: 36,
      atk: 24,
      skill: {
        type: "def",
        target: 3,
        value: 3,
        hid: 14
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "REI",
      type: 0,
      rarity: 2,
      img: "0mq1",
      hp: 46,
      atk: 40,
      skill: {
        type: "dmg",
        target: -1,
        value: 5,
        hid: 15
      },
      passive: {
        type: 3,
        value: 0.21
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 67
    },
    {
      name: "AILEN",
      type: 1,
      rarity: 0,
      img: "0cku",
      hp: 19,
      atk: 22,
      skill: {
        type: "dmg",
        target: 1,
        value: 2,
        hid: 16
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "FAEFYR",
      type: 2,
      rarity: 1,
      img: "0cav",
      hp: 50,
      atk: 18,
      skill: {
        type: "def",
        target: 2,
        value: 3,
        hid: 17
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "AURI",
      type: 3,
      rarity: 2,
      img: "0agh",
      hp: 60,
      atk: 32,
      skill: {
        type: "heal",
        target: -1,
        value: 4,
        hid: 18
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 68
    },
    {
      name: "NICTE",
      type: 0,
      rarity: 1,
      img: "0aar",
      hp: 22,
      atk: 32,
      skill: {
        type: "dmg",
        target: 0,
        value: 4,
        hid: 19
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "JAMES",
      type: 1,
      rarity: 2,
      img: "0ef9",
      hp: 50,
      atk: 12,
      skill: {
        type: "rico",
        target: 5,
        value: 0.75,
        hid: 20
      },
      passive: {
        type: 6,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "K41RY",
      type: 0,
      rarity: 0,
      img: "0m4j",
      hp: 28,
      atk: 16,
      skill: {
        type: "dmg",
        target: 0,
        value: 3,
        hid: 21
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "T4URUS",
      type: 1,
      rarity: 1,
      img: "0klv",
      hp: 46,
      atk: 20,
      skill: {
        type: "dmg",
        target: -1,
        value: 2,
        hid: 22
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TR0N1X",
      type: 2,
      rarity: 2,
      img: "0ji6",
      hp: 100,
      atk: 20,
      skill: {
        type: "aoe",
        target: -1,
        value: 3,
        hid: 23
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 69
    },
    {
      name: "AQUORTIS",
      type: 3,
      rarity: 0,
      img: "0k2w",
      hp: 58,
      atk: 8,
      skill: {
        type: "dmg",
        target: 3,
        value: 3,
        hid: 24
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "AERIS",
      type: 0,
      rarity: 1,
      img: "0lbm",
      hp: 30,
      atk: 32,
      skill: {
        type: "heal",
        target: -1,
        value: 2,
        hid: 25
      },
      passive: {
        type: 9,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GEUM",
      type: 1,
      rarity: 2,
      img: "0k28",
      hp: 75,
      atk: 2,
      skill: {
        type: "buff",
        target: 0,
        value: 2,
        hid: 26
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 70
    },
    {
      name: "FOREST DRUID",
      type: 1,
      rarity: 1,
      img: "0etn",
      hp: 46,
      atk: 16,
      skill: {
        type: "dmg",
        target: 1,
        value: 4,
        hid: 27
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "IGNITOR",
      type: 2,
      rarity: 1,
      img: "0awm",
      hp: 32,
      atk: 24,
      skill: {
        type: "dmg",
        target: 2,
        value: 4,
        hid: 28
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "UNDINE",
      type: 3,
      rarity: 1,
      img: "026t",
      hp: 58,
      atk: 14,
      skill: {
        type: "dmg",
        target: 3,
        value: 4,
        hid: 29
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "RUDEAN",
      type: 2,
      rarity: 0,
      img: "0ffu",
      hp: 38,
      atk: 12,
      skill: {
        type: "dmg",
        target: 2,
        value: 3,
        hid: 30
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "AURAL",
      type: 3,
      rarity: 1,
      img: "0lr6",
      hp: 18,
      atk: 50,
      skill: {
        type: "buff",
        target: -1,
        value: 1.2,
        hid: 31
      },
      passive: {
        type: 0,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GEROR",
      type: 0,
      rarity: 2,
      img: "0ikc",
      hp: 46,
      atk: 46,
      skill: {
        type: "mon",
        target: -1,
        value: 1.2,
        hid: 32
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 71
    },
    {
      name: "VEILDUR",
      type: 1,
      rarity: 2,
      img: "0k3v",
      hp: 66,
      atk: 44,
      skill: {
        type: "extra",
        target: -1,
        value: 3,
        hid: 33
      },
      passive: {
        type: 6,
        value: 0.17
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BRYNHILDR",
      type: 0,
      rarity: 2,
      img: "0arb",
      hp: 72,
      atk: 48,
      skill: {
        type: "extra",
        target: -1,
        value: 4,
        hid: 34
      },
      passive: {
        type: 6,
        value: 0.17
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GROTH",
      type: 2,
      rarity: 2,
      img: "06w4",
      hp: 78,
      atk: 52,
      skill: {
        type: "extra",
        target: -1,
        value: 5,
        hid: 35
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "OUREA",
      type: 1,
      rarity: 0,
      img: "075h",
      hp: 30,
      atk: 16,
      skill: {
        type: "dmg",
        target: 1,
        value: 3,
        hid: 36
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "EREBUS",
      type: 2,
      rarity: 1,
      img: "0au9",
      hp: 48,
      atk: 20,
      skill: {
        type: "extra",
        target: 2,
        value: 2,
        hid: 37
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "PONTUS",
      type: 3,
      rarity: 2,
      img: "0csq",
      hp: 62,
      atk: 36,
      skill: {
        type: "purity",
        target: 3,
        value: 2,
        hid: 38
      },
      passive: {
        type: 5,
        value: 0.14
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 81
    },
    {
      name: "CHROMA",
      type: 0,
      rarity: 1,
      img: "05vu",
      hp: 52,
      atk: 20,
      skill: {
        type: "def",
        target: 0,
        value: 4,
        hid: 39
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "PETRY",
      type: 1,
      rarity: 1,
      img: "0l6j",
      hp: 26,
      atk: 44,
      skill: {
        type: "def",
        target: 1,
        value: 4,
        hid: 40
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ZAYTUS",
      type: 2,
      rarity: 1,
      img: "0max",
      hp: 58,
      atk: 22,
      skill: {
        type: "def",
        target: 2,
        value: 4,
        hid: 41
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SPYKE",
      type: 0,
      rarity: 2,
      img: "00y9",
      hp: 75,
      atk: 45,
      skill: {
        type: "turna",
        target: -1,
        value: 10,
        hid: 42
      },
      passive: {
        type: 3,
        value: 0.23
      },
      filter: 3,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 1,
        none: 0
      }
    },
    {
      name: "AOYUKI",
      type: 3,
      rarity: 2,
      img: "03ij",
      hp: 70,
      atk: 55,
      skill: {
        type: "rainbow",
        target: -1,
        value: 100,
        hid: 43
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 3,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 1,
        none: 0
      }
    },
    {
      name: "GAIABYTE",
      type: 1,
      rarity: 2,
      img: "0ej9",
      hp: 75,
      atk: 150,
      skill: {
        type: "ban",
        target: -1,
        value: 2,
        hid: 44
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 3,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 1,
        none: 0
      }
    },
    {
      name: "OYMOS",
      type: 0,
      rarity: 0,
      img: "07ao",
      hp: 36,
      atk: 14,
      skill: {
        type: "dmg",
        target: 0,
        value: 4,
        hid: 45
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "XARTH",
      type: 1,
      rarity: 1,
      img: "08gg",
      hp: 32,
      atk: 32,
      skill: {
        type: "extra",
        target: 1,
        value: 2,
        hid: 46
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ATZAR",
      type: 2,
      rarity: 2,
      img: "0a87",
      hp: 76,
      atk: 32,
      skill: {
        type: "purity",
        target: 2,
        value: 2,
        hid: 47
      },
      passive: {
        type: 5,
        value: 0.13
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 82
    },
    {
      name: "ZETH",
      type: 3,
      rarity: 2,
      img: "073h",
      hp: 70,
      atk: 42,
      skill: {
        type: "boom",
        target: -1,
        value: 0.1,
        hid: 48
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "KOTH",
      type: 1,
      rarity: 2,
      img: "0ghe",
      hp: 76,
      atk: 46,
      skill: {
        type: "boom",
        target: -1,
        value: 0.15,
        hid: 49
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GURTH",
      type: 0,
      rarity: 2,
      img: "0d6e",
      hp: 82,
      atk: 50,
      skill: {
        type: "boom",
        target: -1,
        value: 0.2,
        hid: 50
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "WEREWOLF",
      type: 1,
      rarity: 0,
      img: "05gv",
      hp: 35,
      atk: 25,
      skill: {
        type: "buffdef",
        target: -1,
        value: 0.1112,
        hid: 51
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "JACK'O KNIGHT",
      type: 0,
      rarity: 1,
      img: "06a2",
      hp: 55,
      atk: 35,
      skill: {
        type: "buffatk",
        target: -1,
        value: 0.1112,
        hid: 52
      },
      passive: {
        type: 5,
        value: 0.08
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DULLAHAN",
      type: 2,
      rarity: 2,
      img: "061b",
      hp: 75,
      atk: 45,
      skill: {
        type: "buffboth",
        target: -1,
        value: 0.1112,
        hid: 53
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "LADY ODELITH",
      type: 3,
      rarity: 1,
      img: "0lfy",
      hp: 36,
      atk: 36,
      skill: {
        type: "def",
        target: 3,
        value: 4,
        hid: 54
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SHYGU",
      type: 0,
      rarity: 2,
      img: "023t",
      hp: 34,
      atk: 54,
      skill: {
        type: "buffdef",
        target: 0,
        value: 0.1112,
        hid: 55
      },
      passive: {
        type: 2,
        value: 0.21
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "THERT",
      type: 1,
      rarity: 2,
      img: "0hia",
      hp: 72,
      atk: 28,
      skill: {
        type: "buffdef",
        target: 1,
        value: 0.1112,
        hid: 56
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "LORD KIRK",
      type: 2,
      rarity: 2,
      img: "0686",
      hp: 32,
      atk: 64,
      skill: {
        type: "buffdef",
        target: 2,
        value: 0.1112,
        hid: 57
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "NEPTUNIUS",
      type: 3,
      rarity: 2,
      img: "0b3i",
      hp: 30,
      atk: 70,
      skill: {
        type: "buffdef",
        target: 3,
        value: 0.1112,
        hid: 58
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SIGRÚN",
      type: 2,
      rarity: 2,
      img: "06eu",
      hp: 65,
      atk: 12,
      skill: {
        type: "rico",
        target: 5,
        value: 0.5,
        hid: 59
      },
      passive: {
        type: 6,
        value: 0.17
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "KOLDÍS",
      type: 3,
      rarity: 2,
      img: "0n6v",
      hp: 70,
      atk: 14,
      skill: {
        type: "rico",
        target: 5,
        value: 0.5,
        hid: 60
      },
      passive: {
        type: 6,
        value: 0.17
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ALVITR",
      type: 1,
      rarity: 2,
      img: "0j0m",
      hp: 75,
      atk: 16,
      skill: {
        type: "rico",
        target: 5,
        value: 0.5,
        hid: 61
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HAMA",
      type: 3,
      rarity: 0,
      img: "08iu",
      hp: 30,
      atk: 18,
      skill: {
        type: "dmg",
        target: 3,
        value: 4,
        hid: 62
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HALLINSKIDI",
      type: 0,
      rarity: 1,
      img: "00m3",
      hp: 34,
      atk: 34,
      skill: {
        type: "extra",
        target: 0,
        value: 2,
        hid: 63
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "RIGR",
      type: 1,
      rarity: 2,
      img: "0dsn",
      hp: 60,
      atk: 42,
      skill: {
        type: "purity",
        target: 1,
        value: 2,
        hid: 64
      },
      passive: {
        type: 5,
        value: 0.14
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 86
    },
    {
      name: "ASCENDED ALPHA",
      type: 2,
      rarity: 3,
      img: "04ko",
      hp: 174,
      atk: 46,
      skill: {
        type: "buffaoe",
        target: -1,
        value: 0.304,
        hid: 65
      },
      passive: {
        type: 3,
        value: 0.36
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED ATHOS",
      type: 1,
      rarity: 3,
      img: "0c1j",
      hp: 162,
      atk: 60,
      skill: {
        type: "buffdef",
        target: -1,
        value: 0.304,
        hid: 66
      },
      passive: {
        type: 2,
        value: 0.37
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED REI",
      type: 0,
      rarity: 3,
      img: "0c3v",
      hp: 120,
      atk: 104,
      skill: {
        type: "buffatk",
        target: -1,
        value: 0.304,
        hid: 67
      },
      passive: {
        type: 5,
        value: 0.25
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED AURI",
      type: 3,
      rarity: 3,
      img: "08tr",
      hp: 148,
      atk: 78,
      skill: {
        type: "buffheal",
        target: -1,
        value: 0.152,
        hid: 68
      },
      passive: {
        type: 9,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED TR0N1X",
      type: 2,
      rarity: 3,
      img: "0jvc",
      hp: 190,
      atk: 38,
      skill: {
        type: "rico",
        target: 5,
        value: 0.75,
        hid: 69
      },
      passive: {
        type: 6,
        value: 0.34
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED GEUM",
      type: 1,
      rarity: 3,
      img: "075o",
      hp: 222,
      atk: 8,
      skill: {
        type: "buff",
        target: 0,
        value: 2,
        hid: 70
      },
      passive: {
        type: 1,
        value: 0.01
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED GEROR",
      type: 0,
      rarity: 3,
      img: "0lj3",
      hp: 116,
      atk: 116,
      skill: {
        type: "mon",
        target: -1,
        value: 1.3,
        hid: 71
      },
      passive: {
        type: 1,
        value: 0.1
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "LORD OF CHAOS",
      type: 2,
      rarity: 5,
      img: "0nfc",
      hp: 1e+300,
      atk: 112,
      skill: {
        type: "aoe",
        target: -1,
        value: 50,
        hid: 72
      },
      passive: {
        type: null,
        value: null
      },
      filter: 0,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CHRISTMAS ELF",
      type: 3,
      rarity: 0,
      img: "ivdn",
      hp: 38,
      atk: 24,
      skill: {
        type: "buffheal",
        target: -1,
        value: 0.1112,
        hid: 73
      },
      passive: {
        type: 9,
        value: 0.05
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "REINDEER",
      type: 0,
      rarity: 1,
      img: "e14u",
      hp: 54,
      atk: 36,
      skill: {
        type: "buffaoe",
        target: -1,
        value: 0.1112,
        hid: 74
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "SANTA CLAUS",
      type: 2,
      rarity: 2,
      img: "34ff",
      hp: 72,
      atk: 48,
      skill: {
        type: "buffahe",
        target: -1,
        value: 0.1112,
        hid: 75
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "SEXY SANTA",
      type: 1,
      rarity: 1,
      img: "ytur",
      hp: 44,
      atk: 44,
      skill: {
        type: "rico",
        target: 5,
        value: 0.66,
        hid: 76
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TOTH",
      type: 2,
      rarity: 0,
      img: "do1j",
      hp: 24,
      atk: 24,
      skill: {
        type: "dmg",
        target: 2,
        value: 4,
        hid: 77
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GANAH",
      type: 3,
      rarity: 1,
      img: "gd7s",
      hp: 40,
      atk: 30,
      skill: {
        type: "extra",
        target: 3,
        value: 2,
        hid: 78
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DAGDA",
      type: 0,
      rarity: 2,
      img: "yzpf",
      hp: 58,
      atk: 46,
      skill: {
        type: "purity",
        target: 0,
        value: 2,
        hid: 79
      },
      passive: {
        type: 5,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 92
    },
    {
      name: "BUBBLES",
      type: 3,
      rarity: 3,
      img: "6a3u",
      hp: 300,
      atk: 110,
      skill: {
        type: "debuff",
        target: -1,
        value: 0.005,
        hid: 80
      },
      passive: {
        type: 7,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED PONTUS",
      type: 3,
      rarity: 3,
      img: "sa0l",
      hp: 150,
      atk: 86,
      skill: {
        type: "purity",
        target: 3,
        value: 3,
        hid: 81
      },
      passive: {
        type: 5,
        value: 0.24
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED ATZAR",
      type: 2,
      rarity: 3,
      img: "h5ye",
      hp: 162,
      atk: 81,
      skill: {
        type: "purity",
        target: 2,
        value: 3,
        hid: 82
      },
      passive: {
        type: 5,
        value: 0.23
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ARSHEN",
      type: 0,
      rarity: 2,
      img: "3ade",
      hp: 74,
      atk: 36,
      skill: {
        type: "rico",
        target: 1,
        value: 1,
        hid: 83
      },
      passive: {
        type: 6,
        value: 0.17
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "RUA",
      type: 2,
      rarity: 2,
      img: "9sja",
      hp: 78,
      atk: 40,
      skill: {
        type: "rico",
        target: 1,
        value: 1,
        hid: 84
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DORTH",
      type: 3,
      rarity: 2,
      img: "wxkn",
      hp: 82,
      atk: 44,
      skill: {
        type: "rico",
        target: 1,
        value: 1,
        hid: 85
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED RIGR",
      type: 1,
      rarity: 3,
      img: "k4iy",
      hp: 141,
      atk: 99,
      skill: {
        type: "purity",
        target: 1,
        value: 3,
        hid: 86
      },
      passive: {
        type: 5,
        value: 0.25
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "MOTHER OF ALL KODAMAS",
      type: 1,
      rarity: 5,
      img: "uf59",
      hp: 1e+300,
      atk: 190,
      skill: {
        type: "debuff",
        target: -1,
        value: 0.5,
        hid: 87
      },
      passive: {
        type: null,
        value: null
      },
      filter: 0,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HOSOKAWA",
      type: 0,
      rarity: 2,
      img: "hu9w",
      hp: 42,
      atk: 50,
      skill: {
        type: "buffatk",
        target: 0,
        value: 0.1112,
        hid: 88
      },
      passive: {
        type: 5,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TAKEDA",
      type: 1,
      rarity: 2,
      img: "qkx4",
      hp: 32,
      atk: 66,
      skill: {
        type: "buffatk",
        target: 1,
        value: 0.1112,
        hid: 89
      },
      passive: {
        type: 5,
        value: 0.17
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HIRATE",
      type: 2,
      rarity: 2,
      img: "29l6",
      hp: 38,
      atk: 56,
      skill: {
        type: "buffatk",
        target: 2,
        value: 0.1112,
        hid: 90
      },
      passive: {
        type: 5,
        value: 0.16
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HATTORI",
      type: 3,
      rarity: 2,
      img: "ikae",
      hp: 44,
      atk: 48,
      skill: {
        type: "buffatk",
        target: 3,
        value: 0.1112,
        hid: 91
      },
      passive: {
        type: 5,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED DAGDA",
      type: 0,
      rarity: 3,
      img: "bdoh",
      hp: 135,
      atk: 107,
      skill: {
        type: "purity",
        target: 0,
        value: 3,
        hid: 92
      },
      passive: {
        type: 5,
        value: 0.26
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "BYLAR",
      type: 1,
      rarity: 0,
      img: "tgzk",
      hp: 30,
      atk: 20,
      skill: {
        type: "dmg",
        target: 1,
        value: 4,
        hid: 93
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BOÖR",
      type: 2,
      rarity: 1,
      img: "a1gu",
      hp: 36,
      atk: 36,
      skill: {
        type: "turna",
        target: -1,
        value: 3,
        hid: 94
      },
      passive: {
        type: 3,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BAVAH",
      type: 3,
      rarity: 2,
      img: "3lza",
      hp: 52,
      atk: 52,
      skill: {
        type: "extra",
        target: -1,
        value: 4,
        hid: 95
      },
      passive: {
        type: 6,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 100
    },
    {
      name: "LEPRECHAUN",
      type: 1,
      rarity: 2,
      img: "tvhw",
      hp: 75,
      atk: 25,
      skill: {
        type: "ratio",
        target: -1,
        value: 0,
        hid: 96
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SPARKS",
      type: 2,
      rarity: 0,
      img: "hwe9",
      hp: 30,
      atk: 30,
      skill: {
        type: "evo",
        target: -1,
        value: 2,
        hid: 97
      },
      passive: {
        type: 0,
        value: 0.05
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "LEAF",
      type: 1,
      rarity: 1,
      img: "f0pg",
      hp: 48,
      atk: 42,
      skill: {
        type: "evo",
        target: -1,
        value: 2,
        hid: 98
      },
      passive: {
        type: 0,
        value: 0.1
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "FLYNN",
      type: 0,
      rarity: 2,
      img: "msba",
      hp: 70,
      atk: 48,
      skill: {
        type: "evo",
        target: -1,
        value: 2,
        hid: 99
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "ASCENDED BAVAH",
      type: 3,
      rarity: 3,
      img: "w1qv",
      hp: 122,
      atk: 122,
      skill: {
        type: "buffboth",
        target: -1,
        value: 0.152,
        hid: 100
      },
      passive: {
        type: 0,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "DR.HAWKING",
      type: 0,
      rarity: 2,
      img: "pasc",
      hp: 66,
      atk: 60,
      skill: {
        type: "paoe",
        target: -1,
        value: 1,
        hid: 101
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MASTER LEE",
      type: 0,
      rarity: 3,
      img: "h7sj",
      hp: 150,
      atk: 90,
      skill: {
        type: "counter",
        target: -1,
        value: 0.5,
        hid: 102
      },
      passive: {
        type: 1,
        value: 0.1
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "KUMU-SAN",
      type: 2,
      rarity: 2,
      img: "xplz",
      hp: 70,
      atk: 38,
      skill: {
        type: "counter",
        target: -1,
        value: 0.2,
        hid: 103
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "LIU CHENG",
      type: 3,
      rarity: 2,
      img: "1wm3",
      hp: 78,
      atk: 42,
      skill: {
        type: "counter",
        target: -1,
        value: 0.25,
        hid: 104
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HIDOKA",
      type: 1,
      rarity: 2,
      img: "a10r",
      hp: 86,
      atk: 44,
      skill: {
        type: "counter",
        target: -1,
        value: 0.3,
        hid: 105
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "KRYTON",
      type: 0,
      rarity: 5,
      img: "wdwa",
      hp: 1e+300,
      atk: 10,
      skill: {
        type: "turna",
        target: -1,
        value: 10,
        hid: 106
      },
      passive: {
        type: null,
        value: null
      },
      filter: 0,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DICEMASTER",
      type: 3,
      rarity: 0,
      img: "8127",
      hp: 25,
      atk: 26,
      skill: {
        type: "ratk",
        target: -1,
        value: 20,
        hid: 107
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "LUXURIUS MAXIMUS",
      type: 2,
      rarity: 1,
      img: "u67e",
      hp: 28,
      atk: 60,
      skill: {
        type: "rtrg",
        target: -1,
        value: 0,
        hid: 108
      },
      passive: {
        type: 5,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "POKERFACE",
      type: 1,
      rarity: 2,
      img: "balp",
      hp: 70,
      atk: 70,
      skill: {
        type: "rcrit",
        target: 2,
        value: 3,
        hid: 109
      },
      passive: {
        type: 3,
        value: 0.24
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TAINT",
      type: 0,
      rarity: 0,
      img: "769k",
      hp: 25,
      atk: 25,
      skill: {
        type: "rico",
        target: 5,
        value: 0.5,
        hid: 110
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "PUTRID",
      type: 1,
      rarity: 1,
      img: "9gst",
      hp: 48,
      atk: 50,
      skill: {
        type: "turna",
        target: -1,
        value: -3,
        hid: 111
      },
      passive: {
        type: 3,
        value: 0.12
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DEFILE",
      type: 2,
      rarity: 2,
      img: "g5um",
      hp: 52,
      atk: 48,
      skill: {
        type: "moob",
        target: -1,
        value: 50,
        hid: 112
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 131
    },
    {
      name: "NEIL",
      type: 3,
      rarity: 2,
      img: "3j8x",
      hp: 150,
      atk: 15,
      skill: {
        type: "tank",
        target: -1,
        value: 0.3,
        hid: 113
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MAHATMA",
      type: 0,
      rarity: 2,
      img: "wpph",
      hp: 78,
      atk: 26,
      skill: {
        type: "elem",
        target: 3,
        value: 0.75,
        hid: 114
      },
      passive: {
        type: 5,
        value: 0.13
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "JADE",
      type: 1,
      rarity: 2,
      img: "jc5b",
      hp: 76,
      atk: 30,
      skill: {
        type: "elem",
        target: 0,
        value: 0.75,
        hid: 115
      },
      passive: {
        type: 5,
        value: 0.13
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "EDANA",
      type: 2,
      rarity: 2,
      img: "gids",
      hp: 72,
      atk: 36,
      skill: {
        type: "elem",
        target: 1,
        value: 0.75,
        hid: 116
      },
      passive: {
        type: 5,
        value: 0.14
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DYBBUK",
      type: 3,
      rarity: 2,
      img: "98p6",
      hp: 80,
      atk: 30,
      skill: {
        type: "elem",
        target: 2,
        value: 0.75,
        hid: 117
      },
      passive: {
        type: 5,
        value: 0.13
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED SHYGU",
      type: 0,
      rarity: 3,
      img: "023t",
      hp: 85,
      atk: 135,
      skill: {
        type: "buffdef",
        target: 0,
        value: 0.1819,
        hid: 118
      },
      passive: {
        type: 2,
        value: 0.39
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED THERT",
      type: 1,
      rarity: 3,
      img: "0hia",
      hp: 180,
      atk: 70,
      skill: {
        type: "buffdef",
        target: 1,
        value: 0.1819,
        hid: 119
      },
      passive: {
        type: 2,
        value: 0.39
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED LORD KIRK",
      type: 2,
      rarity: 3,
      img: "0686",
      hp: 80,
      atk: 160,
      skill: {
        type: "buffdef",
        target: 2,
        value: 0.1819,
        hid: 120
      },
      passive: {
        type: 2,
        value: 0.4
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED NEPTUNIUS",
      type: 3,
      rarity: 3,
      img: "0b3i",
      hp: 75,
      atk: 175,
      skill: {
        type: "buffdef",
        target: 3,
        value: 0.1819,
        hid: 121
      },
      passive: {
        type: 2,
        value: 0.4
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED HOSOKAWA",
      type: 0,
      rarity: 3,
      img: "hu9w",
      hp: 106,
      atk: 124,
      skill: {
        type: "buffatk",
        target: 0,
        value: 0.1819,
        hid: 122
      },
      passive: {
        type: 5,
        value: 0.27
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED TAKEDA",
      type: 1,
      rarity: 3,
      img: "qkx4",
      hp: 82,
      atk: 164,
      skill: {
        type: "buffatk",
        target: 1,
        value: 0.1819,
        hid: 123
      },
      passive: {
        type: 5,
        value: 0.31
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED HIRATE",
      type: 2,
      rarity: 3,
      img: "29l6",
      hp: 96,
      atk: 144,
      skill: {
        type: "buffatk",
        target: 2,
        value: 0.1819,
        hid: 124
      },
      passive: {
        type: 5,
        value: 0.29
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED HATTORI",
      type: 3,
      rarity: 3,
      img: "ikae",
      hp: 114,
      atk: 126,
      skill: {
        type: "buffatk",
        target: 3,
        value: 0.1819,
        hid: 125
      },
      passive: {
        type: 5,
        value: 0.28
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "DOYENNE",
      type: 3,
      rarity: 5,
      img: "pm0s",
      hp: 1e+300,
      atk: 174,
      skill: {
        type: "dampen",
        target: -1,
        value: 15000,
        hid: 126
      },
      passive: {
        type: null,
        value: null
      },
      filter: 0,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BILLY",
      type: 1,
      rarity: 0,
      img: "sm4l",
      hp: 30,
      atk: 40,
      skill: {
        type: "explosion",
        target: 1,
        value: 100,
        hid: 127
      },
      passive: {
        type: 5,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SANQUEEN",
      type: 3,
      rarity: 1,
      img: "ite9",
      hp: 88,
      atk: 22,
      skill: {
        type: "leech",
        target: -1,
        value: 0.8,
        hid: 128
      },
      passive: {
        type: 9,
        value: 0.1
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CLIODHNA",
      type: 0,
      rarity: 2,
      img: "649s",
      hp: 150,
      atk: 60,
      skill: {
        type: "evolve",
        target: -1,
        value: 1,
        hid: 129
      },
      passive: {
        type: 6,
        value: 0.25
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GUY",
      type: 2,
      rarity: 3,
      img: "2wiw",
      hp: 340,
      atk: 64,
      skill: {
        type: "anarchy",
        target: -1,
        value: 1,
        hid: 130
      },
      passive: {
        type: 3,
        value: 0.46
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED DEFILE",
      type: 2,
      rarity: 3,
      img: "g5um",
      hp: 126,
      atk: 114,
      skill: {
        type: "amoob",
        target: -1,
        value: 7,
        hid: 131
      },
      passive: {
        type: 3,
        value: 0.41
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "RAIDER ROSE",
      type: 1,
      rarity: 3,
      img: "n7hx",
      hp: 186,
      atk: 62,
      skill: {
        type: "otk",
        target: -1,
        value: 0.6,
        hid: 132
      },
      passive: {
        type: 2,
        value: 0.39
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "BUCCANEER BEATRICE",
      type: 3,
      rarity: 2,
      img: "o6ks",
      hp: 96,
      atk: 30,
      skill: {
        type: "otk",
        target: -1,
        value: 0.3,
        hid: 133
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CORSAIR CHARLES",
      type: 0,
      rarity: 2,
      img: "w2v1",
      hp: 100,
      atk: 32,
      skill: {
        type: "otk",
        target: -1,
        value: 0.35,
        hid: 134
      },
      passive: {
        type: 2,
        value: 0.22
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MARAUDER MAGNUS",
      type: 2,
      rarity: 2,
      img: "kyps",
      hp: 105,
      atk: 34,
      skill: {
        type: "otk",
        target: -1,
        value: 0.4,
        hid: 135
      },
      passive: {
        type: 2,
        value: 0.23
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "FROSTY",
      type: 3,
      rarity: 1,
      img: "5ivj",
      hp: 46,
      atk: 52,
      skill: {
        type: "armor",
        target: 9,
        value: 0.03,
        hid: 136
      },
      passive: {
        type: 2,
        value: 0.12
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "FIR",
      type: 1,
      rarity: 0,
      img: "rj98",
      hp: 50,
      atk: 18,
      skill: {
        type: "reflect",
        target: 3,
        value: 0.004,
        hid: 137
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "5-12-6",
      type: 0,
      rarity: 1,
      img: "6lcu",
      hp: 78,
      atk: 34,
      skill: {
        type: "amplify",
        target: 9,
        value: 0.03,
        hid: 138
      },
      passive: {
        type: 7,
        value: 0.1
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "KEDARI",
      type: 2,
      rarity: 2,
      img: "3ljh",
      hp: 170,
      atk: 18,
      skill: {
        type: "guardian",
        target: 9,
        value: 2,
        hid: 139
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "RAZE",
      type: 3,
      rarity: 0,
      img: "kdvz",
      hp: 18,
      atk: 26,
      skill: {
        type: "rico",
        target: 1,
        value: 0.7,
        hid: 140
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "RUIN",
      type: 0,
      rarity: 1,
      img: "i9tb",
      hp: 44,
      atk: 48,
      skill: {
        type: "boom",
        target: -1,
        value: 0.1,
        hid: 141
      },
      passive: {
        type: 0,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SEETHE",
      type: 1,
      rarity: 2,
      img: "d3c6",
      hp: 48,
      atk: 54,
      skill: {
        type: "posbonus",
        target: -1,
        value: 15,
        hid: 142
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 143
    },
    {
      name: "ASCENDED SEETHE",
      type: 1,
      rarity: 3,
      img: "d3c6",
      hp: 117,
      atk: 131,
      skill: {
        type: "aposbonus",
        target: -1,
        value: 0.45,
        hid: 143
      },
      passive: {
        type: 0,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "BLOSSOM",
      type: 1,
      rarity: 2,
      img: "tc3q",
      hp: 54,
      atk: 54,
      skill: {
        type: "friend",
        target: -1,
        value: 0.1,
        hid: 144
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "FLINT",
      type: 2,
      rarity: 2,
      img: "6bid",
      hp: 56,
      atk: 56,
      skill: {
        type: "friend",
        target: -1,
        value: 0.11,
        hid: 145
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ORIN",
      type: 0,
      rarity: 2,
      img: "iu25",
      hp: 58,
      atk: 58,
      skill: {
        type: "friend",
        target: -1,
        value: 0.12,
        hid: 146
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "AURORA",
      type: 3,
      rarity: 3,
      img: "122p",
      hp: 130,
      atk: 130,
      skill: {
        type: "friend",
        target: -1,
        value: 0.15,
        hid: 147
      },
      passive: {
        type: 1,
        value: 0.1
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "CUPID",
      type: 0,
      rarity: 2,
      img: "siua",
      hp: 220,
      atk: 20,
      skill: {
        type: "rico",
        target: 1,
        value: 3,
        hid: 148
      },
      passive: {
        type: 6,
        value: 0.32
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "TRANSIENT",
      type: 4,
      rarity: 0,
      img: "2aoh",
      hp: 22,
      atk: 22,
      skill: {
        type: "void",
        target: -1,
        value: 0.5,
        hid: 149
      },
      passive: {
        type: 1,
        value: 0.4
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MAUNDER",
      type: 4,
      rarity: 1,
      img: "91jo",
      hp: 34,
      atk: 34,
      skill: {
        type: "void",
        target: -1,
        value: 0.5,
        hid: 150
      },
      passive: {
        type: 1,
        value: 0.3
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "THE WANDERER",
      type: 4,
      rarity: 2,
      img: "wy4e",
      hp: 50,
      atk: 50,
      skill: {
        type: "void",
        target: -1,
        value: 0.5,
        hid: 151
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 174
    },
    {
      name: "B-DAY",
      type: 0,
      rarity: 2,
      img: "jz8c",
      hp: 100,
      atk: 40,
      skill: {
        type: "bday",
        target: -1,
        value: 0.1,
        hid: 152
      },
      passive: {
        type: 6,
        value: 0.2
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CLOUD",
      type: 0,
      rarity: 0,
      img: "62s2",
      hp: 44,
      atk: 22,
      skill: {
        type: "infiltred",
        target: -1,
        value: 0.95,
        hid: 153
      },
      passive: {
        type: 7,
        value: 0.05
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "EMBER",
      type: 2,
      rarity: 1,
      img: "v82q",
      hp: 64,
      atk: 32,
      skill: {
        type: "infiltred",
        target: -1,
        value: 0.95,
        hid: 154
      },
      passive: {
        type: 7,
        value: 0.1
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "RIPTIDE",
      type: 3,
      rarity: 2,
      img: "n9na",
      hp: 84,
      atk: 42,
      skill: {
        type: "infiltred",
        target: -1,
        value: 0.95,
        hid: 155
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "SPIKE",
      type: 1,
      rarity: 3,
      img: "adkj",
      hp: 180,
      atk: 90,
      skill: {
        type: "infiltred",
        target: -1,
        value: 0.95,
        hid: 156
      },
      passive: {
        type: 7,
        value: 0.2
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "ASCENDED MAHATMA",
      type: 0,
      rarity: 3,
      img: "wpph",
      hp: 180,
      atk: 60,
      skill: {
        type: "elem",
        target: 3,
        value: 1.7,
        hid: 157
      },
      passive: {
        type: 5,
        value: 0.21
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED JADE",
      type: 1,
      rarity: 3,
      img: "jc5b",
      hp: 172,
      atk: 68,
      skill: {
        type: "elem",
        target: 0,
        value: 1.7,
        hid: 158
      },
      passive: {
        type: 5,
        value: 0.22
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED EDANA",
      type: 2,
      rarity: 3,
      img: "gids",
      hp: 160,
      atk: 80,
      skill: {
        type: "elem",
        target: 1,
        value: 1.7,
        hid: 159
      },
      passive: {
        type: 5,
        value: 0.23
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "ASCENDED DYBBUK",
      type: 3,
      rarity: 3,
      img: "98p6",
      hp: 176,
      atk: 66,
      skill: {
        type: "elem",
        target: 2,
        value: 1.7,
        hid: 160
      },
      passive: {
        type: 5,
        value: 0.22
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "WILLOW",
      type: 0,
      rarity: 0,
      img: "jqr2",
      hp: 30,
      atk: 38,
      skill: {
        type: "backlash",
        target: -1,
        value: 0.2,
        hid: 161
      },
      passive: {
        type: 2,
        value: 0.05
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GIZMO",
      type: 2,
      rarity: 1,
      img: "6oe8",
      hp: 70,
      atk: 40,
      skill: {
        type: "mbonus",
        target: -1,
        value: 3,
        hid: 162
      },
      passive: {
        type: 5,
        value: 0.09
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "DAISY",
      type: 3,
      rarity: 2,
      img: "7itt",
      hp: 84,
      atk: 50,
      skill: {
        type: "easter",
        target: -1,
        value: 2.5,
        hid: 163
      },
      passive: {
        type: 3,
        value: 0.23
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "THUMPER",
      type: 1,
      rarity: 3,
      img: "2fyz",
      hp: 120,
      atk: 200,
      skill: {
        type: "mshield",
        target: -1,
        value: 0.6,
        hid: 164
      },
      passive: {
        type: 0,
        value: 0.2
      },
      filter: 1,
      upgrade: {
        pg: 0,
        cc: 1,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "BORTLES",
      type: 0,
      rarity: 0,
      img: "tx6e",
      hp: 40,
      atk: 24,
      skill: {
        type: "mon2",
        target: -1,
        value: 3,
        hid: 165
      },
      passive: {
        type: 9,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MURPHY",
      type: 1,
      rarity: 1,
      img: "i8gx",
      hp: 40,
      atk: 28,
      skill: {
        type: "fixreflect",
        target: -1,
        value: 60,
        hid: 166
      },
      passive: {
        type: 6,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "NERISSA",
      type: 3,
      rarity: 2,
      img: "ckwv",
      hp: 24,
      atk: 82,
      skill: {
        type: "fixarmor",
        target: -1,
        value: 0.45,
        hid: 167
      },
      passive: {
        type: 2,
        value: 0.21
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 169
    },
    {
      name: "MOTHER",
      type: 3,
      rarity: 2,
      img: "defy",
      hp: 112,
      atk: 55,
      skill: {
        type: "healfirst",
        target: -1,
        value: 25,
        hid: 168
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED NERISSA",
      type: 3,
      rarity: 3,
      img: "ckwv",
      hp: 48,
      atk: 164,
      skill: {
        type: "armor",
        target: 9,
        value: 0.06,
        hid: 169
      },
      passive: {
        type: 2,
        value: 0.36
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "AGATHA",
      type: 0,
      rarity: 2,
      img: "b97v",
      hp: 51,
      atk: 59,
      skill: {
        type: "buffpatk",
        target: -1,
        value: 0.1,
        hid: 170
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "OPHELIA",
      type: 1,
      rarity: 2,
      img: "jvfc",
      hp: 52,
      atk: 60,
      skill: {
        type: "buffpatk",
        target: -1,
        value: 0.15,
        hid: 171
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HELGA",
      type: 3,
      rarity: 2,
      img: "wt8s",
      hp: 53,
      atk: 61,
      skill: {
        type: "buffpatk",
        target: -1,
        value: 0.2,
        hid: 172
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MINERVA",
      type: 2,
      rarity: 3,
      img: "ghf1",
      hp: 108,
      atk: 124,
      skill: {
        type: "buffpatk",
        target: -1,
        value: 0.25,
        hid: 173
      },
      passive: {
        type: 0,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "ASCENDED WANDERER",
      type: 4,
      rarity: 3,
      img: "wy4e",
      hp: 126,
      atk: 126,
      skill: {
        type: "void",
        target: -1,
        value: 0.75,
        hid: 174
      },
      passive: {
        type: 1,
        value: 0.1
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "TETRA",
      type: 2,
      rarity: 2,
      img: "30d8",
      hp: 76,
      atk: 50,
      skill: {
        type: "tetris",
        target: -1,
        value: 1,
        hid: 175
      },
      passive: {
        type: 1,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "4TH05",
      type: 1,
      rarity: 0,
      img: "8mhw",
      hp: 16,
      atk: 28,
      skill: {
        type: "cubearmor",
        target: -1,
        value: 2,
        hid: 176
      },
      passive: {
        type: 7,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "4TZ4R",
      type: 2,
      rarity: 1,
      img: "avhs",
      hp: 42,
      atk: 28,
      skill: {
        type: "cubeexecutor",
        target: -1,
        value: 4,
        hid: 177
      },
      passive: {
        type: 1,
        value: 0.3
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "R31",
      type: 0,
      rarity: 2,
      img: "acv8",
      hp: 80,
      atk: 8,
      skill: {
        type: "cubetarget",
        target: -1,
        value: 4,
        hid: 178
      },
      passive: {
        type: 5,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 179
    },
    {
      name: "45C3ND3D R31",
      type: 0,
      rarity: 3,
      img: "acv8",
      hp: 210,
      atk: 21,
      skill: {
        type: "cubetarget",
        target: -1,
        value: 5,
        hid: 179
      },
      passive: {
        type: 5,
        value: 0.17
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "SMITH",
      type: 1,
      rarity: 2,
      img: "8e1b",
      hp: 75,
      atk: 45,
      skill: {
        type: "rico",
        target: 3,
        value: 0.9,
        hid: 180
      },
      passive: {
        type: 6,
        value: 0.18
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MR. COTTON",
      type: 2,
      rarity: 0,
      img: "nmwo",
      hp: 32,
      atk: 14,
      skill: {
        type: "freflect",
        target: -1,
        value: 10,
        hid: 181
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SHARKJELLYN",
      type: 3,
      rarity: 1,
      img: "87d4",
      hp: 54,
      atk: 20,
      skill: {
        type: "fleech",
        target: -1,
        value: 30,
        hid: 182
      },
      passive: {
        type: 2,
        value: 0.11
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CHOCO KNIGHT",
      type: 1,
      rarity: 2,
      img: "iodx",
      hp: 50,
      atk: 50,
      skill: {
        type: "hpdeal",
        target: -1,
        value: 0.4,
        hid: 183
      },
      passive: {
        type: 6,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 184
    },
    {
      name: "DARK CHOCO KNIGHT",
      type: 1,
      rarity: 3,
      img: "qqzl",
      hp: 124,
      atk: 124,
      skill: {
        type: "hpdeal",
        target: -1,
        value: 0.55,
        hid: 184
      },
      passive: {
        type: 6,
        value: 0.27
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "LILI",
      type: 2,
      rarity: 3,
      img: "e3gv",
      hp: 92,
      atk: 211,
      skill: {
        type: "custom",
        target: 0.1,
        value: 0.1,
        hid: 185
      },
      passive: {
        type: 7,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "BORNAG",
      type: 4,
      rarity: 5,
      img: "n2bu",
      hp: 1e+300,
      atk: 150,
      skill: {
        type: "fixarmor",
        target: -1,
        value: 1,
        hid: 186
      },
      passive: {
        type: null,
        value: null
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "THRACE",
      type: 2,
      rarity: 2,
      img: "q9wl",
      hp: 53,
      atk: 61,
      skill: {
        type: "absorb",
        target: -1,
        value: 125,
        hid: 187
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SCINDA",
      type: 0,
      rarity: 2,
      img: "3z5s",
      hp: 55,
      atk: 63,
      skill: {
        type: "absorb",
        target: -1,
        value: 150,
        hid: 188
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MYRMILLO",
      type: 1,
      rarity: 2,
      img: "gqge",
      hp: 57,
      atk: 65,
      skill: {
        type: "absorb",
        target: -1,
        value: 175,
        hid: 189
      },
      passive: {
        type: 9,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "RETIA",
      type: 3,
      rarity: 3,
      img: "0sp9",
      hp: 144,
      atk: 126,
      skill: {
        type: "absorb",
        target: -1,
        value: 350,
        hid: 190
      },
      passive: {
        type: 9,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      },
      pve: true
    },
    {
      name: "NEWT",
      type: 3,
      rarity: 0,
      img: "5ntr",
      hp: 48,
      atk: 4,
      skill: {
        type: "fury",
        target: 5,
        value: 2,
        hid: 191
      },
      passive: {
        type: 3,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ELECTRA",
      type: 0,
      rarity: 1,
      img: "pz4j",
      hp: 58,
      atk: 6,
      skill: {
        type: "fury",
        target: 6,
        value: 3,
        hid: 192
      },
      passive: {
        type: 3,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "BOSON",
      type: 2,
      rarity: 2,
      img: "i3h3",
      hp: 66,
      atk: 6,
      skill: {
        type: "fury",
        target: 7,
        value: 3,
        hid: 193
      },
      passive: {
        type: 3,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      },
      super: 194
    },
    {
      name: "HIGGS",
      type: 2,
      rarity: 3,
      img: "mfpq",
      hp: 210,
      atk: 10,
      skill: {
        type: "fury",
        target: 8,
        value: 4,
        hid: 194
      },
      passive: {
        type: 3,
        value: 0.3
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "CASPER",
      type: 0,
      rarity: 0,
      img: "82hn",
      hp: 30,
      atk: 28,
      skill: {
        type: "autobuff",
        target: 2,
        value: 2,
        hid: 195
      },
      passive: {
        type: 7,
        value: 0.05
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ADRIAN",
      type: 2,
      rarity: 1,
      img: "5ppu",
      hp: 64,
      atk: 20,
      skill: {
        type: "autobuff",
        target: 2,
        value: 5,
        hid: 196
      },
      passive: {
        type: 7,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "EMILY",
      type: 3,
      rarity: 2,
      img: "4yxm",
      hp: 66,
      atk: 66,
      skill: {
        type: "buffall",
        target: -1,
        value: 0.1112,
        hid: 197
      },
      passive: {
        type: 0,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "ADAM",
      type: 1,
      rarity: 3,
      img: "13kr",
      hp: 200,
      atk: 100,
      skill: {
        type: "combo",
        target: -1,
        value: 0.04,
        hid: 198
      },
      passive: {
        type: 2,
        value: 0.45
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "YISUS",
      type: 1,
      rarity: 1,
      img: "833a",
      hp: 32,
      atk: 48,
      skill: {
        type: "flatlepre",
        target: 9,
        value: 3,
        hid: 199
      },
      passive: {
        type: 5,
        value: 0.1
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "GÁLLÁ",
      type: 2,
      rarity: 0,
      img: "1300",
      hp: 32,
      atk: 40,
      skill: {
        type: "bhit",
        target: -1,
        value: 1,
        hid: 200
      },
      passive: {
        type: 0,
        value: 0.05
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "YETI THE POSTMAN",
      type: 3,
      rarity: 1,
      img: "emmc",
      hp: 58,
      atk: 58,
      skill: {
        type: "acum",
        target: 9,
        value: 4,
        hid: 201
      },
      passive: {
        type: 9,
        value: 0.1
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "HANS",
      type: 1,
      rarity: 2,
      img: "5aiy",
      hp: 74,
      atk: 74,
      skill: {
        type: "empow",
        target: 9,
        value: 3,
        hid: 202
      },
      passive: {
        type: 3,
        value: 0.24
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "MECHA MARY",
      type: 0,
      rarity: 3,
      img: "2mn9",
      hp: 5,
      atk: 250,
      skill: {
        type: "supershield",
        target: 9,
        value: 0.08,
        hid: 203
      },
      passive: {
        type: 2,
        value: 0.3
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "ANNIE",
      type: 3,
      rarity: 2,
      img: "hcxe",
      hp: 58,
      atk: 58,
      skill: {
        type: "supershield",
        target: 9,
        value: 0.04,
        hid: 204
      },
      passive: {
        type: 2,
        value: 0.2
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "KILKENNY THE FAIRY",
      type: 2,
      rarity: 2,
      img: "scpa",
      hp: 25,
      atk: 75,
      skill: {
        type: "ratio",
        target: -1,
        value: 0,
        hid: 205
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 1,
      upgrade: {
        pg: 1,
        cc: 1,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "MYSTERIOUS EGG",
      type: 2,
      rarity: 0,
      img: "84la",
      hp: 60,
      atk: 12,
      skill: {
        type: "payback",
        target: -1,
        value: 0.5,
        hid: 206
      },
      passive: {
        type: 6,
        value: 0.25
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "BABY PYROS",
      type: 3,
      rarity: 1,
      img: "nmn3",
      hp: 80,
      atk: 14,
      skill: {
        type: "payback",
        target: -1,
        value: 0.75,
        hid: 207
      },
      passive: {
        type: 6,
        value: 0.22
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "YOUNG PYROS",
      type: 1,
      rarity: 2,
      img: "740f",
      hp: 110,
      atk: 16,
      skill: {
        type: "payback",
        target: -1,
        value: 1,
        hid: 208
      },
      passive: {
        type: 6,
        value: 0.2
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "KING PYROS",
      type: 0,
      rarity: 3,
      img: "o6i1",
      hp: 180,
      atk: 20,
      skill: {
        type: "payback",
        target: -1,
        value: 1.5,
        hid: 209
      },
      passive: {
        type: 6,
        value: 0.25
      },
      filter: 3,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 0,
        um: 0,
        none: 1
      }
    },
    {
      name: "ROB",
      type: 1,
      rarity: 2,
      img: "lkv7",
      hp: 56,
      atk: 56,
      skill: {
        type: "lullaby",
        target: 3,
        value: 0.35,
        hid: 210
      },
      passive: {
        type: 2,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "KIRK LEE",
      type: 3,
      rarity: 2,
      img: "4q8w",
      hp: 60,
      atk: 60,
      skill: {
        type: "lullaby",
        target: 3,
        value: 0.35,
        hid: 211
      },
      passive: {
        type: 2,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "LARS",
      type: 2,
      rarity: 2,
      img: "y3my",
      hp: 64,
      atk: 64,
      skill: {
        type: "lullaby",
        target: 3,
        value: 0.35,
        hid: 212
      },
      passive: {
        type: 2,
        value: 0.2
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "HETFIELD",
      type: 0,
      rarity: 3,
      img: "mrk1",
      hp: 134,
      atk: 134,
      skill: {
        type: "lullaby",
        target: 3,
        value: 0.5,
        hid: 213
      },
      passive: {
        type: 2,
        value: 0.3
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    },
    {
      name: "PLUVIA",
      type: 3,
      rarity: 0,
      img: "2iqo",
      hp: 28,
      atk: 40,
      skill: {
        type: "backrico",
        target: 2,
        value: 0.9,
        hid: 214
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "SILEX",
      type: 1,
      rarity: 1,
      img: "5ab3",
      hp: 34,
      atk: 56,
      skill: {
        type: "backrico",
        target: 2,
        value: 0.9,
        hid: 215
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "CAELI",
      type: 0,
      rarity: 2,
      img: "r2ly",
      hp: 60,
      atk: 140,
      skill: {
        type: "backrico",
        target: 1,
        value: 0.9,
        hid: 216
      },
      passive: {
        type: 7,
        value: 0.15
      },
      filter: 0,
      upgrade: {
        pg: 1,
        cc: 0,
        as: 0,
        um: 0,
        none: 0
      }
    },
    {
      name: "IGNIS",
      type: 2,
      rarity: 3,
      img: "6yro",
      hp: 100,
      atk: 200,
      skill: {
        type: "backrico",
        target: 2,
        value: 0.9,
        hid: 217
      },
      passive: {
        type: 7,
        value: 0.2
      },
      filter: 2,
      upgrade: {
        pg: 0,
        cc: 0,
        as: 1,
        um: 0,
        none: 0
      }
    }
  ];

  var promoData = [
    {
      name: "LADY OF TWILIGHT",
      atk: 25,
      hp: 28,
      both: 15,
      skill: 3,
      quest: 17
    },
    {
      name: "TINY",
      atk: 28,
      hp: 40,
      both: 17,
      skill: 0.0404,
      quest: 52
    },
    {
      name: "NEBRA",
      atk: 100,
      hp: 140,
      both: 83,
      skill: 20,
      quest: 81
    },
    {
      name: "VALOR",
      atk: 7,
      hp: 12,
      both: 19,
      skill: 2,
      quest: 3
    },
    {
      name: "ROKKA",
      atk: 12,
      hp: 40,
      both: 5,
      skill: 2,
      quest: 2
    },
    {
      name: "PYROMANCER",
      atk: 8,
      hp: 16,
      both: 8,
      skill: 2,
      quest: 5
    },
    {
      name: "BEWAT",
      atk: 10,
      hp: 31,
      both: 16,
      skill: 2,
      quest: 0
    },
    {
      name: "HUNTER",
      atk: 12,
      hp: 14,
      both: 11,
      skill: 2,
      quest: 6
    },
    {
      name: "SHAMAN",
      atk: 16,
      hp: 36,
      both: 25,
      skill: 3,
      quest: 39
    },
    {
      name: "ALPHA",
      atk: 37,
      hp: 115,
      both: 75,
      skill: 5,
      quest: 73
    },
    {
      name: "CARL",
      atk: 5,
      hp: 18,
      both: 12,
      skill: 2,
      quest: 4
    },
    {
      name: "NIMUE",
      atk: 19,
      hp: 49,
      both: 12,
      skill: 3,
      quest: 38
    },
    {
      name: "ATHOS",
      atk: 32,
      hp: 70,
      both: 96,
      skill: 6,
      quest: 76
    },
    {
      name: "JET",
      atk: 9,
      hp: 11,
      both: 12,
      skill: 2,
      quest: 11
    },
    {
      name: "GERON",
      atk: 11,
      hp: 27,
      both: 28,
      skill: 3,
      quest: 37
    },
    {
      name: "REI",
      atk: 67,
      hp: 79,
      both: 89,
      skill: 10,
      quest: 96
    },
    {
      name: "AILEN",
      atk: 17,
      hp: 21,
      both: 12,
      skill: 2,
      quest: 13
    },
    {
      name: "FAEFYR",
      atk: 17,
      hp: 53,
      both: 19,
      skill: 3,
      quest: 33
    },
    {
      name: "AURI",
      atk: 74,
      hp: 70,
      both: 23,
      skill: 4,
      quest: 84
    },
    {
      name: "NICTE",
      atk: 43,
      hp: 21,
      both: 24,
      skill: 4,
      quest: 35
    },
    {
      name: "JAMES",
      atk: 111,
      hp: 103,
      both: 41,
      skill: 0.1,
      quest: 68
    },
    {
      name: "K41RY",
      atk: 14,
      hp: 19,
      both: 19,
      skill: 3,
      quest: 8
    },
    {
      name: "T4URUS",
      atk: 20,
      hp: 28,
      both: 30,
      skill: 2,
      quest: 36
    },
    {
      name: "TR0N1X",
      atk: 44,
      hp: 107,
      both: 35,
      skill: 6,
      quest: 72
    },
    {
      name: "AQUORTIS",
      atk: 18,
      hp: 28,
      both: 18,
      skill: 3,
      quest: 1
    },
    {
      name: "AERIS",
      atk: 36,
      hp: 20,
      both: 28,
      skill: 2,
      quest: 34
    },
    {
      name: "GEUM",
      atk: 8,
      hp: 213,
      both: 22,
      skill: 0.2,
      quest: 66
    },
    {
      name: "FOREST DRUID",
      atk: 16,
      hp: 38,
      both: 19,
      skill: 4,
      quest: 31
    },
    {
      name: "IGNITOR",
      atk: 22,
      hp: 24,
      both: 23,
      skill: 4,
      quest: 46
    },
    {
      name: "UNDINE",
      atk: 7,
      hp: 25,
      both: 15,
      skill: 4,
      quest: 30
    },
    {
      name: "RUDEAN",
      atk: 14,
      hp: 19,
      both: 10,
      skill: 3,
      quest: 7
    },
    {
      name: "AURAL",
      atk: 31,
      hp: 33,
      both: 28,
      skill: 0.12,
      quest: 43
    },
    {
      name: "GEROR",
      atk: 125,
      hp: 95,
      both: 36,
      skill: 0.12,
      quest: 93
    },
    {
      name: "VEILDUR",
      atk: 42,
      hp: 98,
      both: 51,
      skill: 3,
      quest: 101
    },
    {
      name: "BRYNHILDR",
      atk: 56,
      hp: 84,
      both: 59,
      skill: 4,
      quest: 104
    },
    {
      name: "GROTH",
      atk: 70,
      hp: 114,
      both: 62,
      skill: 5,
      quest: 108
    },
    {
      name: "OUREA",
      atk: 8,
      hp: 17,
      both: 8,
      skill: 3,
      quest: 10
    },
    {
      name: "EREBUS",
      atk: 18,
      hp: 55,
      both: 20,
      skill: 2,
      quest: 41
    },
    {
      name: "PONTUS",
      atk: 43,
      hp: 121,
      both: 79,
      skill: 0.2,
      quest: 100
    },
    {
      name: "CHROMA",
      atk: 15,
      hp: 23,
      both: 15,
      skill: 4,
      quest: 32
    },
    {
      name: "PETRY",
      atk: 16,
      hp: 18,
      both: 28,
      skill: 4,
      quest: 48
    },
    {
      name: "ZAYTUS",
      atk: 12,
      hp: 57,
      both: 16,
      skill: 4,
      quest: 42
    },
    {
      name: "SPYKE",
      atk: 43,
      hp: 112,
      both: 73,
      skill: 10,
      quest: 99
    },
    {
      name: "AOYUKI",
      atk: 121,
      hp: 75,
      both: 66,
      skill: 100,
      quest: 98
    },
    {
      name: "GAIABYTE",
      atk: 84,
      hp: 151,
      both: 52,
      skill: 2,
      quest: 113
    },
    {
      name: "OYMOS",
      atk: 15,
      hp: 24,
      both: 21,
      skill: 4,
      quest: 9
    },
    {
      name: "XARTH",
      atk: 25,
      hp: 23,
      both: 19,
      skill: 2,
      quest: 40
    },
    {
      name: "ATZAR",
      atk: 28,
      hp: 85,
      both: 48,
      skill: 0.2,
      quest: 85
    },
    {
      name: "ZETH",
      atk: 76,
      hp: 127,
      both: 24,
      skill: 0.1,
      quest: 103
    },
    {
      name: "KOTH",
      atk: 39,
      hp: 99,
      both: 70,
      skill: 0.1,
      quest: 106
    },
    {
      name: "GURTH",
      atk: 43,
      hp: 108,
      both: 68,
      skill: 0.1,
      quest: 109
    },
    {
      name: "WEREWOLF",
      atk: 28,
      hp: 23,
      both: 19,
      skill: 0.0202,
      quest: 21
    },
    {
      name: "JACK'O KNIGHT",
      atk: 13,
      hp: 50,
      both: 38,
      skill: 0.0202,
      quest: 54
    },
    {
      name: "DULLAHAN",
      atk: 45,
      hp: 114,
      both: 65,
      skill: 0.0404,
      quest: 110
    },
    {
      name: "LADY ODELITH",
      atk: 17,
      hp: 19,
      both: 29,
      skill: 4,
      quest: 44
    },
    {
      name: "SHYGU",
      atk: 68,
      hp: 62,
      both: 71,
      skill: 0.0202,
      quest: 83
    },
    {
      name: "THERT",
      atk: 44,
      hp: 61,
      both: 69,
      skill: 0.0202,
      quest: 77
    },
    {
      name: "LORD KIRK",
      atk: 99,
      hp: 77,
      both: 83,
      skill: 0.0202,
      quest: 91
    },
    {
      name: "NEPTUNIUS",
      atk: 73,
      hp: 92,
      both: 83,
      skill: 0.0202,
      quest: 97
    },
    {
      name: "SIGRÚN",
      atk: 29,
      hp: 132,
      both: 61,
      skill: 0.15,
      quest: 67
    },
    {
      name: "KOLDÍS",
      atk: 32,
      hp: 173,
      both: 46,
      skill: 0.15,
      quest: 71
    },
    {
      name: "ALVITR",
      atk: 50,
      hp: 152,
      both: 56,
      skill: 0.15,
      quest: 69
    },
    {
      name: "HAMA",
      atk: 10,
      hp: 21,
      both: 7,
      skill: 4,
      quest: 14
    },
    {
      name: "HALLINSKIDI",
      atk: 54,
      hp: 17,
      both: 20,
      skill: 2,
      quest: 49
    },
    {
      name: "RIGR",
      atk: 21,
      hp: 68,
      both: 93,
      skill: 0.2,
      quest: 102
    },
    {
      name: "ASCENDED ALPHA",
      atk: 98,
      hp: 251,
      both: 92,
      skill: 0.0304,
      quest: 137
    },
    {
      name: "ASCENDED ATHOS",
      atk: 57,
      hp: 281,
      both: 76,
      skill: 0.0304,
      quest: 139
    },
    {
      name: "ASCENDED REI",
      atk: 86,
      hp: 167,
      both: 176,
      skill: 0.1414,
      quest: 149
    },
    {
      name: "ASCENDED AURI",
      atk: 221,
      hp: 151,
      both: 59,
      skill: 0.0152,
      quest: 138
    },
    {
      name: "ASCENDED TR0N1X",
      atk: 56,
      hp: 383,
      both: 25,
      skill: 0.05,
      quest: 136
    },
    {
      name: "ASCENDED GEUM",
      atk: 35,
      hp: 348,
      both: 16,
      skill: 0.2,
      quest: 135
    },
    {
      name: "ASCENDED GEROR",
      atk: 22,
      hp: 173,
      both: 153,
      skill: 0.13,
      quest: 148
    },
    {
      atk: 20,
      hp: 20,
      both: 30,
      skill: 0.1,
      quest: 10
    },
    {
      name: "CHRISTMAS ELF",
      atk: 34,
      hp: 28,
      both: 22,
      skill: 0.0202,
      quest: 19
    },
    {
      name: "REINDEER",
      atk: 18,
      hp: 53,
      both: 33,
      skill: 0.0202,
      quest: 55
    },
    {
      name: "SANTA CLAUS",
      atk: 96,
      hp: 107,
      both: 78,
      skill: 0.0404,
      quest: 107
    },
    {
      name: "SEXY SANTA",
      atk: 41,
      hp: 27,
      both: 40,
      skill: 0.05,
      quest: 53
    },
    {
      name: "TOTH",
      atk: 32,
      hp: 18,
      both: 16,
      skill: 4,
      quest: 15
    },
    {
      name: "GANAH",
      atk: 26,
      hp: 29,
      both: 43,
      skill: 2,
      quest: 47
    },
    {
      name: "DAGDA",
      atk: 78,
      hp: 79,
      both: 123,
      skill: 0.2,
      quest: 111
    },
    {
      name: "BUBBLES",
      atk: 120,
      hp: 291,
      both: 58,
      skill: 0.0005,
      quest: 147
    },
    {
      name: "ASCENDED PONTUS",
      atk: 211,
      hp: 124,
      both: 190,
      skill: 0.30000000000000004,
      quest: 143
    },
    {
      name: "ASCENDED ATZAR",
      atk: 76,
      hp: 333,
      both: 86,
      skill: 0.30000000000000004,
      quest: 155
    },
    {
      name: "ARSHEN",
      atk: 44,
      hp: 83,
      both: 28,
      skill: 0.05,
      quest: 80
    },
    {
      name: "RUA",
      atk: 44,
      hp: 88,
      both: 37,
      skill: 0.05,
      quest: 92
    },
    {
      name: "DORTH",
      atk: 38,
      hp: 90,
      both: 40,
      skill: 0.05,
      quest: 90
    },
    {
      name: "ASCENDED RIGR",
      atk: 121,
      hp: 138,
      both: 163,
      skill: 0.30000000000000004,
      quest: 154
    },
    {
      atk: 20,
      hp: 20,
      both: 30,
      skill: 0.1,
      quest: 10
    },
    {
      name: "HOSOKAWA",
      atk: 115,
      hp: 108,
      both: 74,
      skill: 0.0202,
      quest: 95
    },
    {
      name: "TAKEDA",
      atk: 82,
      hp: 83,
      both: 45,
      skill: 0.0202,
      quest: 88
    },
    {
      name: "HIRATE",
      atk: 133,
      hp: 53,
      both: 44,
      skill: 0.0202,
      quest: 82
    },
    {
      name: "HATTORI",
      atk: 74,
      hp: 65,
      both: 64,
      skill: 0.0202,
      quest: 87
    },
    {
      name: "ASCENDED DAGDA",
      atk: 78,
      hp: 208,
      both: 322,
      skill: 0.30000000000000004,
      quest: 156
    },
    {
      name: "BYLAR",
      atk: 6,
      hp: 18,
      both: 15,
      skill: 4,
      quest: 16
    },
    {
      name: "BOÖR",
      atk: 49,
      hp: 19,
      both: 20,
      skill: 3,
      quest: 45
    },
    {
      name: "BAVAH",
      atk: 92,
      hp: 84,
      both: 43,
      skill: 5,
      quest: 94
    },
    {
      name: "LEPRECHAUN",
      atk: 13,
      hp: 59,
      both: 13,
      skill: 1,
      quest: 74
    },
    {
      name: "SPARKS",
      atk: 29,
      hp: 29,
      both: 15,
      skill: 0.2,
      quest: 23
    },
    {
      name: "LEAF",
      atk: 57,
      hp: 35,
      both: 26,
      skill: 0.2,
      quest: 59
    },
    {
      name: "FLYNN",
      atk: 93,
      hp: 46,
      both: 69,
      skill: 0.2,
      quest: 121
    },
    {
      name: "ASCENDED BAVAH",
      atk: 152,
      hp: 217,
      both: 145,
      skill: 0.0152,
      quest: 144
    },
    {
      name: "DR.HAWKING",
      atk: 136,
      hp: 94,
      both: 70,
      skill: 0.3,
      quest: 115
    },
    {
      name: "MASTER LEE",
      atk: 290,
      hp: 314,
      both: 225,
      skill: 0.05,
      quest: 157
    },
    {
      name: "KUMU-SAN",
      atk: 132,
      hp: 134,
      both: 135,
      skill: 0.05,
      quest: 114
    },
    {
      name: "LIU CHENG",
      atk: 111,
      hp: 149,
      both: 80,
      skill: 0.05,
      quest: 117
    },
    {
      name: "HIDOKA",
      atk: 172,
      hp: 144,
      both: 61,
      skill: 0.05,
      quest: 118
    },
    {
      name: "KRYTON",
      atk: 20,
      hp: 20,
      both: 30,
      skill: 0.1,
      quest: 10
    },
    {
      name: "DICEMASTER",
      atk: 36,
      hp: 19,
      both: 12,
      skill: 20,
      quest: 18
    },
    {
      name: "LUXURIUS MAXIMUS",
      atk: 47,
      hp: 44,
      both: 29,
      skill: 1,
      quest: 51
    },
    {
      name: "POKERFACE",
      atk: 211,
      hp: 119,
      both: 111,
      skill: 0.30000000000000004,
      quest: 116
    },
    {
      name: "TAINT",
      atk: 4,
      hp: 13,
      both: 21,
      skill: 0.05,
      quest: 12
    },
    {
      name: "PUTRID",
      atk: 93,
      hp: 51,
      both: 50,
      skill: 1,
      quest: 56
    },
    {
      name: "DEFILE",
      atk: 138,
      hp: 60,
      both: 72,
      skill: 50,
      quest: 89
    },
    {
      name: "NEIL",
      atk: 20,
      hp: 244,
      both: 23,
      skill: 0.05,
      quest: 65
    },
    {
      name: "MAHATMA",
      atk: 19,
      hp: 56,
      both: 85,
      skill: 0.5,
      quest: 75
    },
    {
      name: "JADE",
      atk: 37,
      hp: 45,
      both: 91,
      skill: 0.5,
      quest: 78
    },
    {
      name: "EDANA",
      atk: 46,
      hp: 91,
      both: 66,
      skill: 0.5,
      quest: 86
    },
    {
      name: "DYBBUK",
      atk: 43,
      hp: 65,
      both: 63,
      skill: 0.5,
      quest: 79
    },
    {
      name: "ASCENDED SHYGU",
      atk: 113,
      hp: 148,
      both: 217,
      skill: 0.01819,
      quest: 146
    },
    {
      name: "ASCENDED THERT",
      atk: 67,
      hp: 346,
      both: 76,
      skill: 0.01819,
      quest: 140
    },
    {
      name: "ASCENDED LORD KIRK",
      atk: 255,
      hp: 215,
      both: 87,
      skill: 0.01819,
      quest: 152
    },
    {
      name: "ASCENDED NEPTUNIUS",
      atk: 201,
      hp: 335,
      both: 241,
      skill: 0.01819,
      quest: 153
    },
    {
      name: "ASCENDED HOSOKAWA",
      atk: 423,
      hp: 229,
      both: 207,
      skill: 0.01819,
      quest: 150
    },
    {
      name: "ASCENDED TAKEDA",
      atk: 425,
      hp: 252,
      both: 66,
      skill: 0.01819,
      quest: 151
    },
    {
      name: "ASCENDED HIRATE",
      atk: 193,
      hp: 199,
      both: 119,
      skill: 0.01819,
      quest: 142
    },
    {
      name: "ASCENDED HATTORI",
      atk: 167,
      hp: 218,
      both: 138,
      skill: 0.01819,
      quest: 145
    },
    {
      atk: 20,
      hp: 20,
      both: 30,
      skill: 0.1,
      quest: 10
    },
    {
      name: "BILLY",
      atk: 30,
      hp: 43,
      both: 24,
      skill: 25,
      quest: 22
    },
    {
      name: "SANQUEEN",
      atk: 8,
      hp: 71,
      both: 16,
      skill: 0.08000000000000002,
      quest: 50
    },
    {
      name: "CLIODHNA",
      atk: 240,
      hp: 193,
      both: 78,
      skill: 0.1,
      quest: 119
    },
    {
      name: "GUY",
      atk: 121,
      hp: 160,
      both: 115,
      skill: 0.1,
      quest: 159
    },
    {
      name: "ASCENDED DEFILE",
      atk: 122,
      hp: 126,
      both: 114,
      skill: 2,
      quest: 141
    },
    {
      name: "RAIDER ROSE",
      atk: 32,
      hp: 353,
      both: 476,
      skill: 0.05,
      quest: 158
    },
    {
      name: "BUCCANEER BEATRICE",
      atk: 32,
      hp: 66,
      both: 66,
      skill: 0.05,
      quest: 105
    },
    {
      name: "CORSAIR CHARLES",
      atk: 21,
      hp: 87,
      both: 64,
      skill: 0.05,
      quest: 112
    },
    {
      name: "MARAUDER MAGNUS",
      atk: 67,
      hp: 175,
      both: 71,
      skill: 0.05,
      quest: 120
    },
    {
      name: "FROSTY",
      atk: 69,
      hp: 51,
      both: 16,
      skill: 0.003,
      quest: 58
    },
    {
      name: "FIR",
      atk: 5,
      hp: 33,
      both: 11,
      skill: 0.0004,
      quest: 20
    },
    {
      name: "5-12-6",
      atk: 37,
      hp: 42,
      both: 39,
      skill: 0.003,
      quest: 57
    },
    {
      name: "KEDARI",
      atk: 19,
      hp: 133,
      both: 25,
      skill: 0.2,
      quest: 70
    },
    {
      name: "RAZE",
      atk: 9,
      hp: 8,
      both: 14,
      skill: 0.05,
      quest: 5
    },
    {
      name: "RUIN",
      atk: 61,
      hp: 23,
      both: 23,
      skill: 0.05,
      quest: 56
    },
    {
      name: "SEETHE",
      atk: 178,
      hp: 57,
      both: 53,
      skill: 15,
      quest: 86
    },
    {
      name: "ASCENDED SEETHE",
      atk: 117,
      hp: 90,
      both: 124,
      skill: 0.11,
      quest: 146
    },
    {
      name: "BLOSSOM",
      atk: 99,
      hp: 99,
      both: 144,
      skill: 0.01,
      quest: 91
    },
    {
      name: "FLINT",
      atk: 100,
      hp: 100,
      both: 150,
      skill: 0.01,
      quest: 98
    },
    {
      name: "ORIN",
      atk: 101,
      hp: 101,
      both: 156,
      skill: 0.01,
      quest: 104
    },
    {
      name: "AURORA",
      atk: 221,
      hp: 221,
      both: 344,
      skill: 0.01,
      quest: 142
    },
    {
      name: "CUPID",
      atk: 50,
      hp: 150,
      both: 110,
      skill: 1,
      quest: 118
    },
    {
      name: "TRANSIENT",
      atk: 11,
      hp: 11,
      both: 20,
      skill: 0.1,
      quest: 24
    },
    {
      name: "MAUNDER",
      atk: 22,
      hp: 22,
      both: 32,
      skill: 0.1,
      quest: 57
    },
    {
      name: "THE WANDERER",
      atk: 80,
      hp: 80,
      both: 120,
      skill: 0.1,
      quest: 126
    },
    {
      name: "B-DAY",
      atk: 51,
      hp: 61,
      both: 49,
      skill: 0.05,
      quest: 91
    },
    {
      name: "CLOUD",
      atk: 32,
      hp: 36,
      both: 11,
      skill: 0.05,
      quest: 18
    },
    {
      name: "EMBER",
      atk: 14,
      hp: 34,
      both: 19,
      skill: 0.05,
      quest: 52
    },
    {
      name: "RIPTIDE",
      atk: 34,
      hp: 89,
      both: 22,
      skill: 0.05,
      quest: 87
    },
    {
      name: "SPIKE",
      atk: 103,
      hp: 234,
      both: 136,
      skill: 0.05,
      quest: 143
    },
    {
      name: "ASCENDED MAHATMA",
      atk: 50,
      hp: 241,
      both: 195,
      skill: 0.3,
      quest: 138
    },
    {
      name: "ASCENDED JADE",
      atk: 41,
      hp: 288,
      both: 144,
      skill: 0.3,
      quest: 146
    },
    {
      name: "ASCENDED EDANA",
      atk: 180,
      hp: 191,
      both: 99,
      skill: 0.3,
      quest: 145
    },
    {
      name: "ASCENDED DYBBUK",
      atk: 55,
      hp: 272,
      both: 169,
      skill: 0.3,
      quest: 147
    },
    {
      name: "WILLOW",
      atk: 19,
      hp: 22,
      both: 24,
      skill: 0.2,
      quest: 19
    },
    {
      name: "GIZMO",
      atk: 26,
      hp: 43,
      both: 52,
      skill: 1,
      quest: 58
    },
    {
      name: "DAISY",
      atk: 84,
      hp: 50,
      both: 70,
      skill: 0.5,
      quest: 88
    },
    {
      name: "THUMPER",
      atk: 320,
      hp: 230,
      both: 360,
      skill: 0.1,
      quest: 156
    },
    {
      name: "BORTLES",
      atk: 13,
      hp: 10,
      both: 14,
      skill: 3,
      quest: 21
    },
    {
      name: "MURPHY",
      atk: 18,
      hp: 24,
      both: 28,
      skill: 30,
      quest: 60
    },
    {
      name: "NERISSA",
      atk: 45,
      hp: 22,
      both: 52,
      skill: 0.05,
      quest: 123
    },
    {
      name: "MOTHER",
      atk: 120,
      hp: 200,
      both: 140,
      skill: 5,
      quest: 123
    },
    {
      name: "ASCENDED NERISSA",
      atk: 112,
      hp: 70,
      both: 100,
      skill: 0.006,
      quest: 167
    },
    {
      name: "AGATHA",
      atk: 92,
      hp: 76,
      both: 74,
      skill: 0.05,
      quest: 121
    },
    {
      name: "OPHELIA",
      atk: 99,
      hp: 78,
      both: 75,
      skill: 0.05,
      quest: 110
    },
    {
      name: "HELGA",
      atk: 101,
      hp: 84,
      both: 82,
      skill: 0.05,
      quest: 119
    },
    {
      name: "MINERVA",
      atk: 241,
      hp: 204,
      both: 256,
      skill: 0.05,
      quest: 164
    },
    {
      name: "ASCENDED WANDERER",
      atk: 110,
      hp: 110,
      both: 110,
      skill: 0.1,
      quest: 166
    },
    {
      name: "TETRA",
      atk: 68,
      hp: 154,
      both: 68,
      skill: 0.2,
      quest: 134
    },
    {
      name: "4TH05",
      atk: 16,
      hp: 8,
      both: 14,
      skill: 1,
      quest: 19
    },
    {
      name: "4TZ4R",
      atk: 10,
      hp: 28,
      both: 36,
      skill: 1,
      quest: 59
    },
    {
      name: "R31",
      atk: 28,
      hp: 112,
      both: 26,
      skill: 1,
      quest: 72
    },
    {
      name: "45C3ND3D R31",
      atk: 34,
      hp: 192,
      both: 78,
      skill: 1,
      quest: 136
    },
    {
      name: "SMITH",
      atk: 47,
      hp: 84,
      both: 68,
      skill: 0.1,
      quest: 102
    },
    {
      name: "MR. COTTON",
      atk: 7,
      hp: 28,
      both: 12,
      skill: 5,
      quest: 15
    },
    {
      name: "SHARKJELLYN",
      atk: 13,
      hp: 44,
      both: 15,
      skill: 15,
      quest: 44
    },
    {
      name: "CHOCO KNIGHT",
      atk: 47,
      hp: 72,
      both: 82,
      skill: 0.1,
      quest: 132
    },
    {
      name: "DARK CHOCO KNIGHT",
      atk: 64,
      hp: 98,
      both: 104,
      skill: 0.1,
      quest: 168
    },
    {
      name: "LILI",
      atk: 535,
      hp: 174,
      both: 171,
      skill: 0.01,
      quest: 144
    },
    {
      name: "BORNAG",
      atk: null,
      hp: null,
      both: null,
      skill: null,
      quest: null
    },
    {
      name: "THRACE",
      atk: 131,
      hp: 82,
      both: 104,
      skill: 25,
      quest: 107
    },
    {
      name: "SCINDA",
      atk: 125,
      hp: 78,
      both: 116,
      skill: 30,
      quest: 121
    },
    {
      name: "MYRMILLO",
      atk: 141,
      hp: 94,
      both: 99,
      skill: 35,
      quest: 110
    },
    {
      name: "RETIA",
      atk: 318,
      hp: 246,
      both: 338,
      skill: 100,
      quest: 148
    },
    {
      name: "NEWT",
      atk: 1,
      hp: 14,
      both: 4,
      skill: 0.5,
      quest: 1
    },
    {
      name: "ELECTRA",
      atk: 4,
      hp: 30,
      both: 8,
      skill: 1,
      quest: 30
    },
    {
      name: "BOSON",
      atk: 20,
      hp: 82,
      both: 21,
      skill: 1,
      quest: 65
    },
    {
      name: "HIGGS",
      atk: 24,
      hp: 225,
      both: 30,
      skill: 1,
      quest: 135
    },
    {
      name: "CASPER",
      atk: 14,
      hp: 14,
      both: 20,
      skill: 1,
      quest: 22
    },
    {
      name: "ADRIAN",
      atk: 14,
      hp: 32,
      both: 28,
      skill: 2,
      quest: 45
    },
    {
      name: "EMILY",
      atk: 178,
      hp: 258,
      both: 104,
      skill: 0.0202,
      quest: 130
    },
    {
      name: "ADAM",
      atk: 93,
      hp: 321,
      both: 134,
      skill: 0.01,
      quest: 158
    },
    {
      name: "YISUS",
      atk: 18,
      hp: 38,
      both: 34,
      skill: 1,
      quest: 55
    },
    {
      name: "GÁLLÁ",
      atk: 22,
      hp: 30,
      both: 22,
      skill: 0.5,
      quest: 33
    },
    {
      name: "YETI THE POSTMAN",
      atk: 40,
      hp: 40,
      both: 40,
      skill: 1,
      quest: 63
    },
    {
      name: "HANS",
      atk: 200,
      hp: 200,
      both: 180,
      skill: 2,
      quest: 127
    },
    {
      name: "MECHA MARY",
      atk: 1080,
      hp: 12,
      both: 30,
      skill: 0.01,
      quest: 168
    },
    {
      name: "ANNIE",
      atk: 68,
      hp: 68,
      both: 112,
      skill: 0.01,
      quest: 125
    },
    {
      name: "KILKENNY THE FAIRY",
      atk: 59,
      hp: 13,
      both: 13,
      skill: 1,
      quest: 126
    },
    {
      name: "MYSTERIOUS EGG",
      atk: 8,
      hp: 20,
      both: 20,
      skill: 0.25,
      quest: 19
    },
    {
      name: "BABY PYROS",
      atk: 12,
      hp: 30,
      both: 30,
      skill: 0.25,
      quest: 58
    },
    {
      name: "YOUNG PYROS",
      atk: 20,
      hp: 40,
      both: 40,
      skill: 0.25,
      quest: 88
    },
    {
      name: "KING PYROS",
      atk: 20,
      hp: 120,
      both: 70,
      skill: 0.25,
      quest: 156
    },
    {
      name: "ROB",
      atk: 74,
      hp: 80,
      both: 124,
      skill: 0.05,
      quest: 108
    },
    {
      name: "KIRK LEE",
      atk: 72,
      hp: 84,
      both: 130,
      skill: 0.05,
      quest: 122
    },
    {
      name: "LARS",
      atk: 70,
      hp: 88,
      both: 138,
      skill: 0.05,
      quest: 111
    },
    {
      name: "HETFIELD",
      atk: 210,
      hp: 240,
      both: 360,
      skill: 0.05,
      quest: 149
    },
    {
      name: "PLUVIA",
      atk: 14,
      hp: 8,
      both: 18,
      skill: 0.1,
      quest: 109
    },
    {
      name: "SILEX",
      atk: 38,
      hp: 12,
      both: 30,
      skill: 0.1,
      quest: 123
    },
    {
      name: "CAELI",
      atk: 204,
      hp: 98,
      both: 80,
      skill: 0.1,
      quest: 112
    },
    {
      name: "IGNIS",
      atk: 312,
      hp: 104,
      both: 120,
      skill: 0.1,
      quest: 150
    }
  ];


var PVEHERO = Array(HERO.length).fill(1);

var start=Date.now();
connection.connect();

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

var bids = [
    {id:20,time:172800,price:454},
    {id:33,time:86400,price:181},
    {id:34,time:86400,price:181},
    {id:35,time:86400,price:181},
    {id:51,time:21600,price:9},
    {id:52,time:43200,price:45},
    {id:53,time:86400,price:181},
    {id:73,time:21600,price:9},
    {id:74,time:43200,price:45},
    {id:75,time:86400,price:181},
    {id:76,time:43200,price:45},
    {id:96,time:172800,price:454},
    {id:97,time:43200/2,price:9},
    {id:98,time:86400/2,price:45},
    {id:99,time:172800/2,price:181},
    {id:48,time:86400,price:181},
    {id:49,time:86400,price:181},
    {id:50,time:86400,price:181},
    {id:101,time:172800,price:454},
    {id:107,time:21600,price:9},
    {id:108,time:43200,price:45},
    {id:109,time:86400,price:181},
    {id:113,time:86400,price:4545},
    {id:59,time:86400,price:181},
    {id:60,time:86400,price:181},
    {id:61,time:86400,price:181},
    {id:127,time:21600,price:9},
    {id:128,time:43200,price:45},
    {id:129,time:86400,price:181},
    {id:130,time:86400*3,price:7273},
    {id:136,time:43200,price:45},
    {id:102,time:86400*3,price:3637},
    {id:83,time:86400,price:181},
    {id:84,time:86400,price:181},
    {id:85,time:86400,price:181},
    {id:153,time:6*60*60,price:9},
    {id:154,time:12*60*60,price:45},
    {id:155,time:24*60*60,price:181},
    {id:156,time:48*60*60,price:4545},
    {id:137,time:21600,price:9},
    {id:138,time:43200,price:45},
    {id:139,time:86400,price:181},
    {id:148,time:48*60*60,price:7273},
    {id:103,time:86400,price:181},
    {id:104,time:86400,price:181},
    {id:105,time:86400,price:181},
    {id:133,time:86400,price:181},
    {id:134,time:86400,price:181},
    {id:135,time:86400,price:181},
    {id:147,time:86400*3,price:3637},
    {id:132,time:86400*3,price:3637},
    {id:168,time:48*60*60,price:7273},
    {id:180,time:48*60*60,price:7273},
    {id:175,time:86400,price:4545},
    {id:144,time:86400,price:181},
    {id:145,time:86400,price:181},
    {id:146,time:86400,price:181},
    {id:173,time:86400*3,price:3637},
    {id:200,time:21600,price:9},
    {id:201,time:43200,price:45},
    {id:202,time:86400,price:181},
    {id:203,time:86400*3,price:1364},
    {id:195,time:21600,price:9},
    {id:196,time:43200,price:45},
    {id:197,time:86400,price:181},
    {id:198,time:86400*3,price:1364},
    {id:199,time:43200,price:45}, //Yisus
    {id:205,time:86400*2,price:454}, //Kilkenny
    {id:206,time:21600,price:9}, //egg
    {id:207,time:43200,price:45}, //baby
    {id:208,time:86400,price:181}, //young
    {id:209,time:86400*2,price:909} //king
];

var working=0;

function doUpdate(row) {
    connection.query('UPDATE auction SET `status`=2 WHERE id='+row.id+' LIMIT 1', function (error, results, fields) {
        if (!error) {
            if (row.hero==99||row.hero==98||row.hero==97) {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":9}\');', function (error, results, fields) {});
            } else if (row.hero==139||row.hero==138||row.hero==137) {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":9}\');', function (error, results, fields) {});
            } else if (row.hero==73||row.hero==74||row.hero==75) {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":9}\');', function (error, results, fields) {});
            } else if (row.hero==153||row.hero==154||row.hero==155||row.hero==156) {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":33}\');', function (error, results, fields) {});
            } else if (row.hero==200||row.hero==201||row.hero==202||row.hero==203) {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":3}\');', function (error, results, fields) {});
            } else if (row.hero==206||row.hero==207||row.hero==208||row.hero==209) { //pyros
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+',\"LVL\":33}\');', function (error, results, fields) {});
            } else {
                connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+row.holder+'\', \''+'{\"HERO\":'+row.hero+'}\');', function (error, results, fields) {});
            }
        }
    });
}

function doPF(id,pid,togive) {
    ++working;
    var prize = JSON.parse(togive);
    var UM = 0;
    var PG = 0;
    var PK = 0;
    var SD = 0;
    var AS = 0;
    var HERO = -1;
    var LVL = 1;
    if (prize.HERO) HERO=prize.HERO;
    if (prize.UM) UM = prize.UM;
    if (prize.PG) PG = prize.PG;
    if (prize.SD) SD = prize.SD;
    if (prize.PK) PK = prize.PK;
    if (prize.AS) AS = prize.AS;
    if (prize.LVL) LVL = prize.LVL;
    PlayFabServer.ExecuteCloudScript(
        {
            PlayFabId: pid,
            "FunctionName": "secret",
            "FunctionParameter": {
                pid: pid,
                UM: UM,
                PG: PG,
                PK: PK,
                SD: SD,
                AS: AS,
                tid: 0,
                top: 0,
                amount: 0,
                HERO: HERO,
                LVL: LVL,
                sec: "secret"
            }
        }, function (a,b) {
            //fs.writeFileSync("/home/ec2-user/plog/"+Date.now()+".log",JSON.stringify(a)+JSON.stringify(b));
            if (a!=null||b.status!="OK"||b.data===undefined||b.data.FunctionResult===undefined||b.data.FunctionResult.ok!==true) {
                connection.query('UPDATE `prizes` SET tries=tries+1 WHERE id ='+id+' LIMIT 1', function (error, results, fields) {
                    --working;
                });
            } else {
                connection.query('UPDATE `prizes` SET status=1 WHERE id ='+id+' LIMIT 1', function (error, results, fields) {
                    --working;
                });
            }
            
        }
    );
}
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
            while (fam+4<MONSTERS.length && MONSTERS[fam+4].cost<avgleft) {
                fam+=4;
            }
            root[i]=fam;
            bcost+=MONSTERS[root[i]].cost;
        }
    }
    // pick 2 commons, 2 rares, 2 legendaries
    var ignore=[];
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
                    while (lvl<1000 && hval(picks[i],lvl<99?lvl+1:1000)<todo) {
                        lvl=lvl<99?lvl+1:1000;
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
function doDungeonRewards() {
    ++todo;
    connection.query('SELECT id FROM events WHERE type=3 AND status=0 ORDER BY id DESC LIMIT 1', function (error, results, fields) {
        if (!error) {
            ++todo;
            for (row of results) {
                var eid=row.id;
                connection.query('SELECT level, uid FROM dungeon WHERE eid = '+eid+' ORDER BY level DESC', function (error, results, fields) {
                    if (!error) {
                        var pool=undefined;
                        var pos=1;
                        var rewards=[];
                        for (row of results) {
                            if (pool===undefined) pool=row.level*1000000;
                            
                            var prize = Math.round(pool*pos2perc(pos,results.length));
                            rewards.push({
                                level: row.level,
                                prize: prize,
                                fprize: 0,
                                uid: row.uid,
                                pos: pos
                            });
                            ++pos;
                        }
                        var i = 0;
                        var tosave=[];
                        while (i<rewards.length) {
                            var e = i+1;
                            var toshare=rewards[i].prize;
                            var amount=1;
                            while (e<rewards.length && rewards[i].level==rewards[e].level) {
                                toshare+=rewards[e].prize
                                ++e;
                                ++amount;
                            }
                            for (var j=i; j<e; ++j) {
                                rewards[j].fprize=Math.round(toshare/amount);
                                tosave.push({
                                    uid: rewards[j].uid,
                                    prize: rewards[j].fprize
                                });
                            }
                            i=e;
                        }
                        for (var i=0; i<tosave.length; ++i) {
                            ++todo;
                            connection.query('INSERT INTO `prizes` (`id`, `tries`, `status`, `created`, `uid`, `prize`) VALUES (NULL, \'0\', \'0\', CURRENT_TIMESTAMP, \''+tosave[i].uid+'\', \''+'{\"SD\":'+tosave[i].prize+'}\');', function (error, results, fields) {--todo;});
                        }
                        fs.writeFileSync("/usr/share/nginx/html/duncache/"+eid+".json",JSON.stringify(tosave));    
                    }
                    --todo;
                });
            }
        }
        --todo;
    });
}
var todo=0;
// events
var d = new Date();
var day = d.getDay();
var isWeekend = false;
if (!isWeekend) {
    ++todo;
    connection.query('SELECT * FROM events ORDER BY id DESC LIMIT 1', function (error, results, fields) {
        if (error) {
            connection.end();
            throw error;
            process.exit();
        }
        for (var row of results) {
            if (row.end<Date.now()/1000) {
                var end=row.end+24*60*60;
                var type=(row.type+1)%9;
                var nid = row.id+1;
                var d1 = new Date(row.end*1000-60000);
                var day1 = d1.getDay();
                var isWeekend1 = false;
                var s = 0;
                if (!isWeekend1) {
                    if (type==3) {
                        for (var i=1; i<=250; ++i) {
                            var data = doDaily(i);
                            ++todo;
                            connection.query('INSERT INTO `dlvl`(`eid`, `lvl`, `setup`, `hero`) VALUES ('+nid+','+i+',\''+JSON.stringify(data.setup)+'\',\''+JSON.stringify(data.hero)+'\');', function (error, results, fields) {
                                --todo;
                            });
                        }
                    } else if (type==0) {
                        ++todo;
                        connection.query('INSERT INTO `lottery`(`id`, `uid`, `num`, `eid`) VALUES (NULL,1,1,'+nid+');', function (error, results, fields) {
                            --todo;
                        });
                        //doDungeonRewards();
                    } else if (type==1) {
                        /*var exec = require('child_process').exec;
                        var cmd = '/usr/local/bin/node /home/ec2-user/lottery.js';

                        exec(cmd, function(error, stdout, stderr) {
                            console.log(error,stdout,stderr);
                        });*/
                    }
                } else {
                    s=1;
                }
                ++todo;
                connection.query('INSERT INTO `events`(`id`, `end`, `type`, `status`) VALUES (NULL,'+end+','+type+','+s+');', function (error, results, fields) {
                    --todo;
                });
            }
        }
        --todo;
    });
}

++todo;
var rightnow = Math.round(Date.now()/1000);
connection.query('SELECT * FROM events WHERE status=0 AND end<'+rightnow, function (error, results, fields) {
    if (error) {
        connection.end();
        throw error;
        process.exit();
    }
    for (var row of results) {
        var type = row.type;
        var eid = row.id;
        if (type==3) {
            doDungeonRewards();
            ++todo;
            connection.query('UPDATE `events` SET status=1 WHERE id='+eid+';', function (error, results, fields) {
                --todo;
            });
        } else if (type==0) {
            try {
                var exec = require('child_process').execSync;
                var cmd = '/usr/local/bin/node /home/ec2-user/lottery.js';

                exec(cmd);
            } catch(e) {

            }
        } else if (type==1 || type==2 || type==4 || type==5) {
            ++todo;
            connection.query('UPDATE `events` SET status=1 WHERE id='+eid+';', function (error, results, fields) {
                --todo;
            });
        }
    }
    --todo;
});

connection.query('SELECT * FROM auction WHERE `status`<=1 AND `flash`=0', function (error, results, fields) {
    if (error) {
        connection.end();
        throw error;
        process.exit();
    }
    var done=[];
    for (var row of results) {
        if (row.status==1) {
            doUpdate(row);
        } else {
            done.push(row.hero);
        }
    }
    for (var i=0; i<bids.length; ++i) {
        if (done.indexOf(bids[i].id)===-1) {
            ++todo;
            var time = bids[i].time;
            if ((0.3/Math.sqrt(time/3600))>Math.random()) time = 3600;
            connection.query('INSERT INTO `auction` (`id`, `status`, `holder`, `bid`, `ends`, `hero`, `flash`) VALUES (NULL, \'0\', \'1\', \''+bids[i].price+'\', \''+Math.round(Date.now()/1000+time)+'\', \''+bids[i].id+'\', \'0\');', function (error, results, fields) {
                --todo;
            });
        }
    }
    /*++todo;
    connection.query('SELECT p.id,p.prize,u.pid FROM prizes p, users u WHERE p.`status`=0 AND p.uid=u.id GROUP BY u.pid LIMIT 2000', function (error, results, fields) {
        if (error) {
            connection.end();
            throw error;
            process.exit();
        }
        for (var row of results) {
            doPF(row.id, row.pid, row.prize);
        }
        --todo;
    });*/
    
});
/*++todo;
connection.query('SELECT * FROM auction WHERE `status`<=1 AND `flash`=1', function (error, results, fields) {
    --todo;
    if (error) {
        connection.end();
        throw error;
        process.exit();
    }
    var done=false;
    for (var row of results) {
        if (row.status==1) {
            doUpdate(row);
        } else {
            done=true;
        }
    }
    if (!done) {
        var time = 0;
        for (var i=0; i<bids.length; ++i) {
            time+=1/bids[i].time;
        }
        var pos = Math.random()*time;
        var rnd = 0;
        for (var i=0; i<bids.length; ++i) {
            pos-=1/bids[i].time;
            if (pos<0) {
                rnd=i;
                break;
            } 
        }
        ++todo;
        connection.query('INSERT INTO `auction` (`id`, `status`, `holder`, `bid`, `ends`, `hero`, `flash`) VALUES (NULL, \'0\', \'1\', \''+bids[rnd].price/2+'\', \''+Math.round(Date.now()/1000+60*60)+'\', \''+bids[rnd].id+'\', \'1\');', function (error, results, fields) {
            --todo;
        });
    }
});*/

var udid=Math.floor(Date.now()/(24*60*60*1000))-100;
++todo;
connection.query('DELETE FROM poll WHERE qid<='+udid, function (error, results, fields) {
    --todo;
});

var utid=udid-17348;
++todo;
connection.query('DELETE FROM battles WHERE tid<='+utid, function (error, results, fields) {
    --todo;
});

++todo;
connection.query('SELECT id FROM WB ORDER BY id DESC LIMIT 1', function (error, results, fields) {
    --todo;
    if (!error) {
        var lbid = undefined;
        for (var row of results) {
            lbid=row.id;
        }
        if (lbid!==undefined) {
            ++todo;
            connection.query('DELETE FROM WBD WHERE bid<='+(lbid-100), function (error, results, fields) {
                --todo;
            });
        }
    }
});

++todo;
connection.query('SELECT COUNT(*) as `wip`, MAX(tid) AS `mtid` FROM tournaments2 WHERE status=0', function (error, results, fields) {
    if (!error) {
      if (results[0].wip<2) {
        ++todo;
        var tid = results[0].mtid?results[0].mtid+1:Math.floor((Date.now()+12*60*60*1000)/(24*60*60*1000));
        var heroes = Array(HERO.length).fill(0);
        var promo = Array(HERO.length).fill(0);
        var picks = [];
        while (picks.length<50) {
            var hid = Math.floor(Math.random()*HERO.length);
            if (HERO[hid].rarity<=3 && picks.indexOf(hid)===-1) picks.push(hid);
        }
        var lvls = [1,10,25,50,99,1000,2000,3000,4000,5000,6000,7000,8000,9000];
        for (var i=0; i<picks.length; ++i) {
            heroes[picks[i]]=lvls[Math.floor(Math.random()*lvls.length)];
            promo[i]=Math.floor(Math.random()*6);
        }
        var followers = Math.floor(Math.random()*Math.pow(2,41));
        var grid = Array(30).fill(-1);
        var vals = Array(30).fill(0);
        for (var i=0; i<30; ++i) {
          if (Math.random()<0.25) {
            grid[i]=Math.floor(Math.random()*10);
            var minval = 0.25;
            var maxval = 2;
            if ([0,7].indexOf(grid[i])!==-1) { // 10 - 50
              minval=0.1;
              maxval=0.5;
            } else if ([1,9].indexOf(grid[i])!==-1) {
              minval=0.15;
              maxval=1;
            }
            vals[i]=parseFloat((Math.random()*(maxval-minval)+minval).toFixed(2));
          }
        }
        connection.query("INSERT INTO `tournaments2` (`id`, `created`, `completed`, `status`, `followers`, `heroes`, `promo`, `grid`, `vals`, `tid`) VALUES"+
        "(NULL, CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000', '0', '"+followers+"', '"+JSON.stringify(heroes)+"', '"+JSON.stringify(promo)+"', '"+JSON.stringify(grid)+"', '"+JSON.stringify(vals)+"', '"+tid+"');",
        function (error, results, fields) {
          --todo;
        });
      }  
    }
    --todo;
});

var trytimes=0;

function check() {
    ++trytimes;
    if (trytimes>1000 || (working==0 && todo==0)) {
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        console.log("DONE",utc);
        connection.end();
    } else {
        setTimeout(check,1000);
    }
}

setTimeout(check,1000);
var fireZones = [
    {x:431/2,y:83/2},
    {x:84/2,y:502/2},
    {x:412/2,y:392/2},
    {x:490/2,y:725/2},
    {x:137/2,y:1177/2},
    {x:137/2,y:776/2},
];

var lightningZones = [
    {nuvol:["017k","0i8g"],llamp:"0dvi"},
    {nuvol:["09c3","08cb"],llamp:"08bz"},
    //{nuvol:["0bo0","0oja"],llamp:"0nr0"},
    //{nuvol:["0beo","02c9"],llamp:"0ash"},
];

var galaxyParts = [
    "0gte","06ub","0omu","0hqp","0fen","05km","0c6v","0528"
];

var primParts = [
    "0kxx","0kxx","0kxx","0kxx","0kxx","0kxx"
];

var labParts = [
    "0cqu","0by0","0jpe","03a7","084w","0ang","0hpl","02do","07r0","0d2s","05f3","0ebj"
];


var bubbleSprites = ["04c4","09tk","0ndq","08pn","09hh","0lxx","0iv5","0j6l"];

var reiZones = [
    {x:8,y:436,sid:"0no1",r:0},
    {x:76,y:325,sid:"0ku7",r:0},
    {x:75,y:40,sid:"0188",r:0},
    {x:130,y:158,sid:"093r",r:0},
    {x:158,y:505,sid:"093r",r:Math.PI},
]

var mileZones = [
    960,
    869,
    776,
    684,
    591,
    499,
    406,
    313,
    220,
    128,
    38
]

/*var MONSTERS = [
    {
        name:"KODAMA",
        type:0,
        img: "0mlg",
        hp: 20,
        atk: 8,
        cost: 1000,
    },{
        name:"SAPLING",
        type:1,
        img: "038r",
        hp: 44,
        atk: 4,
        cost: 1300,
    },{
        name:"WILL-O'-THE-WHISP",
        type:2,
        img: "0nj0",
        hp: 16,
        atk: 10,
        cost: 1000,
    },{
        name:"NAVI",
        type:3,
        img: "0f71",
        hp: 30,
        atk: 6,
        cost: 1400,
    },{
        name:"HARPY",
        type:0,
        img: "086x",
        hp: 48,
        atk: 6,
        cost: 3900,
    },{
        name:"ALUX",
        type:1,
        img: "0cur",
        hp: 30,
        atk: 8,
        cost: 2700,
    },{
        name:"FOX SPIRIT",
        type:2,
        img: "02ys",
        hp: 18,
        atk: 16,
        cost: 3900,
    },{
        name:"DAKUWAQA",
        type:3,
        img: "0owq",
        hp: 24,
        atk: 12,
        cost: 3900,
    },{
        name:"GRIFFIN",
        type:0,
        img: "0gpm",
        hp: 36,
        atk: 12,
        cost: 8000,
    },{
        name:"CENTAUR",
        type:1,
        img: "0j0o",
        hp: 26,
        atk: 16,
        cost: 7500,
    },{
        name:"HELLHOUND",
        type:2,
        img: "0n11",
        hp: 54,
        atk: 8,
        cost: 8000,
    },{
        name:"MERMAID",
        type:3,
        img: "0lgi",
        hp: 18,
        atk: 24,
        cost: 8000,
    },{
        name:"QUETZALCOATL",
        type:0,
        img: "0dao",
        hp: 24,
        atk: 26,
        cost: 15000,
    },{
        name:"ENT",
        type:1,
        img: "098a",
        hp: 72,
        atk: 10,
        cost: 18000,
    },{
        name:"WYVERN",
        type:2,
        img: "0ojf",
        hp: 52,
        atk: 16,
        cost: 23000,
    },{
        name:"YETI",
        type:3,
        img: "05fn",
        hp: 36,
        atk: 20,
        cost: 18000,
    },{
        name:"BAILONG",
        type:0,
        img: "0i6u",
        hp: 60,
        atk: 20,
        cost: 41000,
    },{
        name:"SPHINX",
        type:1,
        img: "01z2",
        hp: 36,
        atk: 40,
        cost: 54000,
    },{
        name:"CHERUFE",
        type:2,
        img: "041v",
        hp: 42,
        atk: 24,
        cost: 31000,
    },{
        name:"HIPPOCAMPUS",
        type:3,
        img: "004t",
        hp: 78,
        atk: 18,
        cost: 52000,
    },{
        name:"MANTICORE",
        type:0,
        img: "03oq",
        hp: 62,
        atk: 34,
        cost: 96000,
    },{
        name:"ALRAUNE",
        type:1,
        img: "038l",
        hp: 72,
        atk: 24,
        cost: 71000,
    },{
        name:"GARGOYLE",
        type:2,
        img: "00uj",
        hp: 104,
        atk: 20,
        cost: 94000,
    },{
        name:"HYDRA",
        type:3,
        img: "05eo",
        hp: 44,
        atk: 44,
        cost: 84000,
    },{
        name:"ANKA",
        type:0,
        img: "07sp",
        hp: 106,
        atk: 26,
        cost: 144000,
    },{
        name:"CHIMERA",
        type:1,
        img: "0ibi",
        hp: 66,
        atk: 36,
        cost: 115000,
    },{
        name:"IFRIT",
        type:2,
        img: "01vq",
        hp: 54,
        atk: 44,
        cost: 115000,
    },{
        name:"KRAKEN",
        type:3,
        img: "03dr",
        hp: 92,
        atk: 32,
        cost: 159000,
    },{
        name:"TYPHON",
        type:0,
        img: "0luj",
        hp: 78,
        atk: 52,
        cost: 257000,
    },{
        name:"AMMIT",
        type:1,
        img: "0lf0",
        hp: 60,
        atk: 60,
        cost: 215000,
    },{
        name:"PHOENIX",
        type:2,
        img: "0lal",
        hp: 94,
        atk: 50,
        cost: 321000,
    },{
        name:"LEVIATHAN",
        type:3,
        img: "0nob",
        hp: 108,
        atk: 36,
        cost: 241000,
    },{
        name:"HECATONCHEIRES",
        type:0,
        img: "0md6",
        hp: 116,
        atk: 54,
        cost: 495000,
    },{
        name:"MOAI GOLEM",
        type:1,
        img: "072e",
        hp: 120,
        atk: 48,
        cost: 436000,
    },{
        name:"BALROG",
        type:2,
        img: "0cxp",
        hp: 102,
        atk: 58,
        cost: 454000,
    },{
        name:"POSEIDON",
        type:3,
        img: "0cf4",
        hp: 80,
        atk: 70,
        cost: 418000,
    },{
        name:"OPHION",
        type:0,
        img: "0865",
        hp: 142,
        atk: 60,
        cost: 785000,
    },{
        name:"AKUPARA",
        type:1,
        img: "0al5",
        hp: 122,
        atk: 64,
        cost: 689000,
    },{
        name:"BEELZEBUB",
        type:2,
        img: "06vm",
        hp: 104,
        atk: 82,
        cost: 787000,
    },{
        name:"CTHULHU",
        type:3,
        img: "0gjj",
        hp: 110,
        atk: 70,
        cost: 675000,
    },{
        name:"THE NORNS",
        type:0,
        img: "0l22",
        hp: 114,
        atk: 110,
        cost: 1403000,
    },{
        name:"FENRIR",
        type:1,
        img: "0hly",
        hp: 134,
        atk: 81,
        cost: 1130000,
    },{
        name:"HUITZILOPOCHTLI",
        type:2,
        img: "0gds",
        hp: 164,
        atk: 70,
        cost: 1229000,
    },{
        name:"JÖRMUNGANDR",
        type:3,
        img: "06eh",
        hp: 152,
        atk: 79,
        cost: 1315000,
    },{
        name:"WORLD EGG",
        type:0,
        img: "09jv",
        hp: 164,
        atk: 88,
        cost: 1733000,
    },{
        name:"LICHE",
        type:1,
        img: "0p6g",
        hp: 128,
        atk: 120,
        cost: 1903000,
    },{
        name:"SURTUR",
        type:2,
        img: "006w",
        hp: 156,
        atk: 92,
        cost: 1718000,
    },{
        name:"CAILLEACH",
        type:3,
        img: "0oa6",
        hp: 188,
        atk: 78,
        cost: 1775000,
    },{
        name:"CHRONOS",
        type:0,
        img: "089d",
        hp: 210,
        atk: 94,
        cost: 2772000,
    },{
        name:"GEA",
        type:1,
        img: "0bc7",
        hp: 190,
        atk: 132,
        cost: 3971000,
    },{
        name:"BAHAMUT",
        type:2,
        img: "018x",
        hp: 166,
        atk: 130,
        cost: 3169000,
    },{
        name:"ŌGENOS",
        type:3,
        img: "0khj",
        hp: 140,
        atk: 128,
        cost: 2398000,
    },{
        name:"BRAHMA",
        type:0,
        img: "04ot",
        hp: 200,
        atk: 142,
        cost: 4785000,
    },{
        name:"YGGDRASIL",
        type:1,
        img: "0p8r",
        hp: 244,
        atk: 136,
        cost: 6044000,
    },{
        name:"RA",
        type:2,
        img: "09r6",
        hp: 168,
        atk: 168,
        cost: 4741000,
    },{
        name:"NIFLHEIM",
        type:3,
        img: "05d0",
        hp: 212,
        atk: 122,
        cost: 4159000,
    },{
        name:"GINNUN",
        type:0,
        img: "0jaq",
        hp: 226,
        atk: 190,
        cost: 8897000,
    },{
        name:"KAILAS",
        type:1,
        img: "03qr",
        hp: 200,
        atk: 186,
        cost: 7173000,
    },{
        name:"CHAOS",
        type:2,
        img: "08qe",
        hp: 234,
        atk: 136,
        cost: 5676000,
    },{
        name:"NŪN",
        type:3,
        img: "0njr",
        hp: 276,
        atk: 142,
        cost: 7758000,
    },{
        name:"FURIOUS KODAMA",
        type:0,
        img: "0mlg",
        hp: 280,
        atk: 196,
        cost: 12855000,
    },{
        name:"FURIOUS SAPLING",
        type:1,
        img: "038r",
        hp: 284,
        atk: 190,
        cost: 12534000,
    },{
        name:"FURIOUS WILL-O'-THE-WHISP",
        type:2,
        img: "0nj0",
        hp: 288,
        atk: 192,
        cost: 13001000,
    },{
        name:"FURIOUS NAVI",
        type:3,
        img: "0f71",
        hp: 286,
        atk: 198,
        cost: 13475000,
    },{
        name:"FURIOUS HARPY",
        type:0,
        img: "086x",
        hp: 318,
        atk: 206,
        cost: 16765000,
    },{
        name:"FURIOUS ALUX",
        type:1,
        img: "0cur",
        hp: 338,
        atk: 192,
        cost: 16531000,
    },{
        name:"FURIOUS FOX SPIRIT",
        type:2,
        img: "02ys",
        hp: 236,
        atk: 292,
        cost: 18090000,
    },{
        name:"FURIOUS DAKUWAQA",
        type:3,
        img: "0owq",
        hp: 262,
        atk: 258,
        cost: 17573000,
    },{
        name:"FURIOUS GRIFFIN",
        type:0,
        img: "0gpm",
        hp: 280,
        atk: 280,
        cost: 21951000,
    },{
        name:"FURIOUS CENTAUR",
        type:1,
        img: "0j0o",
        hp: 330,
        atk: 242,
        cost: 22567000,
    },{
        name:"FURIOUS HELLHOUND",
        type:2,
        img: "0n11",
        hp: 392,
        atk: 200,
        cost: 21951000,
    },{
        name:"FURIOUS MERMAID",
        type:3,
        img: "0lgi",
        hp: 330,
        atk: 230,
        cost: 20909000,
    },{
        name:"FURIOUS QUETZALCOATL",
        type:0,
        img: "0dao",
        hp: 440,
        atk: 206,
        cost: 27288000,
    },{
        name:"FURIOUS ENT",
        type:1,
        img: "098a",
        hp: 320,
        atk: 282,
        cost: 27107000,
    },{
        name:"FURIOUS WYVERN",
        type:2,
        img: "0ojf",
        hp: 352,
        atk: 244,
        cost: 25170000,
    },{
        name:"FURIOUS YETI",
        type:3,
        img: "05fn",
        hp: 360,
        atk: 238,
        cost: 25079000,
    },{
        name:"FURIOUS BAILONG",
        type:0,
        img: "0i6u",
        hp: 378,
        atk: 268,
        cost: 32242000,
    },{
        name:"FURIOUS SPHINX",
        type:1,
        img: "01z2",
        hp: 382,
        atk: 264,
        cost: 32025000,
    },{
        name:"FURIOUS CHERUFE",
        type:2,
        img: "041v",
        hp: 388,
        atk: 266,
        cost: 33155600,
    },{
        name:"FURIOUS HIPPOCAMPUS",
        type:3,
        img: "004t",
        hp: 454,
        atk: 232,
        cost: 34182000,
    },{
        name:"FURIOUS MANTICORE",
        type:0,
        img: "03oq",
        hp: 428,
        atk: 286,
        cost: 42826000,
    },{
        name:"FURIOUS ALRAUNE",
        type:1,
        img: "038l",
        hp: 446,
        atk: 272,
        cost: 42252000,
    },{
        name:"FURIOUS GARGOYLE",
        type:2,
        img: "00uj",
        hp: 362,
        atk: 338,
        cost: 42798000,
    },{
        name:"FURIOUS HYDRA",
        type:3,
        img: "05eo",
        hp: 416,
        atk: 290,
        cost: 41901000,
    },{
        name:"FURIOUS ANKA",
        type:0,
        img: "07sp",
        hp: 454,
        atk: 320,
        cost: 55373000,
    },{
        name:"FURIOUS CHIMERA",
        type:1,
        img: "0ibi",
        hp: 450,
        atk: 324,
        cost: 55671000,
    },{
        name:"FURIOUS IFRIT",
        type:2,
        img: "01vq",
        hp: 458,
        atk: 318,
        cost: 55582000,
    },{
        name:"FURIOUS KRAKEN",
        type:3,
        img: "03dr",
        hp: 440,
        atk: 340,
        cost: 55877000,
    },{
        name:"FURIOUS TYPHON",
        type:0,
        img: "0luj",
        hp: 500,
        atk: 348,
        cost: 72580000,
    },{
        name:"FURIOUS AMMIT",
        type:1,
        img: "0lf0",
        hp: 516,
        atk: 340,
        cost: 73483000,
    },{
        name:"FURIOUS PHOENIX",
        type:2,
        img: "0lal",
        hp: 424,
        atk: 410,
        cost: 72480000,
    },{
        name:"FURIOUS LEVIATHAN",
        type:3,
        img: "0nob",
        hp: 490,
        atk: 354,
        cost: 72243000,
    },{
        name:"FURIOUS HECATONCHEIRES",
        type:0,
        img: "0md6",
        hp: 554,
        atk: 374,
        cost: 94312000,
    },{
        name:"FURIOUS MOAI GOLEM",
        type:1,
        img: "072e",
        hp: 458,
        atk: 458,
        cost: 96071000,
    },{
        name:"FURIOUS BALROG",
        type:2,
        img: "0cxp",
        hp: 534,
        atk: 392,
        cost: 95772000,
    },{
        name:"FURIOUS POSEIDON",
        type:3,
        img: "0cf4",
        hp: 540,
        atk: 388,
        cost: 95903000,
    },{
        name:"FURIOUS OPHION",
        type:0,
        img: "0865",
        hp: 580,
        atk: 430,
        cost: 124549000,
    },{
        name:"FURIOUS AKUPARA",
        type:1,
        img: "0al5",
        hp: 592,
        atk: 418,
        cost: 123096000,
    },{
        name:"FURIOUS BEELZEBUB",
        type:2,
        img: "06vm",
        hp: 764,
        atk: 328,
        cost: 125443000,
    },{
        name:"FURIOUS CTHULHU",
        type:3,
        img: "0gjj",
        hp: 500,
        atk: 506,
        cost: 127256000,
    },{
        name:"FURIOUS THE NORNS",
        type:0,
        img: "0l22",
        hp: 496,
        atk: 582,
        cost: 155097000,
    },{
        name:"FURIOUS FENRIR",
        type:1,
        img: "0hly",
        hp: 622,
        atk: 468,
        cost: 157055000,
    },{
        name:"FURIOUS HUITZILOPOCHTLI",
        type:2,
        img: "0gds",
        hp: 638,
        atk: 462,
        cost: 160026000,
    },{
        name:"FURIOUS JÖRMUNGANDR",
        type:3,
        img: "06eh",
        hp: 700,
        atk: 416,
        cost: 157140000,
    },{
        name:"FURIOUS WORLD EGG",
        type:0,
        img: "09jv",
        hp: 712,
        atk: 484,
        cost: 202295000,
    },{
        name:"FURIOUS LICHE",
        type:1,
        img: "0p6g",
        hp: 580,
        atk: 602,
        cost: 206317000,
    },{
        name:"FURIOUS SURTUR",
        type:2,
        img: "006w",
        hp: 690,
        atk: 498,
        cost: 201426000,
    },{
        name:"FURIOUS CAILLEACH",
        type:3,
        img: "0oa6",
        hp: 682,
        atk: 500,
        cost: 199344000,
    },{
        name:"FURIOUS CHRONOS",
        type:0,
        img: "089d",
        hp: 644,
        atk: 642,
        cost: 265846000,
    },{
        name:"FURIOUS GEA",
        type:1,
        img: "0bc7",
        hp: 770,
        atk: 540,
        cost: 268117000,
    },{
        name:"FURIOUS BAHAMUT",
        type:2,
        img: "018x",
        hp: 746,
        atk: 552,
        cost: 264250000,
    },{
        name:"FURIOUS ŌGENOS",
        type:3,
        img: "0khj",
        hp: 762,
        atk: 536,
        cost: 261023000,
    },{
        name:"FURIOUS BRAHMA",
        type:0,
        img: "04ot",
        hp: 834,
        atk: 616,
        cost: 368230000,
    },{
        name:"FURIOUS YGGDRASIL",
        type:1,
        img: "0p8r",
        hp: 830,
        atk: 614,
        cost: 363805000,
    },{
        name:"FURIOUS RA",
        type:2,
        img: "09r6",
        hp: 746,
        atk: 676,
        cost: 358119000,
    },{
        name:"FURIOUS NIFLHEIM",
        type:3,
        img: "05d0",
        hp: 1008,
        atk: 512,
        cost: 370761000,
    },{
        name:"FURIOUS GINNUN",
        type:0,
        img: "0jaq",
        hp: 700,
        atk: 906,
        cost: 505055000,
    },{
        name:"FURIOUS KAILAS",
        type:1,
        img: "03qr",
        hp: 1022,
        atk: 614,
        cost: 497082000,
    },{
        name:"FURIOUS CHAOS",
        type:2,
        img: "08qe",
        hp: 930,
        atk: 690,
        cost: 514040000,
    },{
        name:"FURIOUS NŪN",
        type:3,
        img: "0njr",
        hp: 802,
        atk: 802,
        cost: 515849000,
    }
];

var HERO = [
    // One Time Purchase x3
    {
        name:"LADY OF TWILIGHT",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0fmg",
        hp: 45,
        atk: 20,
        skill: {
            type: "extra",
            target: -1,
            value: 3
        }
    },{
        name:"TINY",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0kbl",
        hp: 70,
        atk: 30,
        skill: {
            type: "buffahe",
            target: -1,
            value: 1/24
        }
    },{
        name:"NEBRA",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0bhl",
        hp: 110,
        atk: 40,
        skill: {
            type: "dmg",
            target: -1,
            value: 20
        }
    },
    // PVE Heroes x4
    {
        name:"VALOR",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0ctf",
        hp: 20,
        atk: 10,
        skill: {
            type: "def",
            target: 0,
            value: 1
        }
    },{
        name:"ROKKA",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "06ny",
        hp: 30,
        atk: 8,
        skill: {
            type: "def",
            target: 1,
            value: 1
        }
    },{
        name:"PYROMANCER",
        type:2,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "09nf",
        hp: 24,
        atk: 12,
        skill: {
            type: "def",
            target: 2,
            value: 1
        }
    },{
        name:"BEWAT",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "02hk",
        hp: 50,
        atk: 6,
        skill: {
            type: "def",
            target: 3,
            value: 1
        }
    },
    // CAVEMAN Heroes
    {
        name:"HUNTER",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0ek2",
        hp: 22,
        atk: 14,
        skill: {
            type: "dmg",
            target: 0,
            value: 2
        }
    },{
        name:"SHAMAN",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0kid",
        hp: 40,
        atk: 20,
        skill: {
            type: "def",
            target: 1,
            value: 2
        }
    },{
        name:"ALPHA",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ezu",
        hp: 82,
        atk: 22,
        skill: {
            type: "aoe",
            target: -1,
            value: 1
        },
        super: 65,
    },
    // HUMAN Heroes
    {
        name:"CARL",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0fy3",
        hp: 28,
        atk: 12,
        skill: {
            type: "dmg",
            target: 3,
            value: 2
        }
    },{
        name:"NIMUE",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0egn",
        hp: 38,
        atk: 22,
        skill: {
            type: "def",
            target: 0,
            value: 2
        }
    },{
        name:"ATHOS",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "03nd",
        hp: 70,
        atk: 26,
        skill: {
            type: "def",
            target: -1,
            value: 2
        },
        super: 66,
    },
    // PROSTHETICMAN Heroes
    {
        name:"JET",
        type:2,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0oai",
        hp: 24,
        atk: 16,
        skill: {
            type: "dmg",
            target: 2,
            value: 2
        }
    },{
        name:"GERON",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0c53",
        hp: 36,
        atk: 24,
        skill: {
            type: "def",
            target: 3,
            value: 2
        }
    },{
        name:"REI",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0mq1",
        hp: 46,
        atk: 40,
        skill: {
            type: "dmg",
            target: -1,
            value: 2
        },
        super: 67,
    },
    // GENETICMAN Heroes
    {
        name:"AILEN",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0cku",
        hp: 19,
        atk: 22,
        skill: {
            type: "dmg",
            target: 1,
            value: 2
        }
    },{
        name:"FAEFYR",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0cav",
        hp: 50,
        atk: 18,
        skill: {
            type: "def",
            target: 2,
            value: 2
        }
    },{
        name:"AURI",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0agh",
        hp: 60,
        atk: 32,
        skill: {
            type: "heal",
            target: -1,
            value: 2
        },
        super: 68,
    },
    // PVE 5 (pos 19)
    {
        name:"NICTE",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0aar",
        hp: 22,
        atk: 32,
        skill: {
            type: "dmg",
            target: 0,
            value: 4
        }
    },{
        name:"JAMES",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ef9",
        hp: 50,
        atk: 12,
        skill: {
            type: "rico",
            target: 5,
            value: 0.75
        }
    },
    // ROBOT - CONTINUE SPECIES (pos 21)
    {
        name:"K41RY",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0m4j",
        hp: 28,
        atk: 16,
        skill: {
            type: "dmg",
            target: 0,
            value: 3
        }
    },{
        name:"T4URUS",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0klv",
        hp: 46,
        atk: 20,
        skill: {
            type: "dmg",
            target: -1,
            value: 1
        }
    },{
        name:"TR0N1X",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ji6",
        hp: 100,
        atk: 20,
        skill: {
            type: "aoe",
            target: -1,
            value: 3
        },
        super: 69,
    },
    // POSTHUMAN
    {
        name:"AQUORTIS",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0k2w",
        hp: 58,
        atk: 8,
        skill: {
            type: "dmg",
            target: 3,
            value: 3
        }
    },{
        name:"AERIS",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0lbm",
        hp: 30,
        atk: 32,
        skill: {
            type: "heal",
            target: -1,
            value: 1
        }
    },{
        name:"GEUM",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0k28",
        hp: 75,
        atk: 2,
        skill: {
            type: "buff",
            target: 0,
            value: 2
        },
        super: 70,
    },
    // 27 28 29 - PVE MAPA 6,7,8
    {
        name:"FOREST DRUID",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0etn",
        hp: 46,
        atk: 16,
        skill: {
            type: "dmg",
            target: 1,
            value: 4
        }
    },{
        name:"IGNITOR",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0awm",
        hp: 32,
        atk: 24,
        skill: {
            type: "dmg",
            target: 2,
            value: 4
        }
    },{
        name:"UNDINE",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "026t",
        hp: 58,
        atk: 14,
        skill: {
            type: "dmg",
            target: 3,
            value: 4
        }
    },
    // ENTITY HEROES - 30 31 32
    {
        name:"RUDEAN",
        type:2,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "0ffu",
        hp: 38,
        atk: 12,
        skill: {
            type: "dmg",
            target: 2,
            value: 3
        }
    },{
        name:"AURAL",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0lr6",
        hp: 18,
        atk: 50,
        skill: {
            type: "buff",
            target: -1,
            value: 1.2
        }
    },{
        name:"GEROR",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ikc",
        hp: 46,
        atk: 46,
        skill: {
            type: "mon",
            target: -1,
            value: 1.2
        },
        super: 71,
    },
    // SEASON HEROES - 33 34 35
    {
        name:"VEILDUR",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0k3v",
        hp: 66,
        atk: 44,
        skill: {
            type: "extra",
            target: -1,
            value: 3
        }
    },{
        name:"BRYNHILDR",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0arb",
        hp: 72,
        atk: 48,
        skill: {
            type: "extra",
            target: -1,
            value: 4
        }
    },{
        name:"GROTH",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "06w4",
        hp: 78,
        atk: 52,
        skill: {
            type: "extra",
            target: -1,
            value: 5
        }
    },
    // PRIMORDIAL HEROES - 36 37 38
    {
        name:"OUREA",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "075h",
        hp: 30,
        atk: 16,
        skill: {
            type: "dmg",
            target: 1,
            value: 3
        }
    },{
        name:"EREBUS",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0au9",
        hp: 48,
        atk: 20,
        skill: {
            type: "extra",
            target: 2,
            value: 2
        }
    },{
        name:"PONTUS",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0csq",
        hp: 62,
        atk: 36,
        skill: {
            type: "purity",
            target: 3,
            value: 2
        },
        super: 81,
    },
    // 39 40 41 - PVE MAPA 9,10,11
    {
        name:"CHROMA",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "05vu",
        hp: 52,
        atk: 20,
        skill: {
            type: "def",
            target: 0,
            value: 4
        }
    },{
        name:"PETRY",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0l6j",
        hp: 26,
        atk: 44,
        skill: {
            type: "def",
            target: 1,
            value: 4
        }
    },{
        name:"ZAYTUS",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0max",
        hp: 58,
        atk: 22,
        skill: {
            type: "def",
            target: 2,
            value: 4
        }
    },
    // GAIABYTE HEROES
    {
        name:"SPYKE",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "00y9",
        hp: 75,
        atk: 45,
        skill: {
            type: "turna",
            target: -1,
            value: 10
        }
    },{
        name:"AOYUKI",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "03ij",
        hp: 70,
        atk: 55,
        skill: {
            type: "rainbow",
            target: -1,
            value: 100
        }
    },{
        name:"GAIABYTE",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ej9",
        hp: 75,
        atk: 150,
        skill: {
            type: "ban",
            target: -1,
            value: 2
        }
    },
    // SEER HEROES 45 - 46 - 47
    {
        name:"OYMOS",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "07ao",
        hp: 36,
        atk: 14,
        skill: {
            type: "dmg",
            target: 0,
            value: 4
        }
    },{
        name:"XARTH",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "08gg",
        hp: 32,
        atk: 32,
        skill: {
            type: "extra",
            target: 1,
            value: 2
        }
    },{
        name:"ATZAR",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0a87",
        hp: 76,
        atk: 32,
        skill: {
            type: "purity",
            target: 2,
            value: 2
        },
        super: 82,
    },
    // SEASON II HEROES REWARDS 48 - 49 - 50
    {
        name:"ZETH",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "073h",
        hp: 70,
        atk: 42,
        skill: {
            type: "boom",
            target: -1,
            value: 0.1
        }
    },{
        name:"KOTH",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0ghe",
        hp: 76,
        atk: 46,
        skill: {
            type: "boom",
            target: -1,
            value: 0.15
        }
    },{
        name:"GURTH",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0d6e",
        hp: 82,
        atk: 50,
        skill: {
            type: "boom",
            target: -1,
            value: 0.2
        }
    },
    // HALLOWEEN HEROES 51 - 52 - 53
    {
        name:"WEREWOLF",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "05gv",
        hp: 35,
        atk: 25,
        skill: {
            type: "buffdef",
            target: -1,
            value: 0.1112
        }
    },{
        name:"JACK'O KNIGHT",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "06a2",
        hp: 55,
        atk: 35,
        skill: {
            type: "buffatk",
            target: -1,
            value: 0.1112
        }
    },{
        name:"DULLAHAN",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "061b",
        hp: 75,
        atk: 45,
        skill: {
            type: "buffboth",
            target: -1,
            value: 0.1112
        }
    },
    // PVE HEROES 54 - 55 - 56 - 57 - 58
    {
        name:"LADY ODELITH",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "0lfy",
        hp: 36,
        atk: 36,
        skill: {
            type: "def",
            target: 3,
            value: 4
        }
    },{
        name:"SHYGU",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "023t",
        hp: 34,
        atk: 54,
        skill: {
            type: "buffdef",
            target: 0,
            value: 0.1112
        }
    },{
        name:"THERT",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0hia",
        hp: 72,
        atk: 28,
        skill: {
            type: "buffdef",
            target: 1,
            value: 0.1112
        }
    },{
        name:"LORD KIRK",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0686",
        hp: 32,
        atk: 64,
        skill: {
            type: "buffdef",
            target: 2,
            value: 0.1112
        }
    },{
        name:"NEPTUNIUS",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0b3i",
        hp: 30,
        atk: 70,
        skill: {
            type: "buffdef",
            target: 3,
            value: 0.1112
        }
    },
    // SEASON 3 -> 59 - 60 - 61
    {
        name:"SIGRÚN",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "06eu",
        hp: 65,
        atk: 12,
        skill: {
            type: "rico",
            target: 5,
            value: 0.5
        }
    },{
        name:"KOLDÍS",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0n6v",
        hp: 70,
        atk: 14,
        skill: {
            type: "rico",
            target: 5,
            value: 0.5
        }
    },{
        name:"ALVITR",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0j0m",
        hp: 75,
        atk: 16,
        skill: {
            type: "rico",
            target: 5,
            value: 0.5
        }
    },
    // GUARDIAN -> 62 - 63 - 64
    {
        name:"HAMA",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "08iu",
        hp: 30,
        atk: 18,
        skill: {
            type: "dmg",
            target: 3,
            value: 4
        }
    },{
        name:"HALLINSKIDI",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "00m3",
        hp: 34,
        atk: 34,
        skill: {
            type: "extra",
            target: 0,
            value: 2
        }
    },{
        name:"RIGR",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "0dsn",
        hp: 60,
        atk: 42,
        skill: {
            type: "purity",
            target: 1,
            value: 2
        },
        super: 86,
    },
    // SUPER LEGENDARIES -> 65 .. 71
    {
        name:"ASCENDED ALPHA",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "04ko",
        hp: 174,
        atk: 46,
        skill: {
            type: "buffaoe",
            target: -1,
            value: 0.304
        }
    },
    {
        name:"ASCENDED ATHOS",
        type:1,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "0c1j",
        hp: 162,
        atk: 60,
        skill: {
            type: "buffdef",
            target: -1,
            value: 0.304
        }
    },
    {
        name:"ASCENDED REI",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "0c3v",
        hp: 120,
        atk: 104,
        skill: {
            type: "buffatk",
            target: -1,
            value: 0.304
        }
    },
    {
        name:"ASCENDED AURI",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "08tr",
        hp: 148,
        atk: 78,
        skill: {
            type: "buffheal",
            target: -1,
            value: 0.152
        }
    },
    {
        name:"ASCENDED TR0N1X",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "0jvc",
        hp: 190,
        atk: 38,
        skill: {
            type: "rico",
            target: 5,
            value: 0.75
        }
    },
    {
        name:"ASCENDED GEUM",
        type:1,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "075o",
        hp: 222,
        atk: 8,
        skill: {
            type: "buff",
            target: 0,
            value: 2
        }
    },
    {
        name:"ASCENDED GEROR",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "0lj3",
        hp: 116,
        atk: 116,
        skill: {
            type: "mon",
            target: -1,
            value: 1.3
        }
    },
    // 72: World Boss 0
    {
        name:"LORD OF CHAOS",
        type:2,
        rarity:5, //WORLD BOSS
        img:"0nfc",
        hp: 1e300,
        atk: 72,
        skill: {
            type: "aoe",
            target: -1,
            value: 20
        }
    },
    // 73,74,75 Christmas Heroes
    {
        name:"CHRISTMAS ELF",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "ivdn",
        hp: 38,
        atk: 24,
        skill: {
            type: "buffheal",
            target: -1,
            value: 0.1112
        }
    },
    {
        name:"REINDEER",
        type:0,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "e14u",
        hp: 54,
        atk: 36,
        skill: {
            type: "buffaoe",
            target: -1,
            value: 0.1112
        }
    },
    {
        name:"SANTA CLAUS",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "34ff",
        hp: 72,
        atk: 48,
        skill: {
            type: "buffahe",
            target: -1,
            value: 0.1112
        }
    },
    // 76 Sexy Santa (Extra Advent Calendar)
    {
        name:"SEXY SANTA",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "ytur",
        hp: 44,
        atk: 44,
        skill: {
            type: "rico",
            target: 5,
            value: 0.66
        }
    },
    // 77,78,79 : Mastermind Heroes
    {
        name:"TOTH",
        type:2,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "do1j",
        hp: 24,
        atk: 24,
        skill: {
            type: "dmg",
            target: 2,
            value: 4
        }
    },
    {
        name:"GANAH",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "gd7s",
        hp: 40,
        atk: 30,
        skill: {
            type: "extra",
            target: 3,
            value: 2
        }
    },
    {
        name:"DAGDA",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "yzpf",
        hp: 58,
        atk: 46,
        skill: {
            type: "purity",
            target: 0,
            value: 2
        },
        super: 92
    },
    // 80 : One Time Purchase 4 (OTO4)
    {
        name:"BUBBLES",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "6a3u",
        hp: 300,
        atk: 110,
        skill: {
            type: "debuff",
            target: -1,
            value: 0.005
        }
    },
    // 81,82 : SUPER LEGENDARIES
    {
        name:"ASCENDED PONTUS",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "sa0l",
        hp: 150,
        atk: 86,
        skill: {
            type: "purity",
            target: 3,
            value: 3
        },
    },
    {
        name:"ASCENDED ATZAR",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "h5ye",
        hp: 162,
        atk: 81,
        skill: {
            type: "purity",
            target: 2,
            value: 3
        },
    },
    // 83,84,85 : SEASON 4
    {
        name:"ARSHEN",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "3ade",
        hp: 74,
        atk: 36,
        skill: {
            type: "rico",
            target: 1,
            value: 1
        }
    },{
        name:"RUA",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "9sja",
        hp: 78,
        atk: 40,
        skill: {
            type: "rico",
            target: 1,
            value: 1
        }
    },{
        name:"DORTH",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "wxkn",
        hp: 82,
        atk: 44,
        skill: {
            type: "rico",
            target: 1,
            value: 1
        }
    },
    // 86 : ASCENDED GUARDIAN
    {
        name:"ASCENDED RIGR",
        type:1,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "k4iy",
        hp: 141,
        atk: 99,
        skill: {
            type: "purity",
            target: 1,
            value: 3
        },
    },
    // 87: World Boss 1
    {
        name:"MOTHER OF ALL KODAMAS",
        type:1,
        rarity:5, //WORLD BOSS
        img:"uf59",
        hp: 1e300,
        atk: 124,
        skill: {
            type: "debuff",
            target: -1,
            value: 0.5
        }
    },
    // 88,89,90,91 -> PVE HEROES
    {
        name:"HOSOKAWA",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "hu9w",
        hp: 42,
        atk: 50,
        skill: {
            type: "buffatk",
            target: 0,
            value: 0.1112
        }
    },{
        name:"TAKEDA",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "qkx4",
        hp: 32,
        atk: 66,
        skill: {
            type: "buffatk",
            target: 1,
            value: 0.1112
        }
    },{
        name:"HIRATE",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "29l6",
        hp: 38,
        atk: 56,
        skill: {
            type: "buffatk",
            target: 2,
            value: 0.1112
        }
    },{
        name:"HATTORI",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "ikae",
        hp: 44,
        atk: 48,
        skill: {
            type: "buffatk",
            target: 3,
            value: 0.1112
        }
    },
    // 92: ASCENDED GUARDIAN
    {
        name:"ASCENDED DAGDA",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "bdoh",
        hp: 135,
        atk: 107,
        skill: {
            type: "purity",
            target: 0,
            value: 3
        },
    },
    // 93,94,95 : Mastermind Heroes
    {
        name:"BYLAR",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "tgzk",
        hp: 30,
        atk: 20,
        skill: {
            type: "dmg",
            target: 1,
            value: 4
        }
    },
    {
        name:"BOÖR",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "a1gu",
        hp: 36,
        atk: 36,
        skill: {
            type: "turna",
            target: -1,
            value: 3
        }
    },
    {
        name:"BAVAH",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "3lza",
        hp: 52,
        atk: 52,
        skill: {
            type: "extra",
            target: -1,
            value: 2
        },
        super: 100
    },
    // 96: ST.PATRICK HERO
    {
        name:"LEPRECHAUN",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "tvhw",
        hp: 75,
        atk: 25,
        skill: {
            type: "ratio",
            target: -1,
            value: 1
        },
    },
    // 97,98,99: EASTER HEROES
    {
        name:"SPARKS",
        type:2,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "hwe9",
        hp: 30,
        atk: 30,
        skill: {
            type: "evo",
            target: -1,
            value: 2,
        }
    },
    {
        name:"LEAF",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "f0pg",
        hp: 48,
        atk: 42,
        skill: {
            type: "evo",
            target: -1,
            value: 2
        }
    },
    {
        name:"FLYNN",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "msba",
        hp: 70,
        atk: 48,
        skill: {
            type: "evo",
            target: -1,
            value: 2
        },
    },
    // 100: ASCENDED CREATOR
    {
        name:"ASCENDED BAVAH",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "w1qv",
        hp: 122,
        atk: 122,
        skill: {
            type: "buffboth",
            target: -1,
            value: 0.152
        }
    },
    // 101: STEPHEN HAWKING TRIBUTE HERO
    {
        name:"DR.HAWKING",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "pasc",
        hp: 66,
        atk: 60,
        skill: {
            type: "paoe",
            target: -1,
            value: 1
        },
    },
    // 102: ASCENDED SEASON PASS 01
    {
        name:"MASTER LEE",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "h7sj",
        hp: 150,
        atk: 90,
        skill: {
            type: "counter",
            target: -1,
            value: 0.5
        },
    },
    // 103,104,105: SEASON V HEROES
    {
        name:"KUMU-SAN",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "xplz",
        hp: 70,
        atk: 38,
        skill: {
            type: "counter",
            target: -1,
            value: 0.2
        }
    },{
        name:"LIU CHENG",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "1wm3",
        hp: 78,
        atk: 42,
        skill: {
            type: "counter",
            target: -1,
            value: 0.25
        }
    },{
        name:"HIDOKA",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "a10r",
        hp: 86,
        atk: 44,
        skill: {
            type: "counter",
            target: -1,
            value: 0.3
        }
    },
    // 106: World Boss 2
    {
        name:"KRYTON",
        type:0,
        rarity:5, //WORLD BOSS
        img:"wdwa",
        hp: 1e300,
        atk: 10,
        skill: {
            type: "turna",
            target: -1,
            value: 10
        }
    },
    // 107,108,109 : AH HEROES
    {
        name:"DICEMASTER",
        type:3,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "8127",
        hp: 25,
        atk: 26,
        skill: {
            type: "ratk",
            target: -1,
            value: 20,
        }
    },
    {
        name:"LUXURIUS MAXIMUS",
        type:2,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "u67e",
        hp: 28,
        atk: 60,
        skill: {
            type: "rtrg",
            target: -1,
            value: 1
        }
    },
    {
        name:"POKERFACE",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "balp",
        hp: 70,
        atk: 70,
        skill: {
            type: "rcrit",
            target: 5,
            value: 3
        },
    },
    //110,111,112 Corruptor Heroes
    {
        name:"TAINT",
        type:0,
        rarity:0, // 0 common, 1 rare, 2 legendary, 3 super
        img: "769k",
        hp: 25,
        atk: 25,
        skill: {
            type: "rico",
            target: 5,
            value: 0.5,
        }
    },
    {
        name:"PUTRID",
        type:1,
        rarity:1, // 0 common, 1 rare, 2 legendary, 3 super
        img: "9gst",
        hp: 48,
        atk: 50,
        skill: {
            type: "turna",
            target: -1,
            value: -3
        }
    },
    {
        name:"DEFILE",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "g5um",
        hp: 52,
        atk: 48,
        skill: {
            type: "moob",
            target: -1,
            value: 50
        },
        super: 131
    },
    // 113 : LTO HEROE
    {
        name:"NEIL",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "3j8x",
        hp: 150,
        atk: 15,
        skill: {
            type: "tank",
            target: -1,
            value: 0.3
        },
    },
    // 114, 115, 116, 117 : PVE DJIN HEROES
    {
        name:"MAHATMA",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "wpph",
        hp: 78,
        atk: 26,
        skill: {
            type: "elem",
            target: 0,
            value: 0.75,
        }
    },
    {
        name:"JADE",
        type:1,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "jc5b",
        hp: 76,
        atk: 30,
        skill: {
            type: "elem",
            target: 1,
            value: 0.75
        }
    },
    {
        name:"EDANA",
        type:2,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "gids",
        hp: 72,
        atk: 36,
        skill: {
            type: "elem",
            target: 2,
            value: 0.75
        },
    },
    {
        name:"DYBBUK",
        type:3,
        rarity:2, // 0 common, 1 rare, 2 legendary, 3 super
        img: "98p6",
        hp: 80,
        atk: 30,
        skill: {
            type: "elem",
            target: 3,
            value: 0.75
        },
    },
    // 118,119,120,121: ASCENDED PVE
    {
        name:"ASCENDED SHYGU",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "023t",
        hp: 85,
        atk: 135,
        skill: {
            type: "buffdef",
            target: 0,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED THERT",
        type:1,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "0hia",
        hp: 180,
        atk: 70,
        skill: {
            type: "buffdef",
            target: 1,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED LORD KIRK",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "0686",
        hp: 80,
        atk: 160,
        skill: {
            type: "buffdef",
            target: 2,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED NEPTUNIUS",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "0b3i",
        hp: 75,
        atk: 175,
        skill: {
            type: "buffdef",
            target: 3,
            value: 0.1819
        },
        pve: true,
    },// ASCENDED PVE vs 122,123,124,125
    {
        name:"ASCENDED HOSOKAWA",
        type:0,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "hu9w", //FIX THE IMG
        hp: 106,
        atk: 124,
        skill: {
            type: "buffatk",
            target: 0,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED TAKEDA",
        type:1,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "qkx4", //FIX THE IMG
        hp: 82,
        atk: 164,
        skill: {
            type: "buffatk",
            target: 1,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED HIRATE",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "29l6", //FIX THE IMG
        hp: 96,
        atk: 144,
        skill: {
            type: "buffatk",
            target: 2,
            value: 0.1819
        },
        pve: true,
    },{
        name:"ASCENDED HATTORI",
        type:3,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "ikae", //FIX THE IMG
        hp: 114,
        atk: 126,
        skill: {
            type: "buffatk",
            target: 3,
            value: 0.1819
        },
        pve: true,
    },{ // new WORLD boss: 126
        name:"DOYENNE",
        type:3,
        rarity:5, //WORLD BOSS
        img:"pm0s",
        hp: 1e300,
        atk: 109,
        skill: {
            type: "dampen",
            target: -1,
            value: 5000
        },
    },
    // Halloween Heroes 2018 : 127,128,129
    {
        name:"BILLY",
        type:1,
        rarity:0, // 0 common, 1 rare, 2 legendary
        img: "sm4l",
        hp: 30,
        atk: 40,
        skill: {
            type: "explosion",
            target: 1,
            value: 100
        }
    },{
        name:"SANQUEEN",
        type:3,
        rarity:1, // 0 common, 1 rare, 2 legendary
        img: "ite9",
        hp: 88,
        atk: 22,
        skill: {
            type: "leech",
            target: -1,
            value: 0.8
        }
    },{
        name:"CLIODHNA",
        type:0,
        rarity:2, // 0 common, 1 rare, 2 legendary
        img: "649s",
        hp: 150,
        atk: 60,
        skill: {
            type: "evolve",
            target: -1,
            value: 1
        }
    },
    // GUY FAWKES : 130
    {
        name:"GUY",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary
        img: "2wiw",
        hp: 340,
        atk: 64,
        skill: {
            type: "anarchy",
            target: -1,
            value: 1
        }
    },{
        name:"ASCENDED DEFILE",
        type:2,
        rarity:3, // 0 common, 1 rare, 2 legendary, 3 super
        img: "g5um",
        hp: 52,
        atk: 126,
        skill: {
            type: "moob",
            target: -1,
            value: 150
        },
        pve: true
    },
];

function level2stats (hero,level) {
    var hp = hero.hp;
    var atk =  hero.atk;
    var points = level - 1;
    if (hero.rarity==1) points *= 2;
    else if (hero.rarity==2) points *= 6;
    else if (hero.rarity==3) points *= 12;
    return {
        hp:hp + Math.round(points*hp/(hp+atk)),
        atk:atk + Math.round(points*atk/(hp+atk))
    };
}


function WBatk (lvl) {
    return 1;
    var dmg=0;
    var d=0;
    for (var i=0; i<lvl; ++i) {
        ++d;
        if (d>=dmg) {
            d=0;
            dmg++;
        }
    }
    return dmg;
}
var gBattle=undefined;
function beginBattle(date,namea,nameb,rowa,rowb,back,heroa,herob,tinfo,next) {
    var res = {
        result: undefined,
        dmga: 0,
        dmgb: 0,
    }
    heroa=heroa||Array(HERO.length).fill(0);
    herob=herob||Array(HERO.length).fill(0);
    var TYPES = [3,0,1,2];
    gBattle = {
        back: back, // back button
        date: date, // date when battle happen
        left: namea, // left player name
        right: nameb, // right player name
        begin: Date.now(), // battle begin
        step: 0, // current step
        dstep: -1, // step executed
        steps: [], // list of steps
        you: [undefined,undefined,undefined,undefined,undefined,undefined,undefined], // your status
        other: [undefined,undefined,undefined,undefined,undefined,undefined,undefined], // other status
        turn: -1,
        heroa:heroa,
        herob:herob,
        costa:setupCost(rowa,heroa),
        costb:setupCost(rowb,herob),
        tinfo: tinfo,
        next: next,
        isBossBattle: false,
        bossDmg: 0
    }
    var youS = [];
    var otherS = [];
    var you = [];
    var other = [];
    var isRatioYou = false;
    var isRatioOther = false;
    var isAoeYou = [];
    var isAoeOther = [];
    var youSeed = 1;
    var otherSeed = 1;
    // load fighting monsters
    for (var i=0; i<rowa.length; ++i) {
        otherSeed=otherSeed*Math.abs(rowa[i])+1;
        youSeed=youSeed*Math.abs(rowb[i])+1;
    }
    for (var i=0; i<rowa.length; ++i) {
        if (rowa[i]>-1) {
            you.push({
                id: rowa[i],
                hp:MONSTERS[rowa[i]].hp,
                mhp:MONSTERS[rowa[i]].hp,
                atk:MONSTERS[rowa[i]].atk,
                type:MONSTERS[rowa[i]].type,
            });
            youS.push(undefined);
        } else if (rowa[i]<-1) {
            var hid=-(rowa[i]+2);
            var lvl=heroa[hid];
            var hp=HERO[hid].hp;
            var atk=HERO[hid].atk;
            var points = lvl - 1;
            
            if (HERO[hid].rarity==1) points *= 2;
            else if (HERO[hid].rarity==2) points *= 6;
            else if (HERO[hid].rarity==3) points *= 12;
            else if (HERO[hid].rarity>3) points *= 0;
            if (HERO[hid].skill.type=="evo") {
                points*=HERO[hid].skill.value;
            }
            you.push({
                id: rowa[i],
                lvl: heroa[hid],
                hp:HERO[hid].hp+Math.round(points*hp/(hp+atk)),
                mhp:HERO[hid].hp+Math.round(points*hp/(hp+atk)),
                atk:HERO[hid].atk+Math.round(points*atk/(hp+atk)),
                type:HERO[hid].type,
            });
            youS.push(HERO[hid].skill);
            if (HERO[hid].skill.type=="ratio") {
                isRatioYou=true;
            } else if (HERO[hid].skill.type=="paoe") {
                isAoeYou.push(heroa[hid]);
            } else if (HERO[hid].skill.type=="ratk") {
                var val = youSeed%(HERO[hid].skill.value+1);
                you[you.length-1].atk+=val;
                you[you.length-1].hp+=val;
                you[you.length-1].mhp+=val;
            }
        }
        if (rowb[i]>-1) {
            other.push({
                id: rowb[i],
                hp:MONSTERS[rowb[i]].hp,
                mhp:MONSTERS[rowb[i]].hp,
                atk:MONSTERS[rowb[i]].atk,
                type:MONSTERS[rowb[i]].type,
            });
            otherS.push(undefined);
        } else if (rowb[i]<-1) {
            var hid=-(rowb[i]+2);
            var lvl=herob[hid];
            var hp=HERO[hid].hp;
            var atk=HERO[hid].atk;
            var points = lvl - 1;
            if (HERO[hid].rarity==1) points *= 2;
            else if (HERO[hid].rarity==2) points *= 6;
            else if (HERO[hid].rarity==3) points *= 12;
            else if (HERO[hid].rarity>3) points *= 0;
            if (HERO[hid].skill.type=="evo") {
                points*=HERO[hid].skill.value;
            }
            other.push({
                id: rowb[i],
                lvl: herob[hid],
                hp:HERO[hid].hp+Math.round(points*hp/(hp+atk)),
                mhp:HERO[hid].hp+Math.round(points*hp/(hp+atk)),
                atk:HERO[hid].atk+Math.round(points*atk/(hp+atk)),
                type:HERO[hid].type,
            });
            otherS.push(HERO[hid].skill);
            if (HERO[hid].rarity==5) {
                other[other.length-1].atk+=WBatk(other[other.length-1].lvl);
                gBattle.isBossBattle = true;
            }
            if (HERO[hid].skill.type=="ratio") {
                isRatioOther=true;
            } else if (HERO[hid].skill.type=="paoe") {
                isAoeOther.push(herob[hid]);
            } else if (HERO[hid].skill.type=="ratk") {
                var val = otherSeed%(HERO[hid].skill.value+1);
                other[other.length-1].atk+=val;
                other[other.length-1].hp+=val;
                other[other.length-1].mhp+=val;
            }
        }
    }
    var youLen = you.length-1;
    var otherLen = other.length-1;
    if (isRatioYou&&youLen<otherLen) {
        for (var i=otherLen; i>=0;--i) {
            other[i].hp=Math.floor(other[i].hp*((youLen+1)/(otherLen+1)));
            other[i].mhp=Math.floor(other[i].mhp*((youLen+1)/(otherLen+1)));
        }
    }
    if (isRatioOther&&otherLen<youLen) {
        for (var i=youLen; i>=0;--i) {
            you[i].hp=Math.floor(you[i].hp*((otherLen+1)/(youLen+1)));
            you[i].mhp=Math.floor(you[i].mhp*((otherLen+1)/(youLen+1)));
        }
    }
    // spawn monsters
    for (var i=Math.max(you.length,other.length); i>=0; --i) {
        if (i<other.length) {
            gBattle.steps.push({
                action:"SPAWN",
                target:"other",
                pos:5-i,
                data:{
                    id:other[other.length-1-i].id,
                    hp:other[other.length-1-i].hp,
                    mhp:other[other.length-1-i].hp,
                    lvl:other[other.length-1-i].lvl||0,
                    atk:other[other.length-1-i].atk
                },
            });
        }
        if (i<you.length) {
            gBattle.steps.push({
                action:"SPAWN",
                target:"you",
                pos:5-i,
                data:{
                    id:you[you.length-1-i].id,
                    hp:you[you.length-1-i].hp,
                    mhp:you[you.length-1-i].hp,
                    lvl:you[you.length-1-i].lvl||0,
                    atk:you[you.length-1-i].atk
                }
            });
        }
    }
    // get to the frey
    if (other.length>0) {
        gBattle.steps.push({
            action:"FIGHT",
            target:"other",
        });
    }
    if (you.length>0) {
        gBattle.steps.push({
            action:"FIGHT",
            target:"you",
        });
    }
    while (isAoeYou.length) {
        var dmg = Math.round(isAoeYou.pop());
        for (var i=0; i<other.length; ++i) {
            other[i].hp-=dmg;
        }  
        res.dmga+=dmg;
        gBattle.steps.push({
            action:"AOE",
            target:"other",
            damage:dmg,
        });  
    } 
    while (isAoeOther.length) {
        var dmg = Math.round(isAoeOther.pop());
        for (var i=0; i<you.length; ++i) {
            you[i].hp-=dmg;
        }  
        res.dmgb+=dmg;
        gBattle.steps.push({
            action:"AOE",
            target:"you",
            damage:dmg,
        });  
    }
    var todoYou=you.length-1;
    var todoOther=other.length-1;
    var limit = 100;
    while (todoYou>=0 && todoOther>=0 && limit) {
        var yMul = 1.5;
        var oMul = 1.5;
        if (youS[todoYou]!==undefined && you[todoYou].hp>0&&youS[todoYou].type=="elem") yMul += youS[todoYou].value;
        if (otherS[todoOther]!==undefined && other[todoOther].hp>0&&otherS[todoOther].type=="elem") oMul += otherS[todoOther].value;
        var youMul=TYPES[you[todoYou].type]==other[todoOther].type?yMul:1;
        var otherMul=TYPES[other[todoOther].type]==you[todoYou].type?oMul:1;
        var youDamage=you[todoYou].atk*youMul;
        var otherDamage=other[todoOther].atk*otherMul;
        var youHeal=0;
        var otherHeal=0;
        var youAoe=0;
        var otherAoe=0;
        var youPierce=0;
        var otherPierce=0;
        var youBuff=0;
        var otherBuff=0;
        var queue = [];
        var youHp=1;
        var otherHp=1;
        var youdarr=[1,0,0,0,0,0];
        var otherdarr=[1,0,0,0,0,0];
        var youdebuff=1;
        var otherdebuff=1;
        var youCounter=0;
        var otherCounter=0;
        var youCritMul=1;
        var otherCritMul=1;
        var youMoob=0;
        var otherMoob=0;
        var youTank = {id:-1,val:0};
        var otherTank={id:-1,val:0};
        var youDampen=-1;
        var otherDampen=-1;
        var youExplosion=0;
        var otherExplosion=0;
        var youLeech=0;
        var otherLeech=0;
        var youEvolve =0;
        var otherEvolve=0;
        for (var i=todoYou; i>=0;--i) {
            if (youS[i]!==undefined && you[i].hp>0) {
                if (youS[i].type=="dmg") {
                    if (youS[i].target==-1 || youS[i].target==you[todoYou].type) {
                        youDamage+=youS[i].value*youMul;
                    }
                } else if (youS[i].type=="def") {
                    if (youS[i].target==-1 || youS[i].target==you[todoYou].type) {
                        otherDamage-=youS[i].value;
                        if (otherDamage<0) otherDamage=0;
                    }
                } else if (youS[i].type=="buffdef"||youS[i].type=="buffboth") {
                    if (youS[i].target==-1 || youS[i].target==you[todoYou].type) {
                        otherDamage-=Math.floor(you[i].lvl*youS[i].value);
                        if (otherDamage<0) otherDamage=0;
                    }
                } 
                if (youS[i].type=="buffatk"||youS[i].type=="buffboth") {
                    if (youS[i].target==-1 || youS[i].target==you[todoYou].type) {
                        youDamage+=Math.floor(you[i].lvl*youS[i].value)*youMul;
                    }
                } else if (youS[i].type=="extra") {
                    if (youS[i].target==-1 || youS[i].target==you[todoYou].type) {
                        otherDamage-=youS[i].value;
                        youDamage+=youS[i].value*youMul;
                        if (otherDamage<0) otherDamage=0;
                    }
                } else if (youS[i].type=="heal") {
                    youHeal+=youS[i].value;
                } else if (youS[i].type=="buffheal") {
                    youHeal+=Math.floor(you[i].lvl*youS[i].value);
                } else if (youS[i].type=="aoe") {
                    youAoe+=youS[i].value;
                } else if (youS[i].type=="buffaoe") {
                    youAoe+=Math.floor(you[i].lvl*youS[i].value);
                } else if (youS[i].type=="buffahe") {
                    youAoe+=Math.floor(you[i].lvl*youS[i].value);
                    youHeal+=Math.floor(you[i].lvl*youS[i].value);
                } else if (i==todoYou&&youS[i].type=="pierce") {
                    youPierce=you[todoYou].atk;
                } else if (i==todoYou&&youS[i].type=="buff") {
                    you[todoYou].atk*=youS[i].value;
                    youBuff=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="purity"&&you[todoYou].type==other[todoOther].type) {
                    youDamage*=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="rainbow") {
                    var types = [0,0,0,0];
                    var todotypes = 4;
                    for (var j=0; j<todoYou; ++j) {
                        if (types[you[j].type]==0) {
                            --todotypes;
                            ++types[you[j].type]
                        }
                    }
                    if (todotypes==0) youDamage+=youS[i].value*youMul;
                } else if (youS[i].type=="turna") {
                    you[i].atk += youS[i].value;
                    queue.push({
                        action:"CBUFF",
                        target:"you",
                        id:todoYou-i,
                        damage:youS[i].value,
                    });
                } else if (i==todoYou&&youS[i].type=="ban") {
                    queue.push({
                        action:"BAN",
                        target:"you",
                        factor:youS[i].value,
                    });
                    youHp=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="counter") {
                    youCounter=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="moob") {
                    youMoob=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="rico") {
                    for (var x=1; x<=youS[i].target; ++x) {
                        youdarr[x]=youdarr[x-1]*youS[i].value;
                    }
                } else if (i==todoYou&&youS[i].type=="rtrg") {
                    youdarr=[0,0,0,0,0,0];
                    var sspos = ((youSeed+(limit+1)*(limit+1)*(limit+1))%Math.round(youSeed/(limit+1)+(limit+1)*(limit+1)))%(todoOther+1);
                    youdarr[sspos]=1;
                } else if (youS[i].type=="debuff") {
                    youdebuff-=you[i].lvl*youS[i].value;
                } else if (i==todoYou&&youS[i].type=="rcrit") {
                    youCritMul*=youS[i].value;
                } else if (i!==todoYou&&youS[i].type=="tank") {
                    youTank={
                        id:i,
                        val:youS[i].value
                    }
                } else if (i==todoYou&&youS[i].type=="dampen") {
                    youDampen=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="explosion") {
                    youExplosion=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="leech") {
                    youLeech=youS[i].value;
                } else if (i==todoYou&&youS[i].type=="evolve") {
                    youEvolve=youS[i].value;
                }
            } else if (youS[i]==undefined && you[i].hp>0) {
                if (youS[todoYou]!==undefined && youS[todoYou].type=="mon") {
                    youDamage*=youS[todoYou].value;
                }
            } 
        }
        for (var i=todoOther; i>=0;--i) {
            if (otherS[i]!==undefined && other[i].hp>0) {
                if (otherS[i].type=="dmg") {
                    if (otherS[i].target==-1 || otherS[i].target==other[todoOther].type) {
                        otherDamage+=otherS[i].value*otherMul;
                    }
                } else if (otherS[i].type=="def") {
                    if (otherS[i].target==-1 || otherS[i].target==other[todoOther].type) {
                        youDamage-=otherS[i].value;
                        if (youDamage<0) youDamage=0;
                    }
                } else if (otherS[i].type=="buffdef"||otherS[i].type=="buffboth") {
                    if (otherS[i].target==-1 || otherS[i].target==other[todoOther].type) {
                        youDamage-=Math.floor(other[i].lvl*otherS[i].value);
                        if (youDamage<0) youDamage=0;
                    }
                } 
                if (otherS[i].type=="buffatk"||otherS[i].type=="buffboth") {
                    if (otherS[i].target==-1 || otherS[i].target==other[todoOther].type) {
                        otherDamage+=Math.floor(other[i].lvl*otherS[i].value)*otherMul;
                    }
                } else if (otherS[i].type=="extra") {
                    if (otherS[i].target==-1 || otherS[i].target==other[todoOther].type) {
                        youDamage-=otherS[i].value;
                        otherDamage+=otherS[i].value*otherMul;
                        if (youDamage<0) youDamage=0;
                    }
                } else if (otherS[i].type=="heal") {
                    otherHeal+=otherS[i].value;
                } else if (otherS[i].type=="buffheal") {
                    otherHeal+=Math.floor(other[i].lvl*otherS[i].value);
                } else if (otherS[i].type=="aoe") {
                    otherAoe+=otherS[i].value;
                } else if (otherS[i].type=="buffaoe") {
                    otherAoe+=Math.floor(other[i].lvl*otherS[i].value);
                } else if (otherS[i].type=="buffahe") {
                    otherAoe+=Math.floor(other[i].lvl*otherS[i].value);
                    otherHeal+=Math.floor(other[i].lvl*otherS[i].value);
                } else if (i==todoOther&&otherS[i].type=="pierce") {
                    otherPierce=other[todoOther].atk;
                } else if (i==todoOther&&otherS[i].type=="buff") {
                    other[todoOther].atk*=otherS[i].value;
                    otherBuff=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="rainbow") {
                    var types = [0,0,0,0];
                    var todotypes = 4;
                    for (var j=0; j<todoOther; ++j) {
                        if (types[other[j].type]==0) {
                            --todotypes;
                            ++types[other[j].type]
                        }
                    }
                    if (todotypes==0) otherDamage+=otherS[i].value*otherMul;
                } else if (i==todoOther&&otherS[i].type=="purity"&&you[todoYou].type==other[todoOther].type) {
                    otherDamage*=otherS[i].value;
                } else if (otherS[i].type=="turna") {
                    other[i].atk += otherS[i].value;
                    queue.push({
                        action:"CBUFF",
                        target:"other",
                        id:todoOther-i,
                        damage:otherS[i].value,
                    });
                } else if (i==todoOther&&otherS[i].type=="ban") {
                    queue.push({
                        action:"BAN",
                        target:"other",
                        factor:otherS[i].value,
                    });
                    otherHp=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="counter") {
                    otherCounter=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="moob") {
                    otherMoob=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="rico") {
                    for (var x=1; x<=otherS[i].target; ++x) {
                        otherdarr[x]=otherdarr[x-1]*otherS[i].value;
                    }
                } else if (i==todoOther&&otherS[i].type=="rtrg") {
                    otherdarr=[0,0,0,0,0,0];
                    var sspos = ((otherSeed+(limit+1)*(limit+1)*(limit+1))%Math.round(otherSeed/(limit+1)+(limit+1)*(limit+1)))%(todoYou+1);
                    otherdarr[sspos]=1;
                } else if (otherS[i].type=="debuff") {
                    otherdebuff-=other[i].lvl*otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="rcrit") {
                    otherCritMul*=otherS[i].value;
                } else if (i!==todoOther&&otherS[i].type=="tank") {
                    otherTank={
                        id:i,
                        val:otherS[i].value
                    }
                } else if (i==todoOther&&otherS[i].type=="dampen") {
                    otherDampen=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="explosion") {
                    otherExplosion=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="leech") {
                    otherLeech=otherS[i].value;
                } else if (i==todoOther&&otherS[i].type=="evolve") {
                    otherEvolve=otherS[i].value;
                }
            } else if (otherS[i]==undefined && other[i].hp>0) {
                if (otherS[todoOther]!==undefined && otherS[todoOther].type=="mon") {
                    otherDamage*=otherS[todoOther].value;
                }
            } 
        }
        if ( ((youSeed+(limit+1)*(limit+1)*(limit+1))%Math.round(youSeed/(limit+1)+(limit+1)*(limit+1)))%2==1) youDamage*=youCritMul;
        if (((otherSeed+(limit+1)*(limit+1)*(limit+1))%Math.round(otherSeed/(limit+1)+(limit+1)*(limit+1)))%2==1) otherDamage*=otherCritMul;
        if (otherDampen>=0 && youDamage>otherDampen) youDamage=0;
        if (youDampen>=0 && otherDamage>youDampen) otherDamage=0;
        res.dmga+=youDamage;
        res.dmgb+=otherDamage;
        if (youTank.id!==-1) {
            var tankDamage=(youTank.val)*otherDamage;
            you[youTank.id].hp-=Math.ceil(tankDamage);
            otherDamage=(1-youTank.val)*otherDamage;
            gBattle.steps.push({
                action:"HIT",
                target:"you",
                damage:Math.ceil(tankDamage),
                isCrit:otherMul>=1.5,
                pos:todoYou-youTank.id,
            });
        }
        gBattle.steps.push({
            action:"HIT",
            target:"you",
            damage:Math.ceil(otherDamage),
            isCrit:otherMul>=1.5,
            pos:0,
        });
        
        
        if (youCounter>0) {
            gBattle.steps.push({
                action:"HIT",
                target:"other",
                damage:Math.ceil(otherDamage*youCounter),
                isCrit:true,
                pos:0,
            });
            other[todoOther].hp-=Math.ceil(otherDamage*youCounter);
            res.dmgb+=Math.ceil(otherDamage*youCounter);
        }
        
        for (var i=todoYou; i>=0; --i) {
            var deal=Math.ceil(otherDamage*otherdarr[todoYou-i]*(i==todoYou?1:youdebuff));
            you[i].hp-=deal;
            if (i!=todoYou && deal>0) {
                gBattle.steps.push({
                    action:"HIT",
                    target:"you",
                    damage:deal,
                    isCrit:otherMul>=1.5,
                    pos:todoYou-i,
                });
            }
        }
        if (otherPierce>0) {
            gBattle.steps.push({
                action:"PIERCE",
                target:"you",
                damage:Math.ceil(otherPierce*youdebuff),
            });
        } else if (otherBuff>0) {
            gBattle.steps.push({
                action:"BUFF",
                target:"other",
                damage:Math.ceil(otherBuff*youdebuff),
            });
        } else if (otherEvolve>0) {
            gBattle.steps.push({
                action:"BUFF2",
                target:"other",
                damage:Math.ceil(you[todoYou].atk*otherEvolve),
            });
            other[todoOther].atk+=Math.ceil(you[todoYou].atk*otherEvolve);
        }
        
        if (otherTank.id!==-1) {
            var tankDamage=(otherTank.val)*youDamage;
            other[otherTank.id].hp-=Math.ceil(tankDamage);
            youDamage=(1-otherTank.val)*youDamage;
            gBattle.steps.push({
                action:"HIT",
                target:"other",
                damage:Math.ceil(tankDamage),
                isCrit:otherMul>=1.5,
                pos:todoOther-otherTank.id,
            });
        }
        gBattle.steps.push({
            action:"HIT",
            target:"other",
            damage:Math.ceil(youDamage),
            isCrit:youMul>=1.5,
            pos:0,
            turn:true,
        });

        
        
        if (otherCounter>0) {
            gBattle.steps.push({
                action:"HIT",
                target:"you",
                damage:Math.ceil(youDamage*otherCounter),
                isCrit:true,
                pos:0,
            });
            you[todoYou].hp-=Math.ceil(youDamage*otherCounter);
            res.dmga+=Math.ceil(youDamage*otherCounter);
        }
        for (var i=todoOther; i>=0; --i) {
            var deal=Math.ceil(youDamage*youdarr[todoOther-i]*(i==todoOther?1:otherdebuff))
            other[i].hp-=deal;
            if (i!=todoOther && deal>0) {
                gBattle.steps.push({
                    action:"HIT",
                    target:"other",
                    damage:deal,
                    isCrit:youMul>=1.5,
                    pos:todoOther-i,
                });
            }
        }
        if (youPierce>0) {
            gBattle.steps.push({
                action:"PIERCE",
                target:"other",
                damage:Math.ceil(youPierce*otherdebuff),
            });
        } else if (youBuff>0) {
            gBattle.steps.push({
                action:"BUFF",
                target:"you",
                damage:Math.ceil(youBuff*otherdebuff),
            });
        } else if (youEvolve>0) {
            gBattle.steps.push({
                action:"BUFF2",
                target:"you",
                damage:Math.ceil(other[todoOther].atk*youEvolve),
            });
            you[todoYou].atk+=Math.ceil(other[todoOther].atk*youEvolve);
        }
        //you[todoYou].hp-=Math.ceil(otherDamage);
        //other[todoOther].hp-=Math.ceil(youDamage);
        if (youLeech>0) {
            gBattle.steps.push({
                action:"HEAL",
                target:"you",
                damage:Math.ceil(youDamage*youLeech),
                one: true,
            });
        }
        if (otherLeech>0) {
            gBattle.steps.push({
                action:"HEAL",
                target:"other",
                damage:Math.ceil(otherDamage*otherLeech),
                one: true,
            });
        }
        

        if (you[todoYou].hp<=0 && youS[todoYou]!==undefined && youS[todoYou].type=="boom") {
            youAoe+=Math.round(you[todoYou].atk*youS[todoYou].value);
        }
        if (other[todoOther].hp<=0 && otherS[todoOther]!==undefined && otherS[todoOther].type=="boom") {
            otherAoe+=Math.round(other[todoOther].atk*otherS[todoOther].value);
        }
        if (you[todoYou].hp<=0 && otherMoob>0) {
            otherAoe+=otherMoob;
        }
        if (other[todoOther].hp<=0 && youMoob>0) {
            youAoe+=youMoob;
        }
        
        if (otherAoe>0) {
            gBattle.steps.push({
                action:"AOE",
                target:"you",
                damage:Math.ceil(otherAoe*youdebuff),
            });
            res.dmgb+=Math.ceil(otherAoe*youdebuff);
        }
        if (youAoe>0) {
            gBattle.steps.push({
                action:"AOE",
                target:"other",
                damage:Math.ceil(youAoe*otherdebuff),
            });
            res.dmga+=Math.ceil(youAoe*otherdebuff);
        }
        if (otherHeal>0) {
            gBattle.steps.push({
                action:"HEAL",
                target:"other",
                damage:Math.ceil(otherHeal*youdebuff),
            });
        }
        if (youHeal>0) {
            gBattle.steps.push({
                action:"HEAL",
                target:"you",
                damage:Math.ceil(youHeal*otherdebuff),
            });
        }
        you[todoYou].hp=Math.round(you[todoYou].hp/youHp);
        other[todoOther].hp=Math.round(other[todoOther].hp/otherHp);
        while (queue.length>0) {
            gBattle.steps.push(queue.shift());
        }
        for (var i=todoYou; i>=0;--i) {
            you[i].hp-=Math.ceil(otherAoe*youdebuff);
            if (i!=todoYou) you[i].hp-=Math.ceil(otherPierce*youdebuff);
            if (you[i].hp>0) {
                you[i].hp+=Math.ceil(youHeal*otherdebuff);
                if (i==todoYou) you[i].hp+=Math.ceil(youDamage*youLeech);
                if (you[i].hp>you[i].mhp) you[i].hp=you[i].mhp;
            }
        }
        for (var i=todoOther; i>=0;--i) {
            other[i].hp-=Math.ceil(youAoe*otherdebuff);
            if (i!=todoOther) other[i].hp-=Math.ceil(youPierce*otherdebuff);
            if (other[i].hp>0) {
                other[i].hp+=Math.ceil(otherHeal*youdebuff);
                if (i==todoOther) other[i].hp+=Math.ceil(otherDamage*otherLeech);
                if (other[i].hp>other[i].mhp) other[i].hp=other[i].mhp;
            }
        }
        var youDied = false;
        var otherDied = false;
        while (todoOther>=0 && other[todoOther].hp<=0) {
            gBattle.steps.push({
                action:"DIE",
                target:"other",
                id:other[todoOther].id
            });
            --todoOther;
            otherDied = true;
            if (todoOther>=0) {
                gBattle.steps.push({
                    action:"FIGHT",
                    target:"other",
                });
            }
        }
        while (todoYou>=0 && you[todoYou].hp<=0) {
            gBattle.steps.push({
                action:"DIE",
                target:"you",
                id:you[todoYou].id
            });
            --todoYou;
            youDied = true;
            if (todoYou>=0) {
                gBattle.steps.push({
                    action:"FIGHT",
                    target:"you",
                });
            }
        }
        if (youDied && youExplosion>0) {
            gBattle.steps.push({
                action:"HIT",
                target:"other",
                damage:youExplosion,
                isCrit:false,
                pos:0,
                silent:true,
            });
        }
        if (otherDied && otherExplosion>0) {
            gBattle.steps.push({
                action:"HIT",
                target:"you",
                damage:otherExplosion,
                isCrit:false,
                pos:0,
                silent:true,
            });
        }
        --limit;
    }
    if (todoYou<0&&todoOther<0) {
        gBattle.steps.push({
            action:"RESULT",
            target:"draw",
        });
        res.result=0;
    } else if (todoYou<0) {
        gBattle.steps.push({
            action:"RESULT",
            target:"loss",
        });
        res.result=-1;
    } else {
        gBattle.steps.push({
            action:"RESULT",
            target:"win",
        });
        res.result=1;
    }
    return res;
}*/

var HEROSHOP = [
    
];

var WCSHOP = [
    {
        name: "0dzn",
        icon: "0bl1",
        price: 1000,
        curr: "0gfn",
        type: "UM",
        reward: {
            SD: "850K",
            EM: 1,
            KEYS: 10,
        },
        text:"850000 SD + 10 Keys + 1 Enhance Miracles",
        text1:"You can buy one every week (Starting from Saturday)",
    },
    {
        name: "0ltm",
        icon: "0o8h",
        price: 100,
        curr: "06rf",
        type: "KRED",
        reward: {
            SD: "1,3M",
            EM: 1,
            KEYS: 10,
        },
        id:11,
        text:"1300000 SD + 10 Keys + 1 Enhance Miracles",
        text1:"You can buy one every week (Starting from Saturday)",
    },
    {
        name: "0fw0",
        icon: "07co",
        price: 250,
        curr: "01ug",
        type: "KRED",
        reward: {
            SD: "3,4M",
            EM: 3,
            KEYS: 20,
        },
        id:12,
        text:"3400000 SD + 20 Keys + 3 Enhance Miracles",
        text1:"You can buy one every week (Starting from Saturday)",
    },

];

var PVE = [
    {
        bg: "0gks",
        x: 0,
        y: 0,
        s: 1,
        setup: [19,-1,-1,-1,-1,-1],
        r: [100,200,400],
    },{
        bg: "0nai_0",
        x: 0,
        y: 100,
        s: 0.9,
        setup: [0,2,0,2,0,2],
        r: [150,300,600],
    },{
        bg: "0kb8",
        x: 0,
        y: 200,
        s: 1,
        setup: [16,18,-1,-1,-1,-1],
        r: [200,400,800],
    },{
        bg: "034z_0",
        x: 0,
        y: 180,
        s: 1.2,
        setup: [8,10,7,5,4,6],
        r: [250,500,1000],
    },{
        bg: "0mp9",
        x: 80,
        y: 80,
        s: 2,
        setup: [9,11,9,11,9,11],
        r: [300,600,1200],
    },{
        bg: "0c99",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [13,3,14,12,1,15],
        r: [500,1000,2000],
    },{
        bg: "03ac",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [0,6,8,14,16,18],
        r: [600,1200,2400],
    },{
        bg: "0ang_2",
        x: 45,
        y: 0,
        s: 0.6,
        setup: [13,15,17,19,15,13],
        r: [700,1400,2800],
    },{
        bg: "0jpr",
        x: 50,
        y: 50,
        s: 1,
        setup: [14,15,16,17,18,19],
        r: [800,1600,3200],
    },{
        bg: "0cws_0",
        x: 0,
        y: 50,
        s: 1.2,
        setup: [19,17,18,16,17,19],
        r: [900,1800,3600],
    },{ // 10
        bg: "0g8w",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [20,16,21,17,22,18],
        r: [1000,2000,4000],
    },{
        bg: "0mlz",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [23,22,21,18,19,17],
        r: [1200,2400,4800],
    },{
        bg: "0kb8",
        x: 150/2,
        y: 350/2,
        s: 0.8/2,
        setup: [8,12,16,20,24,28],
        r: [1400,2800,5600],
    },{
        bg: "09yp",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [21,21,25,18,22,26],
        r: [1600,3200,6400],
    },{
        bg: "0p9k",
        x: 12,
        y: 13,
        s: 0.6,
        setup: [31,29,23,21,19,-1],
        r: [1800,3600,7200],
    },{ // 15
        bg: "06k3",
        x: 8,
        y: 8,
        s: 0.7,
        setup: [28,30,32,-1,-1,-1],
        r: [2000,4000,8000],
    },{
        bg: "0exc",
        x: 4,
        y: 8,
        s: 0.7,
        setup: [31,29,27,21,19,-1],
        r: [2300,4600,9200],
    },{
        bg: "02kk",
        x: 150/2,
        y: 350/2,
        s: 0.7/2,
        setup: [28,24,18,20,22,26],
        r: [2600,5200,10400],
    },{
        bg: "05s2",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [33,34,35,25,-1,-1],
        r: [2900,5800,11600],
    },{
        bg: "0f4i",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [36,30,24,18,12,6],
        r: [3200,6400,12800],
    },{
        bg: "04s6",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [39,36,39,-1,-1,-1],
        r: [3500,7000,14000],
    },{
        bg: "093g",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [38,37,35,-1,-1,-1],
        r: [3900,7800,15600],
    },{
        bg: "0otu",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [29,30,31,32,33,-1],
        r: [4300,8600,17200],
    },{
        bg: "0lqw",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [32,30,28,26,24,22],
        r: [4700,9400,18800],
    },{
        bg: "0b0f",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [31,27,31,31,27,31],
        r: [5100,10200,20400]
    }
    // Finish 5 Page - Start 6 Page (26 Quest)
    ,{
        bg: "05er",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [38,29,25,31,27,32],
        r: [5500,11000,22000]
    },{
        bg: "0dba",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [27,27,26,35,34,33],
        r: [6000,12000,24000]
    },{
        bg: "0366",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [32,36,32,28,36,-1],
        r: [6500,13000,26000]
    },{
        bg: "0nuh",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [32,32,29,26,27,36],
        r: [7000,14000,28000]
    },{
        bg: "0j14",
        x: -4,
        y: -3.8,
        s: 0.6,
        setup: [38,37,37,37,-1,-1],
        r: [7500,15000,30000]
    },{
        bg: "06gt",
        x: 14,
        y: 14,
        s: 0.6,
        setup: [24,36,34,34,38,33],
        r: [8000,16000,32000]
    },{
        bg: "09gi",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [39,36,33,38,32,3],
        r: [8600,17200,34400]
    },{
        bg: "0bye",
        x: 0,
        y: 0,
        s: 1.6,
        setup: [38,32,34,32,32,33],
        r: [9200,18400,36800]
    },{
        bg: "0dkk_0",
        x: -9,
        y: -9,
        s: 0.6,
        setup: [36,36,32,35,33,30],
        r: [9800,19600,39200]
    },{
        bg: "0o5a",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [38,36,36,39,31,31],
        r: [10400,20800,41600]
    },{
        bg: "0m91",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [36,36,36,38,36,28],
        r: [11000,22000,44000]
    },{
        bg: "0nd0",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [37,38,38,37,36,29],
        r: [11700,23400,46800]
    },{
        bg: "0nyh",
        x: 1,
        y: 5,
        s: 0.75,
        setup: [39,39,36,39,37,38],
        r: [12400,24800,49600]
    },{
        bg: "0kle",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [36,36,37,39,36,35],
        r: [13100,26200,52400]
    },{
        bg: "0ogl",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [36,39,36,39,36,39],
        r: [13800,27600,55200]
    },{
        bg: "0g8r",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [44,42,40,41,45,-1],
        r: [14600,29200,58400]
    },{
        bg: "0hel",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [40,41,40,41,40,40],
        r: [15400,30800,61600]
    },{
        bg: "0bn9",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [45,44,39,36,40,28],
        r: [16200,32400,64800]
    },{
        bg: "07vi",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [46,36,38,44,38,36],
        r: [17000,34000,68000]
    },{
        bg: "0875",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [44,43,44,44,41,15],
        r: [17800,35600,71200]
    },{
        bg: "0a5a",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [38,40,42,40,44,40],
        r: [18700,37400,74800]
    },{
        bg: "0hze",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [47,44,45,43,46,-1],
        r: [19600,39200,78400]
    },{
        bg: "0nl9",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [48,40,40,45,40,40],
        r: [20500,41000,82000]
    },{
        bg: "0lyk",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [50,50,50,48,-1,-1],
        r: [21400,42800,85600]
    },{
        bg: "012x",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [46,46,46,46,46,46],
        r: [22300,44600,89200]
    },{
        bg: "05er",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [48,41,40,48,41,40],
        r: [23300,46600,93200]
    },{
        bg: "0cju",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [46,46,48,51,50,-1],
        r: [24300,48600,97200]
    },{
        bg: "0hy2",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [44,44,46,50,50,32],
        r: [25300,50600,101200]
    },{
        bg: "0aca",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [46,42,44,44,48,48],
        r: [26300,52600,105200]
    },{
        bg: "082d",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [40,50,53,40,38,40],
        r: [27300,54600,109200]
    },
    // Finish with page 11 (Quest 55) - Start with page 12 and Quest 56
    {
        bg: "0gks",
        x: 25,
        y: 50,
        s: 1,
        setup: [47,49,50,48,50,-1],
        r: [28300,56600,113200]
    },{
        bg: "07ao",
        x: 29,
        y: 11,
        s: 0.8,
        setup: [50,50,50,47,48,37],
        r: [29300,58600,117200]
    },{
        bg: "08gg",
        x: 35,
        y: 7,
        s: 0.8,
        setup: [52,50,53,51,43,26],
        r: [30300,60600,121200]
    },{
        bg: "0a87",
        x: 42,
        y: 21,
        s: 0.8,
        setup: [55,54,52,58,28,-1],
        r: [31300,62600,125200]
    },{
        bg: "0dsd",
        x: 0,
        y: 0,
        s: 0.45,
        setup: [37,48,50,52,51,46],
        r: [32300,64600,129200]
    },{
        bg: "0giy",
        x: 0,
        y: 0,
        s: 0.395,
        setup: [44,46,47,48,49,50],
        r: [33300,66600,133200]
    },{
        bg: "0as5",
        x: 0,
        y: 0,
        s: 0.32,
        setup: [50,44,52,47,45,51],
        r: [34300,68600,137200]
    },{
        bg: "07wl",
        x: 0,
        y: 0,
        s: 0.325,
        setup: [56,55,54,57,-1,-1],
        r: [35300,70600,141200]
    },{
        bg: "0gc4",
        x: 0,
        y: 0,
        s: 0.45,
        setup: [50,45,51,53,52,45],
        r: [36300,72600,145200]
    },{
        bg: "01vh",
        x: 0,
        y: 0,
        s: 0.435,
        setup: [53,52,47,43,46,49],
        r: [37300,74600,149200]
    },{
        bg: "0ich",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [49,50,52,40,49,52],
        r: [38300,76600,153200]
    },{
        bg: "0ood",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [52,54,50,53,51,50],
        r: [39300,78600,157200]
    },{
        bg: "0orc",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [59,58,57,56,-1,-1],
        r: [40300,80600,161200]
    },{
        bg: "0ezb",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [50,52,50,53,52,50],
        r: [41300,82600,165200]
    },{
        bg: "0cy0",
        x: 0,
        y: 0,
        s: 0.45,
        setup: [54,52,53,51,52,40],
        r: [42300,84600,169200]
    },{
        bg: "0n8p",
        x: 25,
        y: 50,
        s: 1,
        setup: [53,54,51,54,52,49],
        r: [43300,86600,173200]
    },{
        bg: "082d",
        x: 25,
        y: 50,
        s: 1,
        setup: [55,52,52,52,52,39],
        r: [44300,88600,177200]
    },{
        bg: "0aca",
        x: 25,
        y: 50,
        s: 1,
        setup: [49,56,56,54,51,51],
        r: [45300,90600,181200]
    },{
        bg: "0hy2",
        x: 25,
        y: 50,
        s: 1,
        setup: [53,53,53,53,53,52],
        r: [46300,92600,185200]
    },{
        bg: "0cju",
        x: 25,
        y: 50,
        s: 1,
        setup: [58,59,57,59,59,-1],
        r: [47300,94600,189200]
    },{
        bg: "0ihd",
        x: 25,
        y: 50,
        s: 1,
        setup: [57,52,55,56,57,54],
        r: [48300,96600,193200]
    },{
        bg: "0mb5",
        x: 25,
        y: 50,
        s: 1,
        setup: [55,56,57,55,56,55],
        r: [49300,98600,197200]
    },{
        bg: "uf59",
        x: 200,
        y: 150,
        s: 0.8,
        setup: [58,58,59,59,59,59],
        r: [50300,100600,201200]
    },{
        bg: "0fhv",
        x: 25,
        y: 50,
        s: 1,
        setup: [55,56,56,56,56,56],
        r: [51300,102600,205200]
    },{
        bg: "0ggx",
        x: 25,
        y: 50,
        s: 1,
        setup: [59,59,59,59,59,58],
        r: [52300,104600,209200]
    },{
        bg: "0gks",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [61,61,61,61,54,-1],
        r: [53500,107000,214000]
    },{
        bg: "0kb8",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [58,62,60,58,56,55],
        r: [54700,109400,218800]
    },{
        bg: "0nai_2",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [63,60,59,59,58,59],
        r: [55900,111800,223600]
    },{
        bg: "034z_2",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [64,61,60,59,60,-1],
        r: [57100,114200,228400]
    },{
        bg: "02kk",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [61,65,59,59,59,58],
        r: [58300,116600,233200]
    },{
        bg: "0ijt",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [62,60,60,60,60,48],
        r: [59500,119000,238000]
    },{
        bg: "0cws_0",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [64,66,62,62,61,-1],
        r: [60700,121400,242800]
    },{
        bg: "0e0o",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [65,62,60,60,62,59],
        r: [61900,123800,247600]
    },{
        bg: "0ggx",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [60,60,56,64,66,62],
        r: [63100,126200,252400]
    },{
        bg: "0fhv",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [68,62,62,62,62,62],
        r: [64300,128600,257200]
    },{
        bg: "uf59",
        x: 200,
        y: 150,
        s: 0.8,
        setup: [59,64,66,64,61,61],
        r: [65500,131000,262000]
    },{
        bg: "0mb5",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [61,64,67,68,68,66],
        r: [66700,133400,266800]
    },{
        bg: "0a0y",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [70,63,62,62,62,69],
        r: [67900,135800,271600]
    },{
        bg: "0ihd",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [80,78,76,80,-1,-1],
        r: [69100,138200,276400]
    },{
        bg: "0cju",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [77,65,65,68,65,69],
        r: [70300,140600,281200]
    },{
        bg: "0hy2",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [61,58,71,71,72,72],
        r: [71500,143000,286000]
    },{
        bg: "0aca",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [72,69,69,74,74,71],
        r: [72700,145400,290800]
    },{
        bg: "082d",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [70,73,73,75,75,70],
        r: [73900,147800,295600]
    },{
        bg: "0n8p",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [74,76,78,73,72,74],
        r: [75100,150200,300400]
    },{
        bg: "uf59",
        x: 200,
        y: 150,
        s: 0.8,
        setup: [78,79,72,71,71,76],
        r: [76300,152600,305200]
    },{
        bg: "0gks",
        x: 0,
        y: 0,
        s: 1,
        setup: [86,79,78,81,84,-1],
        r: [77700,155400,310800]
    },{
        bg: "0c99",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [80,76,78,83,90,-1],
        r: [79100,158200,316400]
    },{
        bg: "0g8w",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [81,82,83,83,86,-1],
        r: [80500,161000,322000]
    },{
        bg: "06k3",
        x: 8,
        y: 8,
        s: 0.7,
        setup: [78,76,80,81,78,76],
        r: [81900,163800,327600]
    },{
        bg: "04s6",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [78,81,79,78,81,78],
        r: [83300,166600,333200]
    },{
        bg: "05er",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [84,88,90,87,81,-1],
        r: [84700,169400,338800]
    },{
        bg: "06gt",
        x: 14,
        y: 14,
        s: 0.6,
        setup: [81,83,80,82,76,82],
        r: [86100,172200,344400]
    },{
        bg: "0m91",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [83,81,86,84,87,87],
        r: [87500,175000,350000]
    },{
        bg: "0g8r",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [83,85,83,84,86,85],
        r: [88900,177800,355600]
    },{
        bg: "0a5a",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [87,85,83,84,87,84],
        r: [90300,180600,361200]
    },{
        bg: "05er",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [87,85,89,89,84,90],
        r: [91700,183400,366800]
    },{
        bg: "0gks",
        x: 25,
        y: 50,
        s: 1,
        setup: [82,82,87,88,91,87],
        r: [93100,186200,372400]
    },{
        bg: "0giy",
        x: 0,
        y: 0,
        s: 0.395,
        setup: [90,90,94,93,92,95],
        r: [94500,189000,378000]
    },{
        bg: "0ich",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [89,98,92,96,92,-1],
        r: [95900,191800,383600]
    },{
        bg: "0n8p",
        x: 25,
        y: 50,
        s: 1,
        setup: [88,92,99,89,90,89],
        r: [97300,194600,389200]
    },{
        bg: "0ihd",
        x: 25,
        y: 50,
        s: 1,
        setup: [91,95,90,93,92,93],
        r: [98700,197400,394800]
    },{
        bg: "0gks",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [95,94,95,92,93,93],
        r: [100100,200200,400400]
    },{
        bg: "02kk",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [95,94,94,92,88,94],
        r: [101500,203000,406000]
    },{
        bg: "0fhv",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [99,100,100,98,98,-1],
        r: [102900,205800,411600]
    },{
        bg: "0cju",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [107,105,107,105,-1,-1],
        r: [104300,208600,417200]
    }
    //121-125 Ascends
    ,{
        bg: "0nai_0",
        x: 0,
        y: 100,
        s: 0.9,
        setup: [107,106,106,107,-1,-1],
        r: [105700,211400,422800]
    },{
        bg: "03ac",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [107,106,105,104,-1,-1],
        r: [107100,214200,428400]
    },{
        bg: "0mlz",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [106,107,105,105,-1,-1],
        r: [108500,217000,434000]
    },{
        bg: "0exc",
        x: 4,
        y: 8,
        s: 0.7,
        setup: [106,107,106,108,-1,-1],
        r: [109900,219800,439600]
    },{
        bg: "093g",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [111,107,104,108,-1,-1],
        r: [111300,222600,445200]
    }
    //126-130 Ascends
    ,{
        bg: "0dba",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [111,111,111,102,-1,-1],
        r: [112700,225400,450800]
    },{
        bg: "09gi",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [111,107,107,101,-1,-1],
        r: [114100,228200,456400]
    },{
        bg: "0cws_0",
        x: 0,
        y: 100,
        s: 1,
        setup: [115,115,111,106,-1,-1],
        r: [115500,231000,462000]
    },{
        bg: "0nd0",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [115,115,107,104,-1,-1],
        r: [116900,233800,467600]
    },{
        bg: "0hel",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [115,115,111,105,-1,-1],
        r: [118300,236600,473200]
    }
    //131-135 Ascends
    ,{
        bg: "0hze",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [106,113,115,101,100,-1],
        r: [119700,239400,478800]
    },{
        bg: "0cju",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [108,100,104,114,115,-1],
        r: [121100,242200,484400]
    },{
        bg: "07ao",
        x: 29,
        y: 11,
        s: 0.8,
        setup: [108,112,113,115,-1,-1],
        r: [122500,245000,490000]
    },{
        bg: "0as5",
        x: 0,
        y: 0,
        s: 0.32,
        setup: [104,110,104,115,104,-1],
        r: [123900,247800,495600]

    },{
        bg: "0ood",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [116,104,100,119,115,-1],
        r: [125300,250600,501200]
    }
    //136-140 Ascends
    ,{
        bg: "082d",
        x: 25,
        y: 50,
        s: 1,
        setup: [111,117,106,116,102,-1],
        r: [126700,253400,506800]
    },{
        bg: "0mb5",
        x: 25,
        y: 50,
        s: 1,
        setup: [117,104,116,104,116,-1],
        r: [128100,256200,512400]
    },{
        bg: "0nai_2",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [104,104,119,110,119,104],
        r: [129500,259000,518000]
    },{
        bg: "0e0o",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [104,117,104,116,115,107],
        r: [130900,261800,523600]
    },{
        bg: "0a0y",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [104,105,116,110,117,106],
        r: [132300,264600,529200]
    },{ //141-145 Ascends - Page 29
        bg: "0gks",
        x: 0,
        y: 0,
        s: 1,
        setup: [-21,116,116,115,-1,-1], //1
        r: [133700,267400,534800]
    },{
        bg: "0nai_0",
        x: 0,
        y: 100,
        s: 0.9,
        setup: [-56,113,115,116,-1,-1], //2
        r: [135100,270200,540400]
    },{
        bg: "0kb8",
        x: 0,
        y: 200,
        s: 1,
        setup: [-30,98,119,115,117,-1], //3
        r: [136500,273000,546000]
    },{
        bg: "034z_0",
        x: 0,
        y: 180,
        s: 1.2,
        setup: [-42,104,116,111,106,-1], //4
        r: [137900,275800,551600]
    },{
        bg: "0mp9",
        x: 80,
        y: 80,
        s: 2,
        setup: [-30,113,115,117,101,-1], //5
        r: [139300,278600,557200]
    }
//146-150 Ascends - Page 30
,{
        bg: "0c99",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-31,115,116,98,117,102], //1
        r: [140700,281400,562800]
    },{
        bg: "03ac",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-42,-31,116,115,-1,-1], //2
        r: [142100,284200,568400]
    },{
        bg: "0ang_2",
        x: 45,
        y: 0,
        s: 0.6,
        setup: [-41,-30,119,108,-1,-1], //3
        r: [143500,287000,574000]
    },{
        bg: "0jpr",
        x: 50,
        y: 50,
        s: 1,
        setup: [-43,-31,111,108,108,-1], //4
        r: [144900,289800,579600]
    },{
        bg: "0cws_0",
        x: 0,
        y: 50,
        s: 1.2,
        setup: [-56,-31,115,111,111,-1], //5
        r: [146300,292600,585200]
    }
//151-155 Ascends - Page 31
,{
        bg: "0g8w",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-41,-31,119,119,117,117], //1
        r: [147700,295400,590800]
    },{
        bg: "0mlz",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-43,-30,116,117,118,118], //2
        r: [149100,298200,596400]
    },{
        bg: "0kb8",
        x: 150/2,
        y: 350/2,
        s: 0.8/2,
        setup: [-29,-21,-41,119,117,-1], //3
        r: [150500,301000,602000]
    },{
        bg: "09yp",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-30,-43,-31,116,119,-1], //4
        r: [151900,303800,607600]
    },{
        bg: "0p9k",
        x: 12,
        y: 13,
        s: 0.6,
        setup: [-29,-21,-41,-43,118,-1], //5
        r: [153300,306600,613200]
    }
//156-160 Ascends - Page 32
,{
        bg: "06k3",
        x: 8,
        y: 8,
        s: 0.7,
        setup: [-42,-29,-56,-31,118,118], //1
        r: [154700,309400,618800]
    },{
        bg: "0exc",
        x: 4,
        y: 8,
        s: 0.7,
        setup: [-31,-21,-43,-30,117,117], //2
        r: [156100,312200,624400]
    },{
        bg: "02kk",
        x: 150/2,
        y: 350/2,
        s: 0.7/2,
        setup: [-29,-41,-43,-30,-56,119], //3
        r: [157500,315000,630000]
    },{
        bg: "05s2",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-31,-56,-41,-42,-29,-30], //4
        r: [158900,317800,635600]
    },{
        bg: "0f4i",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-60,-31,-30,118,-1,-1], //5
        r: [160300,320600,641200]
    },{
        bg: "0kb8",
        x: 0,
        y: 200,
        s: 1,
        setup: [-57,-31,-21,-29,117,-1], //1
        r: [161700,323400,646800]
    },{
        bg: "0ang_2",
        x: 45,
        y: 0,
        s: 0.6,
        setup: [-59,-30,-43,-42,118,117], //2
        r: [163100,326200,652400]
    },{
        bg: "0kb8",
        x: 150/2,
        y: 350/2,
        s: 0.8/2,
        setup: [-57,-21,-43,-30,-31,116], //3
        r: [164500,329000,658000]
    },{
        bg: "02kk",
        x: 150/2,
        y: 350/2,
        s: 0.7/2,
        setup: [-58,-31,-56,-29,-30,118], //4
        r: [165900,331800,663600]
    },{
        bg: "0otu",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-90,-41,-56,-31,-30,-43], //5
        r: [167300,334600,669200]
    }
//166-170 Ascends - Page 34 - Ascended Jade
    ,{
        bg: "0366",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-57,-91,-31,-29,-1,-1], //1
        r: [168700,337400,674800]
    },{
        bg: "0bye",
        x: 0,
        y: 0,
        s: 1.6,
        setup: [-93,-60,-42,-56,-1,-1], //2
        r: [170100,340200,680400]
    },{
        bg: "0kle",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-118,-116,-41,-42,-43,-1], //3
        r: [171500,343000,686000]
    },{
        bg: "07vi",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-119,-59,-30,-56,-21,-1], //4
        r: [172900,345800,691600]
    },{
        bg: "0lyk",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-117,-58,-29,-41,-21,-42], //5
        r: [174300,348600,697200]
    }
//171-175 Ascends - Page 35 - Ascended Edana
    ,{
        bg: "0hy2",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-92,-93,-41,-43,-1,-1], //1
        r: [175700,351400,702800]
    },{
        bg: "08gg",
        x: 35,
        y: 7,
        s: 0.8,
        setup: [-118,-90,-21,-56,-31,-1], //2
        r: [177100,354200,708400]
    },{
        bg: "07wl",
        x: 0,
        y: 0,
        s: 0.325,
        setup: [-116,-60,-58,-29,-1,-1], //3
        r: [178500,357000,714000]
    },{
        bg: "0orc",
        x: 0,
        y: 0,
        s: 0.8,
        setup: [-91,-92,-59,-30,-43,-1], //4
        r: [179900,359800,719600]
    },{
        bg: "0aca",
        x: 25,
        y: 50,
        s: 1,
        setup: [-60,-91,-57,-41,-21,-42], //5
        r: [181300,362600,725200]
    }
//176-180 Ascends - Page 36 - Ascended Dybbuk
    ,{
        bg: "uf59",
        x: 200,
        y: 150,
        s: 0.8,
        setup: [-90,-116,-60,-58,-1,-1], //1
        r: [182700,365400,730800]
    },{
        bg: "0nai_2",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [-119,-116,-117,-59,-43,-1], //2
        r: [184100,368200,736400]
    },{
        bg: "0e0o",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [-92,-93,-91,-117,-29,-1], //3
        r: [185500,371000,742000]
    },{
        bg: "0a0y",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [-118,-116,-93,-57,-41,-43], //4
        r: [186900,373800,747600]
    },{
        bg: "082d",
        x: 20,
        y: 150,
        s: 0.8,
        setup: [-119,-117,-116,-58,-60,-29], //5
        r: [188300,374600,753200]
    }
];

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

function tid2max(tid) {
    return 7;
}

var TPG = {
    "0":[30,25,21,19,17,15,13,11,9],
    "10":[25,20,16,14,12,10,8,6,4],
    "50":[25,20,16,14,12,10,8,6,4],
    "100": [40,30,24,21,18,15,12,9,6],
    "125": [55,45,39,35,33,30,27,24,21],
    "200": [50,40,32,28,24,20,16,12,8],
    "250": [80,70,62,58,54,50,46,42,38],
    "400": [120,105,97,89,81,77,73,69,65],
    "500": [100,80,64,54,48,40,32,24,16],
}

var TSD = {
    "0":[750000,600000,480000,420000,360000,240000,180000,120000],
    "10":[750000,600000,480000,420000,360000,240000,180000,120000],
    "50":[750000,600000,480000,420000,360000,240000,180000,120000],
    "100": [1200000,900000,720000,630000,540000,450000,360000,270000,180000],
    "200": [1500000,1200000,960000,840000,720000,600000,480000,360000,240000],
    "500": [3000000,2400000,1920000,1620000,1440000,960000,720000,480000],
}

var TPRICE = [125,125,250,400,125,125,0];
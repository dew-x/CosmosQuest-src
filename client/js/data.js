/* Core buildings */
var BB = [
    4,
    70,
    620,
    14000,
    6250000,
    bn(2.75,9),
    bn(1.25,12),
    bn(5.75,14),
    bn(2.5,17),
    bn(5.25,22),
    bn(1,28),
    bn(2,33)
];

var BP = [
    1*2, // 0
    24, // 1
    54, // 2
    108, // 3
    162*5, // 4
    243*10, // 5
    486*20, // 6
    972*40, // 7
    1458*80, // 8
    2916*160, // 9
    4374*320, // 10
    8748*600, // 11
];

/*var BP=[0.1,0.6,2.5,80,4100,29000,1897050.5461019222,2500000,423553500873,766491893076134900,5.502772053747783e+21,5.513937419935469e+26];
var BEVO=[[0,64,155.39354775687443,315,421,518,596],[0,33],[0,55],[0,48],[0,65],[0,69],[0,187],[0,200],[0,160],[0,180],[0,100],[0,100]];
var BP=[0.1,0.6,2.5,80,4100,29000,1319900835.3887157,2500000,423553500873,766491893076134900,5.502772053747783e+21,5.513937419935469e+26];
var BEVO=[[0,64,155.39721929753262,315,421,518,596],[0,37.43031920555437],[0,55],[0,48],[0,65],[0,69],[0,187],[0,200],[0,160],[0,180],[0,100],[0,100]];
var BP=[0.1,0.6,2.696590909090909,78.59937772735263,27958.300626936616,378524.66720414633,4934692905.250501,410646918.17294204,1431578138.8228722,5583763965026456,17537608008675156000,2.0199851317422032e+24];
var BEVO=[[0,68.4268118750794,158.8057207437443,320.5839862543257,429.5839330836649,524.9282342516359,569.9758616653014],[0,37.32333637448615],[0,55],[0,52.65352545914698],[0,60.16621651110479],[0,68.13344683469758],[0,132.4253866573669],[0,181.89318955590232],[0,240.45316347303898],[0,175.0909934453763],[0,123.7026272226409],[0,34.145370405824984]];*/
var BE = [
    1.13,
    1.125,
    1.12,
    1.115,
    1.11,
    1.105,
    1.10,
    1.095,
    1.09,
    1.085,
    1.08,
    1.075,
];
function computeBUILDINGS() {
    var BUILDINGS = [
        {
            name: ["Population","Population","Population","Population","Population","Population","Population","Population","Population","Population","Population","Population","Population","Population","Population"],
            icon: ["0d78","0h88","023x","03i4","0mhu","0cgj","01v7","08dq","0exc","0kg3","0gbc","01rz","0p6q","0o2m","0b8s"],
            prod: BP[0],
            base: BB[0],
            exp:  BE[0],
        },{
            name: ["Ovens","Furnaces","Plasma burners","Gamma Ray Emitter","Zeta Ray Emitter","8-Bit Cannon"],
            icon: ["0elf","059t","0li7","0ak1","0o5a","012x"],
            prod: BP[1],
            base: BB[1],
            exp:  BE[1],
            init: ["Discover Fire","Invent Furnace","Invent Plasma burner","Invent Gamma Ray Emitter","Invent Zeta Ray Emitter","Invent 8-Bit Cannon"],
            elvl: [0,25,350,850,1450,1451],
            requires: [rBuilding(0,5),rSpecie(0)],
        },{
            name: ["Dogs","Horses","S-joys","G-avis","I-gsai","Lucy"],
            icon: ["03w8","0h7k","0m10","05s2","08kk","0lyk"],
            prod: BP[2],
            base: BB[2],
            exp:  BE[2],
            init: ["Discover Domestication","Domesticate Horses","Invent S-joy","Invent G-avis","Invent I-gsai","Create Lucy"],
            elvl: [0,50,450,950,1550,1551],
            requires: [rBuilding(0,25),rSpecie(0)],
        },{
            name: ["Watermills","Hydroelectric Plant","Tritium Generators","Quadrium Unit","Neutrium Core","Chroma Core"],
            icon: ["0ks4","07rt","0gst","07ox","0nyh","05er"],
            prod: BP[3],
            base: BB[3],
            exp:  BE[3],
            init: ["Invent Watermill","Invent Hydroelectric Plant","Invent Tritium Generator","Invent Quadrium Unit","Invent Neutrium Core","Invent Chroma Core"],
            elvl: [0,100,550,1050,1650,1651],
            requires: [rBuilding(0,50),rSpecie(0)],
        },{
            name: ["Windmills","Windturbines","Space Wind Gather","Eternal Inflation Mill","Ultimate Ensemble","O'clock Fusion"],
            icon: ["0ggt","0jkh","0n6s","0f4i","0b0f","0bn9"],
            prod: BP[4],
            base: BB[4],
            exp:  BE[4],
            init: ["Invent Windmill","Invent Windturbine","Invent Space Wind Gather","Invent Eternal Inflation Mill","Invent Ultimate Ensemble","Invent O'clock Fusion"],
            elvl: [0,150,650,1150,1750,1751],
            requires: [rBuilding(0,100),rSpecie(0)],
        },{
            name: ["Steam Engines","Combustion Engine","EMP Drives","Supraluminic Drive","Tachyonic Drive","Hydro Drive"],
            icon: ["0jrb","05ws","0juq","00da","0lqw","0nl9"],
            prod: BP[5],
            base: BB[5],
            exp:  BE[5],
            init: ["Invent Steam Engine","Invent Combustion Engine","Invent EMP Drive","Invent Supraluminic Drive","Invent Tachyonic Drive","Invent Hydro Drive"],
            elvl: [0,200,750,1250,1850,1851],
            requires: [rBuilding(0,150),rSpecie(1)],
        },{
            name: ["Fission Reactors","Fusion Reactor","Antimatter Core","Alice Matter Core","Quark Matter Core","Subatomic Core"],
            icon: ["0524","0dw6","0kt2","0nu1","0nuh","0g8r"],
            prod: BP[6],
            base: BB[6],
            exp:  BE[6],
            init: ["Invent Fission Reactor","Invent Fusion Reactor","Invent Antimatter Core","Invent Alice Matter Core","Invent Quark Matter Core","Invent Subatomic Core"],
            elvl: [0,250,850,1350,1950,1951],
            requires: [rBuilding(0,200),rSpecie(1)],
        },{
            name: ["Solar Panels","Solar Satellites","Cosmic Satellites","Multiverse Pod","Wormhole Extractor"],
            icon: ["0h5j","0m0q","0ity","0880","0366"],
            prod: BP[7],
            base: BB[7],
            exp:  BE[7],
            init: ["Invent Solar Panel","Invent Solar Satellite","Invent Cosmic Satellite","Invent Multiverse Pod","Invent Wormhole Extractor"],
            elvl: [0,300,950,1450,2050],
            requires: [rBuilding(0,250),rSpecie(1)],
        },{
            name: ["Stanford Torus","Dyson Spheres","Quasar Spheres","Blazar Sphere","Matrioshka Brain"],
            icon: ["0ogn","0gff","0iv6","0dds","0dba"],
            prod: BP[8],
            base: BB[8],
            exp:  BE[8],
            init: ["Invent Stanford Torus","Invent Dyson Sphere","Invent Quasar Sphere","Invent Blazar Sphere","Invent Matrioshka Brain"],
            elvl: [0,350,1050,1550,2150],
            requires: [rBuilding(0,300),rSpecie(2)],
        },{
            name: ["Star Lifters","Black Hole Lifters","Multiverse Lifters","Megaverse Lifters","Omniverse Lifter"],
            icon: ["0gy4","0a6g","0oui","01cc","0a5a"],
            prod: BP[9],
            base: BB[9],
            exp:  BE[9],
            init: ["Invent Star Lifter","Invent BlackHole Lifter","Invent Multiverse Lifter","Invent Megaverse Lifter","Invent Omniverse Lifter"],
            elvl: [0,400,1150,1650,2250],
            requires: [rBuilding(0,400),rSpecie(2)],
        },{
            name: ["Dark Matter Gather","Dark Energy Gather","Exotic Matter Gather","Alice Matter Gather","Strange Matter Gather"],
            icon: ["03dt","01ty","093g","004u","0875"],
            prod: BP[10],
            base: BB[10],
            exp:  BE[10],
            init: ["Invent Dark Matter Gather","Invent Dark Energy Gather","Invent Exotic Matter Gather","Invent Alice Matter Gather","Invent Strange Matter Gather"],
            elvl: [0,450,1250,1750,2350],
            requires: [rBuilding(0,500),rSpecie(3)],
        },{
            name: ["Graviton Gather","Singularity Gather","Void Gatherers","Supervoid Gather","Dimensional Gather"],
            icon: ["06jf","0p4a","07c9","04s6","07vi"],
            prod: BP[11],
            base: BB[11],
            exp:  BE[11],
            init: ["Invent Graviton Gather","Invent Singularity Gather","Invent Void Gatherer","Invent Supervoid Gather","Invent Dimensional Gather"],
            elvl: [0,500,1350,1850,2450],
            requires: [rBuilding(0,600),rSpecie(3)],
        }
    ];
    return BUILDINGS;
}
var TNAMES = [
    [], // population
    ["Invent Mud-brick Ovens","Invent Afghan Tandoor","Invent Punjabi Tandoor","Invent Armenian Tonir","Invent Moorish Furnace","Invent High-ion Plasma","Invent Double Layer Plasma",
    "Create Hypertherm Plasma","Create Tri-Cathode System","Invent Argon Jet","Invent Isotope Accelerator","Create Gamma Condenser","Invent Nucleons Fission","Create Nuclear Acceleration",
    "Invent Potassium-40 Nuclei","Create Gamma Amplifier","Invent Zeta Ray Beam"], // furnace
    ["Domesticate Siberian Husky","Domesticate Samoyedo","Domesticate Arabian Horse","Domesticate Akhal-Teke",
    "Domesticate Stallion","Domesticate Barb","Invent Neuro-sym System","Apply Plasma Boost","Add Shrilk on External Sphere","Create Infinite Battery","Add Touch Sensitive",
    "Create Neuronal Nuclei","Invent Self-Dev System"], // Domestication
    ["Invent Malt Mill","Invent Fulling Mill","Invent Tanning Mill","Invent Water Turbine","Create a Dam","Invent Automatic Dam","Invent Kaplan Turbine","Improve lithium-6 Reaction",
    "Invent High Power Tritium","Invent Fission Accelerator","Create Electron Exploder","Invent Beta Multiplier","Improve Isotope Reaction","Improve Nuclei Mass","Accelerate Neutron Emission"], // Water
    ["Invent Persian Windmill","Invent Chinese Windmill","Invent the Towermill","Invent the Common Windmill","Reduce Number of Blades","Invent Vertical-axis",
    "Invent Horizontal-axis","Create a Wind Farm","Invent Pressure Reductor","Create Plasma Condenser","Invent Coronal Holes Detector","Invent Plasma Orientator","Invent Wind Intensifier",
    "Invent Big Bang Detector"], // Wind
    ["Invent Pumping Engine","Invent Piston Steam Engine","Invent High-pressure Engine","Create Steam Locomotives","Create Steam Turbines","Discover the Clerk Cycle","Discover the Day Cycle",
    "Invent Four-stroke Engine","Invent Diesel Engine","Improve Magnetic Fields","Create Double-way Charge","Invent Field Disorder"], // Engine
    ["Create the Atomic Bomb","Create the B-Reactor","Create the EBR-I","Create the NRX Reactor","Create a Nuclear Submarine","Create Commercial Plants",
    "Create Thermonuclear Bomb","Invent Tokamak Reactor","Invent Antineutrino Charger","Create Chain Booster","Improve Gold Nuclei","Create Lepton Analyzer","Create Positron Accelerator"], // Nuclear
    ["Invent Selenium Panels","Discover Photoelectric Effect","Create Single-Crystal Silicon","Introduce Germanium","Improve CTM System","Create Thin-film Modules","Start Space Research","Create Vanguard I",
    "Invent Fresnel Lens","Invent Solar Concentrators","Create Pressure Orientator","Create High-tech Coils","Invent Cosmic Distributors","Invent Cosmic Stabilizers","Create Cosmic Accelerators",
    "Create Radiation Amplifier"], // Solar panel
    ["Improve Mass Catcher","Create Intelligent Mirrors","Create Centrifugal Delayer","Create Ring Compressor","Start Asteroid Mining","Create Outsite Camps","Invent Gravity Controller",
    "Create Ring Accelerator","Invent Dyson Swarm","Invent Dyson Bubble","Invent Dyson Shell","Invent Dyson Net","Invent Bubbleworld","Invent Binary Quasar","Invent Ternary Quasar",
    "Invent Quasar Bubble","Invent Quasar Shell","Invent Binary Blazar","Invent Ternary Blazar","Invent Blazar Bubble","Invent Blazar Shell","Invent Blazar Net"], // Dyson
    ["Invent Therm-driven Outflow","Invent Huff-n-Puff","Use Centrifugal Acceleration","Create Star Dust","Create Plasma Extractor","Invent Plasma Cooler",
    "Invent Black Hole Creator","Invent Black Hole Controller","Invent Black Hole Transporter","Invent Black Hole Stabilizer","Invent Black Hole Collector","Invent Black Hole Bubble",
    "Invent Black Hole Farm","Invent Multiverse Portal","Invent Multiverse Stabilizer","Create Multiverse Gate","Invent Multiverse Tube","Create Multilift Verser"], // Lifter
    ["Create Single Disk Detectors","Create Double Disk Detectors","Create Dilution Refrigerator","Invent Higgs Coils","Invent Triple-coil Nucleus","Invent WIMP Decelerator","Create Matter Freezer",
    "Create Cosmic Refractor","Invent Microwave Detector","Invent Higgs Boson Beam","Invent Dark Energy Detector","Create Baryonic Detector","Phantom Energy Stabilizer","Invent Spherical Beam",
    "Invent Void Detector","Create Void Stabilizer","Invent Void Encapsulation","Create Void Absorber","Invent Cosmic Coils"], // Dark
    ["Create Graviton Box","Invent Saphiro Coil","Invent Anomaly Re-direction","Invent Anomaly Stabilizer","Invent Graviton Booster"], // Gravity
]
function bc(base,exp,amount) {
    return (base*(Math.pow(exp,0)-Math.pow(exp,amount))/(1-exp));
}
var _BUILDINGS=computeBUILDINGS();
var TMULICON = ["0ewi","0lum","0hgx","0mlz","03ac","0lmn","0c99","03ia","0098","0p9k"];
var FLVL = [1,5,25,50,100,150,200,250,300,400,500,600];
function computeTECH() {
    var TECH = {};
    var limit=1000;
    var lvls = [1,25,50];
    var max = 14000;
    var dreq = [
        undefined,
        rDimension(0),
        rDimension(1),
        rDimension(2),
        rDimension(7),
        rDimension(3),
        rDimension(8),
    ]
    for (var i=1; i<_BUILDINGS.length; ++i) {
        var prev = "f"+i;
        TECH[prev] = {
            name: _BUILDINGS[i].init[0],
            icon: _BUILDINGS[i].icon[0],
            requires: _BUILDINGS[i].requires,
            cost: bc(_BUILDINGS[0].base,_BUILDINGS[0].exp,FLVL[i]+3+i/3),
            text: "A new way to obtain energy",
            grants: [gBuildLevel(i,0)]
        }
        var elvl = 1;
        var r = _BUILDINGS[i].exp;
        for (var j=1; j<limit; ++j) {
            var clvl = j<lvls.length?lvls[j]:(j-2)*100;
            if (clvl>max) break;
            var plvl = j-1<lvls.length?lvls[j-1]:(j-3)*100;
            var UUID;
            if (elvl<Math.min(5,_BUILDINGS[i].elvl.length) && clvl>_BUILDINGS[i].elvl[elvl] && plvl<=_BUILDINGS[i].elvl[elvl]) {
                UUID = "e"+i+"_"+elvl;
                TECH[UUID] = {
                    name: _BUILDINGS[i].init[elvl],
                    icon: _BUILDINGS[i].icon[elvl],
                    requires: [rBuilding(i,_BUILDINGS[i].elvl[elvl]),rTech(prev)],
                    cost: bc(_BUILDINGS[i].base,_BUILDINGS[i].exp,_BUILDINGS[i].elvl[elvl]+elvl*2+j/2),
                    text: "Replaces "+_BUILDINGS[i].name[elvl-1],
                    grants: [gBuildLevel(i,elvl)]
                }
                prev = UUID;
                ++elvl;
            }
            var UUID = "b"+i+"l"+j;
            // clvl<=elvl[i]?0:(i>=ELVL1.length&&clvl<=ELVL1[i]?1:(i>=ELVL2.length&&clvl<=ELVL2[i]?2:3))
            var tText = "Improve "+(_BUILDINGS[i].name[elvl-1]);
            if (TNAMES[i].length>=j) tText = TNAMES[i][j-1];
            TECH[UUID] = {
                name: tText,
                icon: _BUILDINGS[i].icon[elvl-1],
                requires: [rBuilding(i,clvl),rTech(prev)],
                cost: bc(_BUILDINGS[i].base,_BUILDINGS[i].exp,clvl+4+i/2),
                text: "Doubles production",
                grants: [gBuildUpgrade(i,j)]
            }
            prev=UUID;
        }
        if (_BUILDINGS[i].elvl.length==6) {
            var UUID = "d"+i;
            TECH[UUID] = {
                name: _BUILDINGS[i].init[5],
                icon: _BUILDINGS[i].icon[5],
                requires: [rBuilding(i,_BUILDINGS[i].elvl[5]),dreq[i]],
                cost: bn(1,136),
                text: "Replaces "+_BUILDINGS[i].name[4],
                grants: [gBuildLevel(i,5)]
            }
        }
    }
    // click fn
    var plvl = 1;
    var prev=undefined;
    var r = _BUILDINGS[0].exp;
    for (var i=0; i<limit; ++i) {
        var UUID = "c"+i;
        var blvl = 10;
        if (i>0) blvl=25+50*(i-1);
        if (blvl>max) break;
        var cost = bc(_BUILDINGS[0].base,_BUILDINGS[0].exp,blvl+5+i/4);
        var target = 0;
        while (target+1<SPECIES.length && cost>SPECIES[target+1].requires) ++target;
        if (blvl<50) {
            TECH[UUID] = {
                name: "Improve tools",
                icon: SPECIES[target].tool,
                requires: [rBuilding(0,blvl),(prev)?rTech(prev):rSpecie(0)],
                cost: cost,
                text: "Improves Base Click x5",
                grants: [gMul("cmul",5)],
            }
        } else {
            var val=250;
            if (blvl==75) val=100;
            if (blvl==125) val=250;
            TECH[UUID] = {
                name: "Improve tools",
                icon: SPECIES[target].tool,
                requires: [rBuilding(0,blvl),(prev)?rTech(prev):rSpecie(0)],
                cost: cost,
                text: "Improves Base Click x"+val,
                grants: [gMul("cmul",val)],
            }
        }
        plvl = blvl;
        prev = UUID;
    }
    // prod mul
    var disc = [
        {
            icon:"0ewi",
            text:"Invent the Wheel",
            amount: 50,
        },{
            icon:"0lum",
            text:"Discover Gravity",
            amount: 100,
        },{
            icon:"0hgx",
            text:"Discover Electricity",
            amount: 150,
        },{
            icon:"0mlz",
            text:"Discover the Atom",
            amount: 200,
        },{
            icon:"03ac",
            text:"Discover Higgs Boson",
            amount: 250,
        },{
            icon:"0lmn",
            text:"Discover Tetraneutron",
            amount: 300,
        },{
            icon:"0c99",
            text:"Discover White Hole",
            amount: 350,
        },{
            icon:"03ia",
            text:"Discover Dark Matter",
            amount: 400,
        },{
            icon:"0098",
            text:"Discover Dark Energy",
            amount: 450,
        },{
            icon:"0p9k",
            text:"Discover Graviton",
            amount: 550,
        }
    ]
    var prev=undefined;
    for (var i=0; i<disc.length; ++i) {
        var UUID = "p"+i;
        TECH[UUID] = {
            name: disc[i].text,
            icon: disc[i].icon,
            requires: [rBuilding(0,disc[i].amount),prev!==undefined?rTech(prev):rSpecie(0)],
            cost: bc(_BUILDINGS[0].base,_BUILDINGS[0].exp,disc[i].amount+3+i/4),
            text: "Doubles All Production",
            grants: [gMul("tmul",2)],
        }
        prev=UUID;
    }
    // building mul
    var r1 = _BUILDINGS[11].exp;
    for (var i=1; i<=limit; ++i) {
        var amount = 10;
        if (i==2) amount=25;
        else if (i==3) amount=50;
        else if (i>3) amount=(i-3)*100;
        if (amount>max) break;
        var UUID = "m"+i;
        TECH[UUID] = {
            name: "Conquer new planet",
            icon: "06k3",
            requires: [rMBuilding(amount)],
            cost: Math.max(bc(_BUILDINGS[11].base,_BUILDINGS[11].exp,amount+5+i/4),bc(_BUILDINGS[0].base,_BUILDINGS[0].exp,amount+5+i/4)),
            text: "Triples all Production",
            grants: [gMul("bmul",3)],
        }
    }
    return TECH;
}
/* Technologies */
function rTech(tid) {
    return {
        type:"TECH",
        value: tid
    }
}
function rDimension(did) {
    return {
        type:"DIMENSION",
        value: did
    }
}
function rBuilding(bid,amount) {
    return {
        type:"BUILDING",
        value: bid,
        amount: amount
    }
}
function rMBuilding(amount) {
    return {
        type:"MBUILDING",
        amount: amount
    }
}
function rSpecie(sid) {
    return {
        type:"SPECIE",
        value: sid
    }
}
function gBuildUpgrade(bid,lvl) {
    return {
        type:"BUILDUPGRADE",
        value: lvl,
        key: bid,
    }
}
function gBuildLevel(bid,lvl) {
    return {
        type:"BUILDLVL",
        value: lvl,
        key: bid,
    }
}
function gMul(key,value) {
    return {
        type: "MULTIPLIER",
        value: value,
        key: key,
    }
}
/* Species loop */
var SPECIES = [
    {
        name:"Caveman",
        portrait: "06j5",
        grants: [gBuildLevel(0,0)],
        requires: 0,
        tool: "04t2",
    },{
        name:"Human",
        portrait: "0mly",
        hidden: "0g5q",
        grants: [gBuildLevel(0,1)],
        requires: bn(1,8),
        tool: "0ct3",
    },{
        name:"Prostheticman",
        portrait: "066l",
        hidden: "0bsi",
        grants: [gBuildLevel(0,2)],
        requires: bn(1,16),
        tool: "0d9z",
    },{
        name:"Geneticman",
        portrait: "00jc",
        hidden: "0h6r",
        grants: [gBuildLevel(0,3)],
        requires: bn(1,26),
        tool: "045n",
    },{
        name:"Robot",
        portrait: "0knl",
        hidden: "018e",
        grants: [gBuildLevel(0,4)],
        requires: bn(1,36),
        tool: "0fd0",
    },{
        name:"Posthuman",
        portrait: "0nif",
        hidden: "0c0s",
        grants: [gBuildLevel(0,5)],
        requires: bn(1.0001,46),
        tool: "00x9",
    },{
        name:"Entity",
        portrait: "08n8",
        hidden: "06p1",
        grants: [gBuildLevel(0,6)],
        requires: bn(1,56),
        tool: "0ak9",
    },{
        name:"Primordial",
        portrait: "0p8s",
        hidden: "0deh",
        grants: [gBuildLevel(0,7)],
        requires: bn(1,66),
        tool: "0fg3",
    },{
        name:"Seer",
        portrait: "0jpr",
        hidden: "0hig",
        grants: [gBuildLevel(0,8)],
        requires: bn(1,76),
        tool: "0m9s",
    },{
        name:"Guardian",
        portrait: "075x",
        hidden: "0gnm",
        grants: [gBuildLevel(0,9)],
        requires: bn(1,86),
        tool: "09nh",
    },{
        name:"Mastermind",
        portrait: "06rx",
        hidden: "02vw",
        grants: [gBuildLevel(0,10)],
        requires: bn(1,96),
        tool: "0m91",
    },{
        name:"Creator",
        portrait: "06j3",
        hidden: "0e8u",
        grants: [gBuildLevel(0,11)],
        requires: bn(1,106),
        tool: "0kle",
    },{
        name:"Corruptor",
        portrait: "0jgf",
        hidden: "09g0",
        grants: [gBuildLevel(0,12)],
        requires: bn(1,116),
        tool: "0otu",
    },{
        name:"Destructor",
        portrait: "05x7",
        hidden: "0c8l",
        grants: [gBuildLevel(0,13)],
        requires: bn(1,126),
        tool: "02bw",
    },{
        name:"Drifter",
        portrait: "0hpu",
        hidden: "05o0",
        grants: [gBuildLevel(0,14)],
        requires: bn(1,136),
        tool: "09gi",
    }
];
var MIRACLES = [
    {
        name:"Draw a constellation",
        icon: "0ogl",
        followers: 4,
        time: 1
    },{
        name:"Turn water into wine",
        icon: "09x0",
        followers: 7,
        time: 2
    },{
        name:"Create a Déjà Vu",
        icon: "0edo",
        followers: 12,
        time: 4
    },{
        name:"Send a 42 over the narrowband",
        icon: "0k7g",
        followers: 22,
        time: 8
    },{
        name:"Create a donut shaped planet",
        icon: "03al",
        followers: 42,
        time: 16
    },{
        name:"Create a wormhole",
        icon: "0h79",
        followers: 82,
        time: 24
    },{
        name:"Bend one universe",
        icon: "0oqq",
        followers: 162,
        time: 36
    },{
        name:"Create a multiverse Matrix",
        icon: "0nd0",
        followers: 322,
        time: 48
    },{
        name:"Create a quest for the hobbits",
        icon: "08bu",
        followers: 642,
        time: 72
    }
];

/* initial data */
function genStats() {
    return {
        v: { // values toADD only
            energy: 0, // total energy
            cenergy: 0, // click energy
            senergy: 0, // superclick energy
            benergy: 0, // building energy
            aenergy: 0, // gambing energy
            lenergy: 0,
            rtime: 0, // research time
            ramount: 0, // research amount
            renergy: 0, // research energy
            camount: 0, // click amount
            samount: 0, // superclick amount
            screated: 0, // created superclick
            smiss: 0, // missed superclick
            bamount: 0, // total building
            gomega: 0, // gained omega
            somega: 0, // spent omega
            time: 0, // time current
            evolutions: 0, // times evolved
            ascension: 0, // times ascended
            b0: 0,
            b1: 0,
            b2: 0,
            b3: 0,
            b4: 0,
            b5: 0,
            b6: 0,
            b7: 0,
            b8: 0,
            b9: 0,
            b10: 0,
            b11: 0,
            bet: 0,
            blost: 0,
            btrue: 0,
            bspend: 0,
            bwon: 0,
            ltimes: 0,
            ltimes1: 0,
            ltimes4: 0,
            ltimes12: 0,
            ltime: 0,
            gpop: 0,
            claim: 0,
            roulette: 0,
            daily:0,
            djumps:0,
            tdk:0, // td kills
            tdc:0, // td clicks
            tds:0, // td spawns
            tde:0, // td total energy
        },
        m: { // maximums store maximum only
            b0: 0,
            b1: 0,
            b2: 0,
            b3: 0,
            b4: 0,
            b5: 0,
            b6: 0,
            b7: 0,
            b8: 0,
            b9: 0,
            b10: 0,
            b11: 0,
            energy: 0,
            cps: 0, // cps
            tt: 0, // time travel
            prod: 0, // max production
            offline: 0,
            bwon: 0,
            bspend: 0,
            lenergy: 0,
            gpop: 0,
            gempty: 0,
            qdaily: 0,
            tdm: 0, // td max level
            tde: 0, // max energy
            heroes: 0,
        },
        a: { // arrs can only insert
            zclick: [], // zones clicked
            research: [], // researched technologies
            omega: [], // unlocked omega
            dim: []
        },
        t: { // time points
            e1:0,
            e2:0,
            e3:0,
            e4:0,
            e5:0,
            e6:0,
            e7:0,
            e8:0,
            e9:0,
            e10:0,
            e11:0,
            e12:0,
            e13:0,
            e14:0,
            a:0,
        }
    }
}

function mkdata() {
    return {
        version: 1,
        created: Date.now(), // creation date
        sound: true,
        effect: true,
        click: true,
        buildingAmount: 1, // number of buildings to build
        premium: 0,
        omegas: [0,0,0,0,0,0],
        tutorial: 0,
        ad: 0,
        adBlock: Date.now()+15*60*1000,
        specie: 0, // species index
        saved: undefined,
        acheval: undefined,
        current: Date.now(), // current start time
        last: Date.now(), // last update date
        energy: 0, // current energy
        omega: 0, // current exotic particles
        research: {},
        technologies: [], // researched technologies
        researching: undefined,
        buildings: [0,0,0,0,0,0,0,0,0,0,0,0], // building amount
        buildLevel: [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], // -1 none 0 basic 1 evolved
        buildUpgrade: [0,0,0,0,0,0,0,0,0,0,0,0], // how many times upgraded x2 each

        bonus: {
            cmul: 1, // formula  = (clicksum+clickrate*population)*clickmul
            csum: 1,
            bmul: 1,
            tmul: 1,
        },

        shop: {
            tt: 0,
            om: 0,
        },

        stats: {
            c: genStats(), // current
            t: genStats() // total
        },
    };
}
/* basic units */
var UNITS = {
    '-15':'f',
    '-12':'p',
    '-9':'n',
    '-6':'µ',
    '-3':"m",
    0:"",
    3:"k",
    6:"M",
    9:"G",
    12:"T",
    15:"P",
    18:"E",
    21:"Z",
    24:"Y",
    27:"B",
}

var UNITSN = {
    '-15':'f',
    '-12':'p',
    '-9':'n',
    '-6':'µ',
    '-3':"m",
    0:"",
    3:"kilo",
    6:"Mega",
    9:"Giga",
    12:"Tera",
    15:"Peta",
    18:"Exa",
    21:"Zetta",
    24:"Yotta",
    27:"Bronto#",
    30:"greater",
}

function genUnits() {
    var start = 30;
    for (var i=0; i<26; ++i) {
        for (var j=0; j<26; ++j) {
            UNITS[start]=String.fromCharCode(97+i)+String.fromCharCode(97+j);
            start+=3;
        }
    }
}
genUnits();

var BMUL = {
    1:10,
    10:25,
    25:100,
    100:"MAX",
    MAX:"NXT",
    NXT:"MXT",
    MXT:1,
}

var FONT = " 'Roboto'";
var EFONT = " 'Crimson Text'"
var HFONT = " 'Lacquer'";
var CFONT = " 'Mountains of Christmas'";
var TLEN=575;

var STEPS = {
    BUILDINGS: [25,50,100,250,500,1000,1500,2000,2500],
    TBUILDINGS: [1000,2500,5000,10000,25000,50000,100000,250000,500000],
    TTBUILDINGS: [3333,6666,9999,13333,16666,19999,23333,26666,29999],
    S1000: [1000,2500,5000,10000,25000,50000,100000,250000,500000],
    S1005: [100,500,1000,5000,10000,50000,100000,500000,1000000],
    S10: [10,25,50,100,250,500,1000,2500,5000],
    S1: [1,5,10,25,50,100,250,500,1000],
    S105: [10,50,100,500,1000,5000,10000,50000,100000],
    S1: [1,5,10,25,50,100,150,200,250],
    E10000: [bn(1,4),bn(1,8),bn(1,16),bn(1,28),bn(1,44),bn(1,64),bn(1,88),bn(1,116),bn(1,148)],
    E1000: [bn(1,3),bn(1,6),bn(1,12),bn(1,21),bn(1,33),bn(1,48),bn(1,56),bn(1,77),bn(1,101)],
    E100: [bn(1,2),bn(1,4),bn(1,8),bn(1,14),bn(1,22),bn(1,32),bn(1,44),bn(1,58),bn(1,74)],
    UZC: [200],
    UR: [Math.floor(TLEN*(1/9)),Math.floor(TLEN*(2/9)),Math.floor(TLEN*(3/9)),Math.floor(TLEN*(4/9)),Math.floor(TLEN*(5/9)),Math.floor(TLEN*(6/9)),Math.floor(TLEN*(7/9)),Math.floor(TLEN*(8/9)),TLEN],
    YEAR: [1,3,7,14,30,60,110,180,366],
    UCB: [60*1000],
    U100: [bn(1,100)],
    U1: [1],
    U7D: [24*60*60*1000,24*60*60*1000*2,24*60*60*1000*3,24*60*60*1000*4,24*60*60*1000*5,24*60*60*1000*6,24*60*60*1000*7,24*60*60*1000*10],
    U121: [bn(1.21,9),bn(1.21,12),bn(1.21,15),bn(1.21,18),bn(1.21,21),bn(1.21,24),bn(1.21,27),bn(1.21,30),bn(1.21,33)],
    UCPS: [6,8,10,12,14],
    UOM: [6,8,12],
    UOFF: [8*60*60*1000,24*60*60*1000],
    U250: [bn(1,250)],
    UY: [24*60*60*1000,24*60*60*1000*3,24*60*60*1000*7,24*60*60*1000*14,24*60*60*1000*30,24*60*60*1000*60,24*60*60*1000*110,24*60*60*1000*180,24*60*60*1000*365],
    UPOP: [5,10,15,25,40,60,90],
    JUMP: [1,10,25,50,100,250,500,1000,3741],
    HEROES: [1,5,10,25,50,100,150,200,250],
}

function BNAME(id,amount) {
    if (_BUILDINGS[id].elvl===undefined) return _BUILDINGS[id].name[0];
    var pos=1;
    while (pos<_BUILDINGS[id].elvl.length && amount>_BUILDINGS[id].elvl[pos]) ++pos;
    return _BUILDINGS[id].name[pos-1];
}

function BACTION(id,amount) {
    if (id==0) return "Breed";
    else if (id==2 && amount<450) return "Breed";
    else return "Build";
}

function ACH_BMAX(text,icon,id) {
    var key="b"+id;
    return function (data) {
        var val = data.stats.t.m[key];
        var steps=STEPS.BUILDINGS;
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next="Have "+steps[steps.length-1]+" "+BNAME(id,steps[steps.length-1]);
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr="Have "+(lvl>0?steps[lvl-1]:0)+" "+BNAME(id,(lvl>0?steps[lvl-1]:0));
            next="Have "+steps[lvl]+" "+BNAME(id,steps[lvl]);
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: val+"/"+(lvl<steps.length?steps[lvl]:steps[steps.length-1]),
        }
    }
}

function ACH_BTOTAL(text,icon,id) {
    var key="b"+id;
    return function (data) {
        var val = data.stats.t.v[key];
        var steps=STEPS.TBUILDINGS;
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=BACTION(id,steps[steps.length-1])+" "+steps[steps.length-1]+" "+BNAME(id,steps[steps.length-1]);
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr=BACTION(id,(lvl>0?steps[lvl-1]:0))+" "+(lvl>0?steps[lvl-1]:0)+" "+BNAME(id,(lvl>0?steps[lvl-1]:0));
            next=BACTION(id,steps[lvl])+" "+steps[lvl]+" "+BNAME(id,steps[lvl]);
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: val+"/"+(lvl<steps.length?steps[lvl]:steps[steps.length-1]),
        }
    }
}

function ACH_BTT(text,icon) {
    return function (data) {
        var val = 0;
        for (var i=0; i<12; ++i) val+=data.stats.t.m["b"+i];
        var steps=STEPS.TTBUILDINGS;
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next="Have "+steps[steps.length-1]+" total buildings";
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr="Have "+(lvl>0?steps[lvl-1]:0)+" total buildings";
            next="Have "+steps[lvl]+" total buildings";
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: val+"/"+(lvl<steps.length?steps[lvl]:steps[steps.length-1]),
        }
    }
}

function ACH_SV(text,icon,key,skey,pre,post,unit) {
    unit=unit||"";
    return function (data,pn) {
        var val=0;
        if (typeof key === "string") val = data.stats.t.v[key];
        else {
            for (var i=0; i<key.length; ++i) val+=data.stats.t.v[key[i]];
        }
        var steps=STEPS[skey];
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=pre+" "+(post?pn(steps[steps.length-1],unit,true)+" "+post:"");
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr=pre+" "+(post?pn(lvl>0?steps[lvl-1]:0,unit,true)+" "+post:"");
            next=pre+" "+(post?pn(steps[lvl],unit,true)+" "+post:"");
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: pn(val,unit,true)+"/"+pn(lvl<steps.length?steps[lvl]:steps[steps.length-1],unit,true),
        }
    }
}

function ACH_SA(text,icon,key,skey,pre,post,unit) {
    unit=unit||"";
    return function (data,pn) {
        var val=0;
        if (typeof key === "string") val = data.stats.t.a[key].length;
        else {
            for (var i=0; i<key.length; ++i) val+=data.stats.t.a[key[i]].length;
        }
        var steps=STEPS[skey];
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=pre+" "+(post?pn(steps[steps.length-1],unit,true)+" "+post:"");
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr=pre+" "+(post?pn(lvl>0?steps[lvl-1]:0,unit,true)+" "+post:"");
            next=pre+" "+(post?pn(steps[lvl],unit,true)+" "+post:"");
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: pn(val,unit,true)+"/"+pn(lvl<steps.length?steps[lvl]:steps[steps.length-1],unit,true),
        }
    }
}

function ACH_SET(text,icon,time,post) {
    return function (data) {
        var val=0;
        while (val+1<Math.min(10,SPECIES.length) && data.stats.t.t["e"+(val+1)]>0 && data.stats.t.t["e"+(val+1)]<=time) ++val;
        var steps=[];
        for (var i=1; i<Math.min(10,SPECIES.length); ++i) steps.push(i);
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=SPECIES[Math.min(10,SPECIES.length)-1].name+" "+post;
        } else {
            var ctime=data.stats.t.t["e"+(val+1)];
            if (ctime>0) perc=Math.min(1,time/ctime);
            curr=SPECIES[val].name+" "+post;
            next=(ctime>0?SPECIES[val+1].name:"????")+" "+post;
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: timer(data.stats.t.t["e"+(val+1<Math.min(10,SPECIES.length)?val+1:Math.min(10,SPECIES.length)-1)]/1000)+"/"+timer(time/1000),
        }
    }
}

function ACH_SET2(text,icon) {
    return function (data) {
        var val=9;
        while (val+1<SPECIES.length && data.stats.t.t["e"+(val+1)]>0) ++val;
        var steps=[];
        for (var i=10; i<SPECIES.length; ++i) steps.push(i);
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==SPECIES.length-10) {
            perc=1;
            curr=next="Reach "+SPECIES[SPECIES.length-1].name;
        } else {
            var ctime=data.stats.t.t["e"+(val+1)];
            perc=0;
            curr="Reach "+SPECIES[val].name;
            next="Reach "+(ctime>0?SPECIES[val+1].name:"????");
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: val+"/"+(SPECIES.length-1),
        }
    }
}

function ACH_DAYS(text,icon,key,skey,pre,post) {
    return function (data,pn) {
        var val = data.stats.t.v[key]/(24*60*60*1000);
        var steps=STEPS[skey];
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=pre+" "+steps[steps.length-1]+" "+post;
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr=pre+" "+lvl>0?steps[lvl-1]:0+" "+post;
            next=pre+" "+steps[lvl]+" "+post;
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: val.toFixed(2)+"/"+(lvl<steps.length?steps[lvl]:steps[steps.length-1]),
        }
    }
}

function ACH_ST(text,icon,key,skey,pre,post) {
    return function (data,pn) {
        var val=0;
        if (typeof key === "string") val = data.stats.t.t[key];
        else {
            for (var i=0; i<key.length; ++i) val+=data.stats.t.t[key[i]];
        }
        var steps=STEPS[skey];
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>0 && val<=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=pre+" "+timer(steps[lvl-1]/1000)+" "+post;
        } else {
            var nval = steps[lvl];
            perc=nval/(val||1);
            curr=pre+" "+timer(steps[lvl-1]/1000)+" "+post;
            next=pre+" "+timer(steps[lvl]/1000)+" "+post;
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: timer(val/1000)+"/"+timer((lvl<steps.length?steps[lvl]:steps[steps.length-1])/1000),
        }
    }
}

function ACH_SM(text,icon,key,skey,pre,post,unit) {
    unit=unit||"";
    return function (data,pn) {
        var val=0;
        if (typeof key === "string") val = data.stats.t.m[key];
        else {
            for (var i=0; i<key.length; ++i) val+=data.stats.t.m[key[i]];
        }
        var steps=STEPS[skey];
        var lvl = 0;
        var perc = 0;
        var curr = 0;
        var next = 0;
        while (lvl<steps.length && val>=steps[lvl]) ++lvl;
        if (lvl==steps.length) {
            perc=1;
            curr=next=pre+" "+(post?pn(steps[steps.length-1],unit,true):"")+" "+post;
        } else {
            var cval=lvl>0?steps[lvl-1]:0;
            var nval = steps[lvl];
            perc=(val-cval)/(nval-cval);
            curr=pre+" "+(post?pn(lvl>0?steps[lvl-1]:0,unit,true):"")+" "+post;
            next=pre+" "+(post?pn(steps[lvl],unit,true):"")+" "+post;
        }
        return {
            name: text,
            levels: steps.length,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: pn(val,unit,true)+"/"+pn(lvl<steps.length?steps[lvl]:steps[steps.length-1],unit,true),
        }
    }
}

function ACH_B1LB11(text,icon) {
    return function (data) {
        var lvl = data.stats.t.m.b0<data.stats.t.m.b11?1:0;
        var perc = data.stats.t.m.b11/(data.stats.t.m.b0+1);
        var curr = "Surpass population";
        var next = "Surpass population";
        return {
            name: text,
            levels: 1,
            icon: icon,
            level: lvl,
            perc: perc,
            curr: curr,
            next: next,
            bar: "",
        }
    }
}

function ACH_IMPORT(text,icon) {
    return function (data) {
        return {
            name: text,
            levels: 1,
            icon: icon,
            level: data.import>0?1:0,
            perc: data.import>0?1:0,
            curr: "Import a save",
            next: "Import a save",
            bar: data.import+"/1",
        }
    }
}

function ACH_CLOUD(text,icon) {
    return function (data) {
        return {
            name: text,
            levels: 1,
            icon: icon,
            level: data.cloud>0?1:0,
            perc: data.cloud>0?1:0,
            curr: "Save to cloud",
            next: "Save to cloud",
            bar: "",
        }
    }
}

function ACH_TIER(text,icon,tier) {
    return function (data) {
        var ok=0;
        for (var i=0; i<data.buildLevel.length; ++i) {
            if (data.buildLevel[i]>=tier) ++ok;
        }
        return {
            name: text,
            levels: 1,
            icon: icon,
            level: ok>=12?1:0,
            perc: ok/12,
            curr: "All buildings tier "+tier,
            next: "All buildings tier "+tier,
            bar: ok+"/12",
        }
    }
}

function PH() {
    return {
        name: "PLACEHOLDER",
        levels: 0,
        icon: "04rx",
        level: 0,
        perc: 0,
        curr: "",
        next: "",
        bar: "",
    }
}

var ACH = [
    // row 0
    ACH_BMAX("Warm for the rest of his(albeit short)life","0elf",1),
    ACH_BMAX("It took a while to tame a beast","03w8",2),
    ACH_BMAX("It takes the shape of its container","0ks4",3),
    ACH_BMAX("Not giants but windmills","0ggt",4),
    ACH_BMAX("Anyone who stops learning is old - HF","0jrb",5),
    ACH_BMAX("E=mc2","0524",6),
    ACH_BMAX("E pur si muove! - Galileo Galilei","0h5j",7),
    ACH_BMAX("Star Maker","0ogn",8),
    ACH_BMAX("Veni, vidi, vici - Julius Caesar","0gy4",9),
    ACH_BMAX("I'm mostly made of mysteries - MDH","03dt",10),
    ACH_BMAX("Gravity is not a trivial monster - FCB","06jf",11),
    // row 1
    ACH_BTOTAL("Burn it to the ground","059t",1),
    ACH_BTOTAL("Look at my horse","0h7k",2),
    ACH_BTOTAL("No man ever steps same river twice","07rt",3),
    ACH_BTOTAL("Green planet, healthy planet","0jkh",4),
    ACH_BTOTAL("Machine! Machine!! Machine!!!","05ws",5),
    ACH_BTOTAL("The destroyer of worlds - JRO","0dw6",6),
    ACH_BTOTAL("Who names a starship the Icarus?","0m0q",7),
    ACH_BTOTAL("Brighter than a billion suns - GG","0gff",8),
    ACH_BTOTAL("Look up at the stars - SH","0a6g",9),
    ACH_BTOTAL("The biggest mystery in physics - SA","01ty",10),
    ACH_BTOTAL("What keeps things together","0p4a",11),
    // row 2
    ACH_BMAX("Let us fight for a new world ...","0d78",0),
    ACH_BTT("... let us all unite! - CC","0h88"),
    ACH_BTOTAL("All beings are born free","023x",0),
    ACH_SV("Where no man has gone before","03i4","bamount","S1000","Build","buildings"),
    ACH_SET("They're evolving!","0mhu",60*60*1000,"in 1 hour"),
    ACH_SET("Time is an illusion - THGTTG","0cgj",10*60*1000,"in 10 minutes"),
    ACH_SET("They control the minds of the masses","01v7",60*1000,"in 1 minute"),
    ACH_SV("Atom's way of looking at itself - NB","08dq","evolutions","S10","Evolve","times"),
    ACH_SA("I've seen things you wouldn't believe","0exc","zclick","UZC","Click","buttons"),
    ACH_SET("I'm the guardian of power, not its owner","0kg3",10000,"in 10 second"),
    ACH_SET2("It's all literally a matter of perspective","0gbc"),
    // row 3
    ACH_SV("Be the first to cast a stone - JC","04t2","camount","S1005","Click","times"),
    ACH_SV("Whoever is not with me is against me","0ct3","samount","S10","Catch Disaster","times"),
    ACH_SV("They're just gone - Jenny Han","0d9z","smiss","S10","Miss Disasters","times"),
    ACH_SV("Think in terms of energy - NT","045n","cenergy","E1000","Obtain","from clicks","J"),
    ACH_SV("Think in terms of frequency - NT","0fd0","senergy","E1000","Obtain","from disasters","J"),
    ACH_SV("Think in terms of vibration - NT","00x9",["senergy","cenergy"],"E1000","Obtain","from all clicks","J"),
    ACH_IMPORT("An experiment can prove me wrong - AE","0ak9"),
    ACH_CLOUD("Try to be a rainbow in someone's cloud","0fg3"),
    ACH_SM("The Lord of the Click","0m9s","cps","UCPS","Reach","clicks per second"),
    ACH_SV("The miracle of having been born","09nh","claim","S10","Perform miracles","times"),
    ACH_SV("It's better than Russian roulette","0m91","roulette","S1","Spin daily","times"),
    // PAGE 2 row 4
    ACH_SV("In the beginning there was only Chaos","0h39","gomega","E100","Obtain","particles","\u03A9"),
    ACH_DAYS("That is the sound of inevitability - AS","0g8w","time","YEAR","Play","days"),
    ACH_ST("Three quarks for Muster Mark! - JJ","0e8o","a","UCB","Big Crunch in",""),
    ACH_SM("Hanc marginis exiguitas non caperet - PF","09yp","energy","U100","Reach 1 GOOGOL Joules",undefined,"J"),
    ACH_B1LB11("There are no straight lines in nature - G","08sn"),
    ACH_SM("We have done the impossible - Firefly","02je","tt","U1","Travel in time"),
    ACH_SM("The universe wants to kill us - NdGT","02yd","prod","U121","Produce over"," ","W"),
    ACH_TIER("On it everyone you love ...","0li7",0),
    ACH_TIER("... everyone you know ...","0m10",1),
    ACH_TIER("... everyone you ever heard of ...","0gst",2),
    ACH_TIER("... lived out their lives - CS","0n6s",3),
    // row 5
    ACH_SV("Research is creating new knowledge","0ewi","ramount","S105","Research","times"),
    ACH_SV("What goes up must come down - IN","0lum","ascension","S1","Big Crunch","times"),
    ACH_SA("Until you see the bottom - OD","0hgx","research","UR","Research","technologies"),
    ACH_SV("Think what nobody else has thought","0mlz","renergy","E1000","Spend","researching","J"),
    ACH_SV("It's nice to be right sometimes - PH","03ac","rtime","U7D","Spend","researching","ms"),
    ACH_SV("Do or do not. There is no try - Yoda","0lmn","somega","E100","Spend","particles","\u03A9"),
    ACH_SA("You're too blind to see - RA","0c99","omega","UOM","Try all Omega upgrades"),
    ACH_SV("Don't let it have any of your energy - JC","03ia","benergy","E1000","Obtain","from buildings","J"),
    ACH_SM("Nothing is too wonderful to be true - F","0098","offline","UOFF","Stay","offline","ms"),
    ACH_SV("Cogito, ergo sum - Descartes","0p9k","energy","U250","E-mail us: info@gaiabyte.com"),
    ACH_SV("The entire universe is mine to control","06k3","energy","E10000","Obtain"," ","J"),
    // row 6
    ACH_SV("God doesn't play dice - AE","0guw","bet","S10","Gamble","times"),
    ACH_SV("Fortune sides with him who dares - V","0706","btrue","S1","Win Gamble","times"),
    ACH_SV("The sure way of getting nothing","09yw","blost","S10","Lose Gamble","times"),
    ACH_SV("Fortune is given to brave men - QE","0h4h","bwon","E1000","Obtain","gambling","J"),
    ACH_SV("I'm an incurable Gambling addict - HST","04p8","bspend","E1000","Gamble"," ","J"),
    ACH_SM("I don't like losing anyways - UB","01i2","bwon","E1000","Win","from 1 bet","J"),
    ACH_SM("It's not gambling when you never lose","0hjf","bspend","E1000","Spend","in 1 bet","J"),
    ACH_SV("Wubba Lubba Dub-Dub","0f4i","djumps","JUMP","Jump dimension","times"),
    ACH_SM("Oh, what a void there is in things.","0gzl","gempty","UPOP","Have","empty"),
    ACH_SM("Seven at one blow!","0kcs","gpop","UPOP","Remove","in 1 move"),
    ACH_SV("Patience and Faith remove mountains","0gwu","gpop","S10","Remove","all time"),
    // row 7
    ACH_SV("Explore, Experiment, Evolve.","0o2b","ltimes","S10","Experiment","times"),
    ACH_SV("Time is money - B.Franklin","0drj","ltimes1","S10","Experiment 1h","times"),
    ACH_SV("Don't be afraid of silly ideas","02fh","ltimes4","S1","Experiment 4h","times"),
    ACH_SV("Good things come to those who wait","0nub","ltimes12","S1","Experiment 12h","times"),
    ACH_SV("All life is an experiment","0nnd","lenergy","E10000","Gain","Experimenting","J"),
    ACH_SV("I did not think; I experimented","0jk2","ltime","UY","Spend","experimenting","ms"),
    ACH_SM("Tyranny of the majority","0ji6","heroes","HEROES","Collect","heroes"),
]

function computeOITEMS() {
    var OITEMS = [
        {
            name: "Fine-structure constant",
            icon: "0h39",
            text: "Doubles production",
            current: function (data,pn) {
                return "x"+pn(Math.pow(2,data.omegas[0]),"",true);
            },
            cost: function (current) {
                return Math.pow(10,current);
            },
        },{
            name: "Cosmological constant",
            icon: "0g8w",
            text: "+1% Natural Disasters",
            current: function (data) {
                var a = (3*60*(100/(100+data.omegas[1])));
                return "~"+stimer(a);
            },
            cost: function (current) {
                return fib(current+2);
            },
        },{
            name: "Add Quark mixing",
            icon: "0e8o",
            text: "-0.5% building cost",
            current: function (data) {
                return "-"+((1-(100+(data.omegas[2]/2))/(100+data.omegas[2]))*100).toFixed(2)+"%";
            },
            cost: function (current) {
                return fib(current+2);
            },
        },{
            name: "Add Neutrino mixing",
            icon: "09yp",
            text: "10% faster research",
            current: function (data) {
                return "+"+((-1+Math.pow(1.1,data.omegas[3]))*100).toFixed(2)+"%";
            },
            cost: function (current) {
                return fact(current+2);
            },
        },{
            name: "Add Boson",
            icon: "08sn",
            text: "Increases base click",
            current: function (data) {
                var val=0;
                for (var i=1; i<=data.omegas[4]; ++i) {
                    var exp=Math.floor(i/10);
                    val+=Math.pow(10,exp);
                }
                return "+"+val;
            },
            cost: function (current) {
                return fact(current+2);
            },
        },{
            name: "Strong coupling const",
            icon: "02je",
            text: "+0.25% prod. to click",
            current: function (data) {
                return "+"+((0.0025*data.omegas[5])*100).toFixed(2)+"%";
            },
            cost: function (current) {
                return Math.pow(current+1,current+1);
            },
        }
    ];
    return OITEMS;
}

function getMilestones() {
    var milestones = [
        {
            amount:1500,
            benefit:{cps:1/10},
            icon:"0h39",
        },{
            amount:3000,
            benefit:{dps:0.005},
            icon:"09yp",
        },{
            amount:5000,
            benefit:{disaster:500},
            icon:"0gwu",
        },{
            amount:7500,
            benefit:{td:1.1},
            icon:"0ich",
        },{
            amount:10000,
            benefit:{cps:2/10},
            icon:"0p9k",
        },{
            amount:15000,
            benefit:{dps:0.01},
            icon:"0c99",
        },{
            amount:20000,
            benefit:{disaster:500},
            icon:"00da",
        },{
            amount:27500,
            benefit:{td:1.2},
            icon:"0ood",
        },{
            amount:35000,
            benefit:{cps:3/10},
            icon:"0gbc",
        },{
            amount:50000,
            benefit:{dps:0.01},
            icon:"0exc",
        },{// 2nd page
            amount:70000,
            benefit:{disaster:1000},
            icon:"09nh",
        },{
            amount:95000,
            benefit:{td:1.3},
            icon:"0orc",
        },{
            amount:120000,
            benefit:{cps:4/10},
            icon:"0f4i",
        },{ 
            amount:150000,
            benefit:{dps:0.01},
            icon:"02je",
        },{
            amount:200000,
            benefit:{disaster:1000},
            icon:"00x9",
        },{
            amount:255000,
            benefit:{td:1.4},
            icon:"0ezb",
        },{
            amount:310000,
            benefit:{cps:4/10},
            icon:"0m9s",
        },{
            amount:370000,
            benefit:{dps:0.01},
            icon:"0h4h",
        },{
            amount:435000,
            benefit:{disaster:1500},
            icon:"0guw",
        },{
            amount:500000,
            benefit:{td:1.5},
            icon:"0g8r",
        },{ // 3rd page
            amount:555555,
            benefit:{cps:4/10},
            icon:"05s2",
        },{
            amount:630000,
            benefit:{dps:0.01},
            icon:"0kcs",
        },{
            amount:720000,
            benefit:{disaster:1500},
            icon:"08kk",
        },{
            amount:820000,
            benefit:{td:1.6},
            icon:"0hel",
        },{
            amount:930000,
            benefit:{cps:4/10},
            icon:"0880",
        },{
            amount:1040000,
            benefit:{dps:0.02},
            icon:"0h39",
        },{
            amount:1155000,
            benefit:{disaster:2000},
            icon:"07ox",
        },{
            amount:1255000,
            benefit:{td:1.7},
            icon:"0bn9",
        },{
            amount:1380000,
            benefit:{cps:5/10},
            icon:"0nyh",
        },{
            amount:1500000,
            benefit:{dps:0.02},
            icon:"0880",
        },{ // 4th page
            amount:1650000,
            benefit:{disaster:2000},
            icon:"0kle",
        },{
            amount:1825000,
            benefit:{td:1.8},
            icon:"07vi",
        },{
            amount:2025000,
            benefit:{cps:5/10},
            icon:"04s6",
        },{
            amount:2500000,
            benefit:{dps:0.02},
            icon:"093g",
        },{
            amount:2775000,
            benefit:{disaster:2000},
            icon:"01cc",
        },{
            amount:3075000,
            benefit:{td:1.9},
            icon:"0875",
        },{
            amount:3425000,
            benefit:{cps:5/10},
            icon:"0otu",
        },{
            amount:3825000,
            benefit:{dps:0.02},
            icon:"0lqw",
        },{
            amount:4325000,
            benefit:{disaster:5000},
            icon:"0b0f",
        },{
            amount:5000000,
            benefit:{td:2.0},
            icon:"0a5a",
        },
        // 5th Page
        {
            amount:5800000,
            benefit:{cps:5/10},
            icon:"0h39",
        },{
            amount:6650000,
            benefit:{dps:0.02},
            icon:"09yp",
        },{
            amount:7570000,
            benefit:{disaster:5000},
            icon:"0f4i",
        },{
            amount:8560000,
            benefit:{td:2.1},
            icon:"0880",
        },{
            amount:9620000,
            benefit:{cps:5/10},
            icon:"0875",
        },{
            amount:10750000,
            benefit:{dps:0.02},
            icon:"093g",
        },{
            amount:11950000,
            benefit:{disaster:5000},
            icon:"0ood",
        },{
            amount:13220000,
            benefit:{td:2.2},
            icon:"0f4i",
        },{
            amount:14560000,
            benefit:{cps:6/10},
            icon:"0m9s",
        },{
            amount:15000000,
            benefit:{dps:0.03},
            icon:"0g8r",
        },
        // 6th Page
        {
            amount:16180339,
            benefit:{disaster:5000},
            icon:"0g8r",
        },{
            amount:17100000,
            benefit:{td:2.3},
            icon:"0guw",
        },{
            amount:18300000,
            benefit:{cps:7/10},
            icon:"0h4h",
        },{
            amount:19600000,
            benefit:{dps:0.03},
            icon:"0m9s",
        },{
            amount:21000000,
            benefit:{disaster:6000},
            icon:"0ezb",
        },{
            amount:22500000,
            benefit:{td:2.4},
            icon:"00x9",
        },{
            amount:24100000,
            benefit:{cps:7/10},
            icon:"02je",
        },{
            amount:25800000,
            benefit:{dps:0.04},
            icon:"0f4i",
        },{
            amount:27182818,
            benefit:{disaster:7000},
            icon:"0orc",
        },{
            amount:29500000,
            benefit:{td:2.5},
            icon:"09nh",
        },
        // 7th Page
        {
            amount:31415926,
            benefit:{cps:8/10},
            icon:"0880",
        },{
            amount:33750000,
            benefit:{dps:0.04},
            icon:"0nyh",
        },{
            amount:36250000,
            benefit:{disaster:8000},
            icon:"0bn9",
        },{
            amount:40000000,
            benefit:{td:2.6},
            icon:"07ox",
        },{
            amount:43000000,
            benefit:{cps:9/10},
            icon:"0h39",
        },{
            amount:46250000,
            benefit:{dps:0.05},
            icon:"0880",
        },{
            amount:49750000,
            benefit:{disaster:9000},
            icon:"0hel",
        },{
            amount:53500000,
            benefit:{td:2.7},
            icon:"08kk",
        },{
            amount:57500000,
            benefit:{cps:10/10},
            icon:"0kcs",
        },{
            amount:60000000,
            benefit:{dps:0.06},
            icon:"05s2",
        },
        // 8th Page
        {
            amount:65000000,
            benefit:{disaster:10000},
            icon:"0h39",
        },{
            amount:71000000,
            benefit:{td:2.8},
            icon:"09yp",
        },{
            amount:78000000,
            benefit:{cps:11/10},
            icon:"0gwu",
        },{
            amount:86000000,
            benefit:{dps:0.07},
            icon:"0ich",
        },{
            amount:95000000,
            benefit:{disaster:11000},
            icon:"0p9k",
        },{
            amount:105000000,
            benefit:{td:2.9},
            icon:"0c99",
        },{
            amount:116000000,
            benefit:{cps:12/10},
            icon:"00da",
        },{
            amount:128000000,
            benefit:{dps:0.08},
            icon:"0ood",
        },{
            amount:141000000,
            benefit:{disaster:12000},
            icon:"0gbc",
        },{
            amount:155000000,
            benefit:{td:3.0},
            icon:"0exc",
        },
    ];
    return milestones;
}
function getShopData(){
    var shopData = [
        // MULTIPLIER
        {
            icon:"0mhz",
            price:"07bx",
            cost:500,
            id:"mul1",
        },{
            icon:"0bh6",
            price:"0khc",
            cost:2300,
            id:"mul5",
        },{
            icon:"0fu9",
            price:"04gj",
            cost:6000,
            id:"mul15",
        },
        // BIG BIG CRUNCH
        {
            icon:"0n9e",
            price:"07bx",
            cost:500,
            id:"tt3",
        },{
            icon:"0m37",
            price:"0gia",
            cost:1000,
            id:"tt7",
        },{
            icon:"04k0",
            price:"0mo7",
            cost:1500,
            id:"tt14",
        },
        // ENCHANCE MIRACLES
        {
            icon:"0mhz",
            price:"07bx",
            cost:500,
            id:"fol1",
        },{
            icon:"0bh6",
            price:"0khc",
            cost:2300,
            id:"fol5",
        },{
            icon:"0fu9",
            price:"04gj",
            cost:6000,
            id:"fol15",
        },
        // TIME TRAVEL
        {
            icon:"0jnr",
            price:"07bx",
            cost:500,
            id:"bc2",
        },{
            icon:"02yt",
            price:"0gia",
            cost:1000,
            id:"bc5",
        },{
            icon:"0fwn",
            price:"09o4",
            cost:2000,
            id:"bc12",
        },
        // KEYS
        {
            cost:100,
            id:"bk1",
        },{
            cost:1000,
            id:"bk11",
        },{
            cost:2000,
            id:"bk25",
        }
    ];
    return shopData;
}
function computeChest(){
    var RH = [
        // common
        [7,10,13,16,21,24,30,36,45,62,77,93,110,140,149,165,181,191],
        // rare
        [8,11,14,17,22,25,31,37,46,63,78,94,111,141,150,166,182,192],
        // legendary
        [9,12,15,18,23,26,32,38,47,64,79,95,112,142,151,167,183,193],
    ]
    var caseData = [
        // DISASTER
        {
            box:"0gci",
            prize:"0hba",
            name:"x10 Disaster",
            c:0.12,
            t:"DIS",
            v:20,
        },{
            box:"00bz",
            prize:"0hba",
            name:"x10 Disaster",
            c:0.06,
            t:"DIS",
            v:50,
        },{
            box:"0iku",
            prize:"0hba",
            name:"x10 Disaster",
            c:0.02,
            t:"DIS",
            v:200,
        },
        // MULTIPLIER
        {
            box:"0gci",
            prize:"0p22",
            name:"Energy Multiplier",
            c:0.12,
            t:"MUL",
            v:60*60*1000,
        },{
            box:"00bz",
            prize:"0p22",
            name:"Energy Multiplier",
            c:0.06,
            t:"MUL",
            v:4*60*60*1000,
        },{
            box:"0iku",
            prize:"0p22",
            name:"Energy Multiplier",
            c:0.02,
            t:"MUL",
            v:12*60*60*1000,
        },
        // FOLLOWERS
        {
            box:"0gci",
            prize:"09vy",
            name:"Followers",
            c:0.12,
            t:"FOL",
            v: 400,
            p: 0.0001,
        },{
            box:"00bz",
            prize:"09vy",
            name:"Followers",
            c:0.06,
            t:"FOL",
            v: 2000,
            p: 0.0005,
        },{
            box:"0iku",
            prize:"09vy",
            name:"Followers",
            c:0.02,
            t:"FOL",
            v: 5000,
            p: 0.0015,
        },
        // MARBLES
        {
            box:"0gci",
            prize:"064r",
            name:"Universe Marbles",
            c:0.12,
            t:"UM",
            v:20,
        },{
            box:"00bz",
            prize:"064r",
            name:"Universe Marbles",
            c:0.06,
            t:"UM",
            v:50,
        },{
            box:"0iku",
            prize:"064r",
            name:"Universe Marbles",
            c:0.02,
            t:"UM",
            v:200,
        },
        // HERO
        {
            box:"0gci",
            prize:"064r",
            name:"Common Hero",
            c:0.12,
            t:"HERO",
            v:RH[0],
        },{
            box:"00bz",
            prize:"064r",
            name:"Rare Hero",
            c:0.06,
            t:"HERO",
            v:RH[1],
        },{
            box:"0iku",
            prize:"064r",
            name:"Legendary Hero",
            c:0.02,
            t:"HERO",
            v:RH[2],
        },
    ];
    return caseData;
}
function getDimensions(){
    var dimensionsData = [
        {
            name:"8-Bit",
            bg:"0a0y",
            pbonus: {
                type: "popmul",
                value: 1,
                text: function (times) {
                    return "Population production x"+(times+1);
                }
            },
            abonus: {
                type: "click",
                value: 3,
                text: "Triples clicks"
            },
            bonus: {building: "012x",text:"Building: 8-Bit Cannon"},
        },{
            name:"Candy",
            bg:"0ihd",
            pbonus: {
                type: "labmul",
                value: 0.01,
                text: function (times) {
                    return "Experiment reward +"+times+"%";
                }
            },
            abonus: {
                type: "labtimer",
                value: 0.8,
                text: "Experiments time -20%"
            },
            bonus: {building: "0lyk",text:"Building: Lucy"},
        },{
            name:"Colors",
            bg:"0mb5",
            pbonus: {
                type: "apmul",
                value: 0.01,
                text: function (times) {
                    return "Increases AP mult +"+times+"%";
                }
            },
            abonus: {
                type: "aptimer",
                value: 2,
                text: "Doubles AP spawn"
            },
            bonus: {building: "05er", text:"Building: Chroma Core"},
        },{
            name:"Aquatic",
            bg:"0cju",
            pbonus: {
                type: "challengeinc",
                value: 0.001,
                text: function (times) {
                    return "Challenge Bonus +"+(times/10).toFixed(1)+"%";
                }
            },
            abonus: {
                type: "challengemul",
                value: 2,
                text: "Doubles Challenge Bonus"
            },
            bonus: {building: "0nl9", text:"Building: Hydro Drive"},
        },{
            name:"Black Holes",
            bg:"0hy2",
            pbonus: {
                type: "gamblingr",
                value: 0.01,
                text: function (times) {
                    return "Gambing Omega Loss -"+times+"%";
                }
            },
            abonus: {
                type: "gambling",
                value: 2,
                text: "Gambling returns 99%"
            },
            bonus: {building: "0hze", text: "Reduce Quantum Zones"},
        },{
            name:"Inception",
            bg:"0fgl",
            pbonus: {
                type: "restime",
                value: 1,
                text: function (times) {
                    return "Research time -"+times+"s";
                }
            },
            abonus: {
                type: "resspeed",
                value: 2,
                text: "Doubles Research speed"
            },
            bonus: {building: "0aec", text:"Save last Dimension"},
        },{
            name:"Cube",
            bg:"0aca",
            pbonus: {
                type: "tdspd",
                value: 0.01,
                text: function (times) {
                    return "Energy orbs ASPD -"+times+"%";
                }
            },
            abonus: {
                type: "tdd",
                value: 2,
                text: "Doubles Energy Orbs Damage"
            },
            bonus: {building: "0hel", text:"Reduces Energy Orbs"},
        },{
            name:"Mechanical",
            bg:"082d",
            pbonus: {
                type: "popprice",
                value: 0.01,
                text: function (times) {
                    return "Population cost -"+times+"%";
                }
            },
            abonus: {
                type: "buildprod",
                value: 2,
                text: "Doubles Building Production"
            },
            bonus: {building: "0bn9", text:"Building: O'clock Fusion"},
        },{
            name:"Subatomic",
            bg:"0n8p",
            pbonus: {
                type: "supert",
                value: 0.01,
                text: function (times) {
                    return "Increase Disaster Spawn +"+times+"%";
                }
            },
            abonus: {
                type: "qsuper",
                value: 4,
                text: "Quads Disasters"
            },
            bonus: {building: "0g8r", text:"Building: Subatomic Core"},
        }
    ];
    return dimensionsData;
}
function getDataED() {
    var Path = [
        // 10
        [4,14,24,34,44,54,64,74,84,94],
        // 12
        [4,14,24,34,44,45,55,65,64,74,84,94],
        // 14
        [4,14,24,34,44,45,46,56,66,65,64,74,84,94],
        // 16
        [4,14,24,34,35,36,46,56,55,54,53,63,73,74,84,94],
        // 18
        [4,14,24,25,26,36,46,45,44,43,53,63,64,65,75,85,84,94],
        // 20
        [4,14,24,34,33,43,53,54,55,45,46,47,57,67,66,76,75,74,84,94],
        // 22
        [4,14,24,34,33,32,42,52,53,54,55,45,46,47,57,67,66,76,75,74,84,94],
        // 24
        [4,14,24,25,35,36,46,47,57,67,66,65,55,54,44,43,42,52,62,63,73,74,84,94],
        // 26
        [4,14,24,25,35,36,46,47,57,67,66,65,55,54,44,43,42,41,51,61,62,63,73,74,84,94],
        // 28
        [4,14,24,25,35,36,46,47,57,67,66,65,55,54,44,43,33,32,31,41,51,52,62,63,73,74,84,94],
        // 30
        [4,14,24,25,35,36,46,47,48,58,68,67,66,65,55,54,44,43,33,32,31,41,51,52,62,63,73,74,84,94],
        // 32
        [4,14,24,25,35,36,46,47,57,58,68,78,77,76,66,65,55,54,44,43,33,32,31,41,51,52,62,63,73,74,84,94],
        // 34
        [4,14,24,34,33,43,42,52,51,61,71,72,73,63,64,54,55,45,46,36,26,27,28,38,48,58,57,67,66,76,75,85,84,94],
        // 36
        [4,14,24,34,33,43,42,52,51,61,71,72,73,63,64,54,55,45,46,36,26,27,28,38,39,49,59,58,57,67,66,76,75,85,84,94],
        // 38
        [4,14,24,25,35,36,37,47,48,58,59,69,79,78,77,67,66,56,55,54,44,43,33,32,31,30,40,50,51,52,62,63,73,74,75,85,95,94],
        // 40
        [4,14,24,25,35,36,37,47,48,58,59,69,79,78,77,67,66,56,55,54,44,43,33,32,22,21,20,30,40,41,51,52,62,63,73,74,75,85,95,94],
        // 42
        [4,14,24,34,35,45,46,47,37,27,28,29,39,49,59,58,68,67,77,87,86,85,75,65,64,54,53,43,42,32,31,30,40,50,51,61,62,72,73,83,93,94],
        // 44
        [4,14,24,34,35,45,46,47,37,27,28,29,39,49,59,58,68,67,77,87,86,85,75,65,64,54,53,43,42,32,22,21,20,30,40,50,51,61,62,72,73,83,93,94],
        // 46
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,17,18,28,29,39,49,59,69,68,78,77,87,86,85,75,74,64,63,53,52,42,41,40,50,60,61,71,72,82,83,93,94],
        // 48
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,17,18,28,29,39,49,59,69,68,78,77,87,86,85,75,74,64,63,53,52,42,32,31,30,40,50,60,61,71,72,82,83,93,94],
        // 50
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,17,18,28,29,39,49,59,69,68,78,77,87,86,85,75,74,64,63,53,52,42,32,22,21,20,30,40,50,60,61,71,72,82,83,93,94],
        // 52
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,6,7,8,18,28,29,39,49,59,69,68,78,77,87,86,85,75,74,64,63,53,52,42,32,22,21,20,30,40,50,60,61,71,72,82,83,93,94],
        // 54
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,6,7,8,18,28,29,39,49,59,69,68,78,77,87,86,85,75,74,64,63,53,52,42,32,22,12,11,10,20,30,40,50,60,61,71,72,82,83,93,94],
        // 56
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,6,7,8,18,28,29,39,49,59,69,68,78,88,98,97,96,86,76,75,74,64,63,53,52,42,32,22,12,11,10,20,30,40,50,60,61,71,72,82,83,93,94],
        // 58
        [4,14,24,34,44,45,55,56,57,47,37,36,26,16,6,7,8,18,28,29,39,49,59,69,68,78,88,98,97,96,86,76,75,74,64,63,53,52,42,32,22,12,2,1,0,10,20,30,40,50,60,61,71,72,82,83,93,94],
        // 60
        [4,14,24,34,35,45,55,54,53,43,42,32,22,12,11,10,20,30,40,50,51,61,71,70,80,90,91,92,82,83,73,74,75,76,66,67,57,47,37,27,26,16,6,7,8,18,19,29,39,49,59,69,79,78,88,87,97,96,95,94],
        // 62
        [4,14,24,34,35,45,55,54,53,43,42,32,22,12,2,1,0,10,20,30,40,50,51,61,71,70,80,90,91,92,82,83,73,74,75,76,66,67,57,47,37,27,26,16,6,7,8,18,19,29,39,49,59,69,79,78,88,87,97,96,95,94],
    ];
    return Path;
}

function getSeasonShopData(){
    var shopData = [
        {
            icon:"0mhz",
            price:"07bx",
            cost:500,
            id:"mul1",
        }
    ];
    return shopData;
}

function getSeasonPassData(){
    var passData =[
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
                rcurr: "KEY",
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
                rcurr: "KEY",
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
                rcurr: "KEY",
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
    return passData;
}

function getStarDustData(){
    var shopData = [
        // PG
        {
            icon:"0j14",
            qty:"vjqu",
            cost:30000,
            id:"pg1",
            scale:1,
        },{
            icon:"0j14",
            qty:"ntzc",
            cost:540000,
            id:"pg20",
            scale:1,
        },{
            icon:"0j14",
            qty:"gnx2",
            cost:2400000,
            id:"pg100",
            scale:1,
        },
        // CC
        {
            icon:"0ap1",
            qty:"vjqu",
            cost:15000,
            id:"cc1",
            scale:1,
        },{
            icon:"0ap1",
            qty:"ntzc",
            cost:270000,
            id:"cc20",
            scale:1,
        },{
            icon:"0ap1",
            qty:"gnx2",
            cost:1200000,
            id:"cc100",
            scale:1,
        },
        // AS
        {
            icon:"08y7",
            qty:"vjqu",
            cost:60000,
            id:"as1",
            scale:0.75,
        },{
            icon:"08y7",
            qty:"ntzc",
            cost:1080000,
            id:"as20",
            scale:0.75,
        },{
            icon:"08y7",
            qty:"gnx2",
            cost:4800000,
            id:"as100",
            scale:0.75,
        },
        // KEYS
        {
            icon:"n0bh",
            qty:"vjqu",
            cost:50000,
            id:"k1",
            scale:0.65,
        },{
            icon:"n0bh",
            qty:"ntzc",
            cost:950000,
            id:"k20",
            scale:0.65,
        },{
            icon:"n0bh",
            qty:"gnx2",
            cost:4500000,
            id:"k100",
            scale:0.65,
        },
        // HERO KEYS
        {
            icon:"2dmk",
            qty:"vjqu",
            cost:165000,
            id:"hk1",
            scale:0.6,
        },{
            icon:"2dmk",
            qty:"ntzc",
            cost:3135000,
            id:"hk20",
            scale:0.6,
        },{
            icon:"2dmk",
            qty:"gnx2",
            cost:15000000,
            id:"hk100",
            scale:0.6,
        },
        // EM
        {
            icon:"00dh",
            qty:"vjqu",
            cost:560000,
            id:"em1",
            scale:1,
        },{
            icon:"00dh",
            qty:"gnx2",
            cost:5300000,
            id:"em10",
            scale:1,
        },{
            icon:"00dh",
            qty:"ntzc",
            cost:10000000,
            id:"em20",
            scale:1,
        },
    ];
    return shopData;
}

function getCalendar() {
    var calendarData = ["CS","AS","H137","EM","CC","UM","PG","CS","AS","H138","EM","CC","UM","PG","CS","AS","H139","EM","CC","UM","PG","CS","AS","H199"];
    return calendarData;
}

function getAdventValues() {
    var adventData = [[200,100,20],[80,50,20],[27,18,9],[6,4,2],[250,125,40],[600,300,100],[120,60,25],[200,100,20],[80,50,20],[18,12,6],[6,4,2],[250,125,40],[600,300,100],[120,60,25],[200,100,20],[80,50,20],[9,6,3],[9,6,3],[375,190,60],[1000,500,175],[160,90,35],[300,150,30],[130,80,30],[27,18,9]];
    return adventData;
}

function doGift() {
    var RH = [
        // common
        [7,10,13,16,21,24,30,36,45,62],
        // rare
        [8,11,14,17,22,25,31,37,46,63],
        // legendary
        [9,12,15,18,23,26,32,38,47,64],
    ];

    var giftData = [
        // Candy Sticks
        {
            prize:"8tlo",
            name:"Candy Sticks",
            c:0.185,
            t:"CS",
            v:10,
        },{
            prize:"pnzu",
            name:"Candy Sticks",
            c:0.085,
            t:"CS",
            v:25,
        },{
            prize:"ovqt",
            name:"Candy Sticks",
            c:0.03,
            t:"CS",
            v:100,
        },
        // Ascension Sphere
        {
            prize:"08y7",
            name:"Ascension Sphere",
            c:0.185,
            t:"AS",
            v:3,
        },{
            prize:"08y7",
            name:"Ascension Sphere",
            c:0.085,
            t:"AS",
            v:10,
        },{
            prize:"08y7",
            name:"Ascension Sphere",
            c:0.03,
            t:"AS",
            v:20,
        },
        // Xmas Heroes
        {
            prize:"08y7",
            name:"Common Xmas",
            c:0.18,
            t:"XHERO",
            v:200,
        },{
            prize:"08y7",
            name:"Rare Xmas",
            c:0.12,
            t:"XHERO",
            v:201,
        },{
            prize:"08y7",
            name:"Legendary Xmas",
            c:0.07,
            t:"XHERO",
            v:202,
        },{
            prize:"08y7",
            name:"Ascended Xmas",
            c:0.03,
            t:"XHERO",
            v:203,
        },
    ];
    return giftData;
}

function getPromoPrice() {
    var promoPrice = [
        [[25,100,300,600],[125,500,1500,3000]],
        [["QUEST","QUEST","QUEST","QUEST"],[250,1000,3000,6000]],
        [[50,200,600,1200],[375,1500,4500,9000]],
        [["WB","WB","WB","WB"],[500,2000,6000,12000]],
        [[100,400,1200,2400],[625,2500,7500,15000]],
        [[1,2,3,4],[1000,2000,4000,8000]],
    ];
    return promoPrice;
}

function getEasterData() {
    var eData = {
        community: [
            {
                m: 100000,
                t: "Cosmic Coins x50",
                egg: "wmlk",
                curr: "cc",
                q: 50,
            },
            {
                m: 240000,
                t: "Extra Milestones Page",
                egg: "fbpx",
                d: "Extra Milestones/nPage",
            },
            {
                m: 370000,
                t: "Prana Gems x35",
                egg: "wmlk",
                curr: "pg",
                q: 35,
            },
            {
                m: 500000,
                t: "Enchance Miracles affects on Lucky Followers",
                egg: "fbpx",
                d: "EM affects/nLucky Followers",
            },
            {
                m: 640000,
                t: "Hero: SPARKS x36 Levels",
                egg: "sgfv",
                id: 97,
                q: 36,
            },
            {
                m: 780000,
                t: "Quest & Dungeon Highscore System",
                egg: "fbpx",
                d: "Quest & Dungeon/nHighscores",
            },
            {
                m: 920000,
                t: "Chest Keys x15",
                egg: "wmlk",
                curr: "key",
                q: 15,
            },
            {
                m: 1070000,
                t: "Personalized Display for Season Winners",
                egg: "fbpx",
                d: "Season Winners/nTag",
            },
            {
                m: 1200000,
                t: "Hero Chest Keys x10",
                egg: "wmlk",
                curr: "hk",
                q: 10,
            },
            {
                m: 1400000,
                t: "Flash Auction - One random Hero will be available at 1 hour auction",
                egg: "fbpx",
                d: "Flash Auction",
            },
            {
                m: 1520000,
                t: "Ascension Spheres x25",
                egg: "wmlk",
                curr: "as",
                q: 25,
            },
            {
                m: 1680000,
                t: "Cosmic Catcher & Match Paris Highscore System",
                egg: "fbpx",
                d: "CC & MP/nHighscores",
            },
            {
                m: 1830000,
                t: "Universe Marbles x1000",
                egg: "wmlk",
                curr: "um",
                q: 1000,
            },
            {
                m: 2000000,
                t: "Ascension Spheres to Cosmic Coins Conversion 1:3",
                egg: "fbpx",
                d: "AS to CC/n1:3",
            },
            {
                m: 2165000,
                t: "Add 20 seconds more on Cosmic Catcher",
                egg: "fbpx",
                d: "+20 sec/nCosmic Catcher",
            },
            {
                m: 2330000,
                t: "Energy System for Hourly Battles",
                egg: "fbpx",
                d: "Hourly Battles/nEnergy System",
            },
            {
                m: 2500000,
                t: "Hero: LEAF x18 Levels",
                egg: "sgfv",
                id: 98,
                q: 18,
            },
            {
                m: 2680000,
                t: "Ultimate Aura - New Monsters Tier",
                egg: "fbpx",
                d: "Ultimate Aura",
            },
            {
                m: 2850000,
                t: "Add an extra life on Keys Tower",
                egg: "fbpx",
                d: "Keys Towers/n+1 Life",
            },
            {
                m: 3000000,
                t: "Void World Boss",
                egg: "fbpx",
                d: "Void/nWorld Boss",
            },
            {
                m: 3200000,
                t: "Improve Cosmos Lottery",
                egg: "fbpx",
                d: "Cosmos Lottery/nImprove",
            },
            {
                m: 3400000,
                t: "Secondary Active Tournament (12h - 24h)",
                egg: "fbpx",
                d: "Secondary/nTournament",
            },
            {
                m: 3600000,
                t: "Improve Flash Tournaments Rewards",
                egg: "fbpx",
                d: "Improve FT/nRewards",
            },
            {
                m: 3800000,
                t: "Promotion 6",
                egg: "fbpx",
                d: "Promotion 6",
            },
            {
                m: 4000000,
                t: "Hero: FLYNN x9 Levels",
                egg: "sgfv",
                id: 99,
                q: 9,
            },
            {
                m: 4200000,
                t: "Live Battles",
                egg: "fbpx",
                d: "Live Battles",
            },
            {
                m: 4400000,
                t: "Improve Dungeon Rewards",
                egg: "fbpx",
                d: "Improve Dun/nRewards"
            },
            {
                m: 4600000,
                t: "Guilds System",
                egg: "fbpx",
                d: "Guilds/nSystem"
            },
            {
                m: 4800000,
                t: "Add an extra life on Match Pairs",
                egg: "fbpx",
                d: "Match Pairs/n+1 Life",
            },
            {
                m: 5000000,
                t: "Big Rip - New reset system for the Idle part",
                egg: "fbpx",
                d: "Big Rip",
            }
        ],
        personal: [
            {
                m: 50,
                t: "Cosmic Coins x50",
                egg: "wmlk",
                curr: "cc",
                q: 50,
            },
            {
                m: 100,
                t: "Prana Gems x30",
                egg: "wmlk",
                curr: "pg",
                q: 30,
            },
            {
                m: 160,
                t: "Ascension Spheres x25",
                egg: "wmlk",
                curr: "as",
                q: 25,
            },
            {
                m: 230,
                t: "Hero: WILLOW",
                egg: "sgfv",
                id: 161,
            },
            {
                m: 310,
                t: "Chest Keys x15",
                egg: "wmlk",
                curr: "key",
                q: 15,
            },
            {
                m: 400,
                t: "Universe Marbles x500",
                egg: "wmlk",
                curr: "um",
                q: 500,
            },
            {
                m: 500,
                t: "Quest Solver",
                egg: "0o1k",
                d: "Quest/nSolver",
            },
            {
                m: 630,
                t: "Enchance Miracles x5",
                egg: "wmlk",
                curr: "em",
                q: 5,
            },
            {
                m: 800,
                t: "Reduce Miracles Timer by 5%",
                egg: "0o1k",
                d: "Miracles/nTimer -5%",
            },
            {
                m: 1000,
                t: "Hero: GIZMO",
                egg: "sgfv",
                id: 162,
            },
            {
                m: 1400,
                t: "Daily Quest Solver",
                egg: "0o1k",
                d: "DQ Solver",
            },
            {
                m: 2000,
                t: "Cosmic Coins Dispenser: 30 CC during 60 days or 10 CC LifeTime",
                egg: "0o1k",
                d: "CC Dispenser",
                e: "CC",
            },
            {
                m: 3000,
                t: "Hero: DAISY",
                egg: "sgfv",
                id: 163,
            },
            {
                m: 4000,
                t: "Dungeon Solver",
                egg: "0o1k",
                d: "Dungeon/nSolver",
            },
            {
                m: 5500,
                t: "Prana Gems Dispenser: 30 PG during 60 days or 10 PG LifeTime",
                egg: "0o1k",
                d: "PG Dispenser",
                e: "PG",
            },
            {
                m: 8000,
                t: "Reduce World Boss timer one hour",
                egg: "0o1k",
                d: "WB Timer/n-1 Hour",
            },
            {
                m: 11000,
                t: "Universe Marbles Dispenser: 300 UM during 60 days or 100 UM LifeTime",
                egg: "0o1k",
                d: "UM Dispenser",
                e: "UM",
            },
            {
                m: 16000,
                t: "World Boss Solver",
                egg: "0o1k",
                d: "World Boss/nSolver",
            },
            {
                m: 22000,
                t: "Reduce Miracles Timer by 5%",
                egg: "0o1k",
                d: "Miracles/nTimer -5%",
            },
            {
                m: 30000,
                t: "Flash Tournament Solver",
                egg: "0o1k",
                d: "Flash/nSolver",
            },
            {
                m: 35000,
                t: "Hero: THUMPER",
                egg: "sgfv",
                id: 164,
            },
            {
                m: 41000,
                t: "Reduce World Boss timer one hour",
                egg: "0o1k",
                d: "WB Timer/n-1 Hour",
            },
            {
                m: 48000,
                t: "Ascension Spheres Dispenser: 30 AS during 60 days or 10 AS LifeTime",
                egg: "0o1k",
                d: "AS Dispenser",
                e: "AS",
            },
            {
                m: 57000,
                t: "Tournament Solver",
                egg: "0o1k",
                d: "Tournament/nSolver",
            },
            {
                m: 75000,
                t: "Free Silver Weekly Chest LifeTime",
                egg: "0o1k",
                d: "Silver Chest/nLifeTime",
            },
            {
                m: 90000,
                t: "Reduce World Boss timer one hour",
                egg: "0o1k",
                d: "WB Timer/n-1 Hour",
            },
            {
                m: 105000,
                t: "Double Enchance Miracles",
                egg: "0o1k",
                d: "EM/nGrants x4",
            },
            {
                m: 125000,
                t: "Free Promotion 4th",
                egg: "0o1k",
                d: "Free P4",
            },
            {
                m: 150000,
                t: "Reduce recycle timer by 20%",
                egg: "0o1k",
                d: "Recyle Timer/n-20%",
            }
        ],
        cclaimable:  [
            {
                m: 100000,
                curr: "CC",
                q: 50,
            },
            {
                m: 370000,
                curr: "PG",
                q: 35,
            },
            {
                m: 640000,
                curr: "HERO",
                id: 97,
                q: 36,
            },
            {
                m: 920000,
                curr: "PK",
                q: 15,
            },
            {
                m: 1200000,
                curr: "KU",
                q: 100,
            },
            {
                m: 1520000,
                curr: "AS",
                q: 25,
            },
            {
                m: 1830000,
                curr: "UM",
                q: 1000,
            },
            {
                m: 2500000,
                curr: "HERO",
                id: 98,
                q: 18,
            },
            {
                m: 4000000,
                curr: "HERO",
                id: 99,
                q: 9,
            },
        ],
    };
    return eData;
}


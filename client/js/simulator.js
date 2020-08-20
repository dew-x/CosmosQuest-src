var configs = {
    casual: {
        cps: 4,
        behaviour: [1*60*60,23*60*60],
        scr: 0.1,
    },
    midcore: {
        cps: 6,
        behaviour: [2*60*60,8*60*60],
        scr: 0.25,
    },
    hardcore: {
        cps: 5,
        behaviour: [24*60*60,0*60*60],
        scr: 1,
    }
}
var maxtime = 30*24*60*60;
var minstep = 10;
var superclick = (3*60)/minstep;
var test = ["hardcore"];

function clone(obj) {
    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) return obj;

    if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
    else
        var temp = obj.constructor();

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }

    return temp;
}
function print(str) {
    var t = new Date();
    var ts = t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
    console.log(ts,str);
}
var __cache=[];
function printobj(obj) {
    var t = new Date();
    var ts = t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
    __cache.push(clone(obj));
    console.log(__cache[__cache.length-1]);
}
var reg = {};
function register(UUID,data,bprod) {
    var percs = [];
    var sum = 0;
    for (var i=0; i<bprod.length; ++i) {
        percs.push(0);
        sum+=bprod[i];
    }
    for (var i=0; i<bprod.length; ++i) {
        percs[i]=100*bprod[i]/sum;
    }
    reg[UUID] = {
        p10: Math.log10(data.stats.c.v.energy),
        buildings: data.buildings.slice(),
        upgrades: data.buildUpgrade.slice(),
        evolutions: data.buildLevel.slice(),
        hours: data.stats.c.v.time/(60*60*1000),
        cperc: data.stats.c.v.cenergy/data.stats.c.v.energy,
        bperc: data.stats.c.v.benergy/data.stats.c.v.energy,
        sperc: data.stats.c.v.senergy/data.stats.c.v.energy,
        rtime: data.stats.c.v.rtime/data.stats.c.v.time,
        percs: percs,
        omega: data.omegas.slice(),
    }
}
function registerlog() {
    for (var action in reg) {
        console.log(action);
        console.log(reg[action]);
    }
}
var mem = [];
function registerclear() {
    mem.push(reg);
    reg={};
}
var research = [];
var pid = -1;
function endedResearch(time){
    if (pid!==-1) {
        research[pid].end=time;
        research[pid]=(research[pid].paused?"p":"")+(time-research[pid].start);
        pid=-1;
    }
}
function startResearch(rid,time) {
    if (research[rid]==undefined || research[rid].end==-1) { 
        research[rid]={
            start:time,
            end:-1,
            paused:false,
        }
        pid = rid;
    }
}
function pauseResearch(rid) {
    research[rid].paused=true;
    pid=-1;
}
function arr2csv(arr) {
  var csv = arr.map(function(d){
    return JSON.stringify(d);
  }).join('\n').replace(/(^\[)|(\]$)/mg, '');
  var pas1 = csv.replace(/,/g,";");
  var pas2 = pas1.replace(/\./g,",");
  return pas2;
}
var berror = undefined;
Game.prototype.autoplay = function () {
    print("AUTOPLAY BEGIN");
    var TECH = computeTECH();
    var ctx = document.getElementById("canvas").getContext("2d");
    for (var ti=0; ti<test.length; ++ti) {
        var b0=[];
        var points = [];
        var last = 0;
        var id = test[ti];
        print("BEGIN "+id);
        var bh = configs[id].behaviour; // behaviour
        var cps = configs[id].cps; // clicks per second
        var scr = configs[id].scr; // superclick ratio
        var bc = 0;
        this.reset();
        var data = mkdata();
        data.buildingAmount = "NXT";
        this.setData(data);
        this.evalBuildings();
        this.evalResearch();
        var time = 0;
        var mp = [];
        /*for (var i=0; i<12; ++i) {
            mp.push([{t:0,v:0},{t:0,v:0}]);
            if (i==0) {
                mp[0].push({t:0,v:0});
                mp[0].push({t:0,v:0});
                mp[0].push({t:0,v:0});
                mp[0].push({t:0,v:0});
                mp[0].push({t:0,v:0});
            }
        }*/
        var pat = undefined;
        while (time<maxtime) {
            /*if ((time/maxtime)*w>last) {
                points[last]=[
                    data.stats.c.v.benergy/data.stats.c.v.energy,
                    data.stats.c.v.cenergy/data.stats.c.v.energy,
                    data.stats.c.v.senergy/data.stats.c.v.energy,
                ];
                ++last;
            }*/
            var bp = this.getBProduction();
            var sum = this.getProduction();
            /*for (var i=0; i<12; ++i) {
                if (sum>0 && data.buildLevel[i]>=0 && !isNaN(bp[i]) && bp[i]/sum>mp[i][data.buildLevel[i]].v) {
                    mp[i][data.buildLevel[i]].v = bp[i]/sum;
                    mp[i][data.buildLevel[i]].t = time;
                }
            }*/
            // check evolution/ascend
            if (data.specie<SPECIES.length-1 && data.stats.c.v.energy>SPECIES[data.specie+1].requires) {
                // evolve
                this.doAction("evolve");
                register(data.stats.t.v.ascension+"evolve"+data.specie,data,this.getBProduction());
            }
            // click
            for (var i=0; i<cps*minstep; ++i) {
                this.doAction("click",{},-1,-1);
            }
            // superclick
            if (Math.random()<1/superclick) {
                if (Math.random()<scr) {
                    this.doAction("superclick",{},-1,-1);
                }
            }
            // build buildings could be better
            for (var i=data.buildings.length-1; i>=0; --i) {
                var str=0;
                //if (i==0) str=data.buildings[0];
                this.doAction("build",{target:i});
                /*if (i==0 && str!=data.buildings[0]) {
                    b0[str]=[str,time,this.getProduction()];
                }*/
            }
            // research 
            var res = this.exposeResearch();
            // no research
            if (data.researching===undefined) {
                endedResearch(time);
                if (res.length) {
                    startResearch(res[0],time);
                    this.doAction("research",{target:res[0]});
                }
            } else if (res[0]!=data.researching) {
                // start smallest research
                var todo = TECH[data.researching].cost - data.research[data.researching].done;
                var other = TECH[res[0]].cost;
                if (todo>other) {
                    pauseResearch(data.researching);
                    startResearch(res[0],time);
                    this.doAction("research",{target:res[0]});
                }
            }
            // update
            this.updateProduction(minstep*1000);
            time+=minstep;
            // eval end of step    
            bc+=minstep;
            if (bc>bh[0]) {
                bc = 0;
                this.updateProduction(bh[1]*1000);
                time+=bh[1];
            }
            if ((data.omega==0 && this.getOmegas()>=11)||(data.stats.t.v.gomega>0 && data.stats.t.v.gomega<this.getOmegas()/2)) {
                this.evalOmega();
                register(data.stats.t.v.ascension+"ascend",data,this.getBProduction());
                console.log(data.stats.t.v.ascension,data.omega,time,(pat?time-pat:time)/(60*60));
                pat=time;
                this.ascend();
                var ob = [
                    1,
                    0.01,
                    0.01,
                    0.01,
                    0.1,
                    0.1
                ]
                for (var uid=0; uid<ob.length; ++uid) {
                    var price = OITEMS[uid].cost(data.omegas[uid]);
                    while (price<=data.omega*ob[uid]) {
                        this.doAction("omega",{target:uid});
                        price = OITEMS[uid].cost(data.omegas[uid]);
                    }
                }
            }
        }
        register("end",data,this.getBProduction());
        /*var BP = this.getBProduction();
        var str = "[";
        for (var i=0; i<BP.length; ++i) {
            if (i!=0) str+=",";
            str+=(BP[i]/this.getProduction()).toFixed(2);
        }
        str+="]";
        register("PROD",str,time);
        register("PROD","("+(data.benergy/(data.benergy+data.cenergy)).toFixed(2)+"/"+(data.cenergy/(data.benergy+data.cenergy)).toFixed(2)+")",time);
        printobj(data.buildings.slice(0));
        
        registerclear();*/
        //console.log(arr2csv(b0));
        console.log(research);
        //console.log(mp);
        /*var error = 0;
        var worst = undefined;
        for (var bi=0; bi<mp.length; ++bi) {
            for (var ei=0; ei<mp[bi].length; ++ei) {
                var val = ((BP[bi]/mp[bi][ei].v)*0.75);
                if (ei>0) val = (Math.log(3/(4*mp[bi][ei].v))/Math.log(BE[bi])+BEVO[bi][ei]);
                error+=Math.abs(mp[bi][ei].v-0.75);
                if (mp[bi][ei].v>0.8) {
                    /*if (ei==0) BP[bi]=isFinite(val)?val:BP[bi];
                    else BEVO[bi][ei]=isFinite(val)?val:BEVO[bi][ei];
                    console.log("LOWER",bi,ei,mp[bi][ei].v,val.toFixed(2));
                } else if (mp[bi][ei].v<0.7) {
                    /*if (ei==0) BP[bi]=isFinite(val)?val:BP[bi];
                    else BEVO[bi][ei]=isFinite(val)?val:BEVO[bi][ei];
                    console.log("RAISE",bi,ei,mp[bi][ei].v,val.toFixed(2));
                }
                if (bi+ei!=0) {
                    if (isFinite(val) && (worst==undefined || worst.e<Math.abs(mp[bi][ei].v-0.75))) {
                        worst = {bi:bi,ei:ei,val:val,e:Math.abs(mp[bi][ei].v-0.75)};
                    }
                }
            }
        }*/
        /*if (worst.ei==0) {
            console.log("WORST",worst.bi,worst.ei,BP[worst.bi],"->",worst.val);
            BP[worst.bi]=worst.val;
        } else {
            console.log("WORST",worst.bi,worst.ei,BEVO[worst.bi][worst.ei],"->",worst.val);
            BEVO[worst.bi][worst.ei]=worst.val;
        }
        if (berror===undefined||berror>error) berror=error;
        console.log("ERROR "+error,berror,error-berror);
        BP[0]=0.1;
        console.log("var BP="+JSON.stringify(BP)+";");
        console.log("var BEVO="+JSON.stringify(BEVO)+";");*/
        registerlog();
        registerclear();
        print("DONE in "+timer(time));
        /*for (var i=0; i<points.length; ++i) {
            ctx.fillStyle="blue";
            var py = h*points[i][0];
            ctx.fillRect(i,0,1,py);
            ctx.fillStyle="red";
            var py1 = h*points[i][1];
            ctx.fillRect(i,py,1,py1);
            py+=py1;
            ctx.fillStyle="green";
            ctx.fillRect(i,py,1,h*points[i][2]);
        }*/
    }
    print("AUTOPLAY END");
}

function download(filename) {
    console.log("ok");
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(mem)));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  return false;
}
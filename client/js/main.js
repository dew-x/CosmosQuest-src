window.onload = function () {
    window.Game = new Game();
    window.T = new Texer("img/SpeciesIDLE.json");
    loop();
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function loop(){
    window.Game.update();
    requestAnimFrame(loop);
}

var W = 1024*2;
var H = 640*2;
var w = 1024;
var h = 640;

function Game() {
    var self = this;
    var state = "GAME";
    var previous = undefined;
    var loaded = 0;
    var logotime=0;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var elements = [];
    var index = {};
    var menu = "research";
    var clicks = [];
    var buildings = [
        {t:"Population",b:10,e:1.1,p:75},
        {t:"Combustion",b:10,e:1.1,p:75},
        {t:"Domestication",b:10,e:1.1,p:75},
        {t:"Windmill",b:10,e:1.1,p:75},
        {t:"Watermill",b:10,e:1.1,p:75},
        {t:"Engine",b:10,e:1.1,p:75},
        {t:"Battery",b:10,e:1.1,p:75},
        {t:"Solar Panel",b:10,e:1.1,p:75},
        {t:"Nuclear Plant",b:10,e:1.1,p:75},
        {t:"Fusion Plant",b:10,e:1.1,p:75},
        {t:"Dark Energy",b:10,e:1.1,p:75},
        {t:"Gravity Energy",b:10,e:1.1,p:75}
    ];
    var data = {
        tech: [],
        blvl: [0,0,0,0,0,0,0,0,0,0,0,0],
        energy: 0,
        production: 0,
        exotic: 0,
        bamount: 1,
    }
    canvas.addEventListener("click", function (e) {
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;
        self.click(e.offsetX||offsetX,e.offsetY||offsetY);
    },false);
    this.click = function (x,y) {
        if (state=="LOAD") {
            if (loaded>=1) state="LOGO";
        } else if (state=="LOGO") {
            if (logotime>=1) state="GAME";
        } else if (state=="GAME") {
            for (var i=0; i<elements.length; ++i) {
                if (elements[i].f===undefined || elements[i].f===menu) {
                    if (elements[i].r.isInside(x,y)) {
                        elements[i].a(x,y);
                    }
                }
            }
        }
    }
    this.update = function () {
        var now = Date.now();
        if (!previous) previous=now;
        var delta = now-previous;
        this.step(delta);
        this.draw();
        previous=now;
    }
    this.step = function (delta) {
        if (state=="LOAD") {
            if (loaded<1) loaded+=delta/3000;
            if (loaded>1) loaded=1;
        } else if (state=="LOGO") {
            if (logotime<1) logotime+=delta/3000;
            if (logotime>1) logotime=1;
        } else if (state=="GAME") {
            this.updateClicks(delta);
            var toAdd = 0.0;
            var prod = 0.0;
            for (var i=0; i<buildings.length; ++i) {
                toAdd+=data.blvl[i]*buildings[i].p/3600;
            }
            data.production = toAdd;
            data.energy+=toAdd*(delta/1000);
            data.energy*=Math.pow(0.1,delta/60000);
        }
    }
    this.draw = function () {
        ctx.clearRect(0,0,W,H);
        if (state=="LOAD") {
            this.drawLoading();
        } else if (state=="LOGO") {
            this.drawLogo();
        } else if (state=="GAME") {
            this.drawGame();
        }
    }
    this.drawLoading = function () {
        // bg
        ctx.fillStyle="white";
        ctx.fillRect(0,0,W,H);
        // bar
        ctx.fillStyle="black";
        ctx.fillRect(W*0.4,H*0.7,W*0.2,H*0.08);
        ctx.fillStyle="blue";
        ctx.fillRect(W*0.4+2,H*0.7+2,(W*0.2-4)*loaded,H*0.08-4);
        if (loaded>=1) {
            ctx.fillStyle="black";
            ctx.textAlign="center";
            ctx.font="40px Arial";
            ctx.strokeStyle="rgba(0,0,0,0.5)";
            ctx.lineWidth=2;
            ctx.strokeText("Click to continue...",W/2,H*0.85);
            ctx.fillText("Click to continue...",W/2,H*0.85);
        }
    }
    this.drawLogo = function () {
        var c = Math.round((1-logotime)*255);
        ctx.fillStyle="rgb("+c+","+c+","+c+")";
        ctx.fillRect(0,0,W,H);
        if (logotime>=1) {
            ctx.fillStyle="white";
            ctx.textAlign="center";
            ctx.font="40px Arial";
            ctx.strokeStyle="rgba(255,255,255,0.5)";
            ctx.lineWidth=2;
            ctx.strokeText("Click to continue...",W/2,H*0.85);
            ctx.fillText("Click to continue...",W/2,H*0.85);
        }
    }
    this.drawGame = function () {
        this.drawCamera();
        this.drawMenus();
        this.drawBuildings();
    }
    this.drawCamera = function () {
        ctx.fillStyle="brown";
        ctx.fillRect(0,0,W*0.28125,H);
        
        var rect = index["clickZone"].r.rect2();
        ctx.fillStyle="red";
        ctx.fillRect(rect.x,rect.y,rect.w,rect.h);

        for (var i=0; i<clicks.length; ++i) {
            var click = clicks[i];
            ctx.fillStyle="rgba(255,255,255,"+click.a+")";
            ctx.textAlign="center";
            ctx.font="40px Arial";
            ctx.strokeStyle="rgba(0,0,0,"+click.a+")";
            ctx.lineWidth=5;
            ctx.strokeText(click.text,click.p.x,click.p.y);
            ctx.fillText(click.text,click.p.x,click.p.y);
        }
    }
    this.drawMenus = function () {
        ctx.fillStyle="cyan";
        ctx.fillRect(W*0.28125,H*0.5+80,W*0.71875,H*0.5-80);

        var keys = ["research","achievements","stats","specie","shop","exotic","options"];
        for (var i=0; i<keys.length; ++i) {
            var rect = index[keys[i]].r.rect2();
            ctx.fillStyle="blue";
            if (keys[i]==menu) ctx.fillStyle="orange";
            ctx.fillRect(rect.x,rect.y,rect.w,rect.h);
            ctx.fillStyle="gray";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.font="26px Arial";
            ctx.strokeStyle="rgba(255,255,255,0.5)";
            ctx.lineWidth=2;
            //ctx.strokeText(keys[i],rect.x+rect.w/2,rect.y+rect.h/2);
            ctx.fillText(keys[i],rect.x+rect.w/2,rect.y+rect.h/2);
        }
    }
    this.drawBuildings = function () {
        ctx.fillStyle="teal";
        ctx.fillRect(W*0.28125,0,W*0.71875,H*0.5+80);
        var b = 16*2,bw = 224*2,bh=60*2;
        for (var i=0; i<buildings.length; ++i) {
            var col = i%3;
            var row = Math.floor(i/3);
            var x = W*0.28125+b*(col+1)+bw*col;
            var y = b*(row+1)+bh*row+80;
            ctx.fillStyle="darkblue";
            ctx.fillRect(x,y,bw,bh);
            ctx.fillStyle="blue";
            ctx.fillRect(x+8,y+8,bh-16,bh-16);
            ctx.textAlign="left";
            ctx.textBaseline="top";
            ctx.font="26px Arial";
            ctx.fillStyle="white";
            ctx.fillText(buildings[i].t,x+bh,y+8);
            ctx.textBaseline="bottom";
            var text = "";
            if (data.bamount==="MAX") {
                var max = this.maxBuilding(i,data.energy);
                text=this.buildingCost(i,max);
            } else {
                text=this.buildingCost(i,data.bamount);
            }
            ctx.fillText(this.fn(text,"J"),x+bh,y+bh-8);
            ctx.textAlign="right";
            ctx.textBaseline="top";
            ctx.fillText(this.fn(data.blvl[i],"",true),x+bw-8,y+8);
            ctx.textBaseline="bottom";
            ctx.fillText(this.fn(data.blvl[i]*buildings[i].p/3600,"J/s",true),x+bw-8,y+bh-8);
        }
        ctx.font="26px Arial";
        ctx.textAlign="right";
        ctx.textBaseline="middle";
        ctx.fillStyle="darkblue";
        ctx.fillRect(W*0.28125+b,b,W*0.19,80-b);
        ctx.fillStyle="white";
        ctx.fillText(this.fn(data.energy,"J"),W*0.28125+b+W*0.19-b,b+(80-b)/2);
        ctx.fillStyle="darkblue";
        ctx.fillRect(W*0.28125+b*2+W*0.19,b,W*0.19,80-b);
        ctx.fillStyle="white";
        ctx.fillText(this.fn(data.production,"J/s"),W*0.28125+b*2+W*0.19+W*0.19-b,b+(80-b)/2);
        ctx.fillStyle="darkblue";
        ctx.fillRect(W*0.28125+b*3+W*0.38,b,W*0.19,80-b);
        ctx.fillStyle="white";
        ctx.fillText(this.fn(data.exotic,"X"),W*0.28125+b*3+W*0.38+W*0.19-b,b+(80-b)/2);
        ctx.fillStyle="darkblue";
        ctx.fillRect(W*0.28125+b*4+W*0.57,b,W*0.07,80-b);
        ctx.fillStyle="white";
        ctx.fillText((data.bamount!="MAX"?"x":"")+data.bamount.toString(),W*0.28125+b*4+W*0.57+W*0.07-b,b+(80-b)/2);
    }
    this.createElement = function (rect,action,filter) {
        elements.push({r:rect,a:action,f:filter});
        return elements[elements.length-1];
    }
    this.createElements = function () {
        index["clickZone"] = this.createElement(
            new Rect(w*0.05,h*0.8,w*0.18125,h*0.2),
            function (x,y) {
                self.doAction("click",x,y);
            }
        );
        index["research"] = this.createElement(
            new Rect(w*0.28125+8*1+96*0,328+40,96,30),
            function (x,y) {
                self.doAction("goto","research");
            }
        );
        index["achievements"] = this.createElement(
            new Rect(w*0.28125+8*2+96*1,328+40,96,30),
            function (x,y) {
                self.doAction("goto","achievements");
            }
        );
        index["stats"] = this.createElement(
            new Rect(w*0.28125+8*3+96*2,328+40,96,30),
            function (x,y) {
                self.doAction("goto","stats");
            }
        );
        index["specie"] = this.createElement(
            new Rect(w*0.28125+8*4+96*3,328+40,96,30),
            function (x,y) {
                self.doAction("goto","specie");
            }
        );
        index["shop"] = this.createElement(
            new Rect(w*0.28125+8*5+96*4,328+40,96,30),
            function (x,y) {
                self.doAction("goto","shop");
            }
        );
        index["exotic"] = this.createElement(
            new Rect(w*0.28125+8*6+96*5,328+40,96,30),
            function (x,y) {
                self.doAction("goto","exotic");
            }
        );
        index["options"] = this.createElement(
            new Rect(w*0.28125+8*7+96*6,328+40,96,30),
            function (x,y) {
                self.doAction("goto","options");
            }
        );
        index["bamount"] = this.createElement(
            new Rect(w*0.28125+16*4+w*0.57,16,w*0.07,40-16),
            function () {
                self.doAction("bamount");
            }
        );
        var b = 16,bw = 224,bh=60;
        for (var i=0; i<buildings.length; ++i) {
            var col = i%3;
            var row = Math.floor(i/3);
            var x = w*0.28125+b*(col+1)+bw*col;
            var y = b*(row+1)+bh*row+40;
            index["b"+i] = this.createElement(
                new Rect(x,y,bw,bh),
                (function(i) {
                    return function () {
                        self.doAction("bclick",i);
                    }
                })(i)
            );
        }
    }
    this.doAction = function (action,param0,param1,param2) {
        if (action=="click") {
            data.energy+=1;
            clicks.push({p:{x:param0*2,y:param1*2},t:Date.now()+3000,text:"+1",a:1});
        } else if (action=="goto") {
            menu = param0;
        } else if (action=="bamount") {
            var nextbamount = {
                1:10,
                10:25,
                25:100,
                100:"MAX",
                MAX:1
            }
            data.bamount = nextbamount[data.bamount];
        } else if (action=="bclick") {
            if (data.bamount==="MAX") {
                var max = this.maxBuilding(param0,data.energy);
                data.energy-=this.buildingCost(param0,max);
                data.blvl[param0]+=max;
            } else {
                if (data.energy>=this.buildingCost(param0,data.bamount)) {
                    data.energy-=this.buildingCost(param0,data.bamount);
                    data.blvl[param0]+=data.bamount;
                }
            }
        }
    }
    this.updateClicks = function (delta) {
        for (var i=0; i<clicks.length; ++i) {
            var click = clicks[i];
            click.p.y-=delta/10;
            click.a-=delta/3000;
        }
        while (clicks.length>0 && clicks[0].t<Date.now()) {
            clicks.splice(0,1);
        }
    }
    this.maxBuilding = function (bid,nrg) {
        var a = buildings[bid].b
        var r = buildings[bid].e;
        var m = data.blvl[bid];
        var x = Math.log((-1*(nrg-r*nrg-a*Math.pow(r,m)))/a)/Math.log(r);
        return Math.floor(x)||1;
    }
    this.buildingCost = function (bid,amount) {
        var a = buildings[bid].b
        var r = buildings[bid].e;
        var m = data.blvl[bid];
        var n = m+amount;
        return a*(Math.pow(r,m)-Math.pow(r,n))/(1-r);
    }
    this.fn = function (n,unit,isInt) {
        var U = {
            '-3':"m",
            3:"K",
            6:"M",
            9:"G",
            12:"T",
            15:"P",
            18:"E",
            21:"Z",
            24:"Y",
            27:"B",
            30:"aa",
            33:"ab",
            36:"ac",
            39:"ad",
            42:"ae",
            45:"af",
            48:"ag",
            51:"ah",
            54:"ai",
            57:"aj",
            60:"ak",
        }
        if (n==0) return "0 "+unit;
        var exp = Math.log10(n);
        var mexp = Math.floor(exp/3)*3;
        if (isInt) {
            if (mexp==0) return (n).toFixed(0)+" "+unit;
            return (n/Math.pow(10,mexp)).toFixed(2)+" "+U[mexp]+unit;
        } else {
            if (mexp==0) return (n).toFixed(2)+" "+unit;
            return (n/Math.pow(10,mexp)).toFixed(2)+" "+U[mexp]+unit;
        }
    }
    this.createElements();
}
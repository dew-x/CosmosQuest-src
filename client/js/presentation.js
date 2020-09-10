var sessionStart=Date.now();
var toEnd = true;
function Presentation() {
    var logotime = 0;
    var btime = 900;
    var next = 250;
    var begin = 250;
    var end = 2000;
    this.click = function () {
        Game.goto("GAME");
        T1 = undefined;
        T.stop(15);
    }
    this.update = function (delta) {
        logotime+=delta;
    }
    this.load = function (scenes) {
        //if (kongregate!==undefined) kongregate.stats.submit("loaded", 1);
        if (scenes.GAME.getSound()) {
            T.play(15);
        }
        
        var gameKey = "984ddd9061dc185617de5c449fa4146f"; //Your gamekey
        var secretKey = "690da15ce90ba97df890c656226b08f9aa2a4ca7"; //Your secret key
        var build = "4.8.4.0"; //The current version of your game, it's wise to bump this with every analytics/game change
        var user = new GA.User();
        //Create an instance
        var gaan = GA.getInstance();
        gaan.init(gameKey, secretKey, build, user)
            .addEvent(new GA.Events.User())
            .addEvent(new GA.Events.Design('Game:Start'));
        window.addEventListener('error', function (event) {
            var stack = event.message;
            if (stack!=="Script error.") {
                var ev = new GA.Events.Exception(GA.Events.ErrorSeverity.critical, JSON.stringify({
                    msg:event.message,
                    stk:event.error&&event.error.stack?event.error.stack:"none"
                }));
                GA.getInstance().addEvent(ev);
            }
        });
        window.addEventListener("beforeunload", function (event) {
            if (!toEnd) {
                var sessionDuration = (Date.now() - sessionStart) / 1000;
                var event = new GA.Events.SessionEnd(
                    sessionDuration //the length of the session in seconds
                );
                GA.getInstance().addEvent(event);
                GA.getInstance().sendData();
                toEnd=false;
            }
        });
        window.addEventListener("unload", function (event) {
            if (!toEnd) {
                var sessionDuration = (Date.now() - sessionStart) / 1000;
                var event = new GA.Events.SessionEnd(
                    sessionDuration //the length of the session in seconds
                );

                GA.getInstance().addEvent(event);
                GA.getInstance().sendData();
                toEnd=false;
            }
        });
    }

    this.draw = function (ctx) {
        ctx.fillStyle="rgb(47,47,47)";
        ctx.fillRect(0,0,W,H);
        var tw = T1.width("hg99");
        var th = T1.height("hg99");
        var lw = T1.width("hwzx");
        var lh = T1.height("hwzx");
        var h = H*0.75;
        var w = lw*(h/lh);
        var h1 = H*0.33;
        var w1 = tw*(h1/th);
        for (var i=0; i<4; ++i) {
            if (logotime>begin+next*i) {
                var perc = Math.min((logotime-(begin+next*i))/btime,1);
                ctx.save();
                ctx.beginPath();
                ctx.rect(0,h1*0.05+h-h*perc,W,h*perc);
                ctx.closePath();
                ctx.clip();
                T1.draw(ctx,"hwzx_"+(3-i),W/2-w/2,h1*0.05,w,h);
                T1.draw(ctx,"hwzx_"+(4+i),W/2-w/2,h1*0.05,w,h);
                ctx.restore();
            }
        }
        if (logotime>=begin+next*3+btime) {
            var perc = (logotime-(begin+next*3+btime))/(end/2);
            if (perc>=1) perc=1;
            ctx.save();
            ctx.globalAlpha = perc;
            T1.draw(ctx,"hg99",W/2-w1/2,H-h1*1.05,w1,h1);
            ctx.restore();
        }
        if (logotime>=begin+end+next*3+btime) {
            Game.goto("GAME");
        }
    }
}
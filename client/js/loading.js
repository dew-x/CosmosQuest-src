function Loading() {
    var timedown=Date.now();
    var extra=false;
    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    function isKong() {
        return inIframe() && window.location.href.indexOf("konggames.com")!==-1;
    }
    this.draw = function (ctx) {
        var loaded = T.loadPercentage();
        var loaded1 = T1.loadPercentage();
        // bg
        ctx.fillStyle="rgb(47,47,47)";
        ctx.fillRect(0,0,W,H);
        // bar
        ctx.fillStyle="white";
        ctx.fillRect(W*0.3,H*0.7,W*0.4,H*0.08);
        ctx.fillStyle="rgb(200,200,255)";
        ctx.fillRect(W*0.3+2,H*0.7+2,(W*0.4-4)*loaded,H*0.08-4);
        text(ctx,T.loadString(),W*0.5,H*0.74,"35px "+FONT,"rgb(47,47,47)","center","middle");
        if (PFfixed) {
            if (loaded>=1&&loaded1>=1) {
                if ((kongregate!==undefined&&pfdata!==undefined) || (Date.now()-timedown>10000&&isKong())) {
                    document.getElementById("kong").style.display="none";
                    Game.goto("PRESENTATION");
                } else {
                    text(ctx,"Waiting server connection...",W*0.5,H*0.8,"35px "+FONT,"white","center","top");
                }
            } else if (!extra && Date.now()-timedown>60000) {
                var res=confirm("Loading is taking too long.\nStart the game anyway?\nThis may cause some images not showing");
                if (res) {
                    document.getElementById("kong").style.display="none";
                    Game.goto("PRESENTATION");
                } else {
                    var res1=confirm("Do you want to load low resolution graphics?\nOtherwise wait until the game loads");
                    if (res1) {
                        extra=true;
                        if (localStorage.res==0) window.T = new Texer("img/CosmosQuestLow.json?v=4.8.4.0",SFX);
                    } else {
                        timedown=Date.now();
                    }
                }
                
            }
        }
    }
    this.click = function () {
        if (!isKong()) {
            
            window.location.href="http://www.kongregate.com/games/GaiaByte/cosmos-quest";
        }
    }
}
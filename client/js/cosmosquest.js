var SFX = [
    "sfx/fireloop.mp3", // 0
    "sfx/firefx.mp3",
    "sfx/stormloop.mp3",
    "sfx/stormfx.mp3",
    "sfx/cometaloop.mp3",
    "sfx/cometafx.mp3", // 5
    "sfx/solarloop.mp3",
    "sfx/solarfx.mp3",
    "sfx/supernovaloop.mp3",
    "sfx/supernovafx.mp3",
    "sfx/ultranovaloop.mp3", // 10
    "sfx/ultranovafx.mp3",
    "sfx/bbloop.mp3",
    "sfx/bbfx.mp3",
    "sfx/bso.mp3",
    "sfx/gaiabyte.mp3", // 15
    "sfx/click.mp3",
    "sfx/primordialloop.mp3",
    "sfx/primordialfx.mp3",
    "sfx/music_minigame_cosmosquest.mp3",
    "sfx/sfx_minigame.mp3", // 20
    "sfx/loop_seer.mp3",
    "sfx/fx_seer.mp3",
    "sfx/guardianloop.mp3",
    "sfx/guardianfx.mp3",
    "sfx/fx_roulette.mp3",// 25
    "sfx/loop_roulette.mp3", 
    "sfx/sfx_golpe_v1.mp3", 
    "sfx/sfx_muerteunidad.mp3", 
    "sfx/battlemusic_cosmosquest.mp3",
    "sfx/loop_badguys.mp3",// 30
    "sfx/fx_badguys.mp3",
    "sfx/loop_cristal.mp3",
    "sfx/fx_cristal.mp3",
    "sfx/dim_loop.mp3",
    "sfx/dim_sfx.mp3", // 35
    "sfx/loop_8bitworld.mp3",
    "sfx/fx_8bitworld.mp3",
    "sfx/loop_candy.mp3",
    "sfx/fx_candy.mp3",
    "sfx/loop_color.mp3", // 40
    "sfx/fx_color.mp3",
    "sfx/loop_aqua.mp3",
    "sfx/fx_aqua.mp3",
    "sfx/loop_blackhole.mp3",
    "sfx/fx_blackhole.mp3",//45
    "sfx/loop_player.mp3",
    "sfx/fx_player.mp3",
    "sfx/loop_square.mp3",
    "sfx/fx_square.mp3",
    "sfx/loop_mech.mp3", //50
    "sfx/fx_mech.mp3",
    "sfx/loop_subatomica.mp3",
    "sfx/fx_subatomica.mp3",
    "sfx/music_minitd_v3.mp3",
    "sfx/fx_construcciontorre.mp3",//55
    "sfx/fx_disparo.mp3",
    "sfx/fx_muerteenemy.mp3",
    "sfx/loop_jaloguin.mp3",
    "sfx/fx_jaloguin.mp3",
    "sfx/fx_cq_xmasadviento.mp3",//60
    "sfx/fx_cq_xmasclick.mp3"
];

window.onload = function () {
    var v="4.8.4.0"
    window.T1 = new Texer("img/gb.json?v="+v,SFX);
    if (localStorage.res==1) {
        window.T = new Texer("img/CosmosQuestLow.json?v="+v,SFX);
    } else if (localStorage.res==2) {
        window.T = new Texer("img/CosmosQuestLow_low.json?v="+v,SFX);
    } else {
        window.T = new Texer("img/CosmosQuest.json?v="+v,SFX);
    }
    window.Game = new CosmosQuest();
    window.GM = {x:-1000,y:-1000};
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

var W = 1024;
var H = 640;
var w = 1024;
var h = 640;

function CosmosQuest() {
    var self = this;
    var scene = "LOADING";
    var OGame=Game;
    var scenes = {
        LOADING: new Loading(),
        PRESENTATION: new Presentation(),
    }
    var tmp = function () {
        scenes.GAME=new OGame();
    }
    var last = undefined;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    function click (x,y) {
        if (scenes[scene].click) scenes[scene].click(x,y);
    }
    function clickUp (x,y) {
        if (scenes[scene].clickUp) scenes[scene].clickUp(x,y);
    }
    canvas.addEventListener("mousedown", function (e) {
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;
        click(e.offsetX||offsetX,e.offsetY||offsetY);
    },false);
    canvas.addEventListener("mouseup", function (e) {
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;
        clickUp(e.offsetX||offsetX,e.offsetY||offsetY);
    },false);

    canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.touches[0].clientX - rect.left,
            offsetY = e.touches[0].clientY - rect.top;
        click(e.offsetX||offsetX,e.offsetY||offsetY);
    },false);

    canvas.addEventListener("touchend", function (e) {
        e.preventDefault();
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.changedTouches[0].clientX - rect.left,
            offsetY = e.changedTouches[0].clientY - rect.top;
        clickUp(e.offsetX||offsetX,e.offsetY||offsetY);
        
    },false);

    canvas.addEventListener("mousemove", function (e) {
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;
        GM = {x:e.offsetX||offsetX,y:e.offsetY||offsetY};
    },false);

    canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
        var target  = e.target || e.srcElement,
            rect    = target.getBoundingClientRect(),
            offsetX = e.touches[0].clientX - rect.left,
            offsetY = e.touches[0].clientY - rect.top;
        GM = {x:e.offsetX||offsetX,y:e.offsetY||offsetY};
    },false);

    function keyPress (key) {
        if (scenes[scene].keyPress) return scenes[scene].keyPress(key);
        return false;
    }
    document.addEventListener("keypress", function (e) {
        if (keyPress(e.keyCode||e.charCode)) e.preventDefault();
    },false);
    
    function keyUp (key) {
        if (scenes[scene].keyUp) scenes[scene].keyUp(key);
    }
    document.addEventListener("keyup", function (e) {
        keyUp(e.keyCode||e.charCode);
    },false);

    function keyDown (key) {
        if (scenes[scene].keyDown) return scenes[scene].keyDown(key);
    }
    document.addEventListener("keydown", function (e) {
        if (keyDown(e.keyCode||e.charCode)) e.preventDefault();
    },false);
    
    this.update = function () {
        var now = Date.now();
        if (!last) last=now;
        var delta = now-last;
        if (scenes[scene].update) scenes[scene].update(delta);
        last=now;
        ctx.clearRect(0,0,W,H);
        if (scenes[scene].draw) scenes[scene].draw(ctx);
    }
    this.goto = function (next) {
        if (next=="PRESENTATION") tmp();
        scene = next;
        if (scenes[scene].load) scenes[scene].load(scenes);
        //if (scene=="GAME") T.play(0);

    }
}
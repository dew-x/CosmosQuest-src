function randInt(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}
function sortNumber(a,b) {
    return a - b;
}

function currentSpecialEvent (day) {
    if (day==undefined) day=Math.floor(Date.now()/(24*60*60*1000));
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var eventLoop = ["No event","G.A.M.E.S","No event","Space Journey","No event","No event"];
    var week = Math.ceil((((day-18379) + 1)/7));
    if (days[(day-3)%7] !== "Monday") return eventLoop[(week-1)%eventLoop.length];
    else return "No event";
}

function getWeek () {
    return Math.ceil((((Math.floor(Date.now()/(24*60*60*1000))-18379) + 1)/7));
}

function randStr(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
/* ie fix */
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {

    // Pasos 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Pasos 3-5.
    var len = O.length >>> 0;

    // Pasos 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Pasos 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Pasos 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Pasos 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Pasos 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Pasos 13.
    return O;
  };
}

if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

function dist2(x,y) {
    return Math.sqrt(x*x+y*y);
}

function p2p(x,y,x1,y1) {
    return dist2(x-x1,y-y1);
}

function Rect(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isInside = function (x,y) {
        return x>=this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h;
    }
    this.small = function () {
        return new Rect(this.x,this.y,this.w,this.h);
    }
    this.big = function () {
        return new Rect(this.x,this.y,this.w,this.h);
    }
}

function bn(mantissa,exp) {
    return mantissa*Math.pow(10,exp);
}

function fix(str) {
    var pos=str.indexOf("px");
    if (pos!==-1) {
        var num=parseFloat(str.substring(0,pos));
        return (num/2).toString()+str.substring(pos);
    } else return str;
}

function text(ctx,text,x,y,font,fill,align,valign,stroke,strokeWidth) {
    ctx.fillStyle=fill||"black";
    ctx.textAlign=align||"left";
    ctx.textBaseline=valign||"top";
    ctx.font=fix(font)||"12px Arial";
    if (stroke) {
        ctx.strokeStyle=stroke;
        ctx.lineWidth=strokeWidth/2||1;
        ctx.strokeText(text,x,y+2);
    }
    ctx.fillText(text,x,y+2);
}
// Multi-Line Text (\n)
function mltext(ctx,rtext,x,y,font,fill,align,valign,stroke,strokeWidth,dist) {
    var nd = 0;
    var ltext = [];
    for (var i=0; i<rtext.length; ++i) {
        if (rtext[i] === '/') {
            if (rtext[i+1] === 'n') {
                ltext.push(rtext.slice(nd,i));
                nd = i+2;
                ++i;
            }
        } else if (i === rtext.length-1) ltext.push(rtext.slice(nd,rtext.length));
    }

    var size = parseInt(font.slice(0,font.indexOf("p")));
    for (var i=0; i<ltext.length; ++i) {
        if (dist==undefined) text(ctx,ltext[i],x,y+(i*(size*0.7)),font,fill,align,valign,stroke,strokeWidth);
        else text(ctx,ltext[i],x,y+(i*dist),font,fill,align,valign,stroke,strokeWidth);
    }
}
function mtext(ctx,text,x,y,font,fill,align,valign,stroke,strokeWidth) {
    ctx.fillStyle=fill||"black";
    ctx.textAlign=align||"left";
    ctx.textBaseline=valign||"top";
    ctx.font=fix(font)||"12px Arial";
    return ctx.measureText(text).width
}
// Embded Text 
function etext(ctx,rtext,x,y,font,fill,align,valign,stroke,strokeWidth,space,distance) {
    var index = 0;
    var ltext = "";
    var text2draw = [];
    while (index < rtext.length) {
        var currentSize = mtext(ctx,ltext,x,y,font,fill,align,valign,stroke,strokeWidth);
        if (currentSize < space) {
            var newWord = "";
            var newIndex = index;
            if (rtext[newIndex] == "/" && rtext[newIndex+1] == "n") {
                text2draw.push(ltext);
                ltext = "";
                index += 2;
            } else {
                var forced = false;
                while (rtext[newIndex] !== " " && newIndex < rtext.length && forced == false) {
                    if (rtext[newIndex] == "/" && rtext[newIndex+1] == "n") {
                        newIndex += 2;
                        forced = true;
                    } else {
                        newWord+=rtext[newIndex];
                        newIndex++;
                    }
                }
                if (forced == true) {
                    ltext+=(newWord+" ");
                    text2draw.push(ltext);
                    index+=(newWord.length+2);
                    ltext = "";
                } else if ((mtext(ctx,newWord,x,y,font,fill,align,valign,stroke,strokeWidth) + currentSize) > space) {
                    text2draw.push(ltext);
                    ltext = "";
                } else {
                    ltext+=(newWord+" ");
                    index+=(newWord.length+1);
                }
            }
        } else {
            text2draw.push(ltext);
            ltext = "";
            index++;
        }
    }
    if (ltext !== "") text2draw.push(ltext);
    var size = parseInt(font.slice(0,font.indexOf("p")));
    for (var i=0; i<text2draw.length; ++i) {
        if (distance==undefined) text(ctx,text2draw[i],x,y+(i*(size*0.7)),font,fill,align,valign,stroke,strokeWidth);
        else text(ctx,text2draw[i],x,y+(i*distance),font,fill,align,valign,stroke,strokeWidth);
    }
}
function rotate_point(pointX, pointY, originX, originY, angle) {
    //angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
        y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
}
var TEXTCACHE = {};
var TEXTTIMER = undefined;
var TEXTDELETE = 0;
var TEXTDELETETIME = 300000;
function ctext(ctx,ttext,x,y,font,fill,align,valign,stroke,strokeWidth) {
    text(ctx,ttext,x,y,font,fill,align,valign,stroke,strokeWidth);
    /*var now = Date.now();
    if (TEXTTIMER===undefined) TEXTTIMER = now;
    if (now-TEXTTIMER<20000) {
        text(ctx,ttext,x,y,font,fill,align,valign,stroke,strokeWidth);
    } else {
        if (TEXTDELETE<now) {
            TEXTDELETE=now+TEXTDELETETIME;
            TEXTCACHE={};
        }
        var UUID=ttext+"|"+font+"|"+fill+"|"+align+"|"+valign+"|"+stroke+"|"+strokeWidth;
        if (TEXTCACHE[UUID]==undefined) {
            ctx.fillStyle=fill||"black";
            ctx.textAlign=align||"left";
            ctx.textBaseline=valign||"top";
            ctx.font=font||"12px Arial";
            var w = Math.ceil(ctx.measureText(ttext).width)*2;
            var h = parseInt(font)*2.5;
            var cache = document.createElement('canvas');
            cache.width = w;
            cache.height = h;
            var ctx2 = cache.getContext("2d");
            ctx2.fillStyle=fill||"black";
            ctx2.textAlign=align||"left";
            ctx2.textBaseline=valign||"top";
            ctx2.font=fix(font)||"12px Arial";
            if (stroke) {
                ctx2.strokeStyle=stroke;
                ctx2.lineWidth=strokeWidth||1;
                ctx2.strokeText(ttext,w/2,h/2);
            }
            ctx2.fillText(ttext,w/2,h/2);
            TEXTCACHE[UUID]=cache;
        }
        ctx.drawImage(TEXTCACHE[UUID],x-TEXTCACHE[UUID].width/2,y-TEXTCACHE[UUID].height/2);
    }*/
}
function text2canvas(ctx,text,x,y,font,fill,align,valign,stroke,strokeWidth) {
    ctx.fillStyle=fill||"black";
    ctx.textAlign=align||"left";
    ctx.textBaseline=valign||"top";
    ctx.font=font||"12px Arial";
    var w = Math.ceil(ctx.measureText(text).width)*2;
    var h = parseInt(font)*2.5;
    var cache = document.createElement('canvas');
    cache.width = w;
    cache.height = h;
    var ctx2 = cache.getContext("2d");
    ctx2.fillStyle=fill||"black";
    ctx2.textAlign=align||"left";
    ctx2.textBaseline=valign||"top";
    ctx2.font=fix(font)||"12px Arial";
    if (stroke) {
        ctx2.strokeStyle=stroke;
        ctx2.lineWidth=strokeWidth/2||1;
        ctx2.strokeText(text,w/2,h/2);
    }
    ctx2.fillText(text,w/2,h/2);
    return cache;
}

function timer(t) {
    if (t==Infinity) return "99:99:99";
    t=Math.round(t);
    var s = t%60;
    t=(t-s)/60;
    var m = t%60;
    t=(t-m)/60;
    var h = t;
    if (m.toString().length==1) m="0"+m.toString();
    if (s.toString().length==1) s="0"+s.toString();
    return h.toString()+":"+m.toString()+":"+s.toString();
}

function stimer(t) {
    if (t==Infinity) return "99:99";
    t=Math.round(t);
    var s = t%60;
    t=(t-s)/60;
    var m = t%60;
    t=(t-m)/60;
    var h = t;
    if (m.toString().length==1) m="0"+m.toString();
    if (s.toString().length==1) s="0"+s.toString();
    return m.toString()+":"+s.toString();
}

function bigtimer(t) {
    if (t==Infinity) return "UNKNOWN";
    t=Math.round(t);
    var s = t%60;
    t=(t-s)/60;
    var m = t%60;
    t=(t-m)/60;
    var h = t%24;
    t=(t-h)/24;
    var d = t%365;
    var y = (t-d)/365;
    var str = "";
    if (y>0) str+=y.toString()+"y"+" ";
    if (d>0) str+=d.toString()+"d"+" ";
    if (h>0 && y==0) str+=h.toString()+"h"+" ";
    if (m>0 && y==0 && d==0) str+=m.toString()+"m"+" ";
    if (s>0 && y==0 && d==0 && h==0) str+=s.toString()+"s";
    if (str=="") str="0s";
    return str;
}

var _FIB = [0,1];
function fib(n) {
    while (n>=_FIB.length) _FIB[_FIB.length]=_FIB[_FIB.length-1]+_FIB[_FIB.length-2];
    return _FIB[n];
}
function fact(n) {
    if (n==0) return 1;
    else return n*fact(n-1);
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function nn(v) {
    return !(v==undefined || v==null);
}
function clamp(v,a,b) {
    return Math.max(Math.min(v,b),a);
}
function mapf(s,a1,a2,b1,b2) {
    return b1 + (s-a1)*(b2-b1)/(a2-a1);
}
function mapfc(s,a1,a2,b1,b2) {
    if (s<=a1) return b1;
    else if (s>=a2) return b2;
    return b1 + (s-a1)*(b2-b1)/(a2-a1);
}
function randFloat(min,max) {
    return Math.random()*(max-min)+min;
}
function randIntInclusive(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Fn(len,div) {
    this.len=len||512;
    this.div=div||8;
    this.a=randFloat(-2,2);
    this.b=randFloat(0.01,0.1);
    this.c=randFloat(-10,10);
    this.d=Math.random()<0.8?1:2;
    this.m=randInt(0,2);
    this.getPoints = function () {
        if (this.points==undefined) {
            this.points=[];
            var min=0;
            var max=0;
            for (var i=0; i<this.len; ++i) {
                x=this.i2x(i);
                y=this.x2y(x);
                min=Math.min(min,y);
                max=Math.max(max,y);
                this.points.push({x:i,y:y});
            }
            if (min==max) min=max-0.1;
            for (var i=0; i<this.len; ++i) {
                this.points[i].y=(this.points[i].y-min)+(max-min)/100;
            }
            this.min=min;
            this.max=max-min;
        }
        return this.points;
    }
    this.getAreas = function() {
        if (this.areas==undefined) {
            var p=this.getPoints();
            this.areas=[];
            for (var i=0;i<p.length; ++i) {
                var aid=Math.floor(i/(this.len/this.div));
                if (this.areas.length<=aid) this.areas.push(0);
                else {
                    var height=(p[i].y+p[i-1].y)/2;
                    var base=p[i].x-p[i-1].x;
                    this.areas[aid]+=base*height;
                }
            }
        }
        return this.areas;
    }
    this.i2x = function (i) {
        return (i-this.len/2);
    }
    this.x2y = function (x) {
        var val=0;
        if (this.m==0) val=Math.pow(((this.a*x+this.c)*Math.cos(this.b*x)),this.d);
        else if (this.m==1) val=Math.round(Math.pow(((this.a*x+this.c)*Math.cos(this.b*x)),this.d)/100+0.00001);
        if (isNaN(val) || !isFinite(val)) val=x;
        return val;
    }
}

function Grid(w,h,c,grid) {
    var DIRS=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
    this.w=w; // width
    this.h=h; // height
    this.c=c; // nº colors
    this.mkgrid=function () {
        var grid=[];
        for (var i=0; i<this.h; ++i) {
            grid.push([]);
            for (var j=0; j<this.w; ++j) {
                grid[i].push(randInt(0,this.c));
            }
        }
        return grid;
    }
    this.changeC = function (c) {
        this.c=c;
        for (var i=0; i<this.h; ++i) {
            for (var j=0; j<this.w; ++j) {
                if (this.grid[i][j]>=this.c) this.grid[i][j]=randInt(0,this.c);
            }
        }
        while (!this.hasMoves()) this.grid=this.mkgrid();
    }
    this.hasMoves=function () {
        for (var i=0; i<this.h; ++i) {
            for (var j=0; j<this.w; ++j) {
                if (this.grid[i][j]==-1) return true;
                for (var k=0; k<DIRS.length; ++k) {
                    if (i+DIRS[k].y>=0 && i+DIRS[k].y<this.h && j+DIRS[k].x>=0 && j+DIRS[k].x<this.w) {
                        if (this.grid[i+DIRS[k].y][j+DIRS[k].x]==this.grid[i][j]) return true;
                    }
                }
            }
        }
        return false;
    }
    this.hasMovesLeft=function () {
        for (var i=0; i<this.h; ++i) {
            for (var j=0; j<this.w; ++j) {
                if (this.grid[i][j]!==-1) {
                    for (var k=0; k<DIRS.length; ++k) {
                        if (i+DIRS[k].y>=0 && i+DIRS[k].y<this.h && j+DIRS[k].x>=0 && j+DIRS[k].x<this.w) {
                            if (this.grid[i+DIRS[k].y][j+DIRS[k].x]==this.grid[i][j]) return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    this.add=function () {
        var possible2=[];
        // find empty places with at least some blocks
        for (var j=0; j<this.w; ++j) {
            for (var i=0; i<this.h-1; ++i) {
                if (this.grid[i][j]==-1) {
                    if (this.grid[i+1][j]!=-1) {
                        possible2.push({x:j,y:i});
                        break;
                    }
                } else break;
            }
        }
        // add last row
        for (var j=0; j<this.w; ++j) {
            if (this.grid[this.h-1][j]==-1) {
                possible2.push({x:j,y:this.h-1});
                break;
            }
        }
        if (possible2.length>0) {
            var pos=randInt(0,possible2.length);
            if (possible2[pos]!==undefined&&this.grid[possible2[pos].y]!==undefined) this.grid[possible2[pos].y][possible2[pos].x]=randInt(0,this.c);
            while (!this.hasMoves()) this.grid=this.mkgrid();
        }
    }
    this.empty=function () {
        var count=0;
        for (var i=0; i<this.h; ++i) {
            for (var j=0; j<this.w; ++j) {
                if (this.grid[i][j]==-1) ++count;
            }
        }
        return count;
    }
    this.click=function (x,y) {
        if (this.grid[y][x]==-1) return;
        var c=this.grid[y][x];
        for (var k=0; k<DIRS.length; ++k) {
            if (y+DIRS[k].y>=0 && y+DIRS[k].y<this.h && x+DIRS[k].x>=0 && x+DIRS[k].x<this.w) {
                if (this.grid[y+DIRS[k].y][x+DIRS[k].x]==c) {
                    var val=this.rec(x,y,c);
                    this.move();
                    return val;
                }
            }
        }
        return 0;
    }
    this.rec = function (x,y,c,done) {
        done=done||[];
        var uid=x*this.h+y;
        var ret=0;
        if (done.indexOf(uid)===-1) {
            done.push(uid);
            for (var k=0; k<DIRS.length; ++k) {
                var nx=x+DIRS[k].x;
                var ny=y+DIRS[k].y;
                if (ny>=0 && ny<this.h && nx>=0 && nx<this.w) {
                    if (this.grid[ny][nx]==c) {
                        ret+=this.rec(nx,ny,c,done);
                    }
                }
            }
            ret+=1;
            this.grid[y][x]=-1;
        }
        return ret;
    }
    this.move = function () {
        // move all down
        for (var x=0; x<this.w; ++x) {
            for (var y=this.h-2; y>=0; --y) {
                if (this.grid[y][x]!=-1) {
                    var c=y;
                    while (c+1<this.h && this.grid[c+1][x]==-1) {
                        this.grid[c+1][x]=this.grid[c][x];
                        this.grid[c][x]=-1;
                        c+=1;
                    }
                }
            }
        }
        // move all left
        for (var x=1; x<this.w; ++x) {
            if (this.grid[this.h-1][x]!=-1 && this.grid[this.h-1][x-1]==-1) {
                var size=1;
                while (size<this.h && this.grid[this.h-(1+size)][x]!=-1) ++size;
                var c=x;
                while (c-1>=0 && this.grid[this.h-1][c-1]==-1) {
                    for (var y=1; y<=size; ++y) {
                        this.grid[this.h-y][c-1]=this.grid[this.h-y][c];
                        this.grid[this.h-y][c]=-1;
                    }
                    c-=1;
                }
            }
        }
    }
    this.reset = function () {
        this.grid=this.mkgrid();
        while (!this.hasMoves()) this.grid=this.mkgrid();
    }
    this.grid=grid||this.mkgrid();
    while (!this.hasMoves()) this.grid=this.mkgrid();
}

function JuliaFract(ctx,w,h) {
    this.w=w;
    this.h=h;
    this.img=ctx.createImageData(w, h);
    this.data=this.img.data;
    var cx = 0, cy = 0, kat1 = 0, kat2 = 1;
    var step = 6;
    var i1=this.w*step/2;
    var i0=-i1;
    var j1=this.h*step/2;
    var j0=-j1;
    var S=128;
    var mat=Array(S*S);
    var l31 = Math.log(31);
    var done=false;
    var todo=undefined;
    this.last=0;
    for (var i=0; i<S; ++i) {
        for (var j=0; j<S; ++j) {
            var dx=S/2-i;
            var dy=S/2-j;
            var d = Math.sqrt(dx*dx+dy*dy);
            if (d<=S/2) {
                mat[j*S+i]=Math.floor(d)
            }
        }
    }
    this.step = function (mode,lx,ly,lz) {
        var curr=Math.floor(Date.now()/10000);
        if (curr==this.last) {
            return;
        } else this.last=curr;
        if (!mode && done) {
            if (lx!==undefined && ly!==undefined) {
                todo={lx:lx,ly:ly,lz:lz};
            }
            return;
        }
        kat1 += 0.003/8;
        kat2 += 0.007/8;
        cx = 981 * Math.sin(kat1);
        cy = 983 * Math.cos(kat2);
        
        var i00=i0;
        var i11=i1;
        var j00=j0;
        var j11=j1;
        var y0=0;
        var x0=0;
        q=0;
        done=true;
        var px = x0;
        for (var i = i00; i < i11; i += step) {
            var py = y0;
            for (var j = j00; j < j11; j += step) {
                var c = 0;
                var x = i;
                var y = j;
                var x2 = x * x;
                var y2 = y * y;
 
                while (((x2 + y2) < 4000000) && (c < 31)) {
                    c++;
    
                    y  = ((x * y) >> 9) + cy;
                    x  = ((x2 - y2) >> 10) + cx;
                    x2 = x * x;
                    y2 = y * y;
    
                }
                var pos = (py * this.w + px) << 2;
                var r = 3 * Math.log(c) / l31;
                    
                if (r < 1) {
                    this.data[pos]=255-(8*c);
                    this.data[pos+1]=255-(6 * c);
                    this.data[pos+2]=255 - c;
                }
                else if ( r < 2 ) {
                    this.data[pos]=255-(8*c);
                    this.data[pos+1]=255-(6 * c);
                    this.data[pos+2]=255 - c;
                } else {
                    this.data[pos]=255-c*4;
                    this.data[pos+1]=255-(8*c);
                    this.data[pos+2]=255 - c*4;
                }
                /*this.data[pos]=255-(8*c);
                this.data[pos+1]=255-(6 * c);
                this.data[pos+2]=255 - c;*/
                this.data[pos+3]=255;
                py++;
            }
            px++;
        }
        if (lx!==undefined && ly!==undefined) {
            for (var i=0; i<S; ++i) {
                for (var j=0; j<S; ++j) {
                    var m=mat[j*S+i];
                    if (m!==undefined && m<=S*lz) {
                        var orig=((j+ly)*this.w+(i+lx))<<2;
                        this.data[orig]=mapfc(m,0,S*lz,255-this.data[orig],this.data[orig]);
                        this.data[orig+1]=mapfc(m,0,S*lz,255-this.data[orig+1],this.data[orig+1]);
                        this.data[orig+2]=mapfc(m,0,S*lz,255-this.data[orig+2],this.data[orig+2]);
                    }
                }
            }
        }
    }
    this.draw = function (ctx,x,y) {
        ctx.putImageData(this.img,x,y);
        if (todo!==undefined) {
            var grd = ctx.createRadialGradient(todo.lx+S/2,todo.ly+S/2,0,todo.lx+S/2,todo.ly+S/2,S);
            grd.addColorStop(0,"rgba(0,0,0,1)");
            grd.addColorStop(todo.lz,"rgba(0,0,0,0.1)");
            grd.addColorStop(1,"rgba(0,0,0,0)");
            ctx.fillStyle=grd;
            ctx.save();
            ctx.beginPath();
            ctx.arc(todo.lx+S/2,todo.ly+S/2,todo.lz*S,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            todo=undefined;       
        }
    }
}
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function doNegative(img,sx,sy,sw,sh,w,h) {
    var cache = document.createElement('canvas');
    cache.width = w;
    cache.height = h;
    var ctx2=cache.getContext("2d");
    ctx2.drawImage(img,sx,sy,sw,sh,0,0,w,h);
    var pixels=ctx2.getImageData(0,0,w,h);
    for (var i=0; i<pixels.data.length; i+=4) {
        //Red * 0.3 + Green * 0.59 + Blue * 0.11
        // var col=pixels.data[i]*0.3+pixels.data[i+1]*0.59+pixels.data[i+2]*0.11;
        var col=(pixels.data[i]+pixels.data[i+1]+pixels.data[i+2])/3;
        pixels.data[i]=col;
        pixels.data[i+1]=col;
        pixels.data[i+2]=col;
    }
    ctx2.putImageData(pixels,0,0,0,0,w,h);
    return cache;
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

function tprize(pos,total,price) {
    var pool=price*total*1000;
    return Math.round(pool*pos2perc(pos,total));
}

function cn(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function doRandom(max,seed) {
    var multiplier = 48271;
    var modulus = 2147483647;
    var mq = Math.floor(modulus / multiplier);
    var mr = modulus % multiplier;
    for (var i=0; i<=seed%20; ++i) {
        temp = multiplier * (seed % mq) - (mr * Math.floor(seed / mq));
        if (temp > 0){
            seed = temp;
        } else {
            seed = temp + modulus;
        }
    }
    return Math.round((seed/modulus)*max);
} 

function doRandomLog(mini,maxi,tid) {
    var rng = new RNG(tid);
    var rnd = rng.nextFloat();
    return Math.round(mini + Math.exp(Math.log(mini)+((Math.log(maxi)-Math.log(mini))*rnd)));
}

function hero2fol(hid,lvl,promo) {
    if (HERO[hid].rarity>3) return 0;
    var stats = level2stats(hid,lvl,promo);
    return Math.pow(stats.hp*stats.atk,1.5);
}


function tid2fol(tid) {
    if (tid==17830) return 17835078;
    var heroarr = computeTHERO(tid);
    var promoarr = computeTPROMO(tid)[tid%heroarr.length];
    var hero = heroarr[tid%heroarr.length];
    var fols = 0;
    var amount = 0;
    for (var i=0; i<hero.length; ++i) {
        if (hero[i]==-1) {
            fols+=hero2fol(i,99,2);
            ++amount;
        } else if (hero[i]>0) {
            fols+=hero2fol(i,hero[i],promoarr[i]);
            ++amount;
        }
    } 
    //console.log(fols);
    if (fols==0) return doRandomLog(30000,1000000000,tid);
    var base = (fols/amount);
    var vals = [4,9,20];
    return Math.round(base*vals[tid%vals.length]);
}

function bint(num,mode) {
    if (mode===undefined) mode = 0;
	prefixes = [[" k"," M"," G"," T"," P"],[" k"," M"," B"," T"," Q"],[" k"," Mn"," Md"," Bn"," Bd"]];
    if (num>=1e17) {
        if (num>=1e18) return Math.floor(num/1e15).toLocaleString()+prefixes[mode][4];
        else return (num/1e15).toFixed(2).toLocaleString()+prefixes[mode][4];
    } else if (num>=1e14) {
        if (num>=1e15) return Math.floor(num/1e12).toLocaleString()+prefixes[mode][3];
        else return (num/1e12).toFixed(2).toLocaleString()+prefixes[mode][3];
    } else if (num>=1e11) {
        if (num>=1e12) return Math.floor(num/1e9).toLocaleString()+prefixes[mode][2];
        else return (num/1e9).toFixed(2).toLocaleString()+prefixes[mode][2];
    } else if (num>=1e8) {
        if (num>=1e9) return Math.floor(num/1e6).toLocaleString()+prefixes[mode][1];
        else return (num/1e6).toFixed(2).toLocaleString()+prefixes[mode][1];
    } else if (num>=1e5) {
        if (num>=1e6) return Math.floor(num/1e3).toLocaleString()+prefixes[mode][0];
        else return (num/1e3).toFixed(2).toLocaleString()+prefixes[mode][0];
        
    } else {
        return num;
    }
}

function roundedRect(ctx,x,y,w,h,r,color,img,iw,ih,center) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.clip();
    if (img===undefined || img===null) {
        ctx.fillStyle=color;
        ctx.fillRect(0,0,W,H);
    }
    else {
        if (iw===null && ih===null) T.draw(ctx,img,x,y);
        else if (center===true) {
            T.draw(ctx,img,x-(iw-w)/2,y-(ih-h)/2,iw,ih);
        } else T.draw(ctx,img,x,y,iw,ih);
    }
    ctx.restore();
}

function RNG(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
    for (var i=0; i<100; ++i) this.next();
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
RNG.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
};


/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
RNG.prototype.nextFloat = function (opt_minOrMax, opt_max) {
// We know that result of next() will be 1 to 2147483646 (inclusive).
    return (this.next() - 1) / 2147483646;
};

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

function bits2int(arr,init,len) {
    return parseInt(arr.substring(init,init+len), 2);
}

function bits2char(arr,init) {
    var chars="0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return chars[bits2int(arr,init,6)];
}

function smartParse(str) {
    var bits = [];
    var ret = {
        "winner":"",
        "left":"",
        "right":"",
        "date":24*60*60*1000,
        "title":"",//"Tournament ".$row1["tid"]." Round ".($row1["rid"]+1),
        "setup":[],
        "shero":Array(HERO.length).fill(0),
        "player":[],
        "phero":Array(HERO.length).fill(0),
        "spromo":Array(HERO.length).fill(0),
        "ppromo":Array(HERO.length).fill(0),
    }
    for (var i=0; i<str.length; ++i) {
        numb = str.charCodeAt(i);
        bits.push((numb>>7)&1);
        bits.push((numb>>6)&1);
        bits.push((numb>>5)&1);
        bits.push((numb>>4)&1);
        bits.push((numb>>3)&1);
        bits.push((numb>>2)&1);
        bits.push((numb>>1)&1);
        bits.push((numb)&1);
    }
    bits = bits.join("");
    // skip first bit
    var winner = parseInt(bits[1]);
    var tid = bits2int(bits,2,16);
    ret.date*=tid;
    var round = bits2int(bits,18,6);
    ret.title="Tournament "+(tid-17347)+" Round "+(round+1);
    var leftlen = bits2int(bits,24,6);
    var rightlen = bits2int(bits,30,6);
    var pointer = 36;
    var left="";
    for (var i=0; i<leftlen; ++i) {
        left+=bits2char(bits,pointer);
        pointer+=6;
    }
    ret.left=left;
    var right="";
    for (var i=0; i<rightlen; ++i) {
        right+=bits2char(bits,pointer);
        pointer+=6;
    }
    var hlen = Math.ceil(Math.log2(HERO.length));
    var mlen = Math.ceil(Math.log2(MONSTERS.length));
    var plen = 3;
    var llen = 7;
    ret.right=right;
    ret.winner=winner?right:left;
    for (var i=0; i<30; ++i) {
        var isHero = bits2int(bits,pointer++,1);
        if (isHero) {
            hid=bits2int(bits,pointer,hlen);
            pointer+=hlen;
            level=bits2int(bits,pointer,llen);
            if (level>=100) level=1000;
            pointer+=llen;
            promo=bits2int(bits,pointer,plen);
            pointer+=plen;
            ret.setup.push(-(hid+2));
            ret.shero[hid]=level;
            ret.spromo[hid]=promo;
        } else {
            mid = bits2int(bits,pointer,mlen);
            pointer+=mlen;
            ret.setup.push(mid-1);
        }
    }
    for (var i=0; i<30; ++i) {
        var isHero = bits2int(bits,pointer++,1);
        if (isHero) {
            hid=bits2int(bits,pointer,hlen);
            pointer+=hlen;
            level=bits2int(bits,pointer,llen);
            if (level>=100) level=1000;
            pointer+=llen;
            promo=bits2int(bits,pointer,plen);
            pointer+=plen;
            ret.player.push(-(hid+2));
            ret.phero[hid]=level;
            ret.ppromo[hid]=promo;
        } else {
            mid = bits2int(bits,pointer,mlen);
            pointer+=mlen;
            ret.player.push(mid-1);
        }
    }
    return ret;
}

function rperc(i,t,p) {
    var total = (1-Math.pow(1+(1/t),t))/(-(1/t));
    var curr = Math.pow(1+(1/t),t-i);
    var prize = p*curr/total;
    if (isNaN(prize)) prize=0;
    return Math.round(prize);
}

function getPrizeLimits(ENTRIES) {
    var ASPERC = 2; 
    var PGPERC = 20;
    var ASperENTRY = 1.5;
    var PGperENTRY = 3;
    var CCperENTRY = 10;

    var ASPOOL = ASperENTRY*ENTRIES;
    var PGPOOL = PGperENTRY*ENTRIES;
    var CCPOOL = CCperENTRY*ENTRIES;

    var ASindex = Math.round(ASPERC/100*ENTRIES);
    var PGindex = Math.round((PGPERC+ASPERC)/100*ENTRIES);
    var CCplayers = ENTRIES - PGindex;
    var ASplayers = ASindex;
    var PGplayers = PGindex-ASindex;
    return [
        {text:"Top "+ASPERC+"% get AS","center":true},
        {text:"Top 1",reward:rperc(1,ASplayers,ASPOOL),"type":"08y7"},
        {text:"Top "+(ASindex||1),reward:rperc(ASplayers,ASplayers,ASPOOL),"type":"08y7"},
        {text:"Top "+PGPERC+"% get PG","center":true},
        {text:"Top "+((ASindex+1)||1),reward:rperc(1,PGplayers,PGPOOL),"type":"0j14"},
        {text:"Top "+(PGindex||1),reward:rperc(PGplayers,PGplayers,PGPOOL),"type":"0j14"},
        {text:"Rest get CC","center":true},
        {text:"Top "+((PGindex+1)||1),reward:rperc(1,CCplayers,CCPOOL),"type":"0ap1"},
        {text:"Top "+(ENTRIES||1),reward:rperc(CCplayers,CCplayers,CCPOOL),"type":"0ap1"},
    ];
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    var isSub = (longer.toLowerCase().indexOf(shorter.toLowerCase()) !== -1)?1:0; //check whether
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) + isSub;
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
function easeInOutQuad(t) { return 1.0-(Math.cos(t*Math.PI)+1.0)/2.0; };
function Texer(jsonurl,audioUrls,animationFrames) {
    var animationFrames = animationFrames||10;
    var audioFiles = audioUrls||[];
    var self = this;
    this.loadData = {
        todoBytes:[],
        doneBytes:[],
        todo: 0,
        done: 0,
    }
    this.url = jsonurl;
    this.json = undefined;
    this.sources = [];
    this.audios = [];
    this.animations = {};
    this.negatives = {};
    this.doneAnim = [];
    // load JSON
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
            self.setJSON(this.responseText);
        }
    };
    xhttp.open("GET", this.url, true);
    xhttp.send();
    this.setJSON = function (data) {
        this.json = JSON.parse(data);
        // cache animations
        for (var key in this.json.sprites) {
            var _pos = key.indexOf("_");
            if (_pos!==-1) {
                var akey = key.substr(0,_pos);
                if (this.animations[akey]==undefined) {
                    this.animations[akey] = {
                        frame: 0,
                        maxFrames: 0,
                        todoFrames: animationFrames,
                        animationFrames: animationFrames,
                        callback: function () {},
                        method: "normal",
                        direction: 1,
                    }
                }
                this.animations[akey].maxFrames+=1;
            }
        }
        this.loadBegin();
    }
    this.loadBegin = function () {
        var rootPath = this.url.substr(0,this.url.lastIndexOf('/')+1);
        var loadBlob = function (elem,url,id) {
            var xmlHTTP = new XMLHttpRequest();

            xmlHTTP.open( 'GET', url , true );
            xmlHTTP.responseType = 'arraybuffer';

            xmlHTTP.onload = function( e ) {
                var h = xmlHTTP.getAllResponseHeaders(),
                    m = h.match( /^Content-Type\:\s*(.*?)$/mi ),
                    mimeType = m!==null&&m.length>=1?m[ 1 ]:'image/png';
                
                var blob = new Blob( [ this.response ], { type: mimeType } );
                elem.src = window.URL.createObjectURL( blob );
                if (!('onloadend' in xmlHTTP)) {
                    self.loadData.done+=1;
                }
            };
            xmlHTTP.onerror = function() {
                setTimeout(function(){loadBlob(elem,url,id)}, 1000);
            }

            if ('onprogress' in xmlHTTP)
                xmlHTTP.onprogress = function( e ) {
                    if ( e.lengthComputable ) {
                        self.loadData.todoBytes[id]=e.total;
                        self.loadData.doneBytes[id]=e.loaded;
                    }
                }

            if ('onloadend' in xmlHTTP)
                xmlHTTP.onloadend = function() {
                    self.loadData.done+=1;
                }

            xmlHTTP.send();
        }
        var loadImage = function (url,id) {
            var img = new Image();
            loadBlob(img,url,id);
            return img;
        }
        var loadAudio = function (url,id) {
            var audio = new Audio();
			if(!window.location.href.startsWith("file"))
				loadBlob(audio,url,id);
            return audio;
        }
        self.loadData.todo=this.json.sources.length+audioFiles.length;
        for (var i=0; i<this.json.sources.length; ++i) {
            self.loadData.doneBytes[i] = self.loadData.todoBytes[i] = 0;
            this.sources[i]=loadImage(rootPath+this.json.sources[i],i);
        }
        if (audioFiles) {
            for (var i=0; i<audioFiles.length; ++i) {
                self.loadData.doneBytes[i+this.json.sources.length] = self.loadData.todoBytes[i+this.json.sources.length] = 0;
                this.audios[i]=loadAudio(audioFiles[i],i+this.json.sources.length);
            }
        }
    }
    this.isLoaded = function () {
        for (var i=0; i<this.sources.length; ++i) {
            if (this.sources[i]==undefined || (!this.sources[i].complete && this.sources[i].naturalHeight == 0)) {
                return self.loadData.todo>0 && self.loadData.done>=self.loadData.todo;
            }
        }
        return self.loadData.todo>0 && self.loadData.done>=self.loadData.todo;
    }
    this.loadPercentage = function () {
        var todo = 0;
        var done = 0;
        for (var i=0; i<this.sources.length+audioFiles.length; ++i) {
            done += self.loadData.doneBytes[i];
            todo += self.loadData.todoBytes[i];
        }
        if (this.isLoaded()) return 1;
        //console.log(self.loadData.todoFiles>0,(self.loadData.todoFiles+audioFiles.length)==self.loadData.doneFiles,self.loadData.doneImg==self.loadData.todoImg);
        return done/(todo||1);
    }
    this.loadString = function () {
        function pad(num,size) {
            var s = String(num);
            while (s.length < (size || 2)) {s = " " + s;}
            return s;
        }
        var todo = 0;
        var done = 0;
        for (var i=0; i<this.sources.length+audioFiles.length; ++i) {
            done += self.loadData.doneBytes[i];
            todo += self.loadData.todoBytes[i];
        }
        return pad((self.loadData.done||0),(self.loadData.todo||0).toString().length)+"/"+(self.loadData.todo||0)+" Files ["+pad((done||0),(todo||0).toString().length)+"/"+(todo||0)+"] Bytes";
    }
    this.draw = function (ctx,key,x,y,w1,h1) {
        try {
            x=x||0;
            y=y||0;
            if (key in this.animations && this.animations[key].method!=="normal") {
                var s = this.getSprite(key);
                var perc = this.animations[key].todoFrames/this.animations[key].animationFrames;
                if (this.animations[key].method=="interpolate") {
                    var s1 = s,s2;
                    var next = this.getNext(key);
                    if (next==undefined) {
                        if (this.animations[key].direction==-1) {
                            s2 = this.json.sprites[key+"_"+(this.animations[key].maxFrames+1).toString()];
                        } else {
                            s2 = this.json.sprites[key+"_0"];
                        }
                    } else s2 =this.json.sprites[key+"_"+next];
                    var alpha = easeInOutQuad(perc);
                    //var alpha = perc;
                } else if (this.animations[key].method=="fadein") {
                    var s2 = s;
                    var prev = this.getPrevious(key);
                    if (prev!=undefined) s1 = this.json.sprites[key+"_"+prev];
                    //var alpha = Math.pow(perc,0.1);
                    var alpha = easeInOutQuad(perc);
                } else if (this.animations[key].method=="fadeout") {
                    var s1 = s;
                    var next = this.getNext(key);
                    if (next!=undefined) s2 = this.json.sprites[key+"_"+next];
                    //var alpha = perc;
                    var alpha = easeInOutQuad(perc);
                }
                var img1 = s1!==undefined?this.sources[s1.source]:undefined;
                var img2 = s2!==undefined?this.sources[s2.source]:undefined;
                var beta = Math.sqrt(1-Math.pow(alpha,2));
                ctx.save();
                ctx.globalAlpha = alpha;
                if (img1!==undefined) {
                    w=w1||(s1.w0*s.s)/2;
                    h=h1||(s1.h0*s.s)/2;
                    ctx.drawImage(img1,s1.x,s1.y,s1.w0,s1.h0,x+s1.x0/2,y+s1.y0/2,w,h);
                }
                ctx.globalAlpha = beta;
                if (img2!==undefined) {
                    w=w1||(s2.w0*s.s)/2;
                    h=h1||(s2.h0*s.s)/2;
                    ctx.drawImage(img2,s2.x,s2.y,s2.w0,s2.h0,x+s2.x0/2,y+s2.y0/2,w,h);
                }
                ctx.restore();
            } else {
                var s = this.getSprite(key);
                var img = this.sources[s.source];
                if (w1==undefined && h1==undefined) {
                    ctx.drawImage(img,s.x,s.y,s.w0,s.h0,Math.round(x+s.x0/2),Math.round(y+s.y0/2),Math.round((s.w0*s.s)/2),Math.round((s.h0*s.s)/2));
                } else {
                    ctx.drawImage(img,s.x,s.y,s.w0,s.h0,Math.round(x+s.x0*(w1/s.w)),Math.round(y+s.y0*(h1/s.h)),Math.round((s.w0*(w1/s.w)*s.s)),Math.round((s.h0*(h1/s.h)*s.s)));
                }
            }  
        } catch (e) {
            
        }  
    }
    this.negative = function (ctx,key,x,y,w1,h1) {
        try {
            x=x||0;
            y=y||0;
            var s = this.getSprite(key);
            if (this.negatives[key]===undefined) {
                var pixels = this.getPixels(key);
                var cache = document.createElement('canvas');
                cache.width = s.w0;
                cache.height = s.h0;
                var ctx2=cache.getContext("2d");
                var img = this.sources[s.source];
                ctx2.drawImage(img,s.x,s.y,s.w0,s.h0,0,0,s.w0,s.h0);
                var pixels=ctx2.getImageData(0,0,s.w0,s.h0);
                for (var i=0; i<pixels.data.length; i+=4) {
                    //Red * 0.3 + Green * 0.59 + Blue * 0.11
                    // var col=pixels.data[i]*0.3+pixels.data[i+1]*0.59+pixels.data[i+2]*0.11;
                    var col=(pixels.data[i]+pixels.data[i+1]+pixels.data[i+2])/3;
                    pixels.data[i]=col;
                    pixels.data[i+1]=col;
                    pixels.data[i+2]=col;
                }
                ctx2.putImageData(pixels,0,0,0,0,s.w0,s.h0);
                this.negatives[key] = cache;
            }
            if (w1==undefined && h1==undefined) {
                ctx.drawImage(this.negatives[key],0,0,s.w0,s.h0,x+s.x0/2,y+s.y0/2,(s.w0*s.s)/2,(s.h0*s.s)/2);
            } else {
                ctx.drawImage(this.negatives[key],0,0,s.w0,s.h0,x+s.x0*(w1/s.w),y+s.y0*(h1/s.h),(s.w0*(w1/s.w)*s.s),(s.h0*(h1/s.h)*s.s));
            }
        } catch (e) {
            
        }
    }
    this.getPixels = function (key) {
        var s = this.getSprite(key);
        var cache = document.createElement('canvas');
        cache.width = s.w0;
        cache.height = s.h0;
        var ctx=cache.getContext("2d");
        var img = this.sources[s.source];
        ctx.drawImage(img,s.x,s.y,s.w0,s.h0,0,0,s.w0,s.h0);
        var pixels=ctx.getImageData(0,0,s.w0,s.h0);
        return pixels;
    }
    this.getImage = function (key) {
        if (key in this.json.sprites) {
            var s = this.json.sprites[key];
            return {
                source: this.sources[s.source],
                x0: s.x0,
                y0: s.y0,
                w0: s.w0,
                h0: s.h0,
                x: s.x,
                y: s.y,
                w: s.w/2,
                h: s.h/2,
                s: s.s
            }
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return false;
        }
    } 
    this.getSprite = function (key) {
        if (key in this.json.sprites) {
            return this.json.sprites[key];
        } else if (key in this.animations) {
            if (this.doneAnim.indexOf(key)===-1) {
                --this.animations[key].todoFrames;
                this.doneAnim.push(key);
            }
            if (this.animations[key].todoFrames<=0) {
                this.animations[key].todoFrames = this.animations[key].animationFrames;
                this.animations[key].frame=(this.animations[key].frame+1)%this.animations[key].maxFrames;
            }
            if (this.animations[key].todoFrames==1 && this.animations[key].frame==this.animations[key].maxFrames-1 && typeof this.animations[key].callback==="function") {
                this.animations[key].callback();
            }
            if (this.animations[key].direction==1) {
                return this.json.sprites[key+"_"+this.animations[key].frame];
            } else {
                return this.json.sprites[key+"_"+((this.animations[key].maxFrames-1)-this.animations[key].frame).toString()];
            }
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return undefined;
        }
    }
    this.getPrevious = function (key) {
        if (key in this.animations) {
            var current = this.animations[key];
            if (current.frame==0) return undefined;
            else if (current.direction==1) return current.frame-1;
            else return current.maxFrames-current.frame;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return undefined;
        }
    }
    this.getNext = function (key) {
        if (key in this.animations) {
            var current = this.animations[key];
            if (current.frame==current.maxFrames-1) return undefined;
            else if (current.direction==1) return current.frame+1;
            else return current.maxFrames-2-current.frame;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return undefined;
        }
    }
    this.setCallback = function (key,cb) {
        if (key in this.animations) {
            this.animations[key].callback=cb;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return undefined;
        }
    }
    this.setAnimation = function (key,v) {
        if (key in this.animations) {
            this.animations[key].animationFrames=v;
            this.animations[key].todoFrames = v;
            this.animations[key].frame = 0;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
        }
    }
    this.setMethod = function (key,method) {
        if (key in this.animations) {
            this.animations[key].method=method;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
        }
    }
    this.setDirection = function (key,direction) {
        if (key in this.animations) {
            this.animations[key].direction=direction;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
        }
    }
    this.width = function (key) {
        if (key in this.json.sprites) {
            return this.json.sprites[key].w/2;
        } else if (key+"_0" in this.json.sprites) {
           return this.json.sprites[key+"_0"].w/2;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return 1;
        }
    }
    this.height = function (key) {
        if (key in this.json.sprites) {
            return this.json.sprites[key].h/2;
        } else if (key+"_0" in this.json.sprites) {
           return this.json.sprites[key+"_0"].h/2;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return 1;
        }
    }
    this.frames = function (key) {
        if (key in this.json.sprites) {
            return 1;
        } else if (key in this.animations) {
           return this.animations[key].maxFrames;
        } else {
            console.log("Texer error: Unknown key ["+key+"]");
            return 1;
        }
    }
    this.stepAnim = function () {
        this.doneAnim = [];
    }
    this.loop = function (id) {
        try {
            if (this.audios.length>id) {
                if (typeof this.audios[id].loop == 'boolean') {
                    this.audios[id].loop = true;
                } else {
                    this.audios[id].addEventListener('ended', function() {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                }
            }
        } catch (e) {

        }
    }
    this.play = function (id) {
        try {
            if (this.audios.length>id) {
                this.audios[id].currentTime = 0;
                this.audios[id].play();
            }
        } catch (e) {

        }
    }
    this.stop = function (id) {
        try {
            if (this.audios.length>id && !this.audios[id].paused) {
                this.audios[id].pause();
                this.audios[id].currentTime = 0;
            }
        } catch (e) {

        }
    }
    this.effect = function (id,effect) {
        if (this.audios.length>id) {
            if (effect=="fadein") {
                var audio = this.audios[id];
                audio.volume = 0.0;
            }
        }
    }
    this.setVolume = function (id,volume) {
        try {
            this.audios[id].volume = volume;
        } catch (e) {

        }
    }
    this.setSpeed = function (id,speed) {
        try {
            this.audios[id].playbackRate = speed;
        } catch (e) {

        }
    }
}
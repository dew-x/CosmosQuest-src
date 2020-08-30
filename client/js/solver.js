function randomLineup(force,fols,hpool,mpool) {
    var row = Array(6).fill(-1);
    var used = 0;
    for (var j=0; j<6; ++j) {
        if (force[j]==-1) {
            var rnd = Math.random();
            if (rnd<0.1) { // empty
                row[j]=-1;
            } else if (rnd<0.4 && mpool.length>0) { // monster
                row[j]=-1;
                var tries = 10;
                while (--tries) {
                    var pid = Math.floor(Math.random()*mpool.length);
                    var mid = mpool[pid];
                    if (fols-used>MONSTERS[mid].cost) {
                        row[j]=mid;
                        used+=MONSTERS[mid].cost;
                        break;
                    }
                }
            } else if (hpool.length>0) { // hero
                row[j]=-1;
                var tries = 50;
                while (--tries) {
                    var pid = Math.floor(Math.random()*hpool.length);
                    var hid = hpool[pid];
                    var hpos = -(2+hid)
                    if (row.indexOf(hpos)===-1) {
                        row[j]=hpos;
                        break;
                    }
                }
            }
        } else {
            row[j] = force[j];
        }
    }
    return row;
}

function changeOne(row,force,fols,hpool,mpool) {
    var used = 0;
    for (var j=0; j<6; ++j) {
        if (row[j]>=0&&force[j]==-1) {
            used+=MONSTERS[row[j]].cost;
        }
    }
    var tries = 10;
    while (--tries) {
        var j = Math.floor(Math.random()*6);
        if (force[j]==-1) {
            var rnd = Math.random();
            if (rnd<0.1) { // empty
                row[j]=-1;
                return;
            } else if (rnd<0.4 && mpool.length>0) { // monster
                var ocost = row[j]>=0?MONSTERS[row[j]].cost:0;
                var tries = 10;
                while (--tries) {
                    var pid = Math.floor(Math.random()*mpool.length);
                    var mid = mpool[pid];
                    if (fols-(used-ocost)>MONSTERS[mid].cost) {
                        row[j]=mid;
                        return;
                    }
                }
            } else if (hpool.length>0) { // hero
                var tries = 50;
                while (--tries) {
                    var pid = Math.floor(Math.random()*hpool.length);
                    var hid = hpool[pid];
                    var hpos = -(2+hid)
                    if (row.indexOf(hpos)===-1) {
                        row[j]=hpos;
                        return;
                    }
                }
            }
        }
    }
}

function amountOf(arr,val) {
    var count = 0;
    for (var i=0; i<arr.length; ++i) {
        if (arr[i]===val) ++count;
    }
    return count;
}

function Solver(ugrid,fols,uhero,upromo,setup,shero,spromo,mode) {
    this.grid = ugrid;
    this.fols = fols;
    this.hero = uhero;
    this.promo = upromo;
    this.setup = setup;
    this.shero = shero;
    this.spromo = spromo;
    this.steps = 0;
    this.running = true;
    this.known = [];
    this.mode=mode===undefined?"normal":mode;
    this.noProgress = 0;
    this.lastMaxDmg = 0;
    this.limit = 500;
    this.totalBest = null;
    this.init = function () {
        this.monsterPool = [];
        this.heroPool = [];
        this.folsLeft = this.fols;
        this.force = [];
        for (var i=0; i<6; ++i) {
            if (this.grid[i]>=0) {
                this.folsLeft-=MONSTERS[this.grid[i]].cost;
            }
            this.force[i]=this.grid[i];
        }
        for (var i=0; i<MONSTERS.length; ++i) {
            if (MONSTERS[i].cost<=this.folsLeft&&MONSTERS[i].cost>=this.folsLeft/48) this.monsterPool.push(i);
        }
        for (var i=0; i<HERO.length; ++i) {
            if (this.hero[i]>0 && HERO[i].rarity!==5 && this.grid.indexOf(-(i+2))===-1) this.heroPool.push(i); 
        } 
    }
	function better(a,b) {
		if (a.res==b.res || mode=="wb") {
			if (a.res==1) {
				var a1 = amountOf(a.row,-1);
				var b1 = amountOf(b.row,-1);
				if (a1==b1) {
					return b.dmg-a.dmg;
				} else return b1-a1;
			} else {
				return b.dmg-a.dmg;
			}
		} else return b.res-a.res;
	}
    this.step = function () {
        for(let st = 0;st < 20;st++){
			if(this.known.length > 0){
				this.noProgress++;
				var first = this.known[0];
				if(!this.totalBest || better(first, this.totalBest) < 0)
					this.totalBest = first;
				if(this.noProgress > this.limit && first.res <= 0){
					this.known = [];
					this.noProgress = 0;
					this.limit = 500;

				}
				if(first.dmg != this.lastMaxDmg){
					this.lastMaxDmg = first.dmg;
				this.limit += this.noProgress
					this.noProgress = 0;
				}
			}

			++this.steps;
			if (this.known.length<10||Math.random()<0.2) {
				var lineup = randomLineup(this.force,this.folsLeft,this.heroPool,this.monsterPool);
				var res = this.feed(lineup);
				this.known.push({
					row: lineup,
					dmg: res.dmga,
					res: res.result 
				});
			} else {
				while (this.known.length>10) this.known.pop(); 
				var one = Math.floor(this.known.length*Math.random());
				var cpy = this.known[one].row.slice();
				if (Math.random()<0.2) {
					var tries = 0;
					do {
						a = Math.floor(cpy.length*Math.random());
						b = Math.floor(cpy.length*Math.random());
						if (++tries>100) break; 
					} while (a==b||this.force[a]!==-1||this.force[b]!==-1);
					if (a!=b&&this.force[a]==-1&&this.force[b]==-1) {
						ov = cpy[a];
						cpy[a] = cpy[b];
						cpy[b] = ov;
					}
				} else {
					changeOne(cpy,this.force,this.folsLeft,this.heroPool,this.monsterPool);
				}
				var res = this.feed(cpy);
				this.known.push({
					row: cpy,
					dmg: res.dmga,
					res: res.result 
				});
			}
			this.known.sort(better);
		}
        var self = this;
        if (this.running) this.pid = setTimeout(function () {self.step();},1);
    }
    this.feed = function (row) {
        //console.log(row,this.setup,this.hero,this.shero,this.promo,this.spromo);
        return beginBattle(Date.now(),"Solver","enemy",row,this.setup,undefined,this.hero,this.shero,undefined,undefined,this.promo,this.spromo);
    }
    this.close = function () {
        this.running = false;
        clearInterval(this.pid);
        for (var i=0; i<this.grid.length; ++i) {
            this.grid[i] = this.totalBest.row[i]; 
        }
        return this.totalBest.row;
    }
    this.info = function () {
        return {
            solver:this.mode==undefined?"normal":this.mode,
            grid: this.grid,
            tries: this.steps,
            best: this.known[0].row,
            hero: this.hero,
            promo: this.promo,
            dmg: this.known[0].dmg,
            res: this.known[0].res,
            setup: this.setup,
            shero: this.shero,
            spromo: this.spromo,
        }
    }
    this.init();
    this.step();
}

function randomGrid(fols,hpool,mpool,size) {
    var row = Array(size);
    var used = 0;
    for (var j=0; j<size; ++j) {
        row[j]=-1;
        var rnd = Math.random();
        if (rnd<0.2) { // monster
            var tries = 20;
            while (--tries) {
                var pid = Math.floor(Math.random()*mpool.length);
                var mid = mpool[pid];
                if (fols-used>=MONSTERS[mid].cost) {
                    row[j]=mid;
                    used+=MONSTERS[mid].cost;
                    break;
                }
            }
        } else if (hpool.length>0) { // hero
            var tries = 50;
            while (--tries) {
                var pid = Math.floor(Math.random()*hpool.length);
                var hid = hpool[pid];
                var hpos = -(2+hid)
                if (row.indexOf(hpos)===-1) {
                    row[j]=hpos;
                    break;
                }
            }
        }
    }
    return row;
}

function randomLineup2(force,fols,hpool,mpool) {
    var row = Array(6).fill(-1);
    var used = 0;
    for (var j=0; j<6; ++j) {
        if (force[j]==-1) {
            row[j]=-1;
            var rnd = Math.random();
            if (rnd<0.3) { // monster
                var tries = 20;
                while (--tries) {
                    var pid = Math.floor(Math.random()*mpool.length);
                    var mid = mpool[pid];
                    if (fols-used>MONSTERS[mid].cost) {
                        row[j]=mid;
                        used+=MONSTERS[mid].cost;
                        break;
                    }
                }
            } else if (hpool.length>0) { // hero
                var tries = 50;
                while (--tries) {
                    var pid = Math.floor(Math.random()*hpool.length);
                    var hid = hpool[pid];
                    var hpos = -(2+hid)
                    if (row.indexOf(hpos)===-1) {
                        row[j]=hpos;
                        break;
                    }
                }
            }
        } else {
            row[j] = force[j];
            if(row[j] == 1)row[j] = -1;
        }
    }
    return row;
}

function tSolver(grid,fols,phero,ppromo,thero,tpromo,mode) {
    this.grid = grid;
    this.fols = fols;
    this.phero = phero;
    this.ppromo = ppromo;
    this.thero = thero;
    this.tpromo = tpromo;
    this.mode = mode;
    this.steps = 0;
    this.lines = 0;
    this.grids = 0;
    this.pool = {}; // player pools
    this.egrids = {};
    this.running = true;
    var gamount = 30;
    var psize = 30;
    this.result = {};
    this.init = function () {
        this.ehero = Array(this.thero.length).fill(0);
        this.epromo = Array(this.thero.length).fill(0);
        this.ahero = Array(this.thero.length).fill(0);
        this.apromo = Array(this.thero.length).fill(0);
        this.monsterPool = [];
        this.heroPool = [];
        this.gmonsterPool = [];
        this.gheroPool = [];
        this.folsLeft = this.fols;
        this.force = [];
        var amount = this.mode=="tournament"?30:18;
        for (var i=0; i<this.grid.length; ++i) {
            if (this.grid[i]>=0) {
                this.folsLeft-=MONSTERS[this.grid[i]].cost;
            }
            this.force[i]=this.grid[i];
        }
        for (var i=0; i<MONSTERS.length; ++i) {
            if (MONSTERS[i].cost<=this.folsLeft&&MONSTERS[i].cost>=this.folsLeft/(amount*4)) this.monsterPool.push(i);
            if (MONSTERS[i].cost<=this.fols&&MONSTERS[i].cost>=this.fols/(amount*4)) this.gmonsterPool.push(i);
        }
        for (var i=0; i<HERO.length; ++i) {
            var hid = -(i+2);
            if (this.thero[i]==-1) {
                if (this.phero[i]>0 && this.grid.indexOf(hid)===-1) this.heroPool.push(i);
                this.gheroPool.push(i);
                this.ehero[i]=99;
                this.epromo[i]=5;
                this.ahero[i]=this.phero[i];
                this.apromo[i]=this.ppromo[i];
            } else if (this.thero[i]>0) {
                if (this.grid.indexOf(hid)===-1) this.heroPool.push(i);
                this.gheroPool.push(i);
                this.ehero[i]=this.thero[i];
                this.epromo[i]=this.tpromo[i];
                this.ahero[i]=this.thero[i];
                this.apromo[i]=this.tpromo[i];
            }
        }
        while (this.grids<gamount) {
            this.genGrid();
        }
        while (this.lines<psize) {
            this.genLine();
        }
        
    }
    this.genGrid = function () {
        var amount = this.mode=="tournament"?30:18;
        var rounds = this.mode=="tournament"?5:3;
        var grid = randomGrid(this.fols,this.gheroPool,this.gmonsterPool,amount);
        this.egrids[this.grids] = {
            id: this.grids,
            grid: grid,
            w: 0,
            l: 0,
            results: [],
        };
        for (var pkey in this.pool) {
            var res = {w:0,l:0}
            for (var i=0; i<rounds; ++i) {
                var resu = this.feed(this.pool[pkey].row,grid.slice(i*6,(i+1)*6));
                if (resu.result==1) {
                    res.w++;
                } else if (resu.result==-1) {
                    res.l++;
                } else if (resu.dmga>=resu.dmgb) {
                    res.w++;
                } else {
                    res.l++;
                }
            }
            this.result[pkey+"_"+this.grids]=res;
            this.pool[pkey].w += res.w;
            this.pool[pkey].l += res.l; 
            this.egrids[this.grids].l += res.w;
            this.egrids[this.grids].w += res.l;
            this.pool[pkey].results.push(pkey+"_"+this.grids);
            this.egrids[this.grids].results.push(pkey+"_"+this.grids);
        }
        this.grids++;
    }
    this.genLine = function () {
        var lineup = randomLineup2(this.force,this.folsLeft,this.heroPool,this.monsterPool);
        this.pool[this.lines] = {
            id: this.lines,
            row: lineup,
            alive: 0,
            w: 0,
            l: 0,
            results: [],
        };
        var rounds = this.mode=="tournament"?5:3;
        for (var gkey in this.egrids) {
            var res = {w:0,l:0}
            for (var i=0; i<rounds; ++i) {
                var resu = this.feed(lineup,this.egrids[gkey].grid.slice(i*6,(i+1)*6));
                if (resu.result==1) {
                    res.w++;
                } else if (resu.result==-1) {
                    res.l++;
                } else if (resu.dmga>=resu.dmgb) {
                    res.w++;
                } else {
                    res.l++;
                }
            }
            this.result[this.lines+"_"+gkey]=res;
            this.pool[this.lines].w += res.w;
            this.pool[this.lines].l += res.l; 
            this.egrids[gkey].l += res.w;
            this.egrids[gkey].w += res.l;
            this.pool[this.lines].results.push(this.lines+"_"+gkey);
            this.egrids[gkey].results.push(this.lines+"_"+gkey);
        }
        this.lines++;
    }
    this.removeLine = function (id) {
        for (var gkey in this.egrids) {
            this.egrids[gkey].l -= this.result[id+"_"+gkey].l;
            this.egrids[gkey].w -= this.result[id+"_"+gkey].w;
        }
        for (var i=0; i<this.pool[id].results.length; ++i) {
            delete this.result[this.pool[id].results[i]];
        }
        delete this.pool[id];
    }
    this.removeGrid = function (id) {
        for (var pkey in this.pool) {
            this.pool[pkey].l -= this.result[pkey+"_"+id].l;
            this.pool[pkey].w -= this.result[pkey+"_"+id].w;
        }
        for (var i=0; i<this.egrids[id].results.length; ++i) {
            delete this.result[this.egrids[id].results[i]];
        }
        delete this.egrids[id];
    }
    this.step = function () {
        ++this.steps;
        // gen a new element in the pool
        this.genLine();
        this.genGrid();
        // remove worst
        for (var pkey in this.pool) {
            ++this.pool[pkey].alive;
            this.pool[pkey].wr = this.pool[pkey].w/(this.pool[pkey].w+this.pool[pkey].l);
        }
        
        var pkeys = Object.keys(this.pool);
        var gkeys = Object.keys(this.egrids);
        var self = this;
        pkeys.sort(function(a,b) {
            return self.pool[b].w-self.pool[a].w;
        });
        gkeys.sort(function(a,b) {
            return self.egrids[b].w-self.egrids[a].w;
        });
        this.top4 = pkeys.slice(0,4);
        this.removeLine(pkeys.pop());
        this.removeGrid(gkeys.pop());
        
        if (this.running) this.pid = setTimeout(function () {self.step();},1);
    }
    this.feed = function (rowa,rowb) {
        return beginBattle(Date.now(),"Solver","enemy",rowa,rowb,undefined,this.ahero,this.ehero,undefined,undefined,this.apromo,this.epromo);
    }
    this.close = function (pos) {
        if (pos===undefined) {
            pos = this.top4[0];
        }
        this.running = false;
        clearInterval(this.pid);
        for (var i=0; i<this.pool[pos].row.length; ++i) {
            this.grid[i] = this.pool[pos].row[i]; 
        }
    }
    this.info = function () {
        return {
            solver:this.mode,
            grid: this.grid,
            tries: this.steps,
            hero: this.ahero,
            promo: this.apromo,
            top: [
                this.pool[this.top4[0]],
                this.pool[this.top4[1]],
                this.pool[this.top4[2]],
                this.pool[this.top4[3]],
            ]
        }
    }
    this.init();
    this.step();
}
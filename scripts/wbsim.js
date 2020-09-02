var WB = {
    ID: parseInt(process.argv[2]),
    LVL: parseInt(process.argv[3])
}

function mfight(rowA,rowB,heroA,heroB,promoA,promoB) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB,undefined,undefined,promoA,promoB);
}

var fres = mfight(JSON.parse(process.argv[4]),[-(WB.ID+2),-1,-1,-1,-1,-1],JSON.parse(process.argv[5]),Array(HERO.length).fill(1),JSON.parse(process.argv[6]),JSON.parse(process.argv[7]));
console.log(fres.dmga);
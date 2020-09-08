function mfight(rowA,rowB,heroA,heroB,promoA,promoB) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB,undefined,undefined,promoA,promoB);
}

var fres = mfight(JSON.parse(process.argv[2]),JSON.parse(process.argv[4]),JSON.parse(process.argv[3]),JSON.parse(process.argv[5]),JSON.parse(process.argv[6]),JSON.parse(process.argv[7]));
console.log(fres.result);
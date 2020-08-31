const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res) {
    var fres = mfight(JSON.parse(req.body.A),JSON.parse(req.body.B),JSON.parse(req.body.hA),JSON.parse(req.body.hB),JSON.parse(req.body.pA),JSON.parse(req.body.pB));
    res.status(200).send(""+fres.result);
});

app.use(function(req, res, next) {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

function mfight(rowA,rowB,heroA,heroB,promoA,promoB) {
    return beginBattle(Date.now(),"You","Enemy",rowA,rowB,"ranking",heroA,heroB,undefined,undefined,promoA,promoB);
}

//var fres = mfight(JSON.parse(process.argv[2]),JSON.parse(process.argv[4]),JSON.parse(process.argv[3]),JSON.parse(process.argv[5]),JSON.parse(process.argv[6]),JSON.parse(process.argv[7]));
//console.log(fres.result);
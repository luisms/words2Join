module.exports = function (app, apiBaseURL, db) {

    //To get global ranking:
    app.get(apiBaseURL + '/individualRanking', function (req, res) {
        console.log("GET to obtain global ranking");
        db.find({}, (err, allranking) => {
            if (err) {
                res.sendStatus(500);
            } else {
                allranking.sort(function(a, b){return b.score - a.score});
                res.send(allranking);
            }
        });
    });

    //To get individual ranking:
    app.get(apiBaseURL + '/individualRanking/:idUser', function (req, res) {
        console.log("GET to obtain individual ranking");
        db.find({}, (err, indranking) => {
            var rankingByPlayer = new Array();
            if (err) {
                res.sendStatus(500);
            } else {
                indranking.forEach(function (element) {
                    if (element.player == req.params.idUser){
                        rankingByPlayer.push(element);
                    }
                });
                if (rankingByPlayer != null){
                    rankingByPlayer.sort(function(a, b){return b.score - a.score});
                    res.send(rankingByPlayer);
                }else{
                    res.sendStatus(200);
                }
            }
        });
    });

    /*
    //To add individual games at ranking:

    app.post(apiBaseURL + '/individualRanking', function (req, resp) {
        console.log("POST to add individual ranking");
        var indGame = req.body;
        console.log(JSON.stringify(indGame, null, ' '));
        if (individualRanking == null) {
            individualRanking = new Array(indGame);
        } else {
            individualRanking.push(indGame);
        }
        resp.sendStatus(200);
    });

    //To update individual games at ranking:
    app.put(apiBaseURL + '/individualRanking/', function (req, resp) {
        console.log("PUT to update individual ranking");
        if (individualRanking == null) {
            console.log("No hay partidas en la lista");
        } else {
            for (i = 0; i < individualRanking.length; i++) {
                if (individualRanking[i].idRanking == req.body.idRanking) {
                    individualRanking[i].idUser = req.body.idUser;
                    individualRanking[i].user = req.body.user;
                    individualRanking[i].score = req.body.score;
                    break;
                }
            }
        }
        console.log(individualRanking);
        resp.sendStatus(200);
    });

    //To delete one individual game from ranking:
    app.delete(apiBaseURL + '/individualRanking/:idRanking', function (req, res) {
        console.log("Delete individual game from individualRanking");
        var removed = individualRanking.filter(function (element) {
            return element.idRanking != req.params.idRanking;
        });
        console.log(JSON.stringify(removed, null, ' '));
        res.sendStatus(200);
    });
    */
};
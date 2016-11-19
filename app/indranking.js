module.exports = function (app, apiBaseURL) {
    //Inputing datas
    var player1 = { ranking: 1, score: 9999, player: "player1" };
    var player2 = { ranking: 2, score: 8888, player: "player2" };
    var player3 = { ranking: 3, score: 7777, player: "player3" };
    var player4 = { ranking: 4, score: 6666, player: "player4" };
    var player5 = { ranking: 5, score: 5555, player: "player5" };
    var player6 = { ranking: 6, score: 4444, player: "player6" };
    var player7 = { ranking: 7, score: 3333, player: "player7" };
    var player8 = { ranking: 8, score: 2222, player: "player8" };
    var player9 = { ranking: 9, score: 1111, player: "player9" };
    var player10 = { ranking: 10, score: 0000, player: "player10" };
    //Inputing values in a list
    var players = [player1, player2, player3, player4, player5, player6, player7, player8, player9, player10];

    //To get all individual ranking all players:
    app.get(apiBaseURL + '/individualRanking', function (req, resp) {
        console.log("GET to obtain all players's ranking");
        resp.json(individualRanking);
    });

    //To get all individual ranking one player:
    app.get(apiBaseURL + '/individualRanking/:idUser', function (req, resp) {
        console.log("GET to obtain one players's ranking");
        var indUserRanking = new Array();
        individualRanking.forEach(function (element) {
            //console.log(req.params.idUser+ ' ' + element);
            if (element.idUser == req.params.idUser)
                indUserRanking.push(element);
        });
        if (indUserRanking != null)
            resp.json(indUserRanking);
        else
            resp.sendStatus(200);
    });

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

};

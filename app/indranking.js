module.exports = function (app, apiBaseURL) {

    //typedef var individualGameX {idRanking, idUser, nameUserm, ScoreGame}
    var individualGame1 = { idRanking: 1, idUser: 1, user: "Pablo", score: "1975" };
    var individualGame2 = { idRanking: 2, idUser: 2, user: "Paco", score: "1290" };
    var individualGame3 = { idRanking: 3, idUser: 3, user: "Macarena", score: "1275" };
    var individualGame4 = { idRanking: 4, idUser: 4, user: "Rogelia", score: "1200" };
    var individualGame5 = { idRanking: 5, idUser: 5, user: "Pamela", score: "1100" };
    var individualGame6 = { idRanking: 6, idUser: 6, user: "Rocco", score: "1090" };
    var individualGame7 = { idRanking: 7, idUser: 7, user: "Alex", score: "1075" };
    var individualGame8 = { idRanking: 8, idUser: 1, user: "Pablo", score: "990" };
    var individualGame9 = { idRanking: 9, idUser: 8, user: "Fermín", score: "875" };
    var individualGame10 = { idRanking: 10, idUser: 1, user: "Pablo", score: "690" };
    //init individual games array var:
    var individualRanking = [individualGame1, individualGame2, individualGame3, individualGame4,
        individualGame5, individualGame6, individualGame7, individualGame8, individualGame9, individualGame10];

    //Geting all players
    app.get(apiBaseURL + '/players', function (req, res) {
        console.log("New GET");
        res.json(players);
    });

    //Geting the ID of a single player
    app.get(apiBaseURL + '/players/:id', function (req, res) {
        console.log("New ID GET");
        i = 0;
        finded = false;
        while (i < players.length && !finded) {
            if (players[i].player == req.params.id) {
                res.json(players[i]);
                finded = true;
            }
            i++;
        }
    });

    //Posting all players to be writen
    app.post(apiBaseURL + '/players', function (req, res) {
        var player = req.body;

        console.log("New POST");
        console.log(" Data: " + player);
        players.push(player);
        res.sendStatus(200);
    });

    //Putting the ID of a single player
    app.put(apiBaseURL + '/players/:id', function (req, res) {
        console.log("New ID PUT");

        i = 0;
        finded = false;
        while (i < players.length && !finded) {
            if (players[i].player == req.params.id) {
                players[i].ranking = req.body.ranking;
                players[i].score = req.body.score;
                finded = true;
            }
            i++;
        }

    });

    //Deleting all players
    app.delete(apiBaseURL + '/players', function (req, res) {
        console.log(" new DELETE");
        for (i = 0; i < players.length; i++) {

            if (players[i].player == req.body.player) {
                players.splice(i);
            }
        }
        res.sendStatus(200);
    });

    //Deleting the ID of a single player
    app.delete(apiBaseURL + '/players/:id', function (req, res) {
        console.log(" new ID DELETE");
        for (i = 0; i < players.length; i++) {
            if (players[i].player == req.params.id) {
                players.splice(i, 1);
            }
        }
    });
};

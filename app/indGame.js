module.exports = function (app, apiBaseURL, db) {
    //To get all individual games all players:
    app.get(apiBaseURL + '/individualGames', function (req, res) {
        console.log("GET to obtain all players's games");
        db.find({}, (err, games) => {
            if (err) {
                res.sendStatus(500);
            } else {
                games.sort(function(a, b){return a.id - b.id});
                res.send(games);
            }
        });
    });

    //To get all individual games one player:
    app.get(apiBaseURL + '/individualGames/:player', function (req, res) {
        console.log("GET to obtain one players's games");
        db.find({}, (err, games) => {
            var gamesByPlayer = new Array();
            if (err) {
                res.sendStatus(500);
            } else {
                games.forEach(function (element) {
                    if (element.player == req.params.player)
                        gamesByPlayer.push(element);
                });
                if (gamesByPlayer != null)
                    res.send(gamesByPlayer);
                else
                    res.sendStatus(200);
            }
        });
    });

    //To add individual game at games:
    app.post(apiBaseURL + '/individualGames', function (req, res) {
        console.log("POST to add individual game");
        var game = req.body;
        if (game == null) {
            console.log("No data sent -> null request at post or no name's player");
        } else {
            db.find({}, (err, individualGames) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    //game.unshift({id: individualGames.length + 1});
                    game.id = individualGames.length + 1;
                    db.insert(game); 
                    console.log("Game Inserted:" + JSON.stringify(game, null, ' '));
                    res.sendStatus(200);
                }
            });
        }
    });


    //To update individual game at games:
    app.put(apiBaseURL + '/individualGames/:id', (req, res) => {
        var id = req.params.id;
        var individualGame = req.body;

        console.log("New PUT request over /individualGames/" + id);
        console.log("Data: " + JSON.stringify(individualGame, 2));

        if (individualGame.score == null) {
            res.sendStatus(409);
            return;
        }

        db.update({ id: parseInt(id) }, {$set: {score: individualGame.score}}, (err, numUpdates) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Updated " + numUpdates + " objects");
                res.sendStatus(200);
            }
        })
    });

    //To delete all individual game
    app.delete(apiBaseURL + '/individualGames', function (req, res) {
        console.log("NEW DELETE all request over /individualGames");
        db.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " objects.");
                res.sendStatus(200);
            }
        })
    });

    //To delete one individual game from games:
    app.delete(apiBaseURL + "/individualGames/:id", (req, res) => {
        var id = req.params.id;
        console.log("New DELETE request over /individualGames/" + id);
        db.remove({ id: parseInt(id) }, {}, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " objects");
                res.sendStatus(200);
            }
        })
    });
};
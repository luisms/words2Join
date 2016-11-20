module.exports = function (app, apiBaseURL) {

    //Inputing datas

    

    var dateNow = new Date();

    var individualranking1 = { ranking: 1, score: 9999, player: "player1", date:dateNow.toISOString()};

    var individualranking2 = { ranking: 2, score: 8888, player: "player2", date:dateNow.toISOString()};

    var individualranking3 = { ranking: 3, score: 7777, player: "player3", date:dateNow.toISOString()};

    var individualranking4 = { ranking: 4, score: 6666, player: "player4", date:dateNow.toISOString()};

    var individualranking5 = { ranking: 5, score: 5555, player: "player5", date:dateNow.toISOString()};

    var individualranking6 = { ranking: 6, score: 4444, player: "player6", date:dateNow.toISOString()};

    var individualranking7 = { ranking: 7, score: 3333, player: "player7", date:dateNow.toISOString()};

    var individualranking8 = { ranking: 8, score: 2222, player: "player8", date:dateNow.toISOString()};

    var individualranking9 = { ranking: 9, score: 1111, player: "player9", date:dateNow.toISOString()};

    var individualranking10 = { ranking: 10, score: 0000, player: "player10", date:dateNow.toISOString()};

    //Inputing values in a list

    var individualrankings = [individualranking1, individualranking2, individualranking3, individualranking4, individualranking5, individualranking6, individualranking7, individualranking8, individualranking9, individualranking10];



       //Geting all players

    app.get(apiBaseURL + '/individualrankings', function (req, res) {

        console.log("New GET");

        res.json(individualrankings);

    });



    //Geting the ID of a single individualranking

    app.get(apiBaseURL + '/individualrankings/:id', function (req, res) {

        console.log("New ID GET");

        i = 0;

        finded = false;

        while (i < individualrankings.length && !finded) {

            if (individualrankings[i].player == req.params.id) {

                res.json(individualrankings[i]);

                finded = true;

            }

            i++;

        }

    });



    //Posting all players to be writen

    app.post(apiBaseURL + '/individualrankings', function (req, res) {

        var individualranking = req.body;



        console.log("New POST");

        console.log(" Data: " + individualranking);

        individualrankings.push(individualranking);

        res.sendStatus(200);

    });



    //Putting the ID of a single player

    app.put(apiBaseURL + '/individualrankings/:id', function (req, res) {

        console.log("New ID PUT");



        i = 0;

        finded = false;

        while (i < individualrankings.length && !finded) {

            if (individualrankings[i].player == req.params.id) {

                individualrankings[i].ranking = req.body.ranking;

                individualrankings[i].score = req.body.score;

                individualrankings[i].date = req.body.date;

                finded = true;

            }

            i++;

        }

res.sendStatus(200);

    });



    //Deleting all players

    app.delete(apiBaseURL + '/individualrankings', function (req, res) {

        console.log(" new DELETE");

        for (i = 0; i < individualrankings.length; i++) {



            if (individualrankings[i].player == req.body.player) {

                individualrankings.splice(i);

            }

        }

        res.sendStatus(200);

    });



    //Deleting the ID of a single player

    app.delete(apiBaseURL + '/individualrankings/:id', function (req, res) {

        console.log(" new ID DELETE");

        for (i = 0; i < individualrankings.length; i++) {

            if (individualrankings[i].player == req.params.id) {

                individualrankings.splice(i, 1);

            }

        }
        res.sendStatus(200);

    });

};
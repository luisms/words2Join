module.exports = function (app, apiBaseURL) {
    partida = { "player": "luis", "date": "11/11/2016" };
    var listaPartidas = [partida];

    app.get(apiBaseURL + '/games', function (req, res) { //request y response 
        console.log("NEW GET");
        res.send(listaPartidas);
    });

    app.post(apiBaseURL + '/games', function (req, res) {
        var partidas = req.body;
        console.log("NEW POST");
        console.log("DATA: " + req.body);
        console.log(JSON.stringify(partidas));
        listaPartidas.push(partidas);
        res.send(partidas);
        //res.sendStatus(200);
    });

    app.put(apiBaseURL + '/games/:player', function (req, res) {
        console.log("UPDATE");
        for (i = 0; i < listaPartidas.length; i++) {
            if (listaPartidas[i].player == req.params.player) {
                console.log(JSON.stringify(req.params.player));
                listaPartidas[i].date = req.body.date;
                console.log(JSON.stringify(req.body.date));
            }
        }
        res.sendStatus(200);
    });

    app.delete(apiBaseURL + '/games', function (req, res) {
        console.log("Delete");
        listaPartidas.splice(0, listaPartidas.length);
        res.sendStatus(200);
    });

};

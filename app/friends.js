
module.exports = function (app, apiBaseURL) {

    var friends; //Format: {string name, boolean request}

    //Muestra todos los usuarios
    app.get(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW GET");
        if (friends == null || friends.length == 0) {
            res.send("No hay amigos agregados");
        } else {
            res.json(friends);
        }
    });

    //Muestra solo el usuario solicitado en la URL
    app.get(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW GET");
        if (friends == null || friends.length == 0) {
            res.send("No hay amigos agregados");
        } else {
            for (i = 0; i < friends.length; i++) {
                if (friends[i].name == req.params.id) {
                    res.json(friends[i]);
                }
            }
        }
    });

    //Crea un amigo
    app.post(apiBaseURL + '/friends', function (req, res) {
        var friend = req.body;
        console.log("NEW POST");
        console.log("Data: " + friend);
        if (friends == null) {
            friends = new Array(friend);
        } else {
            friends.push(friend);
        }
        res.sendStatus(200);
    });

    //A partir de un nombre de usuario, actualiza la peticion de partida
    app.put(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW PUT");
        for (i = 0; i < friends.length; i++) {
            if (friends[i].name == req.params.id) {
                friends[i].request = req.body.request;
            }
        }
        res.sendStatus(200);
    });

    //Borrado total
    app.delete(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW DELETE");
        friends.splice(0, friends.length);
        res.sendStatus(200);
    });

    //Borrado individual
    app.delete(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW DELETE");
        for (i = 0; i < friends.length; i++) {
            if (friends[i].name == req.params.id) {
                friends.splice(i, 1);
            }
        }
        res.sendStatus(200);
    });


};

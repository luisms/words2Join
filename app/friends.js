
module.exports = function (app, apiBaseURL) {
    //Modificar cuando exista login para que solo sean amigos usuarios existentes en la BD.
    var friendslist; /*Format: {string player, "friends":[
                                            {"player":"John", "score": integer, "date": formato fecha, "ranking": integer},
                                            {"player":"John", "score": integer, "date": formato fecha, "ranking": integer},
                                            {"player":"John", "score": integer, "date": formato fecha, "ranking": integer}]} */

    //Muestra todos los usuarios
    app.get(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW GET");
        if (friendslist == null || friendslist.length == 0) {
            res.send("No hay amigos agregados");
        } else {
            res.json(friendslist);
        }
    });

    //Muestra solo el usuario solicitado en la URL
    app.get(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW GET");
        if (friendslist == null || friendslist.length == 0) {
            res.send("No hay amigos agregados");
        } else {
            for (i = 0; i < friendslist.length; i++) {
                if (friendslist[i].player == req.params.id) {
                    res.json(friendslist[i]);
                }
            }
        }
    });

    //Crea un amigo
    app.post(apiBaseURL + '/friends', function (req, res) {
        var friend = req.body;
        var exist = false;
        console.log("NEW POST");
        console.log("Data: " + friend);
        if (friendslist == null) {
            friendslist = new Array(friend);
            res.sendStatus(200);
        } else {         
            for (i = 0; i < friendslist.length; i++) {
                if(friend.player == friendslist[i].player){
                    res.send("Ya existe un jugador con ese nombre.");
                    exist = true;
                    break;
                }
            }
            if(exist == false){
                friendslist.push(friend);
                res.sendStatus(200);
            }
        }

    });

    //A partir de un nombre de usuario, actualiza su lista de amigos
    app.put(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW PUT");
        for (i = 0; i < friendslist.length; i++) {
            if (friendslist[i].player == req.params.id) {
                for (j = 0; j < req.body.friends.length; j++) {
                    friendslist[i].friends.push(req.body.friends[j]);
                }
            }
        }
        res.sendStatus(200);
    });

    //Borrado total
    app.delete(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW DELETE");
        friendslist.splice(0, friendslist.length);
        res.sendStatus(200);
    });

    //Borrado individual
    app.delete(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW DELETE");
        for (i = 0; i < friendslist.length; i++) {
            if (friendslist[i].player == req.params.id) {
                friendslist.splice(i, 1);
            }
        }
        res.sendStatus(200);
    });

    //Borrado individual de amigo
    app.delete(apiBaseURL + '/friends/:id/:friend', function (req, res) {
        console.log("NEW DELETE");
        for (i = 0; i < friendslist.length; i++) {
            if (friendslist[i].player == req.params.id) {
                for (j = 0; j < friendslist[i].friends.length; j++) {
                    if (friendslist[i].friends[j].player == req.params.friend) {
                        friendslist[i].friends.splice(j, 1);
                    }
                }
            }
        }
        res.sendStatus(200);
    });
};

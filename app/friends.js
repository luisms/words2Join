module.exports = function (app, apiBaseURL, db) {
    //Muestra todos los usuarios
    app.get(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW GET friends");
        db.find({}, (err, friends) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(friends);
            }
        });
    });

    //Muestra solo el usuario solicitado en la URL
    app.get(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW GET user's friends");
        db.find({}, (err, friends) => {
            var friend = new Array();
            if (err) {
                res.sendStatus(500);
            } else {
                friends.forEach(function (element) {
                    if (element.player == req.params.id)
                        friend.push(element);
                });
                if (friend != null) {
                    res.send(friend);
                } else if (friends == null || friends.length == 0) {
                    res.send("No hay amigos agregados");
                } else {
                    res.sendStatus(200);
                }
            }
        });
    });

    //Crea una relacion de amistad
    app.post(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW POST friends");
        var friend = req.body;
        var exist = false;
        if (friend == null) {
            console.log("No data sent -> null request at post or no name's player");
        } else {
            db.find({}, (err, friends) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    for (i = 0; i < friends.length; i++) {
                        if (friend.player == friends[i].player) {
                            res.send("Ya existe un jugador con ese nombre.");
                            exist = true;
                            break;
                        }
                    }
                    if (exist == false) {
                        db.insert(friend);
                        console.log("Friend Inserted:" + JSON.stringify(friend, null, ' '));
                        res.sendStatus(200);
                    }
                }
            });
        }
    });

    //A partir de un nombre de usuario, actualiza su lista de amigos
    app.put(apiBaseURL + '/friends/:id', function (req, res) {
        var player = req.params.id;
        console.log("NEW PUT over " + player);
        db.update({ player: player }, { $addToSet: { friends: req.body } }, (err, numUpdates) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Updated " + numUpdates + " objects");
                res.sendStatus(200);
            }
        })
    });

    //Borrado total
    app.delete(apiBaseURL + '/friends', function (req, res) {
        console.log("NEW DELETE all friends");
        db.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " objects.");
                res.sendStatus(200);
            }
        })
    });

    //Borrado individual
    app.delete(apiBaseURL + '/friends/:id', function (req, res) {
        console.log("NEW DELETE one player");
        db.remove({ player: req.params.id }, {}, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " objects");
                res.sendStatus(200);
            }
        })
    });

    //Borrado individual de amigo
    app.delete(apiBaseURL + '/friends/:id/:friend', function (req, res) {
        console.log("NEW DELETE user's friend");
        db.update({ player: req.params.id }, { $pull: { friends:{player: req.params.friend} } },(err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " objects");
                res.sendStatus(200);
            }
        });
    });
};

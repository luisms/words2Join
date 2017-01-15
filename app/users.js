module.exports = function (app, apiBaseURL, db, passport) {
    app.post(apiBaseURL + '/signup', passport.authenticate('signup'), function (req, res) {
        console.log("Respuesta: " + res);
        res.send(req.user.username);
    });

    app.post(apiBaseURL + '/login', passport.authenticate('login'), function (req, res) {
        res.send(req.user.username);
    });

    app.get(apiBaseURL + '/logout', function (req, res) {
        req.logout();
        res.json({
            status: 'Logout'
        });
        console.log("Logout done");
    });
    //Para obtener Usuario:
    app.get(apiBaseURL + '/users/:user', function (req, res) {
        console.log("GET to obtain user");
        db.find({username:req.params.user}, (err, users) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (users != null && users.length != 0){
                    res.send(users);
                    console.log("Usuario encontrado "+ (users.length != 0).toString());
                }else{
                    res.sendStatus(500);
                    console.log("Nombre de usuario nulo");
                }
            }
        });
    });
};
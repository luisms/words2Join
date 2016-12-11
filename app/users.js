module.exports = function (app, apiBaseURL, db, passport) {
    /*
        app.post('/login', function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) { return next(err); }
                if (!user) { res.json({ value: false }); }
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    return res.json({ value: true });
                });
            })(req, res, next);
        });
    */
    app.post(apiBaseURL + '/login', passport.authenticate('login'), function (req, res) {
        //If this function gets called, authentication was successful
        if(res.status(200)){
            res.send(req.user.username);
        }else{
            res.send("Usuario incorrecto");
        }
        //return res.status(200).send(req.user.username);
    });
};
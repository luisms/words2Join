module.exports = function (app, apiBaseURL, db, passport) {

    app.post(apiBaseURL + '/signup', passport.authenticate('signup'), function (req, res) {
        console.log("Respuesta: " + res);
        res.send(req.user.username);
    });

    app.post(apiBaseURL + '/login', passport.authenticate('login'), function (req, res) {
        res.send(req.user.username);
    });
};
module.exports = function (app, apiBaseURL, db, passport) {

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
};
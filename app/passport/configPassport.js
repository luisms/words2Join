var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, dbUsers) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (_id, done) {
        dbUsers.findOne({ _id: _id }, function (err, user) {
            done(null, user);
        });
    });
    // Login Passport
    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            dbUsers.findOne({ username: username }, function (err, user) {
                if (err) { 
                    return done(err); 
                }if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
};
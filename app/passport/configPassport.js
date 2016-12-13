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
    //Sign up Passport
    passport.use('signup', new LocalStrategy(
        function (username, password, done) {
            process.nextTick(function () {
                dbUsers.find({ username: username }, (err, user) => {
                    if (err) {
                        return done(err);
                    } else {
                        if (user.length > 0) {
                            console.log("Username: " + username + ", user: " + user[0].username);
                            return done(null, false, { message: "There is a user with this username." });
                        } else {
                            dbUsers.insert({ username: username, password: password });
                            console.log("User Inserted:" + JSON.stringify({ username: username, password: password }, null, ' '));
                            dbUsers.findOne({ username: username }, function (err, us) {
                                return done(null, us);
                            });
                        }
                    }
                });

            });

        }));

    // Login Passport
    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            dbUsers.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                } if (!user) {
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
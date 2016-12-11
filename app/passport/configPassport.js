var LocalStrategy = require('passport-local').Strategy;
var Auth0Strategy = require('passport-auth0');

module.exports = function (passport, dbUsers) {
	// Configure Passport to use Auth0
	var strategy = new Auth0Strategy({
		domain:       process.env.AUTH0_DOMAIN,
		clientID:     process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
	  }, function(accessToken, refreshToken, extraParams, profile, done) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	  });

	passport.use(strategy);
	
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
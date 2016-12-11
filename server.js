var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dataStore = require('nedb');
var db = require('./app/initDB');
var app = express();
var apiBaseURL = "/api/v1";
//Passport dependencies
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
// Passport Configuration
app.use(expressSession({
    secret: 'words2join',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var dbUsers = db.initDBUsers(path, dataStore);
var dbIndGame = db.initDBIndGame(path, dataStore);
var dbFriends = db.initDBFriends(path, dataStore);

require('./app/passport/configPassport')(passport, dbUsers);
require('./app/users')(app, apiBaseURL, dbUsers, passport);
require('./app/friends')(app, apiBaseURL, dbFriends);
require('./app/indGame')(app, apiBaseURL, dbIndGame);
require('./app/ranking')(app, apiBaseURL, dbIndGame);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


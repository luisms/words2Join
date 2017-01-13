var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var apiBaseURL = "/api/v1";
var fs = require('fs');
//Init DB
var dataStore = require('nedb');
var db = require('./app/initDB');
//Init Passport
var passport = require('passport');
var session = require('express-session');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

var dbUsers = db.initDBUsers(path, dataStore);
var dbIndGame = db.initDBIndGame(path, dataStore);
var dbFriends = db.initDBFriends(path, dataStore);
var dbDictionary = db.initDBDictionary(path, dataStore, fs);

require('./app/passport/configPassport')(passport, dbUsers);
require('./app/users')(app, apiBaseURL, dbUsers, passport);
require('./app/friends')(app, apiBaseURL, dbFriends);
require('./app/indGame')(app, apiBaseURL, dbIndGame);
require('./app/dictionary')(app, apiBaseURL, dbDictionary);
require('./app/ranking')(app, apiBaseURL, dbIndGame);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
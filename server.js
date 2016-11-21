var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dataStore = require('nedb');
var db = require('./app/initDB');
var app = express();
var apiBaseURL = "/api/v1";

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));

var dbIndGame = db.initDBIndGame(path, dataStore);
var dbFriends = db.initDBFriends(path, dataStore);

require('./app/friends')(app, apiBaseURL, dbFriends);
require('./app/indGame')(app, apiBaseURL, dbIndGame);
require('./app/ranking')(app, apiBaseURL, dbIndGame);
//require('./app/globranking')(app, apiBaseURL);

//Pagina principal
app.get('/', function (req, res) {
    console.log("NEW GET");
    res.send("Landing Page");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


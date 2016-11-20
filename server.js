var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dataStore = express('nedb');
var app = express();


var apiBaseURL = "/api/v1";

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
require("./app/friends")(app, apiBaseURL,path,dataStore);
//Pagina principal
app.get('/', function (req, res) {
    console.log("NEW GET");
    res.send("Landing page");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


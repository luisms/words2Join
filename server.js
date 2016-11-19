var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var apiBaseURL = "/api/v1";

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

require('./app/friends')(app, apiBaseURL);
require('./app/game')(app, apiBaseURL);
require('./app/indranking')(app, apiBaseURL);
require('./app/globranking')(app, apiBaseURL);

//Pagina principal
app.get('/', function (req, res) {
    console.log("NEW GET");
    res.send("Landing Page");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


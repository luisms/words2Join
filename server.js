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
//swagger
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('./app/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);
// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  //controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false //
};



app.set('port', (process.env.PORT || 10000));

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
//swagger
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});

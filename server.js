var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dataStore = require('nedb');
var db = require('./app/initDB');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var dotenv = require('dotenv');
var routes = require('./routes/index');
var user = require('./routes/user');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var apiBaseURL = "/api/v1";
var app = express();
app.use(bodyParser.json());

dotenv.load();
console.log(process.env.AUTH0_DOMAIN);
console.log(process.env.AUTH0_CLIENT_ID);

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'routes')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


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

module.exports = app;


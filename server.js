var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var apiBaseURL = "/api/v1";
//Init DB
var dataStore = require('nedb');
var db = require('./app/initDB');
//Init Passport & Auth0
var passport = require('passport');
var dotenv = require('dotenv');
var routes = require('./routes/index');
var user = require('./routes/user');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

dotenv.load();
console.log(process.env.AUTH0_DOMAIN);
console.log(process.env.AUTH0_CLIENT_ID);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'words2join',
    resave: false,
    saveUninitialized: false
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

var dbUsers = db.initDBUsers(path, dataStore);
var dbIndGame = db.initDBIndGame(path, dataStore);
var dbFriends = db.initDBFriends(path, dataStore);

require('./app/passport/configPassport')(passport, dbUsers);
require('./app/users')(app, apiBaseURL, dbUsers, passport);
require('./app/friends')(app, apiBaseURL, dbFriends);
require('./app/indGame')(app, apiBaseURL, dbIndGame);
require('./app/ranking')(app, apiBaseURL, dbIndGame);

module.exports = app;


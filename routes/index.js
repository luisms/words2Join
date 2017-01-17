var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:10000/callback'
};

router.get('/loginAuth0',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logoutAuth0', function(req, res){
  req.logout();
  res.redirect('/#/home');
});

router.get('/callbackAuth0',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/userAuth0');
  });


module.exports = router;

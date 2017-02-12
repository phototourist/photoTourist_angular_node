var ControllerUsers = require('./users.controller');
var passport = require('passport');

module.exports = function(app) {

   passport.authenticate('facebook');
    app.post('/api/signup',  ControllerUsers.signupUser);
    app.post('/api/login',  ControllerUsers.login);
    //app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    app.get('/auth/facebook', ControllerUsers.singinFacebook);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/successSocial', failureRedirect : '/404'}));
    //app.get('/auth/facebook/callback', ControllerUsers.successFacebook);
    //app.get('/auth/facebook/success', ControllerUsers.successFacebook);
    app.get('/auth/success', function(req, res) {res.send(req.user);});
    //////////////////////////////////////////////////////////////////////////////
    app.get('/auth/twitter',   ControllerUsers.singinTwitter);
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect : '/successSocial', failureRedirect : '/404'}));
    //////////////////////////////////////////////////////////////////////////////
    app.get('/api/loggedin', function(req, res) {
    console.log('Logged in EXPRESS'+JSON.stringify(req.user));
    res.send(req.isAuthenticated() ? req.user : '0');
    });
    /////////////////////////////////////////////////////////////////////////////
    app.get('/api/logout', function (req, res){
    console.log("req.session");
    req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
      });


/*
      app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        console.log('login '+JSON.stringify(req.user));
        console.log('session '+JSON.stringify(req.session));
        res.send(req.user);
      });*/


}

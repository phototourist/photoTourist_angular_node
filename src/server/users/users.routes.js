var ControllerUsers = require('./users.controller');
var passport = require('passport');

module.exports = function(app) {

    passport.authenticate('facebook');
    app.post('/api/signup',  ControllerUsers.signupUser);
    app.post('/api/login',  ControllerUsers.login);
    /////////////////////////////////////////////////////////////////////////////
    app.get('/auth/facebook', ControllerUsers.singinFacebook);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/successSocial', failureRedirect: '/404' }));
    /////////////////////////////////////////////////////////////////////////////
    app.get('/auth/success', function(req, res) { res.send(req.user); });
    //////////////////////////////////////////////////////////////////////////////
    app.get('/auth/twitter', ControllerUsers.singinTwitter);
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/successSocial', failureRedirect: '/404' }));
    //////////////////////////////////////////////////////////////////////////////
    app.get('/api/loggedin', function(req, res) {
      console.log('Logged in EXPRESS'+JSON.stringify(req.user));
      res.send(req.isAuthenticated() ? req.user : '0');
    });
    /////////////////////////////////////////////////////////////////////////////
    app.get('/api/logout', function (req, res){
      req.session.destroy(function (err) {
        res.redirect('/');
      });
    });
    /////////////////////////////////////////////////////////////////////////////
    app.get('/api/getProfile/:email', ControllerUsers.getProfile);
    app.post('/api/submitProfile',  ControllerUsers.submitProfile);
    app.post('/api/saveAvatar', ControllerUsers.saveAvatar);
    app.post('/api/sendChangePassword', ControllerUsers.sendChangePassword);
    app.post('/api/recoveryPassword', ControllerUsers.recoveryPassword);
};

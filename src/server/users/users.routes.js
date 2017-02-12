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

    app.get('/auth/facebook/success', function(req, res) {

            res.json(req.user);

        });
}

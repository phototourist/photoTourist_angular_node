var ControllerUsers = require('./users.controller');
var passport = require('passport');
console.log(ControllerUsers);

module.exports = function(app) {

   passport.authenticate('facebook');
    app.post('/api/signup',  ControllerUsers.signupUser);
    app.post('/api/login',  ControllerUsers.login);
  //app.get('/auth/facebook',  ControllerUsers.singinFacebook);
/*
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
*/
    //app.get('/api/singinFacebook', passport.authenticate('facebook'));

}

/*
module.exports = function(app) {
  app.post('/api/signup', passport.authenticate('local-signup', function(err, user, info) {
          console.log("3" +err);
          console.log("4"+ user);
          console.log("5"+ info);
        }));

};*/

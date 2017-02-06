var ControllerUsers = require('./users.controller');

console.log(ControllerUsers);

module.exports = function(app, passport) {

    app.post('/api/signup',  ControllerUsers.signupUser);
    app.post('/api/login',  ControllerUsers.login);

};


/*
module.exports = function(app) {
  app.post('/api/signup', passport.authenticate('local-signup', function(err, user, info) {
          console.log("3" +err);
          console.log("4"+ user);
          console.log("5"+ info);
        }));

};*/

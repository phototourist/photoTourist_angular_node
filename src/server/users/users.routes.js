

module.exports = function(app, passport) {
  app.post('/api/signup', passport.authenticate('local-signup', function(err, user, info) {
          console.log(err);
          console.log(user);
          console.log(info);
        }));

};

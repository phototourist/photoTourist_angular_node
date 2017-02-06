var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.login = login;

function signupUser(req, res, next) {
  //console.log("lolololo");
  //console.log(req.body);
passport.authenticate('local-signup', function(err, user, info) {
//console.log("err"+err);
//console.log("user"+user);
//console.log("info"+info);
if (err)
  res.send(err)
  console.log("err " +err);
  res.json(info);

  })(req, res, next);
};

function login(req, res, next) {
  console.log("lolololo");
  //console.log(req.body);
passport.authenticate('local-login', function(err, user, info) {
var rows = {rows: user,
inf: info};
//console.log("err"+err);
//console.log("user"+user);
//console.log("info"+info);
if (err)
  res.send(err)
  console.log("err " +err);
  res.json(rows);

  })(req, res, next);
};

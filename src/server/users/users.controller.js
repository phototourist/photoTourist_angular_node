var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.login = login;
module.exports.singinFacebook = singinFacebook;
module.exports.singinTwitter = singinTwitter;

function signupUser(req, res, next) {
  console.log("lolololo");
  console.log(req.body);
passport.authenticate('local-signup', function(err, user, info) {
//console.log("err"+err);
//console.log("user"+user);
//console.log("info"+info);
//console.log("signup");
if (err)
  res.send(err)
  console.log("err " +err);
  res.send(info);

  })(req, res, next);
};


/*
function login(req, res, next) {
  console.log("lolololo");
  //console.log(req.body);
passport.authenticate('local-login', function(err, user, info) {
var rows = {rows: user,
inf: info};
console.log('login '+JSON.stringify(req.user));
console.log('session '+JSON.stringify(req.session));
//console.log("err"+err);
//console.log("user"+user);
//console.log("info"+info);
if (err)
  res.send(err)
  console.log("err " +err);
  res.send(rows);

  })(req, res, next);
};*/


function login(req, res, next) {
  passport.authenticate('local-login', (err, user, info) => {
    var rows = {rows: user,
    inf: info};
    console.log('login '+JSON.stringify(req.user));
    console.log('session '+JSON.stringify(req.session));
    if (err)
      res.send(err)
      console.log("err " +err);
      res.send(rows);
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      //res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};


function singinFacebook(req, res, next) {
  console.log("lolololo");
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })(req, res, next);
};

function singinTwitter(req, res, next) {
  console.log("twitter");
  passport.authenticate('twitter')(req, res, next);
};

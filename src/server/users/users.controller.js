var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.login = login;
module.exports.singinFacebook = singinFacebook;
module.exports.singinTwitter = singinTwitter;

function signupUser(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {

    if (err) {
      res.send(err);
    }
    //console.log("err " +err);
    res.send(info);

  })(req, res, next);
}

function login(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    var rows = {
      rows: user,
      inf: info
    };
    if (err) {
      res.send(err);
    }

    res.send(rows);
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

    });
  })(req, res, next);
}


function singinFacebook(req, res, next) {
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })(req, res, next);
}

function singinTwitter(req, res, next) {
  passport.authenticate('twitter')(req, res, next);
}

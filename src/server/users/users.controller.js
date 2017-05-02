var passport = require('passport');
var Users = require('./users.model');

module.exports.signupUser = signupUser;
module.exports.login = login;
module.exports.singinFacebook = singinFacebook;
module.exports.singinTwitter = singinTwitter;
module.exports.getProfile = getProfile;
module.exports.submitProfile = submitProfile;

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

        //res.send(rows);
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.send(rows);
            console.log('log' + JSON.stringify(req.user));
            console.log('Session ' + JSON.stringify(req.session));

        });
    })(req, res, next);
}


function singinFacebook(req, res, next) {
    passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    })(req, res, next);
}

function singinTwitter(req, res, next) {
    console.log('Estoy en twitter');
    passport.authenticate('twitter')(req, res, next);
}

//Funcion para obtener profile
function getProfile(req, res) {
    Users.getProfile(req.params['email'],
        function(err, profile) {
          console.log('users.controller.getprofile');
            if (err){res.send(err);}
            res.json(profile);
        }
    );
}

//Funcion para actualizar profile
function submitProfile(req, res) {
    Users.submitProfile(req.body,
        function(err, profile) {
            if (err){res.send(err);}
            console.log(profile);
            res.json(profile);
        }
    );
}

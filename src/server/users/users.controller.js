var passport = require('passport');
var Users = require('./users.model');
var multer = require('multer');
var crypto = require('crypto');
module.exports.signupUser = signupUser;
module.exports.login = login;
module.exports.singinFacebook = singinFacebook;
module.exports.singinTwitter = singinTwitter;
module.exports.getProfile = getProfile;
module.exports.submitProfile = submitProfile;
module.exports.saveAvatar = saveAvatar;
module.exports.sendChangePassword = sendChangePassword;
module.exports.recoveryPassword = recoveryPassword;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '/src/client/images/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var uploads = multer({ //multer settings
    storage: storage
}).any();

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
    console.log('login');
    //console.log(req);
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

//Funcion para actualizar profile
function saveAvatar(req, res) {
    uploads(req, res, function (err) {
        if (err) {
            //console.log(err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.send({ error_code: 0, avatar: req.files });
    });
}

function sendChangePassword(req, res) {
  var email = req.body['to'];
  var token = crypto.randomBytes(20).toString('hex');
  var send = require('../utils/email.js');

  Users.changeToken(email, token,
      function (err, callback) {
          if (err) {
              res.send(err);
          }
          if (!callback.messageError)
          {
            send.sendEmail(req, res, token);
          }
          res.json(callback);
      }
  );
}

//Funcion para actualizar password
function recoveryPassword(req, res) {
  console.log(req.body);
    Users.recoveryPassword(req.body,
        function(err, profile) {
            if (err){res.send(err);}
            console.log(profile);
            res.json(profile);
        }
    );
}


exports.getUsersToAdmin = function(req, res) {
    Users.getUsersToAdmin(
        function(err, users) {
            if (err){
                res.send(err);
            }
            console.log(users);
            res.json(users);
        }
    );
};


exports.deleteUserToAdmin = function(req, res) {
    Users.deleteUserToAdmin(req.body,
        function(err, users) {
            if (err){
              res.send(err);
            }
            console.log(users);
            res.json(true);
        }
    );
};

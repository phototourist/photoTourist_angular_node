require('dotenv').load();
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
var mysql = require('./database');
var password = require('../users/utils/password');
var usersModel = require('../users/users.model');
var crypto = require('crypto');


module.exports = function() {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
        if (user) { done(null, user.id); } else done(null, 'undefined');;
        console.log('SERIALIZE USER ' + user.id);
    });
    passport.deserializeUser(function(id, done) {
        if (id != 'undefined') {
            console.log('DESERIALIZE USER ' + id);
            mysql.connection.query('select * from users where id = ' + id, function(err, rows) {
                if (err) { return done(err); }

                // if no user is found, return the message
                if (!rows) { return done(null, null); }
                // all is well, return user
                else {

                    var newUserMysql = {
                        email: rows[0].email,
                        name: rows[0].name,
                        avatar: rows[0].avatar,
                        id: rows[0].id,
                        type: rows[0].tipo
                    }; //= new Object();
                    /*
                                                newUserMysql.email = rows[0].email;
                                                newUserMysql.name = rows[0].name;
                                                newUserMysql.avatar = rows[0].avatar;
                                                newUserMysql.id = rows[0].id;
                    */
                    return done(err, newUserMysql);
                }

            });
        } else done(null, null);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'pass',
            passReqToCallback: true
        },
        function(req, email, pass, done) {
            var pass_ = password.generateHash(pass);

            var token = crypto.randomBytes(20).toString('hex');

            return usersModel.localSignup(email, pass_, token, done);
        }));

    // =========================================================================
    // LOCAL LOGIN ============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'pass',
            passReqToCallback: true
        },
        function(req, email, pass, done) {
            console.log('email' + email);
            if (email) {
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            }
            // asynchronous
            process.nextTick(function() {
                return usersModel.localLogin(email, pass, done);
            });
        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['email', 'locale', 'id', 'displayName', 'name', 'gender', 'photos'],
            passReqToCallback: true
        },
        function(req, token, refreshToken, profile, done) {
            return usersModel.facebookLogin(req, profile, done);
        }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            req.user = profile;
            console.log('TWITTER login ' + JSON.stringify(req.user));

            return usersModel.twitterLogin(req, profile, done);
            //  done(null, profile);
        }));
};

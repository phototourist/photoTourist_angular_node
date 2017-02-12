require('dotenv').load();
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var passport = require('passport');
var mysql = require ('./database');
//var bcrypt   = require('bcrypt-nodejs');
var password = require ('../utils/password');
var usersModel = require ('../users/users.model');
var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta


module.exports = function() {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser( function( user, done ) {
        done( null, user.id );
        console.log('SERIALIZE USER '+ user.id);
    } );
    passport.deserializeUser( function( id, done ) {
        console.log('DESERIALIZE USER ' + id);
        mysql.connection.query("select * from users where id = " + id, function(err, rows){

          if (err)
                done(err);

                // if no user is found, return the message
                if (!rows.length)
                     done(null, null);

                    // all is well, return user
                          else

                          var newUserMysql = new Object();

                          newUserMysql.email = rows[0].email;
                          newUserMysql.name = rows[0].name;
                          newUserMysql.avatar = rows[0].avatar;
                          newUserMysql.id = rows[0].id;

          done(err, newUserMysql);
        });
    } );
/*
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      mysql.connection.query("select * from users where id = " + id, function(err, rows){
        done(err, rows[0]);
      });
          });
*/
    // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'pass',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, email, pass, done) {

    var pass_ = password.generateHash(pass);

    return usersModel.localSignup(email, pass_, done);



/*
    mysql.connection.query("select * from users where email = '"+email+"'",function(err, rows){
      //console.log("req"+ req);
    //  console.log("rows"+ rows);
    //  console.log("aove row object");

        if (err)
          return done(err);
          if(rows.length){
          //  console.log("rows.length"+ rows.length);
            return done(null, false, false);
          }else {
            //create the user
            var newUserMysql = new Object();

            newUserMysql.email = email;
            newUserMysql.password = pass_;

            var insertQuery = "INSERT INTO users (email, pass) values ('"+ email +"','"+pass_+"')";
            console.log("insertQuery"+ insertQuery);
            mysql.connection.query(insertQuery,function(err,rows){
              newUserMysql.id = rows.insertId;

              return done(null, newUserMysql, true);
            });
          }
        });*/
  }));

  // =========================================================================
// LOCAL LOGIN ============================================================
// =========================================================================

  passport.use('local-login', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField : 'email',
          passwordField : 'pass',
          passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, email, pass, done) {
        console.log("email " +email);
          if (email)
              email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

          // asynchronous
          process.nextTick(function() {

            return usersModel.localLogin(email, pass, done);

                /*mysql.connection.query("select * from users where email = '"+email+"'",function(err, rows){

                  if (err)
                        return done(err);

                        // if no user is found, return the message
                        if (!rows.length)
                            return done(null, false, "Usuario no encontrado");

                            if (!password.validPassword(pass, rows[0].pass))
                                return done(null, false, "El password utilizado no es valido");

                                  // all is well, return user
                                  else
                                  return done(null, rows, "Bienvenido a PhotoTourist");

              });*/
          });
      }));

          // =========================================================================
          // FACEBOOK ================================================================
          // =========================================================================
        /*  passport.use( new FacebookStrategy({
              clientID        : process.env.FACEBOOK_CLIENT_ID,
              clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
              callbackURL: '/api/facebook/callback',
              passReqToCallback : true
                        },
          function(req, token, refreshToken, profile, done) {

            return done("err");

            console.log('next');
              // asynchronous
            /*  process.nextTick(function() {
                  // check if the user is already logged in
            });*/
        //  }));
        passport.use(new FacebookStrategy({
          clientID        : process.env.FACEBOOK_CLIENT_ID,
          clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
          callbackURL     : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'locale','id', 'displayName', 'name', 'gender','photos'],
          passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, refreshToken, profile, done) {


        return usersModel.facebookLogin(req, profile, done);


        /*
        req.user = profile;

        console.log(req.user.id);
        console.log(req.user.emails[0].value);
        console.log(req.user.name.givenName);
        console.log(req.user.displayName);
        console.log(req.user.photos[0].value);
        console.log(req.user.gender);

        mysql.connection.query("select * from users where email = '"+req.user.emails[0].value+"'",function(err, rows){

            if (err)
              return done(err);
              if(rows.length){
              //  console.log("rows.length"+ rows.length);

              var newUserMysql = new Object();

              newUserMysql.email = rows[0].email;
              newUserMysql.id_facebook = rows[0].id_facebook;
              newUserMysql.name = rows[0].name;
              newUserMysql.displayName = rows[0].displayName;
              newUserMysql.avatar = rows[0].avatar;
              newUserMysql.id = rows[0].id;
              console.log(rows[0].email);

                return done(null, newUserMysql, "Bienvenido a PhotoTourist");
              }else {

                var newUserMysql = new Object();

                newUserMysql.email = req.user.emails[0].value;
                newUserMysql.id_facebook = req.user.id;
                newUserMysql.name = req.user.name.givenName;
                newUserMysql.displayName = req.user.displayName;
                newUserMysql.avatar = req.user.photos[0].value;

                var insertQuery = "INSERT INTO users (name, email, avatar, id_facebook) values ('"+ req.user.name.givenName +"','"+req.user.emails[0].value+"', '"+req.user.photos[0].value+"','"+req.user.id+"')";
                //console.log("insertQuery"+ insertQuery);
                mysql.connection.query(insertQuery,function(err,rows){
                    newUserMysql.id = rows.insertId;

                  return done(null, newUserMysql, true);
                });
              }
            });*/



        //return done( null, profile);

      }));



          // =========================================================================
              // TWITTER =================================================================
              // =========================================================================
              passport.use(new TwitterStrategy({
                consumerKey:  process.env.TWITTER_CLIENT_ID,
                consumerSecret:  process.env.TWITTER_CLIENT_SECRET,
                  callbackURL:  process.env.TWITTER_CALLBACK_URL,
                  passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
              },
              function(req, token, tokenSecret, profile, done) {
                req.user = profile;
              console.log('TWITTER login '+JSON.stringify(req.user));

              return usersModel.twitterLogin(req, profile, done);
                //  done(null, profile);


              }));


}

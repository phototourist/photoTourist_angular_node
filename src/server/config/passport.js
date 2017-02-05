var LocalStrategy    = require('passport-local').Strategy;
var passport = require('passport');
var mysql = require ('./database');
//var bcrypt   = require('bcrypt-nodejs');
var password = require ('../utils/password');

module.exports = function() {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

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
        });
  }));

}

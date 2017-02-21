  var mysql = require('../config/database');
  var password = require('./utils/password');
  //console.log(mysql);

  //console.log(connection);
  var usersModel = {};

  usersModel.localSignup = function(email, pass_, callback) {
    console.log('mysql');
    if (mysql.connection) {
      mysql.connection.query("select * from users where email = '" + email + "'", function(err, rows) {
        //console.log("req"+ req);
        //  console.log("rows"+ rows);
        //  console.log("aove row object");
        if (err) {
          callback(err);
        }
        if (rows.length) {
          //  console.log("rows.length"+ rows.length);
          callback(null, false, false);
        } else {
          //create the user
          var newUserMysql = {}; //= new Object();

          newUserMysql.email = email;
          newUserMysql.password = pass_;

          var insertQuery = "INSERT INTO users (email, pass) values ('" + email + "','" + pass_ + "')";
          mysql.connection.query(insertQuery, function(err, rows) {
            newUserMysql.id = rows.insertId;

            callback(null, newUserMysql, true);
          });
        }
      });
    }
  };


  usersModel.localLogin = function(email, pass, callback) {
    if (mysql.connection) {
      mysql.connection.query("select * from users where email = '" + email + "'", function(err, rows) {

        if (err) {
          return callback(err);
        }

        // if no user is found, return the message
        if (!rows.length) {
          return callback(null, false, 'Usuario no encontrado');
        }
        if (!password.validPassword(pass, rows[0].pass)) {
          return callback(null, false, 'El password utilizado no es valido');
        }
        // all is well, return user
        else {

          var newUserMysql = {}; //= new Object();

          newUserMysql.email = rows[0].email;
          newUserMysql.name = rows[0].name;
          newUserMysql.avatar = rows[0].avatar;
          newUserMysql.id = rows[0].id;

          return callback(null, newUserMysql, 'Bienvenido a PhotoTourist');
        }
      });
    }
  };

  usersModel.facebookLogin = function(req, profile, done) {
    req.user = profile;
    var newUserMysql = {}; // new Object();
    console.log(req.user.id);
    console.log(req.user.emails[0].value);
    console.log(req.user.name.givenName);
    console.log(req.user.displayName);
    console.log(req.user.photos[0].value);
    console.log(req.user.gender);

    mysql.connection.query("select * from users where email = '" + req.user.emails[0].value + "'", function(err, rows) {

      if (err) {
        return done(err);
      }

      if (rows.length) {
        //  console.log("rows.length"+ rows.length);



        newUserMysql.email = rows[0].email;
        newUserMysql.idFacebook = rows[0].idFacebook;
        newUserMysql.name = rows[0].name;
        newUserMysql.user = rows[0].user;
        newUserMysql.avatar = rows[0].avatar;
        newUserMysql.id = rows[0].id;
        console.log(rows[0].email);

        return done(null, newUserMysql, 'Bienvenido a PhotoTourist');
      } else {
        //var newUserMysql = new Object();

        newUserMysql.email = req.user.emails[0].value;
        newUserMysql.idFacebook = req.user.id;
        newUserMysql.name = req.user.name.givenName;
        newUserMysql.displayName = req.user.displayName;
        newUserMysql.avatar = req.user.photos[0].value;

        var insertQuery = "INSERT INTO users (name, email, avatar, id_facebook) values ('" + req.user.name.givenName + "','" + req.user.emails[0].value + "', '" + req.user.photos[0].value + "','" + req.user.id + "')";
        //console.log("insertQuery"+ insertQuery);
        mysql.connection.query(insertQuery, function(err, rows) {
          newUserMysql.id = rows.insertId;

          return done(null, newUserMysql, true);

        });
      }
    });

  };

  usersModel.twitterLogin = function(req, profile, done) {
    req.user = profile;
    var newUserMysql = {}; //new Object();

    console.log(req.user.id);
    console.log(req.user.username);
    //console.log(req.user.name.givenName);
    console.log(req.user.displayName);
    console.log(req.user.photos[0].value);
    //console.log(req.user.gender);

    mysql.connection.query("select * from users where user = '" + req.user.username + "'", function(err, rows) {

      if (err) {
        return done(err);
      }
      if (rows.length) {

        newUserMysql.email = rows[0].email;
        newUserMysql.name = rows[0].name;
        newUserMysql.displayName = rows[0].displayName;
        newUserMysql.avatar = rows[0].avatar;
        newUserMysql.id = rows[0].id;
        console.log(rows[0].email);

        return done(null, newUserMysql, 'Bienvenido a PhotoTourist');
      } else {

        //var newUserMysql = new Object();

        newUserMysql.name = req.user.displayName;
        newUserMysql.avatar = req.user.photos[0].value;
        newUserMysql.user = req.user.username;

        var insertQuery = 'INSERT INTO users (name, user, avatar ) values (' + req.user.displayName + ',' + req.user.username + ', ' + req.user.photos[0].value + ')';
        //console.log("insertQuery"+ insertQuery);
        mysql.connection.query(insertQuery, function(err, rows) {
          //newUserMysql.id = rows.insertId;
console.log(rows[0].id);
          return done(null, newUserMysql, true);

        });
      }
    });

  };

  module.exports = usersModel;

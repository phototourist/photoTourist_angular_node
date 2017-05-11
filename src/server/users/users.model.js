  var mysql = require('../config/database');
  var password = require('./utils/password');
  //console.log(mysql);

  //console.log(connection);
  var usersModel = {};

  usersModel.localSignup = function(email, pass_, token, callback) {
      console.log('mysql');
      if (mysql.connection) {
          mysql.connection.query('SELECT * FROM users WHERE email = "' + email + '"', function(err, rows) {
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
                  newUserMysql.token = token;

                  var insertQuery = 'INSERT INTO users (email, pass, token, tipo, avatar) values ("' + email + '","' + pass_ + '","' + token + '", "cliente", "default.png")';
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
          mysql.connection.query('SELECT * FROM users WHERE email = "' + email + '"', function(err, rows) {

              if (err) {
                  return callback(err);
              }

              // if no user is found, return the message
              if (!rows.length) {
                  return callback(null, false, 'Usuario no encontrado');
              }
              if (!password.validPassword(pass, rows[0].pass)) {
                  console.log('ddddddd');
                  return callback(null, false, 'El password utilizado no es valido');
              }
              // all is well, return users
              else {

                  var newUserMysql = {}; //= new Object();

                  newUserMysql.email = rows[0].email;
                  newUserMysql.name = rows[0].name;
                  newUserMysql.avatar = rows[0].avatar;
                  newUserMysql.id = rows[0].id;
                  newUserMysql.type = rows[0].tipo

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

      mysql.connection.query('SELECT * FROM users WHERE email = "' +
          req.user.emails[0].value + '"',

          function(err, rows) {
              if (err) {
                  return done(err);
              }

              if (rows.length) {
                  //  console.log("rows.length"+ rows.length);

                  newUserMysql.email = rows[0].email;
                  newUserMysql.idFacebook = rows[0].id_facebook;
                  newUserMysql.name = rows[0].name;
                  newUserMysql.user = rows[0].user;
                  newUserMysql.avatar = rows[0].avatar;
                  newUserMysql.id = rows[0].id;
                  newUserMysql.type = rows[0].tipo;

                  console.log(newUserMysql);

                  if (newUserMysql.idFacebook == undefined || newUserMysql.idFacebook == null ||
                    newUserMysql.idFacebook.length == 0 || newUserMysql.idFacebook == '0'){
                      var updateIdFacebookQuery = 'UPDATE users SET id_facebook = "' +
                          req.user.id + '" WHERE email = "' + newUserMysql.email + '"';

                      mysql.connection.query(updateIdFacebookQuery, function(err, rows) {
                          newUserMysql.idFacebook = req.user.id;
                          return done(null, newUserMysql, 'Bienvenido a PhotoTourist');
                      });
                  }

                  return done(null, newUserMysql, 'Bienvenido a PhotoTourist');
              } else {
                  newUserMysql.email = req.user.emails[0].value;
                  newUserMysql.idFacebook = req.user.id;
                  newUserMysql.name = req.user.name.givenName;
                  newUserMysql.displayName = req.user.displayName;
                  newUserMysql.avatar = req.user.photos[0].value;
                  newUserMysql.type = 'cliente';

                  console.log(newUserMysql.displayName);

          var insertQuery = 'INSERT INTO users (name, email, avatar, id_facebook, tipo) VALUES ("' +
                      req.user.name.givenName + '","' + req.user.emails[0].value + '", "' +
                      req.user.photos[0].value + 'default.png","' + req.user.id + '", "cliente")';
                  //console.log("insertQuery"+ insertQuery);
                  mysql.connection.query(insertQuery, function(err, rows) {
                      newUserMysql.id = rows.insertId;
                      //console.log(newUserMysql);
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

      mysql.connection.query('SELECT * FROM users WHERE user = "' + req.user.username + '"', function(err, rows) {

          if (err) {
              return done(err);
          }
          if (rows.length) {
              console.log('estoy en el if');
              newUserMysql.email = rows[0].email;
              newUserMysql.name = rows[0].name;
              newUserMysql.displayName = rows[0].displayName;
              newUserMysql.avatar = rows[0].avatar;
              newUserMysql.id = rows[0].id;
              newUserMysql.type = rows[0].tipo;

              return done(null, newUserMysql, 'Bienvenido a PhotoTourist');
          } else {
              newUserMysql.name = req.user.displayName;
              newUserMysql.avatar = req.user.photos[0].value;
              newUserMysql.user = req.user.username;
              newUserMysql.type = 'cliente';


              var insertQuery = 'INSERT INTO users (name, user, avatar, tipo) values ("' +
                  req.user.displayName + '","' + req.user.username + '","' + req.user.photos[0].value + '","default.png", "cliente")';
              //console.log('insertQuery' + insertQuery);
              mysql.connection.query(insertQuery, function(err, rows) {
                  newUserMysql.id = rows.insertId;
                  console.log('twitter ' + rows.insertId);
                  return done(null, newUserMysql, true);

              });
          }
      });

  };
  //Obtenemos el profile
  usersModel.getProfile = function(email,callback){
      if (mysql.connection) {
          var sql = 'SELECT * FROM users WHERE email = "' + email + '"';
          console.log('getProfile');
          mysql.connection.query(sql, function(error, row) {
              if(error){
                  throw error;
              }else{
                  callback(null, row);
              }
          });
      }
  };

  //Actualizamos el profile
  usersModel.submitProfile = function(data,callback){
      if (mysql.connection) {
        var updateUserMysql = {}; //= new Object();

        updateUserMysql.name = data.name;
        updateUserMysql.surname = data.surname;
        updateUserMysql.address = data.address;
        updateUserMysql.cp = data.cp;
        updateUserMysql.email = data.email;
        updateUserMysql.avatar = data.avatar;

        var changes = 'name = "' + data.name + '", ';
        changes += 'last_name = "' + data.surname + '", ';
        changes += 'address = "' + data.address + '", ';
        changes += 'cp = "' + data.cp + '", ';
        changes += 'avatar = "' + data.avatar + '"';

        var updateQuery = 'UPDATE users SET ' + changes + ' WHERE email = "' + data.email + '"';

        mysql.connection.query(updateQuery, function(err, rows) {
            callback(null, updateUserMysql, true);
        });
      }
  };

  usersModel.changeToken = function (email, token, callback) {
      if (mysql.connection) {
          var sql = 'UPDATE users SET token = "' + token + '" WHERE email = "' + email + '"';

          mysql.connection.query(sql, function (err, rows) {
              if (err) { throw err; }
              else {
                  console.log(rows);
                  callback(null, rows);
              }
          });
      }
  };

  //Actualizamos password
  usersModel.recoveryPassword = function(data,callback){
    console.log(data.pass);
      if (mysql.connection) {
        var updateUserMysql = {};

        var cryptoPass = password.generateHash(data.pass);
        console.log(cryptoPass);

        var updateQuery = 'UPDATE users SET pass = "' + cryptoPass + '" WHERE token = "' + data.token + '"';

        mysql.connection.query(updateQuery, function(err, rows) {
            callback(null, 'Su contraseña se ha cambiado correctamente');
        });
      }
  };

  module.exports = usersModel;

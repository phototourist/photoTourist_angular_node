var mysql = require ('../config/database');
var password = require ('../utils/password');
//console.log(mysql);

//console.log(connection);
var usersModel = {};

usersModel.localSignup = function(email, pass_, callback){
  console.log('mysql');
    if (mysql.connection) {
      mysql.connection.query("select * from users where email = '"+email+"'",function(err, rows){
        //console.log("req"+ req);
      //  console.log("rows"+ rows);
      //  console.log("aove row object");
          if (err)
            callback(err);
            if(rows.length){
            //  console.log("rows.length"+ rows.length);
              callback(null, false, false);
            }else {
              //create the user
              var newUserMysql = new Object();

              newUserMysql.email = email;
              newUserMysql.password = pass_;

              var insertQuery = "INSERT INTO users (email, pass) values ('"+ email +"','"+pass_+"')";
              console.log("insertQuery"+ insertQuery);
              mysql.connection.query(insertQuery,function(err,rows){
                newUserMysql.id = rows.insertId;

                callback(null, newUserMysql, true);
              });
            }
          });
    }
}


usersModel.localLogin = function(email, pass, callback){
console.log("local");
  if (mysql.connection) {
    mysql.connection.query("select * from users where email = '"+email+"'",function(err, rows){

      if (err)
            return callback(err);

            // if no user is found, return the message
            if (!rows.length)
                return callback(null, false, "Usuario no encontrado");

                if (!password.validPassword(pass, rows[0].pass))
                    return callback(null, false, "El password utilizado no es valido");

                      // all is well, return user
                      else
                      return callback(null, rows, "Bienvenido a PhotoTourist");

  });
      };
  }







module.exports = usersModel;

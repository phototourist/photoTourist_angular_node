var mysql = require('../config/database');
var InsertQuery = require('mysql-insert-multiple');
   
//console.log(mysql);

var camtouristUpload = {};

camtouristUpload.insertPhotos = function (email, fotosPath, callback) {

   

    if (mysql.connection) {

        var sql = "INSERT INTO photos (email, path, token) VALUES ?";

        mysql.connection.query(sql, [fotosPath], function (err, rows) {
            if (err) { throw err; }
            else {                 
                console.log(rows);                
                mysql.connection.query('select token from photos where email = "' + email + '"', function (err, rows) {

                    callback(null, rows);
                });
            }
        });        
        
    }
};

module.exports = camtouristUpload;

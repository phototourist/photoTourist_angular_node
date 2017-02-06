
var mysql = require ('../config/database');
//console.log(mysql);

var camtouristModel = {};

camtouristModel.getCamtouristTotals = function(callback){
    if (mysql.connection) {
        mysql.connection.query('SELECT * FROM camtourist ORDER BY id', function(error, rows) {
            if(error){
                throw error;
            }else{
              console.log(rows);
                callback(null, rows);
            }
        });
    }
}

camtouristModel.getCamtouristCities = function(callback){
    if (mysql.connection) {
        mysql.connection.query('SELECT DISTINCT ciudad FROM camtourist ORDER BY ciudad', function(error, rows) {
            if(error){
                throw error;
            }else{
              console.log(rows);
                callback(null, rows);
            }
        });
    }
}

camtouristModel.getCamtouristEspecifico = function(data,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM camtourist WHERE ciudad = "' + data.camtourist_id + '"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
}
module.exports = camtouristModel;

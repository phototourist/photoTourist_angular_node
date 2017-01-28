var mysql = require ('../config.db');
console.log("TRTRTTRT");

var camtouristModel = {};

camtouristModel.getCamtouristTotals = function(callback){
    console.log("DINS TOTALS");
    if (mysql.connection) {
        mysql.connection.query('SELECT * FROM camtourist ORDER BY id', function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(null, rows);

            }
        });
    }
}

camtouristModel.getCamtouristEspecifico = function(id,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM camtourist WHERE id = ' + mysql.connection.escape(id);
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

var mysql = require('mysql');

var connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: 'photoTouristBD'
    }
);

module.exports.connection = connection;

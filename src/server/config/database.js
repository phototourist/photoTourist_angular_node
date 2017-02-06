var mysql = require('mysql');

var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'jorge',
        password: '',
        database: 'photoTouristBD'
    }
);

module.exports.connection = connection;

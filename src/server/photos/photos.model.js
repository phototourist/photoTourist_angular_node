  var mysql = require('../config/database');

  var photosModel = {};

  photosModel.getPhotos = function(data, callback) {

      if (mysql.connection) {

          mysql.connection.query('SELECT Path FROM photos where Email = "' + data.body.email + '"', function(error, rows) {
              if (error) {
                  throw error;
              } else {
                  callback(null, rows);
              }
          });
      }
  };

  photosModel.getPhotosByCamtourist = function(data, callback) {

      if (mysql.connection) {
          mysql.connection.query('SELECT email, Path FROM photos where Email in (select email from photos where token = "' + data.body.token + '")', function(error, rows) {
              if (error) {
                  throw error;
              } else {
                  callback(null, rows);
              }
          });
      }

  };
  module.exports = photosModel;
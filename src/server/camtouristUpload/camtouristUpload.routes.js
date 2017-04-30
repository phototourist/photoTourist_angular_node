var camtouristUpload = require('./camtouristUpload.controller');
console.log('camtouristUpload');

module.exports = function(app) {
    
    /** API path that will upload the files */
    app.post('/api/uploadCamtourist', camtouristUpload.upload); 
    app.post('/api/guardarFotosUsuario', camtouristUpload.guardarFotosUsuario);

};

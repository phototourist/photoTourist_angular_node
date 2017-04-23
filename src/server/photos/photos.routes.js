var ControllerPhotos = require('./photos.controller');

module.exports = function(app) {        
   
    app.post('/api/getPhotos', ControllerPhotos.getPhotos);   

};

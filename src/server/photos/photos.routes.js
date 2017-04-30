var ControllerPhotos = require('./photos.controller');

module.exports = function(app) {        
   
    app.post('/api/getPhotos', ControllerPhotos.getPhotos);   
    app.post('/api/getPhotosByCamtourist', ControllerPhotos.getPhotosByCamtourist);    
    
};

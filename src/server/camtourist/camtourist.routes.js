var ControllerCamtourist = require('./camtourist.controller');
<<<<<<< HEAD
console.log(ControllerCamtourist);

module.exports = function(app) {
  app.get('/api/camtourist',  ControllerCamtourist.getCamtouristTotals); //ControllerCamtourist.getCamtouristTotals
  app.get('/api/camtouristCities',  ControllerCamtourist.getCamtouristCities);
  app.get('/api/camtourist/:camtourist_id', ControllerCamtourist.getCamtouristEspecifico);
=======
//console.log(ControllerCamtourist);

module.exports = function(app) {
  app.get('/api/camtourist',  ControllerCamtourist.getCamtouristTotals); //ControllerCamtourist.getCamtouristTotals

  //app.get('/api/camtourist/:camtourist_id', ControllerCamtourist.getCamtouristEspecifico);
>>>>>>> 3a120d6cbedcfd56abed91af16f939fcf2d8e814
};

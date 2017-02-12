var ControllerCamtourist = require('./camtourist.controller');
console.log(ControllerCamtourist);

module.exports = function(app) {
  app.get('/api/camtourist',  ControllerCamtourist.getCamtouristTotals); //ControllerCamtourist.getCamtouristTotals
  app.get('/api/camtouristCities',  ControllerCamtourist.getCamtouristCities);
  app.get('/api/camtourist/:camtouristId', ControllerCamtourist.getCamtouristEspecifico);
};

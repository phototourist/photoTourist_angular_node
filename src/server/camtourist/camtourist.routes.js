var ControllerCamtourist = require('./camtourist.controller');
console.log('rOUTASSSSS');
module.exports = function(app) {
  app.get('/api/camtourist/', ControllerCamtourist.getCamtouristTotals);

  app.get('/api/camtourist/:camtourist_id', ControllerCamtourist.getCamtouristEspecifico);
};

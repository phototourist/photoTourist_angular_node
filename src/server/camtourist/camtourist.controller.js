var Camtourist = require('./camtourist.model');

exports.getCamtouristTotals = function(req, res) {
  Camtourist.getCamtouristTotals(
    function(err, camtourist) {
      if (err)
        res.send(err)
        console.log(camtourist);
      res.json(camtourist);
    }
  );
}


exports.getCamtouristEspecifico = function(req, res) {
  Camtourist.getCamtouristEspecifico(req.param.camtourist_id,
    function(err, camtourist) {
      if (err)
        res.send(err)
        console.log(camtourist);
      res.json(camtourist);
    }
  );
}

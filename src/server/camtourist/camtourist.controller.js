var Camtourist = require('./camtourist.model.js');

exports.getCamtouristTotals = function(req, res) {
  Camtourist.getCamtouristTotals(
    function(err, data) {
      if (err)
        res.send(err)
console.log(data);
      res.json(200, data);
    }
  );
}

exports.getCamtouristEspecifico = function(req, res) {
  Camtourist.getCamtouristEspecifico(req.param.camtourist_id,
    function(err, data) {
      if (err)
        res.send(err)

      res.json(200, data);
    }
  );
}

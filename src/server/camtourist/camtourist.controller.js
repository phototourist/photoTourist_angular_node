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
//Funcion para recoger todos los marcadores
exports.getCamtouristCities = function(req, res) {
    Camtourist.getCamtouristCities(
        function(err, camtourist) {
            if (err)
                res.send(err)
            res.json(camtourist);
        }
    );
}

//Funcion para recoger marcador especifico según ciudad
exports.getCamtouristEspecifico = function(req, res) {
    Camtourist.getCamtouristEspecifico(req.params,
        function(err, camtourist) {
            if (err)
                res.send(err)

            console.log(camtourist);
            res.json(camtourist);
        }
    );
}

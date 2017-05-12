var camtouristUpload = require('./camtouristUpload.model');
var crypto = require('crypto');
var multer = require('multer');
var im = require('imagemagick');
var watermark = require('image-watermark');

module.exports.upload = upload;
module.exports.guardarFotosUsuario = guardarFotosUsuario;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, 'src/server/media/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var uploads = multer({ //multer settings
    storage: storage
}).any();


function upload(req, res, next) {

    uploads(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({ error_code: 1, err_desc: err });
            return;
        }

        //resize(req.files, function (err, callback) {         
        //    if (err) res.json({ error_code: 1, err_desc: err });

        //    res.send({ callback });
        //});
        console.log('resize');
        // resize(req.files);
        res.send({ error_code: 0, fotos: req.files });

    })

}

function guardarFotosUsuario(req, res, next) {
    console.log('guardar');;
    var fotosPath = [];
    var email = req.body.to;
    var token = crypto.randomBytes(20).toString('hex');
    var send = require('../utils/email.js');

    for (var i = 0; i < req.body.fotos.length; i++) {
        fotosPath.push([email, 'src/server/resize/' + req.body.fotos[i].filename, token]);
    }
    console.log(fotosPath);
    camtouristUpload.insertPhotos(email, fotosPath,
        function(err, callback) {
            if (err) { res.send(err); }

            console.log(callback[0].token);
            send.sendEmail(req, res, callback[0].token);
        }
    );



}


function resize(files, callback) {
    console.log('dentro resize');
    for (var i = 0; i < files.length; i++) {

        var options = {
            'text': 'PhotoTourist CopyRight',
            'dstPath': 'src/server/resize/' + files[i].filename,
            'resize': '30%',
            'color': ' #285416'
        };

        watermark.embedWatermarkWithCb(files[i].path, options, function(err) {
            console.log(err);
            if (!err) {
                console.log('Succefully embeded watermark');

            }
        });

    }

}
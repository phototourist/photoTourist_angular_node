var Photos = require('./photos.model');

module.exports.getPhotos = getPhotos;
module.exports.getPhotosByCamtourist = getPhotosByCamtourist;
//module.exports.singinFacebook = singinFacebook;
//module.exports.singinTwitter = singinTwitter;

function getPhotos(req, res, next) {

    Photos.getPhotos(req, function(err, photos) {
        if (err) {
            res.send(err);
        }
        res.json(photos);
    });

}

function getPhotosByCamtourist(req, res, next) {

    Photos.getPhotosByCamtourist(req, function(err, photos) {
        if (err) {
            res.send(err);
        }
        res.json(photos);
    });

}
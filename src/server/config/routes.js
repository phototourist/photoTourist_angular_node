module.exports.routes = function (app,passport) {

//importo routers de cada modulo
require('../camtourist/camtourist.routes')(app);
require('../contact/contact.routes')(app);
require('../users/users.routes')(app);
require('../photos/photos.routes')(app);
require('../camtouristUpload/camtouristUpload.routes')(app);


};

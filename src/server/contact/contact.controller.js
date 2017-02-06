var email = require('../utils/email.js');

exports.sendContactEmail = function (req, res) {

    email.sendEmail(req, res);

};

var bcrypt = require('bcrypt-nodejs');

module.exports.generateHash = generateHash;
module.exports.validPassword = validPassword;

function generateHash(pass) {

    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);

}


function validPassword(pass, password) {

    if (password == null) {
        console.log("password " + password);
        return false;
    } else {
        return bcrypt.compareSync(pass, password);
    }

}
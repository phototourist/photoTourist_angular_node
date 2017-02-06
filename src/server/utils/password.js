var bcrypt   = require('bcrypt-nodejs');

module.exports.generateHash = generateHash;
module.exports.validPassword = validPassword;

function generateHash(pass){

return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);

};


function validPassword(pass, password){

return bcrypt.compareSync(pass, password);

};

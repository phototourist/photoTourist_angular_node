var bcrypt   = require('bcrypt-nodejs');

module.exports.generateHash = generateHash;
module.exports.validPassword = validPassword;

function generateHash(pass){

return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);

};


function validPassword(pass){

return bcrypt.compareSync(password, this.local.password);

};

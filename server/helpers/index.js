const bcrypt = require('bcrypt');

function hashPassword(password) {
    let saltRounds = 8
    return bcrypt.hashSync(password, saltRounds )
}

function checkHash(inputPassword, hashPassword) {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

module.exports =
 {
    hashPassword , 
    checkHash
}
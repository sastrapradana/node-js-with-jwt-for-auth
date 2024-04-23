const crypto = require('crypto');


const getSecretKey = () => {
    return crypto.randomBytes(32).toString('hex')
}

module.exports = {
    getSecretKey
}
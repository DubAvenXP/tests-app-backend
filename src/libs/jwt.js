const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = (id = '', expiresIn = '8h') => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, config.jwt.secret, { expiresIn }, (err, token) => {
            if (err) {
                console.error(err);
                reject('The token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJWT,
};
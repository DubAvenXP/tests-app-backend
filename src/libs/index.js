const jwt = require('./jwt');
const google = require('./google');
const facebook = require('./facebook');
const nodemailer = require('./nodemailer');
const sequelize = require('./sequelize');
module.exports = {
    ...jwt,
    ...google,
    ...facebook,
    nodemailer,
    sequelize,
};
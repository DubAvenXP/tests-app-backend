const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: true,
    auth: {
        user: config.email.user,
        pass: config.email.password
    }
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
});

module.exports = transporter;
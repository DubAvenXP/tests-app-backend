const { OAuth2Client } = require('google-auth-library');

const { google } = require('../config');

const clientId = google.clientID;
const client = new OAuth2Client(clientId);

const googleVerify = async (idToken = '') => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
    });
    const { name, picture, email } = ticket.getPayload();
    return { name, picture, email };
};

module.exports = {
    googleVerify
};
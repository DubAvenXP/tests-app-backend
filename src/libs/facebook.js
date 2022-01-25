const axios = require('axios').default;
const {facebook} = require('../config');


const facebookVerify = async (access_token) => {

    try {
        const response = await axios.get('https://graph.facebook.com/oauth/access_token', {
            params: {
                client_id: facebook.clientID,
                client_secret: facebook.clientSecret,
                grant_type: 'client_credentials'
            }
        });

        const validateToken = await axios.get('https://graph.facebook.com/debug_token', {
            params: {
                input_token: access_token,
                access_token: response.data.access_token,
            }
        });

        return validateToken.data.data;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    facebookVerify
};
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

console.log('Running on ' + process.env.NODE_ENV + ' mode');

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    postgres: {
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASS,
        host: process.env.POSTGRES_DB_HOST,
        name: process.env.POSTGRES_DB_NAME,
        port: process.env.POSTGRES_DB_PORT,
    },
    mongo: {
        user: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASS,
        host: process.env.MONGO_DB_HOST,
        name: process.env.MONGO_DB_NAME,
        port: process.env.MONGO_DB_PORT,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        clientAndroidId: process.env.GOOGLE_CLIENT_ANDROID_ID,
    },
    facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
};

module.exports = config;
const config = require('../../config');

const user = encodeURIComponent(config.postgres.user);
const password = encodeURIComponent(config.postgres.password);
const URI = `postgres://${user}:${password}@${config.postgres.host}:${config.postgres.port}/${config.postgres.name}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    staging: {
        url: URI,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    production: {
        url: URI,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
};
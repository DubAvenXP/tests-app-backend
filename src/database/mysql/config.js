const config = require('../../config');

const user = encodeURIComponent(config.mysql.user);
const password = encodeURIComponent(config.mysql.password);
const URI = `mysql://${user}:${password}@${config.mysql.host}:${config.mysql.port}/${config.mysql.name}`;
console.log(URI);
module.exports = {
    development: {
        url: URI,
        dialect: 'mysql',
    },
    staging: {
        url: URI,
        dialect: 'mysql',
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
        dialect: 'mysql',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
};
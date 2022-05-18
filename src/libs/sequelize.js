const { Sequelize } = require('sequelize');

// const { config } = require('../config');
const { mysql, env } = require('../config');
const setupModels = require('../database/mysql/models/setupModels');

const user = encodeURIComponent(mysql.user);
const password = encodeURIComponent(mysql.password);
const URI = `mysql://${user}:${password}@${mysql.host}:${mysql.port}/${mysql.name}`;

let sequelize;

if (env !== 'development') {
  sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });
} else {
  sequelize = new Sequelize(URI, {
    dialect: 'mysql',
  });
}

setupModels(sequelize);

module.exports = sequelize;
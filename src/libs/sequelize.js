const { Sequelize } = require('sequelize');

// const { config } = require('../config');
const { postgres, env } = require('../config');
const setupModels = require('../database/postgres/models/setupModels');

const user = encodeURIComponent(postgres.user);
const password = encodeURIComponent(postgres.password);
const URI = `postgres://${user}:${password}@${postgres.host}:${postgres.port}/${postgres.name}`;

let sequelize;

if (env !== 'development') {
  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: '-6:00'
  });
} else {
  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    timezone: '-6:00'
  });
}

setupModels(sequelize);

module.exports = sequelize;
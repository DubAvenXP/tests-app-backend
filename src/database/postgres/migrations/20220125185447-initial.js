'use strict';
const {
  UserSchema, USER_TABLE,
  RoleSchema, ROLE_TABLE,
} = require('../models');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
};


// 'use strict';

// const {USER_TABLE, UserSchema } = require('../postgres-models');

// module.exports = {
//   up: async (queryInterface) => {
//     await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
//   },

//   down: async (queryInterface) => {
//     await queryInterface.removeColumn(USER_TABLE, 'role');
//   }
// };


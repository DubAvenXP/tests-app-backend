const {
    Role, RoleSchema,
    User, UserSchema,
} = require('.');



function setupModels(sequelize) {
    Role.init(RoleSchema, Role.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Role.associate(sequelize.models);
    User.associate(sequelize.models);

}

module.exports = setupModels;
const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');

const ROLE_TABLE = 'roles';
const ROLE_MODEL = 'Role';

const RoleSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'updated_at',
    }
};

class Role extends Model {
    static associate(models) {
        this.hasMany(models.User, {
            foreignKey: 'roleId',
            as: 'users',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: ROLE_MODEL,
            tableName: ROLE_TABLE,
        };
    }
}

module.exports = {
    Role,
    RoleSchema,
    ROLE_TABLE,
    ROLE_MODEL,
};

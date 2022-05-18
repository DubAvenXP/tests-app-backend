const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const TEST_TABLE = 'tests';
const TEST_MODEL = 'Test';

const TestSchema = {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    url: {
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
    },
};

class Test extends Model {
    static associate(models) {
        this.hasMany(models.Question, {
            foreignKey: 'testId',
            as: 'questions',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TEST_TABLE,
            modelName: TEST_MODEL,
        };
    }
}

module.exports = {
    Test,
    TestSchema,
    TEST_TABLE,
    TEST_MODEL,
};

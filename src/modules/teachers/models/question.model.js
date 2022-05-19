const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');

const QUESTION_TABLE = 'questions';
const QUESTION_MODEL = 'Question';

const QuestionSchema = {
    id: {
        type: DataTypes.CHAR(36),
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
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
    testId: {
        field: 'test_id',
        allowNull: false,
        type: DataTypes.CHAR(36),
        references: {
            model: 'tests',
            key: 'id',
        },
        onUpdate: 'CASCADE',
    },
};

class Question extends Model {
    static associate(models) {
        this.belongsTo(models.Test, { as: 'test' });
        this.hasMany(models.Answer, {
            foreignKey: 'questionId',
            as: 'answers',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: QUESTION_MODEL,
            tableName: QUESTION_TABLE,
        };
    }
}

module.exports = {
    Question,
    QuestionSchema,
    QUESTION_TABLE,
    QUESTION_MODEL,
};

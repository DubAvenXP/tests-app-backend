const { Model, DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const ANSWER_TABLE = 'answers';
const ANSWER_MODEL = 'Answer';

const AnswerSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    isCorrect: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
    questionId: {
        field: 'question_id',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: 'questions',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
};

class Answer extends Model {
    static associate(models) {
        this.belongsTo(models.Question, { as: 'question' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ANSWER_TABLE,
            modelName: ANSWER_MODEL,
        };
    }
}

module.exports = {
    Answer,
    AnswerSchema,
    ANSWER_TABLE,
    ANSWER_MODEL,
};

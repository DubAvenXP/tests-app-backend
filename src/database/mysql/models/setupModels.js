const {
    Test, TestSchema,
    Question, QuestionSchema,
    Answer, AnswerSchema,
} = require('.');



function setupModels(sequelize) {
    Test.init(TestSchema, Test.config(sequelize));
    Question.init(QuestionSchema, Question.config(sequelize));
    Answer.init(AnswerSchema, Answer.config(sequelize));
    
    Test.associate(sequelize.models);
    Question.associate(sequelize.models);
    Answer.associate(sequelize.models);

}

module.exports = setupModels;
'use strict';
const {
  TestSchema, TEST_TABLE,
  QuestionSchema, QUESTION_TABLE,
  AnswerSchema, ANSWER_TABLE,
} = require('../models');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(TEST_TABLE, TestSchema);
    await queryInterface.createTable(QUESTION_TABLE, QuestionSchema);
    await queryInterface.createTable(ANSWER_TABLE, AnswerSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(TEST_TABLE);
    await queryInterface.dropTable(QUESTION_TABLE);
    await queryInterface.dropTable(ANSWER_TABLE);
  }
};
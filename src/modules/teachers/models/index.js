const answer = require('./answer.model');
const question = require('./question.model');
const test = require('./test.model');
module.exports = {
    ...answer,
    ...question,
    ...test,
};
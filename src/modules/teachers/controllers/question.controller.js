const { response, request } = require('express');

const { Question, Answer } = require('../../../database/mysql/models');
const { success, err } = require('../../../network/response');

const list = async (req = request, res = response) => {
    try {
        const { limit = 25, offset = 0, } = req.query;
        const filter = { status: true };

        const questions = await Question.findAll({
            where: filter,
            limit,
            offset,
            attributes: {
                exclude: ['created_at', 'updated_at', 'status'],
            },
        });

        success(req, res, questions, 200);
    } catch (error) {
        err(req, res, error, 'Error');
    }
};

const listOne = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const question = await Question.findByPk(id, {
            attributes: {
                exclude: ['created_at', 'updated_at', 'status'],
            },
        });
        success(req, res, question, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }
};

const add = async (req = request, res = response) => {
    try {
        let { questions } = req.body;

        for (let i = 0; i < questions.length; i++) {
            const { answers, ...payload } = questions[i];
            let question = await new Question(payload).save();

            for (let j = 0; j < answers.length; j++) {
                await new Answer({
                    questionId: question.id,
                    ...answers[j],
                }).save();
            }
        }

        questions = await Question.findAll({
            where: { testId: questions[0].testId },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'status'],
            },
            include: [{
                association: 'answers',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'status', 'questionId'],
                },
            }],
        });

        success(req, res, questions, 201);
    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }
};

const update = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { body } = req;

        if (body.status) delete body.status;

        await Question.update(body, { where: { id } });

        await listOne(req, res);

    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
        return;
    }

};

const remove = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        await Question.update({ status: false }, { where: { id } });
        success(req, res, { msg: 'deleted successfully' }, 200);

    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }
};

module.exports = {
    add,
    list,
    listOne,
    remove,
    update,
};
const { response, request } = require('express');

const { Question } = require('../../../database/mysql/models');
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
        const body = req.body;

        const question = new Question(body);

        await question.save();
        success(req, res, question, 201);
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

        await Question.destroy({ where: { id } });
        success(req, res, 'deleted successfully', 200);

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
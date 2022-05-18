const { response, request } = require('express');

const { Answer } = require('../../../database/mysql/models');
const { success, err } = require('../../../network/response');

const list = async (req = request, res = response) => {
    try {
        const { limit = 25, offset = 0, } = req.query;
        const filter = { status: true };

        const answers = await Answer.findAll({
            where: filter,
            limit,
            offset,
            attributes: {
                exclude: ['created_at', 'updated_at', 'status'],
            },
        });
        
        success(req, res, answers, 200);
    } catch (error) {
        err(req, res, error, 'Error');
    }
};

const listOne = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findByPk(id, {
            attributes: {
                exclude: ['created_at', 'updated_at', 'status'],
            },
        });
        success(req, res, answer, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }
};

const add = async (req = request, res = response) => {
    try {
        const body = req.body;

        const answer = new Answer(body);
        
        await answer.save();
        success(req, res, answer, 201);
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

        await Answer.update(body, { where: { id } });

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

        await Answer.destroy({ where: { id } });
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
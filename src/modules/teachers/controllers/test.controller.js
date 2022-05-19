const { response, request } = require('express');

const { Test } = require('../../../database/mysql/models');
const { success, err } = require('../../../network/response');

const list = async (req = request, res = response) => {
    try {
        const { limit = 25, offset = 0, } = req.query;
        const filter = { status: true };

        const tests = await Test.findAll({
            where: filter,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['updatedAt', 'status'],
            },
        });

        success(req, res, tests, 200);
    } catch (error) {
        err(req, res, error, 'Error');
    }
};

const listOne = async (req = request, res = response) => {
    try {
        const { url } = req.params;
        const test = await Test.findOne({
            where: { url },
            include: [
                {
                    association: 'questions',
                    order: [['createdAt', 'DSC',]],
                    where: { status: true },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'testId', 'status'],
                    },
                    include: [
                        {
                            association: 'answers',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'questionId', 'status'],
                            },
                        }
                    ]

                }
            ],
            attributes: {
                exclude: ['updatedAt', 'status'],
            }
        });
        success(req, res, test, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }
};

const add = async (req = request, res = response) => {
    try {
        const body = req.body;

        const test = new Test(body);

        await test.save();
        success(req, res, test, 201);
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

        await Test.update(body, { where: { id } });

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

        await Test.destroy({ where: { id } });
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
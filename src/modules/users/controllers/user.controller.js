const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');


const { User } = require('../../../database/postgres/models');
const { success, errors } = require('../../../network/response');
const { pagination: { calculateNextPrev } } = require('../../../helpers');

const list = async (req = request, res = response) => {
    try {
        const { limit = 25, offset = 0, name } = req.query;
        const filter = { status: true };

        if (name) {
            filter.name = { [Op.iLike]: `%${name}%` };
        }

        const [users] = await Promise.all([

            User.findAndCountAll({
                where: filter,
                limit,
                offset,
                include: [
                    {
                        association: 'role',
                        attributes: ['id', 'name'],
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId'],
                },
            })
        ]);
        const { next, previous } = calculateNextPrev(offset, users.count, limit);
        success(req, res, { next, previous, rows: users }, 200);
    } catch (error) {
        errors(req, res, 'Internal server error', 500, 'Error');
    }
};

const listOne = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const client = await User.findByPk(id, {
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId'],
            },
        });

        success(req, res, client, 200);
    } catch (error) {
        console.error(error);
        errors(req, res, 'Internal server error', 500, 'Error');
    }



};

const add = async (req = request, res = response) => {

    try {
        const body = req.body;
        const client = new User(body);


        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        client.password = bcryptjs.hashSync(client.password, salt);

        //Guardar DB
        await client.save();
        success(req, res, client, 201);
    } catch (error) {
        console.error(error);
        errors(req, res, 'Internal server error', 500, 'Error');
    }

};

const update = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { body } = req;

        if (body.status) delete body.status;

        if (body.password) {
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(body.password, salt);
        }

        await User.update(body, { where: { id } });
        await listOne(req, res);
    } catch (error) {
        console.error(error);
        errors(req, res, 'Internal server error', 500, 'Error');
        return;
    }

};

const remove = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        //Guardar DB
        await User.update({ status: false }, { where: { id } });
        success(req, res, 'deleted successfully', 200);
    } catch (error) {
        console.error(error);
        errors(req, res, 'Internal server error', 500, 'Error');
    }
};

module.exports = {
    add,
    list,
    listOne,
    remove,
    update,
};
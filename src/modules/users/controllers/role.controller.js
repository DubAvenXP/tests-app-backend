const { response, request } = require('express');
const { Op } = require('sequelize');


const { Role } = require('../../../database/postgres/models');
const { success, err } = require('../../../network/response');
const { pagination: { calculateNextPrev } } = require('../../../helpers');

const list = async (req = request, res = response) => {
    try {
        const { limit = 25, offset = 0, name } = req.query;
        const filter = { status: true };

        if (name) {
            filter.name = { [Op.iLike]: `%${name}%` };
        }

        const [roles] = await Promise.all([

            Role.findAndCountAll({
                where: filter,
                limit,
                offset,
                attributes: {
                    exclude: ['created_at', 'updated_at', 'status'],
                },
            })
        ]);
        const { next, previous } = calculateNextPrev(offset, roles.count, limit);
        success(req, res, { next, previous, rows: roles }, 200);
    } catch (error) {
        err(req, res, error, 'Error');
    }
};

const listOne = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const client = await Role.findByPk(id, {
            attributes: {
                exclude: ['created_at', 'updated_at', 'status'],
            },
        });

        success(req, res, client, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 'Error');
    }



};

const add = async (req = request, res = response) => {

    try {
        const body = req.body;
        const role = new Role(body);

        //Guardar DB
        await role.save();
        success(req, res, role, 201);
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

        await Role.update(body, { where: { id } });

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

        await Role.destroy({ where: { id } });
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
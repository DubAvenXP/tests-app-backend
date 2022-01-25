const { request } = require('express');
const { errors } = require('../network/response');

const existsParamId = (Model) => {
    return async (req = request, res, next) => {
        const itemExists = await Model.findByPk(req.params.id);
        if (!itemExists) {
            errors(req, res, 'El id buscado no ha sido encontrado', 400, 'id', 'params');
            return;
        }
        next();
    };
};

// const genericIdExistsBody = (Model) => {
//     return async (req = request, res, next) => {
//         const itemExists = await Model.findByPk(req.body.id);
//         if (!itemExists) {
//             errors(req, res, 'El id buscado no ha sido encontrado', 400, req.body.id, 'params');
//         }
//         next();
//     };
// };

module.exports = {
    existsParamId,
    // genericIdExistsBody
};
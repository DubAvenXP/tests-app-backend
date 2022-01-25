const { Router } = require('express');
const { check } = require('express-validator');

const { expressValidatorValidate, validateJWT, existsParamId } = require('../../../middlewares');
const { role: { list, listOne, add, update, remove } } = require('../controllers');
const { Role } = require('../../../database/postgres/models');
const router = Router();

router.get('/', [
    // validateJWT,
], list);

router.get('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(Role),
], listOne);

router.post('/', [
    // validateJWT,
    check('name', 'El nombre es requerido').notEmpty(),
    expressValidatorValidate
], add);

router.put('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(Role),
    expressValidatorValidate
], update);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(Role),
    expressValidatorValidate
], remove);

module.exports = router;
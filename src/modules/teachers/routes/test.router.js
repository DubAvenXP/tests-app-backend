const { Router } = require('express');
const { check } = require('express-validator');

const { test: { list, add, listOne, remove, update } } = require('../controllers');
const { expressValidatorValidate } = require('../../../middlewares');

const router = Router();

router.get('/', list);

router.get('/:id', [
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    expressValidatorValidate
], listOne);

router.post('/', [
    check('description', 'El nombre es requerido').notEmpty(),
    expressValidatorValidate
], add);

router.put('/:id', [
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    expressValidatorValidate
], update);

router.delete('/:id', [
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    expressValidatorValidate
], remove);


module.exports = router;
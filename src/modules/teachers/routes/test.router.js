const { Router } = require('express');
const { check } = require('express-validator');

const { test: { list, add, listOne, remove, update } } = require('../controllers');
const { expressValidatorValidate, urlGenerator } = require('../../../middlewares/');

const router = Router();

router.get('/', list);

router.get('/:url', [
    check('url', 'El url es requerido').notEmpty().isString(),
    expressValidatorValidate
], listOne);

router.post('/', [
    check('name', 'El nombre es requerido').notEmpty(),
    urlGenerator,
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
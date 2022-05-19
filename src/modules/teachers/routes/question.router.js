const { Router } = require('express');
const { check } = require('express-validator');

const { question: { list, add, listOne, remove, update } } = require('../controllers');
const { expressValidatorValidate } = require('../../../middlewares');

const router = Router();

router.get('/', list);

router.get('/:id', [
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    expressValidatorValidate
], listOne);

router.post('/', [
    check('questions').notEmpty().isArray(),
    check('questions.*.description').notEmpty(),
    check('questions.*.testId').notEmpty().isUUID(),
    check('questions.*.answers').notEmpty().isArray(),
    check('questions.*.answers.*.description').notEmpty(),
    check('questions.*.answers.*.isCorrect').notEmpty().isBoolean(),
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
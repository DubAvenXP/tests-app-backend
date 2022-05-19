const { Router } = require('express');
const { check } = require('express-validator');

const { answer: { list, add, listOne, remove, update } } = require('../controllers');
const { expressValidatorValidate } = require('../../../middlewares');

const router = Router();

router.get('/', list);

router.get('/:id', [
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    expressValidatorValidate
], listOne);

router.post('/', [
    check('description', 'El nombre es requerido').notEmpty(),
    check('isCorrect', 'El estado es requerido').notEmpty(),
    check('questionId', 'El id de la pregunta es requerido es requerido').notEmpty().isUUID(),
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
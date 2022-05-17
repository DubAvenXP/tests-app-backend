const { Router } = require('express');
const { check } = require('express-validator');

const { expressValidatorValidate, validateJWT, existsParamId } = require('../../../middlewares');
const { emailExists } = require('../helpers');
const { user: { list, listOne, add, update, remove } } = require('../controllers');
const { User } = require('../../../database/postgres/models');
const router = Router();

router.get('/', [
    // validateJWT,
], list);

router.get('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(User),
    expressValidatorValidate
], listOne);

router.post('/', [
    // validateJWT,
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail().custom(emailExists),
    check('phone', 'El numero de teléfono es requerido').notEmpty(),
    check('phone', 'El numero de teléfono no es válido').isMobilePhone(),
    check('password', 'La contraseña es requerida').notEmpty(),
    check('password', 'La contraseña no es válida').isLength({ min: 8, max: 20 }),
    check('roleId', 'El id del rol es requirido').notEmpty().isUUID(),
    expressValidatorValidate
], add);

router.put('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(User),
    check('email', 'El correo electrónico no es válido').optional().isEmail(),
    check('phone', 'El numero de telefono no es válido').optional().isMobilePhone(),
    check('password', 'La contraseña es insegura').optional().isStrongPassword(),
    check('userTypeId', 'El tipo de usuario es requerido').optional().notEmpty(),
    expressValidatorValidate
], update);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id es requerido y debe ser un UUID valido').notEmpty().isUUID(),
    existsParamId(User),
    expressValidatorValidate
], remove);

module.exports = router;
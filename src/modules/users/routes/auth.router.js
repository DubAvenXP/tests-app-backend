const { Router } = require('express');
const { check } = require('express-validator');

const { auth: { login, googleSignIn, facebookSignIn } } = require('../controllers');
const { expressValidatorValidate } = require('../../../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El correo electrónico es requerido').notEmpty(),
    check('email', 'El correo electrónico es invalido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    expressValidatorValidate,
], login);

router.post('/google', [
    check('id_token', 'id_token es requerido').notEmpty(),
    expressValidatorValidate,
], googleSignIn);

router.post('/facebook', [
    check('access_token', 'access_token es requerido').notEmpty(),
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo electrónico es requerido').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    expressValidatorValidate,
], facebookSignIn);

module.exports = router;
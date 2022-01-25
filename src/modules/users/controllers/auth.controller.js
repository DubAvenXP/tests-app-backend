const { response, request } = require("express");
const bycriptjs = require('bcryptjs');

const { success, err } = require('../../../network/response');
const { User } = require('../../../database/postgres/models');
const { generateJWT, facebookVerify, googleVerify } = require('../../../libs');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        let user = await User.findOne({
            where: { email },
        });

        if (!user) {
            err(req, res, 'Usuario o contraseña invalidos', 400);
            return;
        }

        //Verificar si el usuario esta activo
        if (!user.status) {
            err(req, res, 'Su cuenta se encuentra suspendida, hable con el administrador', 403);
            return;
        }
        //Verificar la contraseña
        const isValidPassword = bycriptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            err(req, res, 'Usuario o contraseña invalidos', 400);
            return;
        }
        //Generar JWT
        const token = await generateJWT(user.id);

        user = await User.findOne({
            where: { email },
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId', 'facebook', 'google'],
            },
        });

        success(req, res, { user, token }, 200);

    } catch (error) {
        console.error(error);
        err(req, res, 'Error', 500);
    }

};

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const { name, email, picture } = await googleVerify(id_token);
        let user = await User.findOne({
            where: { email },
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'roleId'],
            },
        });

        if (!user) {
            const data = {
                name,
                email,
                password: 'no password',
                phone: '30005500',
                google: true,
            };
            user = new User(data);
            await user.save();
        }

        if (!user.email) {
            err(req, res, 'El correo electronico proporcionado es invalido', 400);
            return;
        }
        if (!user.status) {
            err(req, res, 'Inicio de sesion invalido', 400);
            return;
        }
        if (!user.google) {
            await user.update({ google: true });
        }

        user = await User.findOne({
            where: { email },
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId', 'facebook', 'google'],
            },
        });

        const token = await generateJWT(user.id);

        success(req, res, { user: user, token }, 200);
    } catch (error) {
        console.error(error);
        err(req, res, 'Credenciales de google invalidas', 400);
    }

};

const facebookSignIn = async (req = request, res = response) => {
    const { access_token, name, email } = req.body;

    try {
        const { is_valid } = await facebookVerify(access_token);

        if (!is_valid) {
            err(req, res, 'Credenciales de facebook invalidas', 400);
            return;
        }

        let user = await User.findOne({
            where: { email },
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'roleId'],
            },
        });

        if (!user) {

            const data = {
                name,
                email,
                password: 'no password',
                phone: '30005500',
                facebook: true,
            };
            user = new User({ ...data });
            console.log(user);
            await user.save();
        }

        if (!user.status) {
            err(req, res, 'Inicio de sesion invalido', 400);
            return;
        }
        if (!user.facebook) {
            await user.update({ facebook: true });
        }

        const token = await generateJWT(user.id);

        user = await User.findOne({
            where: { email },
            include: [
                {
                    association: 'role',
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId', 'facebook', 'google'],
            },
        });

        success(req, res, { user: user, token }, 200);

    } catch (error) {
        console.error(error);
        err(req, res, 'Credenciales de facebook invalidas', 500);
    }

};

module.exports = {
    login,
    googleSignIn,
    facebookSignIn
};
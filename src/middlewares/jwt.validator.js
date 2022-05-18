const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');


const { User } = require('../database/mysql/models');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            message: 'The request does not have a token'
        });
    }

    try {
        const { id } = jwt.verify(token, config.jwt.secret);
        const user = await User.findByPk(id, {
            include: {
                association: 'userType',
                attributes: ['name'],
            },
            attributes: {
                exclude: ['userTypeId'],
            },
        });
        //Usuario existe?
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        //Verificar estado del usuario
        if (!user.status) {
            return res.status(401).json({ message: 'Invalid token - talk to the administrator' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

};

module.exports = {
    validateJWT,
};
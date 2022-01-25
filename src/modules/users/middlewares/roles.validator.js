const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'The token must be validated - talk to the administrator admin'
        });
    }

    const { userType: { role } } = req.user;

    if (role.name !== 'admin') {
        res.status(401).json({
            message: `You are not an administrator - permission denied`
        });
    }

    next();

};

module.exports = {
    isAdminRole
};
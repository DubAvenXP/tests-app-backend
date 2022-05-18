const { User } = require('../models');

const emailExists = async (email = '') => {
    const emailExists = await User.findOne({
        where: {
            email,
        },
    });
    console.log(emailExists);
    if (emailExists) throw new Error('El correo electrónico ya se encuentra registrado');
};


module.exports = {
    emailExists
};
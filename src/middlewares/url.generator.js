const nanoid = require('nanoid');

const generateUrl = async (req, res, next) => {
    const name = req.body.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const id = nanoid.nanoid(8);
    req.body.url = name.replace(/ /g, '-').concat('-', id).toLowerCase();
    next()
};

module.exports = generateUrl;
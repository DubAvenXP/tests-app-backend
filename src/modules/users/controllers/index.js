const auth = require('./auth.controller');
const user = require('./user.controller');
const role = require('./role.controller');

module.exports = {
    user,
    role,
    auth,
};
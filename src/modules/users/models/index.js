const user = require('./user.model');
const role = require('./role.model');
module.exports = {
    ...user,
    ...role,

};
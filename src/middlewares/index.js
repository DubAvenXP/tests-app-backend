const expressValidator = require('./express.validator');
const jwtValidator = require('./jwt.validator');
const idValidator = require('./id.validator');
module.exports = {
    ...expressValidator,
    ...jwtValidator,
    ...idValidator
};

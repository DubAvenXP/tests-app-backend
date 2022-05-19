const expressValidator = require('./express.validator');
const jwtValidator = require('./jwt.validator');
const idValidator = require('./id.validator');
const urlGenerator = require('./url.generator');
module.exports = {
    ...expressValidator,
    ...jwtValidator,
    ...idValidator,
    urlGenerator
};

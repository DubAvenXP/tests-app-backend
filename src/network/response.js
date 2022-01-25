const success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';

    return res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    });
};
const err = (req, res, error, status) => {
    let statusCode = status || 500;
    let statusMessage = error || 'Internal server error';
    console.error('[Response error] ' + error);
    res.status(statusCode).send({
        error: statusMessage,
        status: statusCode,
        // body: error
    });
};

module.exports = {
    success,
    err,
};
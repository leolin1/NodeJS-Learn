//error middleware]//目的是为了对未知错误进行处理
// process unknonw error
// 1. log the error
// 2. send response to client
// 3. do not call next()
// 4. do not use res.formatResponse
// 5. do not use res.status().json()
// 6. do not use res.send()
// 7. do not use res.end()
// 8. do not use res.redirect()
// 9. do not use res.render()

const getLogger = require("../../common/logger");
const config = require("../../config");

const logger  = getLogger(__filename);


module.exports = (error, req, res, next) => {
    // write down the error
    logger.error(`${error.message} \n stack: ${error.stack}`);

    res.formatResponse(
        `something went wrong, please try again`,
        500,
        config.NODE_ENV === 'dev' && {stack: error.stack} // only show stack in development mode
    );
};

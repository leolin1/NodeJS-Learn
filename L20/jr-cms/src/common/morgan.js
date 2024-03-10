const morgan = require("morgan");
const config = require("../config");

const getLogger = require("./logger");
const logger = getLogger();

// 判断当前环境环境是什么？
module.exports = morgan(config.NODE_ENV === "dev" ? "dev" : "combined", {
    stream: logger.stream
});

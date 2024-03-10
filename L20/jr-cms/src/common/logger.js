//winston 是一个日志记录器，可以记录日志到文件中
//morgan 是一个日志中间件，可以记录请求日志API请求时间等


const winston = require('winston');
const path = require('path');   //引入path模块


//如果光winston.createLogger() -> 他就只会记录日志，还有些默认的时间配置...
// 这里建议使用以下的这个框架，好处就是能把日志 的来源给记录下来. 也就是文件名记录下来
const getLogger = (filename) => {
   const logger = winston.createLogger({
         level: 'info',
         defaultMeta: { 
            file: filename? path.basename(filename): undefined,//看看这个文件名是不是存在，如果存在就返回文件名，如果不存在就返回undefined
        },
        //这里是配置日志的格式
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({timestamp, level, message, file}) => 
            `[${timestamp}][${level}] ${file ? `[${file}]` : ''}: ${message}`
            )
        ),
        // //这里是配置日志的输出方式
        transports: [
            new winston.transports.Console(),
        ], 
    });
    //A neccessary step if you want to combine winston with morgan
    logger.stream = {
        write: (message) => {
        logger.info(message);
        },
    };
    //return logger 
    return logger;
};

//export logger
module.exports = getLogger;







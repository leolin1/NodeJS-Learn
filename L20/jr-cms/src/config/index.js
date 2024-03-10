// 这个文件用来检测必须的配置是否存在，如果不存在就抛出一个错误
//来导入配置文件里面包含了必须的和可选配置价格管理方式有益于统一管理
//


//导入dotenv模块
require('dotenv').config();
//定义一个可选配置
const optionalConfig = {
    // default to 3000 if not provided 

    PORT:process.env.PORT || 3000,   // process.env.PORT 是一个环境变量，用来指定应用程序监听的端口号,（环境变量 读变量的方式）
    NODE_ENV: process.env.NODE_ENV || 'dev', // process.env.NODE_ENV 是一个环境变量，用来指定应用程序运行的环境

};
//定义一个必须的配置
const requiredConfig = {
    DB_CONNECTION_STRING:process.env.DB_CONNECTION_STRING, //为了连接到数据库，需要提供数据库的连接字符串
};


//确保必须的配置都有值
for (const key in requiredConfig) {
    // include null and undefined （双等号的检测方式）
    if (!requiredConfig[key] == null) {
        throw new Error(`Missing required config: ${key}`);
    }
}


// use commonJS module system to export the configuration
module.exports = {
    ...optionalConfig,
    ...requiredConfig,
};
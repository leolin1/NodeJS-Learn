//connect server with database

//step 1: import mongoose
const mongoose = require('mongoose');   
const config = require('../../config');
const getLogger = require('../logger');
const logger = getLogger(__filename);


//step 2: create a function to connect to the database
const connectToDb = async () => {

    const db = mongoose.connection;//mongoose.connection 是 Mongoose 库提供的一个对象，它包含了许多有用的事件和属性，你可以用它来管理和监控你的数据库连接。
    //using on to listen to the error event
    db.on('error', (error) => {
        logger.error(error);
        throw new Error(error);
    });
    db.on('connected', () => {
        logger.info('DB connected to database');
    });
    /*By logging this event with a warning level, you're making it clear in your logs that this is something that needs attention, 
    even though it's not an error.*/
    db.on('disconnected', () => {
        logger.warn('DB disconnected to database');
    });

    //connect to the database
    return mongoose.connect(config.DB_CONNECTION_STRING);
};

module.exports = connectToDb;
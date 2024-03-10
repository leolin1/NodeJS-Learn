// this index.js file is the point of entry for all the routes in the application,
// advantage of this is that we can import all the routes in one place and export them


const {Router} = require('express');


const studentRouter = require('./student.router');

const v1Router = Router();

v1Router.use('/students', studentRouter);

module.exports = v1Router;


//The .use() method can be used to add functionality for specific routes or for all routes that pass through the router.


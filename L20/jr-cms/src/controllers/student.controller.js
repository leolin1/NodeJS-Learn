const { format } = require('morgan');
const getLogger = require('../common/logger');
const Student = require('../models/student.model');
const formatResponse = require('../middleware/formateResponse.middleware');
const logger = getLogger(__filename);

//
const getAllStudents = async (req, res) => {
    // logger.info('find all students');
    // res.formatResponse([]);
    // res.json([]);
    // 为什么这个地方是异步操作？？
    // 因为这里的操作是数据库查询操作，数据库查询操作是异步的。
    const students = await Student.find().exec(); // 这里的exec()是mongoose的方法，用来执行查询, 官方建议这里放一个这个方法，但是不放也没问题。
    //
    res.formatResponse(students);

};

const getStudentById = async (req, res,next) => {
    try{
        const {id} = req.params;
        const student = await Student.findById(id).exec();
        if(!student){
            // throw new NotFoundException(`student with id ${id} is not found`);
            return res.formatResponse(`student with id ${id} is not found`, 404);
        }  
        res.formatResponse(student);

    } catch (e) {
        next(e);
    }

    
};


const addStudent = async (req, res) => {
    // // 1. get data from req.body
    const {firstName, lastName, email} = req.body;
    // // 2. create a new student
    // const student = new Student({
    //     firstName,
    //     lastName,
    //     email
    // });
    // // 3. save the student
    // await student.save();
    const student = await Student.create({firstName, lastName, email});
    // 4. send response
    res.formatResponse(student, 201);
};
const updateStudentById = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, email} = req.body;
    const student = await Student.findByIdAndUpdate(
        id,
        {
        firstName, 
        lastName, 
        email
        },
        {
            new: true,// 由于mongoose的特性，如果不加这个参数，返回的是更新前的数据，加上这个参数，返回的是更新后的数据。   
        }
    ).exec();
    if(!student){
        return res.formatResponse(`student with id ${id} is not found`, 404);
    }
    res.formatResponse(student);
};
const deleteStudentById = async (req, res) => {
    const {id} = req.params;
    const student =  await Student.findByIdAndDelete(id).exec();
    if(!student){
        return res.formatResponse(`student with id ${id} is not found`, 404);
    }
    res.formatResponse(undefined, 204);
};

// 这里，可以被拆成 service 和 controller, 但是这里的代码量不大，所以就不拆了. 下一节课会讲，也就是L21。


module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};




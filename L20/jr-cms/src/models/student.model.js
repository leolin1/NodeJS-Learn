const {Schema , model} = require('mongoose');

const studentSchema = new Schema({
    //firstName, lastName,email
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        
    }
});

// cyclic dependency issue can be avoided by using the model method of the mongoose object to create a model
const Student = model('Student', studentSchema);

module.exports = Student;




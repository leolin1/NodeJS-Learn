// Import the Router function from the Express module. This function is used to create a new router object.
const {Router} = require('express');

// Import various functions from the student.controller module. These functions are designed to handle the incoming HTTP requests for different CRUD operations.
const { 
  getAllStudents,    // Function to retrieve all students from the database.
  addStudent,        // Function to add a new student to the database.
  getStudentById,    // Function to retrieve a student by their unique ID.
  updateStudentById, // Function to update the details of a student by their ID.
  deleteStudentById  // Function to delete a student from the database by their ID.
} = require('../controllers/student.controller');

// Create a new instance of the Router to define routes for student-related operations.
const studentRouter = Router();

// Define a GET route to list all students. When this route is hit, the getAllstudents function is invoked.
studentRouter.get('/', getAllStudents);

// Define a POST route to create a new student. When this route is hit, the addStudent function is invoked.
studentRouter.post('/', addStudent);

// Define a GET route to retrieve a student by ID. The ':id' is a URL parameter that Express will capture and make available in the controller.
studentRouter.get('/:id', getStudentById);

// Define a PATCH route to update a student's details by their ID. PATCH is used for partial updates of a resource, whereas PUT would typically be used for full updates.
studentRouter.patch('/:id', updateStudentById);

// Define a DELETE route to remove a student by ID. When this route is hit, the deleteStudentById function is invoked.
studentRouter.delete('/:id', deleteStudentById);

// Export the configured studentRouter to be mounted by the main Express app. This modular approach keeps route definitions clean and separated.
module.exports = studentRouter;

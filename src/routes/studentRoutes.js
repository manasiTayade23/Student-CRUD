const express = require('express');
const StudentController = require('../controllers/StudentController').default; // Ensure .default is used
const validateUserInput = require('../middlewares/validateRequest');
const validateToken = require('../middlewares/validateToken');
const studentRouter = express.Router();

// Signup route
studentRouter.post('/register', StudentController.createStudent);

studentRouter.get('/getStudents', StudentController.getStudents);

studentRouter.get('/getSudentById/:id', StudentController.getStudentById);

studentRouter.patch('/updateStudent/:id', StudentController.updateStudent);

studentRouter.delete('/deleteStudent/:id',StudentController.deleteStudent);


module.exports = studentRouter;

const express = require('express');
const userController = require('../controllers/UserController');
const validateUserInput = require('../middlewares/validateRequest');
const validateToken = require('../middlewares/validateToken');
const userRouter = express.Router();

// Signup route
userRouter.post('/signup',validateUserInput, userController.signup );

// Login route (if you have a login controller, uncomment and define it)
userRouter.post('/signin',validateToken, userController.signin);

module.exports = userRouter;

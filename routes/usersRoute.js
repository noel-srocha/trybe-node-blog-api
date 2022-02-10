const Router = require('express').Router();
const usersController = require('../controllers/usersController');
const { 
  validateName, 
  validatePassword, 
  validateEmail, 
  validateEmptyLogin, 
} = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

Router.post(
  '/', 
  validateName, 
  validatePassword, 
  validateEmail, 
  validateEmptyLogin, 
  usersController.createUser,
);
Router.get('/', validateToken, usersController.getUsers);
Router.get('/:id', validateToken, usersController.getUserById);
Router.delete('/me', validateToken, usersController.deleteUserById);

module.exports = Router;

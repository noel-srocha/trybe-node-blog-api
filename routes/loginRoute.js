const Router = require('express').Router();
const usersController = require('../controllers/usersController');
const validations = require('../middlewares/validateUser');

Router.post('/', validations.validateEmptyLogin, usersController.loginUser);

module.exports = Router; 
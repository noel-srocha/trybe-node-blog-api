const Router = require('express').Router();
const categoriesController = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');

Router.post('/', validateToken, categoriesController.createCategory);
Router.get('/', validateToken, categoriesController.getCategories);

module.exports = Router; 
const Router = require('express').Router();
const postController = require('../controllers/postsController');
const validateToken = require('../middlewares/validateToken');
const validatePosts = require('../middlewares/validatePosts');

Router.post('/', validateToken, validatePosts.checkCategory, postController.createPost);
Router.get('/', validateToken, postController.getPosts);
Router.get('/:id', validateToken, postController.getPostById);
Router.put(
  '/:id',
  validateToken,
  validatePosts.updateValidation,
  validatePosts.checkCategory,
  postController.updatePost,
);
Router.delete(
  '/:id',
  validateToken,
  validatePosts.checkPost,
  validatePosts.sameIdValidation,
  postController.deletePost,
);

module.exports = Router; 
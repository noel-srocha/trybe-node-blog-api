const categoriesService = require('../services/categoriesService');
const { BlogPost } = require('../models');
const postsService = require('../services/postsService');

const checkCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) { 
    return res.status(400).json({ message: '"categoryIds" is required' }); 
  }
  const { categories } = await categoriesService.getCategories();
    const actualIds = categories.map((cat) => cat.id);
    const allActualIds = categoryIds.every((id) => actualIds.includes(id));
    if (!allActualIds) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};

const updateValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

const checkPost = async (req, res, next) => {
  const { id } = req.params;
  const postToDelete = await postsService.getPostById(id);
  console.log(postToDelete);
  if (!postToDelete) { 
    return res.status(404).json({ message: 'Post does not exist' }); 
  } 
  next();
};

const sameIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  const blogPost = await BlogPost.findOne({ where: { id } });
  if (!blogPost) { 
    return res.status(404).json({ message: 'Post does not exist' }); 
  } 
  if (blogPost.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = { checkCategory, updateValidation, checkPost, sameIdValidation };
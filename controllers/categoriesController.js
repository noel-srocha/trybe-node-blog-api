const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
const { name } = req.body;
const { status, message, newCategory } = await categoriesService.createCategory(name);
if (message) { return res.status(status).json({ message }); }
return res.status(status).json(newCategory);
};

const getCategories = async (req, res) => {
  const { status, categories } = await categoriesService.getCategories();
  return res.status(status).json(categories);
};

module.exports = { createCategory, getCategories };
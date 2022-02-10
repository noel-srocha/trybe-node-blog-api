const { Category } = require('../models');

const createCategory = async (name) => {
if (!name) {
  return { status: 400, message: '"name" is required' };
}
const newCategory = await Category.create({ name });
  return { status: 201, newCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return { status: 200, categories };
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
    if (category) { return category; }
      return null;
};

module.exports = { createCategory, getCategories, getCategoryById };

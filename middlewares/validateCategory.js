const categoriesService = require('../services/categoriesService');

const checkCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) { return res.status(400).json({ message: '"categoryIds" is required' }); }
  let error = false;

  await Promise.all(categoryIds.map(async (id) => {
    const category = await categoriesService.getCategoryById(id);
    if (!category) {
      error = true;
    }
  }));
  if (error === true) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

    next();
};

module.exports = { checkCategory };
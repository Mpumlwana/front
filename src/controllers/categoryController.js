const CategoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);  // Return all categories as JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

const ProductService   = require('../services/productService');

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);  // Return all categories as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
        };

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductService.deleteProduct(productId);
        res.status(200).json(product);  // Return all categories as JSON
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
        };
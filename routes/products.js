const express = require('express');
const router = express.Router();
const productDAL = require('../dals/products');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await productDAL.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await productDAL.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await productDAL.addProduct(req.body);
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productDAL.updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await productDAL.deleteProduct(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

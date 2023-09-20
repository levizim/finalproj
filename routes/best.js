// bestSellingProductsRoutes.js

const express = require('express');
const router = express.Router();
const bestSellingProductsDAL = require('../dals/best');

router.get('/best-sellers', async (req, res) => {
    try {
        console.log('Entering route...');
        const products = await bestSellingProductsDAL.getBestSellingProducts();
        console.log('Products retrieved:', products);
        res.json(products);
    } catch (error) {
        console.error("Failed to retrieve best selling products:", error);
        res.status(500).json({ error: "Failed to retrieve best selling products" });
    }
});

module.exports = router;

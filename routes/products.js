var express = require('express');
var router = express.Router();

// Placeholder data for top-selling products. In reality, this will come from your database.
const topSellingProducts = [
    { id: 1, name: 'Product A', price: 50 },
    { id: 2, name: 'Product B', price: 45 },
    { id: 3, name: 'Product C', price: 55 },
];

// Route to get top-selling products
router.get('/top-selling', (req, res) => {
    res.json(topSellingProducts);
});

module.exports = router;

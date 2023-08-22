const db = require('../db/config');

module.exports = {
    createProduct: async (productName, description, price) => {
        const query = 'INSERT INTO Products (ProductName, Description, Price) VALUES (?, ?, ?)';
        await db.query(query, [productName, description, price]);
    },

    getProductById: async (productId) => {
        const query = 'SELECT * FROM Products WHERE ProductID = ?';
        const [rows] = await db.query(query, [productId]);
        return rows[0];
    },

    // ... Add update and delete functions and any other necessary functions
};

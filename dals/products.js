const db = require('../db/config');

module.exports = {
    getAllProducts: async () => {
        const [results] = await db.query('SELECT * FROM Products');
        return results;
    },
    

    getProductById: async (id) => {
        const [results] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [id]);
        return results[0]; // return the first product or undefined if no results
    },
    

    addProduct: async (product) => {
        return await db.query('INSERT INTO Products SET ?', product);
    },

    updateProduct: async (id, product) => {
        return await db.query('UPDATE Products SET ? WHERE ProductID = ?', [product, id]);
    },

    deleteProduct: async (id) => {
        return await db.query('DELETE FROM Products WHERE ProductID = ?', [id]);
    },
    getBestSellingProducts: async () => {
        const query = `
            SELECT p.ProductID, p.ProductName, SUM(od.Quantity) AS TotalOrderedQuantity
            FROM Products p
            JOIN Order_Details od ON p.ProductID = od.ProductID
            GROUP BY p.ProductID, p.ProductName
            ORDER BY TotalOrderedQuantity DESC;
        `;
    
        const [rows] = await db.query(query);
        return rows;
    }
    
};

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
    }
};

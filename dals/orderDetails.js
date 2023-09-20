const db = require('../db/config');

module.exports = {
    createOrderDetail: async (orderId, productId, quantity) => {
        const query = 'INSERT INTO Order_Details (OrderID, ProductID, Quantity) VALUES (?, ?, ?)';
        await db.query(query, [orderId, productId, quantity]);
    },

    getOrderDetail: async (orderId, productId) => {
        const query = 'SELECT * FROM Order_Details WHERE OrderID = ? AND ProductID = ?';
        const [rows] = await db.query(query, [orderId, productId]);
        return rows[0];
    },

    updateOrderDetail: async (orderId, productId, data) => {
        const query = 'UPDATE Order_Details SET ? WHERE OrderID = ? AND ProductID = ?';
        await db.query(query, [data, orderId, productId]);
    },

    deleteOrderDetail: async (orderId, productId) => {
        const query = 'DELETE FROM Order_Details WHERE OrderID = ? AND ProductID = ?';
        await db.query(query, [orderId, productId]);
    },
    getAllOrderDetailsForOrder: async (orderId) => {
        const query = 'SELECT * FROM Order_Details WHERE OrderID = ?';
        const [rows] = await db.query(query, [orderId]);
        return rows;
    }
    
};

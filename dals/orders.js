const db = require('../db/config');

module.exports = {
    createOrder: async (userId, recipientName, address, date, total) => {
        const query = 'INSERT INTO Orders (UserID, RecipientName, Address, Date, Total) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [userId, recipientName, address, date, total]);
    },

    getOrderById: async (orderId) => {
        const query = 'SELECT * FROM Orders WHERE OrderID = ?';
        const [rows] = await db.query(query, [orderId]);
        return rows[0];
    },

    updateOrder: async (orderId, data) => {
        const query = 'UPDATE Orders SET ? WHERE OrderID = ?';
        await db.query(query, [data, orderId]);
    },

    deleteOrder: async (orderId) => {
        const query = 'DELETE FROM Orders WHERE OrderID = ?';
        await db.query(query, [orderId]);
    },
    getAllOrdersForUser: async (userId) => {
        const query = 'SELECT * FROM Orders WHERE UserID = ?';
        const [rows] = await db.query(query, [userId]);
        return rows;
    },
    
    getAllOrders: async () => {
        const query = 'SELECT * FROM Orders';
        const [rows] = await db.query(query);
        return rows;
    }
};

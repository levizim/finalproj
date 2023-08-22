const db = require('../db/config');

module.exports = {
    createReview: async (userId, productId, text, rating, approved) => {
        const query = 'INSERT INTO Reviews (UserID, ProductID, Text, Rating, Approved) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [userId, productId, text, rating, approved]);
    },

    getReviewById: async (reviewId) => {
        const query = 'SELECT * FROM Reviews WHERE ReviewID = ?';
        const [rows] = await db.query(query, [reviewId]);
        return rows[0];
    },

    updateReview: async (reviewId, data) => {
        const query = 'UPDATE Reviews SET ? WHERE ReviewID = ?';
        await db.query(query, [data, reviewId]);
    },

    deleteReview: async (reviewId) => {
        const query = 'DELETE FROM Reviews WHERE ReviewID = ?';
        await db.query(query, [reviewId]);
    }
};

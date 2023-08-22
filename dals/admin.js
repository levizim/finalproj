const db = require('../db/config');

module.exports = {
    createAdmin: async (adminName, password) => {
        const query = 'INSERT INTO Admin (AdminName, Password) VALUES (?, ?)';
        await db.query(query, [adminName, password]);
    },

    getAdminById: async (adminId) => {
        const query = 'SELECT * FROM Admin WHERE AdminID = ?';
        const [rows] = await db.query(query, [adminId]);
        return rows[0];
    },

    updateAdmin: async (adminId, data) => {
        const query = 'UPDATE Admin SET ? WHERE AdminID = ?';
        await db.query(query, [data, adminId]);
    },

    deleteAdmin: async (adminId) => {
        const query = 'DELETE FROM Admin WHERE AdminID = ?';
        await db.query(query, [adminId]);
    }
};

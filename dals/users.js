const db = require('../db/config');
//const bcrypt = require('bcrypt');  // Make sure you've installed bcrypt: `npm install bcrypt`

module.exports = {
    // Create a user
    createUser: async (userName, email, password, address) => {
        const query = 'INSERT INTO Users (UserName, Email, Password, Address) VALUES (?, ?, ?, ?)';
        await db.query(query, [userName, email, password, address]);
    },
    

    // Fetch a user by ID
    getUserById: async (userId) => {
        const query = 'SELECT * FROM Users WHERE UserID = ?';
        const [rows] = await db.query(query, [userId]);
        return rows[0];
    },

    // Login a user
    loginUser: async (email, password) => {
        const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
        const [rows] = await db.query(query, [email, password]);
        return rows[0];
    }
    ,

    // Update a user by ID
    updateUser: async (userId, data) => {
        const query = 'UPDATE Users SET ? WHERE UserID = ?';
        await db.query(query, [data, userId]);
    },

    // Delete a user by ID
    deleteUser: async (userId) => {
        const query = 'DELETE FROM Users WHERE UserID = ?';
        await db.query(query, [userId]);
    }
};

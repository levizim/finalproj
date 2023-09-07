const db = require('../db/config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    },
    getUserByEmail: async (email) => {
        const query = 'SELECT * FROM Users WHERE Email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0];
    },
// Reset password
    // Update a user by ID
    updateUser: async (userId, data) => {
        const query = 'UPDATE Users SET ? WHERE UserID = ?';
        await db.query(query, [data, userId]);
    },
    // store reset token from a user
    setResetToken: async (email) => {
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour
    
        const query = 'UPDATE Users SET resetToken = ?, resetTokenExpires = ? WHERE Email = ?';
        await db.query(query, [resetToken, resetTokenExpires, email]);
        return resetToken;
    },
    // Reset user password
resetPassword: async (token, newPassword) => {
    console.log("Received newPassword:", newPassword);
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query = 'UPDATE Users SET Password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE resetToken = ?';
    await db.query(query, [hashedPassword, token]);
},
    // Fetch a user by reset token
getUserByResetToken: async (token) => {
    const query = 'SELECT * FROM Users WHERE resetToken = ? AND resetTokenExpires > NOW()';
    const [rows] = await db.query(query, [token]);
    return rows[0];
},


    // Delete a user by ID
    deleteUser: async (userId) => {
        const query = 'DELETE FROM Users WHERE UserID = ?';
        await db.query(query, [userId]);
    }
};

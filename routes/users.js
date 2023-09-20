const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    createUser, loginUser, getUserById, updateUser, deleteUser, getUserByEmail, resetPassword
} = require('../dals/users');
var express = require('express');
var router = express.Router();

const JWT_SECRET = 'YOUR_SECRET_KEY';  // Better stored in environment variables
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nico.hegmann@ethereal.email',
        pass: '3V23KhtBHvqSDE5S5q'
    }
});
function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
}



// Register user
router.post('/register', async (req, res) => {
    try {
        const { userName, email, password, address } = req.body;
        await createUser(userName, email, password, address);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        if (user) {
            const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });
            delete user.password;
            res.json({ token, user });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user details
router.get('/:userId', isAuthenticated, async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (user) {
            delete user.password; // Omit password from response
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user
router.put('/:userId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        await updateUser(userId, userData);
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Request password reset
router.post('/request-reset', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const token = jwt.sign({ userId: user.UserID, purpose: 'passwordReset' }, JWT_SECRET, { expiresIn: '1h' });
        const mailOptions = {
            from: 'no-reply@yourapp.com',
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) requested a password reset for your account.
                    Please click on the following link, or paste it into your browser to complete the process:
                    http://localhost:3001/reset/${token}
                    If you did not request this, please ignore this email and your password will remain unchanged.`
        };

        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.error('Email error:', error);
                return res.status(500).json({ error: 'Email sending failed' });
            }
            res.json({ message: "Password reset link sent successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/reset', async (req, res) => {
    const { token, password } = req.body;

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err || decoded.purpose !== 'passwordReset') {
            return res.status(400).json({ error: "Token is invalid or has expired" });
        }

        try {
            await resetPassword(decoded.userId, password);
            res.json({ message: "Password reset successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});


router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
});

// Delete user
router.delete('/:userId', async (req, res) => {
    try {
        await deleteUser(req.params.userId);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

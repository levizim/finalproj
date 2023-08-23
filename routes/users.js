const { createUser, loginUser, getUserById, updateUser, deleteUser } = require('../dals/users');
var express = require('express');
var router = express.Router();


function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ error: "You are not authenticated" });
    }
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
            // Save user data in session
            req.session.user = {
                userName: user.userName,
                email: user.email,
                userId: user.UserID,
                address: user.address
            };

            // For security, omit the password from the response
            delete user.password;
            res.json(user);
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

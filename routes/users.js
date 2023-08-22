const { createUser, loginUser, getUserById, updateUser, deleteUser } = require('../dals/users');
var express = require('express');
var router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { userName, email, password, address} = req.body;
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
        if(user) {
            // For security, we can omit the password from the response
            delete user.Password;
            res.json(user);
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user details
router.get('/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if(user) {
            delete user.Password; // Omit password from response
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user
router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        await updateUser(userId, userData);
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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

router.get('/is-authenticated', function(req, res) {
  // Placeholder logic. Normally, you'd check the request headers or session for a valid token.
  const isAuthenticated = false; // placeholder; replace with actual authentication logic.
  res.json({ isAuthenticated: isAuthenticated });
});

module.exports = router;

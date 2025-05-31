const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        // TODO: Implémenter la logique de connexion
        res.json({ message: 'Route de connexion' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        // TODO: Implémenter la logique d'inscription
        res.json({ message: 'Route d\'inscription' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
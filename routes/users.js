const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Route protégée pour obtenir le profil utilisateur
router.get('/profile', auth, async (req, res) => {
    try {
        // TODO: Implémenter la logique de récupération du profil
        res.json({ message: 'Profil utilisateur' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
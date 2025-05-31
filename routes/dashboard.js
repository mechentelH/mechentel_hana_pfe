const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        res.json({ message: 'Données du tableau de bord' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuration de MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mechentel_hana';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connecté à MongoDB');
    console.log('URI de connexion:', MONGODB_URI);
})
.catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
});

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/soins', require('./routes/soins'));
app.use('/api/rdvs', require('./routes/rdvs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/ordonnances', require('./routes/ordonnances'));
app.use('/api/fiches-medicales', require('./routes/fiches-medicales'));

// Route pour le dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard-patient.html'));
});

// Route pour le dashboard médecin
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard-med.html'));
});

// Route pour servir les fichiers statiques
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({ 
        message: 'Erreur serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue',
        details: process.env.NODE_ENV === 'development' ? {
            name: err.name,
            code: err.code,
            stack: err.stack
        } : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log('Mode:', process.env.NODE_ENV || 'development');
}); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const auth = require('./middleware/auth');
const ordonnancesRouter = require('./routes/ordonnances');
const fichesMedicalesRouter = require('./routes/fiches-medicales');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/temoignages', require('./routes/temoignages'));
app.use('/api/soins', require('./routes/soins'));
app.use('/api/rdv', require('./routes/rdv'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/ordonnances', ordonnancesRouter);
app.use('/api/fiches-medicales', fichesMedicalesRouter);

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({
        message: 'Erreur serveur',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`API disponible à http://localhost:${PORT}`);
}); 
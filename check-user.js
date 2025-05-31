const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');

const User = require('./models/User');

async function checkUser() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB');

        // Recherche de l'utilisateur
        const user = await User.findOne({ email: 'brahmiayanis3@gmail.com' });
        console.log('Utilisateur trouvé:', user);

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkUser(); 
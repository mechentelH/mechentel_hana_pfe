const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mechentel_hana', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Fonction pour créer un administrateur
async function createAdmin() {
    try {
        const adminData = {
            patientId: 'ADMIN001',
            email: 'admin@example.com',
            password: 'Admin123!',
            nom: 'Administrateur',
            dateNaissance: new Date('1990-01-01'),
            sexe: 'M',
            telephone: '0123456789',
            adresse: '123 Rue Admin',
            contactUrgence: {
                nom: 'Contact Admin',
                telephone: '0987654321'
            },
            role: 'admin'
        };

        // Vérifier si l'admin existe déjà
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Un administrateur avec cet email existe déjà');
            process.exit(1);
        }

        // Créer le nouvel admin
        const admin = await User.create(adminData);
        console.log('Administrateur créé avec succès:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la création de l\'administrateur:', error);
        process.exit(1);
    }
}

// Exécuter la fonction
createAdmin(); 
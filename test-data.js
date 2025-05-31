const mongoose = require('mongoose');
const Ordonnance = require('./models/Ordonnance');
const FicheMedicale = require('./models/FicheMedicale');

// Configuration de MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/mechentel_hana';

// ID de test (utilisez un ID existant de votre base de données)
const TEST_PATIENT_ID = '6830fdf34c5daba89e29d2f2';
const TEST_MEDECIN_ID = '123456789'; // Remplacez par un ID de médecin valide
const TEST_PATIENT_NAME = 'John Doe'; // Nom du patient de test

async function insertTestData() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB');

        // Créer une ordonnance de test
        const ordonnance = new Ordonnance({
            patientId: TEST_PATIENT_ID,
            nomPatient: TEST_PATIENT_NAME,
            medecinId: TEST_MEDECIN_ID,
            medicaments: [
                {
                    medicament: 'Paracétamol',
                    posologie: '1 comprimé 3 fois par jour'
                },
                {
                    medicament: 'Ibuprofène',
                    posologie: '1 comprimé 2 fois par jour'
                }
            ],
            notes: 'À prendre pendant les repas'
        });

        await ordonnance.save();
        console.log('Ordonnance de test créée:', ordonnance);

        // Créer une fiche médicale de test
        const ficheMedicale = new FicheMedicale({
            patientId: TEST_PATIENT_ID,
            nomPatient: TEST_PATIENT_NAME,
            medecinId: TEST_MEDECIN_ID,
            soins: [
                {
                    description: 'Consultation générale',
                    prix: 50
                },
                {
                    description: 'Vaccination grippe',
                    prix: 25
                }
            ],
            notes: 'Patient en bonne santé générale'
        });

        await ficheMedicale.save();
        console.log('Fiche médicale de test créée:', ficheMedicale);

        console.log('Données de test insérées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de test:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Déconnecté de MongoDB');
    }
}

// Exécuter la fonction
insertTestData(); 
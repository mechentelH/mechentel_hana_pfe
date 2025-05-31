const fetch = require('node-fetch');

async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'brahmiayanis3@gmail.com',
                password: 'nissou23'
            })
        });

        const data = await response.json();
        console.log('Réponse du serveur:', data);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

testLogin(); 
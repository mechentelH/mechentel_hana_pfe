document.addEventListener('DOMContentLoaded', function () {
    // Charger la barre de navigation
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            // Insérer la barre de navigation au début du body
            document.body.insertAdjacentHTML('afterbegin', html);

            // Mettre à jour les liens pour utiliser le chemin correct
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                if (link.getAttribute('href') && !link.getAttribute('href').startsWith('http')) {
                    link.setAttribute('href', link.getAttribute('href'));
                }
            });

            // Mettre à jour les images pour utiliser le chemin correct
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.getAttribute('src') && !img.getAttribute('src').startsWith('http')) {
                    img.setAttribute('src', img.getAttribute('src'));
                }
            });

            // Mettre à jour la barre de navigation
            updateNavbar();
        })
        .catch(error => console.error('Erreur lors du chargement de la barre de navigation:', error));
}); 
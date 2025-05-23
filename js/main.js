// Animation des cartes au défilement
function animateCards() {
    const cards = document.querySelectorAll('.soins-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });
}

// Animation du titre au défilement
function animateTitle() {
    const titles = document.querySelectorAll('.soins-header h1, .soins-header p');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    titles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(title);
    });
}

// Gestion des images
function handleImages() {
    const images = document.querySelectorAll('.soins-image');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'images/placeholder.jpg';
        });
    });
}

// Gestion des boutons de réservation
function handleBookingButtons() {
    const buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const service = button.closest('.soins-card').querySelector('.soins-title').textContent;
            const price = button.closest('.soins-card').querySelector('.soins-price').textContent;
            localStorage.setItem('selectedService', service);
            localStorage.setItem('selectedPrice', price);
            window.location.href = 'rdv.html';
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateCards();
    animateTitle();
    handleImages();
    handleBookingButtons();
}); 
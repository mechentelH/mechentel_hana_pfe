// Création de la barre de navigation
function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    navbar.innerHTML = `
        <div class="logo">
            <a href="index.html">
                <img src="logo.png" alt="Dr Kemmouche Logo">
            </a>
        </div>
        <div class="nav-links">
            <a href="index.html">Accueil</a>
            <a href="index.html#about">À propos</a>
            <a href="index.html#cabinet">Cabinet</a>
            <div class="dropdown">
                <a href="#" class="dropdown-trigger">Soins</a>
                <div class="dropdown-content">
                    <a href="soins-peau.html">Soins pour la peau</a>
                    <a href="soins-cheveux.html">Soins pour les cheveux</a>
                </div>
            </div>
            <a href="articles.html">Articles</a>
            <a href="temoignages.html">Témoignages</a>
            <a href="rdv.html">Rendez-vous</a>
            <a href="login.html">Connexion</a>
        </div>
        <button class="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    `;

    // Ajout de la barre de navigation au début du body
    document.body.insertBefore(navbar, document.body.firstChild);

    // Ajout des styles CSS pour la barre de navigation
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.5s ease-out;
        }

        .logo img {
            height: 50px;
            transition: var(--transition);
            filter: drop-shadow(0 0 10px rgba(164, 69, 164, 0.5));
        }

        .logo img:hover {
            transform: scale(1.05) rotate(-2deg);
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            color: var(--text-color);
            text-decoration: none;
            font-weight: 500;
            position: relative;
            padding: 0.5rem 0;
            transition: var(--transition);
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            transition: var(--transition);
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
            width: 100%;
        }

        .nav-links a:hover {
            color: var(--secondary-color);
            transform: translateY(-2px);
        }

        .dropdown {
            position: relative;
        }

        .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            min-width: 220px;
            border-radius: 12px;
            padding: 0.8rem 0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: var(--transition);
            box-shadow: var(--shadow);
            border: 1px solid rgba(164, 69, 164, 0.2);
        }

        .dropdown:hover .dropdown-content {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-content a {
            display: block;
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
            transition: var(--transition);
        }

        .dropdown-content a:hover {
            background: rgba(164, 69, 164, 0.1);
            padding-left: 2rem;
        }

        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 21px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
        }

        .mobile-menu-btn span {
            width: 100%;
            height: 3px;
            background: var(--text-color);
            border-radius: 3px;
            transition: var(--transition);
        }

        @keyframes slideDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .navbar {
                padding: 1rem;
            }

            .mobile-menu-btn {
                display: flex;
            }

            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background: var(--glass-bg);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 6rem 2rem 2rem;
                transition: var(--transition);
                box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
            }

            .nav-links.active {
                right: 0;
            }

            .nav-links a {
                width: 100%;
                text-align: left;
                padding: 1rem 0;
            }

            .dropdown-content {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                background: transparent;
                box-shadow: none;
                border: none;
                padding-left: 1rem;
                display: none;
            }

            .dropdown.active .dropdown-content {
                display: block;
            }

            .mobile-menu-btn.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }

            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-btn.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    `;

    document.head.appendChild(style);

    // Ajout de la classe active à la page courante
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Gestion du menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // Fermer le menu mobile lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinksContainer.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', createNavbar); 
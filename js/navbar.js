// Fonction pour créer la barre de navigation
function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    // Récupérer le token et les informations utilisateur
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Logo et lien vers l'accueil
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = '<a href="index.html"><img src="logo.png" alt="Dr Kemmouche"></a>';
    navbar.appendChild(logo);

    // Liens de navigation
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';

    // Liens communs
    const commonLinks = [
        { href: 'index.html', text: 'Accueil' },
        { href: 'soins-peau.html', text: 'Soins Peau' },
        { href: 'soins-cheveux.html', text: 'Soins Cheveux' },
        { href: 'temoignages.html', text: 'Témoignages' }
    ];

    // Ajouter les liens communs
    commonLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        if (window.location.pathname.includes(link.href)) {
            a.classList.add('active');
        }
        navLinks.appendChild(a);
    });

    // Menu déroulant pour les soins
    const soinsDropdown = document.createElement('div');
    soinsDropdown.className = 'dropdown';
    soinsDropdown.innerHTML = `
        <a href="#">Soins <i class="fas fa-chevron-down"></i></a>
        <div class="dropdown-content">
            <a href="soins-peau.html">Soins de la peau</a>
            <a href="soins-cheveux.html">Soins des cheveux</a>
        </div>
    `;
    navLinks.appendChild(soinsDropdown);

    // Liens spécifiques selon le rôle de l'utilisateur
    if (token) {
        if (user.role === 'admin') {
            const adminLinks = [
                { href: 'dashboard-med.html', text: 'Tableau de bord' },
                { href: 'listesPatients.html', text: 'Patients' }
            ];
            adminLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                if (window.location.pathname.includes(link.href)) {
                    a.classList.add('active');
                }
                navLinks.appendChild(a);
            });
        } else if (user.role === 'patient') {
            const patientLinks = [
                { href: 'patient-dashboard.html', text: 'Mon espace' },
                { href: 'rendez-vous.html', text: 'Rendez-vous' }
            ];
            patientLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                if (window.location.pathname.includes(link.href)) {
                    a.classList.add('active');
                }
                navLinks.appendChild(a);
            });
        }

        // Bouton de déconnexion
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Déconnexion';
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        };
        navLinks.appendChild(logoutBtn);
    } else {
        // Liens pour les utilisateurs non connectés
        const authLinks = [
            { href: 'login.html', text: 'Connexion' },
            { href: 'inscription.html', text: 'Inscription' }
        ];
        authLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (window.location.pathname.includes(link.href)) {
                a.classList.add('active');
            }
            navLinks.appendChild(a);
        });
    }

    navbar.appendChild(navLinks);

    // Ajouter la barre de navigation au début du body
    document.body.insertBefore(navbar, document.body.firstChild);

    // Ajouter le style CSS pour la barre de navigation
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
        }

        .logo img {
            height: 50px;
            transition: var(--transition);
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

        .dropdown {
            position: relative;
        }

        .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            min-width: 200px;
            border-radius: 8px;
            padding: 0.5rem 0;
            display: none;
            box-shadow: var(--shadow);
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            display: block;
            padding: 0.5rem 1rem;
        }

        .dropdown-content a:hover {
            background: rgba(164, 69, 164, 0.1);
        }

        @media (max-width: 768px) {
            .navbar {
                padding: 1rem;
            }

            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Appeler la fonction au chargement du DOM
document.addEventListener('DOMContentLoaded', createNavbar); 
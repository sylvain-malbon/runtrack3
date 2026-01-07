// Fonction pour mettre à jour la navigation
function updateNavigation() {
    const currentPage = window.location.hash.slice(1) || 'accueil';
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    const isLoggedIn = currentUser !== null;
    const userRole = currentUser ? currentUser.role : null;

    // Retirer toutes les classes active
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('font-bold', 'border-b-2', 'border-white', 'bg-blue-700');
    });

    // Ajouter active à la page courante
    const activeLink = document.querySelector(`nav ul li a[href="#${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('font-bold', 'border-b-2', 'border-white', 'bg-blue-700');
    }

    // Gérer la visibilité des onglets
    const navInscription = document.getElementById('nav-inscription');
    const navConnexion = document.getElementById('nav-connexion');
    const navDeconnexion = document.getElementById('nav-deconnexion');
    const navCalendrier = document.getElementById('nav-calendrier');
    const navDemandes = document.getElementById('nav-demandes');
    const navAdmin = document.getElementById('nav-admin');

    if (navInscription) navInscription.style.display = isLoggedIn ? 'none' : 'block';
    if (navConnexion) navConnexion.style.display = isLoggedIn ? 'none' : 'block';
    if (navDeconnexion) navDeconnexion.style.display = isLoggedIn ? 'block' : 'none';
    if (navCalendrier) navCalendrier.style.display = isLoggedIn ? 'block' : 'none';
    if (navDemandes) navDemandes.style.display = isLoggedIn ? 'block' : 'none';
    if (navAdmin) navAdmin.style.display = (isLoggedIn && ['superadmin', 'admin', 'moderator'].includes(userRole)) ? 'block' : 'none';

    // Afficher le message de bienvenue
    const userWelcome = document.getElementById('user-welcome');
    const userWelcomeText = document.getElementById('user-welcome-text');
    if (userWelcome && userWelcomeText) {
        if (isLoggedIn && currentUser.prenom && currentUser.nom) {
            userWelcomeText.textContent = `Bonjour ${currentUser.prenom} ${currentUser.nom}`;
            userWelcome.style.display = 'flex';
        } else {
            userWelcome.style.display = 'none';
        }
    }
}

// Écouter les changements de hash
window.addEventListener('hashchange', () => {
    updateNavigation();
});

// Au chargement de la page
document.addEventListener('DOMContentLoaded', updateNavigation);
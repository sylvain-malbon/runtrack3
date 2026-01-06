// Fonction pour mettre à jour la navigation
function updateNavigation() {
    const currentPage = window.location.hash.slice(1) || 'accueil';
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    const isLoggedIn = currentUser !== null;
    const userRole = currentUser ? currentUser.role : null;

    // Retirer toutes les classes active
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Ajouter active à la page courante (uniquement dans navbar-nav)
    const activeLink = document.querySelector(`.navbar-nav [href="#${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
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
}

// Écouter les changements de hash
window.addEventListener('hashchange', () => {
    updateNavigation();
});

// Au chargement de la page
document.addEventListener('DOMContentLoaded', updateNavigation);
function initRouter() {
    console.log("🚀 Router initialisé");

    // Cacher toutes les sections
    function hideAllSections() {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
    }

    // Afficher une section
    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
            console.log(`✅ Section affichée: ${sectionId}`);

            // Charger le contenu spécifique de la section
            if (sectionId === 'admin' && typeof loadAdminPanel === 'function') {
                console.log("🔧 Chargement du panel admin...");
                loadAdminPanel();
            }
            if (sectionId === 'mes-demandes' && typeof loadUserRequests === 'function') {
                loadUserRequests();
            }
        } else {
            console.warn(`⚠️ Section introuvable: ${sectionId}`);
        }
    }

    // Gérer le changement de route
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'accueil';
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        const isLoggedIn = currentUser !== null;

        console.log(`📍 Route: ${hash} | Connecté: ${isLoggedIn} | Rôle: ${currentUser?.role || 'none'}`);

        // Routes protégées
        const protectedRoutes = ['calendrier', 'mes-demandes'];
        const adminRoutes = ['admin'];

        // Redirection si non connecté
        if (protectedRoutes.includes(hash) && !isLoggedIn) {
            console.log("🔒 Redirection vers connexion (non connecté)");
            window.location.hash = '#connexion';
            return;
        }

        // Redirection si non admin/moderator/superadmin
        if (adminRoutes.includes(hash) && (!isLoggedIn || !['superadmin', 'admin', 'moderator'].includes(currentUser.role))) {
            console.log(`🔒 Redirection vers accueil (rôle: ${currentUser?.role || 'none'})`);
            window.location.hash = '#accueil';
            return;
        }

        showSection(hash);

        // Mettre à jour la navigation après affichage de la section
        if (typeof updateNavigation === 'function') {
            updateNavigation();
        }
    }

    // Écouter les changements de hash
    window.addEventListener('hashchange', handleRoute);

    // Route initiale
    handleRoute();
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initRouter);

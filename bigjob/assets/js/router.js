function navigate() {
    const hash = window.location.hash || "#login";

    // Déconnexion (fallback si logout n'existe pas)
    if (hash === "#logout") {
        if (typeof logout === "function") {
            logout();
        } else {
            sessionStorage.removeItem("currentUser");
            window.location.hash = "#login";
        }
        return;
    }

    const publicPages = ["#login", "#register"];
    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Protection des pages privées
    if (!user && !publicPages.includes(hash)) {
        window.location.hash = "#login";
        return;
    }

    // Protection de la page admin
    if (hash === "#admin" && user?.role !== "admin" && user?.role !== "moderator") {
        alert("Accès réservé aux modérateurs et administrateurs");
        window.location.hash = "#calendar";
        return;
    }

    // Affichage des sections
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    const page = document.querySelector(hash);
    if (!page) { // hash inconnu -> redirection par défaut selon session
        window.location.hash = user ? "#calendar" : "#login";
        return;
    }
    page.classList.remove("hidden");

    // Chargement des données selon la page (sécurisé)
    if (hash === "#admin") {
        if (typeof loadAdminRequests === "function") loadAdminRequests();
        if (typeof loadAdminUsers === "function") loadAdminUsers();
    }

    if (hash === "#requests") {
        if (typeof loadUserRequests === "function") loadUserRequests();
    }
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);

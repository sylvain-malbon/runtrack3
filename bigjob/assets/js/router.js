function navigate() {
    const hash = window.location.hash || "#login";

    // Déconnexion
    if (hash === "#logout") {
        logout();
        return;
    }

    const publicPages = ["#login", "#register"];

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Protection des pages privées
    if (!user && !publicPages.includes(hash)) {
        window.location.hash = "#login";
        return;
    }

    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));

    const page = document.querySelector(hash);
    if (page) page.classList.remove("hidden");
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);

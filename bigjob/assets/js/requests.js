function loadUserRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) return;

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const mine = requests.filter(r => r.userId === user.id);

    const container = document.getElementById("requests-list");
    if (!container) return;

    container.innerHTML = "";

    if (mine.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">Aucune demande</p>';
        return;
    }

    mine.forEach(r => {
        const div = document.createElement("div");
        div.className = "flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3";

        const statusText = r.status === 'pending' ? 'En attente' :
            r.status === 'approved' ? 'Acceptée' : 'Refusée';
        const statusClass = r.status === "approved" ? "bg-green-600" :
            r.status === "refused" ? "bg-red-600" : "bg-yellow-600";

        div.innerHTML = `
            <span class="text-gray-700 font-medium">${new Date(r.date).toLocaleDateString('fr-FR')}</span>
            <span class="px-3 py-1 rounded-lg text-sm font-semibold text-white ${statusClass}">
                ${statusText}
            </span>
        `;

        container.appendChild(div);
    });
}

window.addEventListener("hashchange", () => {
    if (window.location.hash === "#mes-demandes") loadUserRequests();
});

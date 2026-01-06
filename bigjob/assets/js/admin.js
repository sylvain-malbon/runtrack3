/* ============================
   BACKOFFICE : DEMANDES + RÔLES
   ============================ */

/* ----------- DEMANDES ----------- */

function loadAdminRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || (user.role !== "admin" && user.role !== "moderator")) return;

    const requests = getRequests();
    const pending = requests.filter(r => r.status === "pending");

    const container = document.getElementById("admin-requests");
    if (!container) return; // garde conteneur
    container.innerHTML = "";

    pending.forEach(r => {
        const div = document.createElement("div");

        // Responsive + anti-chevauchement
        div.className =
            "p-4 bg-white shadow mb-3 rounded-xl border border-gray-100 " +
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";

        div.innerHTML = `
            <span class="text-gray-700 font-medium break-words">
                ${r.date} — user ${r.userId}
            </span>

            <div class="flex flex-wrap gap-2">
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                    onclick="approve(${r.id})">Accepter</button>

                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                    onclick="refuse(${r.id})">Refuser</button>
            </div>
        `;

        container.appendChild(div);
    });
}

function approve(id) {
    const actor = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!actor || (actor.role !== "admin" && actor.role !== "moderator")) return; // garde rôle

    const rid = Number(id);
    if (!Number.isInteger(rid)) return;

    const requests = getRequests();
    const req = requests.find(r => Number(r.id) === rid && r.status === "pending");
    if (!req) return;

    req.status = "approved";
    saveRequests(requests);

    loadAdminRequests();
    if (typeof loadUserRequests === "function") loadUserRequests();
}

function refuse(id) {
    const actor = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!actor || (actor.role !== "admin" && actor.role !== "moderator")) return; // garde rôle

    const rid = Number(id);
    if (!Number.isInteger(rid)) return;

    const requests = getRequests();
    const req = requests.find(r => Number(r.id) === rid && r.status === "pending");
    if (!req) return;

    req.status = "refused";
    saveRequests(requests);

    loadAdminRequests();
    if (typeof loadUserRequests === "function") loadUserRequests();
}


/* ----------- GESTION DES RÔLES ----------- */

function loadAdminUsers() {
    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!current || current.role !== "admin") return;

    const users = getUsers();
    const container = document.getElementById("admin-users");
    if (!container) return; // garde conteneur
    container.innerHTML = "";

    // Tri par rôle (robuste si rôle inattendu)
    const roleOrder = { admin: 1, moderator: 2, user: 3 };
    const sorted = [...users].sort((a, b) => (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99));

    sorted.forEach(u => {
        const isCurrentUser = u.id === current.id;
        const div = document.createElement("div");

        // Card avec highlight si c'est l'utilisateur connecté
        div.className = `
            p-5 bg-white shadow rounded-xl border mb-3
            flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
            transition-all hover:shadow-lg
            ${isCurrentUser ? 'border-plateforme-blue border-2 bg-blue-50/30' : 'border-gray-200'}
        `;

        div.innerHTML = `
            <!-- Infos utilisateur -->
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <span class="text-plateforme-dark font-bold text-base">
                        ${u.prenom || ""} ${u.nom || ""}
                    </span>
                    ${isCurrentUser ? '<span class="px-2 py-0.5 bg-plateforme-blue text-white text-xs font-semibold rounded">VOUS</span>' : ''}
                </div>
                
                <span class="text-gray-600 text-sm break-words">${u.email}</span>

                <span class="inline-block w-fit px-3 py-1 rounded-full text-xs font-bold text-white
                    ${u.role === "admin" ? "bg-plateforme-dark" : ""}
                    ${u.role === "moderator" ? "bg-plateforme-blue" : ""}
                    ${u.role === "user" ? "bg-gray-500" : ""}">
                    ${u.role.toUpperCase()}
                </span>
            </div>

            <!-- Boutons de rôle -->
            <div class="flex flex-wrap gap-2">
                <button 
                    class="px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${u.role === "user"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow"}"
                    onclick="demoteUser(${u.id})"
                    ${u.role === "user" ? "disabled" : ""}>
                    ${u.role === "user" ? "✓ " : ""}User
                </button>

                <button 
                    class="px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${u.role === "moderator"
                ? "bg-blue-200 text-blue-700 cursor-not-allowed"
                : "bg-plateforme-blue text-white hover:bg-blue-700 hover:shadow"}"
                    onclick="promoteModerator(${u.id})"
                    ${u.role === "moderator" ? "disabled" : ""}>
                    ${u.role === "moderator" ? "✓ " : ""}Modérateur
                </button>

                <button 
                    class="px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${u.role === "admin"
                ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                : "bg-plateforme-dark text-white hover:bg-black hover:shadow"}"
                    onclick="promoteAdmin(${u.id})"
                    ${u.role === "admin" ? "disabled" : ""}>
                    ${u.role === "admin" ? "✓ " : ""}Admin
                </button>
            </div>
        `;

        container.appendChild(div);
    });
}

function promoteAdmin(userId) {
    updateUserRole(userId, "admin");
}

function promoteModerator(userId) {
    updateUserRole(userId, "moderator");
}

function demoteUser(userId) {
    updateUserRole(userId, "user");
}

function updateUserRole(userId, newRole) {
    const allowed = ["admin", "moderator", "user"];
    if (!allowed.includes(newRole)) return;

    const uid = Number(userId);
    if (!Number.isInteger(uid)) return;

    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    if (current && current.id === uid) {
        showNotification("Action non autorisée : vous ne pouvez pas modifier votre propre rôle");
        return;
    }

    const users = getUsers();
    const user = users.find(u => Number(u.id) === uid);
    if (!user) return;

    const oldRole = user.role;
    user.role = newRole;

    saveUsers(users);

    // Feedback visuel
    showNotification(`${user.prenom} ${user.nom} : ${oldRole} → ${newRole}`);

    loadAdminUsers();
}

function showNotification(message) {
    const notif = document.createElement("div");
    notif.className = "fixed top-4 right-4 bg-plateforme-blue text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    notif.textContent = message;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add("animate-fade-out");
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// Helpers de persistance locale (localStorage = source de vérité)
function getRequests() {
    return JSON.parse(localStorage.getItem("requests")) || [];
}

function saveRequests(requests) {
    localStorage.setItem("requests", JSON.stringify(requests));
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Aucune occurrence de 'fetch' dans ce fichier.

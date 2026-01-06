/* ============================
   BACKOFFICE : DEMANDES + RÔLES
   ============================ */

/* ----------- DEMANDES ----------- */

function loadAdminRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || (user.role !== "admin" && user.role !== "moderator")) return;

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const pending = requests.filter(r => r.status === "pending");

    const container = document.getElementById("admin-requests");
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
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const req = requests.find(r => r.id === id);
    if (!req) return;

    req.status = "approved";
    localStorage.setItem("requests", JSON.stringify(requests));

    loadAdminRequests();
    if (typeof loadUserRequests === "function") loadUserRequests();
}

function refuse(id) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const req = requests.find(r => r.id === id);
    if (!req) return;

    req.status = "refused";
    localStorage.setItem("requests", JSON.stringify(requests));

    loadAdminRequests();
    if (typeof loadUserRequests === "function") loadUserRequests();
}


/* ----------- GESTION DES RÔLES ----------- */

function loadAdminUsers() {
    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!current || current.role !== "admin") return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const container = document.getElementById("admin-users");

    // Trier les utilisateurs par rôle (admin > moderator > user)
    const roleOrder = { "admin": 1, "moderator": 2, "user": 3 };
    const sortedUsers = [...users].sort((a, b) =>
        roleOrder[a.role] - roleOrder[b.role]
    );

    // Compter les utilisateurs par rôle
    const counts = {
        admin: users.filter(u => u.role === "admin").length,
        moderator: users.filter(u => u.role === "moderator").length,
        user: users.filter(u => u.role === "user").length
    };

    // Créer le tableau HTML
    container.innerHTML = `
        <!-- Statistiques -->
        <div class="mb-4 flex flex-wrap gap-3">
            <div class="px-4 py-2 rounded-lg bg-purple-100 border border-purple-300">
                <span class="text-purple-700 font-semibold">Admins: ${counts.admin}</span>
            </div>
            <div class="px-4 py-2 rounded-lg bg-blue-100 border border-blue-300">
                <span class="text-blue-700 font-semibold">Modérateurs: ${counts.moderator}</span>
            </div>
            <div class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300">
                <span class="text-gray-700 font-semibold">Utilisateurs: ${counts.user}</span>
            </div>
        </div>

        <!-- Tableau -->
        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
                <thead>
                    <tr class="bg-gradient-to-r from-plateforme-blue to-blue-600 text-white">
                        <th class="px-4 py-3 text-left font-semibold text-sm">ID</th>
                        <th class="px-4 py-3 text-left font-semibold text-sm">Nom</th>
                        <th class="px-4 py-3 text-left font-semibold text-sm">Email</th>
                        <th class="px-4 py-3 text-center font-semibold text-sm">Rôle actuel</th>
                        <th class="px-4 py-3 text-center font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${sortedUsers.map((u, index) => `
                        <tr class="hover:bg-gray-50 transition-colors ${u.id === current.id ? 'bg-yellow-50' : ''}">
                            <td class="px-4 py-3 text-gray-600 font-mono text-sm">#${u.id}</td>
                            <td class="px-4 py-3">
                                <div class="font-medium text-gray-900">
                                    ${u.prenom || ""} ${u.nom || ""}
                                </div>
                                ${u.id === current.id ? '<span class="text-xs text-yellow-600 font-semibold">(Vous)</span>' : ''}
                            </td>
                            <td class="px-4 py-3 text-gray-700 text-sm">${u.email}</td>
                            <td class="px-4 py-3 text-center">
                                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-white
                                    ${u.role === "admin" ? "bg-purple-600" : ""}
                                    ${u.role === "moderator" ? "bg-blue-600" : ""}
                                    ${u.role === "user" ? "bg-gray-600" : ""}">
                                    ${u.role.toUpperCase()}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <div class="flex justify-center gap-2 flex-wrap">
                                    <button 
                                        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition transform hover:scale-105
                                            ${u.role === "moderator" ? "bg-blue-300 text-blue-900 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}"
                                        onclick="promoteModerator(${u.id})"
                                        ${u.role === "moderator" ? "disabled" : ""}>
                                        ${u.role === "moderator" ? "✓ " : ""}Modérateur
                                    </button>
                                    <button 
                                        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition transform hover:scale-105
                                            ${u.role === "admin" ? "bg-purple-300 text-purple-900 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"}"
                                        onclick="promoteAdmin(${u.id})"
                                        ${u.role === "admin" ? "disabled" : ""}>
                                        ${u.role === "admin" ? "✓ " : ""}Admin
                                    </button>
                                    <button 
                                        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition transform hover:scale-105
                                            ${u.role === "user" ? "bg-gray-300 text-gray-900 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-gray-700"}"
                                        onclick="demoteUser(${u.id})"
                                        ${u.role === "user" ? "disabled" : ""}>
                                        ${u.role === "user" ? "✓ " : ""}User
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function promoteModerator(id) {
    updateRole(id, "moderator");
}

function promoteAdmin(id) {
    updateRole(id, "admin");
}

function demoteUser(id) {
    updateRole(id, "user");
}

function updateRole(id, newRole) {
    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.id === id);
    if (!user) return;

    // Empêcher un admin de se rétrograder lui-même
    if (user.id === current.id && newRole !== "admin") {
        alert("⚠️ Vous ne pouvez pas modifier votre propre rôle.");
        return;
    }

    // Empêcher de cliquer si le rôle est déjà le même
    if (user.role === newRole) {
        return; // Pas d'action si le rôle est déjà attribué
    }

    const oldRole = user.role;
    user.role = newRole;
    localStorage.setItem("users", JSON.stringify(users));

    // Feedback visuel avec animation
    const container = document.getElementById("admin-users");
    const tempDiv = document.createElement("div");
    tempDiv.className = "fixed top-4 right-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-xl z-50 animate-bounce";
    tempDiv.textContent = `✓ ${user.prenom} ${user.nom} : ${oldRole} → ${newRole}`;
    document.body.appendChild(tempDiv);

    setTimeout(() => {
        tempDiv.remove();
    }, 3000);

    loadAdminUsers();
}


/* ----------- AUTO-CHARGEMENT ----------- */

window.addEventListener("hashchange", () => {
    if (window.location.hash === "#admin") {
        loadAdminRequests();
        loadAdminUsers();
    }
});

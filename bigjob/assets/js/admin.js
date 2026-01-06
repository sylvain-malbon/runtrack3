/* ============================
   BACKOFFICE : DEMANDES + RÔLES
   ============================ */

/* ----------- DEMANDES ----------- */

function loadAdminRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || (user.role !== "admin" && user.role !== "moderator")) return;

    const requests = getRequests();

    const container = document.getElementById("admin-requests");
    if (!container) return;
    container.innerHTML = "";

    const statusOrder = { pending: 1, approved: 2, refused: 3 };
    const sorted = [...requests].sort(
        (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
    );

    sorted.forEach(r => {
        const status = r.status || "pending";
        const statusClass =
            status === "approved"
                ? "bg-green-600"
                : status === "refused"
                    ? "bg-red-600"
                    : "bg-yellow-600";

        const disabledAttr = status === "pending" ? "" : "disabled";

        const div = document.createElement("div");
        div.className =
            "p-4 bg-white shadow mb-3 rounded-xl border border-gray-100 " +
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";

        div.innerHTML = `
            <div class="flex flex-col">
                <span class="text-gray-700 font-medium break-words">
                    ${r.date} — user ${r.userId}
                </span>
                <span class="mt-1 inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white ${statusClass}">
                    ${status}
                </span>
            </div>

            <div class="flex flex-wrap gap-2">
                <button ${disabledAttr}
                    class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                    onclick="approve(${r.id})">Accepter</button>

                <button ${disabledAttr}
                    class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
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

    const roleOrder = { admin: 1, moderator: 2, user: 3 };
    const sorted = [...users].sort(
        (a, b) => (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99)
    );

    sorted.forEach(u => {
        const div = document.createElement("div");
        div.className =
            "p-4 bg-white shadow mb-3 rounded-xl border border-gray-100 " +
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";

        const status = u.status || "approved";
        const statusClass =
            status === "approved"
                ? "bg-green-600"
                : status === "refused"
                    ? "bg-red-600"
                    : "bg-yellow-600";

        let actionsHtml = `
            <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                onclick="promoteAdmin(${u.id})">Admin</button>
            <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
                onclick="promoteModerator(${u.id})">Modérateur</button>
            <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-600 text-white hover:bg-gray-700 transition"
                onclick="demoteUser(${u.id})">User</button>
        `;

        // Boutons de validation de compte uniquement si pending
        if (status === "pending") {
            actionsHtml += `
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                    onclick="approveUser(${u.id})">Valider compte</button>
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                    onclick="refuseUser(${u.id})">Refuser compte</button>
            `;
        }

        div.innerHTML = `
            <div class="flex flex-col">
                <span class="text-gray-800 font-semibold">
                    ${u.prenom || ""} ${u.nom || ""} (${u.email})
                </span>
                <span class="text-gray-500 text-sm">Rôle : ${u.role}</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="px-3 py-1 rounded-lg text-sm font-semibold text-white ${statusClass}">
                    ${status}
                </span>
                <div class="flex flex-wrap gap-2">
                    ${actionsHtml}
                </div>
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

function approveUser(userId) {
    const uid = Number(userId);
    if (!Number.isInteger(uid)) return;

    const users = getUsers();
    const user = users.find(u => Number(u.id) === uid);
    if (!user) return;

    user.status = "approved";
    saveUsers(users);

    if (typeof showNotification === "function") {
        showNotification(`${user.prenom || ""} ${user.nom || ""} : compte validé`);
    }

    loadAdminUsers();
}

function refuseUser(userId) {
    const uid = Number(userId);
    if (!Number.isInteger(uid)) return;

    const users = getUsers();
    const user = users.find(u => Number(u.id) === uid);
    if (!user) return;

    user.status = "refused";
    saveUsers(users);

    if (typeof showNotification === "function") {
        showNotification(`${user.prenom || ""} ${user.nom || ""} : compte refusé`);
    }

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

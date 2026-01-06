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
        div.className = "p-3 bg-white shadow mb-2 flex justify-between items-center";

        div.innerHTML = `
            <span>${r.date} — user ${r.userId}</span>
            <div class="space-x-2">
                <button class="bg-green-600 text-white px-2 py-1 rounded" onclick="approve(${r.id})">Accepter</button>
                <button class="bg-red-600 text-white px-2 py-1 rounded" onclick="refuse(${r.id})">Refuser</button>
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
    container.innerHTML = "";

    users.forEach(u => {
        const div = document.createElement("div");
        div.className = "p-3 bg-white shadow mb-2 flex justify-between items-center";

        div.innerHTML = `
            <span>${u.prenom || ""} ${u.nom || ""} — ${u.email} — <strong>${u.role}</strong></span>
            <div class="space-x-2">
                <button class="bg-blue-600 text-white px-2 py-1 rounded" onclick="promoteModerator(${u.id})">Modérateur</button>
                <button class="bg-purple-600 text-white px-2 py-1 rounded" onclick="promoteAdmin(${u.id})">Admin</button>
                <button class="bg-gray-600 text-white px-2 py-1 rounded" onclick="demoteUser(${u.id})">User</button>
            </div>
        `;

        container.appendChild(div);
    });
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
        alert("Vous ne pouvez pas modifier votre propre rôle.");
        return;
    }

    user.role = newRole;
    localStorage.setItem("users", JSON.stringify(users));

    loadAdminUsers();
}


/* ----------- AUTO-CHARGEMENT ----------- */

window.addEventListener("hashchange", () => {
    if (window.location.hash === "#admin") {
        loadAdminRequests();
        loadAdminUsers();
    }
});

/* ============================
   BACKOFFICE : DEMANDES + RÔLES
   ============================ */

/* ----------- CHARGEMENT GLOBAL DU PANEL ADMIN ----------- */

function loadAdminPanel() {
    console.log("📊 Chargement du panel admin complet...");
    loadAdminRequests();
    loadAdminUsers();
}

/* ----------- DEMANDES ----------- */

function loadAdminRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || !["admin", "moderator", "superadmin"].includes(user.role)) return;

    const requests = getRequests();
    const users = getUsers();

    const container = document.getElementById("admin-requests");
    if (!container) return;
    container.innerHTML = "";

    const statusOrder = { pending: 1, approved: 2, refused: 3 };
    const sorted = [...requests].sort(
        (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
    );

    sorted.forEach(r => {
        const requestUser = users.find(u => u.id === r.userId);
        const userName = requestUser
            ? `${requestUser.prenom || ''} ${requestUser.nom || ''}`.trim()
            : `Utilisateur ${r.userId}`;

        const status = r.status || "pending";
        const statusClass =
            status === "approved"
                ? "bg-green-600"
                : status === "refused"
                    ? "bg-red-600"
                    : "bg-yellow-600";

        const statusText = status === "approved"
            ? "Accepté"
            : status === "refused"
                ? "Refusé"
                : "En attente";

        const disabledAttr = status === "pending" ? "" : "disabled";

        const div = document.createElement("div");
        div.className =
            "p-4 bg-white shadow mb-3 rounded-xl border border-gray-100 " +
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";

        div.innerHTML = `
            <div class="flex flex-col">
                <span class="text-gray-700 font-medium break-words">
                    ${r.date} — ${userName}
                </span>
                <span class="mt-1 inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white ${statusClass}">
                    ${statusText}
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
    if (!actor || !["admin", "moderator", "superadmin"].includes(actor.role)) return;

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
    if (!actor || !["admin", "moderator", "superadmin"].includes(actor.role)) return;

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
    if (!current || !["admin", "superadmin", "moderator"].includes(current.role)) return;

    const users = getUsers();
    const container = document.getElementById("admin-users");
    if (!container) return;
    container.innerHTML = "";

    const roleOrder = { superadmin: 0, admin: 1, moderator: 2, user: 3 };
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
            (status === "approved" || status === "accepté")
                ? "bg-green-600"
                : status === "refused"
                    ? "bg-red-600"
                    : "bg-yellow-600";

        const statusText = (status === "approved" || status === "accepté")
            ? "Accepté"
            : status === "refused"
                ? "Refusé"
                : "En attente";

        // LOGIQUE DE PERMISSIONS
        const isSuperAdmin = current.role === "superadmin";
        const isAdmin = current.role === "admin";
        const isModerator = current.role === "moderator";
        const isSelf = current.id === u.id;

        let actionsHtml = "";

        // CAS 1 : C'est soi-même → Aucune action possible
        if (isSelf) {
            actionsHtml = '<span class="text-sm text-gray-500 italic">🔒 Votre compte</span>';
        }
        // CAS 2 : SuperAdmin regardant un autre SuperAdmin → Protection
        else if (u.role === "superadmin" && isSuperAdmin) {
            actionsHtml = '<span class="text-sm text-gray-500 italic">🛡️ SuperAdmin protégé</span>';
        }
        // CAS 3 : Admin regardant un SuperAdmin → Protection
        else if (isAdmin && u.role === "superadmin") {
            actionsHtml = '<span class="text-sm text-gray-500 italic">🛡️ Accès réservé SuperAdmin</span>';
        }
        // CAS 4 : Admin regardant un autre Admin → Protection
        else if (isAdmin && u.role === "admin") {
            actionsHtml = '<span class="text-sm text-gray-500 italic">🛡️ Admin protégé</span>';
        }
        // CAS 5 : Moderator regardant superadmin/admin/moderator → Protection
        else if (isModerator && (u.role === "superadmin" || u.role === "admin" || u.role === "moderator")) {
            actionsHtml = '<span class="text-sm text-gray-500 italic">🛡️ Accès réservé Admin</span>';
        }
        // CAS 6 : Afficher le sélecteur de rôle
        else {
            let availableRoles = [];

            // SuperAdmin : peut tout changer (admin, moderator, user)
            if (isSuperAdmin && u.role !== "superadmin") {
                availableRoles = [
                    { value: "admin", label: "Admin", emoji: "👑" },
                    { value: "moderator", label: "Modérateur", emoji: "🛡️" },
                    { value: "user", label: "User", emoji: "👤" }
                ];
            }
            // Admin : peut promouvoir vers admin, moderator et user (mais pas modifier les admin existants)
            else if (isAdmin && u.role !== "superadmin" && u.role !== "admin") {
                availableRoles = [
                    { value: "admin", label: "Admin", emoji: "👑" },
                    { value: "moderator", label: "Modérateur", emoji: "🛡️" },
                    { value: "user", label: "User", emoji: "👤" }
                ];
            }
            // Moderator : peut seulement promouvoir user → moderator OU rétrograder moderator → user
            else if (isModerator && u.role === "user") {
                availableRoles = [
                    { value: "moderator", label: "Modérateur", emoji: "🛡️" },
                    { value: "user", label: "User", emoji: "👤" }
                ];
            }

            // Créer le select avec les rôles disponibles
            if (availableRoles.length > 0) {
                const selectId = `role-select-${u.id}`;
                actionsHtml += `
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-gray-600 font-medium">Rôle :</label>
                        <select id="${selectId}" 
                                class="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 border-gray-300 focus:border-plateforme-blue focus:outline-none transition cursor-pointer"
                                onchange="changeUserRole(${u.id}, this.value)">
                `;

                availableRoles.forEach(role => {
                    const selected = role.value === u.role ? 'selected' : '';
                    actionsHtml += `<option value="${role.value}" ${selected}>${role.emoji} ${role.label}</option>`;
                });

                actionsHtml += `
                        </select>
                    </div>
                `;
            }
        }

        // Boutons de validation de compte (pour admin/superadmin uniquement, pas pour moderator)
        if (status === "pending" && !isSelf && !isModerator) {
            actionsHtml += `
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                    onclick="approveUser(${u.id})">✓ Valider compte</button>
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
                    onclick="refuseUser(${u.id})">✗ Refuser compte</button>
            `;
        }

        // Badge du rôle avec couleur
        const roleColors = {
            superadmin: "bg-red-500",
            admin: "bg-blue-600",
            moderator: "bg-purple-600",
            user: "bg-gray-600"
        };
        const roleEmojis = {
            superadmin: "⭐",
            admin: "👑",
            moderator: "🛡️",
            user: "👤"
        };

        div.innerHTML = `
            <div class="flex flex-col gap-1">
                <span class="text-gray-800 font-semibold">
                    ${u.prenom || ""} ${u.nom || ""}
                </span>
                <span class="text-gray-500 text-sm">${u.email}</span>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-white ${roleColors[u.role] || "bg-gray-500"} w-fit">
                    <span>${roleEmojis[u.role] || ""}</span>
                    <span>${u.role}</span>
                </span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
                <span class="px-3 py-1 rounded-lg text-sm font-semibold text-white ${statusClass}">
                    ${statusText}
                </span>
                <div class="flex flex-wrap gap-2 items-center">
                    ${actionsHtml}
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

// Fonction pour changer le rôle via le select
function changeUserRole(userId, newRole) {
    const current = JSON.parse(sessionStorage.getItem("currentUser"));

    const users = getUsers();
    const user = users.find(u => Number(u.id) === userId);
    if (!user) return;

    // Si le rôle n'a pas changé, ne rien faire
    if (newRole === user.role) {
        console.log("Rôle identique, pas de changement");
        return;
    }

    // Protection 1 : Ne pas modifier son propre rôle
    if (current && current.id === userId) {
        showNotification("❌ Vous ne pouvez pas modifier votre propre rôle");
        resetRoleSelect(userId, user.role);
        return;
    }

    // Protection 2 : Ne pas toucher au superadmin
    if (user.role === "superadmin") {
        showNotification("❌ Le SuperAdmin est protégé");
        resetRoleSelect(userId, user.role);
        return;
    }

    // Protection 3 : Admin ne peut pas modifier d'autres admins
    if (user.role === "admin" && current.role === "admin") {
        showNotification("❌ Vous ne pouvez pas modifier un autre Admin");
        resetRoleSelect(userId, user.role);
        return;
    }

    // Protection 4 : Moderator ne peut gérer que user ↔ moderator
    if (current.role === "moderator") {
        // Moderator ne peut PAS promouvoir vers admin
        if (newRole === "admin") {
            showNotification("❌ Seul un Admin peut promouvoir au rang d'Admin");
            resetRoleSelect(userId, user.role);
            return;
        }
        // Moderator ne peut PAS toucher aux admin/moderator existants
        if (user.role === "admin" || (user.role === "moderator" && user.id !== current.id)) {
            showNotification("❌ Vous ne pouvez pas modifier ce rôle");
            resetRoleSelect(userId, user.role);
            return;
        }
    }

    // Confirmation avant changement
    if (!confirm(`Confirmer le changement de rôle :\n\n${user.prenom} ${user.nom}\n${user.role} → ${newRole}`)) {
        resetRoleSelect(userId, user.role);
        return;
    }

    const oldRole = user.role;
    user.role = newRole;

    saveUsers(users);

    showNotification(`✅ ${user.prenom} ${user.nom} : ${oldRole} → ${newRole}`);

    loadAdminUsers();
}

// Réinitialiser le select à sa valeur d'origine
function resetRoleSelect(userId, originalRole) {
    const select = document.getElementById(`role-select-${userId}`);
    if (select) {
        select.value = originalRole;
    }
}

function approveUser(userId) {
    const uid = Number(userId);
    if (!Number.isInteger(uid)) return;

    const users = getUsers();
    const user = users.find(u => Number(u.id) === uid);
    if (!user) return;

    user.status = "approved";
    saveUsers(users);

    showNotification(`✅ ${user.prenom || ""} ${user.nom || ""} : compte validé`);

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

    showNotification(`❌ ${user.prenom || ""} ${user.nom || ""} : compte refusé`);

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

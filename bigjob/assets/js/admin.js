/* ============================
   BACKOFFICE : DEMANDES + RÔLES
   ============================ */

/* ----------- VARIABLES GLOBALES ----------- */
let allRequests = [];
let allUsers = [];
let currentAdminTab = 'stats';

/* ----------- CHARGEMENT GLOBAL DU PANEL ADMIN ----------- */

function loadAdminPanel() {
    console.log("📊 Chargement du panel admin complet...");
    allRequests = getRequests();
    allUsers = getUsers();

    loadAdminStats();
    loadAdminRequests();
    loadAdminUsers();
}

/* ----------- GESTION DES ONGLETS ----------- */

function switchAdminTab(tabName) {
    currentAdminTab = tabName;

    // Retirer active de tous les onglets
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Cacher tous les contenus
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Activer l'onglet sélectionné
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById(`admin-tab-${tabName}`).classList.remove('hidden');

    // Recharger le contenu si nécessaire
    if (tabName === 'stats') loadAdminStats();
    else if (tabName === 'requests') filterRequests();
    else if (tabName === 'users') filterUsers();
}

/* ----------- STATISTIQUES ----------- */

function loadAdminStats() {
    const container = document.getElementById('admin-stats');
    if (!container) return;

    const users = getUsers();
    const requests = getRequests();

    const totalUsers = users.length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const approvedRequests = requests.filter(r => r.status === 'approved').length;
    const refusedRequests = requests.filter(r => r.status === 'refused').length;

    const usersByRole = {
        superadmin: users.filter(u => u.role === 'superadmin').length,
        admin: users.filter(u => u.role === 'admin').length,
        moderator: users.filter(u => u.role === 'moderator').length,
        user: users.filter(u => u.role === 'user').length
    };

    const approvalRate = totalRequests > 0
        ? Math.round((approvedRequests / totalRequests) * 100)
        : 0;

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-blue-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-semibold">Total Utilisateurs</span>
                    <span class="text-2xl">👥</span>
                </div>
                <div class="text-3xl font-bold text-plateforme-blue">${totalUsers}</div>
                ${pendingUsers > 0 ? `<div class="text-xs text-orange-600 mt-1">${pendingUsers} en attente</div>` : ''}
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-orange-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-semibold">Demandes en attente</span>
                    <span class="text-2xl">⏳</span>
                </div>
                <div class="text-3xl font-bold text-orange-600">${pendingRequests}</div>
                <div class="text-xs text-gray-500 mt-1">sur ${totalRequests} total</div>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-green-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-semibold">Demandes acceptées</span>
                    <span class="text-2xl">✅</span>
                </div>
                <div class="text-3xl font-bold text-green-600">${approvedRequests}</div>
                <div class="text-xs text-gray-500 mt-1">Taux: ${approvalRate}%</div>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-red-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 text-sm font-semibold">Demandes refusées</span>
                    <span class="text-2xl">❌</span>
                </div>
                <div class="text-3xl font-bold text-red-600">${refusedRequests}</div>
            </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📊</span>
                <span>Répartition des rôles</span>
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                    <div class="text-2xl mb-1">⭐</div>
                    <div class="text-2xl font-bold text-indigo-900">${usersByRole.superadmin}</div>
                    <div class="text-xs text-gray-600 mt-1">SuperAdmins</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div class="text-2xl mb-1">👑</div>
                    <div class="text-2xl font-bold text-blue-700">${usersByRole.admin}</div>
                    <div class="text-xs text-gray-600 mt-1">Admins</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
                    <div class="text-2xl mb-1">🛡️</div>
                    <div class="text-2xl font-bold text-cyan-600">${usersByRole.moderator}</div>
                    <div class="text-xs text-gray-600 mt-1">Modérateurs</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg">
                    <div class="text-2xl mb-1">👤</div>
                    <div class="text-2xl font-bold text-gray-600">${usersByRole.user}</div>
                    <div class="text-xs text-gray-600 mt-1">Users</div>
                </div>
            </div>
        </div>
    `;
}

/* ----------- DEMANDES ----------- */

function loadAdminRequests() {
    allRequests = getRequests();
    filterRequests();
}

function filterRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || !["admin", "moderator", "superadmin"].includes(user.role)) return;

    const searchTerm = document.getElementById('search-requests')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filter-request-status')?.value || 'all';

    const requests = getRequests();
    const users = getUsers();

    const container = document.getElementById("admin-requests");
    if (!container) return;

    // Filtrage
    let filtered = requests.filter(r => {
        const requestUser = users.find(u => u.id === r.userId);
        const userName = requestUser
            ? `${requestUser.prenom || ''} ${requestUser.nom || ''}`.trim().toLowerCase()
            : '';
        const userEmail = requestUser?.email?.toLowerCase() || '';
        const date = r.date || '';

        const matchSearch = !searchTerm ||
            userName.includes(searchTerm) ||
            userEmail.includes(searchTerm) ||
            date.includes(searchTerm);

        const matchStatus = statusFilter === 'all' || r.status === statusFilter;

        return matchSearch && matchStatus;
    });

    // Tri par statut puis date
    const statusOrder = { pending: 1, approved: 2, refused: 3 };
    filtered.sort((a, b) => {
        const statusDiff = (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
        if (statusDiff !== 0) return statusDiff;
        return new Date(b.date) - new Date(a.date);
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <div class="text-6xl mb-4">📋</div>
                <p class="text-lg font-semibold">Aucune demande trouvée</p>
                <p class="text-sm">Essayez d'ajuster vos filtres</p>
            </div>
        `;
        return;
    }

    // Générer le tableau
    let tableHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead class="bg-gradient-to-r from-plateforme-blue to-blue-700 text-white">
                    <tr>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Date</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Utilisateur</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Email</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Statut</th>
                        <th class="px-4 py-4 text-center font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    filtered.forEach(r => {
        const requestUser = users.find(u => u.id === r.userId);
        const userName = requestUser
            ? `${requestUser.prenom || ''} ${requestUser.nom || ''}`.trim()
            : `Utilisateur ${r.userId}`;
        const userEmail = requestUser?.email || 'N/A';

        const status = r.status || "pending";
        const statusText = status === "approved" ? "Acceptée" : status === "refused" ? "Refusée" : "En attente";
        const statusClass = status === "approved" ? "approved" : status === "refused" ? "refused" : "pending";

        const disabledAttr = status === "pending" ? "" : "disabled";

        const formattedDate = new Date(r.date).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        tableHTML += `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-4 font-semibold text-gray-700">${formattedDate}</td>
                <td class="px-4 py-4">${userName}</td>
                <td class="px-4 py-4 text-gray-600 text-sm">${userEmail}</td>
                <td class="px-4 py-4"><span class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${statusClass === 'pending' ? 'bg-gradient-to-r from-orange-600 to-orange-400' :
                statusClass === 'approved' ? 'bg-gradient-to-r from-green-600 to-green-400' :
                    'bg-gradient-to-r from-red-600 to-red-400'
            }">${statusText}</span></td>
                <td class="px-4 py-4 text-center">
                    <div class="flex gap-2 justify-center">
                        <button ${disabledAttr}
                            class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                            onclick="approve(${r.id})">✓</button>
                        <button ${disabledAttr}
                            class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                            onclick="refuse(${r.id})">✗</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
        <div class="mt-4 text-sm text-gray-500 text-center">
            ${filtered.length} demande${filtered.length > 1 ? 's' : ''} affichée${filtered.length > 1 ? 's' : ''}
        </div>
    `;

    container.innerHTML = tableHTML;
}

// Événements de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchRequests = document.getElementById('search-requests');
    if (searchRequests) {
        searchRequests.addEventListener('input', filterRequests);
    }
});

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

    showNotification("✅ Demande acceptée");
    loadAdminStats();
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

    showNotification("❌ Demande refusée");
    loadAdminStats();
    loadAdminRequests();
    if (typeof loadUserRequests === "function") loadUserRequests();
}


/* ----------- GESTION DES RÔLES ----------- */

function loadAdminUsers() {
    allUsers = getUsers();
    filterUsers();
}

function filterUsers() {
    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!current || !["admin", "superadmin", "moderator"].includes(current.role)) return;

    const searchTerm = document.getElementById('search-users')?.value.toLowerCase() || '';
    const roleFilter = document.getElementById('filter-user-role')?.value || 'all';
    const statusFilter = document.getElementById('filter-user-status')?.value || 'all';

    const users = getUsers();
    const container = document.getElementById("admin-users");
    if (!container) return;

    // Filtrage
    let filtered = users.filter(u => {
        const userName = `${u.prenom || ''} ${u.nom || ''}`.trim().toLowerCase();
        const userEmail = u.email?.toLowerCase() || '';

        const matchSearch = !searchTerm ||
            userName.includes(searchTerm) ||
            userEmail.includes(searchTerm);

        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        const matchStatus = statusFilter === 'all' || (u.status || 'approved') === statusFilter;

        return matchSearch && matchRole && matchStatus;
    });

    // Tri par rôle
    const roleOrder = { superadmin: 0, admin: 1, moderator: 2, user: 3 };
    filtered.sort((a, b) => (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99));

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <div class="text-6xl mb-4">👥</div>
                <p class="text-lg font-semibold">Aucun utilisateur trouvé</p>
                <p class="text-sm">Essayez d'ajuster vos filtres</p>
            </div>
        `;
        return;
    }

    // Générer le tableau
    let tableHTML = `
        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead class="bg-gradient-to-r from-plateforme-blue to-blue-700 text-white">
                    <tr>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Utilisateur</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Email</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Rôle</th>
                        <th class="px-4 py-4 text-left font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Statut</th>
                        <th class="px-4 py-4 text-center font-semibold text-sm uppercase tracking-wide cursor-pointer select-none hover:bg-white/10">Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    filtered.forEach(u => {
        const status = u.status || "approved";
        const statusText = (status === "approved" || status === "accepté") ? "Validé" : status === "refused" ? "Refusé" : "En attente";
        const statusClass = (status === "approved" || status === "accepté") ? "approved" : status === "refused" ? "refused" : "pending";

        const roleEmojis = { superadmin: "⭐", admin: "👑", moderator: "🛡️", user: "👤" };
        const roleLabels = { superadmin: "SuperAdmin", admin: "Admin", moderator: "Modérateur", user: "User" };

        // LOGIQUE DE PERMISSIONS
        const isSuperAdmin = current.role === "superadmin";
        const isAdmin = current.role === "admin";
        const isModerator = current.role === "moderator";
        const isSelf = current.id === u.id;

        let actionsHTML = "";

        // CAS 1 : C'est soi-même → Aucune action possible
        if (isSelf) {
            actionsHTML = '<span class="text-sm text-gray-500 italic">🔒 Votre compte</span>';
        }
        // CAS 2 : SuperAdmin regardant un autre SuperAdmin → Protection
        else if (u.role === "superadmin" && isSuperAdmin) {
            actionsHTML = '<span class="text-sm text-gray-500 italic">🛡️ Protégé</span>';
        }
        // CAS 3 : Admin regardant un SuperAdmin → Protection
        else if (isAdmin && u.role === "superadmin") {
            actionsHTML = '<span class="text-sm text-gray-500 italic">🛡️ Protégé</span>';
        }
        // CAS 4 : Admin regardant un autre Admin → Protection
        else if (isAdmin && u.role === "admin") {
            actionsHTML = '<span class="text-sm text-gray-500 italic">🛡️ Protégé</span>';
        }
        // CAS 5 : Moderator regardant superadmin/admin/moderator → Protection
        else if (isModerator && (u.role === "superadmin" || u.role === "admin" || u.role === "moderator")) {
            actionsHTML = '<span class="text-sm text-gray-500 italic">🛡️ Protégé</span>';
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
            // Admin : peut promouvoir vers admin, moderator et user
            else if (isAdmin && u.role !== "superadmin" && u.role !== "admin") {
                availableRoles = [
                    { value: "admin", label: "Admin", emoji: "👑" },
                    { value: "moderator", label: "Modérateur", emoji: "🛡️" },
                    { value: "user", label: "User", emoji: "👤" }
                ];
            }
            // Moderator : peut seulement gérer user ↔ moderator
            else if (isModerator && u.role === "user") {
                availableRoles = [
                    { value: "moderator", label: "Modérateur", emoji: "🛡️" },
                    { value: "user", label: "User", emoji: "👤" }
                ];
            }

            // Créer le select avec les rôles disponibles
            if (availableRoles.length > 0) {
                const selectId = `role-select-${u.id}`;
                actionsHTML += `
                    <select id="${selectId}" 
                            class="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 border-gray-300 focus:border-plateforme-blue focus:outline-none transition cursor-pointer"
                            onchange="changeUserRole(${u.id}, this.value)">
                `;

                availableRoles.forEach(role => {
                    const selected = role.value === u.role ? 'selected' : '';
                    actionsHTML += `<option value="${role.value}" ${selected}>${role.emoji} ${role.label}</option>`;
                });

                actionsHTML += `</select>`;
            }
        }

        // Boutons de validation de compte (pour admin/superadmin uniquement)
        if (status === "pending" && !isSelf && !isModerator) {
            actionsHTML += `
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition ml-2"
                    onclick="approveUser(${u.id})">✓</button>
                <button class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition ml-1"
                    onclick="refuseUser(${u.id})">✗</button>
            `;
        }

        tableHTML += `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-4 font-semibold text-gray-800">${u.prenom || ''} ${u.nom || ''}</td>
                <td class="px-4 py-4 text-gray-600 text-sm">${u.email}</td>
                <td class="px-4 py-4">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${u.role === 'user' ? 'bg-gradient-to-r from-blue-400 to-blue-300' :
                u.role === 'moderator' ? 'bg-gradient-to-r from-blue-700 to-blue-600' :
                    u.role === 'admin' ? 'bg-gradient-to-r from-blue-900 to-blue-800' :
                        'bg-gradient-to-r from-purple-700 to-purple-600'
            }">
                        <span>${roleEmojis[u.role] || ""}</span>
                        <span>${roleLabels[u.role] || u.role}</span>
                    </span>
                </td>
                <td class="px-4 py-4"><span class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${statusClass === 'pending' ? 'bg-gradient-to-r from-orange-600 to-orange-400' :
                statusClass === 'approved' ? 'bg-gradient-to-r from-green-600 to-green-400' :
                    'bg-gradient-to-r from-red-600 to-red-400'
            }">${statusText}</span></td>
                <td class="px-4 py-4 text-center">
                    <div class="flex gap-2 justify-center items-center">
                        ${actionsHTML}
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
        <div class="mt-4 text-sm text-gray-500 text-center">
            ${filtered.length} utilisateur${filtered.length > 1 ? 's' : ''} affiché${filtered.length > 1 ? 's' : ''}
        </div>
    `;

    container.innerHTML = tableHTML;
}

// Événements de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchUsers = document.getElementById('search-users');
    if (searchUsers) {
        searchUsers.addEventListener('input', filterUsers);
    }
});

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

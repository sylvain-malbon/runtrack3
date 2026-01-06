function seedUsers() {
    console.log("🔄 Initialisation seedUsers...");

    const existing = JSON.parse(localStorage.getItem("users"));

    if (existing && existing.length > 0) {
        console.log("✅ Utilisateurs déjà présents:", existing.length);
        return;
    }

    console.log("⚠️ Aucun utilisateur trouvé, création...");

    const defaultUsers = [
        {
            id: 1,
            email: "superadmin@laplateforme.io",
            password: "superadmin",
            nom: "Admin",
            prenom: "Super",
            role: "superadmin",
            status: "approved"
        },
        {
            id: 2,
            email: "admin@laplateforme.io",
            password: "admin",
            nom: "min",
            prenom: "Ad",
            role: "admin",
            status: "approved"
        },
        {
            id: 3,
            email: "modo1@laplateforme.io",
            password: "modo",
            nom: "do",
            prenom: "Mo",
            role: "moderator",
            status: "approved"
        },
        {
            id: 4,
            email: "john@laplateforme.io",
            password: "johndoe",
            nom: "Doe",
            prenom: "John",
            role: "user",
            status: "approved"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
    console.log("✅ Utilisateurs créés:", defaultUsers.length);
}

// Exécution immédiate
seedUsers();

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Identifiants incorrects");
        return;
    }

    // Bloquer les comptes non validés
    if (user.status && user.status !== "approved") {
        alert("Votre compte est en attente de validation par un administrateur.");
        return;
    }

    sessionStorage.setItem("currentUser", JSON.stringify(user));
    window.location.hash = "#calendrier";

    // Mettre à jour la navigation
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
}

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.hash = '#accueil';
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
}

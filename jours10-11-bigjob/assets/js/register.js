function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isLaPlateformeEmail(email) {
    return email.endsWith("@laplateforme.io");
}

function registerUser() {
    const nom = document.getElementById("reg-nom").value.trim();
    const prenom = document.getElementById("reg-prenom").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Vérifications
    if (!nom || !prenom || !email || !password) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Format d'email invalide");
        return;
    }

    if (!isLaPlateformeEmail(email)) {
        alert("Seuls les emails @laplateforme.io sont acceptés");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier doublon
    if (users.some(u => u.email === email)) {
        alert("Un compte existe déjà avec cet email");
        return;
    }

    // Créer l'utilisateur
    const newUser = {
        id: Date.now(),
        nom,
        prenom,
        email,
        password,
        role: "user",
        status: "pending" // en attente de validation
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Compte créé avec succès ! En attente de validation par un administrateur.");
    window.location.hash = "#connexion";
}

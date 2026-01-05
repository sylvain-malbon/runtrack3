function seedUsers() {
    const existing = JSON.parse(localStorage.getItem("users"));
    if (existing && existing.length > 0) return;

    const defaultUsers = [
        {
            id: 1,
            email: "admin@laplateforme.io",
            password: "admin",
            role: "admin"
        },
        {
            id: 2,
            email: "john@laplateforme.io",
            password: "hash123",
            nom: "Doe",
            prenom: "John",
            role: "user"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

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

    sessionStorage.setItem("currentUser", JSON.stringify(user));
    window.location.hash = "#calendar";
}

function isPastDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

function requestPresence() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
        alert("Vous devez être connecté.");
        return;
    }

    const dateInput = document.getElementById("date-picker");
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        alert("Veuillez sélectionner une date.");
        return;
    }

    // ✅ NOUVELLE VÉRIFICATION : Bloquer les dates passées
    const selected = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset l'heure pour comparaison juste de la date

    if (selected < today) {
        alert("❌ Impossible de faire une demande pour une date passée !");
        return;
    }

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    // Vérifier si l'utilisateur a déjà fait une demande pour cette date
    const alreadyRequested = requests.some(
        r => r.userId === user.id && r.date === selectedDate
    );

    if (alreadyRequested) {
        alert("Vous avez déjà fait une demande pour cette date.");
        return;
    }

    const newRequest = {
        id: Date.now(),
        userId: user.id,
        date: selectedDate,
        status: "pending"
    };

    requests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("✅ Demande envoyée avec succès !");
    dateInput.value = "";
}

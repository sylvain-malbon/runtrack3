function isPastDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

function requestPresence() {
    const date = document.getElementById("date-picker").value;

    if (!date) return alert("Choisissez une date");

    if (isPastDate(date)) {
        alert("Impossible de réserver une date passée");
        return;
    }

    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    requests.push({
        id: Date.now(),
        userId: user.id,
        date,
        status: "pending"
    });

    localStorage.setItem("requests", JSON.stringify(requests));
    alert("Demande envoyée");
}

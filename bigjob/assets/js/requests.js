function loadUserRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    const mine = requests.filter(r => r.userId === user.id);

    const container = document.getElementById("requests-list");
    container.innerHTML = "";

    mine.forEach(r => {
        const div = document.createElement("div");
        div.className = "p-3 bg-white shadow mb-2";
        div.textContent = `${r.date} — ${r.status}`;
        container.appendChild(div);
    });
}

window.addEventListener("hashchange", () => {
    if (window.location.hash === "#requests") loadUserRequests();
});

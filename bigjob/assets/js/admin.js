function loadAdminRequests() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user || (user.role !== "admin" && user.role !== "moderator")) return;

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const pending = requests.filter(r => r.status === "pending");

    const container = document.getElementById("admin-requests");
    container.innerHTML = "";

    pending.forEach(r => {
        const div = document.createElement("div");
        div.className = "p-3 bg-white shadow mb-2 flex justify-between";

        div.innerHTML = `
      <span>${r.date} — user ${r.userId}</span>
      <button class="bg-green-600 text-white px-2 py-1 rounded" onclick="approve(${r.id})">OK</button>
    `;

        container.appendChild(div);
    });
}

function approve(id) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const req = requests.find(r => r.id === id);
    req.status = "approved";
    localStorage.setItem("requests", JSON.stringify(requests));
    loadAdminRequests();
}

window.addEventListener("hashchange", () => {
    if (window.location.hash === "#admin") loadAdminRequests();
});

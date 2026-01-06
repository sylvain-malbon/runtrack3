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

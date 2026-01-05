function navigate() {
    const hash = window.location.hash || "#login";

    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));

    const page = document.querySelector(hash);
    if (page) page.classList.remove("hidden");
}

window.addEventListener("hashchange", navigate);
window.addEventListener("load", navigate);

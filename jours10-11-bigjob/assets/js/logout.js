function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.hash = "#login";
}

/*
Job 06
Par défaut, votre index.php n’a pas de contenu.
Lorsqu’un utilisateur effectue un code konami, la page devient stylisée, aux couleurs de
La Plateforme_.
*/

// const konamiCode = [
//     "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
//     "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
//     "b", "a"
// ];
const konami = "ArrowUp";
let saisie = "";

document.addEventListener('keydown', function (e) {
    saisie += e.key.length === 1 ? e.key : e.key;
    if (saisie.length > konami.length) {
        saisie = saisie.slice(-konami.length);
    }
    if (saisie.toLowerCase() === konami.toLowerCase()) {
        document.body.classList.add('konami');
        document.body.innerHTML = "<h1>Konami code activé !</h1>";
    }
});


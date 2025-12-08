/*
Job 06
Par défaut, votre index.php n’a pas de contenu.
Lorsqu’un utilisateur effectue un code konami, la page devient stylisée, aux couleurs de
La Plateforme_.
*/

const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
];
let saisie = [];

document.addEventListener('keydown', function (e) {
    saisie.push(e.key);
    if (saisie.length > konamiCode.length) {
        saisie.shift();
    }
    if (saisie.join(',').toLowerCase() === konamiCode.join(',').toLowerCase()) {
        document.body.classList.add('konami');
        document.body.innerHTML = "<h1>Konami code activé !</h1>";
    }
});


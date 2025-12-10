// Job 01
// Créez un <button> avec l'id "button" et un fichier expression.txt contenant votre expression favorite.
// Lorsqu'un utilisateur clique sur le bouton, utilisez Fetch pour récupérer le contenu du fichier expression.txt,
// puis placez ce contenu dans un paragraphe <p> et insérez-le dans le corps de la page.

// === Méthode avec .then() ===
// document.getElementById('button').addEventListener('click', function() {
//     fetch('expression.txt')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('expression').textContent = data;
//         })
//         .catch(error => {
//             document.getElementById('expression').textContent = "Erreur lors du chargement.";
//         });
// });

// === Méthode avec async/await et try/catch pour gérer les erreurs ===
// document.getElementById('button').addEventListener('click', async function () {
//     try {
//         const response = await fetch('expression.txt');
//         const data = await response.text();
//         document.getElementById('expression').textContent = data;
//     } catch (error) {
//         document.getElementById('expression').textContent = "Erreur lors du chargement.";
//     }
// });

// === Méthode avec async/await sans gestion des erreurs ===
document.getElementById('button').addEventListener('click', async function () {
    const response = await fetch('expression.txt');
    const data = await response.text();
    document.getElementById('expression').textContent = data;
});
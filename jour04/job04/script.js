// Job 04
// Créez une base de données “utilisateurs” contenant une table “utilisateurs” et ayant
// comme champs “id”, “nom”, “prenom” et “email”.
// Ajoutez des utilisateurs directement dans phpmyadmin.
// Créez une page users.php qui se connecte à la base de données, récupère l’ensemble
// des utilisateurs et affiche ces informations au format json.
// Dans votre page index.php, créez un tableau < table > permettant de contenir ces
// informations ainsi qu’un < button > “update”. Lorsque l’on clique sur ce bouton, le tableau
// doit se mettre à jour et contenir l’ensemble des informations des utilisateurs présents
// dans la base de données.
// Vous pouvez tester votre code en ajoutant / supprimant des utilisateurs à l’aide de
// phpmyadmin entre deux clics.

document.addEventListener('DOMContentLoaded', function () {
    const updateBtn = document.getElementById('updateBtn');
    const usersTableBody = document.querySelector('#usersTable tbody');

    function updateTable() {
        fetch('users.php')
            .then(response => response.json())
            .then(users => {
                usersTableBody.innerHTML = '';
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nom}</td>
                        <td>${user.prenom}</td>
                        <td>${user.email}</td>
                    `;
                    usersTableBody.appendChild(row);
                });
            });
    }

    updateBtn.addEventListener('click', updateTable);

    // Optionnel : charger les utilisateurs au chargement de la page
    updateTable();
});
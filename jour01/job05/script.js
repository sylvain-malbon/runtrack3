/* job 05
* Créez une fonction “afficherjourssemaines”. Cette fonction ne prend pas de paramètre.
* Créez un tableau de strings “jourssemaines” qui contient l’ensemble des jours de la
* semaine, du Lundi au Dimanche.Ensuite à l’aide d’une boucle for (for!)Affichez un par
* un ces jours.
*/

function afficherjourssemaines() {
    let joursdelasemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    for (let i = 0; i < joursdelasemaine.length; i++) {
        console.log(joursdelasemaine[i]);
    }
}
afficherjourssemaines();

/* Code similaire de Momo
function afficherjourssemaines() {
    let joursdelasemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    for (const jour of joursdelasemaine) {
        console.log(jour);
    }
}
afficherjourssemaines();
*/
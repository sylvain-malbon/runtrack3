/* Job 03
Créez une balise <button> ayant comme id “button”.
Créez une balise <p> ayant comme id “compteur” et contenant “0”.
Ce contenu doit évoluer proportionnellement au nombre d'événements click reçu par le
bouton
ATTENTION : Vous ne devez pas utiliser “onclick()” dans votre html.
La fonction permettant d’effectuer la modification doit s'appeler “addone()”.
*/

function addone() {
    let compteur = document.getElementById('compteur');
    compteur.textContent = Number(compteur.textContent) + 1;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('button').addEventListener('click', addone);
});
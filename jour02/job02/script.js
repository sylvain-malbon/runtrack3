/* Job 02
* Créez une balise <button> ayant comme id “button”.
* Lorsque l’on clique dessus, un <article> contenant le texte suivant est ajouté au contenu
* de la page : “L'important n'est pas la chute, mais l'atterrissage.”
* Si on clique à nouveau sur ce bouton, l’article disparaît.
* L’apparition / Disparition doivent être gérées dans une fonction nommée “showhide()”.
*/

function showhide() {
    let message = document.getElementById('message');
    if (message) {
        message.remove();
    } else {
        let article = document.createElement('article');
        article.id = 'message';
        article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
        document.body.appendChild(article);
    }
}
<!--
Job 02
Créez une balise <button> ayant comme id “button”.
Lorsque l’on clique dessus, un <article> contenant le texte suivant est ajouté au contenu
de la page : “L'important n'est pas la chute, mais l'atterrissage.”
Si on clique à nouveau sur ce bouton, l’article disparaît.
L’apparition / Disparition doivent être gérées dans une fonction nommée “showhide()”.
-->

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Job02</title>
</head>

<body>
    <button id="button" onclick="showhide()">Afficher/masquer</button>
    <!-- L'article sera ajouté/supprimé par JS -->
     <script src ="./script.js"></script>
</body>

</html>
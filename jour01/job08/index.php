<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Job08 : Somme de deux nombres premiers</title>
    <script src="./script.js"></script>
</head>

<body>
    <h1>Somme de deux nombres premiers</h1>
    <label for="a">Nombre 1 :</label>
    <input type="number" id="a" min="2">
    <label for="b">Nombre 2 :</label>
    <input type="number" id="b" min="2">
    <button onclick="calculerSomme()">Calculer</button>
    <p id="resultat"></p>

    <script>
        function calculerSomme() {
            const a = parseInt(document.getElementById('a').value, 10);
            const b = parseInt(document.getElementById('b').value, 10);
            const resultat = sommenombrespremiers(a, b);
            document.getElementById('resultat').textContent =
                resultat !== false
                    ? `La somme des deux nombres premiers est : ${resultat}`
                    : "Au moins un des nombres n'est pas premier.";
        }
    </script>
</body>

</html>
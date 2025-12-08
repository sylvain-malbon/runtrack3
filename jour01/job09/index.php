<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tri de nombres</title>
</head>
<body>
    <h1>Tri de nombres</h1>
    <form id="triForm">
        <label for="numbers">Entrez des nombres séparés par des virgules :</label><br>
        <input type="text" id="numbers" name="numbers" required><br><br>
        <label for="order">Ordre :</label>
        <select id="order" name="order">
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
        </select><br><br>
        <button type="submit">Trier</button>
    </form>
    <h2>Résultat :</h2>
    <div id="result"></div>

    <script src="script.js"></script>
    <script>
        document.getElementById('triForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const numbersInput = document.getElementById('numbers').value;
            const order = document.getElementById('order').value;
            const numbers = numbersInput.split(',').map(Number);
            const sorted = tri(numbers, order);
            document.getElementById('result').textContent = sorted.join(', ');
        });
    </script>
</body>
</html>
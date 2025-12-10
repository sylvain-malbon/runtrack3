<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Filtrer les Pokémon</title>
</head>
<body>
    <form id="pokemon-filter-form">
        <label for="id">ID :</label>
        <input type="text" id="id" name="id">

        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom">

        <label for="type">Type :</label>
        <select id="type" name="type">
            <option value="">-- Tous --</option>
        </select>

        <input type="button" id="filtrer" value="Filtrer">
    </form>

    <div id="resultats"></div>

    <script src="script.js"></script>
</body>
</html>
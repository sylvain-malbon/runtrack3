// Job 03
// Téléchargez le fichier suivant: pokemon.json
// Créez un formulaire permettant de trier ces données.
// Il doit contenir les champs suivants:
// ● id(input type text),
// ● nom(input type text),
// ● type(liste déroulante < select >)
// ● filtrer(input type button).
// Lorsque l’on clique sur “filtrer”, le script doit à l’aide de Fetch, récupérer le contenu du
// fichier et lister les éléments répondant aux critères sélectionnés en les affichant sur une
// page HTML.

document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.getElementById('type');
    const filterBtn = document.getElementById('filtrer');
    const resultDiv = document.getElementById('resultats');

    let pokemons = [];

    // Charger les pokémons et remplir la liste des types
    fetch('pokemon.json')
        .then(response => response.json())
        .then(data => {
            pokemons = data;
            // Extraire les types uniques
            const types = new Set();
            pokemons.forEach(p => {
                if (Array.isArray(p.type)) {
                    p.type.forEach(t => types.add(t));
                } else {
                    types.add(p.type);
                }
            });
            // Ajouter les options au select
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeSelect.appendChild(option);
            });
        });

    filterBtn.addEventListener('click', function () {
        const id = document.getElementById('id').value.trim();
        const nom = document.getElementById('nom').value.trim().toLowerCase();
        const type = typeSelect.value;

        const filtered = pokemons.filter(p => {
            const matchId = id === "" || String(p.id) === id;
            const matchNom = nom === "" || p.name.french.toLowerCase().includes(nom);
            const matchType = type === "" || (Array.isArray(p.type) ? p.type.includes(type) : p.type === type);
            return matchId && matchNom && matchType;
        });

        // Affichage
        resultDiv.innerHTML = "";
        if (filtered.length === 0) {
            resultDiv.textContent = "Aucun Pokémon trouvé.";
        } else {
            const ul = document.createElement('ul');
            filtered.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `#${p.id} - ${p.name.french} (${Array.isArray(p.type) ? p.type.join(', ') : p.type})`;
                ul.appendChild(li);
            });
            resultDiv.appendChild(ul);
        }
    });
});
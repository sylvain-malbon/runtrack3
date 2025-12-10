// Job 02
// Créez une fonction javascript “jsonValueKey()” qui prend en paramètre une chaîne de
// caractères au format json et une clé.
// Cette fonction retourne la valeur liée à cette clé dans la chaîne de caractères.
// Par exemple: si la string passée en paramètre est
// “{
//     name: "La Plateforme_",
//         address: "8 rue d'hozier",
//             city: "Marseille",
//                 nb_staff: "11",
//                     creation: "2019"
// }”
// et la clé est “city”, la fonction retourne “Marseille”.

function jsonValueKey(chaineJson, key) {
    const obj = JSON.parse(chaineJson);
    return obj[key];
}

const chaineJson = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}`;

const resultat = jsonValueKey(chaineJson, "city");
console.log(resultat); // Affichera "Marseille"

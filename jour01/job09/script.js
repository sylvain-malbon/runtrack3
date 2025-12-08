/* Job 09
* Créez une fonction “tri” qui prend en paramètres un tableau de nombres nommé
* “numbers” et une variable “order” qui contient “asc” ou “desc”. A l’aide de la fonction
* sort() d’un algorithme développé par vos soins, cette fonction doit trier le tableau dans
* l’ordre ascendant ou décroissant, selon le paramètre passé, puis retourner le tableau.
*/

function tri(numbers, order) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            if (
                (order === "asc" && numbers[j] > numbers[j + 1]) ||
                (order === "desc" && numbers[j] < numbers[j + 1])
            ) {
                // Échange des éléments
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }
    return numbers;
}

// Exemple d'utilisation :
// console.log(tri([5, 2, 9, 1], "asc"));  // [1, 2, 5, 9]
// console.log(tri([5, 2, 9, 1], "desc")); // [9, 5, 2, 1]
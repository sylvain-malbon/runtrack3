/* Job 08
* Créez une fonction “sommenombrespremiers” qui prend en paramètres deux variables.
* Si ces deux variables sont des nombres premiers, alors la fonction retourne leur
* somme. Sinon, la fonction retourne false.
*/

function estPremier(n) {
    if (typeof n !== 'number' || n < 2 || !Number.isInteger(n)) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function sommenombrespremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    }
    return false;
}

// Exemple d'utilisation
console.log(sommenombrespremiers(3, 5)); // 8
console.log(sommenombrespremiers(4, 5)); // false
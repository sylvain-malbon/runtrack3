/* Job 07
* Créez une fonction “jourtravaille” qui prend en paramètre une date au format Date. Si la
* date correspond à un jour férié de l’année 2020, la fonction affiche “Le $jour $mois
* $année est un jour férié”. Si elle correspond à un samedi ou un dimanche, alors le
* message affiché est “Non, $jour $mois $année est un week-end”, sinon afficher “Oui,
* $jour $mois $année est un jour travaillé”.
* $jour correspond au numéro du jour, $mois au mois et $année à l’année. Les jours fériés
* sont référencés sur
* https://demarchesadministratives.fr/actualites/calendrier-des-jours-feries-2019-2020-2021
*/

function jourtravaille(date) {
    // Liste des jours fériés en 2020 (format : "MM-DD")
    const joursFeries = [
        "01-01", // Jour de l'an
        "04-13", // Lundi de Pâques
        "05-01", // Fête du Travail
        "05-08", // Victoire 1945
        "05-21", // Ascension
        "06-01", // Lundi de Pentecôte
        "07-14", // Fête Nationale
        "08-15", // Assomption
        "11-01", // Toussaint
        "11-11", // Armistice
        "12-25"  // Noël
    ];

    const jour = date.getDate();
    const mois = date.getMonth() + 1; // Les mois commencent à 0
    const annee = date.getFullYear();

    // Format MM-DD
    const mmdd = (mois < 10 ? "0" : "") + mois + "-" + (jour < 10 ? "0" : "") + jour;

    if (annee !== 2020) {
        console.log("Veuillez entrer une date de l'année 2020.");
        return;
    }

    if (joursFeries.includes(mmdd)) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié`);
    } else if (date.getDay() === 0 || date.getDay() === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end`);
    } else {
        console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé`);
    }
}

// Exemples d'appels :
jourtravaille(new Date(2020, 0, 1));  // 1 janvier 2020, jour férié
jourtravaille(new Date(2020, 4, 1));  // 1 mai 2020, jour férié
jourtravaille(new Date(2020, 6, 14)); // 14 juillet 2020, jour férié
jourtravaille(new Date(2020, 2, 7));  // 7 mars 2020, week-end
jourtravaille(new Date(2020, 2, 9));  // 9 mars 2020, jour travaillé
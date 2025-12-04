function bissextile(annee) {
    // Si l'année est divisible par 4 et pas par 100, ou divisible par 400
    let result = (iannee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0
        // Alors c'est une année bissextile
        ? `${annee} est une année bissextile`
        // Sinon ce n'est pas une année bissextile
        : `${annee} n'est pas une année bissextile`;
    console.log(result);
}

bissextile(2000);
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job03 - Grille Bootstrap</title>
    <link href="./assets/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <main class="container py-4">
        <!-- Bloc bleu clair -->
        <div class="row mb-3">
            <div class="col-12">
                <div class="bloc-bleu-clair w-100"></div>
            </div>
        </div>
        
        <!-- 3 blocs bleus (Desktop) / 1 bloc bleu pleine largeur + 2 blocs bleus côte à côte (Mobile) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="bloc-bleu w-100"></div>
            </div>
            <div class="col-6 col-md-4 mb-3 mb-md-0">
                <div class="bloc-bleu w-100"></div>
            </div>
            <div class="col-6 col-md-4">
                <div class="bloc-bleu w-100"></div>
            </div>
        </div>

        <!-- 2 blocs violets (Desktop: 2/3 et 1/3) / (Mobile: 1 pleine largeur + 1 petit centré + 1 moyen centré) -->
        <div class="row mb-3 d-flex flex-column flex-md-row align-items-center align-items-md-start">
            <div class="col-8 mb-3 order-2 order-md-1">
                <div class="bloc-violet w-100"></div>
            </div>
            <div class="col-4 mb-3 order-1 order-md-2">
                <div class="bloc-violet w-100"></div>
            </div>
        </div>

        <!-- Mobile: 3 blocs oranges sur même ligne -->
        <div class="row d-md-none">
            <div class="col-4">
                <div class="bloc-orange w-100"></div>
            </div>
            <div class="col-4">
                <div class="bloc-orange w-100"></div>
            </div>
            <div class="col-4">
                <div class="bloc-orange w-100"></div>
            </div>
        </div>

        <!-- Desktop: 3 lignes de blocs oranges en diagonale -->
        <!-- Première ligne: bloc orange dans la 1ère colonne (80% de largeur) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4">
                <div class="bloc-orange" style="width: 80%;"></div>
            </div>
        </div>

        <!-- Deuxième ligne: bloc orange dans la 2ème colonne (justifié à gauche) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4 offset-md-4">
                <div class="bloc-orange" style="width: 80%;"></div>
            </div>
        </div>

        <!-- Troisième ligne: bloc orange dans la 3ème colonne (justifié à droite) -->
        <div class="row d-none d-md-flex">
            <div class="col-md-4 offset-md-8">
                <div class="bloc-orange ms-auto" style="width: 80%;"></div>
            </div>
        </div>
    </main>
</body>
</html>
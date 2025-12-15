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
        
        <!-- 3 blocs bleus (Desktop) / 1 bloc bleu + 2 blocs bleus (Mobile) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="bloc-bleu w-100"></div>
            </div>
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="bloc-bleu w-100"></div>
            </div>
            <div class="col-12 col-md-4">
                <div class="bloc-bleu w-100"></div>
            </div>
        </div>

        <!-- 2 blocs violets -->
        <div class="row mb-3">
            <div class="col-12 col-md-8 mb-3 mb-md-0">
                <div class="bloc-violet w-100"></div>
            </div>
            <div class="col-12 col-md-4">
                <div class="bloc-violet w-100"></div>
            </div>
        </div>

        <!-- Première ligne: bloc orange dans la 1ère colonne (80% de largeur) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4">
                <div class="bloc-orange" style="width: 80%;"></div>
            </div>
        </div>

        <!-- Deuxième ligne: bloc orange dans la 2ème colonne (justifié à gauche) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4 offset-md-4">
                <div class="bloc-orange" style="width: 80%;"></div>
            </div>
        </div>

        <!-- Troisième ligne: bloc orange dans la 3ème colonne (justifié à droite) -->
        <div class="row">
            <div class="col-12 col-md-4 offset-md-8">
                <div class="bloc-orange ms-auto" style="width: 80%;"></div>
            </div>
        </div>
    </main>
</body>
</html>
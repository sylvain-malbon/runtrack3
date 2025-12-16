<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job03-bg - Grille Bootstrap</title>
    <link href="./assets/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <main class="container py-4">

    <!-- Bloc bleu clair -->
        <div class="row mb-3">
            <div class="col-12">
                <div class="bg-info w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 100px;">
                    <h1 class="m-0">Bleu clair (bg-info)</h1>
                    <span>Ce bloc utilise la couleur Bootstrap <strong>bg-info</strong> pour un bleu clair d'accentuation.</span>
                </div>
            </div>
        </div>

        <!-- 3 blocs bleu moyen (Desktop) / 1 bloc pleine largeur + 2 blocs côte à côte (Mobile) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="custom-blue w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 150px;">
                    <h1 class="m-0">Bleu moyen (#9DB4D4)</h1>
                    <span>Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                </div>
            </div>
            <div class="col-6 col-md-4 mb-3 mb-md-0">
                <div class="custom-blue w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 150px;">
                    <h1 class="m-0">Bleu moyen (#9DB4D4)</h1>
                    <span>Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="custom-blue w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 150px;">
                    <h1 class="m-0">Bleu moyen (#9DB4D4)</h1>
                    <span>Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                </div>
            </div>
        </div>

        <!-- 2 blocs violets (Desktop: 2/3 et 1/3) / (Mobile: 1 pleine largeur + 1 petit centré + 1 moyen centré) -->
        <div class="row mb-3">
            <div class="col-12 col-md-8 mb-3 mb-md-0">
                <div class="custom-purple w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 100px;">
                    <h1 class="m-0">Violet (#C8A8E0)</h1>
                    <span>Bloc violet personnalisé, couleur hexadécimale <strong>#C8A8E0</strong>.</span>
                </div>
            </div>
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <div class="custom-purple w-100 d-none d-md-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 100px;">
                    <h1 class="m-0">Violet (#C8A8E0)</h1>
                    <span>Bloc violet personnalisé, couleur hexadécimale <strong>#C8A8E0</strong>.</span>
                </div>
            </div>
            <!-- Mobile seulement: petit bloc violet centré -->
            <div class="col-12 d-md-none mb-3">
                <div class="custom-purple mx-auto d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 60px; width: 60px;">
                    <h1 class="m-0" style="font-size:1.2rem;">Violet</h1>
                    <span style="font-size:0.8rem;">Bloc violet mobile</span>
                </div>
            </div>
            <!-- Mobile seulement: moyen bloc violet centré -->
            <div class="col-12 d-md-none">
                <div class="custom-purple mx-auto d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 80px; width: 120px;">
                    <h1 class="m-0" style="font-size:1.2rem;">Violet</h1>
                    <span style="font-size:0.8rem;">Bloc violet mobile</span>
                </div>
            </div>
        </div>

        <!-- Mobile: 3 blocs oranges sur même ligne -->
        <div class="row d-md-none">
            <div class="col-4">
                <div class="bg-warning w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
            <div class="col-4">
                <div class="bg-warning w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
            <div class="col-4">
                <div class="bg-warning w-100 d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
        </div>

        <!-- Desktop: 3 lignes de blocs oranges en diagonale -->
        <!-- Première ligne: bloc orange dans la 1ère colonne (80% de largeur) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4">
                <div class="bg-warning d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="width: 80%; height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
        </div>

        <!-- Deuxième ligne: bloc orange dans la 2ème colonne (justifié à gauche) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4 offset-md-4">
                <div class="bg-warning d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="width: 80%; height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
        </div>

        <!-- Troisième ligne: bloc orange dans la 3ème colonne (justifié à droite) -->
        <div class="row d-none d-md-flex">
            <div class="col-md-4 offset-md-8">
                <div class="bg-warning ms-auto d-flex flex-column align-items-center justify-content-center text-dark fw-bold" style="width: 80%; height: 80px;">
                    <h1 class="m-0">Orange (bg-warning)</h1>
                    <span>Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
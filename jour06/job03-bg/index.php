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
                <!-- Utilisation des classes Bootstrap pour le padding (p-4), arrondi (rounded-3), min-height (min-vh-25), texte (text-dark, text-center), et flex -->
                <div class="bloc-bleu-clair w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Bleu clair (bg-info)</h1>
                        <span class="text-body fw-normal">Ce bloc utilise la couleur Bootstrap <strong>bg-info</strong> pour un bleu clair d'accentuation.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 3 blocs bleu moyen (Desktop) / 1 bloc pleine largeur + 2 blocs côte à côte (Mobile) -->
        <div class="row mb-3">
            <div class="col-12 col-md-4 mb-3 mb-md-0">
                <!-- Même logique pour les blocs personnalisés : padding, arrondi, min-height, texte -->
                <div class="bloc-bleu w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Bleu moyen (#9DB4D4)</h1>
                        <span class="text-body fw-normal">Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4 mb-3 mb-md-0">
                <div class="bloc-bleu w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Bleu moyen (#9DB4D4)</h1>
                        <span class="text-body fw-normal">Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="bloc-bleu w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Bleu moyen (#9DB4D4)</h1>
                        <span class="text-body fw-normal">Bloc bleu moyen personnalisé, couleur hexadécimale <strong>#9DB4D4</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2 blocs violets (Desktop: 2/3 et 1/3) / (Mobile: 1 pleine largeur + 1 petit centré + 1 moyen centré) -->
        <div class="row mb-3 d-flex flex-column flex-md-row align-items-center align-items-md-start">
            <div class="col-8 mb-3 order-2 order-md-1">
                <div class="bloc-violet w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Violet (#C8A8E0)</h1>
                        <span class="text-body fw-normal">Bloc violet personnalisé, couleur hexadécimale <strong>#C8A8E0</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-4 mb-3 order-1 order-md-2">
                <div class="bloc-violet w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-4 fs-md-3 fw-bold mb-1 mb-md-2">Violet (#C8A8E0)</h1>
                        <span class="text-body fw-normal">Bloc violet personnalisé, couleur hexadécimale <strong>#C8A8E0</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-4 fs-md-3</b> : taille de police du titre (plus petit sur mobile, plus grand sur desktop)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-1 mb-md-2</b> : marge inférieure sous le titre (plus petite sur mobile)<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile: 3 blocs oranges sur même ligne -->
        <div class="row d-md-none">
            <div class="col-4">
                <div class="bloc-orange w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                        <small class="d-block mt-2 text-secondary">
                            <u>Classes Bootstrap utilisées :</u><br>
                            <b>fs-3</b> : taille de police de titre (équivalent h3)<br>
                            <b>fw-bold</b> : texte en gras<br>
                            <b>mb-2</b> : marge inférieure sous le titre<br>
                            <b>text-body</b> : style de texte d'article<br>
                            <b>fw-normal</b> : texte non gras
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="bloc-orange w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="bloc-orange w-100 d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3 min-vh-25">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop: 3 lignes de blocs oranges en diagonale -->
        <!-- Première ligne: bloc orange dans la 1ère colonne (80% de largeur) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4">
                <div class="bloc-orange d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3" style="width: 80%;">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Deuxième ligne: bloc orange dans la 2ème colonne (justifié à gauche) -->
        <div class="row mb-3 d-none d-md-flex">
            <div class="col-md-4 offset-md-4">
                <div class="bloc-orange d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3" style="width: 80%;">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Troisième ligne: bloc orange dans la 3ème colonne (justifié à droite) -->
        <div class="row d-none d-md-flex">
            <div class="col-md-4 offset-md-8">
                <div class="bloc-orange ms-auto d-flex flex-column align-items-center justify-content-center text-dark p-4 rounded-3" style="width: 80%;">
                    <div class="w-100 overflow-hidden text-wrap text-center">
                        <h1 class="fs-3 fw-bold mb-2">Orange (bg-warning)</h1>
                        <span class="text-body fw-normal">Bloc orange utilisant la couleur Bootstrap <strong>bg-warning</strong>.</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
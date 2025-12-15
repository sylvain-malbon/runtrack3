<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaPlateforme_</title>

    <!-- CSS Bootstrap -->
    <link href="./assets/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link href="./style.css" rel="stylesheet">
</head>
<body>

    <header>
        <!-- Barre de navigation Bootstrap -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div class="container-fluid">
                <a class="navbar-brand fw-normal" href="#">LPTF</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-3">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Units</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Jobs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Skills</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main class="container-fluid">
        <h1 class="display-4 text-center mb-4">LaPlateforme_</h1>
        <div class="row justify-content-center gx-4">
            <!-- Colonne gauche : Carte papillon -->
            <div class="col-lg-3 mb-4">
                <div class="card shadow-sm">
                    <img src="./img/papillon.jpg" class="card-img-top" alt="Papillon">
                    <div class="card-body">
                        <h5 class="card-title">Un Papillon</h5>
                        <p class="card-text">Un papillon, c'est un peu comme une chenille, mais avec des ailes. Ne pas ingérer.</p>
                        <button class="btn btn-primary w-100" style="font-weight:500;">Commander votre propre papillon</button>
                    </div>
                </div>
            </div>
            <!-- Colonne centrale : Jumbotron et pagination -->
            <div class="col-lg-7 mb-4">
                <div class="jumbotron-custom p-5 mb-3">
                    <h1 class="display-4">Bonjour, monde!</h1>
                    <p class="lead mb-1">Il existe plusieurs visions du terme :</p>
                    <p class="mb-1">le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                    <p class="mb-1">Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                    <hr class="my-4">
                    <p class="mb-4">Le sens étendu désigne l'univers dans son ensemble.</p>
                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-danger btn-lg me-2">Rebooter le Monde</button>
                        <span class="align-middle"><span class="spinner-border text-info" role="status"></span></span>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-end mb-0">
                            <li class="page-item disabled"><a class="page-link">«</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- Colonne droite : Liste groupée -->
            <div class="col-lg-2 mb-4">
                <div class="list-group mb-4">
                    <a href="#" class="list-group-item list-group-item-action active">Limbes</a>
                    <a href="#" class="list-group-item list-group-item-action">Luxure</a>
                    <a href="#" class="list-group-item list-group-item-action">Gourmandise</a>
                    <a href="#" class="list-group-item list-group-item-action">Avarice</a>
                    <a href="#" class="list-group-item list-group-item-action">Colere</a>
                    <a href="#" class="list-group-item list-group-item-action">Heresie</a>
                    <a href="#" class="list-group-item list-group-item-action">Violence</a>
                    <a href="#" class="list-group-item list-group-item-action">Ruse et Tromperie</a>
                    <a href="#" class="list-group-item list-group-item-action">Trahison</a>
                    <a href="#" class="list-group-item list-group-item-action">Internet Explorer</a>
                </div>
            </div>
        </div>
        <!-- Progress bar sur toute la largeur -->
        <div class="row mb-4 justify-content-center">
            <div class="col-lg-6">
                <div class="d-flex flex-column">
                    <div class="w-100 text-end mb-1">
                        <span class="fw-bold" style="white-space:nowrap;">Installation de AI 9000</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="me-1" style="font-size:1.1rem;">&#8592;|</span>
                        <div class="flex-grow-1">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-striped-custom"
                                     role="progressbar"
                                     style="width: 80%; min-width: 40px;"
                                     aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                        <span class="ms-1" style="font-size:1.1rem;">|&#8594;</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Deux formulaires en bas -->
        <div class="row mb-5 justify-content-center">
            <div class="col-md-4">
                <!-- Formulaire gauche -->
                <h5>Recevez votre copie gratuite d'internet 2!</h5>
                <form>
                    <div class="mb-2 input-group">
                        <span class="input-group-text">@</span>
                        <input type="text" class="form-control" placeholder="Login">
                    </div>
                    <div class="mb-2 input-group">
                        <input type="password" class="form-control" placeholder="Mot de Passe">
                        <span class="input-group-text">@example.com</span>
                    </div>
                    <div class="mb-2">
                        <label class="form-label mb-1" style="font-weight:500;">URL des Internets 2 et 2.1 Beta</label>
                        <div class="input-group mb-2">
                            <span class="input-group-text">DogeCoin</span>
                            <input type="text" class="form-control" placeholder="">
                            <span class="input-group-text">.00</span>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="https://l33t.lptf/dkwb/berlusconimkt/">
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-3"></div> <!-- Colonne vide pour l'espace -->
            <div class="col-md-2">
                <!-- Formulaire droit -->
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </main>

    <footer class="bg-dark text-white text-center py-3 mt-4">
        &copy; 2025 La Plateforme_ - Tous droits réservés
    </footer>

    <!-- Link script bootstrap -->
    <script src="./assets/bootstrap-5.3.8/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>
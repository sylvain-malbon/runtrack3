<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de compte - Job 04</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Heroicons CDN pour les icônes -->
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-gray-100">
    <!-- Header avec navigation stylisé Tailwind -->
    <header class="bg-blue-600 shadow">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="text-white text-2xl font-bold">Mon Site</div>
            <ul class="flex space-x-6">
                <li><a class="text-white hover:text-blue-200 font-medium transition" href="index.php">Accueil</a></li>
                <li><a class="text-white hover:text-blue-200 font-medium transition" href="index.php">Inscription</a></li>
                <li><a class="text-white hover:text-blue-200 font-medium transition" href="index.php">Connexion</a></li>
                <li><a class="text-white hover:text-blue-200 font-medium transition" href="index.php">Rechercher</a></li>
            </ul>
        </nav>
    </header>

    <!-- Section formulaire de création de compte stylisé Tailwind + icônes -->
    <section class="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Créer un compte</h2>
        <form action="#" method="post" class="space-y-5">
            <!-- Civilité -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Civilité :</label>
                <div class="flex items-center space-x-4">
                    <label class="inline-flex items-center">
                        <input type="radio" id="mr" name="civilite" value="mr" class="form-radio text-blue-600">
                        <span class="ml-2">Monsieur</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" id="mme" name="civilite" value="mme" class="form-radio text-blue-600">
                        <span class="ml-2">Madame</span>
                    </label>
                </div>
            </div>

            <!-- Prénom -->
            <div>
                <label for="prenom" class="block text-gray-700 font-medium mb-1">Prénom</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="user"></span>
                    <input type="text" id="prenom" name="prenom" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Nom -->
            <div>
                <label for="nom" class="block text-gray-700 font-medium mb-1">Nom</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="user-check"></span>
                    <input type="text" id="nom" name="nom" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Adresse -->
            <div>
                <label for="adresse" class="block text-gray-700 font-medium mb-1">Adresse</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="map-pin"></span>
                    <input type="text" id="adresse" name="adresse" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="mail"></span>
                    <input type="email" id="email" name="email" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Mot de passe -->
            <div>
                <label for="password" class="block text-gray-700 font-medium mb-1">Mot de passe</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="lock"></span>
                    <input type="password" id="password" name="password" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Validation mot de passe -->
            <div>
                <label for="password2" class="block text-gray-700 font-medium mb-1">Confirmer le mot de passe</label>
                <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" data-feather="lock"></span>
                    <input type="password" id="password2" name="password2" required
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition" />
                </div>
            </div>

            <!-- Passions -->
            <div>
                <label class="block text-gray-700 font-medium mb-2">Passions :</label>
                <div class="flex flex-wrap gap-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="informatique" name="passions[]" value="informatique" class="form-checkbox text-blue-600">
                        <span class="ml-2">Informatique</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="voyages" name="passions[]" value="voyages" class="form-checkbox text-blue-600">
                        <span class="ml-2">Voyages</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="sport" name="passions[]" value="sport" class="form-checkbox text-blue-600">
                        <span class="ml-2">Sport</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="lecture" name="passions[]" value="lecture" class="form-checkbox text-blue-600">
                        <span class="ml-2">Lecture</span>
                    </label>
                </div>
            </div>

            <!-- Bouton de validation -->
            <div class="text-center">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition">
                    Créer le compte
                </button>
            </div>
        </form>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-700 mt-10">
        <ul class="container mx-auto px-4 py-6 flex justify-center space-x-8">
            <li><a class="text-white hover:text-blue-300 font-medium transition" href="index.php">Accueil</a></li>
            <li><a class="text-white hover:text-blue-300 font-medium transition" href="index.php">Inscription</a></li>
            <li><a class="text-white hover:text-blue-300 font-medium transition" href="index.php">Connexion</a></li>
            <li><a class="text-white hover:text-blue-300 font-medium transition" href="index.php">Rechercher</a></li>
        </ul>
    </footer>
    <script>
        feather.replace();
    </script>
</body>
</html>

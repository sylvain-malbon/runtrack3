<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page v4</title>
    <link rel="stylesheet" href="./assets/app.css">
</head>
<body class="font-display">

    <!-- Navbar -->
    <nav class="bg-white shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-2xl font-bold text-brand">MonSite</div>
            <ul class="flex gap-8">
                <li><a href="#" class="hover:text-brand transition">Accueil</a></li>
                <li><a href="#" class="hover:text-brand transition">Features</a></li>
                <li><a href="#" class="hover:text-brand transition">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero -->
    <section class="bg-gradient-to-br from-brand to-accent text-white py-24">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-6xl font-extrabold mb-6">
                Tailwind CSS v4
            </h1>
            <p class="text-2xl mb-10 max-w-2xl mx-auto">
                Configuration CSS natif, plus rapide, plus simple
            </p>
            <button class="btn-cta">Commencer maintenant</button>
        </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">
                Pourquoi v4 ?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-brand">
                        Plus simple
                    </h3>
                    <p class="text-gray-600">
                        Configuration CSS natif au lieu de JavaScript
                    </p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-brand">
                        Plus rapide
                    </h3>
                    <p class="text-gray-600">
                        Engine Oxide 10x plus performant
                    </p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-brand">
                        Plus moderne
                    </h3>
                    <p class="text-gray-600">
                        Aligné sur standards CSS actuels
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4 text-center">
            <p>© 2025 MonSite - Tailwind CSS v4</p>
        </div>
    </footer>

</body>
</html>
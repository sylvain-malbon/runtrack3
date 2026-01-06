<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Présences — La Plateforme_</title>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Palette personnalisée -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            plateforme: {
              blue: "#003BFF",
              dark: "#0A0A0A",
              light: "#F5F7FA"
            }
          }
        }
      }
    }
  </script>

  <!-- Styles perso -->
  <link rel="stylesheet" href="assets/styles/style.css">

  <!-- Police Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>

<body class="bg-plateforme-light text-gray-900">

  <!-- NAVBAR -->
<nav class="backdrop-blur-md bg-plateforme-blue/90 text-white px-8 py-4 flex justify-between items-center shadow">

    <div class="text-xl font-bold tracking-wide">La Plateforme_</div>
    <div class="space-x-6 font-medium">
      <a href="#login" class="hover:opacity-80">Connexion</a>
      <a href="#logout" class="hover:opacity-80">Déconnexion</a>
      <a href="#register" class="hover:opacity-80">Inscription</a>
      <a href="#calendar" class="hover:opacity-80">Calendrier</a>
      <a href="#requests" class="hover:opacity-80">Mes demandes</a>
      <a href="#admin" class="hover:opacity-80">Admin</a>
    </div>
  </nav>

  <!-- SECTIONS -->
  <main class="p-6 max-w-3xl mx-auto">

    <!-- LOGIN -->
    <section id="login" class="hidden fade-in card">
      <h1 class="text-2xl font-bold mb-4">Connexion</h1>
      <input id="email" type="email" placeholder="Email" class="input mb-3">
      <input id="password" type="password" placeholder="Mot de passe" class="input mb-3">
      <button onclick="login()" class="btn btn-primary">Se connecter</button>
    </section>

    <!-- REGISTER -->
<section id="register" class="hidden fade-in card">
  <h1 class="text-2xl font-bold mb-4">Inscription</h1>

  <input id="reg-nom" type="text" placeholder="Nom" class="input mb-3">
  <input id="reg-prenom" type="text" placeholder="Prénom" class="input mb-3">
  <input id="reg-email" type="email" placeholder="Email @laplateforme.io" class="input mb-3">
  <input id="reg-password" type="password" placeholder="Mot de passe" class="input mb-3">

  <button onclick="registerUser()" class="btn btn-primary">Créer mon compte</button>

  <p class="mt-4 text-sm">
    Déjà un compte ?
    <a href="#login" class="text-plateforme-blue font-semibold">Se connecter</a>
  </p>
</section>

    <!-- CALENDAR -->
    <section id="calendar" class="hidden fade-in card">
      <h1 class="text-2xl font-bold mb-4">Calendrier</h1>
      <input type="date" id="date-picker" class="input mb-3">
      <button onclick="requestPresence()" class="btn bg-green-600 text-white hover:bg-green-700">Demander présence</button>
    </section>

    <!-- REQUESTS -->
    <section id="requests" class="hidden fade-in card">
      <h1 class="text-2xl font-bold mb-4">Mes demandes</h1>
      <div id="requests-list"></div>
    </section>

    <!-- ADMIN -->
<section id="admin" class="hidden fade-in card">
  <h1 class="text-2xl font-bold mb-1">Backoffice</h1>
  <p class="text-gray-500 text-sm mb-6">Gérez les demandes de présence et les rôles utilisateurs</p>

  <!-- DEMANDES -->
  <h2 class="text-xl font-semibold mt-6 mb-2">Demandes en attente</h2>
  <div id="admin-requests"></div>

  <!-- UTILISATEURS -->
  <h2 class="text-xl font-semibold mt-8 mb-3 flex items-center gap-2">
    <span>Gestion des utilisateurs</span>
    <span class="text-sm font-normal text-gray-500">(Rôles et permissions)</span>
  </h2>
  <div id="admin-users"></div>
</section>


  </main>

  <!-- SCRIPTS -->
  <script src="assets/js/register.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/logout.js"></script>
  <script src="assets/js/calendar.js"></script>
  <script src="assets/js/requests.js"></script>
  <script src="assets/js/admin.js"></script>
  <script src="assets/js/router.js"></script>


</body>
</html>

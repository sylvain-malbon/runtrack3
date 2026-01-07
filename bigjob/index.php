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
              blue: "#0034dfff",
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
<nav class="navbar bg-plateforme-blue">
    <a class="font-bold text-xl flex items-center overflow-hidden" href="#accueil">
        <img src="assets/img/Laplateforme_Bleuroi.jpg" 
     alt="La Plateforme_" 
     class="h-8 w-40 object-cover object-center rounded-lg"
     style="transform: scale(1.5);">
    </a>
    <ul class="navbar-nav">
        <li class="nav-item" id="nav-accueil">
            <a class="nav-link" href="#accueil">Accueil</a>
        </li>
        <li class="nav-item" id="nav-calendrier" style="display: none;">
            <a class="nav-link" href="#calendrier">Calendrier</a>
        </li>
        <li class="nav-item" id="nav-demandes" style="display: none;">
            <a class="nav-link" href="#mes-demandes">Mes demandes</a>
        </li>
        <li class="nav-item" id="nav-admin" style="display: none;">
            <a class="nav-link" href="#admin">Administration</a>
        </li>
        <li class="nav-item" id="nav-inscription">
            <a class="nav-link" href="#inscription">Inscription</a>
        </li>
        <li class="nav-item" id="nav-connexion">
            <a class="nav-link" href="#connexion">Connexion</a>
        </li>
        <li class="nav-item" id="nav-deconnexion" style="display: none;">
            <a class="nav-link" href="#" onclick="logout(); return false;">Déconnexion</a>
        </li>
    </ul>
</nav>

  <!-- SECTIONS -->
  <main class="p-6 max-w-3xl mx-auto">

    <!-- ACCUEIL -->
    <section id="accueil" class="fade-in card">
      <h1 class="text-3xl font-bold mb-4">Bienvenue sur La Plateforme_</h1>
      <p class="text-gray-600 mb-6">Gérez vos présences simplement et efficacement.</p>
      <div class="flex gap-4">
        <a href="#connexion" class="btn btn-primary">Se connecter</a>
        <a href="#inscription" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300">S'inscrire</a>
      </div>
    </section>

    <!-- LOGIN -->
    <section id="connexion" class="hidden fade-in card">
      <h1 class="text-2xl font-bold mb-4">Connexion</h1>
      <input id="email" type="email" placeholder="Email" class="input mb-3">
      <input id="password" type="password" placeholder="Mot de passe" class="input mb-3">
      <button onclick="login()" class="btn btn-primary">Se connecter</button>
    </section>

    <!-- REGISTER -->
<section id="inscription" class="hidden fade-in card">
  <h1 class="text-2xl font-bold mb-4">Inscription</h1>

  <input id="reg-nom" type="text" placeholder="Nom" class="input mb-3">
  <input id="reg-prenom" type="text" placeholder="Prénom" class="input mb-3">
  <input id="reg-email" type="email" placeholder="Email @laplateforme.io" class="input mb-3">
  <input id="reg-password" type="password" placeholder="Mot de passe" class="input mb-3">

  <button onclick="registerUser()" class="btn btn-primary">Créer mon compte</button>

  <p class="mt-4 text-sm">
    Déjà un compte ?
    <a href="#connexion" class="text-plateforme-blue font-semibold">Se connecter</a>
  </p>
</section>

    <!-- CALENDAR -->
    <section id="calendrier" class="hidden fade-in card">
      <h1 class="text-2xl font-bold mb-6">Calendrier des présences</h1>
      
      <!-- Navigation mois -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="previousMonth()" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2">
          ← Précédent
        </button>
        <h2 id="calendar-month-year" class="text-xl font-semibold"></h2>
        <button onclick="nextMonth()" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2">
          Suivant →
        </button>
      </div>

      <!-- Calendrier -->
      <div class="mb-6">
        <!-- Jours de la semaine -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div class="text-center text-sm font-semibold text-gray-600">Lun</div>
          <div class="text-center text-sm font-semibold text-gray-600">Mar</div>
          <div class="text-center text-sm font-semibold text-gray-600">Mer</div>
          <div class="text-center text-sm font-semibold text-gray-600">Jeu</div>
          <div class="text-center text-sm font-semibold text-gray-600">Ven</div>
          <div class="text-center text-sm font-semibold text-gray-600">Sam</div>
          <div class="text-center text-sm font-semibold text-gray-600">Dim</div>
        </div>
        
        <!-- Grille des dates -->
        <div id="calendar-grid" class="grid grid-cols-7 gap-2"></div>
      </div>

      <!-- Date sélectionnée et bouton -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="text-sm text-gray-600 mb-2">Date sélectionnée :</p>
        <p id="selected-date-display" class="text-lg font-semibold text-plateforme-blue mb-3">Aucune date sélectionnée</p>
        <button onclick="requestPresence()" class="btn bg-green-600 text-white hover:bg-green-700 w-full">
          ✓ Demander présence
        </button>
      </div>
    </section>

    <!-- REQUESTS -->
    <section id="mes-demandes" class="hidden fade-in card">
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
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/register.js"></script>
  <script src="assets/js/navigation.js"></script>
  <script src="assets/js/router.js"></script>
  <script src="assets/js/calendar.js"></script>
  <script src="assets/js/requests.js"></script>
  <script src="assets/js/admin.js"></script>

</body>
</html>

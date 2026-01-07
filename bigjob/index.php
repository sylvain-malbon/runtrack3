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
<nav class="bg-plateforme-blue backdrop-blur-xl text-white px-8 py-4 flex justify-between items-center shadow-lg">
    <a class="font-bold text-xl flex items-center overflow-hidden" href="#accueil">
        <img src="assets/img/Laplateforme_Bleuroi.jpg" 
     alt="La Plateforme_" 
     class="h-8 w-40 object-cover object-center rounded-lg"
     style="transform: scale(1.5);">
    </a>
    <div id="user-welcome" class="text-white font-semibold flex items-center gap-2" style="display: none;">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span id="user-welcome-text"></span>
    </div>
    <ul class="flex list-none gap-2 m-0">
        <li class="m-0" id="nav-accueil">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#accueil">Accueil</a>
        </li>
        <li class="m-0" id="nav-calendrier" style="display: none;">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#calendrier">Calendrier</a>
        </li>
        <li class="m-0" id="nav-demandes" style="display: none;">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#mes-demandes">Mes demandes</a>
        </li>
        <li class="m-0" id="nav-admin" style="display: none;">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#admin">Administration</a>
        </li>
        <li class="m-0" id="nav-inscription">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#inscription">Inscription</a>
        </li>
        <li class="m-0" id="nav-connexion">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#connexion">Connexion</a>
        </li>
        <li class="m-0" id="nav-deconnexion" style="display: none;">
            <a class="text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200" href="#" onclick="logout(); return false;">Déconnexion</a>
        </li>
    </ul>
</nav>

  <!-- SECTIONS -->
  <main class="p-6 mx-auto" style="max-width: min(95vw, 1400px);">

    <!-- ACCUEIL -->
    <section id="accueil" class="fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style="max-width: 768px; margin-left: auto; margin-right: auto;">
      <h1 class="text-3xl font-bold mb-4">Bienvenue sur La Plateforme_</h1>
      <p class="text-gray-600 mb-6">Gérez vos présences simplement et efficacement.</p>
      <div class="flex gap-4">
        <a href="#connexion" class="px-6 py-3 rounded-xl font-semibold bg-plateforme-blue text-white hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-200 inline-block no-underline">Se connecter</a>
        <a href="#inscription" class="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-200 inline-block no-underline">S'inscrire</a>
      </div>
    </section>

    <!-- LOGIN -->
    <section id="connexion" class="hidden fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style="max-width: 768px; margin-left: auto; margin-right: auto;">
      <h1 class="text-2xl font-bold mb-4">Connexion</h1>
      <input id="email" type="email" placeholder="Email" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">
      <input id="password" type="password" placeholder="Mot de passe" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">
      <button onclick="login()" class="px-6 py-3 rounded-xl font-semibold bg-plateforme-blue text-white hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer">Se connecter</button>
    </section>

    <!-- REGISTER -->
<section id="inscription" class="hidden fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style="max-width: 768px; margin-left: auto; margin-right: auto;">
  <h1 class="text-2xl font-bold mb-4">Inscription</h1>

  <input id="reg-nom" type="text" placeholder="Nom" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">
  <input id="reg-prenom" type="text" placeholder="Prénom" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">
  <input id="reg-email" type="email" placeholder="Email @laplateforme.io" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">
  <input id="reg-password" type="password" placeholder="Mot de passe" class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none mb-3">

  <button onclick="registerUser()" class="px-6 py-3 rounded-xl font-semibold bg-plateforme-blue text-white hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer">Créer mon compte</button>

  <p class="mt-4 text-sm">
    Déjà un compte ?
    <a href="#connexion" class="text-plateforme-blue font-semibold">Se connecter</a>
  </p>
</section>

    <!-- CALENDAR -->
    <section id="calendrier" class="hidden fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style="max-width: 768px; margin-left: auto; margin-right: auto;">
      <h1 class="text-2xl font-bold mb-6">Calendrier des présences</h1>
      
      <!-- Navigation mois -->
      <div class="flex items-center justify-between mb-6">
        <button onclick="previousMonth()" class="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer">
          ← Précédent
        </button>
        <h2 id="calendar-month-year" class="text-xl font-semibold"></h2>
        <button onclick="nextMonth()" class="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer">
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
        <button onclick="requestPresence()" class="px-6 py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer w-full">
          ✓ Demander présence
        </button>
      </div>
    </section>

    <!-- REQUESTS -->
    <section id="mes-demandes" class="hidden fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200" style="max-width: 768px; margin-left: auto; margin-right: auto;">
      <h1 class="text-2xl font-bold mb-4">Mes demandes</h1>
      <div id="requests-list"></div>
    </section>

    <!-- ADMIN -->
<section id="admin" class="hidden fade-in bg-white rounded-2xl p-8 shadow-lg mb-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-1">Backoffice</h1>
    <p class="text-gray-500 text-sm">Gérez les demandes de présence et les rôles utilisateurs</p>
  </div>

  <!-- ONGLETS -->
  <div class="flex border-b border-gray-200 mb-6 -mx-2 px-2" style="overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
    <style>
      .admin-tabs-container::-webkit-scrollbar { display: none; }
    </style>
    <button onclick="switchAdminTab('stats')" id="tab-stats" class="admin-tab px-4 sm:px-6 py-3 font-semibold text-sm border-b-2 border-b-transparent text-gray-500 hover:text-plateforme-blue hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-all duration-200 flex-shrink-0">
      <span class="hidden sm:inline">📊 Statistiques</span>
      <span class="sm:hidden">📊 Stats</span>
    </button>
    <button onclick="switchAdminTab('requests')" id="tab-requests" class="admin-tab px-4 sm:px-6 py-3 font-semibold text-sm border-b-2 border-b-transparent text-gray-500 hover:text-plateforme-blue hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-all duration-200 flex-shrink-0">
      <span class="hidden sm:inline">📋 Demandes</span>
      <span class="sm:hidden">📋 Demandes</span>
    </button>
    <button onclick="switchAdminTab('users')" id="tab-users" class="admin-tab px-4 sm:px-6 py-3 font-semibold text-sm border-b-2 border-b-transparent text-gray-500 hover:text-plateforme-blue hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-all duration-200 flex-shrink-0">
      <span class="hidden sm:inline">👥 Utilisateurs</span>
      <span class="sm:hidden">👥 Users</span>
    </button>
  </div>

  <!-- TAB STATISTIQUES -->
  <div id="admin-tab-stats" class="admin-tab-content">
    <div id="admin-stats"></div>
  </div>

  <!-- TAB DEMANDES -->
  <div id="admin-tab-requests" class="admin-tab-content hidden">
    <div class="mb-4 flex flex-col gap-3">
      <input type="text" id="search-requests" placeholder="🔍 Rechercher..." class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none">
      <select id="filter-request-status" onchange="filterRequests()" class="border border-gray-300 px-4 py-3 rounded-xl w-full sm:w-auto transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none cursor-pointer hover:border-plateforme-blue">
        <option value="all">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="approved">Acceptées</option>
        <option value="refused">Refusées</option>
      </select>
    </div>
    <div id="admin-requests"></div>
  </div>

  <!-- TAB UTILISATEURS -->
  <div id="admin-tab-users" class="admin-tab-content hidden">
    <div class="mb-4 flex flex-col gap-3">
      <input type="text" id="search-users" placeholder="🔍 Rechercher..." class="border border-gray-300 px-4 py-3 rounded-xl w-full transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none">
      <div class="flex flex-col sm:flex-row gap-3">
        <select id="filter-user-role" onchange="filterUsers()" class="border border-gray-300 px-4 py-3 rounded-xl w-full sm:flex-1 transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none cursor-pointer hover:border-plateforme-blue">
          <option value="all">Tous les rôles</option>
          <option value="superadmin">SuperAdmin</option>
          <option value="admin">Admin</option>
          <option value="moderator">Modérateur</option>
          <option value="user">User</option>
        </select>
        <select id="filter-user-status" onchange="filterUsers()" class="border border-gray-300 px-4 py-3 rounded-xl w-full sm:flex-1 transition-all duration-200 focus:border-plateforme-blue focus:ring-4 focus:ring-blue-200 focus:outline-none cursor-pointer hover:border-plateforme-blue">
          <option value="all">Tous les statuts</option>
          <option value="approved">Validés</option>
          <option value="pending">En attente</option>
          <option value="refused">Refusés</option>
        </select>
      </div>
    </div>
    <div id="admin-users"></div>
  </div>
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

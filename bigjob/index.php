<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>La Plateforme - Présences</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 text-gray-900">

  <!-- NAVBAR -->
  <nav class="bg-blue-700 text-white p-4 flex justify-between">
    <div class="font-bold">La Plateforme_</div>
    <div class="space-x-4">
      <a href="#login">Login</a>
      <a href="#calendar">Calendrier</a>
      <a href="#requests">Mes demandes</a>
      <a href="#admin">Admin</a>
    </div>
  </nav>

  <!-- SECTIONS -->
  <main class="p-6">

    <!-- LOGIN -->
    <section id="login" class="hidden">
      <h1 class="text-2xl font-bold mb-4">Connexion</h1>
      <input id="email" type="email" placeholder="Email" class="block mb-3 p-2 border rounded w-64">
      <input id="password" type="password" placeholder="Mot de passe" class="block mb-3 p-2 border rounded w-64">
      <button onclick="login()" class="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
    </section>

    <!-- CALENDAR -->
    <section id="calendar" class="hidden">
      <h1 class="text-2xl font-bold mb-4">Calendrier</h1>
      <input type="date" id="date-picker" class="p-2 border rounded mb-3">
      <button onclick="requestPresence()" class="bg-green-600 text-white px-4 py-2 rounded">Demander présence</button>
    </section>

    <!-- REQUESTS -->
    <section id="requests" class="hidden">
      <h1 class="text-2xl font-bold mb-4">Mes demandes</h1>
      <div id="requests-list"></div>
    </section>

    <!-- ADMIN -->
    <section id="admin" class="hidden">
      <h1 class="text-2xl font-bold mb-4">Backoffice</h1>
      <div id="admin-requests"></div>
    </section>

  </main>

  <!-- SCRIPTS -->
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/calendar.js"></script>
  <script src="assets/js/requests.js"></script>
  <script src="assets/js/admin.js"></script>
  <script src="assets/js/router.js"></script>

</body>
</html>

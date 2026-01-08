<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>O'CLock</title>

    <!-- Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Palette personnalisée -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        oclock: {
                            dial: "#004d3a",
                            bezel: "#00A651",
                            steel: "#C0C0C0",
                            steelDark: "#808080",
                            white: "#F5F5F5",
                            dark: "#0A0A0A",
                            bgTop: "#d4ebe1",
                            bgBottom: "#b8ddc9",
                            yellow: "#e6f200",
                            accent: "#00cc66",
                            shadow: "rgba(0, 77, 58, 0.08)"
                        }
                    },
                    fontFamily: {
                        'montserrat': ['Montserrat', 'sans-serif'],
                        'roboto-mono': ['Roboto Mono', 'monospace']
                    },
                    letterSpacing: {
                        'tight-custom': '-0.02em'
                    },
                    maxWidth: {
                        'custom': 'min(95vw, 1400px)'
                    }
                }
            }
        }
    </script>

    <!-- Styles perso -->
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- Polices Modernes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">

</head>

<body class="text-gray-900 font-montserrat bg-gradient-to-br from-oclock-bgTop to-oclock-bgBottom min-h-screen">

    <!-- NAVBAR -->
    <nav class="text-white px-8 py-4 flex justify-between items-center border-b-2 border-white/30 font-montserrat font-semibold bg-oclock-bezel shadow-lg">
        <a class="font-bold flex items-center justify-center gap-3 tracking-wide text-white hover:text-white/90 transition-colors" href="#accueil">
            <span class="text-oclock-yellow text-3xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">O'CLock</span>
        </a>
        <ul class="flex list-none gap-2 m-0">
            <li class="m-0" id="nav-horloge">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/20 transition-all duration-200 rounded font-semibold" href="#accueil">Horloge</a>
            </li>
            <li class="m-0" id="nav-reveil" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/20 transition-all duration-200 rounded font-semibold" href="#reveil">Réveil</a>
            </li>
            <li class="m-0" id="nav-minuteur" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/20 transition-all duration-200 rounded font-semibold" href="#minuteur">Minuteur</a>
            </li>
            <li class="m-0" id="nav-chronometre" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/20 transition-all duration-200 rounded font-semibold" href="#chronometre">Chronomètre</a>
            </li>
        </ul>
    </nav>

    <!-- SECTIONS -->
    <main class="p-6 mx-auto relative z-[2] max-w-custom">

        <!-- 1. HORLOGE -->
        <section id="oclock" class="fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-xl font-montserrat bg-white shadow-[0_8px_32px_rgba(0,77,58,0.12)]">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Horloge</h1>
            <p class="text-center mb-8 text-base font-medium text-gray-600">Heure actuelle</p>

            <!-- Horloge CSS décorative -->
            <article class="clock simple rounded-full w-80 h-80 relative mx-auto mb-10 bg-oclock-dial border-[6px] border-white">
                <div class="hours-container absolute inset-0">
                    <div class="hours absolute rounded-sm bg-white"></div>
                </div>
                <div class="minutes-container absolute inset-0">
                    <div class="minutes absolute rounded-sm bg-white"></div>
                </div>
                <div class="seconds-container absolute inset-0">
                    <div class="seconds absolute rounded-full z-[8] bg-oclock-yellow"></div>
                </div>
            </article>

            <!-- Horloge numérique (CDC) -->
            <div class="text-center">
                <div id="affichageHorloge" class="text-7xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">00:00:00</div>
            </div>
        </section>

        <!-- 2. MINUTEUR -->
        <section id="timer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-xl font-montserrat bg-white shadow-[0_8px_32px_rgba(0,77,58,0.12)]">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Minuteur</h1>
            <p class="text-center mb-8 text-base font-medium text-gray-600">Compte à rebours</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-8">
                <div id="affichageMinuteur" class="text-8xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">05:00</div>
            </div>

            <!-- Contrôles +/- -->
            <div class="flex justify-center gap-4 mb-6">
                <button id="btnMoinsMinuteur" onclick="diminuerMinuteur()" class="w-16 h-16 bg-gray-100 text-gray-800 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors border-2 border-gray-300">
                    −
                </button>
                <button id="btnPlusMinuteur" onclick="augmenterMinuteur()" class="w-16 h-16 bg-gray-100 text-gray-800 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors border-2 border-gray-300">
                    +
                </button>
            </div>

            <!-- Input pour définir le temps -->
            <div class="flex justify-center gap-4 mb-8">
                <div class="flex-1 max-w-xs">
                    <label for="inputMinuteur" class="block text-sm font-semibold mb-2 text-gray-800">Définir le temps (MM:SS)</label>
                    <input
                        type="text"
                        id="inputMinuteur"
                        placeholder="05:00"
                        maxlength="5"
                        class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oclock-bezel text-center font-roboto-mono text-xl"
                        onkeypress="if(event.key === 'Enter') definirTempsMinuteur()">
                </div>
                <div class="flex items-end">
                    <button id="btnDefinirMinuteur" onclick="definirTempsMinuteur()" class="px-6 py-2 bg-oclock-bezel text-white font-semibold rounded-lg hover:bg-oclock-dial transition-colors">
                        Définir
                    </button>
                </div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4">
                <button id="btnDemarrerMinuteur" onclick="toggleMinuteur()" class="px-8 py-3 bg-oclock-bezel text-white font-bold text-lg rounded-lg hover:bg-oclock-dial transition-colors shadow-md">
                    Démarrer
                </button>
                <button onclick="resetMinuteur()" class="px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-lg hover:bg-gray-700 transition-colors shadow-md">
                    Reset
                </button>
            </div>
        </section>

        <!-- 3. CHRONOMETRE -->
        <section id="chronometer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-xl font-montserrat bg-white shadow-[0_8px_32px_rgba(0,77,58,0.12)]">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Chronomètre</h1>
            <p class="text-center mb-8 text-base font-medium text-gray-600">Mesure du temps écoulé</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-8">
                <div id="affichageChrono" class="text-8xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">00:00:00</div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4 mb-8">
                <button id="btnToggleChrono" onclick="toggleChrono()" class="px-8 py-3 bg-oclock-bezel text-white font-bold text-lg rounded-lg hover:bg-oclock-dial transition-colors shadow-md">
                    Démarrer
                </button>
                <button id="btnTourChrono" onclick="enregistrerTour()" disabled class="px-8 py-3 bg-oclock-accent text-white font-bold text-lg rounded-lg hover:bg-[#00b370] transition-colors opacity-50 shadow-md">
                    Tour
                </button>
                <button onclick="resetChrono()" class="px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-lg hover:bg-gray-700 transition-colors shadow-md">
                    Reset
                </button>
            </div>

            <!-- Liste des tours -->
            <div id="containerTours">
                <h2 class="text-xl font-bold mb-4 text-oclock-dial">Tours enregistrés</h2>
                <div id="listeTours" class="space-y-2">
                    <!-- Les tours seront ajoutés dynamiquement ici -->
                </div>
                <div id="messageAucunTour" class="text-center py-4 text-gray-400 italic">
                    Aucun tour enregistré
                </div>
            </div>
        </section>

        <!-- 4. REVEIL -->
        <section id="alarm" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-xl font-montserrat bg-white shadow-[0_8px_32px_rgba(0,77,58,0.12)]">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Réveil</h1>
            <p class="text-center mb-8 text-base font-medium text-gray-600">Programmez vos alarmes</p>

            <!-- Formulaire d'ajout d'alarme -->
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg mb-8 border border-gray-200">
                <h2 class="text-xl font-bold mb-4 text-oclock-dial">Nouvelle alarme</h2>
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <label for="alarmeHeure" class="block text-sm font-semibold mb-2 text-gray-800">Heure (HH:MM)</label>
                        <input type="time" id="alarmeHeure" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oclock-bezel">
                    </div>
                    <div class="flex-1">
                        <label for="alarmeMessage" class="block text-sm font-semibold mb-2 text-gray-800">Message</label>
                        <input type="text" id="alarmeMessage" placeholder="Ex: Réunion importante" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oclock-bezel">
                    </div>
                    <div class="flex items-end">
                        <button onclick="ajouterAlarme()" class="px-6 py-2 bg-oclock-bezel text-white font-semibold rounded-lg hover:bg-oclock-dial transition-colors duration-200">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Liste des alarmes -->
            <div id="listeAlarmes" class="space-y-3">
                <!-- Les alarmes seront ajoutées dynamiquement ici -->
            </div>

            <!-- Message si aucune alarme -->
            <div id="messageAucuneAlarme" class="text-center py-8 text-gray-400 italic">
                Aucune alarme programmée
            </div>
        </section>

    </main>

    <!-- SCRIPTS -->
    <script src="assets/js/script.js"></script>

</body>

</html>
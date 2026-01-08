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

<body class="text-gray-900 font-montserrat bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-oclock-bgTop to-oclock-bgBottom min-h-screen selection:bg-oclock-accent selection:text-white">

    <!-- NAVBAR -->
    <nav class="text-white px-8 py-4 flex justify-between items-center border-b border-white/20 font-montserrat font-semibold bg-oclock-bezel/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <a class="font-bold flex items-center justify-center gap-3 tracking-wide text-white hover:text-white/90 transition-colors group" href="#accueil">
            <span class="text-oclock-yellow text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform block">O'CLock</span>
        </a>
        <div class="flex items-center gap-6">
            <div id="horlogeNavbar" class="text-white font-roboto-mono text-2xl font-bold tracking-wider bg-black/20 px-5 py-2 rounded-lg border-2 border-white/10 shadow-inner">
                00:00:00
            </div>
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
        </div>
    </nav>

    <!-- SECTIONS -->
    <main class="p-6 mx-auto relative z-[2] max-w-custom">

        <!-- 1. HORLOGE -->
        <section id="oclock" class="glass-panel fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-2xl font-montserrat">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom drop-shadow-sm">Horloge</h1>
            <p class="text-center mb-8 text-base font-bold text-oclock-bezel/80 uppercase tracking-widest text-xs">Heure actuelle</p>

            <!-- Horloge CSS décorative -->
            <article class="clock simple rounded-full w-80 h-80 relative mx-auto mb-10">
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
                <div class="inline-block bg-white/50 backdrop-blur-sm px-12 py-6 rounded-2xl border border-white/60 shadow-inner">
                    <div id="affichageHorloge" class="neon-text text-7xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">00:00:00</div>
                </div>
            </div>
        </section>

        <!-- 2. MINUTEUR -->
        <section id="timer" class="glass-panel hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-2xl font-montserrat">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom drop-shadow-sm">Minuteur</h1>
            <p class="text-center mb-8 text-base font-bold text-oclock-bezel/80 uppercase tracking-widest text-xs">Compte à rebours</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-8">
                <div class="inline-block bg-white/50 backdrop-blur-sm px-12 py-6 rounded-2xl border border-white/60 shadow-inner">
                    <div id="affichageMinuteur" class="neon-text text-8xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">05:00</div>
                </div>
            </div>

            <!-- Contrôles +/- -->
            <div class="flex justify-center gap-4 mb-6">
                <button id="btnMoinsMinuteur" onclick="diminuerMinuteur()" class="w-16 h-16 bg-white/80 active:scale-95 text-oclock-dial text-3xl font-bold rounded-xl hover:bg-white transition-all shadow-md border hover:border-oclock-bezel/50">
                    −
                </button>
                <button id="btnPlusMinuteur" onclick="augmenterMinuteur()" class="w-16 h-16 bg-white/80 active:scale-95 text-oclock-dial text-3xl font-bold rounded-xl hover:bg-white transition-all shadow-md border hover:border-oclock-bezel/50">
                    +
                </button>
            </div>

            <!-- Input pour définir le temps -->
            <div class="flex justify-center gap-4 mb-8">
                <div class="flex-1 max-w-xs">
                    <label for="inputMinuteur" class="block text-sm font-bold mb-2 text-oclock-dial uppercase tracking-wide">Définir le temps (MM:SS)</label>
                    <input
                        type="text"
                        id="inputMinuteur"
                        placeholder="05:00"
                        maxlength="5"
                        class="w-full px-4 py-2 border border-gray-300 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-oclock-bezel focus:border-transparent text-center font-roboto-mono text-xl shadow-inner transition-all"
                        onkeypress="if(event.key === 'Enter') definirTempsMinuteur()">
                </div>
                <div class="flex items-end">
                    <button id="btnDefinirMinuteur" onclick="definirTempsMinuteur()" class="px-6 py-2 btn-modern text-white font-semibold rounded-lg">
                        Définir
                    </button>
                </div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4">
                <button id="btnDemarrerMinuteur" onclick="toggleMinuteur()" class="px-8 py-3 btn-modern text-white font-bold text-lg rounded-xl">
                    Démarrer
                </button>
                <button onclick="resetMinuteur()" class="px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-xl hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg">
                    Reset
                </button>
            </div>
        </section>

        <!-- 3. CHRONOMETRE -->
        <section id="chronometer" class="glass-panel hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-2xl font-montserrat">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom drop-shadow-sm">Chronomètre</h1>
            <p class="text-center mb-8 text-base font-bold text-oclock-bezel/80 uppercase tracking-widest text-xs">Mesure du temps écoulé</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-8">
                <div class="inline-block bg-white/50 backdrop-blur-sm px-12 py-6 rounded-2xl border border-white/60 shadow-inner">
                    <div id="affichageChrono" class="neon-text text-8xl font-bold font-roboto-mono text-oclock-dial tracking-[0.05em]">00:00:00</div>
                </div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4 mb-8">
                <button id="btnToggleChrono" onclick="toggleChrono()" class="px-8 py-3 btn-modern text-white font-bold text-lg rounded-xl">
                    Démarrer
                </button>
                <button id="btnTourChrono" onclick="enregistrerTour()" disabled class="px-8 py-3 bg-oclock-accent text-white font-bold text-lg rounded-xl hover:bg-[#00b370] transition-colors opacity-50 shadow-md">
                    Tour
                </button>
                <button onclick="resetChrono()" class="px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-xl hover:bg-gray-700 transition-colors shadow-md">
                    Reset
                </button>
            </div>

            <!-- Liste des tours -->
            <div id="containerTours" class="bg-white/40 rounded-xl p-4 shadow-inner">
                <h2 class="text-xl font-bold mb-4 text-oclock-dial">Tours enregistrés</h2>
                <div id="listeTours" class="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    <!-- Les tours seront ajoutés dynamiquement ici -->
                </div>
                <div id="messageAucunTour" class="text-center py-4 text-gray-500 italic font-medium">
                    Aucun tour enregistré
                </div>
            </div>
        </section>

        <!-- 4. REVEIL -->
        <section id="alarm" class="glass-panel hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-2xl font-montserrat">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom drop-shadow-sm">Réveil</h1>
            <p class="text-center mb-8 text-base font-bold text-oclock-bezel/80 uppercase tracking-widest text-xs">Programmez vos alarmes</p>

            <!-- Formulaire d'ajout d'alarme -->
            <div class="bg-white/50 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-white/60 shadow-inner">
                <h2 class="text-xl font-bold mb-4 text-oclock-dial flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> Nouvelle alarme</h2>
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <label for="alarmeHeure" class="block text-sm font-bold mb-2 text-oclock-dial uppercase">Heure</label>
                        <input type="time" id="alarmeHeure" class="w-full px-4 py-2 border border-gray-300 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-oclock-bezel focus:border-transparent shadow-sm">
                    </div>
                    <div class="flex-1">
                        <label for="alarmeMessage" class="block text-sm font-bold mb-2 text-oclock-dial uppercase">Message</label>
                        <input type="text" id="alarmeMessage" placeholder="Ex: Réunion importante" class="w-full px-4 py-2 border border-gray-300 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-oclock-bezel focus:border-transparent shadow-sm">
                    </div>
                    <div class="flex items-end">
                        <button onclick="ajouterAlarme()" class="px-6 py-2 btn-modern text-white font-semibold rounded-lg w-full sm:w-auto h-[42px]">
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
            <div id="messageAucuneAlarme" class="text-center py-8 text-gray-500 italic font-medium">
                Aucune alarme programmée
            </div>
        </section>

    </main>

    <!-- SCRIPTS -->
    <script src="assets/js/script.js"></script>

</body>

</html>
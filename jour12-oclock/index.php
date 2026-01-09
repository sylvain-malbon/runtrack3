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
                            dial: "#1a3a4a", // Bleu marine profond (Primaire)
                            bezel: "#4a7c8e", // Bleu-gris moyen (Secondaire)
                            steel: "#f5f1e8", // Crème clair (Neutre clair)
                            steelDark: "#c9a876", // Or chaud (Accent chaud)
                            white: "#ffffff", // Blanc pur
                            dark: "#2d3640", // Gris anthracite (Neutre foncé)
                            bgTop: "#faf8f3", // Crème très clair
                            bgBottom: "#e8e0d5", // Beige doux
                            yellow: "#c9a876", // Or chaud (identique steelDark)
                            accent: "#7a9ca8", // Bleu-gris clair (Tertiaire)
                            shadow: "rgba(26, 58, 74, 0.08)",
                            red: "#b91c1c", // Rouge profond (Actions critiques)
                            redLight: "#dc2626" // Rouge vif (Hover)
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

<body class="text-gray-900 font-montserrat bg-gradient-to-br from-oclock-bgTop via-oclock-steel to-oclock-bgBottom min-h-screen selection:bg-oclock-steelDark selection:text-white antialiased">

    <!-- NAVBAR -->
    <nav class="text-white px-12 py-5 flex justify-between items-center border-b border-oclock-steelDark/20 font-montserrat font-medium bg-oclock-dial sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <a class="font-light flex items-center justify-center gap-4 tracking-[0.2em] text-white hover:text-oclock-steelDark transition-colors group uppercase text-sm" href="#accueil">
            <span class="text-oclock-steelDark text-2xl font-light group-hover:tracking-[0.25em] transition-all block drop-shadow-[0_2px_8px_rgba(201,168,118,0.4)]">O'Clock</span>
        </a>
        <div class="flex items-center gap-8">
            <div id="horlogeNavbar" class="text-oclock-steelDark font-roboto-mono text-lg font-light tracking-[0.15em] bg-white/10 px-6 py-2.5 rounded border border-oclock-steelDark/50">
                00:00:00
            </div>
            <ul class="flex list-none gap-1 m-0">
                <li class="m-0" id="nav-horloge">
                    <a class="text-white no-underline px-5 py-2 hover:text-oclock-steelDark transition-all duration-300 font-light tracking-wider text-sm uppercase" href="#accueil">Horloge</a>
                </li>
                <li class="m-0 hidden" id="nav-reveil">
                    <a class="text-white no-underline px-5 py-2 hover:text-oclock-steelDark transition-all duration-300 font-light tracking-wider text-sm uppercase" href="#reveil">Réveil</a>
                </li>
                <li class="m-0 hidden" id="nav-minuteur">
                    <a class="text-white no-underline px-5 py-2 hover:text-oclock-steelDark transition-all duration-300 font-light tracking-wider text-sm uppercase" href="#minuteur">Minuteur</a>
                </li>
                <li class="m-0 hidden" id="nav-chronometre">
                    <a class="text-white no-underline px-5 py-2 hover:text-oclock-steelDark transition-all duration-300 font-light tracking-wider text-sm uppercase" href="#chronometre">Chronomètre</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- SECTIONS -->
    <main class="p-8 mx-auto relative z-[2] max-w-custom">

        <!-- 1. HORLOGE -->
        <section id="oclock" class="glass-panel fade-in mb-12 transition-all duration-200 max-w-4xl mx-auto p-16 relative rounded font-montserrat bg-white border border-oclock-bezel/25 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 class="text-4xl font-light mb-1 text-center text-oclock-dial tracking-[0.1em] uppercase">Horloge</h1>
            <p class="text-center mb-12 text-xs font-light text-oclock-bezel uppercase tracking-[0.3em]">Heure actuelle</p>

            <!-- Horloge CSS décorative -->
            <article class="clock simple rounded-full w-80 h-80 relative mx-auto mb-12">
                <div class="hours-container absolute inset-0">
                    <div class="hours absolute rounded-sm bg-white"></div>
                </div>
                <div class="minutes-container absolute inset-0">
                    <div class="minutes absolute rounded-sm bg-white"></div>
                </div>
                <div class="seconds-container absolute inset-0">
                    <div class="seconds absolute rounded-full z-[8] bg-oclock-steelDark"></div>
                </div>
            </article>

            <!-- Horloge numérique (CDC) -->
            <div class="text-center">
                <div class="inline-block bg-oclock-bgTop px-16 py-8 rounded border border-oclock-bezel/20">
                    <div id="affichageHorloge" class="neon-text text-6xl font-light font-roboto-mono text-oclock-dial tracking-[0.2em]">00:00:00</div>
                </div>
            </div>
        </section>

        <!-- 2. MINUTEUR -->
        <section id="timer" class="glass-panel hidden fade-in mb-12 transition-all duration-200 max-w-4xl mx-auto p-16 relative rounded font-montserrat bg-white border border-oclock-bezel/25 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 class="text-4xl font-light mb-1 text-center text-oclock-dial tracking-[0.1em] uppercase">Minuteur</h1>
            <p class="text-center mb-12 text-xs font-light text-oclock-bezel uppercase tracking-[0.3em]">Compte à rebours</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-10">
                <div class="inline-block bg-oclock-bgTop px-16 py-8 rounded border border-oclock-bezel/20">
                    <div id="affichageMinuteur" class="neon-text text-7xl font-light font-roboto-mono text-oclock-dial tracking-[0.2em]">05:00</div>
                </div>
            </div>

            <!-- Contrôles +/- -->
            <div class="flex justify-center gap-6 mb-8">
                <button id="btnMoinsMinuteur" onclick="diminuerMinuteur()" class="w-14 h-14 bg-white active:scale-95 text-oclock-dial text-2xl font-light rounded hover:bg-oclock-bgTop transition-all border border-oclock-bezel/30 hover:border-oclock-bezel/50">
                    −
                </button>
                <button id="btnPlusMinuteur" onclick="augmenterMinuteur()" class="w-14 h-14 bg-white active:scale-95 text-oclock-dial text-2xl font-light rounded hover:bg-oclock-bgTop transition-all border border-oclock-bezel/30 hover:border-oclock-bezel/50">
                    +
                </button>
            </div>

            <!-- Input pour définir le temps -->
            <div class="flex justify-center gap-6 mb-10">
                <div class="flex-1 max-w-sm">
                    <label for="inputMinuteur" class="block text-xs font-light mb-3 text-oclock-dial uppercase tracking-[0.2em]">Définir le temps (MM:SS)</label>
                    <input
                        type="text"
                        id="inputMinuteur"
                        placeholder="05:00"
                        maxlength="5"
                        class="w-full px-5 py-3 border border-oclock-bezel/30 bg-white rounded focus:outline-none focus:border-oclock-steelDark transition-all text-center font-roboto-mono text-lg font-light tracking-wider"
                        onkeypress="if(event.key === 'Enter') definirTempsMinuteur()">
                </div>
                <div class="flex items-end">
                    <button id="btnDefinirMinuteur" onclick="definirTempsMinuteur()" class="px-8 py-3 btn-modern text-white font-light rounded border border-oclock-bezel/30 tracking-wider text-sm uppercase">
                        Définir
                    </button>
                </div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4">
                <button id="btnDemarrerMinuteur" onclick="toggleMinuteur()" class="px-10 py-3.5 btn-modern text-white font-light text-sm rounded tracking-[0.15em] uppercase border border-oclock-bezel/30">
                    Démarrer
                </button>
                <button onclick="resetMinuteur()" class="px-10 py-3.5 bg-oclock-dark text-white font-light text-sm rounded hover:bg-oclock-dial transition-colors tracking-[0.15em] uppercase border border-oclock-dark">
                    Reset
                </button>
            </div>
        </section>

        <!-- 3. CHRONOMETRE -->
        <section id="chronometer" class="glass-panel hidden fade-in mb-12 transition-all duration-200 max-w-4xl mx-auto p-16 relative rounded font-montserrat bg-white border border-oclock-bezel/25 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 class="text-4xl font-light mb-1 text-center text-oclock-dial tracking-[0.1em] uppercase">Chronomètre</h1>
            <p class="text-center mb-12 text-xs font-light text-oclock-bezel uppercase tracking-[0.3em]">Mesure du temps écoulé</p>

            <!-- Affichage du temps -->
            <div class="text-center mb-10">
                <div class="inline-block bg-oclock-bgTop px-16 py-8 rounded border border-oclock-bezel/20">
                    <div id="affichageChrono" class="neon-text text-7xl font-light font-roboto-mono text-oclock-dial tracking-[0.2em]">00:00:00</div>
                </div>
            </div>

            <!-- Boutons de contrôle -->
            <div class="flex justify-center gap-4 mb-10">
                <button id="btnToggleChrono" onclick="toggleChrono()" class="px-10 py-3.5 btn-modern text-white font-light text-sm rounded tracking-[0.15em] uppercase border border-oclock-bezel/30">
                    Démarrer
                </button>
                <button id="btnTourChrono" onclick="enregistrerTour()" disabled class="px-10 py-3.5 bg-oclock-bezel text-white font-light text-sm rounded hover:bg-oclock-accent transition-colors opacity-50 tracking-[0.15em] uppercase border border-oclock-bezel">
                    Tour
                </button>
                <button onclick="resetChrono()" class="px-10 py-3.5 bg-oclock-dark text-white font-light text-sm rounded hover:bg-oclock-dial transition-colors tracking-[0.15em] uppercase border border-oclock-dark">
                    Reset
                </button>
            </div>

            <!-- Liste des tours -->
            <div id="containerTours" class="bg-oclock-bgTop rounded p-6 border border-oclock-bezel/20">
                <h2 class="text-lg font-light mb-5 text-oclock-dial uppercase tracking-[0.15em]">Tours enregistrés</h2>
                <div id="listeTours" class="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    <!-- Les tours seront ajoutés dynamiquement ici -->
                </div>
                <div id="messageAucunTour" class="text-center py-6 text-oclock-accent italic font-light text-sm tracking-wide">
                    Aucun tour enregistré
                </div>
            </div>
        </section>

        <!-- 4. REVEIL -->
        <section id="alarm" class="glass-panel hidden fade-in mb-12 transition-all duration-200 max-w-4xl mx-auto p-16 relative rounded font-montserrat bg-white border border-oclock-bezel/25 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 class="text-4xl font-light mb-1 text-center text-oclock-dial tracking-[0.1em] uppercase">Réveil</h1>
            <p class="text-center mb-12 text-xs font-light text-oclock-bezel uppercase tracking-[0.3em]">Programmez vos alarmes</p>

            <!-- Formulaire d'ajout d'alarme -->
            <div class="bg-oclock-bgTop p-8 rounded mb-10 border border-oclock-bezel/20">
                <h2 class="text-lg font-light mb-6 text-oclock-dial flex items-center gap-3 uppercase tracking-[0.12em]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nouvelle alarme
                </h2>
                <div class="flex flex-col sm:flex-row gap-5">
                    <div class="flex-1">
                        <label for="alarmeHeure" class="block text-xs font-light mb-3 text-oclock-dial uppercase tracking-[0.15em]">Heure</label>
                        <input type="time" id="alarmeHeure" class="w-full px-5 py-3 border border-oclock-bezel/30 bg-white rounded focus:outline-none focus:border-oclock-steelDark transition-all font-light">
                    </div>
                    <div class="flex-1">
                        <label for="alarmeMessage" class="block text-xs font-light mb-3 text-oclock-dial uppercase tracking-[0.15em]">Message</label>
                        <input type="text" id="alarmeMessage" placeholder="Ex: Réunion importante" class="w-full px-5 py-3 border border-oclock-bezel/30 bg-white rounded focus:outline-none focus:border-oclock-steelDark transition-all font-light">
                    </div>
                    <div class="flex items-end">
                        <button onclick="ajouterAlarme()" class="px-8 py-3 btn-modern text-white font-light rounded w-full sm:w-auto h-[50px] border border-oclock-bezel/30 tracking-wider text-sm uppercase">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Liste des alarmes -->
            <div id="listeAlarmes" class="space-y-4">
                <!-- Les alarmes seront ajoutées dynamiquement ici -->
            </div>

            <!-- Message si aucune alarme -->
            <div id="messageAucuneAlarme" class="text-center py-10 text-oclock-accent italic font-light text-sm tracking-wide">
                Aucune alarme programmée
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="text-center py-8 text-oclock-bezel font-light text-xs relative z-10 w-full tracking-[0.15em] uppercase">
        <p class="mb-2">Projet O'Clock &copy; 2026</p>
        <a href="https://github.com/sylvain-malbon/runtrack3/tree/main/jour12-oclock" target="_blank" class="hover:text-oclock-dial transition-colors inline-flex items-center gap-2 font-light">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
            Voir sur GitHub
        </a>
    </footer>

    <!-- SCRIPTS -->
    <script src="assets/js/script.js"></script>

</body>

</html>
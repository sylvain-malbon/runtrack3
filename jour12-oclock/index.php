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
                            dial: "#00664F",
                            bezel: "#00A651",
                            steel: "#C0C0C0",
                            steelDark: "#808080",
                            white: "#F5F5F5",
                            dark: "#0A0A0A",
                            bgTop: "#e8f5f0",
                            bgBottom: "#c5e8db",
                            yellow: "#f2ff00ff"
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

<body class="text-gray-900 font-montserrat bg-[#e8f5f0]">

    <!-- NAVBAR -->
    <nav class="text-white px-8 py-4 flex justify-between items-center border-b-2 border-white/20 font-montserrat font-semibold bg-oclock-bezel">
        <a class="font-bold flex items-center justify-center gap-3 tracking-wide text-white hover:text-white/90 transition-colors" href="#accueil">
            <span class="text-oclock-yellow text-3xl font-black">O'CLock</span>
        </a>
        <div id="user-welcome" class="text-white font-semibold flex items-center gap-2 hidden">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span id="user-welcome-text"></span>
        </div>
        <ul class="flex list-none gap-2 m-0">
            <li class="m-0" id="nav-horloge">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded font-semibold" href="#accueil">Accueil</a>
            </li>
            <li class="m-0" id="nav-minuteur" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded font-semibold" href="#minuteur">Minuteur</a>
            </li>
            <li class="m-0" id="nav-chronometre" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded font-semibold" href="#chronometre">Chronomètre</a>
            </li>
            <li class="m-0" id="nav-reveil" class="hidden">
                <a class="text-white no-underline px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded font-semibold" href="#reveil">Réveil</a>
            </li>
        </ul>
    </nav>

    <!-- SECTIONS -->
    <main class="p-6 mx-auto relative z-[2] max-w-custom">

        <!-- 1. HORLOGE -->
        <section id="oclock" class="fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-lg font-montserrat bg-white">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Horloge</h1>
            <p class="text-center mb-8 text-base font-light text-oclock-bezel">Heure actuelle</p>

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
        <section id="timer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-lg font-montserrat bg-white">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Minuteur</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

        <!-- 3. CHRONOMETRE -->
        <section id="chronometer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-lg font-montserrat bg-white">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Chronomètre</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

        <!-- 4. REVEIL -->
        <section id="alarm" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-12 relative rounded-lg font-montserrat bg-white">
            <h1 class="text-5xl font-black mb-2 text-center text-oclock-dial tracking-tight-custom">Réveil</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

    </main>

    <!-- SCRIPTS -->
    <script src="assets/js/script.js"></script>

</body>

</html>
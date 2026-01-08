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
                            amber: "#4e280dff",
                            dark: "#0A0A0A",
                            light: "#F5F7FA"
                        }
                    }
                }
            }
        }
    </script>

    <!-- Styles perso -->
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- Polices Vintage -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet">

</head>

<body class="text-gray-900" style="font-family: 'Crimson Text', serif; background: linear-gradient(to bottom, #f8f4e6, #ece4d0);">

    <!-- NAVBAR -->
    <nav class="bg-oclock-amber text-white px-8 py-5 flex justify-between items-center border-b-[3px] border-double border-[#4e280d]" style="font-family: 'Playfair Display', serif; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);">
        <a class="font-bold flex items-center justify-center gap-3 tracking-widest" href="#accueil" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
            <span class="text-3xl">O'CLock</span>
        </a>
        <div id="user-welcome" class="text-white font-semibold flex items-center gap-2" style="display: none;">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span id="user-welcome-text"></span>
        </div>
        <ul class="flex list-none gap-3 m-0">
            <li class="m-0" id="nav-horloge">
                <a class="text-white no-underline px-5 py-2 hover:bg-amber-700 transition-all duration-200 border border-white/30 rounded-sm font-semibold tracking-wide" href="#accueil" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">Accueil</a>
            </li>
            <li class="m-0" id="nav-minuteur" style="display: none;">
                <a class="text-white no-underline px-5 py-2 hover:bg-amber-700 transition-all duration-200 border border-white/30 rounded-sm font-semibold tracking-wide" href="#minuteur" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">Minuteur</a>
            </li>
            <li class="m-0" id="nav-chronometre" style="display: none;">
                <a class="text-white no-underline px-5 py-2 hover:bg-amber-700 transition-all duration-200 border border-white/30 rounded-sm font-semibold tracking-wide" href="#chronometre" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">Chronomètre</a>
            </li>
            <li class="m-0" id="nav-reveil" style="display: none;">
                <a class="text-white no-underline px-5 py-2 hover:bg-amber-700 transition-all duration-200 border border-white/30 rounded-sm font-semibold tracking-wide" href="#reveil" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">Réveil</a>
            </li>
        </ul>
    </nav>

    <!-- SECTIONS -->
    <main class="p-6 mx-auto relative z-[2]" style="max-width: min(95vw, 1400px);">

        <!-- 1. HORLOGE -->
        <section id="oclock" class="fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-10 relative border-[3px] border-double border-[#4e280d]" style="font-family: 'Playfair Display', serif; background: linear-gradient(to bottom, #faf8f3, #f5f1e8); box-shadow: inset 0 0 0 1px rgba(78, 40, 13, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(78, 40, 13, 0.1);">
            <div class="absolute top-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute top-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-b-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-b-2 border-[#4e280d]"></div>
            <h1 class="text-4xl font-bold mb-4 text-center tracking-widest" style="color: #4e280d; text-shadow: 2px 2px 0 rgba(78, 40, 13, 0.1);">Horloge</h1>
            <p class="text-center mb-6 italic text-lg" style="color: #6b4423;">Heure actuelle</p>
            <article class="clock simple rounded-full bg-white border-8 border-[#4e280d] w-80 h-80 relative mx-auto" style="box-shadow: inset 0 0 0 8px rgba(78, 40, 13, 0.1), 0 8px 15px rgba(0, 0, 0, 0.3);">
                <div class="hours-container absolute inset-0">
                    <div class="hours absolute bg-[#4e280d] rounded"></div>
                </div>
                <div class="minutes-container absolute inset-0">
                    <div class="minutes absolute bg-[#6b4423] rounded"></div>
                </div>
                <div class="seconds-container absolute inset-0">
                    <div class="seconds absolute bg-[#d2691e] rounded z-[8]"></div>
                </div>
            </article>
        </section>

        <!-- 2. MINUTEUR -->
        <section id="timer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-10 relative border-[3px] border-double border-[#4e280d]" style="font-family: 'Playfair Display', serif; background: linear-gradient(to bottom, #faf8f3, #f5f1e8); box-shadow: inset 0 0 0 1px rgba(78, 40, 13, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(78, 40, 13, 0.1);">
            <div class="absolute top-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute top-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-b-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-b-2 border-[#4e280d]"></div>
            <h1 class="text-4xl font-bold mb-4 text-center tracking-widest" style="color: #4e280d; text-shadow: 2px 2px 0 rgba(78, 40, 13, 0.1);">Minuteur</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

        <!-- 3. CHRONOMETRE -->
        <section id="chronometer" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-10 relative border-[3px] border-double border-[#4e280d]" style="font-family: 'Playfair Display', serif; background: linear-gradient(to bottom, #faf8f3, #f5f1e8); box-shadow: inset 0 0 0 1px rgba(78, 40, 13, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(78, 40, 13, 0.1);">
            <div class="absolute top-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute top-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-b-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-b-2 border-[#4e280d]"></div>
            <h1 class="text-4xl font-bold mb-4 text-center tracking-widest" style="color: #4e280d; text-shadow: 2px 2px 0 rgba(78, 40, 13, 0.1);">Chronomètre</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

        <!-- 4. REVEIL -->
        <section id="alarm" class="hidden fade-in mb-8 transition-all duration-200 max-w-3xl mx-auto p-10 relative border-[3px] border-double border-[#4e280d]" style="font-family: 'Playfair Display', serif; background: linear-gradient(to bottom, #faf8f3, #f5f1e8); box-shadow: inset 0 0 0 1px rgba(78, 40, 13, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(78, 40, 13, 0.1);">
            <div class="absolute top-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute top-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-t-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] left-[15px] w-[30px] h-[30px] border-l-2 border-b-2 border-[#4e280d]"></div>
            <div class="absolute bottom-[15px] right-[15px] w-[30px] h-[30px] border-r-2 border-b-2 border-[#4e280d]"></div>
            <h1 class="text-4xl font-bold mb-4 text-center tracking-widest" style="color: #4e280d; text-shadow: 2px 2px 0 rgba(78, 40, 13, 0.1);">Réveil</h1>
            <div class="flex gap-4">
                /// contenu ///
            </div>
        </section>

    </main>

    <!-- SCRIPTS -->
    <script src="assets/js/script.js"></script>

</body>

</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPADES (Reverse Ingeneering) - Inspiration : Site SLATE du Showcase de Tailwind</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .logo-font { 
            font-family: 'Space Mono', monospace;
            transform: scaleY(0.55);
        }
    </style>
</head>
<body class="bg-zinc-800 text-white antialiased">

    <header class="flex items-center justify-between px-6 py-4 md:px-12 bg-zinc-800 backdrop-blur-md sticky top-0 z-50">
        <div class="text-5xl md:text-7xl font-black uppercase logo-font ml-4 md:ml-8 text-zinc-300">
            SPADES
        </div>

        <nav class="hidden md:flex items-center gap-8 text-lg font-bold text-zinc-300">
            <a href="#" class="text-orange-600">Showroom</a>
            <a href="#" class="hover:text-orange-600 transition-colors">Configurator</a>
            <a href="#" class="hover:text-orange-600 transition-colors">Technology</a>
            <a href="#" class="hover:text-orange-600 transition-colors">Ownership</a>
        </nav>

        <div>
            <button class="bg-orange-600 hover:bg-orange-600 text-white px-8 py-3 font-black uppercase text-[10px] tracking-widest transition-all rounded-md">
                Order
            </button>
        </div>
    </header>

    <section class="flex flex-col p-6 md:p-12">
        <div class="w-full h-[60vh] bg-zinc-800 overflow-hidden rounded-sm relative mb-12">
            <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1600" alt="Ferrari" class="w-full h-full object-cover opacity-70">
        </div>
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <h1 class="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                We built it.<br>You make it.
            </h1>
            <div class="max-w-xs space-y-4">
                <p class="text-[11px] uppercase font-bold text-zinc-400 leading-relaxed">
                    SPADES is a modular vehicle platform designed for absolute creative freedom. Every panel, every interface, and every accessory is built to be customized.
                </p>
                <div class="h-1 w-12 bg-orange-600"></div>
            </div>
        </div>
    </section>

    <section class="py-32 px-6 md:px-12">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-7xl font-black uppercase mb-16 tracking-tighter">
                Wrapped, not painted.
            </h2>
            <div class="relative group">
                <img src="https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200" alt="Lamborghini" class="w-full h-auto rounded-sm filter grayscale hover:grayscale-0 transition duration-1000">
                <p class="mt-12 text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold max-w-xl mx-auto">
                    Replaceable vinyl panels allow you to change colors or branding in a matter of hours.
                </p>
            </div>
        </div>
    </section>

    <section class="py-32 px-6 md:px-12 bg-black">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-7xl font-black uppercase mb-16 tracking-tighter">
                Bring your own tech.
            </h2>
            <div class="relative">
                <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200" alt="Tech Dashboard" class="w-full h-auto rounded-sm">
                <p class="mt-12 text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold max-w-2xl mx-auto">
                    Built-in rails and universal mounts let you bring the equipment you want. Tablets, cameras, and driving monitors—anything you can strap or bolt down is fair game.
                </p>
            </div>
        </div>
    </section>

    <section class="bg-zinc-300 text-zinc-950 py-32 px-6 md:px-12">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32">
            <div class="max-w-md">
                <h3 class="text-4xl font-black uppercase mb-6 tracking-tighter">Be your own maker.</h3>
                <p class="text-xs font-bold uppercase leading-relaxed">
                    Download open-source CAD files for interior components. Print your own dashboard mounts, storage bins, and modular tech docks.
                </p>
            </div>
            <div class="max-w-md md:mt-40 text-left md:text-right ml-auto">
                <h3 class="text-4xl font-black uppercase mb-6 tracking-tighter">Or not.</h3>
                <p class="text-xs font-bold uppercase leading-relaxed">
                    Our marketplace features thousands of components designed by the community and verified by SPADES.
                </p>
            </div>
        </div>
    </section>

    <section class="py-32 px-6 md:px-12 bg-black">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-4xl md:text-7xl font-black uppercase mb-20 tracking-tighter text-center">
                Things change. A SPADES changes, too.
            </h2>
            <p class="text-center text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold max-w-3xl mx-auto mb-20">
                Adaptable by design. Whether you're hauling gear for work, carrying family, or hitting the open road—SPADES flexes with you.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-zinc-900 rounded-sm overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" alt="Interior" class="w-full h-64 object-cover">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">Room to serial.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Modular seating. Configure for 2, 4, or 6 passengers—or rip it all out for maximum cargo.
                        </p>
                    </div>
                </div>
                <div class="bg-zinc-900 rounded-sm overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600" alt="Charging" class="w-full h-64 object-cover">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">Charged it an box and back.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Dual battery system. Swap cells on the go or charge overnight. 400km range standard.
                        </p>
                    </div>
                </div>
                <div class="bg-zinc-900 rounded-sm overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600" alt="Modular" class="w-full h-64 object-cover">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">A modular interior makes it easy.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Reconfigure your cabin in minutes. Rails, hooks, and mounting points everywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-6 md:px-12 bg-zinc-900">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-4xl md:text-7xl font-black uppercase mb-20 tracking-tighter text-center">
                Designed by us to be designed by you.
            </h2>
            <p class="text-center text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold max-w-3xl mx-auto mb-20">
                It's not just your vehicle—it's your canvas. Make SPADES whatever you need it to be. Wild, sleek, loud, or understated.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-zinc-800 rounded-sm overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=600" alt="Yellow Truck" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">One truck, many faces.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Change your wrap, upgrade your lights, add a rack. The same platform transforms every day.
                        </p>
                    </div>
                </div>
                <div class="bg-zinc-800 rounded-sm overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=600" alt="Colors" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">Colors, colors, colors.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Matte, gloss, metallic, chrome. Pick a finish or mix multiple. Limitless combinations.
                        </p>
                    </div>
                </div>
                <div class="bg-zinc-800 rounded-sm overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600" alt="Wheels" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-4 tracking-tighter">Wheels up.</h3>
                        <p class="text-[10px] uppercase text-zinc-500 leading-relaxed">
                            Standard 18". Optional 20" all-terrain or 22" street. Hot-swap ready wheel design.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-6 md:px-12 bg-zinc-300 text-zinc-950">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800" alt="DIY" class="w-full h-auto rounded-sm">
            </div>
            <div class="max-w-lg">
                <h2 class="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                    DIY for everyone.
                </h2>
                <p class="text-xs font-bold uppercase leading-relaxed mb-6">
                    From the factory to your garage, SPADES arrives with full documentation, schematics, and tutorials. Fix it yourself. Upgrade it yourself. Build whatever you dream up.
                </p>
                <p class="text-xs font-bold uppercase leading-relaxed">
                    The only limit is what you can imagine. And we bet you can imagine a lot.
                </p>
            </div>
        </div>
    </section>

    <footer class="p-6 md:p-12 bg-zinc-900">
        <div class="pt-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-widest mb-4 text-white">Company</h4>
                    <ul class="space-y-2 text-[10px] uppercase text-zinc-600 font-bold">
                        <li><a href="#" class="hover:text-orange-400 transition-colors">About Us</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Careers</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Press Kit</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-widest mb-4 text-white">Support</h4>
                    <ul class="space-y-2 text-[10px] uppercase text-zinc-600 font-bold">
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Help Center</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Documentation</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Community</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Warranty</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-widest mb-4 text-white">Shop</h4>
                    <ul class="space-y-2 text-[10px] uppercase text-zinc-600 font-bold">
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Marketplace</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Accessories</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Parts</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Merch</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-widest mb-4 text-white">Legal</h4>
                    <ul class="space-y-2 text-[10px] uppercase text-zinc-600 font-bold">
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Terms of Use</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Cookie Policy</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition-colors">Licenses</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="overflow-hidden pt-20">
            <div class="flex justify-center gap-4 mb-12">
                <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                </a>
                <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
            </div>
            <h1 class="text-[22vw] font-black leading-none uppercase text-zinc-700 translate-y-4 logo-font" style="transform: scaleY(0.55);">
                SPADES
            </h1>
        </div>
        <div class="flex justify-between items-center py-8 text-zinc-700 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2025 SPADES Motors</p>
        </div>
    </footer>

</body>
</html>
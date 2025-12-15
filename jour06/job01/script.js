// Script principal pour les interactions Bootstrap/JS demandées

// 1. Lien Accueil vers La Plateforme
document.querySelector('.nav-link.active').href = "https://www.laplateforme.io/";

// 2. Modale achat papillon
const papillonBtn = document.querySelector('.card .btn-primary');
papillonBtn.addEventListener('click', () => {
    showModal('Achat Papillon', 'Merci pour votre achat de papillon !');
});

// 3. Rebooter le Monde : citation Blade Runner
const citations = [
    "J'ai vu des choses que vous, humains, ne pourriez pas croire...",
    "Tous ces moments se perdront dans l’oubli, comme des larmes dans la pluie.",
    "C'est dommage qu'elle doive mourir, mais c'est ainsi.",
    "J'ai fait des choses... dont je ne suis pas fier.",
    "La lumière qui brûle deux fois plus fort brûle deux fois moins longtemps."
];
document.querySelector('.btn-danger').addEventListener('click', () => {
    const idx = Math.floor(Math.random() * citations.length);
    document.querySelector('.jumbotron-custom h1').textContent = citations[idx];
});

// 4. Pagination modifie le contenu du jumbotron
document.querySelectorAll('.pagination .page-link').forEach((el, i) => {
    el.addEventListener('click', (e) => {
        if (el.parentElement.classList.contains('disabled')) return;
        e.preventDefault();
        document.querySelector('.jumbotron-custom h1').textContent = "Page " + el.textContent.trim();
    });
});

// 5. Liste groupée active
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.list-group-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 6. Progress bar boutons
const progressBar = document.querySelector('.progress-bar');
let progress = 80;
const updateProgress = () => {
    progressBar.style.width = progress + "%";
    progressBar.setAttribute('aria-valuenow', progress);
};
document.querySelector('.me-1').addEventListener('click', () => {
    progress = Math.max(0, progress - 10);
    updateProgress();
});
document.querySelector('.ms-1 .bi-arrow-right').parentElement.addEventListener('click', () => {
    progress = Math.min(100, progress + 10);
    updateProgress();
});

// 7. D G C pour modale formulaire gauche
let keySeq = [];
document.addEventListener('keydown', (e) => {
    keySeq.push(e.key.toUpperCase());
    if (keySeq.slice(-3).join('') === 'DGC') {
        keySeq = [];
        // Récupère les champs du formulaire gauche
        const login = document.querySelector('input[placeholder="Login"]').value;
        const mdp = document.querySelector('input[placeholder="Mot de Passe"]').value;
        const doge = document.querySelector('input[placeholder=""]').value;
        const url = document.querySelector('input[placeholder^="https://"]').value;
        showModal('Formulaire', `
            <b>Login:</b> ${login}<br>
            <b>Mot de passe:</b> ${mdp}<br>
            <b>DogeCoin:</b> ${doge}<br>
            <b>URL:</b> ${url}
        `);
    }
    if (keySeq.length > 3) keySeq.shift();
});

// 8. Formulaire droit : spinner couleur aléatoire
const spinner = document.querySelector('.spinner-border');
const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
document.querySelector('.col-md-2 form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const pwd = this.querySelector('input[type="password"]').value;
    if (email && pwd) {
        colors.forEach(c => spinner.classList.remove('text-' + c));
        const color = colors[Math.floor(Math.random() * colors.length)];
        spinner.classList.add('text-' + color);
    }
});

// Fonction utilitaire pour afficher une modale Bootstrap
function showModal(title, body) {
    let modal = document.getElementById('customModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'customModal';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.querySelector('.modal-title').innerHTML = title;
    modal.querySelector('.modal-body').innerHTML = body;
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}
// ========================================
// GESTION DU CALENDRIER
// ========================================

let currentDate = new Date();
let selectedDate = null;

// Initialiser le calendrier au chargement
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

// Rendu du calendrier
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Afficher le mois et l'année
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    document.getElementById('calendar-month-year').textContent = `${monthNames[month]} ${year}`;

    // Calculer le premier jour du mois et le nombre de jours
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Le premier jour de la semaine (0 = Dimanche, 1 = Lundi, etc.)
    // On ajuste pour que Lundi = 0
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6; // Si dimanche, le mettre à la fin

    // Générer la grille
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Cases vides avant le 1er du mois
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        grid.appendChild(emptyCell);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateString = formatDate(dateObj);

        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.className = 'aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all';

        // Date passée
        if (dateObj < today) {
            dayCell.className += ' bg-gray-100 text-gray-400 cursor-not-allowed';
        }
        // Date avec demande existante
        else if (user && requests.some(r => r.userId === user.id && r.date === dateString)) {
            dayCell.className += ' bg-yellow-100 text-yellow-800 font-semibold border-2 border-yellow-400';
        }
        // Date sélectionnée
        else if (selectedDate && formatDate(selectedDate) === dateString) {
            dayCell.className += ' bg-plateforme-blue text-white font-bold';
        }
        // Date future disponible
        else {
            dayCell.className += ' bg-white hover:bg-blue-50 border border-gray-200 hover:border-plateforme-blue font-medium';
            dayCell.onclick = () => selectDate(dateObj);
        }

        grid.appendChild(dayCell);
    }
}

// Sélectionner une date
function selectDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
        alert("❌ Impossible de sélectionner une date passée !");
        return;
    }

    selectedDate = date;
    document.getElementById('selected-date-display').textContent = formatDateFR(date);
    renderCalendar();
}

// Mois précédent
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Mois suivant
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Formater date YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Formater date en français
function formatDateFR(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// ========================================
// DEMANDE DE PRÉSENCE
// ========================================

function requestPresence() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
        alert("Vous devez être connecté.");
        return;
    }

    if (!selectedDate) {
        alert("Veuillez sélectionner une date dans le calendrier.");
        return;
    }

    const dateString = formatDate(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert("❌ Impossible de faire une demande pour une date passée !");
        return;
    }

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    // Vérifier si l'utilisateur a déjà fait une demande pour cette date
    const alreadyRequested = requests.some(
        r => r.userId === user.id && r.date === dateString
    );

    if (alreadyRequested) {
        alert("Vous avez déjà fait une demande pour cette date.");
        return;
    }

    const newRequest = {
        id: Date.now(),
        userId: user.id,
        date: dateString,
        status: "pending"
    };

    requests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("✅ Demande envoyée avec succès !");

    // Réinitialiser
    selectedDate = null;
    document.getElementById('selected-date-display').textContent = 'Aucune date sélectionnée';
    renderCalendar();
}

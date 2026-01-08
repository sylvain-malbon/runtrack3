// ========== NAVIGATION ==========
// 
// Fonction pour afficher une section et cacher les autres
function showSection(sectionId) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
}

// Fonction pour mettre à jour la navigation
function updateNavigation() {
  const currentPage = window.location.hash.slice(1) || 'accueil';
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  const isLoggedIn = currentUser !== null;
  const userRole = currentUser ? currentUser.role : null;

  // Retirer toutes les classes active
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.classList.remove('font-bold', 'border-b-2', 'border-oclock-yellow', 'bg-green-800');
  });

  // Ajouter active à la page courante
  const activeLink = document.querySelector(`nav ul li a[href="#${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add('font-bold', 'border-b-2', 'border-oclock-yellow', 'bg-green-800');
  }

  // Gérer la visibilité des onglets - tous visibles pour une horloge
  const navHorloge = document.getElementById('nav-horloge');
  const navMinuteur = document.getElementById('nav-minuteur');
  const navChronometre = document.getElementById('nav-chronometre');
  const navReveil = document.getElementById('nav-reveil');

  // Tous les onglets sont toujours visibles
  if (navHorloge) navHorloge.style.display = 'block';
  if (navMinuteur) navMinuteur.style.display = 'block';
  if (navChronometre) navChronometre.style.display = 'block';
  if (navReveil) navReveil.style.display = 'block';

  // Afficher la bonne section
  const sectionMapping = {
    'accueil': 'oclock',
    'minuteur': 'timer',
    'chronometre': 'chronometer',
    'reveil': 'alarm'
  };
  const sectionId = sectionMapping[currentPage] || currentPage;
  showSection(sectionId);
}

// Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
  // Récupération de tous les liens de navigation
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Gestion des clics sur les liens de navigation
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      // Mise à jour de l'URL sans recharger la page
      window.location.hash = targetId;
    });
  });

  // Initialisation de la navigation
  updateNavigation();

  // Démarrer l'horloge numérique (conforme CDC)
  demarrerHorloge();

  // Démarrer l'horloge CSS décorative
  demarrerHorlogeCSS();
});

// Écouter les changements de hash
window.addEventListener('hashchange', () => {
  updateNavigation();
});

// ========== HORLOGE CSS (Décorative uniquement) ==========

// Variables globales pour l'horloge CSS
let horlogeCSSIntervalId = null;

/**
 * Formate un nombre avec un zéro devant si < 10
 */
function formatNumber(num) {
  return num < 10 ? "0" + num : num;
}

/**
 * Initialise l'horloge CSS avec l'heure actuelle
 */
function initHorlogeCSS() {
  const maintenant = new Date();
  const secondes = maintenant.getSeconds();
  const minutes = maintenant.getMinutes();
  const heures = maintenant.getHours();

  // Calculer les angles pour chaque aiguille
  const angleHeures = (heures * 30) + (minutes / 2);
  const angleMinutes = (minutes * 6);
  const angleSecondes = (secondes * 6);

  // Appliquer les angles initiaux
  const aiguillHeures = document.querySelector('.hours-container');
  const aiguillMinutes = document.querySelector('.minutes-container');
  const aiguillSecondes = document.querySelector('.seconds-container');

  if (aiguillHeures) {
    aiguillHeures.style.transform = 'rotateZ(' + angleHeures + 'deg)';
  }
  if (aiguillMinutes) {
    aiguillMinutes.style.transform = 'rotateZ(' + angleMinutes + 'deg)';
  }
  if (aiguillSecondes) {
    aiguillSecondes.style.transform = 'rotateZ(' + angleSecondes + 'deg)';
  }
}

/**
 * Met à jour l'horloge CSS chaque seconde
 */
function updateHorlogeCSS() {
  const maintenant = new Date();
  const secondes = maintenant.getSeconds();
  const minutes = maintenant.getMinutes();
  const heures = maintenant.getHours();

  // Calculer les angles
  const angleHeures = (heures * 30) + (minutes / 2);
  const angleMinutes = (minutes * 6);
  const angleSecondes = (secondes * 6);

  // Mettre à jour les aiguilles
  const aiguillHeures = document.querySelector('.hours-container');
  const aiguillMinutes = document.querySelector('.minutes-container');
  const aiguillSecondes = document.querySelector('.seconds-container');

  if (aiguillHeures) {
    aiguillHeures.style.transform = 'rotateZ(' + angleHeures + 'deg)';
  }
  if (aiguillMinutes) {
    aiguillMinutes.style.transform = 'rotateZ(' + angleMinutes + 'deg)';
  }
  if (aiguillSecondes) {
    aiguillSecondes.style.transform = 'rotateZ(' + angleSecondes + 'deg)';
  }
}

/**
 * Crée les marqueurs (graduations) et les chiffres sur l'horloge
 */
function creerMarqueursHorloge() {
  const horloge = document.querySelector('.clock.simple');
  if (!horloge) return;

  // Vérifier si les marqueurs existent déjà
  if (horloge.querySelector('.minute-marker') || horloge.querySelector('.hour-number')) return;

  // Positions des chiffres (en minutes: 0=12h, 15=3h, 30=6h, 45=9h)
  const positionsChiffres = [0, 15, 30, 45];
  const chiffres = [12, 3, 6, 9];

  // Créer les 60 graduations (une par minute)
  for (let i = 0; i < 60; i++) {
    const angle = i * 6; // 360° / 60 = 6°
    const indexChiffre = positionsChiffres.indexOf(i);

    // Si c'est une position de chiffre, créer le chiffre au lieu du marqueur
    if (indexChiffre !== -1) {
      const chiffre = document.createElement('div');
      chiffre.className = 'hour-number';
      chiffre.textContent = chiffres[indexChiffre];
      
      // Positionner le chiffre
      chiffre.style.transform = `rotate(${angle}deg) translate(0, -115px) rotate(-${angle}deg)`;
      
      horloge.appendChild(chiffre);
    } else {
      // Sinon, créer un marqueur
      const marqueur = document.createElement('div');
      
      // Marqueur d'heure (plus gros) tous les 5 minutes
      if (i % 5 === 0) {
        marqueur.className = 'hour-marker';
      } else {
        // Marqueur de minute (plus fin)
        marqueur.className = 'minute-marker';
      }
      
      marqueur.style.transform = `rotate(${angle}deg)`;
      horloge.appendChild(marqueur);
    }
  }
}

/**
 * Démarre l'horloge CSS
 */
function demarrerHorlogeCSS() {
  // Arrêter l'interval existant si présent
  if (horlogeCSSIntervalId) {
    clearInterval(horlogeCSSIntervalId);
  }

  // Créer les marqueurs
  creerMarqueursHorloge();

  // Initialiser et démarrer
  initHorlogeCSS();
  horlogeCSSIntervalId = setInterval(updateHorlogeCSS, 1000);
}

// ========== HORLOGE NUMÉRIQUE (Conforme CDC) ==========

// Variable globale pour l'horloge numérique
let horlogeInterval = null;

/**
 * Affiche l'heure actuelle au format HH:MM:SS
 */
function afficherHorloge() {
  const maintenant = new Date();
  const heures = formatNumber(maintenant.getHours());
  const minutes = formatNumber(maintenant.getMinutes());
  const secondes = formatNumber(maintenant.getSeconds());
  
  const affichage = heures + ":" + minutes + ":" + secondes;
  
  const elementHorloge = document.getElementById("affichageHorloge");
  if (elementHorloge) {
    elementHorloge.textContent = affichage;
  }
}

/**
 * Démarre l'horloge numérique
 */
function demarrerHorloge() {
  // Arrêter l'interval existant si présent
  if (horlogeInterval) {
    clearInterval(horlogeInterval);
  }
  
  // Afficher immédiatement
  afficherHorloge();
  
  // Mettre à jour chaque seconde
  horlogeInterval = setInterval(afficherHorloge, 1000);
}

// ========== RÉVEIL (Alarmes) ==========

// Variables globales pour le réveil
let alarmes = [];
let reveilInterval = null;
let alarmeIdCounter = 1;

/**
 * Valide le format d'heure HH:MM
 */
function validerHeure(heure) {
  const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(heure);
}

/**
 * Calcule le temps restant jusqu'à une alarme
 */
function calculerTempsRestant(heureAlarme) {
  const maintenant = new Date();
  const [heures, minutes] = heureAlarme.split(':');
  
  const alarme = new Date();
  alarme.setHours(parseInt(heures));
  alarme.setMinutes(parseInt(minutes));
  alarme.setSeconds(0);
  alarme.setMilliseconds(0);
  
  let diff = alarme - maintenant;
  
  // Si l'heure est passée aujourd'hui, calculer pour demain
  if (diff < 0) {
    alarme.setDate(alarme.getDate() + 1);
    diff = alarme - maintenant;
  }
  
  const heuresRestantes = Math.floor(diff / (1000 * 60 * 60));
  const minutesRestantes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return "Dans " + heuresRestantes + "h " + minutesRestantes + "min";
}

/**
 * Affiche la liste des alarmes
 */
function afficherAlarmes() {
  const listeElement = document.getElementById('listeAlarmes');
  const messageAucune = document.getElementById('messageAucuneAlarme');
  
  if (!listeElement) return;
  
  // Vider la liste
  listeElement.innerHTML = '';
  
  // Afficher/masquer le message "aucune alarme"
  if (messageAucune) {
    messageAucune.style.display = alarmes.length === 0 ? 'block' : 'none';
  }
  
  // Afficher chaque alarme
  alarmes.forEach(function(alarme) {
    const alarmeDiv = document.createElement('div');
    alarmeDiv.className = 'bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-oclock-bezel transition-colors';
    alarmeDiv.id = 'alarme-' + alarme.id;
    
    // Calculer le statut
    let statut = alarme.declenchee ? 
      '<span class="text-gray-500 italic">Passée</span>' : 
      '<span class="text-oclock-bezel font-semibold">' + calculerTempsRestant(alarme.heure) + '</span>';
    
    alarmeDiv.innerHTML = `
      <div class="flex-1">
        <div class="flex items-center gap-4">
          <span class="text-3xl font-bold font-roboto-mono text-oclock-dial">${alarme.heure}</span>
          <span class="text-lg text-gray-700">${alarme.message}</span>
        </div>
        <div class="text-sm mt-2">${statut}</div>
      </div>
      <button onclick="supprimerAlarme(${alarme.id})" class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
        Supprimer
      </button>
    `;
    
    listeElement.appendChild(alarmeDiv);
  });
}

/**
 * Ajoute une nouvelle alarme
 */
function ajouterAlarme() {
  const heureInput = document.getElementById('alarmeHeure');
  const messageInput = document.getElementById('alarmeMessage');
  
  if (!heureInput || !messageInput) return;
  
  const heure = heureInput.value;
  const message = messageInput.value.trim();
  
  // Validation
  if (!heure || !message) {
    alert('Veuillez remplir l\'heure et le message !');
    return;
  }
  
  if (!validerHeure(heure)) {
    alert('Format d\'heure invalide ! Utilisez HH:MM');
    return;
  }
  
  // Créer la nouvelle alarme
  const nouvelleAlarme = {
    id: alarmeIdCounter++,
    heure: heure,
    message: message,
    declenchee: false
  };
  
  alarmes.push(nouvelleAlarme);
  
  // Vider les champs
  heureInput.value = '';
  messageInput.value = '';
  
  // Afficher la liste mise à jour
  afficherAlarmes();
  
  // Démarrer la vérification si pas déjà démarrée
  if (!reveilInterval) {
    demarrerVerificationAlarmes();
  }
}

/**
 * Supprime une alarme
 */
function supprimerAlarme(id) {
  alarmes = alarmes.filter(function(alarme) {
    return alarme.id !== id;
  });
  
  afficherAlarmes();
  
  // Arrêter la vérification si plus d'alarmes
  if (alarmes.length === 0 && reveilInterval) {
    clearInterval(reveilInterval);
    reveilInterval = null;
  }
}

/**
 * Vérifie si une alarme doit se déclencher
 */
function verifierAlarmes() {
  const maintenant = new Date();
  const heureActuelle = formatNumber(maintenant.getHours()) + ':' + formatNumber(maintenant.getMinutes());
  
  alarmes.forEach(function(alarme) {
    if (alarme.heure === heureActuelle && !alarme.declenchee) {
      // Déclencher l'alarme
      alert('⏰ ALARME !\n\n' + alarme.message);
      alarme.declenchee = true;
      afficherAlarmes();
    }
  });
  
  // Mettre à jour l'affichage du temps restant
  afficherAlarmes();
}

/**
 * Démarre la vérification des alarmes
 */
function demarrerVerificationAlarmes() {
  if (reveilInterval) {
    clearInterval(reveilInterval);
  }
  
  // Vérifier toutes les secondes
  reveilInterval = setInterval(verifierAlarmes, 1000);
}


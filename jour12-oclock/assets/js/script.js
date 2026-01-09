// ========== UTILITAIRES ==========

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
    link.classList.remove('font-bold', 'border-b-2', 'border-oclock-steelDark', 'bg-oclock-bezel');
  });

  // Ajouter active à la page courante
  const activeLink = document.querySelector(`nav ul li a[href="#${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add('font-bold', 'border-b-2', 'border-oclock-steelDark', 'bg-oclock-bezel');
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
 * Récupère l'heure actuelle en France (Europe/Paris)
 */
function getHeureFrance() {
  const maintenant = new Date();
  const options = { timeZone: 'Europe/Paris', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  const parts = formatter.formatToParts(maintenant);
  
  const heures = parseInt(parts.find(p => p.type === 'hour').value);
  const minutes = parseInt(parts.find(p => p.type === 'minute').value);
  const secondes = parseInt(parts.find(p => p.type === 'second').value);
  
  return { heures, minutes, secondes };
}

/**
 * Récupère la date JJ|kanji du jour de la semaine
 */
function getDateKanjiShort() {
  const maintenant = new Date();
  const jour = String(maintenant.getDate()).padStart(2, "0");
  const joursKanji = ["日", "月", "火", "水", "木", "金", "土"];
  const kanji = joursKanji[maintenant.getDay()];
  return `${jour}|${kanji}`;
}

/**
 * Initialise l'horloge CSS avec l'heure actuelle
 */
function initHorlogeCSS() {
  const temps = getHeureFrance();
  const secondes = temps.secondes;
  const minutes = temps.minutes;
  const heures = temps.heures;

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
  const temps = getHeureFrance();
  const secondes = temps.secondes;
  const minutes = temps.minutes;
  const heures = temps.heures;

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
    // Correction du bug de saut à 0 seconde
    if (secondes === 0) {
      // Désactive la transition pour éviter le saut arrière
      aiguillSecondes.style.transition = 'none';
      aiguillSecondes.style.transform = 'rotateZ(0deg)';
      // Force le reflow pour appliquer le style immédiatement
      void aiguillSecondes.offsetWidth;
      // Réactive la transition pour les prochaines secondes
      setTimeout(() => {
        aiguillSecondes.style.transition = '';
      }, 20);
    } else {
      aiguillSecondes.style.transform = 'rotateZ(' + angleSecondes + 'deg)';
      // S'assure que la transition est bien active
      aiguillSecondes.style.transition = '';
    }
  }

  // Mettre à jour le carré date à chaque tick (pour le changement de jour)
  majCarreDateHorloge();
}

/**
 * Crée ou met à jour le rectangle date à gauche du chiffre 3, aligné avec le 3
 */
function majCarreDateHorloge() {
  const horloge = document.querySelector('.clock.simple');
  if (!horloge) return;

  let carreDate = horloge.querySelector('.carre-date');
  if (!carreDate) {
    carreDate = document.createElement('div');
    carreDate.className = 'carre-date';
    carreDate.style.position = 'absolute';
    carreDate.style.left = '50%';
    carreDate.style.top = '50%';
    // Légèrement plus à gauche qu'avant
    carreDate.style.transform = 'rotate(90deg) translate(0, -90px) rotate(-90deg) translate(-34px, -8px)';
    carreDate.style.width = '48px'; // largeur agrandie
    carreDate.style.height = '22px';
    carreDate.style.background = 'white';
    carreDate.style.borderRadius = '0';
    carreDate.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
    carreDate.style.display = 'flex';
    carreDate.style.alignItems = 'center';
    carreDate.style.justifyContent = 'center';
    carreDate.style.fontFamily = "'Roboto Mono', monospace";
    carreDate.style.fontWeight = 'bold';
    carreDate.style.fontSize = '11px'; // taille réduite
    carreDate.style.color = '#1a3a4a';
    carreDate.style.border = '1.5px solid #e8e0d5';
    carreDate.style.zIndex = 12;
    carreDate.style.padding = '0';
    horloge.appendChild(carreDate);
  }
  // Affichage DD|kanji sans espace, bien centré dans le rectangle
  const maintenant = new Date();
  const jour = String(maintenant.getDate()).padStart(2, "0");
  const joursKanji = ["日", "月", "火", "水", "木", "金", "土"];
  const kanji = joursKanji[maintenant.getDay()];
  carreDate.innerHTML = `<span style="display:block;width:100%;text-align:center;font-size:11px;">${jour}|${kanji}</span>`;
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

  // Ajoute le carré date à côté du 3
  majCarreDateHorloge();
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
  const temps = getHeureFrance();
  const heures = formatNumber(temps.heures);
  const minutes = formatNumber(temps.minutes);
  const secondes = formatNumber(temps.secondes);
  
  const affichage = heures + ":" + minutes + ":" + secondes;
  
  const elementHorloge = document.getElementById("affichageHorloge");
  if (elementHorloge) {
    elementHorloge.textContent = affichage;
  }
  
  // Mettre à jour aussi l'horloge dans la navbar
  const horlogeNavbar = document.getElementById("horlogeNavbar");
  if (horlogeNavbar) {
    horlogeNavbar.textContent = affichage;
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
  const temps = getHeureFrance();
  const minutesActuelles = temps.heures * 60 + temps.minutes;
  
  const [hAlarme, mAlarme] = heureAlarme.split(':').map(Number);
  const minutesAlarme = hAlarme * 60 + mAlarme;
  
  let diffMinutes = minutesAlarme - minutesActuelles;
  
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }
  
  const heuresRestantes = Math.floor(diffMinutes / 60);
  const minutesRestantes = diffMinutes % 60;
  
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
  const temps = getHeureFrance();
  const heureActuelle = formatNumber(temps.heures) + ':' + formatNumber(temps.minutes);
  
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

// ========== MINUTEUR ==========

// Variables globales pour le minuteur
let tempsMinuteur = 300; // 5 minutes en secondes par défaut
let minuteurInterval = null;
let minuteurEnMarche = false;

/**
 * Convertit des secondes en format MM:SS
 */
function secondesVersMS(secondes) {
  const minutes = Math.floor(secondes / 60);
  const secs = secondes % 60;
  return formatNumber(minutes) + ':' + formatNumber(secs);
}

/**
 * Affiche le temps du minuteur
 */
function afficherMinuteur() {
  const affichage = secondesVersMS(tempsMinuteur);
  const element = document.getElementById('affichageMinuteur');
  if (element) {
    element.textContent = affichage;
  }
}

/**
 * Augmente le minuteur de 1 minute
 */
function augmenterMinuteur() {
  if (!minuteurEnMarche) {
    tempsMinuteur += 60;
    afficherMinuteur();
  }
}

/**
 * Diminue le minuteur de 1 minute
 */
function diminuerMinuteur() {
  if (!minuteurEnMarche && tempsMinuteur >= 60) {
    tempsMinuteur -= 60;
    afficherMinuteur();
  }
}

/**
 * Définit le temps du minuteur depuis l'input
 */
function definirTempsMinuteur() {
  if (minuteurEnMarche) return;
  
  const input = document.getElementById('inputMinuteur');
  if (!input) return;
  
  const valeur = input.value.trim();
  
  // Validation du format MM:SS
  const regex = /^([0-9]{1,2}):([0-5][0-9])$/;
  const match = valeur.match(regex);
  
  if (!match) {
    alert('Format invalide ! Utilisez MM:SS (ex: 05:30)');
    return;
  }
  
  const minutes = parseInt(match[1]);
  const secondes = parseInt(match[2]);
  
  if (minutes < 0 || secondes < 0) {
    alert('Le temps doit être positif !');
    return;
  }
  
  tempsMinuteur = (minutes * 60) + secondes;
  afficherMinuteur();
  input.value = '';
}

/**
 * Active/désactive les contrôles du minuteur
 */
function toggleControlsMinuteur(actif) {
  const btnPlus = document.getElementById('btnPlusMinuteur');
  const btnMoins = document.getElementById('btnMoinsMinuteur');
  const btnDefinir = document.getElementById('btnDefinirMinuteur');
  const input = document.getElementById('inputMinuteur');
  
  if (btnPlus) btnPlus.disabled = !actif;
  if (btnMoins) btnMoins.disabled = !actif;
  if (btnDefinir) btnDefinir.disabled = !actif;
  if (input) input.disabled = !actif;
  
  // Style visuel pour les boutons désactivés
  if (btnPlus) btnPlus.classList.toggle('opacity-50', !actif);
  if (btnMoins) btnMoins.classList.toggle('opacity-50', !actif);
  if (btnDefinir) btnDefinir.classList.toggle('opacity-50', !actif);
  if (input) input.classList.toggle('opacity-50', !actif);
}

/**
 * Démarre le minuteur
 */
function demarrerMinuteur() {
  if (tempsMinuteur <= 0) {
    alert('Le minuteur est à zéro ! Définissez un temps.');
    return;
  }
  
  minuteurEnMarche = true;
  toggleControlsMinuteur(false);
  
  // Changer le bouton
  const btn = document.getElementById('btnDemarrerMinuteur');
  if (btn) {
    btn.textContent = 'Arrêter';
    btn.classList.add('btn-modern-stop');
    btn.classList.remove('btn-modern-green');
  }
  
  // Démarrer l'interval
  minuteurInterval = setInterval(function() {
    tempsMinuteur--;
    afficherMinuteur();
    
    if (tempsMinuteur <= 0) {
      arreterMinuteur();
      alert('Temps écoulé !');
    }
  }, 1000);
}

/**
 * Arrête le minuteur
 */
function arreterMinuteur() {
  minuteurEnMarche = false;
  
  if (minuteurInterval) {
    clearInterval(minuteurInterval);
    minuteurInterval = null;
  }
  
  toggleControlsMinuteur(true);
  
  // Changer le bouton
  const btn = document.getElementById('btnDemarrerMinuteur');
  if (btn) {
    btn.textContent = 'Démarrer';
    btn.classList.remove('btn-modern-stop');
    btn.classList.add('btn-modern-green');
  }
}

/**
 * Toggle démarrer/arrêter le minuteur
 */
function toggleMinuteur() {
  if (minuteurEnMarche) {
    arreterMinuteur();
  } else {
    demarrerMinuteur();
  }
}

/**
 * Remet le minuteur à zéro
 */
function resetMinuteur() {
  arreterMinuteur();
  tempsMinuteur = 300; // 5 minutes par défaut
  afficherMinuteur();
}

// ========== CHRONOMÈTRE ==========

// Variables globales pour le chronomètre
let tempsChrono = 0; // en secondes
let chronoInterval = null;
let chronoEnMarche = false;
let tours = [];

/**
 * Convertit des secondes en format HH:MM:SS
 */
function secondesVersHMS(secondes) {
  const heures = Math.floor(secondes / 3600);
  const minutes = Math.floor((secondes % 3600) / 60);
  const secs = secondes % 60;
  return formatNumber(heures) + ':' + formatNumber(minutes) + ':' + formatNumber(secs);
}

/**
 * Affiche le temps du chronomètre
 */
function afficherChrono() {
  const affichage = secondesVersHMS(tempsChrono);
  const element = document.getElementById('affichageChrono');
  if (element) {
    element.textContent = affichage;
  }
}

/**
 * Démarre le chronomètre
 */
function demarrerChrono() {
  chronoEnMarche = true;
  
  // Changer le bouton toggle
  const btnToggle = document.getElementById('btnToggleChrono');
  if (btnToggle) {
    btnToggle.textContent = 'Arrêter';
    btnToggle.classList.add('btn-modern-stop');
    btnToggle.classList.remove('btn-modern-green');
  }
  
  // Activer le bouton Tour
  const btnTour = document.getElementById('btnTourChrono');
  if (btnTour) {
    btnTour.disabled = false;
    btnTour.classList.remove('opacity-50');
  }
  
  // Démarrer l'interval
  chronoInterval = setInterval(function() {
    tempsChrono++;
    afficherChrono();
  }, 1000);
}

/**
 * Arrête le chronomètre
 */
function arreterChrono() {
  chronoEnMarche = false;
  
  if (chronoInterval) {
    clearInterval(chronoInterval);
    chronoInterval = null;
  }
  
  // Changer le bouton toggle
  const btnToggle = document.getElementById('btnToggleChrono');
  if (btnToggle) {
    btnToggle.textContent = 'Reprendre';
    btnToggle.classList.remove('btn-modern-stop');
    btnToggle.classList.add('btn-modern-green');
  }
  
  // Désactiver le bouton Tour
  const btnTour = document.getElementById('btnTourChrono');
  if (btnTour) {
    btnTour.disabled = true;
    btnTour.classList.add('opacity-50');
  }
}

/**
 * Toggle démarrer/arrêter le chronomètre
 */
function toggleChrono() {
  if (chronoEnMarche) {
    arreterChrono();
  } else {
    demarrerChrono();
  }
}

/**
 * Enregistre un tour
 */
function enregistrerTour() {
  if (!chronoEnMarche) return;
  
  tours.push(tempsChrono);
  afficherTours();
}

/**
 * Affiche la liste des tours
 */
function afficherTours() {
  const listeElement = document.getElementById('listeTours');
  const messageAucun = document.getElementById('messageAucunTour');
  
  if (!listeElement) return;
  
  // Vider la liste
  listeElement.innerHTML = '';
  
  // Afficher/masquer le message "aucun tour"
  if (messageAucun) {
    messageAucun.style.display = tours.length === 0 ? 'block' : 'none';
  }
  
  // Afficher chaque tour
  tours.forEach(function(temps, index) {
    const tourDiv = document.createElement('div');
    tourDiv.className = 'bg-white border-l-4 border-oclock-green px-4 py-3 flex justify-between items-center hover:bg-oclock-greenPale transition-colors';
    
    tourDiv.innerHTML = `
      <span class="font-semibold text-gray-700">Tour ${index + 1}</span>
      <span class="text-2xl font-bold font-roboto-mono text-oclock-dial">${secondesVersHMS(temps)}</span>
    `;
    
    listeElement.appendChild(tourDiv);
  });
}

/**
 * Remet le chronomètre à zéro
 */
function resetChrono() {
  arreterChrono();
  tempsChrono = 0;
  tours = [];
  afficherChrono();
  afficherTours();
  
  // Remettre le bouton à "Démarrer"
  const btnToggle = document.getElementById('btnToggleChrono');
  if (btnToggle) {
    btnToggle.textContent = 'Démarrer';
  }
}


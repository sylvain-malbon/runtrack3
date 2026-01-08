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
    link.classList.remove('font-bold', 'border-b-2', 'border-white', 'bg-amber-800');
  });

  // Ajouter active à la page courante
  const activeLink = document.querySelector(`nav ul li a[href="#${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add('font-bold', 'border-b-2', 'border-white', 'bg-amber-800');
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

  // Afficher le message de bienvenue
  const userWelcome = document.getElementById('user-welcome');
  const userWelcomeText = document.getElementById('user-welcome-text');
  if (userWelcome && userWelcomeText) {
    if (isLoggedIn && currentUser.prenom && currentUser.nom) {
      userWelcomeText.textContent = `Bonjour ${currentUser.prenom} ${currentUser.nom}`;
      userWelcome.style.display = 'flex';
    } else {
      userWelcome.style.display = 'none';
    }
  }

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
document.addEventListener('DOMContentLoaded', () => {
  // Récupération de tous les liens de navigation
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Gestion des clics sur les liens de navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      // Mise à jour de l'URL sans recharger la page
      window.location.hash = targetId;
    });
  });

  // Initialisation de la navigation
  updateNavigation();
});

// Écouter les changements de hash
window.addEventListener('hashchange', () => {
  updateNavigation();
});

// ========== HORLOGE CSS ==========

/*
 * Démarre l'horloge avec l'heure locale
 * Inspiré de: cssanimation.rocks/clocks
 */
function initLocalClocks() {
  // Récupérer l'heure locale avec JS
  var date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  // Créer un objet avec chaque aiguille et son angle en degrés
  var hands = [
    {
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: 'minutes',
      angle: (minutes * 6)
    },
    {
      hand: 'seconds',
      angle: (seconds * 6)
    }
  ];
  
  // Boucler sur chaque aiguille pour définir son angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
      elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
      elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
      // Si c'est l'aiguille des minutes, noter la position des secondes
      if (hands[j].hand === 'minutes') {
        elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
      }
    }
  }
}

/*
 * Définir un timeout pour le premier mouvement de l'aiguille des minutes
 */
function setUpMinuteHands() {
  // Découvrir où on en est dans la minute
  var containers = document.querySelectorAll('.minutes-container');
  var secondAngle = containers[0].getAttribute("data-second-angle");
  if (secondAngle > 0) {
    // Définir un timeout jusqu'à la fin de la minute courante
    var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
    setTimeout(function() {
      moveMinuteHands(containers);
    }, delay);
  }
}

/*
 * Faire la première rotation de la minute
 */
function moveMinuteHands(containers) {
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.webkitTransform = 'rotateZ(6deg)';
    containers[i].style.transform = 'rotateZ(6deg)';
  }
  // Puis continuer avec un intervalle de 60 secondes
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 12;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 60000);
}

/*
 * Déplacer les aiguilles des secondes
 */
function moveSecondHands() {
  var containers = document.querySelectorAll('.seconds-container');
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 6;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 1000);
}

// Initialiser l'horloge au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initLocalClocks();
    moveSecondHands();
    setUpMinuteHands();
  });
} else {
  initLocalClocks();
  moveSecondHands();
  setUpMinuteHands();
}

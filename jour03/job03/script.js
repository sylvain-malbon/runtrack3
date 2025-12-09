// Job 03
// Prenez ce logo de La Plateforme_ et réalisez un jeu du taquin:
// Le taquin est composé de 8 carreaux qui glissent dans une grille prévue pour 9.
// Il consiste à remettre dans l'ordre les 8 carreaux à partir d'une configuration initiale.Le
// plateau de jeu est initialisé de façon aléatoire.
//     Lorsqu’un carreau est cliqué, il se déplace dans la case vide adjacente(si il y en a une).
// Lorsque l’image est correctement recomposée, le message “Vous avez gagné” s’affiche
// en vert et bloque la partie.
// Un bouton “Recommencer” apparaît et permet de relancer une partie.
//     Ressources : voici les images:
// image 1
// image 2
// image 3
// image 4
// image 5
// image 6
// image 7
// image 8
// image 9

const images = [
    '1.png', '2.png', '3.png',
    '4.png', '5.png', '6.png',
    '7.png', '8.png', null // null = case vide
];

let tiles = [];
let size = 3; // 3x3
let gameContainer = document.getElementById('game-container');
let message = document.getElementById('message');
let restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
    let arr = array.slice();
    do {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    } while (!isSolvable(arr));
    return arr;
}

// Vérifie si la configuration est solvable
function isSolvable(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
        }
    }
    return inv % 2 === 0;
}

function render() {
    gameContainer.innerHTML = '';
    gameContainer.style.pointerEvents = message.innerText ? 'none' : 'auto';
    tiles.forEach((img, idx) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        if (img) {
            tile.style.backgroundImage = `url('./${img}')`; // Ajoute ./ pour la racine du dossier
            tile.addEventListener('click', () => moveTile(idx));
        } else {
            tile.classList.add('empty');
        }
        gameContainer.appendChild(tile);
    });
}

function moveTile(idx) {
    const emptyIdx = tiles.indexOf(null);
    const canMove = [idx - 1, idx + 1, idx - size, idx + size].includes(emptyIdx) &&
        !(idx % size === 0 && emptyIdx === idx - 1) &&
        !(idx % size === size - 1 && emptyIdx === idx + 1);
    if (canMove) {
        [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
        render();
        checkWin();
    }
}

function checkWin() {
    for (let i = 0; i < images.length - 1; i++) {
        if (tiles[i] !== images[i]) return;
    }
    if (tiles[tiles.length - 1] === null) {
        message.innerText = 'Vous avez gagné';
        message.style.color = 'green';
        restartBtn.style.display = 'inline-block';
    }
}

function restart() {
    message.innerText = '';
    restartBtn.style.display = 'none';
    tiles = shuffle(images);
    render();
}

restartBtn.addEventListener('click', restart);

window.onload = restart;
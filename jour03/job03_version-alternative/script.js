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

const size = 3; // 3x3
let tileOrder = [];
let imgLoaded = false;
let img = new Image();
img.src = 'unique.png';

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

function isSolvable(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] !== null && arr[j] !== null && arr[i] > arr[j]) inv++;
        }
    }
    return inv % 2 === 0;
}

function render() {
    $('#game-container').empty();
    tileOrder.forEach((tileIdx, idx) => {
        const $tile = $('<canvas>').addClass('tile');
        $tile.attr('width', 100).attr('height', 100);
        if (tileIdx !== null) {
            drawTile($tile[0], tileIdx);
            $tile.on('click', function () { moveTile(idx); });
        } else {
            $tile.addClass('empty');
        }
        $('#game-container').append($tile);
    });
}

function drawTile(canvas, tileIdx) {
    const ctx = canvas.getContext('2d');
    const tw = img.width / size;
    const th = img.height / size;
    const x = (tileIdx % size) * tw;
    const y = Math.floor(tileIdx / size) * th;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, tw, th, 0, 0, canvas.width, canvas.height);
}

function moveTile(idx) {
    const emptyIdx = tileOrder.indexOf(null);
    const canMove = [idx - 1, idx + 1, idx - size, idx + size].includes(emptyIdx) &&
        !(idx % size === 0 && emptyIdx === idx - 1) &&
        !(idx % size === size - 1 && emptyIdx === idx + 1);
    if (canMove) {
        [tileOrder[idx], tileOrder[emptyIdx]] = [tileOrder[emptyIdx], tileOrder[idx]];
        render();
        checkWin();
    }
}

function checkWin() {
    for (let i = 0; i < size * size - 1; i++) {
        if (tileOrder[i] !== i) return;
    }
    if (tileOrder[tileOrder.length - 1] === null) {
        $('#message').text('Vous avez gagné').css('color', 'green');
        $('#game-container').css('pointer-events', 'none');
        $('#restart-btn').show();
    }
}

function restart() {
    $('#message').text('');
    $('#restart-btn').hide();
    $('#game-container').css('pointer-events', 'auto');
    tileOrder = shuffle([...Array(size * size - 1).keys(), null]);
    render();
}

img.onload = function () {
    imgLoaded = true;
    restart();
};

$(document).ready(function () {
    if ($('#game-container').length === 0) {
        $('body').append('<div id="game-container"></div>');
    }
    if ($('#message').length === 0) {
        $('body').append('<div id="message"></div>');
    }
    if ($('#restart-btn').length === 0) {
        $('body').append('<button id="restart-btn" style="display:none;">Recommencer</button>');
    }
    $('#restart-btn').on('click', restart);
    if (imgLoaded) restart();
});
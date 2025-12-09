// Job 02
// Dans cet exercice, 6 images s’assemblent pour former un arc - en - ciel, il vous faudra les
// mélanger puis les remettre en ordre.
// Le but de ce job sera dans un premier temps de créer une balise < button >.Cette balise
// servira à mélanger l’ensemble des images de l’arc - en - ciel.
// Par la suite, vous devrez faire en sorte qu’il soit possible de remettre les images dans le
// bon ordre, en utilisant un ou plusieurs conteneurs.
// Une fois que les 6 images sont ordonnées, un message s’affiche en dessous:
// Si l'arc-en-ciel est bien reconstitué, le message “Vous avez gagné” s’affiche en vert.
// Sinon, le message “Vous avez perdu” s’affiche en rouge.
//     Ressources : Liens vers images de l’arc - en - ciel :
// arc1.png
// arc2.png
// arc3.png
// arc4.png
// arc5.png
// arc6.png

const images = [
    "arc1.png",
    "arc2.png",
    "arc3.png",
    "arc4.png",
    "arc5.png",
    "arc6.png"
];

let sourceImages = [];
let targetImages = [];

const sourceZone = document.getElementById('source-zone');
const targetZone = document.getElementById('target-zone');
const message = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffle-btn');

function renderZones() {
    sourceZone.innerHTML = '';
    sourceImages.forEach((img, idx) => {
        const imageElem = document.createElement('img');
        imageElem.src = img;
        imageElem.className = 'rainbow-piece';
        imageElem.draggable = true;
        imageElem.dataset.zone = 'source';
        imageElem.dataset.index = idx;
        imageElem.addEventListener('dragstart', dragStart);
        sourceZone.appendChild(imageElem);
    });

    targetZone.innerHTML = '';
    targetImages.forEach((img, idx) => {
        const imageElem = document.createElement('img');
        imageElem.src = img;
        imageElem.className = 'rainbow-piece';
        imageElem.draggable = true;
        imageElem.dataset.zone = 'target';
        imageElem.dataset.index = idx;
        imageElem.addEventListener('dragstart', dragStart);
        targetZone.appendChild(imageElem);
    });
}

let draggedImg = null;
let draggedFrom = null;
let draggedIdx = null;

function dragStart(e) {
    draggedImg = e.target.src;
    draggedFrom = e.target.dataset.zone;
    draggedIdx = Number(e.target.dataset.index);
}

[sourceZone, targetZone].forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', function (e) {
        if (draggedImg) {
            if (draggedFrom === 'source' && zone === targetZone) {
                // Move from source to target
                targetImages.push(sourceImages[draggedIdx]);
                sourceImages.splice(draggedIdx, 1);
            } else if (draggedFrom === 'target' && zone === sourceZone) {
                // Move from target to source
                sourceImages.push(targetImages[draggedIdx]);
                targetImages.splice(draggedIdx, 1);
            }
            renderZones();
            checkWin();
            draggedImg = null;
            draggedFrom = null;
            draggedIdx = null;
        }
    });
});

function shuffle() {
    sourceImages = [...images];
    targetImages = [];
    for (let i = sourceImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sourceImages[i], sourceImages[j]] = [sourceImages[j], sourceImages[i]];
    }
    renderZones();
    message.textContent = '';
}

function checkWin() {
    message.classList.remove('win', 'lose');
    if (targetImages.length === images.length) {
        if (targetImages.join() === images.join()) {
            message.textContent = "Vous avez gagné";
            message.classList.add('win');
        } else {
            message.textContent = "Vous avez perdu";
            message.classList.add('lose');
        }
    } else {
        message.textContent = '';
    }
}

shuffleBtn.addEventListener('click', shuffle);

// Initialisation
shuffle();

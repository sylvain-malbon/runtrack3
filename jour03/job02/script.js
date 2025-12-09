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

let currentOrder = [...images];

const container = document.getElementById('rainbow-container');
const message = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffle-btn');

function renderRainbow() {
    container.innerHTML = '';
    currentOrder.forEach((img, idx) => {
        const imageElem = document.createElement('img');
        imageElem.src = img;
        imageElem.className = 'rainbow-piece';
        imageElem.draggable = true;
        imageElem.dataset.index = idx;
        // Drag events
        imageElem.addEventListener('dragstart', dragStart);
        imageElem.addEventListener('dragover', dragOver);
        imageElem.addEventListener('drop', drop);
        imageElem.addEventListener('dragenter', e => e.preventDefault());
        container.appendChild(imageElem);
    });
}

let dragSrcIdx = null;

function dragStart(e) {
    dragSrcIdx = +e.target.dataset.index;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    const dragTargetIdx = +e.target.dataset.index;
    if (dragSrcIdx === null || dragSrcIdx === dragTargetIdx) return;
    // Swap
    [currentOrder[dragSrcIdx], currentOrder[dragTargetIdx]] = [currentOrder[dragTargetIdx], currentOrder[dragSrcIdx]];
    renderRainbow();
    checkWin();
}

function shuffle() {
    for (let i = currentOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
    }
    renderRainbow();
    message.textContent = '';
}

function checkWin() {
    if (currentOrder.join() === images.join()) {
        message.textContent = "Vous avez gagné";
        message.style.color = "green";
    } else {
        message.textContent = "Vous avez perdu";
        message.style.color = "red";
    }
}

shuffleBtn.addEventListener('click', shuffle);

// Initialisation
shuffle();

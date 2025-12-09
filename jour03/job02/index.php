<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Arc-en-ciel</title>
    <style>
        #rainbow-container {
            display: flex;
            margin-bottom: 10px;
        }
        .rainbow-piece {
            width: 80px;
            height: 250px;
            margin: 0 2px;
            cursor: grab;
            user-select: none;
        }
        #message {
            font-size: 1.2em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <button id="shuffle-btn">Mélanger</button>
    <div id="rainbow-container"></div>
    <div id="message"></div>
    <script src="script.js"></script>
</body>
</html>
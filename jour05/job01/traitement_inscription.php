<?php
// Sécurité et bonnes pratiques pour le traitement d'inscription
// 1. Toujours valider et filtrer les données côté serveur
// 2. Hacher le mot de passe
// 3. Utiliser des requêtes préparées pour la base de données

// Connexion à la base (exemple PDO)
$pdo = new PDO('mysql:host=localhost;dbname=ma_base;charset=utf8', 'user', 'password', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

// Récupération et filtrage des données
$nom = trim($_POST['nom'] ?? '');
$prenom = trim($_POST['prenom'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$adresse = trim($_POST['adresse'] ?? '');
$ville = trim($_POST['ville'] ?? '');
$codepostal = trim($_POST['codepostal'] ?? '');

$errors = [];
if (mb_strlen($nom) < 2) $errors[] = "Le nom doit contenir au moins 2 caractères.";
if (mb_strlen($prenom) < 2) $errors[] = "Le prénom doit contenir au moins 2 caractères.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "L'email n'est pas valide.";
if (mb_strlen($password) < 8 || !preg_match('/[a-zA-Z]/', $password) || !preg_match('/[0-9]/', $password) || !preg_match('/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/', $password) || preg_match('/\s/', $password)) {
    $errors[] = "Le mot de passe n'est pas conforme.";
}
if (mb_strlen($adresse) < 4) $errors[] = "L'adresse doit contenir au moins 4 caractères.";
if (mb_strlen($ville) < 1) $errors[] = "La ville est requise.";
if (!preg_match('/^[\w\s-]{3,10}$/u', $codepostal)) $errors[] = "Le code postal doit être valide.";

if ($errors) {
    // Afficher les erreurs ou les retourner en JSON
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Hachage du mot de passe
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertion sécurisée
$stmt = $pdo->prepare('INSERT INTO users (nom, prenom, email, password, adresse, ville, codepostal) VALUES (?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$nom, $prenom, $email, $hash, $adresse, $ville, $codepostal]);

echo json_encode(['success' => true]);

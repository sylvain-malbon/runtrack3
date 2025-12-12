<?php
// Sécurité et bonnes pratiques pour le traitement d'inscription
// 1. Toujours valider et filtrer les données côté serveur
// 2. Hacher le mot de passe
// 3. Utiliser des requêtes préparées pour la base de données

header('Content-Type: application/json');

require_once 'config.php';

// Connexion à la base (exemple PDO)
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET,
        DB_USER,
        DB_PASS,
        DB_OPTIONS
    );
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'errors' => ["Erreur de connexion à la base de données."]]);
    exit;
}

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
if (
    mb_strlen($password) < 8 ||
    !preg_match('/[a-z]/', $password) ||
    !preg_match('/[A-Z]/', $password) ||
    !preg_match('/[0-9]/', $password) ||
    !preg_match('/[@$!%*?&]/', $password) ||
    preg_match('/\s/', $password)
) {
    $errors[] = "Le mot de passe n'est pas conforme.";
}
if (mb_strlen($adresse) < 4) $errors[] = "L'adresse doit contenir au moins 4 caractères.";
if (mb_strlen($ville) < 1) $errors[] = "La ville est requise.";
if (!preg_match('/^[\w\s-]{3,10}$/u', $codepostal)) $errors[] = "Le code postal doit être valide.";

if ($errors) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Hachage du mot de passe
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertion sécurisée
try {
    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'errors' => ["Cet email est déjà utilisé."]]);
        exit;
    }

    // Insertion sécurisée
    $stmt = $pdo->prepare('INSERT INTO users (nom, prenom, email, password, adresse, ville, codepostal) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$nom, $prenom, $email, $hash, $adresse, $ville, $codepostal]);
    echo json_encode(['success' => true, 'message' => 'Inscription réussie !']);
    exit;
} catch (Exception $e) {
    echo json_encode(['success' => false, 'errors' => ["Erreur serveur."]]);
    exit;
}

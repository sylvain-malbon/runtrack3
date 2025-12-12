<?php
session_start();
header('Content-Type: application/json');

require_once 'config.php';

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

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'errors' => ["Tous les champs sont requis."]]);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT id, nom, prenom, password FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_nom'] = $user['nom'];
        $_SESSION['user_prenom'] = $user['prenom'];
        echo json_encode(['success' => true, 'message' => 'Connexion réussie !']);
        exit;
    } else {
        echo json_encode(['success' => false, 'errors' => ["Email ou mot de passe incorrect."]]);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'errors' => ["Erreur serveur."]]);
    exit;
}

<?php
// Configuration de la base de données
define('DB_HOST', 'localhost');
define('DB_NAME', 'ma_base');
define('DB_USER', 'user');
define('DB_PASS', 'password');
define('DB_CHARSET', 'utf8');

// Options PDO
define('DB_OPTIONS', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
]);
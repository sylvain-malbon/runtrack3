CREATE DATABASE IF NOT EXISTS utilisateurs;
USE utilisateurs;

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com'),
('Martin', 'Sophie', 'sophie.martin@email.com'),
('Durand', 'Paul', 'paul.durand@email.com'),
('Bernard', 'Lucie', 'lucie.bernard@email.com');
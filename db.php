<?php
// ===== db.php =====
 $host = 'localhost';
 $dbname = 'elkendi_db';
 $user = 'root'; // Par défaut sur XAMPP/WAMP (à changer en production)
 $pass = '';     // Par défaut vide sur XAMPP/WAMP (à changer en production)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    // Activer les erreurs PDO (très utile pour le débogage)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Retourner les résultats en tableau associatif par défaut
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // En cas d'erreur de connexion, on arrête tout
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>
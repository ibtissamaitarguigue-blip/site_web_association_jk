<?php
// ===== save.php (Version Base de Données Sécurisée) =====
session_start();
require_once 'db.php'; // On appelle la connexion

// Vérifier que c'est bien une soumission de formulaire
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

// 1. Vérification du Token CSRF (SÉCURITÉ MAXIMALE)
if (empty($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    // Si le token est manquant ou invalide, on bloque
    header('Location: index.php?error=csrf');
    exit;
}

// 2. Nettoyage des données
function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

 $nom       = clean($_POST['nom'] ?? '');
 $prenom    = clean($_POST['prenom'] ?? '');
 $email     = clean($_POST['email'] ?? '');
 $telephone = clean($_POST['telephone'] ?? '');
 $classe    = clean($_POST['classe'] ?? '');
 $activite  = clean($_POST['activite'] ?? '');

// 3. Validation serveur (les champs sont-ils remplis ?)
if (empty($nom) || empty($prenom) || empty($email) || empty($telephone) || empty($classe) || empty($activite)) {
    header("Location: index.php?error=1");
    exit;
}

// Validation email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.php?error=email");
    exit;
}

try {
    // 4. Vérifier si l'email existe déjà (DOUBLONS)
    $stmtCheck = $pdo->prepare("SELECT id FROM inscriptions WHERE email = ?");
    $stmtCheck->execute([$email]);
    
    if ($stmtCheck->fetch()) {
        // L'email est déjà dans la BDD
        header("Location: index.php?error=duplicate");
        exit;
    }

    // 5. Insertion dans la Base de Données avec REQUÊTE PRÉPARÉE (Anti-Injection SQL)
    $sql = "INSERT INTO inscriptions (nom, prenom, email, telephone, classe, activite) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nom, $prenom, $email, $telephone, $classe, $activite]);

    // 6. Régénérer le token CSRF après succès (pour qu'il ne puisse pas être réutilisé)
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    // 7. Redirection vers le site avec message de succès
    header("Location: index.php?success=1");
    exit;

} catch (PDOException $e) {
    // En cas d'erreur avec la base de données, on redirige avec une erreur
    // En production, on loggerait l'erreur : error_log($e->getMessage());
    header("Location: index.php?error=db");
    exit;
}
?>
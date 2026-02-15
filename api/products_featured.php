<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../backend/config.php';

$pdo = getConnection();

// Lidar com preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Buscar apenas produtos em destaque (featured = 1)
    $stmt = $pdo->prepare("
        SELECT 
            id,
            name,
            description,
            price,
            image,
            category,
            rating,
            reviews,
            featured,
            created_at
        FROM products 
        WHERE featured = 1
        ORDER BY rating DESC, reviews DESC
        LIMIT 3
    ");
    
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    jsonResponse($products);
    
} catch (PDOException $e) {
    jsonResponse(['error' => 'Erro ao buscar produtos em destaque: ' . $e->getMessage()], 500);
}
?>

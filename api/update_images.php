<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Configuração do banco
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $timestamp = time();
    $random = rand(1000, 9999);
    
    // Atualizar Brigadeiro Gourmet
    $brigadeiroImage = "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    $stmt1 = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result1 = $stmt1->execute([$brigadeiroImage]);
    
    // Atualizar Pudim Caseiro
    $pudimImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    $stmt2 = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Pudim%'");
    $result2 = $stmt2->execute([$pudimImage]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Imagens atualizadas com sucesso!',
        'brigadeiro' => $brigadeiroImage,
        'pudim' => $pudimImage,
        'brigadeiroRows' => $stmt1->rowCount(),
        'pudimRows' => $stmt2->rowCount()
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
?>











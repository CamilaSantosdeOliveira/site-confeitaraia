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
    
    // Nova imagem do Pudim Caseiro com timestamp único
    $newImage = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop&q=80&t=' . time() . '&v=' . rand(1000, 9999);
    
    // Atualizar o Pudim Caseiro
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Pudim%'");
    $result = $stmt->execute([$newImage]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Imagem do Pudim Caseiro atualizada com sucesso!',
            'newImage' => $newImage,
            'rowsAffected' => $stmt->rowCount()
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao atualizar imagem'
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro de conexão: ' . $e->getMessage()
    ]);
}
?>











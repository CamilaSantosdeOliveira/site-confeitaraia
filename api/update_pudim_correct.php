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
    
    // Imagem de pudim mais confiável
    $pudimImage = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    // Atualizar Pudim Caseiro
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Pudim%'");
    $result = $stmt->execute([$pudimImage]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Imagem do Pudim Caseiro atualizada com sucesso!',
            'newImage' => $pudimImage,
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
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
?>











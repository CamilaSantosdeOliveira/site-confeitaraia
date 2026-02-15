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
    
    // Atualizar o produto "Pudim Caseiro" para "Torta de Morango"
    $stmt = $pdo->prepare("UPDATE products SET 
        name = 'Torta de Morango',
        description = 'Deliciosa torta de morango com creme e frutas frescas',
        image = ?,
        category = 'tortas'
        WHERE name LIKE '%Pudim%'");
    
    // Imagem de torta de morango
    $strawberryCakeImage = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    $result = $stmt->execute([$strawberryCakeImage]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Produto alterado para Torta de Morango com sucesso!',
            'newName' => 'Torta de Morango',
            'newDescription' => 'Deliciosa torta de morango com creme e frutas frescas',
            'newImage' => $strawberryCakeImage,
            'rowsAffected' => $stmt->rowCount()
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao atualizar produto'
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
?>











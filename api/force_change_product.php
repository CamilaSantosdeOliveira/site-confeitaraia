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
    
    // Primeiro, vamos ver o que tem no banco
    $checkStmt = $pdo->prepare("SELECT id, name, description, image FROM products WHERE name LIKE '%Pudim%' OR name LIKE '%Torta%'");
    $checkStmt->execute();
    $products = $checkStmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "PRODUTOS ENCONTRADOS:\n";
    foreach($products as $product) {
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . " | Descrição: " . $product['description'] . "\n";
    }
    
    // Agora vamos atualizar
    $stmt = $pdo->prepare("UPDATE products SET 
        name = 'Torta de Morango',
        description = 'Deliciosa torta de morango com creme e frutas frescas',
        image = ?,
        category = 'tortas'
        WHERE name LIKE '%Pudim%'");
    
    $strawberryCakeImage = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    $result = $stmt->execute([$strawberryCakeImage]);
    
    echo "\nRESULTADO DA ATUALIZAÇÃO:\n";
    echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
    
    // Verificar se foi atualizado
    $checkStmt2 = $pdo->prepare("SELECT id, name, description, image FROM products WHERE name LIKE '%Torta%'");
    $checkStmt2->execute();
    $updatedProducts = $checkStmt2->fetchAll(PDO::FETCH_ASSOC);
    
    echo "\nPRODUTOS APÓS ATUALIZAÇÃO:\n";
    foreach($updatedProducts as $product) {
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . " | Descrição: " . $product['description'] . "\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











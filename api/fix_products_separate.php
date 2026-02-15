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
    
    // Corrigir o primeiro produto (ID 3) para Pudim Caseiro
    $pudimImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    $stmt1 = $pdo->prepare("UPDATE products SET 
        name = 'Pudim Caseiro',
        description = 'Cremoso pudim de leite condensado com calda de açúcar caramelizado',
        image = ?,
        category = 'sobremesas',
        price = 25.00
        WHERE id = 3");
    
    $result1 = $stmt1->execute([$pudimImage]);
    
    // Corrigir o segundo produto (ID 5) para Torta de Morango
    $tortaImage = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    $stmt2 = $pdo->prepare("UPDATE products SET 
        name = 'Torta de Morango',
        description = 'Deliciosa torta de morango com creme e frutas frescas',
        image = ?,
        category = 'tortas',
        price = 22.00
        WHERE id = 5");
    
    $result2 = $stmt2->execute([$tortaImage]);
    
    echo "PRODUTOS CORRIGIDOS:\n";
    echo "ID 3: Pudim Caseiro - " . ($result1 ? "OK" : "ERRO") . "\n";
    echo "ID 5: Torta de Morango - " . ($result2 ? "OK" : "ERRO") . "\n";
    
    // Verificar resultado
    $checkStmt = $pdo->prepare("SELECT id, name, description, price, category FROM products WHERE id IN (3, 5) ORDER BY id");
    $checkStmt->execute();
    $products = $checkStmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "\nPRODUTOS FINAIS:\n";
    foreach($products as $product) {
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . " | Preço: R$ " . $product['price'] . " | Categoria: " . $product['category'] . "\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











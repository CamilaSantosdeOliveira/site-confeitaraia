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
    
    // Novo preço realista para o Brigadeiro Gourmet
    $newPrice = 8.00;
    
    // Atualizar o preço do Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET price = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$newPrice]);
    
    if ($result) {
        echo "PREÇO DO BRIGADEIRO GOURMET ATUALIZADO:\n";
        echo "Novo preço: R$ " . number_format($newPrice, 2, ',', '.') . "\n";
        echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
        
        // Verificar resultado
        $checkStmt = $pdo->prepare("SELECT id, name, price FROM products WHERE name LIKE '%Brigadeiro%'");
        $checkStmt->execute();
        $product = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        echo "\nPRODUTO ATUALIZADO:\n";
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . "\n";
        echo "Preço: R$ " . number_format($product['price'], 2, ',', '.') . "\n";
    } else {
        echo "ERRO ao atualizar preço\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











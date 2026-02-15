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
    
    // Corrigir o nome para "Pudim de Leite Condensado"
    $pudimImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop&q=80&t={$timestamp}&v={$random}";
    
    $stmt = $pdo->prepare("UPDATE products SET 
        name = 'Pudim de Leite Condensado',
        description = 'Cremoso pudim de leite condensado com calda de açúcar caramelizado',
        image = ?,
        category = 'sobremesas',
        price = 25.00
        WHERE id = 3");
    
    $result = $stmt->execute([$pudimImage]);
    
    if ($result) {
        echo "PRODUTO ATUALIZADO:\n";
        echo "ID 3: Pudim de Leite Condensado - " . ($result ? "OK" : "ERRO") . "\n";
        echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
        
        // Verificar resultado
        $checkStmt = $pdo->prepare("SELECT id, name, description, price, category FROM products WHERE id = 3");
        $checkStmt->execute();
        $product = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        echo "\nPRODUTO FINAL:\n";
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . " | Preço: R$ " . $product['price'] . " | Categoria: " . $product['category'] . "\n";
    } else {
        echo "ERRO ao atualizar produto\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











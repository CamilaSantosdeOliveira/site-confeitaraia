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
    
    // Nova descrição corrigida para o Bolo de Chocolate Belga
    $newDescription = "A união perfeita de cacau 70% e um recheio cremoso. Irresistível!";
    
    // Atualizar a descrição do Bolo de Chocolate Belga
    $stmt = $pdo->prepare("UPDATE products SET description = ? WHERE name LIKE '%Bolo de Chocolate Belga%'");
    $result = $stmt->execute([$newDescription]);
    
    if ($result) {
        echo "DESCRIÇÃO DO BOLO DE CHOCOLATE BELGA ATUALIZADA:\n";
        echo "Nova descrição: " . $newDescription . "\n";
        echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
        
        // Verificar resultado
        $checkStmt = $pdo->prepare("SELECT id, name, description FROM products WHERE name LIKE '%Bolo de Chocolate Belga%'");
        $checkStmt->execute();
        $product = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        echo "\nPRODUTO ATUALIZADO:\n";
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . "\n";
        echo "Descrição: " . $product['description'] . "\n";
    } else {
        echo "ERRO ao atualizar descrição\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











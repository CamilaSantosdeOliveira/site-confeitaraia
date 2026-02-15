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
    
    // URL EXATA do Designi que você enviou
    $pudimImage = "https://www.designi.com.br/61aedc8a8aeb7593";
    
    // Atualizar a imagem do Pudim de Leite Condensado
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Pudim%'");
    $result = $stmt->execute([$pudimImage]);
    
    if ($result) {
        echo "IMAGEM DO DESIGNI ATUALIZADA:\n";
        echo "URL: " . $pudimImage . "\n";
        echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
        
        // Verificar resultado
        $checkStmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Pudim%'");
        $checkStmt->execute();
        $product = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        echo "\nPRODUTO ATUALIZADO:\n";
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . "\n";
        echo "Imagem: " . $product['image'] . "\n";
    } else {
        echo "ERRO ao atualizar imagem\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











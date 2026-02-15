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
    
    // Verificar a imagem do pudim no banco
    $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Pudim%'");
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($product) {
        echo "PRODUTO NO BANCO:\n";
        echo "ID: " . $product['id'] . "\n";
        echo "Nome: " . $product['name'] . "\n";
        echo "Imagem: " . $product['image'] . "\n";
        
        // Testar se a imagem carrega
        $imageUrl = $product['image'];
        $headers = @get_headers($imageUrl);
        if ($headers && strpos($headers[0], '200') !== false) {
            echo "\n✅ IMAGEM CARREGA CORRETAMENTE\n";
        } else {
            echo "\n❌ IMAGEM NÃO CARREGA - ERRO 404 OU BLOQUEIO\n";
        }
    } else {
        echo "❌ PRODUTO NÃO ENCONTRADO\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











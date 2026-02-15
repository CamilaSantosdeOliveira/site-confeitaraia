<?php
// Verificar e corrigir a imagem do Brigadeiro no banco
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Verificar a imagem atual
    $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Brigadeiro%'");
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($product) {
        echo "PRODUTO ENCONTRADO:\n";
        echo "ID: " . $product['id'] . "\n";
        echo "Nome: " . $product['name'] . "\n";
        echo "Imagem atual: " . $product['image'] . "\n\n";
        
        // Atualizar com nova imagem
        $newImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=400&fit=crop&q=80&t=' . time();
        
        $updateStmt = $pdo->prepare("UPDATE products SET image = ? WHERE id = ?");
        $result = $updateStmt->execute([$newImage, $product['id']]);
        
        if ($result) {
            echo "✅ IMAGEM ATUALIZADA COM SUCESSO!\n";
            echo "Nova URL: " . $newImage . "\n";
        } else {
            echo "❌ ERRO AO ATUALIZAR\n";
        }
    } else {
        echo "❌ PRODUTO NÃO ENCONTRADO\n";
    }
    
} catch(PDOException $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n";
}
?>











<?php
// Script para corrigir a imagem do Brigadeiro Gourmet
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Nova imagem correta do Brigadeiro
    $newImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=400&fit=crop&q=80&t=' . time();
    
    // Atualizar a imagem do Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$newImage]);
    
    if ($result) {
        echo "✅ Imagem do Brigadeiro Gourmet atualizada com sucesso!\n";
        echo "Nova URL: " . $newImage . "\n";
        
        // Verificar se foi atualizada
        $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Brigadeiro%'");
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            echo "Verificação:\n";
            echo "ID: " . $product['id'] . "\n";
            echo "Nome: " . $product['name'] . "\n";
            echo "Imagem: " . $product['image'] . "\n";
        }
    } else {
        echo "❌ Erro ao atualizar a imagem\n";
    }
    
} catch(PDOException $e) {
    echo "❌ Erro de conexão: " . $e->getMessage() . "\n";
}
?>











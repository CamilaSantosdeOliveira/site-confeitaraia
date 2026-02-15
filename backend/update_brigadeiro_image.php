<?php
// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    // Conexão com MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Nova imagem de brigadeiros gourmet
    $newImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop';
    
    // Atualizar Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$newImage]);
    
    if ($result) {
        echo "✅ Imagem do Brigadeiro Gourmet atualizada com sucesso!\n";
        echo "Nova URL: " . $newImage . "\n";
        
        // Verificar se foi atualizado
        $stmt = $pdo->prepare("SELECT name, image FROM products WHERE name LIKE '%Brigadeiro%'");
        $stmt->execute();
        $brigadeiro = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($brigadeiro) {
            echo "Verificação:\n";
            echo "Nome: " . $brigadeiro['name'] . "\n";
            echo "Imagem: " . $brigadeiro['image'] . "\n";
        }
    } else {
        echo "❌ Erro ao atualizar imagem\n";
    }
    
} catch(PDOException $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
?>











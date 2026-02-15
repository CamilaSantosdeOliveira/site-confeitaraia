<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    // Conexão com MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Buscar Brigadeiro Gourmet
    $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Brigadeiro%'");
    $stmt->execute();
    $brigadeiro = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($brigadeiro) {
        echo "Brigadeiro encontrado:\n";
        echo "ID: " . $brigadeiro['id'] . "\n";
        echo "Nome: " . $brigadeiro['name'] . "\n";
        echo "Imagem atual: " . $brigadeiro['image'] . "\n\n";
        
        // Atualizar com imagem correta de brigadeiro
        $newImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop';
        
        $updateStmt = $pdo->prepare("UPDATE products SET image = ? WHERE id = ?");
        $updateStmt->execute([$newImage, $brigadeiro['id']]);
        
        echo "✅ Imagem atualizada para: " . $newImage . "\n";
        
        // Verificar se foi atualizado
        $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE id = ?");
        $stmt->execute([$brigadeiro['id']]);
        $updated = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo "Verificação - Nova imagem: " . $updated['image'] . "\n";
        
    } else {
        echo "❌ Brigadeiro Gourmet não encontrado no banco!\n";
    }
    
} catch(PDOException $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
?>











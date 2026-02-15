<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    // Conexão com MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Imagem correta de brigadeiros gourmet com timestamp único
    $timestamp = time();
    $brigadeiroImage = "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&t={$timestamp}";
    
    echo "Atualizando Brigadeiro Gourmet...\n";
    echo "Nova imagem: {$brigadeiroImage}\n\n";
    
    // Atualizar Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$brigadeiroImage]);
    
    if ($result) {
        // Verificar se foi atualizado
        $stmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Brigadeiro%'");
        $stmt->execute();
        $brigadeiro = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo "✅ SUCESSO! Imagem atualizada!\n";
        echo "ID: " . $brigadeiro['id'] . "\n";
        echo "Nome: " . $brigadeiro['name'] . "\n";
        echo "Imagem: " . $brigadeiro['image'] . "\n\n";
        
        // Retornar JSON
        echo json_encode([
            'success' => true,
            'message' => 'Brigadeiro Gourmet atualizado com sucesso!',
            'product' => $brigadeiro,
            'timestamp' => $timestamp
        ], JSON_UNESCAPED_UNICODE);
        
    } else {
        echo "❌ ERRO ao atualizar!\n";
    }
    
} catch(PDOException $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n";
}
?>











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
    
    // Nova imagem de brigadeiros gourmet (a que você mostrou)
    $brigadeiroImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&t=' . time();
    
    // Atualizar Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$brigadeiroImage]);
    
    if ($result) {
        // Buscar e retornar o produto atualizado
        $stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE '%Brigadeiro%'");
        $stmt->execute();
        $brigadeiro = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Imagem do Brigadeiro Gourmet atualizada com a foto correta!',
            'product' => $brigadeiro,
            'new_image' => $brigadeiroImage
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao atualizar imagem'
        ], JSON_UNESCAPED_UNICODE);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>











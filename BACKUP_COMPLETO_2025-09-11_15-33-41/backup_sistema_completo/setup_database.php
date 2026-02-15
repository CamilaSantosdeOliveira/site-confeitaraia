<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Configuração do banco de dados
$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Conexão inicial sem especificar banco
    $pdo = new PDO("mysql:host=$host;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Conectado ao MySQL com sucesso!\n";
    
    // 1. Criar banco de dados
    $pdo->exec("CREATE DATABASE IF NOT EXISTS confeitaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Banco 'confeitaria' criado/verificado!\n";
    
    // 2. Conectar ao banco confeitaria
    $pdo = new PDO("mysql:host=$host;dbname=confeitaria;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 3. Criar tabela products
    $sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category VARCHAR(100) NOT NULL DEFAULT 'Bolos',
        description TEXT,
        image TEXT,
        tags TEXT,
        status ENUM('active', 'inactive') DEFAULT 'active',
        sales INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    echo "✅ Tabela 'products' criada/verificada!\n";
    
    // 4. Verificar se já tem produtos
    $stmt = $pdo->query("SELECT COUNT(*) FROM products");
    $count = $stmt->fetchColumn();
    
    if ($count == 0) {
        // 5. Inserir produtos de exemplo
        $sql = "INSERT INTO products (name, price, stock, category, description, image, tags, sales) VALUES
        ('Bolo de Chocolate', 45.00, 15, 'Bolos', 'Delicioso bolo de chocolate com cobertura cremosa', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', 'chocolate,bolo,doce', 12),
        ('Torta de Morango', 38.50, 8, 'Tortas', 'Torta fresca de morango com creme', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop', 'morango,torta,fruta', 8),
        ('Cupcake de Baunilha', 12.00, 25, 'Cupcakes', 'Cupcake fofinho de baunilha com glacê colorido', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 'baunilha,cupcake,docinho', 20),
        ('Brigadeiro Gourmet', 8.50, 30, 'Doces', 'Brigadeiro artesanal com granulado premium', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop', 'brigadeiro,chocolate,doce', 35),
        ('Pudim de Leite', 22.00, 12, 'Sobremesas', 'Pudim tradicional de leite condensado', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', 'pudim,leite,sobremesa', 15)";
        
        $pdo->exec($sql);
        echo "✅ 5 produtos de exemplo inseridos!\n";
    } else {
        echo "✅ Já existem $count produtos no banco!\n";
    }
    
    // 6. Retornar sucesso
    echo json_encode([
        'success' => true,
        'message' => 'Banco de dados configurado com sucesso!',
        'database' => 'confeitaria',
        'table' => 'products',
        'products_count' => $count
    ], JSON_UNESCAPED_UNICODE);
    
} catch(PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao configurar banco: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

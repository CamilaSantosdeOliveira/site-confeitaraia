<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Credentials: true');

require_once 'config/database.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    // Verificar se a tabela cart_items existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'cart_items'");
    $tableExists = $stmt->rowCount() > 0;
    
    if (!$tableExists) {
        echo "Tabela cart_items não existe. Criando...\n";
        
        // Criar tabela cart_items
        $sql = "CREATE TABLE IF NOT EXISTS cart_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            session_id VARCHAR(255),
            product_id INT NOT NULL,
            quantity INT NOT NULL DEFAULT 1,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            INDEX idx_user_cart (user_id),
            INDEX idx_session_cart (session_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $pdo->exec($sql);
        echo "✅ Tabela cart_items criada com sucesso!\n";
    } else {
        echo "✅ Tabela cart_items já existe!\n";
    }
    
    // Listar todas as tabelas
    echo "\n=== TABELAS NO BANCO ===\n";
    $stmt = $pdo->query("SHOW TABLES");
    while ($row = $stmt->fetch()) {
        echo "Tabela: " . array_values($row)[0] . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
?>











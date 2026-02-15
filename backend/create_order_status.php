<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    // Criar tabela order_status
    $sql = "CREATE TABLE IF NOT EXISTS order_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order_id (order_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    echo "✅ Tabela order_status criada com sucesso!\n";
    
    // Inserir status padrão para ORD-123456
    $stmt = $pdo->prepare("INSERT IGNORE INTO order_status (order_id, status, description) VALUES (?, ?, ?)");
    $stmt->execute(['ORD-123456', 'confirmado', 'Pedido confirmado e recebido']);
    $stmt->execute(['ORD-123456', 'preparando', 'Pedido em preparação']);
    $stmt->execute(['ORD-123456', 'pronto', 'Pedido pronto para entrega']);
    $stmt->execute(['ORD-123456', 'entregue', 'Pedido entregue com sucesso']);
    
    echo "✅ Status padrão inseridos!\n";
    
    // Verificar se foi criado
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM order_status");
    $result = $stmt->fetch();
    echo "Total de status: " . $result['total'] . "\n";
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
?>











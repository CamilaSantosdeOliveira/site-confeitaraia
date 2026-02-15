<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    // Atualizar order_status para usar pedido real
    $stmt = $pdo->prepare('UPDATE order_status SET order_id = ? WHERE order_id = ?');
    $stmt->execute(['ORD-2025-7902', 'ORD-123456']);
    
    echo "✅ Status atualizados para ORD-2025-7902\n";
    
    // Verificar se funcionou
    $stmt = $pdo->prepare('SELECT * FROM order_status WHERE order_id = ?');
    $stmt->execute(['ORD-2025-7902']);
    $statuses = $stmt->fetchAll();
    
    echo "Status encontrados: " . count($statuses) . "\n";
    foreach($statuses as $status) {
        echo "- " . $status['status'] . ": " . $status['description'] . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
?>











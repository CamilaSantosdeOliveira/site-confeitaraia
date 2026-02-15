<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    echo "=== ESTRUTURA DA TABELA ORDERS ===\n";
    $stmt = $pdo->query('DESCRIBE orders');
    $columns = $stmt->fetchAll();
    foreach($columns as $col) {
        echo $col['Field'] . ' - ' . $col['Type'] . "\n";
    }
    
    echo "\n=== DADOS DA TABELA ORDERS ===\n";
    $stmt = $pdo->query('SELECT * FROM orders LIMIT 5');
    $orders = $stmt->fetchAll();
    foreach($orders as $order) {
        echo "ID: " . $order['id'] . " - Total: " . $order['total'] . "\n";
    }
    
    echo "\n=== DADOS DA TABELA ORDER_STATUS ===\n";
    $stmt = $pdo->query('SELECT * FROM order_status LIMIT 5');
    $statuses = $stmt->fetchAll();
    foreach($statuses as $status) {
        echo "Order ID: " . $status['order_id'] . " - Status: " . $status['status'] . "\n";
    }
    
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>











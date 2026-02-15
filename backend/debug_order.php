<?php
require_once 'config/database.php';

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    $stmt = $pdo->query('SELECT * FROM orders WHERE order_number = "ORD-2025-7902" LIMIT 1');
    $order = $stmt->fetch();
    
    if ($order) {
        echo "=== DADOS DO PEDIDO ORD-2025-7902 ===\n";
        foreach($order as $key => $value) {
            echo $key . ': ' . $value . "\n";
        }
    } else {
        echo "Pedido não encontrado\n";
    }
    
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>











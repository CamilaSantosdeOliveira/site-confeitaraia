<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== TESTANDO ORDER_STATUS API ===\n";

try {
    require_once 'config/database.php';
    
    $db = new Database();
    $pdo = $db->getConnection();
    
    echo "✅ Conexão com banco OK\n";
    
    // Testar busca de pedido
    $orderId = 'ORD-123456';
    echo "Buscando pedido: $orderId\n";
    
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE order_number = ?");
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();
    
    if ($order) {
        echo "✅ Pedido encontrado: ID " . $order['id'] . "\n";
    } else {
        echo "❌ Pedido não encontrado\n";
        
        // Listar pedidos existentes
        echo "\nPedidos existentes:\n";
        $stmt = $pdo->query("SELECT id, order_number, total FROM orders LIMIT 5");
        $orders = $stmt->fetchAll();
        foreach($orders as $o) {
            echo "- ID: " . $o['id'] . " | Order Number: '" . $o['order_number'] . "' | Total: " . $o['total'] . "\n";
        }
    }
    
    // Testar busca de status
    $stmt = $pdo->prepare("SELECT * FROM order_status WHERE order_id = ?");
    $stmt->execute([$orderId]);
    $statuses = $stmt->fetchAll();
    
    echo "Status encontrados: " . count($statuses) . "\n";
    foreach($statuses as $status) {
        echo "- " . $status['status'] . ": " . $status['description'] . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
?>











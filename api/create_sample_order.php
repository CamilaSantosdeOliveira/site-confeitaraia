<?php
require_once 'backend/config.php';

try {
    $pdo = getConnection();
    
    // Verificar se já existe um pedido com esse ID
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE order_number = ?");
    $stmt->execute(['ORD-123456']);
    $existingOrder = $stmt->fetch();
    
    if ($existingOrder) {
        echo "Pedido ORD-123456 já existe na base de dados\n";
        print_r($existingOrder);
        exit;
    }
    
    // Criar pedido de exemplo
    $pdo->beginTransaction();
    
        // Inserir pedido
        $stmt = $pdo->prepare("
            INSERT INTO orders (
                user_id, 
                order_number, 
                status, 
                total, 
                payment_method, 
                payment_status, 
                delivery_address, 
                notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            1, // user_id (assumindo que existe um usuário com ID 1)
            'ORD-123456', // order_number
            'confirmed', // status
            140.00, // total
            'pix', // payment_method
            'paid', // payment_status
            'Rua das Flores, 123 - Vila Madalena, São Paulo - SP', // delivery_address
            'Pedido de exemplo para teste' // notes
        ]);
    
    $order_id = $pdo->lastInsertId();
    
    // Inserir itens do pedido na tabela order_items
    $stmt = $pdo->prepare("
        INSERT INTO order_items (order_id, product_id, quantity, price, total) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    // Item 1: Bolo de Chocolate
    $stmt->execute([$order_id, 1, 1, 95.00, 95.00]);
    
    // Item 2: Cupcakes de Morango
    $stmt->execute([$order_id, 2, 6, 7.50, 45.00]);
    
    // Inserir status inicial
    $stmt = $pdo->prepare("
        INSERT INTO order_status (order_id, status, description, created_at) 
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->execute(['ORD-123456', 'confirmado', 'Pedido confirmado e recebido']);
    
    // Inserir status adicional
    $stmt->execute(['ORD-123456', 'preparando', 'Pedido em preparação']);
    
    $pdo->commit();
    
    echo "Pedido de exemplo ORD-123456 criado com sucesso!\n";
    echo "Order ID: " . $order_id . "\n";
    echo "Order Number: ORD-123456\n";
    
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo "Erro ao criar pedido: " . $e->getMessage() . "\n";
}
?>

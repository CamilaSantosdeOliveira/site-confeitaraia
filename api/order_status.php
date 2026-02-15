<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../backend/config/database.php';

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

try {
    $db = new Database();
    $pdo = $db->getConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $orderId = $_GET['order_id'] ?? '';
        
        if (empty($orderId)) {
            jsonResponse(['success' => false, 'error' => 'Order ID é obrigatório'], 400);
        }
        
        // Buscar status do pedido
        $stmt = $pdo->prepare("
            SELECT status, description, created_at 
            FROM order_status 
            WHERE order_id = ? 
            ORDER BY created_at ASC
        ");
        $stmt->execute([$orderId]);
        $statuses = $stmt->fetchAll();
        
        // Buscar dados do pedido pelo order_number
        $stmt = $pdo->prepare("
            SELECT * FROM orders 
            WHERE order_number = ? 
            ORDER BY created_at DESC 
            LIMIT 1
        ");
        $stmt->execute([$orderId]);
        $order = $stmt->fetch();
        
        if (!$order) {
            jsonResponse(['success' => false, 'error' => 'Pedido não encontrado'], 404);
        }
        
        // Mapear status para timeline
        $timeline = [];
        foreach ($statuses as $status) {
            $timeline[] = [
                'status' => $status['status'],
                'title' => ucfirst($status['status']),
                'description' => $status['description'],
                'time' => date('H:i', strtotime($status['created_at'])),
                'completed' => true
            ];
        }
        
        // Adicionar status pendentes se necessário
        $allStatuses = ['confirmado', 'preparando', 'pronto', 'entregue'];
        $existingStatuses = array_column($statuses, 'status');
        
        foreach ($allStatuses as $status) {
            if (!in_array($status, $existingStatuses)) {
                $timeline[] = [
                    'status' => $status,
                    'title' => ucfirst($status),
                    'description' => getStatusDescription($status),
                    'time' => '',
                    'completed' => false
                ];
            }
        }
        
        // Buscar itens reais do pedido
        $stmt = $pdo->prepare("
            SELECT oi.*, p.name as product_name 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        ");
        $stmt->execute([$order['id']]);
        $items = $stmt->fetchAll();
        
        // Converter itens para JSON
        $itemsJson = json_encode($items);
        
        // Adicionar dados padrão se estiverem vazios ou não existirem
        $order['customer_name'] = isset($order['customer_name']) ? $order['customer_name'] : 'Cliente';
        $order['customer_email'] = isset($order['customer_email']) ? $order['customer_email'] : 'cliente@exemplo.com';
        $order['customer_phone'] = isset($order['customer_phone']) ? $order['customer_phone'] : '(11) 99999-9999';
        $order['delivery_address'] = isset($order['delivery_address']) ? $order['delivery_address'] : 'Endereço não informado';
        $order['delivery_neighborhood'] = isset($order['delivery_neighborhood']) ? $order['delivery_neighborhood'] : 'Bairro';
        $order['delivery_city'] = isset($order['delivery_city']) ? $order['delivery_city'] : 'Cidade';
        $order['delivery_zip'] = isset($order['delivery_zip']) ? $order['delivery_zip'] : '00000-000';
        $order['items'] = $itemsJson;
        
        jsonResponse([
            'success' => true,
            'order' => $order,
            'timeline' => $timeline
        ]);
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = $input['order_id'] ?? '';
        $status = $input['status'] ?? '';
        $description = $input['description'] ?? '';
        
        if (empty($orderId) || empty($status)) {
            jsonResponse(['success' => false, 'error' => 'Order ID e status são obrigatórios'], 400);
        }
        
        // Inserir novo status
        $stmt = $pdo->prepare("
            INSERT INTO order_status (order_id, status, description) 
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$orderId, $status, $description]);
        
        jsonResponse(['success' => true, 'message' => 'Status atualizado com sucesso']);
    }
    
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}

function getStatusDescription($status) {
    $descriptions = [
        'confirmado' => 'Pedido confirmado e recebido',
        'preparando' => 'Pedido em preparação',
        'pronto' => 'Pedido pronto para entrega',
        'entregue' => 'Pedido entregue com sucesso'
    ];
    return $descriptions[$status] ?? 'Status atualizado';
}
?>

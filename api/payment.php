<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function validatePaymentData($data) {
    $required = ['order_id', 'items', 'customer', 'total'];
    
    foreach ($required as $field) {
        if (!isset($data[$field])) {
            return "Campo obrigatório: $field";
        }
    }
    
    if (!is_array($data['items']) || empty($data['items'])) {
        return "Items do pedido são obrigatórios";
    }
    
    if (!isset($data['customer']['name']) || !isset($data['customer']['email'])) {
        return "Dados do cliente são obrigatórios";
    }
    
    return null;
}

function createOrder($data) {
    global $pdo;
    
    try {
        $pdo->beginTransaction();
        
        // Inserir pedido
        $stmt = $pdo->prepare("
            INSERT INTO orders (id, customer_id, customer_name, customer_email, customer_phone, 
                              total_amount, shipping_cost, status, payment_method, 
                              shipping_address, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        
        $shippingAddress = json_encode($data['customer']['address']);
        
        $stmt->execute([
            $data['order_id'],
            $data['customer']['id'] ?? null,
            $data['customer']['name'],
            $data['customer']['email'],
            $data['customer']['phone'] ?? null,
            $data['total'],
            $data['shipping_cost'] ?? 0,
            'pending',
            $data['payment_method'] ?? 'mercadopago',
            $shippingAddress
        ]);
        
        // Inserir itens do pedido
        $stmt = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, product_name, quantity, price, total) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($data['items'] as $item) {
            $stmt->execute([
                $data['order_id'],
                $item['id'],
                $item['name'],
                $item['quantity'],
                $item['price'],
                $item['price'] * $item['quantity']
            ]);
        }
        
        $pdo->commit();
        return true;
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function updateOrderStatus($orderId, $status, $paymentId = null) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            UPDATE orders 
            SET status = ?, payment_id = ?, updated_at = NOW() 
            WHERE id = ?
        ");
        
        $stmt->execute([$status, $paymentId, $orderId]);
        return true;
        
    } catch (Exception $e) {
        throw $e;
    }
}

function sendOrderConfirmationEmail($orderData) {
    // Simulação de envio de email
    // Em produção, usar PHPMailer ou similar
    
    $to = $orderData['customer']['email'];
    $subject = "Confirmação de Pedido - Doçuras & Sabores";
    
    $message = "
    <h2>Pedido Confirmado!</h2>
    <p>Olá " . $orderData['customer']['name'] . ",</p>
    <p>Seu pedido foi confirmado com sucesso!</p>
    
    <h3>Detalhes do Pedido:</h3>
    <p><strong>ID do Pedido:</strong> " . $orderData['order_id'] . "</p>
    <p><strong>Total:</strong> R$ " . number_format($orderData['total'], 2, ',', '.') . "</p>
    
    <h3>Itens:</h3>
    <ul>";
    
    foreach ($orderData['items'] as $item) {
        $message .= "<li>" . $item['name'] . " x" . $item['quantity'] . " - R$ " . number_format($item['price'], 2, ',', '.') . "</li>";
    }
    
    $message .= "
    </ul>
    
    <p>Obrigado por escolher a Doçuras & Sabores!</p>
    <p>Em breve entraremos em contato para confirmar a entrega.</p>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: contato@docurasesabores.com" . "\r\n";
    
    // Em produção, usar mail() ou PHPMailer
    error_log("Email enviado para: $to - Assunto: $subject");
    
    return true;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validar dados
            $validation = validatePaymentData($data);
            if ($validation) {
                jsonResponse(['error' => $validation], 400);
            }
            
            // Criar pedido no banco
            createOrder($data);
            
            // Enviar email de confirmação
            sendOrderConfirmationEmail($data);
            
            jsonResponse([
                'success' => true,
                'message' => 'Pedido criado com sucesso',
                'order_id' => $data['order_id']
            ]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['order_id']) || !isset($data['status'])) {
                jsonResponse(['error' => 'order_id e status são obrigatórios'], 400);
            }
            
            updateOrderStatus($data['order_id'], $data['status'], $data['payment_id'] ?? null);
            
            jsonResponse([
                'success' => true,
                'message' => 'Status do pedido atualizado'
            ]);
            break;
            
        case 'GET':
            $orderId = $_GET['order_id'] ?? null;
            
            if (!$orderId) {
                jsonResponse(['error' => 'order_id é obrigatório'], 400);
            }
            
            $stmt = $pdo->prepare("
                SELECT o.*, oi.product_id, oi.product_name, oi.quantity, oi.price, oi.total
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE o.id = ?
            ");
            
            $stmt->execute([$orderId]);
            $order = $stmt->fetchAll();
            
            if (empty($order)) {
                jsonResponse(['error' => 'Pedido não encontrado'], 404);
            }
            
            // Organizar dados
            $orderData = [
                'id' => $order[0]['id'],
                'customer_name' => $order[0]['customer_name'],
                'customer_email' => $order[0]['customer_email'],
                'total_amount' => $order[0]['total_amount'],
                'status' => $order[0]['status'],
                'created_at' => $order[0]['created_at'],
                'items' => []
            ];
            
            foreach ($order as $item) {
                if ($item['product_id']) {
                    $orderData['items'][] = [
                        'product_id' => $item['product_id'],
                        'name' => $item['product_name'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                        'total' => $item['total']
                    ];
                }
            }
            
            jsonResponse($orderData);
            break;
            
        default:
            jsonResponse(['error' => 'Método não permitido'], 405);
            break;
    }
    
} catch (Exception $e) {
    error_log("Erro na API de pagamento: " . $e->getMessage());
    jsonResponse(['error' => 'Erro interno do servidor'], 500);
}
?>











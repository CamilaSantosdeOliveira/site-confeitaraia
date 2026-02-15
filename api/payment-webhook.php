<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config/database.php';

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
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

function sendStatusUpdateEmail($orderId, $status) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT customer_name, customer_email, total_amount 
            FROM orders 
            WHERE id = ?
        ");
        
        $stmt->execute([$orderId]);
        $order = $stmt->fetch();
        
        if (!$order) {
            return false;
        }
        
        $statusMessages = [
            'approved' => 'aprovado',
            'pending' => 'pendente',
            'rejected' => 'rejeitado',
            'cancelled' => 'cancelado',
            'refunded' => 'reembolsado'
        ];
        
        $statusText = $statusMessages[$status] ?? $status;
        
        $to = $order['customer_email'];
        $subject = "Atualização do Pedido - Doçuras & Sabores";
        
        $message = "
        <h2>Atualização do Pedido</h2>
        <p>Olá " . $order['customer_name'] . ",</p>
        <p>Seu pedido #" . $orderId . " foi <strong>" . $statusText . "</strong>!</p>
        
        <p><strong>Valor Total:</strong> R$ " . number_format($order['total_amount'], 2, ',', '.') . "</p>
        
        <p>Obrigado por escolher a Doçuras & Sabores!</p>
        ";
        
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: contato@docurasesabores.com" . "\r\n";
        
        // Em produção, usar mail() ou PHPMailer
        error_log("Email de status enviado para: $to - Status: $status");
        
        return true;
        
    } catch (Exception $e) {
        error_log("Erro ao enviar email de status: " . $e->getMessage());
        return false;
    }
}

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Método não permitido'], 405);
}

// Obter dados do webhook
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    jsonResponse(['error' => 'Dados inválidos'], 400);
}

// Verificar se é notificação do Mercado Pago
if (isset($data['type']) && $data['type'] === 'payment') {
    $paymentId = $data['data']['id'] ?? null;
    
    if (!$paymentId) {
        jsonResponse(['error' => 'ID do pagamento não encontrado'], 400);
    }
    
    // Aqui você faria uma requisição para o Mercado Pago para obter os detalhes do pagamento
    // Por simplicidade, vamos simular o status
    
    $status = 'approved'; // Em produção, obter do Mercado Pago
    $externalReference = $data['data']['external_reference'] ?? null;
    
    if ($externalReference) {
        try {
            updateOrderStatus($externalReference, $status, $paymentId);
            sendStatusUpdateEmail($externalReference, $status);
            
            jsonResponse(['success' => true, 'message' => 'Status atualizado']);
            
        } catch (Exception $e) {
            error_log("Erro ao atualizar status: " . $e->getMessage());
            jsonResponse(['error' => 'Erro ao atualizar status'], 500);
        }
    } else {
        jsonResponse(['error' => 'Referência externa não encontrada'], 400);
    }
} else {
    jsonResponse(['error' => 'Tipo de notificação não suportado'], 400);
}
?>











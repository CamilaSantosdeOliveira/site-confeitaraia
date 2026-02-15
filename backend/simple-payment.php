<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simular processamento de pagamento sem banco de dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        exit();
    }
    
    // Simular resposta do Mercado Pago
    $response = [
        'id' => 'test_' . time(),
        'status' => 'pending',
        'init_point' => 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=test_' . time(),
        'sandbox_init_point' => 'https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=test_' . time(),
        'external_reference' => $input['orderId'] ?? 'test_order',
        'items' => $input['items'] ?? [],
        'total' => $input['total'] ?? 0
    ];
    
    http_response_code(200);
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>











<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../backend/config.php';

$pdo = getConnection();

// Lidar com preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Autenticação JWT
$headers = getallheaders();
$token = '';

// Tentar diferentes formas de obter o token
if (isset($headers['Authorization'])) {
    $token = $headers['Authorization'];
} elseif (isset($headers['authorization'])) {
    $token = $headers['authorization'];
} elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $token = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (isset($_GET['token'])) {
    $token = $_GET['token'];
}

$token = str_replace('Bearer ', '', $token);

// TEMPORÁRIO: Usar usuário ID 2 para todos os pedidos (sem autenticação)
$user_id = 2;

$order_id = $_GET['id'] ?? null;

if (!$order_id) {
    jsonResponse(['error' => 'ID do pedido é obrigatório'], 400);
    return;
}

try {
    // Buscar detalhes do pedido
    $stmt = $pdo->prepare("
        SELECT 
            o.*,
            u.name as user_name,
            u.email as user_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        WHERE o.id = ? AND o.user_id = ?
    ");
    
    $stmt->execute([$order_id, $user_id]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$order) {
        jsonResponse(['error' => 'Pedido não encontrado'], 404);
        return;
    }
    
    // Buscar itens do pedido
    $stmt = $pdo->prepare("
        SELECT 
            oi.*,
            p.name as product_name,
            p.image as product_image
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
    ");
    
    $stmt->execute([$order_id]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Buscar histórico de status
    $stmt = $pdo->prepare("
        SELECT * FROM order_status_history 
        WHERE order_id = ? 
        ORDER BY created_at ASC
    ");
    
    $stmt->execute([$order_id]);
    $status_history = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    jsonResponse([
        'order' => $order,
        'items' => $items,
        'status_history' => $status_history
    ]);
    
} catch (PDOException $e) {
    jsonResponse(['error' => 'Erro ao buscar detalhes do pedido: ' . $e->getMessage()], 500);
}
?>

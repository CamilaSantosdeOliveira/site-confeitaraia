<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Se não houver pedidos, retornar dados mockados
    if (empty($orders)) {
        $orders = [
            [
                'id' => 1,
                'customer_name' => 'Maria Silva',
                'total' => 95.00,
                'status' => 'pending',
                'date' => '2024-01-15',
                'created_at' => '2024-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'customer_name' => 'João Santos',
                'total' => 125.50,
                'status' => 'confirmed',
                'date' => '2024-01-14',
                'created_at' => '2024-01-14 14:20:00'
            ],
            [
                'id' => 3,
                'customer_name' => 'Ana Costa',
                'total' => 78.00,
                'status' => 'delivered',
                'date' => '2024-01-13',
                'created_at' => '2024-01-13 09:15:00'
            ]
        ];
    }
    
    echo json_encode($orders);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro de conexão com banco: ' . $e->getMessage()]);
}
?>













<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM customers ORDER BY created_at DESC");
    $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Se não houver clientes, retornar dados mockados
    if (empty($customers)) {
        $customers = [
            [
                'id' => 1,
                'name' => 'Maria Silva',
                'email' => 'maria@email.com',
                'phone' => '(11) 99999-1111',
                'address' => 'Rua A, 123',
                'created_at' => '2024-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'name' => 'João Santos',
                'email' => 'joao@email.com',
                'phone' => '(11) 99999-2222',
                'address' => 'Rua B, 456',
                'created_at' => '2024-01-14 14:20:00'
            ],
            [
                'id' => 3,
                'name' => 'Ana Costa',
                'email' => 'ana@email.com',
                'phone' => '(11) 99999-3333',
                'address' => 'Rua C, 789',
                'created_at' => '2024-01-13 09:15:00'
            ]
        ];
    }
    
    echo json_encode($customers);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro de conexão com banco: ' . $e->getMessage()]);
}
?>













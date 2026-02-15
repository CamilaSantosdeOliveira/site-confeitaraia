<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$orders = [
    ['id' => 1, 'customer' => 'Maria Silva', 'total' => 95.00, 'status' => 'pending', 'date' => '2024-01-15'],
    ['id' => 2, 'customer' => 'João Santos', 'total' => 125.50, 'status' => 'confirmed', 'date' => '2024-01-14'],
    ['id' => 3, 'customer' => 'Ana Costa', 'total' => 78.00, 'status' => 'delivered', 'date' => '2024-01-13']
];

echo json_encode($orders);
?>

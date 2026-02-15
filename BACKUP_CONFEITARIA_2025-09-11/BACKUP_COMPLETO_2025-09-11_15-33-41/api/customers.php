<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$customers = [
    ['id' => 1, 'name' => 'Maria Silva', 'email' => 'maria@email.com', 'phone' => '(11) 99999-1111'],
    ['id' => 2, 'name' => 'João Santos', 'email' => 'joao@email.com', 'phone' => '(11) 99999-2222'],
    ['id' => 3, 'name' => 'Ana Costa', 'email' => 'ana@email.com', 'phone' => '(11) 99999-3333']
];

echo json_encode($customers);
?>

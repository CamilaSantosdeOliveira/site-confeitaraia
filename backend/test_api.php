<?php
// Testar a API diretamente
$url = 'http://localhost:8000/api/order_status.php?order_id=ORD-2025-7902';
$response = file_get_contents($url);
echo "=== RESPOSTA DA API ===\n";
echo $response;
echo "\n=== FIM ===\n";
?>











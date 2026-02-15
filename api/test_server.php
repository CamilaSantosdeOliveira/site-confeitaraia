<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => 'Servidor PHP funcionando!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion()
], JSON_UNESCAPED_UNICODE);
?>











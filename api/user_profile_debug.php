<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(E_ALL);
ini_set('display_errors', 0);

$response = ['step' => 'start'];

try {
    $response['step'] = 'before_config';
    require_once '../backend/config.php';
    $response['step'] = 'config_loaded';
    
    $pdo = getConnection();
    $response['step'] = 'db_connected';
    
    $method = $_SERVER['REQUEST_METHOD'];
    $response['method'] = $method;
    
    // Pegar dados do input
    $data = json_decode(file_get_contents('php://input'), true);
    $response['received_data'] = $data;
    
    // Verificar tabelas
    $tables = $pdo->query("SHOW TABLES");
    $response['tables'] = $tables->fetchAll(PDO::FETCH_COLUMN);
    
    http_response_code(200);
    echo json_encode($response);
    
} catch (Throwable $e) {
    $response['step'] = 'error';
    $response['error'] = $e->getMessage();
    $response['file'] = $e->getFile();
    $response['line'] = $e->getLine();
    http_response_code(500);
    echo json_encode($response);
}
?>

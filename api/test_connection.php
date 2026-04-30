<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', 1);

$result = [
    'php_working' => true,
    'config_exists' => file_exists('../backend/config.php'),
    'errors' => []
];

try {
    require_once '../backend/config.php';
    $result['config_loaded'] = true;
    
    try {
        $pdo = getConnection();
        $result['db_connected'] = true;
        
        // Testar se tabela users existe
        $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
        $result['users_table_exists'] = (bool)$stmt->fetch();
        
        // Testar se tabela user_profiles existe
        $stmt = $pdo->query("SHOW TABLES LIKE 'user_profiles'");
        $result['user_profiles_table_exists'] = (bool)$stmt->fetch();
        
    } catch (Exception $e) {
        $result['db_connected'] = false;
        $result['db_error'] = $e->getMessage();
    }
    
} catch (Exception $e) {
    $result['config_loaded'] = false;
    $result['config_error'] = $e->getMessage();
}

echo json_encode($result, JSON_PRETTY_PRINT);
?>

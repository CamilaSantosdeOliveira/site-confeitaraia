<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("ALTER TABLE orders DROP COLUMN IF EXISTS user_id");
    $pdo->exec("ALTER TABLE orders ADD COLUMN user_id BIGINT DEFAULT NULL AFTER id");

    echo json_encode(['success' => true, 'message' => 'Coluna user_id recriada como BIGINT'], JSON_UNESCAPED_UNICODE);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>

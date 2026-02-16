<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SHOW COLUMNS FROM orders LIKE 'user_id'");

    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE orders ADD COLUMN user_id BIGINT DEFAULT NULL AFTER id");
        echo json_encode(['success' => true, 'message' => 'Coluna user_id adicionada'], JSON_UNESCAPED_UNICODE);
    } else {
        $pdo->exec("ALTER TABLE orders MODIFY COLUMN user_id BIGINT DEFAULT NULL");
        echo json_encode(['success' => true, 'message' => 'Coluna user_id atualizada para BIGINT'], JSON_UNESCAPED_UNICODE);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>

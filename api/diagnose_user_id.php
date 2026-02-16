<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $result = [];

    $stmt = $pdo->query("SHOW COLUMNS FROM orders");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result['all_columns'] = $columns;

    $userIdColumn = null;
    foreach ($columns as $col) {
        if ($col['Field'] === 'user_id') {
            $userIdColumn = $col;
            break;
        }
    }

    $result['user_id_column'] = $userIdColumn;

    if ($userIdColumn) {
        $pdo->exec("ALTER TABLE orders MODIFY COLUMN user_id BIGINT UNSIGNED DEFAULT NULL");
        $result['action'] = 'BIGINT UNSIGNED aplicado';
    } else {
        $pdo->exec("ALTER TABLE orders ADD COLUMN user_id BIGINT UNSIGNED DEFAULT NULL AFTER id");
        $result['action'] = 'Coluna criada como BIGINT UNSIGNED';
    }

    $stmt = $pdo->query("SHOW COLUMNS FROM orders WHERE Field = 'user_id'");
    $result['new_user_id_column'] = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
?>

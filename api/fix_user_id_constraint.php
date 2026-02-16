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

    // Step 1: Get current foreign keys on orders table
    $stmt = $pdo->query("
        SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
        FROM information_schema.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = '$dbname'
        AND TABLE_NAME = 'orders'
        AND REFERENCED_TABLE_NAME IS NOT NULL
    ");
    $foreignKeys = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['foreign_keys_found'] = $foreignKeys;

    // Step 2: Drop foreign key constraint on user_id if it exists
    foreach ($foreignKeys as $fk) {
        if ($fk['COLUMN_NAME'] === 'user_id') {
            $pdo->exec("ALTER TABLE orders DROP FOREIGN KEY " . $fk['CONSTRAINT_NAME']);
            $result['dropped_constraint'] = $fk['CONSTRAINT_NAME'];
        }
    }

    // Step 3: Check current user_id column
    $stmt = $pdo->query("SHOW COLUMNS FROM orders WHERE Field = 'user_id'");
    $currentColumn = $stmt->fetch(PDO::FETCH_ASSOC);
    $result['old_column'] = $currentColumn;

    // Step 4: Modify column to BIGINT UNSIGNED
    if ($currentColumn) {
        $pdo->exec("ALTER TABLE orders MODIFY COLUMN user_id BIGINT UNSIGNED DEFAULT NULL");
        $result['action'] = 'Column modified to BIGINT UNSIGNED';
    } else {
        $pdo->exec("ALTER TABLE orders ADD COLUMN user_id BIGINT UNSIGNED DEFAULT NULL AFTER id");
        $result['action'] = 'Column created as BIGINT UNSIGNED';
    }

    // Step 5: Verify the change
    $stmt = $pdo->query("SHOW COLUMNS FROM orders WHERE Field = 'user_id'");
    $result['new_column'] = $stmt->fetch(PDO::FETCH_ASSOC);

    $result['success'] = true;
    $result['message'] = 'user_id column successfully updated to BIGINT UNSIGNED';

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>

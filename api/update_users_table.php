<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'phone'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT '' AFTER email");
        echo "Coluna 'phone' adicionada com sucesso!\n";
    } else {
        echo "Coluna 'phone' já existe.\n";
    }

    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'address'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE users ADD COLUMN address TEXT AFTER phone");
        echo "Coluna 'address' adicionada com sucesso!\n";
    } else {
        echo "Coluna 'address' já existe.\n";
    }

    echo json_encode([
        'success' => true,
        'message' => 'Tabela users atualizada com sucesso!'
    ], JSON_UNESCAPED_UNICODE);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

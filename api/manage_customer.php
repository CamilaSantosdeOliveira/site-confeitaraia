<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            throw new Exception('Dados inválidos recebidos');
        }

        if (empty($input['name']) || empty($input['email'])) {
            throw new Exception('Nome e email são obrigatórios');
        }

        $stmt = $pdo->prepare("
            INSERT INTO users (name, email, phone, address, password, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");

        $defaultPassword = password_hash('123456', PASSWORD_DEFAULT);

        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['phone'] ?? '',
            $input['address'] ?? '',
            $defaultPassword
        ]);

        $customerId = $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'message' => 'Cliente criado com sucesso!',
            'customer_id' => $customerId,
            'customer' => [
                'id' => $customerId,
                'name' => $input['name'],
                'email' => $input['email'],
                'phone' => $input['phone'] ?? '',
                'address' => $input['address'] ?? '',
                'created_at' => date('Y-m-d H:i:s')
            ]
        ], JSON_UNESCAPED_UNICODE);

    } elseif ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            throw new Exception('Dados inválidos recebidos');
        }

        if (empty($input['id']) || empty($input['name']) || empty($input['email'])) {
            throw new Exception('ID, nome e email são obrigatórios');
        }

        $stmt = $pdo->prepare("
            UPDATE users
            SET name = ?, email = ?, phone = ?, address = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['phone'] ?? '',
            $input['address'] ?? '',
            $input['id']
        ]);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Cliente atualizado com sucesso!',
                'customer_id' => $input['id']
            ], JSON_UNESCAPED_UNICODE);
        } else {
            throw new Exception('Cliente não encontrado ou não foi alterado');
        }

    } else {
        http_response_code(405);
        echo json_encode([
            'error' => true,
            'message' => 'Método não permitido. Use POST ou PUT.'
        ], JSON_UNESCAPED_UNICODE);
    }

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

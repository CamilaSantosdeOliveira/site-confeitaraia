<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../backend/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Método não permitido'], 405);
    return;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    jsonResponse(['error' => 'Nome, email e senha são obrigatórios'], 400);
    return;
}

try {
    $pdo = getConnection();

    // Verificar se email já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    if ($stmt->fetch()) {
        jsonResponse(['success' => false, 'message' => 'Este email já está em uso!'], 409);
        return;
    }

    // Criar tabela users se não existir
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");

    // Hash da senha
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    // Inserir novo usuário
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'user')");
    $stmt->execute([
        $data['name'],
        $data['email'],
        $hashedPassword,
        $data['phone'] ?? null
    ]);

    $userId = $pdo->lastInsertId();

    // Buscar usuário criado
    $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Gerar token JWT
    $token = generateToken($user['id'], $user['email']);

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => $user,
        'message' => 'Conta criada com sucesso!'
    ], 201);

} catch (Exception $e) {
    jsonResponse(['error' => 'Erro ao criar conta: ' . $e->getMessage()], 500);
}
?>

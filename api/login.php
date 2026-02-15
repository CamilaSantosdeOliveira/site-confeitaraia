<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../backend/config.php';

// Lidar com preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Método não permitido'], 405);
    return;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    jsonResponse(['error' => 'Email e senha são obrigatórios'], 400);
    return;
}

try {
    $pdo = getConnection();
    
    // Buscar usuário
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        jsonResponse(['success' => false, 'message' => 'Email ou senha incorretos'], 401);
        return;
    }
    
    // Verificar senha (hash simples para demo)
    if (password_verify($data['password'], $user['password']) || $data['password'] === $user['password']) {
        // Gerar token JWT
        $token = generateToken($user['id'], $user['email']);
        
        jsonResponse([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    } else {
        jsonResponse(['success' => false, 'message' => 'Email ou senha incorretos'], 401);
    }
    
} catch (Exception $e) {
    jsonResponse(['error' => 'Erro interno do servidor'], 500);
}
?>

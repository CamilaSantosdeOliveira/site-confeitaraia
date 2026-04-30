<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];

// Pegar user_id do body
$data = json_decode(file_get_contents('php://input'), true) ?? [];
$user_id = $data['user_id'] ?? $_GET['user_id'] ?? null;

if (!$user_id) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autenticado - user_id não fornecido']);
    exit;
}

// Verificar config e conexão
try {
    require_once '../backend/config.php';
    $pdo = getConnection();
    $db_ok = true;
} catch (Throwable $e) {
    $db_ok = false;
    $db_error = $e->getMessage();
}

if ($method === 'GET') {
    // Retornar dados mockados se não conseguir conectar ao banco
    if (!$db_ok) {
        echo json_encode([
            'user' => ['id' => $user_id, 'name' => 'Usuário', 'email' => 'user@email.com', 'created_at' => date('Y-m-d')],
            'profile' => null,
            'addresses' => [],
            'favorites' => [],
            'notifications' => []
        ]);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, name, email, created_at FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            exit;
        }
        
        echo json_encode([
            'user' => $user,
            'profile' => null,
            'addresses' => [],
            'favorites' => [],
            'notifications' => []
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro no banco: ' . $e->getMessage()]);
    }
}

if ($method === 'PUT') {
    // Atualizar perfil - versão simplificada
    if (!$db_ok) {
        http_response_code(500);
        echo json_encode(['error' => 'Sem conexão com banco: ' . ($db_error ?? 'desconhecido')]);
        exit;
    }
    
    try {
        // Atualizar apenas nome e email na tabela users
        if (isset($data['name']) || isset($data['email'])) {
            $fields = [];
            $params = [];
            
            if (isset($data['name'])) {
                $fields[] = "name = ?";
                $params[] = $data['name'];
            }
            if (isset($data['email'])) {
                $fields[] = "email = ?";
                $params[] = $data['email'];
            }
            $params[] = $user_id;
            
            $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        echo json_encode(['message' => 'Perfil atualizado com sucesso']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao atualizar: ' . $e->getMessage()]);
    }
}
?>

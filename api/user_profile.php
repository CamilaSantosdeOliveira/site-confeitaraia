<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../backend/config.php';

$pdo = getConnection();

// Lidar com preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function getBearerToken() {
    $authHeader = '';

    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }

    if (empty($authHeader) && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }

    if (empty($authHeader)) {
        return null;
    }

    $token = str_replace('Bearer ', '', $authHeader);
    $token = trim($token);
    return $token ?: null;
}

$method = $_SERVER['REQUEST_METHOD'];
$user_id = null;

// 1) Tentar via JWT
$token = getBearerToken();
if ($token) {
    try {
        $decoded = validateToken($token);
        $user_id = $decoded['user_id'] ?? null;
    } catch (Exception $e) {
        // continua para fallback por user_id
    }
}

// 2) Fallback: aceitar user_id via body/query (útil quando Authorization não chega ao PHP)
if (!$user_id) {
    if ($method === 'POST' || $method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $user_id = $data['user_id'] ?? null;
    }
}

if (!$user_id) {
    $user_id = $_GET['user_id'] ?? null;
}

if (!$user_id) {
    jsonResponse(['error' => 'Não autenticado'], 401);
    return;
}

switch ($method) {
    case 'GET':
        // Buscar perfil completo do usuário
        try {
            // Buscar dados básicos do usuário
            $stmt = $pdo->prepare("SELECT id, name, email, created_at FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$user) {
                jsonResponse(['error' => 'Usuário não encontrado'], 404);
                return;
            }
            
            // Buscar perfil adicional
            $stmt = $pdo->prepare("SELECT phone, birth_date, gender FROM user_profiles WHERE user_id = ?");
            $stmt->execute([$user_id]);
            $profile = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Buscar endereços
            $stmt = $pdo->prepare("SELECT * FROM user_addresses WHERE user_id = ? ORDER BY is_primary DESC, created_at ASC");
            $stmt->execute([$user_id]);
            $addresses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Buscar favoritos
            $stmt = $pdo->prepare("
                SELECT p.*, w.created_at as favorited_at 
                FROM wishlist w 
                JOIN products p ON w.product_id = p.id 
                WHERE w.user_id = ? 
                ORDER BY w.created_at DESC
            ");
            $stmt->execute([$user_id]);
            $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Buscar notificações
            $stmt = $pdo->prepare("
                SELECT * FROM notifications 
                WHERE user_id = ? 
                ORDER BY created_at DESC 
                LIMIT 10
            ");
            $stmt->execute([$user_id]);
            $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            jsonResponse([
                'user' => $user,
                'profile' => $profile,
                'addresses' => $addresses,
                'favorites' => $favorites,
                'notifications' => $notifications
            ]);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao buscar perfil: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        // Atualizar perfil do usuário
        $data = json_decode(file_get_contents('php://input'), true);
        
        try {
            $pdo->beginTransaction();
            
            // Atualizar dados básicos do usuário
            if (isset($data['name']) || isset($data['email'])) {
                $updateFields = [];
                $params = [];
                
                if (isset($data['name'])) {
                    $updateFields[] = "name = ?";
                    $params[] = $data['name'];
                }
                
                if (isset($data['email'])) {
                    $updateFields[] = "email = ?";
                    $params[] = $data['email'];
                }
                
                $params[] = $user_id;
                
                $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
            }
            
            // Atualizar ou inserir perfil adicional
            if (isset($data['phone']) || isset($data['birth_date']) || isset($data['gender'])) {
                $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
                $stmt->execute([$user_id]);
                $profileExists = $stmt->fetch();
                
                if ($profileExists) {
                    // Atualizar perfil existente
                    $updateFields = [];
                    $params = [];
                    
                    if (isset($data['phone'])) {
                        $updateFields[] = "phone = ?";
                        $params[] = $data['phone'];
                    }
                    
                    if (isset($data['birth_date'])) {
                        $updateFields[] = "birth_date = ?";
                        $params[] = $data['birth_date'];
                    }
                    
                    if (isset($data['gender'])) {
                        $updateFields[] = "gender = ?";
                        $params[] = $data['gender'];
                    }
                    
                    $params[] = $user_id;
                    
                    $sql = "UPDATE user_profiles SET " . implode(', ', $updateFields) . " WHERE user_id = ?";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                } else {
                    // Inserir novo perfil
                    $stmt = $pdo->prepare("
                        INSERT INTO user_profiles (user_id, phone, birth_date, gender) 
                        VALUES (?, ?, ?, ?)
                    ");
                    $stmt->execute([
                        $user_id,
                        $data['phone'] ?? null,
                        $data['birth_date'] ?? null,
                        $data['gender'] ?? 'O'
                    ]);
                }
            }
            
            $pdo->commit();
            jsonResponse(['message' => 'Perfil atualizado com sucesso']);
            
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse(['error' => 'Erro ao atualizar perfil: ' . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Método não permitido'], 405);
        break;
}
?>

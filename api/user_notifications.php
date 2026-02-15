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

// Autenticação JWT
$headers = getallheaders();
$token = $headers['Authorization'] ?? '';
$token = str_replace('Bearer ', '', $token);

$user_id = null;
if ($token) {
    try {
        $decoded = validateToken($token);
        $user_id = $decoded['user_id'];
    } catch (Exception $e) {
        jsonResponse(['error' => 'Token inválido'], 401);
        return;
    }
} else {
    jsonResponse(['error' => 'Token de autorização necessário'], 401);
    return;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Listar notificações do usuário
        try {
            $limit = $_GET['limit'] ?? 10;
            $offset = $_GET['offset'] ?? 0;
            
            $stmt = $pdo->prepare("
                SELECT * FROM notifications 
                WHERE user_id = ? 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?
            ");
            $stmt->execute([$user_id, (int)$limit, (int)$offset]);
            $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Contar total de notificações não lidas
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM notifications WHERE user_id = ? AND is_read = FALSE");
            $stmt->execute([$user_id]);
            $unread_count = $stmt->fetchColumn();
            
            jsonResponse([
                'notifications' => $notifications,
                'unread_count' => $unread_count
            ]);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao buscar notificações: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'POST':
        // Criar nova notificação (para admin ou sistema)
        $data = json_decode(file_get_contents('php://input'), true);
        
        $required = ['title', 'message'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                jsonResponse(['error' => "Campo obrigatório: $field"], 400);
                return;
            }
        }
        
        try {
            $stmt = $pdo->prepare("
                INSERT INTO notifications (user_id, title, message, type) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([
                $user_id,
                $data['title'],
                $data['message'],
                $data['type'] ?? 'info'
            ]);
            
            jsonResponse(['message' => 'Notificação criada com sucesso', 'id' => $pdo->lastInsertId()], 201);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao criar notificação: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        // Marcar notificação como lida
        $data = json_decode(file_get_contents('php://input'), true);
        $notification_id = $data['id'] ?? null;
        
        if (!$notification_id) {
            jsonResponse(['error' => 'ID da notificação é obrigatório'], 400);
            return;
        }
        
        try {
            $stmt = $pdo->prepare("
                UPDATE notifications 
                SET is_read = TRUE 
                WHERE id = ? AND user_id = ?
            ");
            $stmt->execute([$notification_id, $user_id]);
            
            if ($stmt->rowCount() > 0) {
                jsonResponse(['message' => 'Notificação marcada como lida']);
            } else {
                jsonResponse(['error' => 'Notificação não encontrada'], 404);
            }
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao atualizar notificação: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        // Remover notificação
        $notification_id = $_GET['id'] ?? null;
        
        if (!$notification_id) {
            jsonResponse(['error' => 'ID da notificação é obrigatório'], 400);
            return;
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?");
            $stmt->execute([$notification_id, $user_id]);
            
            if ($stmt->rowCount() > 0) {
                jsonResponse(['message' => 'Notificação removida com sucesso']);
            } else {
                jsonResponse(['error' => 'Notificação não encontrada'], 404);
            }
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao remover notificação: ' . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Método não permitido'], 405);
        break;
}
?>

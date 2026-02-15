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
        // Listar endereços do usuário
        try {
            $stmt = $pdo->prepare("
                SELECT * FROM user_addresses 
                WHERE user_id = ? 
                ORDER BY is_primary DESC, created_at ASC
            ");
            $stmt->execute([$user_id]);
            $addresses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            jsonResponse($addresses);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao buscar endereços: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'POST':
        // Adicionar novo endereço
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validação
        $required = ['street', 'neighborhood', 'city', 'state', 'zip_code'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                jsonResponse(['error' => "Campo obrigatório: $field"], 400);
                return;
            }
        }
        
        try {
            $pdo->beginTransaction();
            
            // Se este endereço for marcado como principal, remover principal dos outros
            if (isset($data['is_primary']) && $data['is_primary']) {
                $stmt = $pdo->prepare("UPDATE user_addresses SET is_primary = FALSE WHERE user_id = ?");
                $stmt->execute([$user_id]);
            }
            
            // Inserir novo endereço
            $stmt = $pdo->prepare("
                INSERT INTO user_addresses 
                (user_id, street, neighborhood, city, state, zip_code, number, complement, is_primary) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $user_id,
                $data['street'],
                $data['neighborhood'],
                $data['city'],
                $data['state'],
                $data['zip_code'],
                $data['number'] ?? null,
                $data['complement'] ?? null,
                $data['is_primary'] ?? false
            ]);
            
            $address_id = $pdo->lastInsertId();
            
            $pdo->commit();
            jsonResponse(['message' => 'Endereço adicionado com sucesso', 'id' => $address_id], 201);
            
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse(['error' => 'Erro ao adicionar endereço: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        // Atualizar endereço existente
        $data = json_decode(file_get_contents('php://input'), true);
        $address_id = $data['id'] ?? null;
        
        if (!$address_id) {
            jsonResponse(['error' => 'ID do endereço é obrigatório'], 400);
            return;
        }
        
        try {
            $pdo->beginTransaction();
            
            // Verificar se o endereço pertence ao usuário
            $stmt = $pdo->prepare("SELECT id FROM user_addresses WHERE id = ? AND user_id = ?");
            $stmt->execute([$address_id, $user_id]);
            if (!$stmt->fetch()) {
                jsonResponse(['error' => 'Endereço não encontrado'], 404);
                return;
            }
            
            // Se este endereço for marcado como principal, remover principal dos outros
            if (isset($data['is_primary']) && $data['is_primary']) {
                $stmt = $pdo->prepare("UPDATE user_addresses SET is_primary = FALSE WHERE user_id = ? AND id != ?");
                $stmt->execute([$user_id, $address_id]);
            }
            
            // Atualizar endereço
            $updateFields = [];
            $params = [];
            
            $fields = ['street', 'neighborhood', 'city', 'state', 'zip_code', 'number', 'complement', 'is_primary'];
            foreach ($fields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "$field = ?";
                    $params[] = $data[$field];
                }
            }
            
            if (empty($updateFields)) {
                jsonResponse(['error' => 'Nenhum campo para atualizar'], 400);
                return;
            }
            
            $params[] = $address_id;
            
            $sql = "UPDATE user_addresses SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            $pdo->commit();
            jsonResponse(['message' => 'Endereço atualizado com sucesso']);
            
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse(['error' => 'Erro ao atualizar endereço: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        // Remover endereço
        $address_id = $_GET['id'] ?? null;
        
        if (!$address_id) {
            jsonResponse(['error' => 'ID do endereço é obrigatório'], 400);
            return;
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM user_addresses WHERE id = ? AND user_id = ?");
            $stmt->execute([$address_id, $user_id]);
            
            if ($stmt->rowCount() > 0) {
                jsonResponse(['message' => 'Endereço removido com sucesso']);
            } else {
                jsonResponse(['error' => 'Endereço não encontrado'], 404);
            }
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao remover endereço: ' . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Método não permitido'], 405);
        break;
}
?>

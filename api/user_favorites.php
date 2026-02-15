<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Erro de conexão: ' . $e->getMessage()]);
    exit;
}

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
        // Listar favoritos do usuário
        try {
            $stmt = $pdo->prepare("
                SELECT p.*, w.created_at as favorited_at 
                FROM wishlist w 
                JOIN products p ON w.product_id = p.id 
                WHERE w.user_id = ? 
                ORDER BY w.created_at DESC
            ");
            $stmt->execute([$user_id]);
            $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            jsonResponse($favorites);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao buscar favoritos: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'POST':
        // Adicionar produto aos favoritos
        $data = json_decode(file_get_contents('php://input'), true);
        $product_id = $data['product_id'] ?? null;
        
        if (!$product_id) {
            jsonResponse(['error' => 'ID do produto é obrigatório'], 400);
            return;
        }
        
        try {
            // Verificar se o produto existe
            $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
            $stmt->execute([$product_id]);
            if (!$stmt->fetch()) {
                jsonResponse(['error' => 'Produto não encontrado'], 404);
                return;
            }
            
            // Verificar se já está nos favoritos
            $stmt = $pdo->prepare("SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?");
            $stmt->execute([$user_id, $product_id]);
            if ($stmt->fetch()) {
                jsonResponse(['error' => 'Produto já está nos favoritos'], 409);
                return;
            }
            
            // Adicionar aos favoritos
            $stmt = $pdo->prepare("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)");
            $stmt->execute([$user_id, $product_id]);
            
            jsonResponse(['message' => 'Produto adicionado aos favoritos', 'id' => $pdo->lastInsertId()], 201);
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao adicionar favorito: ' . $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        // Remover produto dos favoritos
        $product_id = $_GET['product_id'] ?? null;
        
        if (!$product_id) {
            jsonResponse(['error' => 'ID do produto é obrigatório'], 400);
            return;
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
            $stmt->execute([$user_id, $product_id]);
            
            if ($stmt->rowCount() > 0) {
                jsonResponse(['message' => 'Produto removido dos favoritos']);
            } else {
                jsonResponse(['error' => 'Produto não encontrado nos favoritos'], 404);
            }
            
        } catch (PDOException $e) {
            jsonResponse(['error' => 'Erro ao remover favorito: ' . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Método não permitido'], 405);
        break;
}
?>

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro de conexão: ' . $e->getMessage()]);
    exit;
}

function getUserIdFromToken() {
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

    if (empty($token)) {
        return null;
    }

    $parts = explode('.', $token);
    if (count($parts) === 3) {
        try {
            $base64Payload = str_replace(['-', '_'], ['+', '/'], $parts[1]);
            $padding = strlen($base64Payload) % 4;
            if ($padding > 0) {
                $base64Payload .= str_repeat('=', 4 - $padding);
            }
            $payload = json_decode(base64_decode($base64Payload), true);

            if (isset($payload['user_id'])) {
                return $payload['user_id'];
            }
            if (isset($payload['sub'])) {
                return $payload['sub'];
            }
            if (isset($payload['id'])) {
                return $payload['id'];
            }
        } catch (Exception $e) {
        }
    }

    try {
        $decoded = json_decode($token, true);
        if (isset($decoded['user_id'])) {
            return $decoded['user_id'];
        }
        if (isset($decoded['id'])) {
            return $decoded['id'];
        }
    } catch (Exception $e) {
    }

    return null;
}

$user_id = getUserIdFromToken();

if (!$user_id) {
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $user_id = $data['user_id'] ?? null;
    } elseif ($method === 'GET') {
        $user_id = $_GET['user_id'] ?? null;
    }
}

if (!$user_id) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autenticado', 'debug' => 'user_id não encontrado']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'wishlist'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("
            CREATE TABLE wishlist (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT UNSIGNED NOT NULL,
                product_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_wishlist (user_id, product_id)
            )
        ");
    }
} catch (PDOException $e) {
}

switch ($method) {
    case 'GET':
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

            echo json_encode($favorites);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao buscar favoritos: ' . $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $product_id = $data['product_id'] ?? null;

        if (!$product_id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID do produto é obrigatório']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
            $stmt->execute([$product_id]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Produto não encontrado']);
                exit;
            }

            $stmt = $pdo->prepare("INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)");
            $stmt->execute([$user_id, $product_id]);

            http_response_code(201);
            echo json_encode(['message' => 'Produto adicionado aos favoritos', 'success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao adicionar favorito: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $product_id = $_GET['product_id'] ?? null;

        if (!$product_id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID do produto é obrigatório']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
            $stmt->execute([$user_id, $product_id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Produto removido dos favoritos', 'success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Produto não encontrado nos favoritos']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao remover favorito: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        break;
}
?>

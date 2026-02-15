<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

try {
    $pdo = getConnection();
} catch(Exception $e) {
    logError('Erro de conexão com banco de dados', ['error' => $e->getMessage()]);
    jsonResponse(['error' => 'Erro de conexão com banco de dados'], 500);
}

// Pegar a rota da requisição
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

// Roteamento básico
switch($path) {
    case 'products':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getProducts($pdo);
        }
        break;
        
    case 'products/featured':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getFeaturedProducts($pdo);
        }
        break;
        
    case 'orders':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            createOrder($pdo);
        }
        break;
        
    case 'auth/login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            login($pdo);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Rota não encontrada'], 404);
        break;
}

// Funções do backend
function getProducts($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY name");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse(['data' => $products]);
    } catch(PDOException $e) {
        logError('Erro ao buscar produtos', ['error' => $e->getMessage()]);
        jsonResponse(['error' => 'Erro ao buscar produtos'], 500);
    }
}

function getFeaturedProducts($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products WHERE featured = 1 ORDER BY rating DESC LIMIT 6");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse(['data' => $products]);
    } catch(PDOException $e) {
        logError('Erro ao buscar produtos em destaque', ['error' => $e->getMessage()]);
        jsonResponse(['error' => 'Erro ao buscar produtos em destaque'], 500);
    }
}

function createOrder($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $pdo->beginTransaction();
        
        // Inserir pedido
        $stmt = $pdo->prepare("INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, status, created_at) VALUES (?, ?, ?, ?, 'pending', NOW())");
        $stmt->execute([
            $data['customer_name'],
            $data['customer_email'], 
            $data['customer_phone'],
            $data['total_amount']
        ]);
        
        $order_id = $pdo->lastInsertId();
        
        // Inserir itens do pedido
        foreach($data['items'] as $item) {
            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
            $stmt->execute([$order_id, $item['id'], $item['quantity'], $item['price']]);
        }
        
        $pdo->commit();
        
        jsonResponse([
            'success' => true,
            'order_id' => $order_id,
            'message' => 'Pedido criado com sucesso!'
        ]);
        
    } catch(PDOException $e) {
        $pdo->rollback();
        logError('Erro ao criar pedido', ['error' => $e->getMessage()]);
        jsonResponse(['error' => 'Erro ao criar pedido'], 500);
    }
}

function login($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
        $stmt->execute([$data['email'], md5($data['password'])]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            $token = generateToken($user['id'], $user['email']);
            
            // Salvar token no banco
            $stmt = $pdo->prepare("UPDATE users SET token = ? WHERE id = ?");
            $stmt->execute([$token, $user['id']]);
            
            jsonResponse([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email']
                ]
            ]);
        } else {
            jsonResponse(['error' => 'Credenciais inválidas'], 401);
        }
    } catch(PDOException $e) {
        logError('Erro no login', ['error' => $e->getMessage()]);
        jsonResponse(['error' => 'Erro no login'], 500);
    }
}
?>

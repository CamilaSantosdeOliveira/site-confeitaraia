<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../backend/config/database.php';

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception('Erro de conexão com banco de dados');
    }

    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Gerar session_id se não existir
    if (!isset($_COOKIE['session_id'])) {
        $session_id = uniqid('session_', true);
        setcookie('session_id', $session_id, time() + (30 * 24 * 60 * 60), '/'); // 30 dias
    } else {
        $session_id = $_COOKIE['session_id'];
    }
    
    // Obter user_id se autenticado
    $user_id = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
        // Aqui você validaria o token e obteria o user_id
        // Por enquanto, vamos usar null para carrinho anônimo
    }

    switch ($method) {
        case 'GET':
            // Buscar itens do carrinho
            $query = "SELECT ci.*, p.name, p.image, p.category 
                     FROM cart_items ci 
                     JOIN products p ON ci.product_id = p.id 
                     WHERE (ci.user_id = :user_id OR ci.session_id = :session_id)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':session_id', $session_id);
            $stmt->execute();
            
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Formatar dados para o frontend
            $formatted_items = array_map(function($item) {
                return [
                    'id' => $item['product_id'],
                    'name' => $item['name'],
                    'price' => number_format($item['price'], 2, '.', ''),
                    'image' => $item['image'],
                    'category' => $item['category'],
                    'quantity' => (int)$item['quantity']
                ];
            }, $items);
            
            jsonResponse(['success' => true, 'items' => $formatted_items]);
            break;
            
        case 'POST':
            // Adicionar item ao carrinho
            if (!isset($input['product_id']) || !isset($input['quantity'])) {
                jsonResponse(['error' => 'Dados obrigatórios: product_id, quantity'], 400);
            }
            
            $product_id = $input['product_id'];
            $quantity = $input['quantity'];
            
            // Buscar preço do produto
            $query = "SELECT price FROM products WHERE id = :product_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':product_id', $product_id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$product) {
                jsonResponse(['error' => 'Produto não encontrado'], 404);
            }
            
            // Verificar se item já existe no carrinho
            $query = "SELECT id, quantity FROM cart_items 
                     WHERE product_id = :product_id 
                     AND (user_id = :user_id OR session_id = :session_id)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':product_id', $product_id);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':session_id', $session_id);
            $stmt->execute();
            $existing_item = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($existing_item) {
                // Atualizar quantidade
                $new_quantity = $existing_item['quantity'] + $quantity;
                $query = "UPDATE cart_items SET quantity = :quantity WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':quantity', $new_quantity);
                $stmt->bindParam(':id', $existing_item['id']);
                $stmt->execute();
            } else {
                // Inserir novo item
                $query = "INSERT INTO cart_items (user_id, session_id, product_id, quantity, price) 
                         VALUES (:user_id, :session_id, :product_id, :quantity, :price)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':user_id', $user_id);
                $stmt->bindParam(':session_id', $session_id);
                $stmt->bindParam(':product_id', $product_id);
                $stmt->bindParam(':quantity', $quantity);
                $stmt->bindParam(':price', $product['price']);
                $stmt->execute();
            }
            
            jsonResponse(['success' => true, 'message' => 'Item adicionado ao carrinho']);
            break;
            
        case 'PUT':
            // Atualizar quantidade
            if (!isset($input['product_id']) || !isset($input['quantity'])) {
                jsonResponse(['error' => 'Dados obrigatórios: product_id, quantity'], 400);
            }
            
            $product_id = $input['product_id'];
            $quantity = $input['quantity'];
            
            if ($quantity <= 0) {
                // Remover item se quantidade for 0 ou negativa
                $query = "DELETE FROM cart_items 
                         WHERE product_id = :product_id 
                         AND (user_id = :user_id OR session_id = :session_id)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':product_id', $product_id);
                $stmt->bindParam(':user_id', $user_id);
                $stmt->bindParam(':session_id', $session_id);
                $stmt->execute();
            } else {
                // Atualizar quantidade
                $query = "UPDATE cart_items SET quantity = :quantity 
                         WHERE product_id = :product_id 
                         AND (user_id = :user_id OR session_id = :session_id)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':quantity', $quantity);
                $stmt->bindParam(':product_id', $product_id);
                $stmt->bindParam(':user_id', $user_id);
                $stmt->bindParam(':session_id', $session_id);
                $stmt->execute();
            }
            
            jsonResponse(['success' => true, 'message' => 'Carrinho atualizado']);
            break;
            
        case 'DELETE':
            // Limpar carrinho
            $query = "DELETE FROM cart_items 
                     WHERE user_id = :user_id OR session_id = :session_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':session_id', $session_id);
            $stmt->execute();
            
            jsonResponse(['success' => true, 'message' => 'Carrinho limpo']);
            break;
            
        default:
            jsonResponse(['error' => 'Método não permitido'], 405);
    }
    
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
?>

<?php
require_once '../config/cors.php';
require_once '../models/Product.php';

$product = new Product();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Extrair ID se presente na URL
$id = null;
if (isset($path_parts[3])) {
    $id = $path_parts[3];
}

// Extrair categoria se presente na URL
$category = null;
if (isset($path_parts[4]) && $path_parts[3] === 'category') {
    $category = $path_parts[4];
}

// Extrair termo de pesquisa se presente
$search_term = null;
if (isset($_GET['q'])) {
    $search_term = $_GET['q'];
}

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                // GET /api/products/{id}
                $result = $product->getById($id);
                if ($result) {
                    http_response_code(200);
                    echo json_encode([
                        'success' => true,
                        'data' => $result
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Produto não encontrado'
                    ]);
                }
            } elseif ($category) {
                // GET /api/products/category/{category}
                $result = $product->getByCategory($category);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $result
                ]);
            } elseif ($search_term) {
                // GET /api/products/search?q={term}
                $result = $product->search($search_term);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $result
                ]);
            } elseif (isset($path_parts[3]) && $path_parts[3] === 'featured') {
                // GET /api/products/featured
                $result = $product->getFeatured();
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $result
                ]);
            } else {
                // GET /api/products
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;
                $offset = isset($_GET['offset']) ? intval($_GET['offset']) : null;
                
                $result = $product->getAll($limit, $offset);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $result
                ]);
            }
            break;

        case 'POST':
            // POST /api/products
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!$data) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Dados inválidos'
                ]);
                break;
            }

            // Validar dados obrigatórios
            $required_fields = ['name', 'description', 'price', 'category'];
            foreach ($required_fields as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    http_response_code(400);
                    echo json_encode([
                        'success' => false,
                        'message' => "Campo obrigatório: $field"
                    ]);
                    break 2;
                }
            }

            // Atribuir dados ao objeto
            $product->name = $data['name'];
            $product->description = $data['description'];
            $product->price = $data['price'];
            $product->image = $data['image'] ?? '';
            $product->category = $data['category'];
            $product->featured = $data['featured'] ?? 0;
            $product->active = $data['active'] ?? 1;
            $product->rating = $data['rating'] ?? 0.0;
            $product->reviews_count = $data['reviews_count'] ?? 0;

            $new_id = $product->create();
            if ($new_id) {
                http_response_code(201);
                echo json_encode([
                    'success' => true,
                    'message' => 'Produto criado com sucesso',
                    'data' => ['id' => $new_id]
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erro ao criar produto'
                ]);
            }
            break;

        case 'PUT':
            // PUT /api/products/{id}
            if (!$id) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'ID do produto é obrigatório'
                ]);
                break;
            }

            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!$data) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Dados inválidos'
                ]);
                break;
            }

            // Verificar se o produto existe
            $existing_product = $product->getById($id);
            if (!$existing_product) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Produto não encontrado'
                ]);
                break;
            }

            // Atribuir dados ao objeto
            $product->id = $id;
            $product->name = $data['name'] ?? $existing_product['name'];
            $product->description = $data['description'] ?? $existing_product['description'];
            $product->price = $data['price'] ?? $existing_product['price'];
            $product->image = $data['image'] ?? $existing_product['image'];
            $product->category = $data['category'] ?? $existing_product['category'];
            $product->featured = $data['featured'] ?? $existing_product['featured'];
            $product->active = $data['active'] ?? $existing_product['active'];
            $product->rating = $data['rating'] ?? $existing_product['rating'];
            $product->reviews_count = $data['reviews_count'] ?? $existing_product['reviews_count'];

            if ($product->update()) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Produto atualizado com sucesso'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erro ao atualizar produto'
                ]);
            }
            break;

        case 'DELETE':
            // DELETE /api/products/{id}
            if (!$id) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'ID do produto é obrigatório'
                ]);
                break;
            }

            // Verificar se o produto existe
            $existing_product = $product->getById($id);
            if (!$existing_product) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Produto não encontrado'
                ]);
                break;
            }

            if ($product->delete($id)) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Produto deletado com sucesso'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erro ao deletar produto'
                ]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode([
                'success' => false,
                'message' => 'Método não permitido'
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro interno do servidor',
        'error' => $e->getMessage()
    ]);
}
?>













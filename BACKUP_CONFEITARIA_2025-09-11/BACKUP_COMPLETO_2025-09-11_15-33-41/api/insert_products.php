<?php
// 🔧 CORS COMPLETO PARA RESOLVER O PROBLEMA
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 horas

// 🚨 TRATAR REQUISIÇÃO OPTIONS (PREFLIGHT)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    // Conexão com MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar método da requisição
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        // Receber dados do produto via POST
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            throw new Exception('Dados inválidos recebidos');
        }

        // Validar campos obrigatórios
        if (empty($input['name']) || !isset($input['price']) || !isset($input['stock'])) {
            throw new Exception('Nome, preço e estoque são obrigatórios');
        }

        // Preparar query de inserção
        $stmt = $pdo->prepare("
            INSERT INTO products (name, price, stock, category, description, image, tags, status, sales, revenue, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 0, 0, NOW())
        ");

        // Executar inserção
        $stmt->execute([
            $input['name'],
            $input['price'],
            $input['stock'],
            $input['category'] ?? 'Bolos',
            $input['description'] ?? 'Descrição não disponível',
            $input['image'] ?? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
            $input['tags'] ?? 'novo,confeitaria'
        ]);

        $productId = $pdo->lastInsertId();

        // Retornar sucesso
        echo json_encode([
            'success' => true,
            'message' => 'Produto criado com sucesso!',
            'product_id' => $productId,
            'product' => [
                'id' => $productId,
                'name' => $input['name'],
                'price' => $input['price'],
                'stock' => $input['stock'],
                'category' => $input['category'] ?? 'Bolos',
                'description' => $input['description'] ?? 'Descrição não disponível',
                'image' => $input['image'] ?? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
                'tags' => $input['tags'] ?? 'novo,confeitaria',
                'status' => 'active',
                'sales' => 0,
                'revenue' => 0,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ], JSON_UNESCAPED_UNICODE);

    } else {
        // Método GET - inserir produtos de exemplo (mantido para compatibilidade)
        $products = [
            [
                'name' => 'Bolo de Chocolate',
                'price' => 45.00,
                'stock' => 10,
                'category' => 'Bolos',
                'description' => 'Delicioso bolo de chocolate com cobertura cremosa',
                'image' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
                'tags' => 'chocolate,bolo,doce'
            ],
            [
                'name' => 'Torta de Morango',
                'price' => 65.00,
                'stock' => 8,
                'category' => 'Tortas',
                'description' => 'Torta fresca de morango com creme chantilly',
                'image' => 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
                'tags' => 'morango,torta,fruta'
            ],
            [
                'name' => 'Cupcake de Baunilha',
                'price' => 12.00,
                'stock' => 25,
                'category' => 'Cupcakes',
                'description' => 'Cupcake de baunilha com cobertura colorida',
                'image' => 'https://images.unsplash.com/photo-1486427944299-d1955d23-ba4b-4b0b-9b3d-1b536234baaa?w=400&h=300&fit=crop',
                'tags' => 'baunilha,cupcake,pequeno'
            ]
        ];

        // Inserir produtos de exemplo
        $stmt = $pdo->prepare("
            INSERT INTO products (name, price, stock, category, description, image, tags, status, sales, revenue, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active', 0, 0, NOW())
        ");

        $insertedCount = 0;
        foreach ($products as $product) {
            try {
                $stmt->execute([
                    $product['name'],
                    $product['price'],
                    $product['stock'],
                    $product['category'],
                    $product['description'],
                    $product['image'],
                    $product['tags']
                ]);
                $insertedCount++;
            } catch (PDOException $e) {
                // Produto já existe, continuar
                continue;
            }
        }

        echo json_encode([
            'success' => true,
            'message' => "Produtos inseridos: $insertedCount",
            'total_products' => $insertedCount
        ], JSON_UNESCAPED_UNICODE);
    }

} catch(Exception $e) {
    // Em caso de erro, retornar erro em JSON
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

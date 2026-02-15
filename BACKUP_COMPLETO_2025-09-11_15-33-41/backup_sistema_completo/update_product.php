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

    if ($method === 'PUT') {
        // Receber dados do produto via PUT
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            throw new Exception('Dados inválidos recebidos');
        }

        // Validar campos obrigatórios
        if (empty($input['id']) || empty($input['name']) || !isset($input['price']) || !isset($input['stock'])) {
            throw new Exception('ID, nome, preço e estoque são obrigatórios');
        }

        // Preparar query de atualização
        $stmt = $pdo->prepare("
            UPDATE products 
            SET name = ?, price = ?, stock = ?, category = ?, description = ?, image = ?, tags = ?, updated_at = NOW()
            WHERE id = ?
        ");

        // Executar atualização
        $stmt->execute([
            $input['name'],
            $input['price'],
            $input['stock'],
            $input['category'] ?? 'Bolos',
            $input['description'] ?? 'Descrição não disponível',
            $input['image'] ?? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
            $input['tags'] ?? 'editado,confeitaria',
            $input['id']
        ]);

        // Verificar se foi atualizado
        if ($stmt->rowCount() > 0) {
            // Retornar sucesso
            echo json_encode([
                'success' => true,
                'message' => 'Produto atualizado com sucesso!',
                'product_id' => $input['id']
            ], JSON_UNESCAPED_UNICODE);
        } else {
            throw new Exception('Produto não encontrado ou não foi alterado');
        }

    } else {
        http_response_code(405);
        echo json_encode([
            'error' => true,
            'message' => 'Método não permitido. Use PUT para atualizar produtos.'
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

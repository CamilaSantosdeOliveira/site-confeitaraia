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

    if ($method === 'DELETE') {
        // Receber dados do produto via DELETE
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            throw new Exception('Dados inválidos recebidos');
        }

        // Validar campo obrigatório
        if (empty($input['id'])) {
            throw new Exception('ID do produto é obrigatório');
        }

        // Preparar query de exclusão
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");

        // Executar exclusão
        $stmt->execute([$input['id']]);

        // Verificar se foi excluído
        if ($stmt->rowCount() > 0) {
            // Retornar sucesso
            echo json_encode([
                'success' => true,
                'message' => 'Produto excluído com sucesso!',
                'product_id' => $input['id']
            ], JSON_UNESCAPED_UNICODE);
        } else {
            throw new Exception('Produto não encontrado');
        }

    } else {
        http_response_code(405);
        echo json_encode([
            'error' => true,
            'message' => 'Método não permitido. Use DELETE para excluir produtos.'
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













<?php
// 🔧 CORS COMPLETO PARA RESOLVER O PROBLEMA
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Credentials: true');
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
    
    // Buscar todos os produtos
    $stmt = $pdo->prepare("SELECT * FROM products ORDER BY id ASC");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Retornar produtos em JSON
    echo json_encode($products, JSON_UNESCAPED_UNICODE);
    
} catch(PDOException $e) {
    // Em caso de erro, retornar erro em JSON
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao conectar com banco de dados: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $pdo = new PDO('mysql:host=localhost;dbname=confeitaria;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "=== VERIFICANDO DADOS REAIS ===\n\n";
    
    // Verificar produtos
    echo "=== PRODUTOS ===\n";
    $stmt = $pdo->query('SELECT id, name, price, category FROM products LIMIT 5');
    $products = $stmt->fetchAll();
    foreach ($products as $product) {
        echo "ID: {$product['id']} | Nome: {$product['name']} | Preço: R$ {$product['price']} | Categoria: {$product['category']}\n";
    }
    echo "Total de produtos: " . count($products) . "\n\n";
    
    // Verificar usuários
    echo "=== USUÁRIOS ===\n";
    $stmt = $pdo->query('SELECT id, name, email FROM users LIMIT 3');
    $users = $stmt->fetchAll();
    foreach ($users as $user) {
        echo "ID: {$user['id']} | Nome: {$user['name']} | Email: {$user['email']}\n";
    }
    echo "Total de usuários: " . count($users) . "\n\n";
    
    // Verificar carrinho
    echo "=== CARRINHO ===\n";
    $stmt = $pdo->query('SELECT COUNT(*) as total FROM cart_items');
    $cart = $stmt->fetch();
    echo "Total de itens no carrinho: {$cart['total']}\n\n";
    
    // Verificar se as tabelas existem
    echo "=== TABELAS ===\n";
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll();
    foreach ($tables as $table) {
        echo "Tabela: " . array_values($table)[0] . "\n";
    }
    
} catch (PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











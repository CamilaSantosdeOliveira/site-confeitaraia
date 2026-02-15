<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Dados do admin com nome diferente
    $adminData = [
        'name' => 'Maria Silva',
        'email' => 'admin@doçuras.com',
        'password' => password_hash('admin123', PASSWORD_DEFAULT),
        'phone' => '(11) 99999-9999',
        'role' => 'admin',
        'created_at' => date('Y-m-d H:i:s')
    ];

    // Verificar se o admin já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$adminData['email']]);
    
    if ($stmt->rowCount() > 0) {
        // Atualizar o nome do admin existente
        $stmt = $pdo->prepare("UPDATE users SET name = ? WHERE email = ?");
        $result = $stmt->execute([$adminData['name'], $adminData['email']]);
        
        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Nome do administrador atualizado para: ' . $adminData['name'],
                'admin_data' => [
                    'email' => $adminData['email'],
                    'password' => 'admin123',
                    'name' => $adminData['name'],
                    'role' => $adminData['role']
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Erro ao atualizar nome do administrador'
            ]);
        }
    } else {
        // Criar novo usuário admin
        $stmt = $pdo->prepare("
            INSERT INTO users (name, email, password, phone, role, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        $result = $stmt->execute([
            $adminData['name'],
            $adminData['email'],
            $adminData['password'],
            $adminData['phone'],
            $adminData['role'],
            $adminData['created_at']
        ]);

        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Usuário administrador criado com sucesso!',
                'admin_data' => [
                    'email' => $adminData['email'],
                    'password' => 'admin123',
                    'name' => $adminData['name'],
                    'role' => $adminData['role']
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Erro ao criar usuário administrador'
            ]);
        }
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro de conexão com o banco de dados: ' . $e->getMessage()
    ]);
}
?>











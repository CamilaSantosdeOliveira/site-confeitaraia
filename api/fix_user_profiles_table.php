<?php
header('Content-Type: application/json');

require_once '../backend/config.php';

try {
    $pdo = getConnection();
    
    // Verificar se a tabela user_profiles existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'user_profiles'");
    $tableExists = $stmt->fetch();
    
    if (!$tableExists) {
        // Criar a tabela user_profiles
        $sql = "CREATE TABLE IF NOT EXISTS user_profiles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            phone VARCHAR(20) NULL,
            birth_date DATE NULL,
            gender ENUM('M', 'F', 'O') DEFAULT 'O',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE KEY unique_user_id (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        
        $pdo->exec($sql);
        
        echo json_encode([
            'success' => true,
            'message' => 'Tabela user_profiles criada com sucesso!'
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'message' => 'Tabela user_profiles já existe.'
        ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao verificar/criar tabela: ' . $e->getMessage()
    ]);
}
?>

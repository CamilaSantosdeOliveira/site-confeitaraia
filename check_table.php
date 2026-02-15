<?php
require_once 'backend/config.php';

try {
    $pdo = getConnection();
    $stmt = $pdo->query('DESCRIBE orders');
    
    echo "Estrutura da tabela orders:\n";
    while($row = $stmt->fetch()) {
        echo $row['Field'] . ' - ' . $row['Type'] . "\n";
    }
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>











<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Configuração do banco
$host = 'localhost';
$dbname = 'confeitaria';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // URL da nova imagem de brigadeiro gourmet
    $brigadeiroImage = "https://static.wixstatic.com/media/402ff2_0aa7de7a7b93469b8aafb9587dbb19cc~mv2.jpg/v1/fill/w_438,h_293,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/402ff2_0aa7de7a7b93469b8aafb9587dbb19cc~mv2.jpg";
    
    // Atualizar a imagem do Brigadeiro Gourmet
    $stmt = $pdo->prepare("UPDATE products SET image = ? WHERE name LIKE '%Brigadeiro%'");
    $result = $stmt->execute([$brigadeiroImage]);
    
    if ($result) {
        echo "NOVA IMAGEM DO BRIGADEIRO GOURMET ATUALIZADA:\n";
        echo "URL: " . $brigadeiroImage . "\n";
        echo "Linhas afetadas: " . $stmt->rowCount() . "\n";
        
        // Verificar resultado
        $checkStmt = $pdo->prepare("SELECT id, name, image FROM products WHERE name LIKE '%Brigadeiro%'");
        $checkStmt->execute();
        $product = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        echo "\nPRODUTO ATUALIZADO:\n";
        echo "ID: " . $product['id'] . " | Nome: " . $product['name'] . "\n";
        echo "Imagem: " . $product['image'] . "\n";
    } else {
        echo "ERRO ao atualizar imagem\n";
    }
    
} catch(PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}
?>











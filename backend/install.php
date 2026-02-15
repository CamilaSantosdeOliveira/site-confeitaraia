<?php
echo "🚀 Instalando Backend PHP - Doçuras & Sabores\n\n";

// Verificar se o PHP tem as extensões necessárias
$required_extensions = ['pdo', 'pdo_mysql', 'json'];
$missing_extensions = [];

foreach ($required_extensions as $ext) {
    if (!extension_loaded($ext)) {
        $missing_extensions[] = $ext;
    }
}

if (!empty($missing_extensions)) {
    echo "❌ Extensões PHP necessárias não encontradas:\n";
    foreach ($missing_extensions as $ext) {
        echo "   - $ext\n";
    }
    echo "\nPor favor, instale as extensões necessárias.\n";
    exit(1);
}

echo "✅ Extensões PHP verificadas\n";

// Configurações do banco
$host = 'localhost';
$username = 'root';
$password = '';

echo "\n📋 Configuração do Banco de Dados\n";
echo "Host: $host\n";
echo "Usuário: $username\n";

// Tentar conectar ao MySQL
try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexão com MySQL estabelecida\n";
} catch(PDOException $e) {
    echo "❌ Erro ao conectar com MySQL: " . $e->getMessage() . "\n";
    echo "Verifique se o MySQL está rodando e as credenciais estão corretas.\n";
    exit(1);
}

// Criar banco de dados
try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS confeitaria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Banco de dados 'confeitaria_db' criado\n";
} catch(PDOException $e) {
    echo "❌ Erro ao criar banco de dados: " . $e->getMessage() . "\n";
    exit(1);
}

// Selecionar o banco
$pdo->exec("USE confeitaria_db");

// Ler e executar o script SQL
$sql_file = __DIR__ . '/database.sql';
if (!file_exists($sql_file)) {
    echo "❌ Arquivo database.sql não encontrado\n";
    exit(1);
}

$sql_content = file_get_contents($sql_file);
$statements = explode(';', $sql_content);

echo "\n📊 Criando tabelas...\n";

foreach ($statements as $statement) {
    $statement = trim($statement);
    if (!empty($statement) && !preg_match('/^(USE|CREATE DATABASE)/i', $statement)) {
        try {
            $pdo->exec($statement);
        } catch(PDOException $e) {
            // Ignorar erros de tabelas já existentes
            if (strpos($e->getMessage(), 'already exists') === false) {
                echo "⚠️  Aviso: " . $e->getMessage() . "\n";
            }
        }
    }
}

echo "✅ Tabelas criadas\n";

// Criar diretório de logs
if (!is_dir(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0755, true);
    echo "✅ Diretório de logs criado\n";
}

// Testar endpoints
echo "\n🧪 Testando endpoints...\n";

$test_urls = [
    'http://localhost:8000/products',
    'http://localhost:8000/products/featured'
];

foreach ($test_urls as $url) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'ignore_errors' => true
        ]
    ]);
    
    $response = @file_get_contents($url, false, $context);
    
    if ($response !== false) {
        echo "✅ $url - OK\n";
    } else {
        echo "⚠️  $url - Não testado (servidor não está rodando)\n";
    }
}

echo "\n🎉 Instalação concluída!\n\n";
echo "📋 Próximos passos:\n";
echo "1. Inicie o servidor PHP: php -S localhost:8000\n";
echo "2. Acesse o frontend em: http://localhost:3003\n";
echo "3. Teste o login com:\n";
echo "   - Admin: admin@confeitaria.com / admin123\n";
echo "   - Usuário: joao@email.com / 123456\n\n";

echo "🔧 Configurações:\n";
echo "- Backend: http://localhost:8000\n";
echo "- Frontend: http://localhost:3003\n";
echo "- Banco: confeitaria_db\n\n";

echo "📚 Documentação: backend/README.md\n";
?>













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
    
    // Verificar se a tabela orders existe
    $tableExists = false;
    try {
        $pdo->query("SELECT 1 FROM orders LIMIT 1");
        $tableExists = true;
    } catch (PDOException $e) {
        $tableExists = false;
    }
    
    // Criar tabela orders se não existir
    if (!$tableExists) {
        try {
            $pdo->exec("CREATE TABLE orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                customer_name VARCHAR(255),
                customer_email VARCHAR(255),
                customer_phone VARCHAR(50),
                total DECIMAL(10,2) NOT NULL DEFAULT 0,
                payment_method VARCHAR(50),
                payment_status VARCHAR(50) DEFAULT 'pending',
                status VARCHAR(50) DEFAULT 'pending',
                delivery_address TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        } catch (PDOException $e) {
            // Erro ao criar tabela
        }
    } else {
        // Tabela existe, verificar e adicionar colunas que faltam
        $columns = [];
        try {
            $stmt = $pdo->query("SHOW COLUMNS FROM orders");
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $row) {
                $columns[] = $row['Field'];
            }
        } catch (PDOException $e) {
            // Erro ao verificar colunas, continuar mesmo assim
        }
        
        // Adicionar colunas que faltam
        $requiredColumns = [
            'order_number' => "ALTER TABLE orders ADD COLUMN order_number VARCHAR(50)",
            'customer_name' => "ALTER TABLE orders ADD COLUMN customer_name VARCHAR(255)",
            'customer_email' => "ALTER TABLE orders ADD COLUMN customer_email VARCHAR(255)",
            'customer_phone' => "ALTER TABLE orders ADD COLUMN customer_phone VARCHAR(50)",
            'payment_status' => "ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending'",
            'delivery_address' => "ALTER TABLE orders ADD COLUMN delivery_address TEXT",
            'notes' => "ALTER TABLE orders ADD COLUMN notes TEXT"
        ];
        
        foreach ($requiredColumns as $colName => $sql) {
            if (!in_array($colName, $columns)) {
                try {
                    $pdo->exec($sql);
                    // Se for order_number, adicionar índice único depois (se não houver dados)
                    if ($colName === 'order_number') {
                        try {
                            $pdo->exec("ALTER TABLE orders ADD UNIQUE INDEX idx_order_number (order_number)");
                        } catch (PDOException $e) {
                            // Índice pode já existir ou não ser possível criar (ignorar)
                        }
                    }
                } catch (PDOException $e) {
                    // Coluna pode já existir ou erro ao adicionar (ignorar)
                    error_log("Erro ao adicionar coluna $colName: " . $e->getMessage());
                }
            }
        }
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // POST - Criar novo pedido
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Dados inválidos'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        
        // Gerar número do pedido único
        do {
            $orderNumber = 'ORD-' . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);
            $checkStmt = $pdo->prepare("SELECT id FROM orders WHERE order_number = ?");
            $checkStmt->execute([$orderNumber]);
            $exists = $checkStmt->fetch();
        } while ($exists);
        
        // Preparar dados do pedido
        $userId = $data['user_id'] ?? null;
        $customerName = $data['customer_name'] ?? 'Cliente';
        $customerEmail = $data['customer_email'] ?? '';
        $customerPhone = $data['customer_phone'] ?? '';
        $total = floatval($data['total'] ?? 0);
        $paymentMethod = $data['payment_method'] ?? 'PIX';
        $deliveryAddress = $data['delivery_address'] ?? '';
        $notes = $data['notes'] ?? '';
        $items = $data['items'] ?? [];
        
        // Verificar quais colunas existem na tabela
        $existingColumns = [];
        try {
            $stmt = $pdo->query("SHOW COLUMNS FROM orders");
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $row) {
                $existingColumns[] = $row['Field'];
            }
        } catch (PDOException $e) {
            // Se não conseguir verificar, usar estrutura padrão
        }
        
        // Construir query dinamicamente baseado nas colunas existentes
        $insertColumns = [];
        $insertValues = [];
        $placeholders = [];
        
        // Adicionar colunas opcionais se existirem
        if (in_array('user_id', $existingColumns) && $userId !== null) {
            $insertColumns[] = 'user_id';
            $insertValues[] = $userId;
            $placeholders[] = '?';
        }

        if (in_array('order_number', $existingColumns)) {
            $insertColumns[] = 'order_number';
            $insertValues[] = $orderNumber;
            $placeholders[] = '?';
        }
        
        if (in_array('customer_name', $existingColumns)) {
            $insertColumns[] = 'customer_name';
            $insertValues[] = $customerName;
            $placeholders[] = '?';
        }
        
        if (in_array('customer_email', $existingColumns)) {
            $insertColumns[] = 'customer_email';
            $insertValues[] = $customerEmail;
            $placeholders[] = '?';
        }
        
        if (in_array('customer_phone', $existingColumns)) {
            $insertColumns[] = 'customer_phone';
            $insertValues[] = $customerPhone;
            $placeholders[] = '?';
        }
        
        // Colunas que provavelmente existem
        if (in_array('total', $existingColumns)) {
            $insertColumns[] = 'total';
            $insertValues[] = $total;
            $placeholders[] = '?';
        } else if (in_array('total_amount', $existingColumns)) {
            $insertColumns[] = 'total_amount';
            $insertValues[] = $total;
            $placeholders[] = '?';
        }
        
        if (in_array('payment_method', $existingColumns)) {
            $insertColumns[] = 'payment_method';
            $insertValues[] = $paymentMethod;
            $placeholders[] = '?';
        }
        
        if (in_array('payment_status', $existingColumns)) {
            $insertColumns[] = 'payment_status';
            $insertValues[] = 'paid';
            $placeholders[] = '?';
        }
        
        if (in_array('status', $existingColumns)) {
            $insertColumns[] = 'status';
            $insertValues[] = 'pending';
            $placeholders[] = '?';
        }
        
        if (in_array('delivery_address', $existingColumns)) {
            $insertColumns[] = 'delivery_address';
            $insertValues[] = $deliveryAddress;
            $placeholders[] = '?';
        } else if (in_array('shipping_address', $existingColumns)) {
            $insertColumns[] = 'shipping_address';
            $insertValues[] = $deliveryAddress;
            $placeholders[] = '?';
        }
        
        if (in_array('notes', $existingColumns)) {
            $insertColumns[] = 'notes';
            $insertValues[] = $notes;
            $placeholders[] = '?';
        }
        
        // Se não tiver colunas suficientes, usar estrutura mínima
        if (empty($insertColumns)) {
            // Estrutura mínima: apenas total
            $insertColumns = ['total'];
            $insertValues = [$total];
            $placeholders = ['?'];
        }
        
        // Montar e executar query
        $sql = "INSERT INTO orders (" . implode(', ', $insertColumns) . ") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($insertValues);
        
        $orderId = $pdo->lastInsertId();
        
        // Inserir itens do pedido (se houver tabela order_items)
        if (!empty($items)) {
            try {
                // Criar tabela order_items se não existir
                $pdo->exec("CREATE TABLE IF NOT EXISTS order_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    order_id INT NOT NULL,
                    product_id INT NOT NULL,
                    quantity INT NOT NULL DEFAULT 1,
                    price DECIMAL(10,2) NOT NULL,
                    total DECIMAL(10,2) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
                
                $itemStmt = $pdo->prepare("
                    INSERT INTO order_items (order_id, product_id, quantity, price, total) 
                    VALUES (?, ?, ?, ?, ?)
                ");
                
                foreach ($items as $item) {
                    $itemStmt->execute([
                        $orderId,
                        $item['product_id'] ?? $item['id'] ?? 0,
                        $item['quantity'] ?? 1,
                        $item['price'] ?? 0,
                        ($item['price'] ?? 0) * ($item['quantity'] ?? 1)
                    ]);
                }
            } catch (PDOException $e) {
                // Erro ao inserir itens, mas pedido já foi criado
                error_log('Erro ao inserir itens: ' . $e->getMessage());
            }
        }
        
        // Retornar sucesso
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'order_id' => intval($orderId),
            'order_number' => $orderNumber,
            'message' => 'Pedido criado com sucesso'
        ], JSON_UNESCAPED_UNICODE);
        
    } else {
        // GET - Buscar pedidos (filtrar por user_id se fornecido)
        $userId = $_GET['user_id'] ?? null;

        if ($userId) {
            // Buscar apenas pedidos do usuário específico
            $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->execute([intval($userId)]);
        } else {
            // Buscar todos os pedidos (para admin)
            $stmt = $pdo->prepare("SELECT * FROM orders ORDER BY created_at DESC");
            $stmt->execute();
        }

        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Para cada pedido, buscar os itens se existir a tabela order_items
        foreach ($orders as &$order) {
            try {
                $itemStmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id = ?");
                $itemStmt->execute([$order['id']]);
                $order['items'] = $itemStmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                // Tabela order_items pode não existir
                $order['items'] = [];
            }
        }

        // Retornar pedidos em JSON
        echo json_encode($orders, JSON_UNESCAPED_UNICODE);
    }
    
} catch(PDOException $e) {
    // Em caso de erro, retornar erro em JSON
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => true,
        'message' => 'Erro ao conectar com banco de dados: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>

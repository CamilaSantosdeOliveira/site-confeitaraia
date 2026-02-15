# Backend PHP - Doçuras & Sabores

Backend simples em PHP para a aplicação de confeitaria.

## 🚀 Instalação Rápida

### 1. Pré-requisitos
- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache/Nginx) ou servidor PHP embutido

### 2. Configurar Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script SQL
source database.sql
```

### 3. Configurar Backend

Edite o arquivo `config.php` se necessário:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'confeitaria_db');
define('DB_USER', 'root');
define('DB_PASS', 'sua_senha');
```

### 4. Iniciar Servidor

```bash
# Na pasta backend
php -S localhost:8000
```

### 5. Testar API

```bash
# Testar produtos
curl http://localhost:8000/products

# Testar produtos em destaque
curl http://localhost:8000/products/featured
```

## 📋 Endpoints Disponíveis

### Produtos
- `GET /products` - Listar todos os produtos
- `GET /products/featured` - Produtos em destaque

### Pedidos
- `POST /orders` - Criar novo pedido

### Autenticação
- `POST /auth/login` - Login de usuário

## 🔐 Usuários de Teste

**Admin:**
- Email: `admin@confeitaria.com`
- Senha: `admin123`

**Usuário:**
- Email: `joao@email.com`
- Senha: `123456`

## 📁 Estrutura do Projeto

```
backend/
├── index.php          # Arquivo principal da API
├── config.php         # Configurações
├── database.sql       # Script do banco de dados
├── logs/              # Logs de erro
└── README.md          # Este arquivo
```

## 🔧 Configuração do Frontend

No arquivo `vite.config.js` do frontend, certifique-se que o proxy está apontando para a porta correta:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}
```

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o MySQL está rodando
- Confirme as credenciais no `config.php`
- Teste a conexão: `mysql -u root -p`

### Erro 500
- Verifique os logs em `logs/error.log`
- Confirme se o PHP tem permissão de escrita na pasta

### CORS Error
- O backend já está configurado com headers CORS
- Se persistir, verifique se o proxy está funcionando

## 🚀 Próximos Passos

1. **Implementar mais endpoints** (categorias, busca, etc.)
2. **Adicionar validação** de dados
3. **Implementar upload** de imagens
4. **Adicionar sistema** de pagamentos real
5. **Implementar cache** para melhor performance

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs de erro em `logs/error.log`
2. Console do navegador
3. Network tab do DevTools













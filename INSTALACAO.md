# 🚀 Guia de Instalação - Doçuras & Sabores

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 16+ (https://nodejs.org/)
- **PHP** 8.0+ (https://php.net/)
- **MySQL** 5.7+ ou **XAMPP** (https://www.apachefriends.org/)
- **Git** (https://git-scm.com/)

## 🛠️ Instalação Passo a Passo

### 1. Clone o Projeto
```bash
git clone <url-do-repositorio>
cd confeitaria-profissional
```

### 2. Instale as Dependências do Frontend
```bash
npm install
```

### 3. Configure o Banco de Dados

#### Opção A: Usando XAMPP (Recomendado para iniciantes)
1. Instale o XAMPP
2. Inicie o Apache e MySQL
3. Acesse: http://localhost/phpmyadmin
4. Crie um novo banco chamado `confeitaria_db`
5. Importe o arquivo `backend/database/schema.sql`

#### Opção B: Usando MySQL direto
```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script
source backend/database/schema.sql
```

### 4. Configure a Conexão com o Banco

Edite o arquivo `backend/config/database.php`:

```php
private $host = 'localhost';
private $db_name = 'confeitaria_db';
private $username = 'root';  // ou seu usuário
private $password = '';      // ou sua senha
```

### 5. Inicie os Servidores

#### Opção 1: Tudo de uma vez (Recomendado)
```bash
npm run dev:full
```

#### Opção 2: Separadamente
```bash
# Terminal 1 - Frontend React
npm run dev

# Terminal 2 - Backend PHP
npm run server
```

### 6. Acesse o Site

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🔑 Acessos Padrão

### Painel Administrativo
- **URL**: http://localhost:3000/admin
- **Email**: `admin@docurasesabores.com.br`
- **Senha**: `admin123`

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o MySQL está rodando
- Confirme as credenciais no `database.php`
- Teste a conexão manualmente

### Erro de Porta em Uso
```bash
# Para Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Para Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro de Módulos PHP
Certifique-se de que estas extensões estão ativas no php.ini:
- pdo_mysql
- json
- mbstring

## 📱 Testando no Mobile

1. Encontre o IP da sua máquina:
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```

2. Acesse no celular:
   - http://SEU_IP:3000

## 🚀 Deploy em Produção

### Frontend (Vercel)
```bash
npm run build
# Faça upload da pasta dist/ para o Vercel
```

### Backend (Hostinger/GoDaddy)
1. Faça upload da pasta `backend/`
2. Configure o banco de dados
3. Ajuste as URLs da API no frontend

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todos os pré-requisitos estão instalados
2. Confirme se as portas 3000 e 8000 estão livres
3. Verifique os logs do console do navegador
4. Entre em contato: contato@docurasesabores.com.br

## 🎯 Próximos Passos

Após a instalação:

1. **Personalize o conteúdo**:
   - Edite produtos no banco de dados
   - Altere cores no `tailwind.config.js`
   - Modifique textos no código

2. **Configure domínio**:
   - Registre um domínio
   - Configure SSL
   - Aponte para o servidor

3. **Adicione funcionalidades**:
   - Sistema de pagamento
   - Integração com WhatsApp
   - Relatórios avançados

---

**🎉 Parabéns! Seu site de confeitaria está funcionando!**













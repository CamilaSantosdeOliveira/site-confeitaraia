# 🚀 Como Iniciar o Backend

## ❌ Erro Atual
```
ERR_CONNECTION_REFUSED na porta 8000
```

Isso significa que o **backend não está rodando**.

## ✅ Solução: Iniciar o Backend

### Opção 1: Usar XAMPP (Recomendado)

1. **Abra o XAMPP Control Panel**
2. **Inicie o Apache** (clique em "Start")
3. **Inicie o MySQL** (clique em "Start")
4. **Configure o Apache** para servir a pasta `api/`

**Configurar VirtualHost no XAMPP:**

Edite `C:\xampp\apache\conf\extra\httpd-vhosts.conf`:
```apache
<VirtualHost *:8000>
    ServerName api.local
    DocumentRoot "C:/Users/camil/Downloads/site confeitaraia/api"
    <Directory "C:/Users/camil/Downloads/site confeitaraia/api">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Opção 2: Servidor PHP Embutido (Mais Fácil)

Abra um **novo terminal** e execute:

```powershell
# Navegue até a pasta api
cd "C:\Users\camil\Downloads\site confeitaraia\api"

# Inicie o servidor PHP na porta 8000
php -S localhost:8000
```

Você deve ver:
```
PHP 8.x.x Development Server (http://localhost:8000) started
```

**⚠️ IMPORTANTE**: Deixe este terminal aberto enquanto usar o site!

### Opção 3: Script Automático

Execute o script que inicia tudo:

```powershell
# Windows
.\start-dev.bat
```

Este script inicia:
- Frontend (porta 3001)
- Backend (porta 8000)

## 🧪 Testar se o Backend Está Funcionando

Abra no navegador:
```
http://localhost:8000/products.php
```

Se aparecer um JSON com produtos, está funcionando! ✅

## 📋 Verificação Rápida

1. ✅ **Backend rodando?** → `http://localhost:8000/products.php`
2. ✅ **Frontend rodando?** → `http://localhost:3001`
3. ✅ **Sem erros no console?** → F12 → Console

## 🔧 Se o PHP não for encontrado

**Instalar PHP:**
1. Baixe: https://windows.php.net/download/
2. Extraia em `C:\php`
3. Adicione `C:\php` ao PATH do Windows
4. Reinicie o terminal

**Ou use o XAMPP** (já vem com PHP)

## 💡 Dica

**Para desenvolvimento**, use dois terminais:

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - Backend:**
```powershell
cd api
php -S localhost:8000
```

## 🐛 Problemas Comuns

### "php não é reconhecido"
- **Solução**: Instale PHP ou use XAMPP

### "Porta 8000 em uso"
- **Solução**: Feche outros programas usando a porta 8000
- Ou mude a porta no código

### "Erro de conexão com banco"
- **Solução**: Inicie o MySQL no XAMPP

## ✅ Após Iniciar o Backend

1. **Recarregue o site**: `http://localhost:3001`
2. **Verifique o console**: Não deve mais aparecer `ERR_CONNECTION_REFUSED`
3. **As imagens devem vir do banco**: Não mais das mockadas





# ⚡ Solução Rápida: ERR_CONNECTION_REFUSED

## 🎯 O Problema
O backend **não está rodando** na porta 8000.

## ✅ Solução em 3 Passos

### Passo 1: Verificar se tem PHP

Abra o PowerShell e execute:
```powershell
php --version
```

**Se aparecer a versão do PHP**: ✅ Continue para o Passo 2
**Se aparecer erro**: ❌ Você precisa do PHP ou XAMPP

### Passo 2: Iniciar o Backend

**Opção A: Script Automático (Mais Fácil)**
```powershell
# Clique duas vezes no arquivo:
start-backend.bat
```

**Opção B: Manual**
```powershell
# Abra um NOVO terminal PowerShell
cd "C:\Users\camil\Downloads\site confeitaraia\api"
php -S localhost:8000
```

**Opção C: Se estiver usando XAMPP**
1. Abra XAMPP Control Panel
2. Clique "Start" em **Apache**
3. Clique "Start" em **MySQL**

### Passo 3: Verificar se Funcionou

Abra no navegador:
```
http://localhost:8000/products.php
```

**Se aparecer JSON**: ✅ Backend funcionando!
**Se aparecer erro**: ❌ Veja "Problemas Comuns" abaixo

## 🔍 Como Saber se Está Funcionando

No terminal onde rodou o backend, você deve ver:
```
PHP 8.x.x Development Server (http://localhost:8000) started
Listening on http://localhost:8000
```

**⚠️ IMPORTANTE**: Deixe este terminal aberto!

## 🐛 Problemas Comuns

### "php não é reconhecido"
**Você tem 2 opções:**

**Opção 1: Instalar PHP**
1. Baixe: https://windows.php.net/download/
2. Escolha: "VS16 x64 Non Thread Safe"
3. Extraia em `C:\php`
4. Adicione ao PATH do Windows

**Opção 2: Usar XAMPP (Mais Fácil)**
1. Baixe: https://www.apachefriends.org/
2. Instale o XAMPP
3. Use o PHP que vem com ele

### "Porta 8000 em uso"
**Solução:**
```powershell
# Encontrar processo na porta 8000
netstat -ano | findstr :8000

# Matar o processo (substitua PID pelo número)
taskkill /PID <PID> /F
```

### "Erro ao conectar com banco"
**Solução:**
- Inicie o **MySQL** no XAMPP
- Ou configure o banco de dados

## 📋 Checklist Final

- [ ] PHP instalado? (`php --version`)
- [ ] Backend rodando? (`http://localhost:8000/products.php`)
- [ ] Terminal do backend aberto?
- [ ] Frontend rodando? (`http://localhost:3001`)
- [ ] Sem erros no console? (F12 → Console)

## 💡 Dica

**Para desenvolvimento**, você precisa de 2 terminais:

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - Backend:**
```powershell
cd api
php -S localhost:8000
```

## ✅ Após Iniciar o Backend

1. **Recarregue o site**: `http://localhost:3001`
2. **Verifique o console**: Não deve mais aparecer `ERR_CONNECTION_REFUSED`
3. **As imagens devem vir do banco**: Não mais mockadas





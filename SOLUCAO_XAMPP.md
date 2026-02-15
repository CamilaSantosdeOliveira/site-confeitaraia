# 🔧 Solução: Backend com XAMPP

## ✅ Você está usando Apache (XAMPP)

Como você mencionou que usa Apache, você provavelmente tem o **XAMPP** instalado.

## 🚀 Solução Rápida

### Opção 1: Usar o PHP do XAMPP (Recomendado)

1. **Clique duas vezes no arquivo**:
   ```
   INICIAR_BACKEND_XAMPP.bat
   ```

2. **Deixe o terminal aberto** enquanto usar o site

### Opção 2: Mover API para htdocs do XAMPP

1. **Copie a pasta `api`** para:
   ```
   C:\xampp\htdocs\api\
   ```

2. **Inicie o Apache** no XAMPP Control Panel

3. **Acesse**:
   ```
   http://localhost/api/products.php
   ```

4. **Atualize o código** para usar `http://localhost/api/` ao invés de `http://localhost:8000/api/`

### Opção 3: Configurar VirtualHost no XAMPP

1. **Edite** `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

2. **Adicione**:
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

3. **Edite** `C:\xampp\apache\conf\httpd.conf` e adicione:
   ```apache
   Listen 8000
   ```

4. **Reinicie o Apache** no XAMPP

## 🧪 Testar

Abra no navegador:
```
http://localhost:8000/products.php
```

Ou se usou a Opção 2:
```
http://localhost/api/products.php
```

## 📋 Verificação

1. ✅ **XAMPP instalado?** → `C:\xampp\` existe?
2. ✅ **Apache rodando?** → XAMPP Control Panel
3. ✅ **MySQL rodando?** → XAMPP Control Panel
4. ✅ **Backend acessível?** → `http://localhost:8000/products.php`

## 💡 Dica

**A forma mais fácil** é usar o script `INICIAR_BACKEND_XAMPP.bat` que usa o PHP do XAMPP diretamente, sem precisar configurar o Apache.





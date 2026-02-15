# 🔧 Configurar Apache do XAMPP na Porta 8000

## ✅ Por que usar Apache?

- ✅ **Roda como serviço** - Não para quando fecha programas
- ✅ **Inicia automaticamente** com o Windows
- ✅ **Mais estável** que servidor PHP embutido
- ✅ **Melhor para produção**

## 🚀 Configuração Passo a Passo

### Passo 1: Editar httpd.conf

1. **Abra o arquivo**:
   ```
   C:\xampp\apache\conf\httpd.conf
   ```

2. **Procure por** `Listen 80`

3. **Adicione logo abaixo**:
   ```apache
   Listen 80
   Listen 8000
   ```

4. **Salve o arquivo**

### Passo 2: Editar httpd-vhosts.conf

1. **Abra o arquivo**:
   ```
   C:\xampp\apache\conf\extra\httpd-vhosts.conf
   ```

2. **Adicione no final**:
   ```apache
   <VirtualHost *:8000>
       ServerName api.local
       DocumentRoot "C:/Users/camil/Downloads/site confeitaraia/api"
       <Directory "C:/Users/camil/Downloads/site confeitaraia/api">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # Logs
       ErrorLog "C:/xampp/apache/logs/api_error.log"
       CustomLog "C:/xampp/apache/logs/api_access.log" common
   </VirtualHost>
   ```

3. **Salve o arquivo**

### Passo 3: Verificar se httpd-vhosts.conf está habilitado

1. **Abra** `C:\xampp\apache\conf\httpd.conf`
2. **Procure por**:
   ```apache
   # Virtual hosts
   Include conf/extra/httpd-vhosts.conf
   ```
3. **Se estiver com # na frente, remova o #**

### Passo 4: Instalar Apache como Serviço

1. **Abra XAMPP Control Panel**
2. **Ao lado de "Apache"**, clique no botão **"Service"**
3. **Se aparecer "Install"**, clique nele
4. **Aguarde a instalação**

### Passo 5: Iniciar Apache

1. **No XAMPP Control Panel**
2. **Clique "Start"** ao lado de Apache
3. **Deve aparecer verde** ✅

### Passo 6: Testar

Abra no navegador:
```
http://localhost:8000/products.php
```

Se aparecer JSON: ✅ Funcionando!

## 🎯 Vantagens do Apache

- ✅ **Roda sempre** - Não para ao fechar programas
- ✅ **Inicia automaticamente** - Com o Windows
- ✅ **Mais rápido** - Otimizado para produção
- ✅ **Melhor para MySQL** - Conexões persistentes

## 🔄 Se Precisar Parar

**No XAMPP Control Panel:**
- Clique "Stop" ao lado de Apache

## 📋 Verificação

1. ✅ Apache iniciado? (XAMPP Control Panel - verde)
2. ✅ Porta 8000 aberta? (`http://localhost:8000/products.php`)
3. ✅ Sem erros? (Verifique logs em `C:\xampp\apache\logs\`)

## 💡 Dica

**Depois de configurar:**
- Apache inicia automaticamente com o Windows
- Não precisa mais iniciar manualmente
- Backend sempre disponível!





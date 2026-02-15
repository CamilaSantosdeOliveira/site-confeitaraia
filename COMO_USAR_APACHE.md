# 🌐 Como Usar o Site com Apache

## 📍 Onde está sua pasta:
`C:\Users\camil\Downloads\site confeitaraia`

## 🚀 Opção 1: Mover para htdocs do XAMPP

1. **Copie a pasta** para o htdocs do XAMPP:
   ```
   C:\xampp\htdocs\site-confeitaraia\
   ```

2. **Faça o build da aplicação React**:
   ```powershell
   npm run build
   ```

3. **Acesse no navegador**:
   ```
   http://localhost/site-confeitaraia/
   ```

## 🚀 Opção 2: Configurar VirtualHost (Recomendado)

1. **Edite o arquivo** `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

2. **Adicione**:
   ```apache
   <VirtualHost *:80>
       ServerName confeitaria.local
       DocumentRoot "C:/Users/camil/Downloads/site confeitaraia"
       <Directory "C:/Users/camil/Downloads/site confeitaraia">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Edite o arquivo** `C:\Windows\System32\drivers\etc\hosts` (como Administrador):
   ```
   127.0.0.1    confeitaria.local
   ```

4. **Reinicie o Apache** no XAMPP

5. **Acesse**: `http://confeitaria.local`

## ⚠️ IMPORTANTE: Build Necessário

Como é uma aplicação React, você **PRECISA fazer build** antes de servir pelo Apache:

```powershell
npm run build
```

Isso criará a pasta `dist/` com os arquivos estáticos.

Depois, configure o Apache para servir a pasta `dist/`:

```apache
DocumentRoot "C:/Users/camil/Downloads/site confeitaraia/dist"
```

## 🔧 URLs Possíveis no Apache:

- `http://localhost/` (se estiver em htdocs)
- `http://localhost/site-confeitaraia/` (se a pasta estiver em htdocs)
- `http://confeitaria.local` (se configurou VirtualHost)

## 💡 Dica Rápida:

**Para desenvolvimento**, use o Vite:
```powershell
npm run dev
# Acesse: http://localhost:3001
```

**Para produção**, use o Apache:
```powershell
npm run build
# Configure Apache para servir a pasta dist/
```





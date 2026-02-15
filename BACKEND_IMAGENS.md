# 🔧 Backend e Imagens - Guia Completo

## 📍 Onde está o Backend?

O backend está em **duas pastas**:

1. **`api/`** - Arquivos PHP da API (principal)
2. **`backend/`** - Backend adicional com configurações

## 🌐 URLs do Backend

### API Principal (porta 8000)
- **URL Base**: `http://localhost:8000/api/`
- **Produtos**: `http://localhost:8000/api/products.php`
- **Produtos em Destaque**: `http://localhost:8000/api/products_featured.php`

### Configuração no Frontend
- **Vite Proxy**: Configurado para `http://localhost:8000`
- **CORS**: Configurado para `http://localhost:3001`

## 🖼️ Por que as Imagens Estão Diferentes?

### 1. **Imagens do Banco de Dados (MySQL)**
- As imagens vêm do banco `confeitaria`
- Tabela: `products`
- Campo: `image` (URLs completas)
- Exemplos de URLs no banco:
  - Unsplash: `https://images.unsplash.com/...`
  - Designi: `https://www.designi.com.br/...`
  - Outras fontes

### 2. **Imagens Mockadas (Fallback)**
- Quando o backend **não está rodando**, o frontend usa dados mockados
- Arquivo: `src/services/mockData.js`
- Arquivo: `src/pages/Home.jsx` (linha 25-56)
- Essas imagens são **diferentes** das do banco!

## 🔍 Como Verificar

### 1. Verificar se o Backend está Rodando

**Opção A: XAMPP (Recomendado)**
1. Abra o XAMPP Control Panel
2. Inicie **Apache** e **MySQL**
3. Acesse: `http://localhost/phpmyadmin`
4. Verifique se o banco `confeitaria` existe

**Opção B: Servidor PHP Manual**
```powershell
# Na pasta api/
php -S localhost:8000
```

### 2. Testar a API

Abra no navegador:
```
http://localhost:8000/api/products.php
```

Você deve ver um JSON com os produtos do banco.

### 3. Verificar no Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por mensagens:
   - ✅ `Dados do banco carregados: X produtos` = Backend funcionando
   - ❌ `Erro ao carregar do banco` = Backend não está rodando
   - 🔄 `Usando dados mock como fallback` = Usando imagens mockadas

## 🔧 Solução: Fazer Backend Funcionar

### Passo 1: Iniciar XAMPP
1. Abra XAMPP Control Panel
2. Clique em "Start" em **Apache**
3. Clique em "Start" em **MySQL**

### Passo 2: Verificar Banco de Dados
1. Acesse: `http://localhost/phpmyadmin`
2. Selecione o banco `confeitaria`
3. Vá na tabela `products`
4. Verifique se há produtos e imagens

### Passo 3: Configurar CORS (se necessário)

Edite `api/products.php`:
```php
header('Access-Control-Allow-Origin: http://localhost:3001');
```

### Passo 4: Verificar Porta da API

No arquivo `src/pages/Admin/AdminProducts.jsx` (linha 42):
- ❌ **Errado**: `http://localhost:8080/api/products.php`
- ✅ **Correto**: `http://localhost:8000/api/products.php`

## 📊 Diferença entre Imagens

### Imagens do Banco (MySQL)
- Vêm do campo `image` da tabela `products`
- Podem ser URLs do Unsplash, Designi, ou outras fontes
- São as imagens **reais** dos produtos

### Imagens Mockadas (Fallback)
- Definidas em `src/services/mockData.js`
- Usadas quando o backend não está disponível
- São **diferentes** das imagens do banco

## 🎯 Como Usar Apenas Imagens do Banco

1. **Inicie o XAMPP** (Apache + MySQL)
2. **Verifique se a API está funcionando**: `http://localhost:8000/api/products.php`
3. **Recarregue o site**: `http://localhost:3001`
4. **Verifique no console**: Deve aparecer "Dados do banco carregados"

## 🐛 Problemas Comuns

### "Erro ao conectar com banco de dados"
- **Solução**: Verifique se MySQL está rodando no XAMPP

### "CORS error"
- **Solução**: Verifique se `api/products.php` tem o header CORS correto

### "Porta 8000 em uso"
- **Solução**: Feche outros programas usando a porta 8000

### Imagens diferentes aparecendo
- **Causa**: Backend não está rodando, usando dados mockados
- **Solução**: Inicie o XAMPP (Apache + MySQL)

## 📝 Resumo

- **Backend**: `api/` e `backend/`
- **Porta**: `8000` (não 8080!)
- **Banco**: `confeitaria` no MySQL
- **Imagens diferentes**: Backend não está rodando → usando mock data
- **Solução**: Iniciar XAMPP (Apache + MySQL)





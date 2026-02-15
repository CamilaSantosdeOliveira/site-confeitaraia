# 🚀 Configurar Backend para Iniciar Automaticamente

## 🎯 Objetivo
Fazer o backend iniciar automaticamente quando você liga o computador.

## ✅ Método 1: Agendador de Tarefas (Recomendado)

### Passo 1: Abrir Agendador de Tarefas

1. Pressione `Win + R`
2. Digite: `taskschd.msc`
3. Pressione Enter

### Passo 2: Criar Nova Tarefa

1. **Clique em "Criar Tarefa Básica"** (lado direito)
2. **Nome**: `Backend PHP - Porta 8000`
3. **Descrição**: `Inicia servidor PHP na porta 8000 automaticamente`
4. **Clique "Avançar"**

### Passo 3: Configurar Gatilho

1. **Quando deseja iniciar a tarefa?**
   - Selecione: **"Quando o computador for iniciado"**
2. **Clique "Avançar"**

### Passo 4: Configurar Ação

1. **Que ação você deseja executar?**
   - Selecione: **"Iniciar um programa"**
2. **Clique "Avançar"**

3. **Configurar programa:**
   - **Programa/script**: 
     ```
     C:\xampp\php\php.exe
     ```
   - **Adicionar argumentos**:
     ```
     -S localhost:8000
     ```
   - **Iniciar em**:
     ```
     C:\Users\camil\Downloads\site confeitaraia\api
     ```
4. **Clique "Avançar"**

### Passo 5: Finalizar

1. **Marque**: "Abrir a caixa de diálogo Propriedades..."
2. **Clique "Concluir"**

### Passo 6: Configurações Avançadas

Na janela de propriedades que abriu:

1. **Aba "Geral"**:
   - ✅ Marque: "Executar se o usuário estiver ou não conectado"
   - ✅ Marque: "Executar com privilégios mais altos"
   - ✅ Marque: "Ocultar quando executar"

2. **Aba "Condições"**:
   - ✅ Desmarque: "Iniciar a tarefa apenas se o computador estiver conectado à energia CA"
   - ✅ Marque: "Acordar o computador para executar esta tarefa"

3. **Aba "Configurações"**:
   - ✅ Marque: "Permitir que a tarefa seja executada sob demanda"
   - ✅ Marque: "Se a tarefa já estiver em execução, aplicar a seguinte regra: Não iniciar uma nova instância"

4. **Clique "OK"**

### Passo 7: Testar

1. **Reinicie o computador**
2. **Aguarde alguns segundos**
3. **Abra no navegador**: `http://localhost:8000/products.php`
4. **Se aparecer JSON**: ✅ Funcionando!

## ✅ Método 2: Usar Script Automático

**Mais simples, mas precisa executar manualmente:**

1. **Clique duas vezes em**:
   ```
   INICIAR_BACKEND_SERVICO.bat
   ```

2. **O backend inicia em background**
   - Pode fechar tudo
   - Continua rodando

3. **Para parar**:
   ```
   PARAR_BACKEND.bat
   ```

## ✅ Método 3: XAMPP Apache como Serviço (Mais Permanente)

### Configurar Apache para rodar sempre:

1. **Abra XAMPP Control Panel**
2. **Ao lado de "Apache"**, clique no botão **"Service"**
3. **Marque "Install"**
4. **Apache será instalado como serviço**

**Agora o Apache:**
- ✅ Inicia automaticamente com o Windows
- ✅ Roda sempre em background
- ✅ Não para quando fecha programas

### Configurar Porta 8000 no Apache:

1. **Edite** `C:\xampp\apache\conf\httpd.conf`
2. **Adicione**:
   ```apache
   Listen 8000
   ```

3. **Edite** `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
4. **Adicione**:
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

5. **Reinicie o Apache** no XAMPP

## 🎯 Qual Método Usar?

| Método | Facilidade | Permanência | Recomendado |
|--------|-----------|-------------|-------------|
| Script Manual | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Para teste |
| Agendador de Tarefas | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Melhor |
| XAMPP Serviço | ⭐⭐ | ⭐⭐⭐⭐⭐ | Para produção |

## 💡 Recomendação

**Para uso diário:**
- Use `INICIAR_BACKEND_SERVICO.bat`
- Roda em background
- Não precisa deixar terminal aberto

**Para iniciar automaticamente:**
- Configure Agendador de Tarefas
- Backend inicia sozinho ao ligar o PC

## ✅ Após Configurar

1. **Reinicie o computador**
2. **Aguarde 10 segundos**
3. **Acesse**: `http://localhost:8000/products.php`
4. **Se aparecer JSON**: ✅ Configurado com sucesso!

## 🔄 Resumo

**Antes:**
- ❌ Backend para ao fechar Cursor
- ❌ Precisa iniciar manualmente sempre

**Depois:**
- ✅ Backend roda em background
- ✅ Inicia automaticamente (se configurado)
- ✅ Não para ao fechar programas
- ✅ Funciona sempre!





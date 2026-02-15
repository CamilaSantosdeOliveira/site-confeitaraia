# 🔍 Diagnóstico: Tela Vazia

## ✅ Porta Correta
- **Porta configurada**: `3001` (vite.config.js)
- **URL correta**: `http://localhost:3001`

## 🔧 Passos para Resolver

### 1. Verificar se o Servidor está Rodando

Abra o terminal e execute:
```powershell
npm run dev
```

Você deve ver algo como:
```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:3001/
➜  Network: http://192.168.x.x:3001/
```

### 2. Verificar no Navegador

1. **Abra o DevTools** (F12)
2. **Vá na aba "Console"**
3. **Procure por erros em vermelho**

### 3. Limpar Cache

1. **Pressione `Ctrl + Shift + Delete`**
2. **Selecione "Imagens e arquivos em cache"**
3. **Limpar dados**
4. **Recarregar a página** (`Ctrl + F5`)

### 4. Verificar se está Acessando a Porta Correta

- ✅ **Correto**: `http://localhost:3001`
- ❌ **Errado**: `http://localhost:3000` (porta antiga)

### 5. Reiniciar Tudo

1. **Pare o servidor** (Ctrl + C no terminal)
2. **Feche o navegador completamente**
3. **Execute novamente**:
   ```powershell
   npm run dev
   ```
4. **Abra o navegador** e acesse: `http://localhost:3001`

### 6. Verificar Erros Comuns

#### Erro: "Cannot find module"
**Solução**: Reinstale as dependências
```powershell
npm install
```

#### Erro: "Port already in use"
**Solução**: A porta 3001 está ocupada
```powershell
# Windows - Encontrar processo na porta 3001
netstat -ano | findstr :3001

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

#### Tela completamente branca
**Possíveis causas**:
- Erro JavaScript no console
- Componente não exportado corretamente
- Erro de importação

**Solução**: Verifique o console do navegador (F12)

## 📋 Checklist Rápido

- [ ] Servidor rodando? (`npm run dev`)
- [ ] Porta correta? (`http://localhost:3001`)
- [ ] Sem erros no console? (F12 → Console)
- [ ] Cache limpo? (Ctrl + Shift + Delete)
- [ ] Dependências instaladas? (`npm install`)

## 🆘 Se Nada Funcionar

1. **Copie TODOS os erros do console** (F12 → Console)
2. **Verifique se o Node.js está atualizado**:
   ```powershell
   node --version
   ```
   (Deve ser 16 ou superior)

3. **Tente em outro navegador** (Chrome, Firefox, Edge)

4. **Verifique se há processos na porta 3001**:
   ```powershell
   netstat -ano | findstr :3001
   ```





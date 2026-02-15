# 🔧 Solução: Tela Branca no Site

## 🔍 Passo 1: Verificar o Console do Navegador

1. **Abra o DevTools**:
   - Pressione `F12` ou `Ctrl + Shift + I`
   - Ou clique com botão direito → "Inspecionar"

2. **Vá na aba "Console"**

3. **Procure por erros em vermelho**

## 🐛 Erros Comuns e Soluções

### Erro: "Cannot find module" ou "Failed to resolve"
**Solução**: Reinstale as dependências
```powershell
npm install
```

### Erro: "Uncaught SyntaxError"
**Solução**: Limpe o cache e reinicie
```powershell
# Pare o servidor (Ctrl + C)
# Limpe o cache
npm run build
# Reinicie
npm run dev
```

### Erro: "Cannot read property of undefined"
**Solução**: Verifique se todos os componentes estão importados corretamente

### Erro relacionado a "CartContext" ou "AuthContext"
**Solução**: Verifique se os arquivos existem em `src/contexts/`

## 🔄 Solução Rápida: Reiniciar Tudo

1. **Pare o servidor** (Ctrl + C no terminal)

2. **Limpe o cache do navegador**:
   - Pressione `Ctrl + Shift + Delete`
   - Ou use `Ctrl + F5` para recarregar forçado

3. **Reinstale dependências**:
   ```powershell
   npm install
   ```

4. **Reinicie o servidor**:
   ```powershell
   npm run dev
   ```

5. **Acesse novamente**: http://localhost:3001

## 📋 Verificações Importantes

### ✅ Verifique se está usando o servidor Vite (não Apache)
- O servidor Vite precisa estar rodando
- Execute: `npm run dev`
- Acesse: `http://localhost:3001`

### ✅ Se estiver usando Apache
- Você precisa fazer build primeiro:
  ```powershell
  npm run build
  ```
- Configure o Apache para servir a pasta `dist/`

## 🆘 Se Nada Funcionar

1. **Copie o erro completo do console** (F12 → Console)
2. **Verifique se o Node.js está atualizado**:
   ```powershell
   node --version
   ```
   (Deve ser 16 ou superior)

3. **Verifique se todas as dependências estão instaladas**:
   ```powershell
   npm list --depth=0
   ```

## 💡 Dica

Se você está usando **Apache**, mas a aplicação é **React/Vite**, você precisa:
- **Para desenvolvimento**: Usar `npm run dev` (porta 3001)
- **Para produção**: Fazer `npm run build` e servir a pasta `dist/` pelo Apache





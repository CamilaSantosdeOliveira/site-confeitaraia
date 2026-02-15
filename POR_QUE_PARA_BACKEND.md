# 🔍 Por que o Backend Para Quando Fecho o Cursor/Navegador?

## ❌ O Problema

Quando você:
- Fecha o Cursor
- Fecha o navegador
- Fecha o terminal onde o backend está rodando

O **backend para de funcionar**!

## 🔍 Por que isso acontece?

### O servidor PHP precisa estar RODANDO

O servidor PHP (`php -S localhost:8000`) é um **processo** que:
- ✅ Precisa estar **sempre rodando** em um terminal
- ❌ Para quando você **fecha o terminal**
- ❌ Para quando você **fecha o Cursor** (se foi iniciado por ele)

### Analogia

É como uma **lâmpada**:
- Se você **desligar a energia** (fechar terminal), a lâmpada apaga
- O backend precisa de **energia constante** (terminal aberto)

## ✅ Soluções

### Solução 1: Terminal Separado (Recomendado)

**NÃO inicie o backend pelo Cursor!**

1. **Abra um terminal Windows normal** (não pelo Cursor)
2. **Execute**:
   ```powershell
   cd "C:\Users\camil\Downloads\site confeitaraia"
   .\INICIAR_BACKEND_SEMPRE.bat
   ```
3. **Deixe este terminal aberto** sempre
4. **Feche o Cursor à vontade** - o backend continua rodando!

### Solução 2: Script VBS (Inicia em Janela Separada)

**Clique duas vezes em:**
```
INICIAR_BACKEND_OCULTO.vbs
```

Isso abre o backend em uma **janela separada** que não depende do Cursor.

### Solução 3: Usar XAMPP Apache (Permanente)

**Configurar Apache do XAMPP para rodar sempre:**

1. **Abra XAMPP Control Panel**
2. **Inicie Apache** (fica rodando sempre)
3. **Configure VirtualHost** para porta 8000
4. **Apache roda como serviço** - não para quando fecha programas

## 🎯 Melhor Prática

### Para Desenvolvimento:

**Use 2 terminais separados:**

**Terminal 1 - Frontend:**
```powershell
npm run dev
```
- Pode fechar quando não estiver desenvolvendo

**Terminal 2 - Backend:**
```powershell
INICIAR_BACKEND_SEMPRE.bat
```
- **DEIXE SEMPRE ABERTO!**
- Só fecha quando não for mais usar o site

### Para Produção:

**Use XAMPP Apache:**
- Roda como serviço do Windows
- Inicia automaticamente com o Windows
- Não para quando fecha programas

## 📋 Checklist

- [ ] Backend iniciado em terminal separado?
- [ ] Terminal do backend está aberto?
- [ ] Não fechou o terminal do backend?
- [ ] Backend ainda responde? (`http://localhost:8000/products.php`)

## 💡 Dica Pro

**Crie um atalho na área de trabalho:**

1. Clique direito em `INICIAR_BACKEND_SEMPRE.bat`
2. "Criar atalho"
3. Arraste para área de trabalho
4. Clique duas vezes sempre que for usar o site

Assim você não precisa abrir o Cursor só para iniciar o backend!

## 🔄 Resumo

**Por que para:**
- Backend é um processo que precisa de terminal aberto
- Fechar terminal = matar processo

**Solução:**
- Use terminal separado (não do Cursor)
- Ou use XAMPP Apache (permanente)
- Deixe sempre rodando enquanto usa o site





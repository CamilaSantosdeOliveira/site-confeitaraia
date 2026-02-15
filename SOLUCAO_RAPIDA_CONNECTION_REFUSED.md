# 🔧 Solução Rápida: ERR_CONNECTION_REFUSED

## ❌ Erro que você está vendo:

```
ERR_CONNECTION_REFUSED
localhost recusou estabelecer ligação
```

## ✅ O que isso significa?

Os servidores (backend e frontend) **não estão rodando**!

## 🚀 Solução Rápida (3 passos)

### Passo 1: Verificar Status

Execute este arquivo para ver o que está rodando:
```
VERIFICAR_SERVIDORES.bat
```

### Passo 2: Iniciar Servidores

Execute este arquivo para iniciar tudo:
```
INICIAR_AGORA.bat
```

### Passo 3: Aguardar e Testar

1. **Aguarde 5-10 segundos** após executar o script
2. **Abra o navegador** e acesse:
   - Frontend: `http://localhost:3001`
   - Backend: `http://localhost:8000/products.php`

## 📋 O que cada script faz:

### `VERIFICAR_SERVIDORES.bat`
- Verifica se backend está rodando (porta 8000)
- Verifica se frontend está rodando (porta 3001)
- Mostra o status de cada servidor

### `INICIAR_AGORA.bat`
- Verifica se já estão rodando (não inicia duplicado)
- Inicia backend se não estiver rodando
- Inicia frontend se não estiver rodando
- Mostra status final

### `INICIAR_TUDO.bat`
- Inicia tudo do zero (mesmo se já estiver rodando)
- Abre janelas visíveis
- Útil para primeira vez ou quando há problemas

## ⚠️ Problemas Comuns

### 1. "Node.js não encontrado"
**Solução:** Instale o Node.js em https://nodejs.org/

### 2. "PHP não encontrado"
**Solução:** Instale o XAMPP em https://www.apachefriends.org/

### 3. "Porta já está em uso"
**Solução:** 
- Execute `VERIFICAR_SERVIDORES.bat` para ver o que está usando
- Feche outros programas que usam as portas 8000 ou 3001

### 4. "Servidores param ao fechar janela"
**Solução:** Isso é normal! Use `INICIAR_BACKEND_SERVICO.bat` para rodar em background

## 🎯 Passos Recomendados

1. **Execute**: `VERIFICAR_SERVIDORES.bat`
2. **Se não estiver rodando**: Execute `INICIAR_AGORA.bat`
3. **Aguarde 10 segundos**
4. **Acesse**: `http://localhost:3001`

## 💡 Dica

Se você quer que os servidores iniciem automaticamente ao ligar o notebook:
- Execute: `CONFIGURAR_INICIO_AUTOMATICO_SIMPLES.bat`

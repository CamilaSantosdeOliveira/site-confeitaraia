# 📦 Instalação do Node.js

## 🚨 IMPORTANTE: Node.js não encontrado!

Para usar este projeto, você precisa instalar o Node.js primeiro.

## 📥 Como Instalar

### Opção 1: Download Direto (Recomendado)
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador
4. Siga as instruções na tela
5. Reinicie o computador

### Opção 2: Chocolatey (Windows)
```bash
# Instalar Chocolatey primeiro (se não tiver)
# Depois execute:
choco install nodejs
```

### Opção 3: NVM (Node Version Manager)
```bash
# Windows
# Baixe nvm-windows: https://github.com/coreybutler/nvm-windows

# Linux/Mac
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

## ✅ Verificar Instalação

Após instalar, abra um **novo** terminal e execute:

```bash
node --version
npm --version
```

Você deve ver algo como:
```
v18.17.0
9.6.7
```

## 🔧 Configuração Adicional

### Proxy (se necessário)
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Registry (se necessário)
```bash
npm config set registry https://registry.npmjs.org/
```

## 🚀 Após Instalar Node.js

1. **Feche e abra um novo terminal**
2. **Navegue até a pasta do projeto**
3. **Execute os comandos:**

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## 🐛 Problemas Comuns

### "npm não é reconhecido"
- **Solução**: Reinicie o computador após instalar
- **Alternativa**: Adicione Node.js ao PATH manualmente

### "Erro de permissão"
- **Solução**: Execute o terminal como administrador
- **Alternativa**: Use `sudo` (Linux/Mac)

### "Proxy bloqueado"
- **Solução**: Configure o proxy do npm
- **Alternativa**: Use uma rede sem proxy

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique se o Node.js foi instalado corretamente
2. Confirme se o PATH está configurado
3. Tente reinstalar o Node.js
4. Consulte a documentação oficial: https://nodejs.org/

---

**🎯 Depois de instalar o Node.js, volte ao arquivo `COMO_USAR.md` para continuar!**


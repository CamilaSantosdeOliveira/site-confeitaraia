# 🌐 Como Visualizar o Site

## 🚨 IMPORTANTE: Node.js Necessário

**Antes de tudo, você precisa instalar o Node.js!**

### 📥 Instalar Node.js
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (botão verde)
3. Execute o instalador
4. **Reinicie o computador**
5. Abra um novo terminal

## 🚀 Visualizar o Site

### Opção 1: Script Automático (Mais Fácil)
```bash
# Windows - Clique duas vezes no arquivo:
start-dev.bat

# Linux/Mac - Execute no terminal:
./start-dev.sh
```

### Opção 2: Manual
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor
npm run dev
```

## 📱 Acessos

Após executar os comandos acima, você verá:

```
  VITE v4.4.9  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

### 🌐 Links para Acessar:

- **Frontend (Site Principal)**: http://localhost:3000
- **Backend (API)**: http://localhost:8000/api
- **Produtos da API**: http://localhost:8000/api/products

## 🎯 O que Você Verá

### Página Inicial (http://localhost:3000)
- ✅ **Header** com navegação e carrinho
- ✅ **Hero Section** com slides automáticos
- ✅ **Produtos em Destaque** com grid responsivo
- ✅ **Seção "Sobre Nós"** com animações
- ✅ **Footer** com informações de contato

### Funcionalidades Disponíveis
- ✅ **Navegação** entre páginas
- ✅ **Carrinho de Compras** (adicionar/remover produtos)
- ✅ **Design Responsivo** (mobile, tablet, desktop)
- ✅ **Animações Suaves** ao rolar a página
- ✅ **PWA** (instalável no celular)

## 🐛 Problemas Comuns

### "npm não é reconhecido"
**Solução**: Node.js não está instalado ou não foi reiniciado o computador
1. Instale o Node.js: https://nodejs.org/
2. **Reinicie o computador**
3. Abra um novo terminal

### "Porta 3000 em uso"
**Solução**: Outro programa está usando a porta
1. Feche outros navegadores/servidores
2. Ou mude a porta no `vite.config.js`

### "Erro de conexão"
**Solução**: Verifique se o servidor está rodando
1. Confirme que o terminal mostra "ready in XXX ms"
2. Verifique se não há erros no terminal
3. Tente acessar http://localhost:3000 diretamente

### "Página em branco"
**Solução**: Pode ser cache do navegador
1. Pressione `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)
2. Ou abra em aba anônima/privada
3. Verifique o console do navegador (F12) para erros

## 📱 Teste no Mobile

### Opção 1: Rede Local
1. Descubra o IP do seu computador:
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. Acesse no celular:
   ```
   http://SEU_IP:3000
   ```

### Opção 2: PWA
1. Acesse http://localhost:3000 no celular
2. Adicione à tela inicial
3. Use como app nativo

## 🔧 Desenvolvimento

### Estrutura de Arquivos
```
src/
├── pages/Home.jsx          # Página inicial
├── components/Header.jsx    # Cabeçalho
├── components/Footer.jsx    # Rodapé
└── contexts/CartContext.jsx # Carrinho
```

### Personalizar
- **Cores**: Edite `tailwind.config.js`
- **Conteúdo**: Edite `src/pages/Home.jsx`
- **Estilos**: Edite `src/index.css`
- **Produtos**: Edite o array em `Home.jsx`

## 🎨 Recursos Visuais

### Cores do Site
- **Rosa Principal**: #FF6B9D
- **Rosa Claro**: #FFB6C1
- **Dourado**: #FFD700
- **Branco**: #FFFFFF
- **Cinza**: #6B7280

### Fontes
- **Títulos**: Dancing Script (elegante)
- **Texto**: Montserrat (legível)

### Animações
- Fade in ao carregar
- Slide up ao rolar
- Hover effects
- Transições suaves

## 📊 Performance

### Otimizações Implementadas
- ✅ **Lazy Loading** de imagens
- ✅ **Code Splitting** automático
- ✅ **Minificação** em produção
- ✅ **Cache** do service worker
- ✅ **Compressão** de assets

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Próximos Passos

### Para Expandir o Site
1. **Adicionar mais páginas** (Menu, About, Contact)
2. **Implementar sistema de pedidos**
3. **Criar painel administrativo**
4. **Adicionar sistema de pagamento**
5. **Implementar upload de imagens**

### Para Deploy
1. **Build para produção**: `npm run build`
2. **Configurar servidor web** (Apache/Nginx)
3. **Configurar domínio e SSL**
4. **Configurar banco de dados MySQL**

---

**🎉 Agora você pode visualizar seu site profissional no navegador!**

**Link principal**: http://localhost:3000













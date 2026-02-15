# 🍰 Confeitária Delícias - Como Usar

## 🚀 Início Rápido

### Opção 1: Script Automático (Recomendado)
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

### Opção 2: Manual
```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados (se tiver MySQL)
setup-database.bat

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

## 📱 Acessos

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **phpMyAdmin**: http://localhost/phpmyadmin (se usar XAMPP)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool rápida
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animações
- **React Query** - Gerenciamento de estado
- **React Router** - Navegação

### Backend
- **PHP 8+** - Linguagem backend
- **MySQL** - Banco de dados
- **PDO** - Conexão com banco
- **JWT** - Autenticação

### Ferramentas
- **Docker** - Containerização
- **ESLint** - Linting de código
- **Prettier** - Formatação
- **PWA** - Progressive Web App

## 📁 Estrutura do Projeto

```
site-confeitaraia/
├── src/                    # Código React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── contexts/          # Contextos React
│   └── services/          # Serviços de API
├── backend/               # Código PHP
│   ├── api/              # Endpoints da API
│   ├── config/           # Configurações
│   ├── models/           # Modelos de dados
│   └── database/         # Scripts SQL
├── public/               # Arquivos públicos
└── docs/                 # Documentação
```

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Estrutura React moderna
- [x] Sistema de rotas
- [x] Contexto de carrinho
- [x] Contexto de autenticação
- [x] API de produtos
- [x] Banco de dados MySQL
- [x] Design responsivo
- [x] PWA configurado
- [x] Docker configurado

### 🚧 Em Desenvolvimento
- [ ] Páginas completas (Menu, About, Contact)
- [ ] Sistema de pedidos
- [ ] Painel administrativo
- [ ] Sistema de pagamento
- [ ] Notificações
- [ ] Newsletter

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build para produção
npm run preview          # Preview do build

# Banco de dados
setup-database.bat       # Configura banco (Windows)
php backend/config/database.local.php  # Testa conexão

# Docker
docker-compose up        # Inicia todos os serviços
docker-compose down      # Para todos os serviços

# Qualidade de código
npm run lint             # Verifica código
npm run lint:fix         # Corrige problemas
npm run format           # Formata código
```

## 🐛 Solução de Problemas

### Erro: "Node.js não encontrado"
- Instale o Node.js: https://nodejs.org/

### Erro: "MySQL não encontrado"
- Instale o MySQL ou XAMPP
- Ou use apenas o frontend (sem backend)

### Erro: "Porta 3000 em uso"
- Feche outros servidores
- Ou mude a porta no `vite.config.js`

### Erro: "Conexão com banco falhou"
- Verifique se o MySQL está rodando
- Confirme usuário/senha no `database.local.php`

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências estão instaladas
2. Confirme se as portas não estão em uso
3. Teste a conexão com o banco de dados
4. Consulte os logs de erro

## 🎨 Personalização

### Cores
Edite `tailwind.config.js` para mudar as cores:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#FF6B9D',    // Cor principal
      secondary: '#FFB6C1',  // Cor secundária
      accent: '#FFD700'      // Cor de destaque
    }
  }
}
```

### Logo e Imagens
Substitua os arquivos em `public/`:
- `logo.png` - Logo da empresa
- `favicon.ico` - Ícone do site
- `manifest.json` - Configurações PWA

### Conteúdo
Edite os componentes em `src/pages/` para personalizar:
- Textos
- Imagens
- Produtos
- Informações de contato

## 🚀 Deploy

### Produção
```bash
# Build do frontend
npm run build:prod

# Configurar servidor web (Apache/Nginx)
# Configurar banco de dados MySQL
# Configurar domínio e SSL
```

### Docker
```bash
# Build da imagem
docker build -t confeitaria .

# Executar container
docker run -p 80:80 confeitaria
```

---

**🎉 Parabéns! Seu site profissional está pronto para uso!**













# 🍰 Doçuras & Sabores - Site Profissional de Confeitaria

Site profissional de confeitaria desenvolvido com React, PHP e MySQL. Sistema completo com carrinho de compras, painel administrativo, autenticação e muito mais!

## ✨ Funcionalidades

- 🛒 **Carrinho de Compras** - Sistema completo de carrinho com persistência
- 👤 **Autenticação** - Login e registro de usuários
- 📦 **Painel Administrativo** - Gerenciamento de produtos, pedidos e clientes
- 💳 **Sistema de Pagamento** - Integração com gateways de pagamento
- 📱 **PWA** - Progressive Web App (funciona offline)
- 🎨 **Design Moderno** - Interface responsiva e animada
- 🔍 **Busca e Filtros** - Busca avançada de produtos
- ⭐ **Sistema de Avaliações** - Clientes podem avaliar produtos
- 📊 **Dashboard** - Estatísticas e relatórios

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **React Router** - Roteamento de páginas
- **React Query** - Gerenciamento de estado do servidor
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas
- **Axios** - Cliente HTTP

### Backend
- **PHP 8+** - Linguagem de programação
- **MySQL** - Banco de dados relacional
- **RESTful API** - Arquitetura de API

### Ferramentas
- **Vitest** - Framework de testes
- **ESLint** - Linter de código
- **Prettier** - Formatador de código

## 📋 Pré-requisitos

- Node.js 18+ ([Download](https://nodejs.org/))
- PHP 8+ ou XAMPP ([Download](https://www.apachefriends.org/))
- MySQL 8+ ou MariaDB
- Git

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/confeitaria-site.git
cd confeitaria-site
```

### 2. Instale as dependências do frontend

```bash
npm install
```

### 3. Configure o backend

1. Importe o banco de dados:
   ```bash
   mysql -u root -p < database/setup_database.sql
   ```

2. Configure as credenciais do banco em `api/config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'confeitaria_db');
   define('DB_USER', 'root');
   define('DB_PASSWORD', '');
   ```

### 4. Inicie os servidores

**Opção 1: Script Automático (Recomendado)**
```bash
# Windows
INICIAR_TUDO.bat

# Linux/Mac
./INICIAR_TUDO.sh
```

**Opção 2: Manual**

Terminal 1 - Backend:
```bash
cd api
php -S localhost:8000
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 5. Acesse o site

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8000

## 📁 Estrutura do Projeto

```
confeitaria-site/
├── src/                    # Código fonte do frontend
│   ├── components/         # Componentes React reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── contexts/          # Context API (estado global)
│   ├── services/          # Serviços de API
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Funções utilitárias
│   └── tests/             # Testes automatizados
├── api/                   # Backend PHP
│   ├── config.php         # Configurações do banco
│   ├── products.php        # API de produtos
│   └── ...
├── database/              # Scripts SQL
├── public/                # Arquivos estáticos
└── docs/                  # Documentação
```

## 🧪 Testes

Execute os testes:

```bash
npm run test
```

Execute testes com cobertura:

```bash
npm run test:coverage
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Verifica erros de código
- `npm run lint:fix` - Corrige erros automaticamente
- `npm run test` - Executa testes
- `npm run format` - Formata código com Prettier

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Doçuras & Sabores
```

### Banco de Dados

As configurações do banco estão em `api/config.php`. Ajuste conforme necessário.

## 🚀 Deploy

### Frontend (Vercel/Netlify)

1. Faça build do projeto:
   ```bash
   npm run build
   ```

2. Faça deploy da pasta `dist/` na Vercel ou Netlify

### Backend

Configure um servidor PHP (Apache/Nginx) e faça upload da pasta `api/`.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Doçuras & Sabores**
- Site: [docurasesabores.com.br](https://docurasesabores.com.br)
- Email: contato@docurasesabores.com.br

## 🙏 Agradecimentos

- React Team
- Vite Team
- Tailwind CSS
- Comunidade open source

---

**Desenvolvido com ❤️ para Doçuras & Sabores**

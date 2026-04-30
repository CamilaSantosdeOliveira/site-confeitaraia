# 🍰 Doçuras & Sabores - Confeitaria Profissional

Sistema web completo para uma confeitaria, desenvolvido com foco em experiência do usuário, área do cliente, carrinho de compras, gerenciamento de endereços e painel administrativo.

## 📌 Sobre o projeto

O **Doçuras & Sabores** é uma aplicação web para uma confeitaria fictícia/profissional, permitindo que clientes visualizem produtos, adicionem itens ao carrinho, gerenciem dados pessoais e acompanhem informações da conta. O projeto também conta com área administrativa para gerenciamento do negócio.

Este projeto foi desenvolvido como parte do meu portfólio para demonstrar conhecimentos em desenvolvimento front-end, integração com backend, consumo de APIs, autenticação, gerenciamento de estado e persistência de dados.

## 🚀 Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## ✨ Funcionalidades

### Área pública

- Página inicial com apresentação da confeitaria
- Catálogo de produtos
- Página sobre a empresa
- Seção de equipe com fotos dos colaboradores
- Layout responsivo
- Interface moderna com animações

### Área do cliente

- Login e autenticação de usuário
- Visualização e edição do perfil
- Gerenciamento de endereços
- Adicionar novo endereço
- Editar endereço existente
- Excluir endereço
- Definir endereço principal
- Feedback visual com notificações

### Carrinho e pedidos

- Adicionar produtos ao carrinho
- Gerenciar itens selecionados
- Estrutura preparada para fluxo de pedidos

### Painel administrativo

- Dashboard administrativo
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Gerenciamento de clientes
- Interface responsiva para administração

## 🧠 O que aprendi com este projeto

- Organização de um projeto React com múltiplas páginas
- Criação de componentes reutilizáveis
- Consumo de APIs com JavaScript
- Integração entre frontend React e backend PHP
- Persistência de dados com MySQL
- Tratamento de erros no frontend e backend
- Controle de versão com Git e GitHub
- Criação de uma interface responsiva usando TailwindCSS

## 📁 Estrutura do projeto

```text
site-confeitaraia/
├── api/                 # Endpoints PHP da aplicação
├── backend/             # Configurações e estrutura backend
├── public/              # Arquivos públicos e imagens
├── src/                 # Código fonte React
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Contextos globais
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Serviços e chamadas de API
│   └── hooks/           # Hooks personalizados
├── package.json         # Dependências do frontend
└── README.md            # Documentação do projeto
```

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js
- npm
- PHP
- MySQL

### Passos

Clone o repositório:

```bash
git clone https://github.com/CamilaSantosdeOliveira/site-confeitaraia.git
```

Acesse a pasta do projeto:

```bash
cd site-confeitaraia
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3001
```

## 🔐 Configuração do backend

O projeto utiliza PHP e MySQL para persistência de dados. As configurações principais ficam em:

```text
backend/config.php
```

Banco de dados utilizado no ambiente local:

```text
Database: confeitaria
User: root
Password: vazio
```

## 📸 Prints do projeto

Em breve serão adicionadas imagens das principais telas do sistema.

## 📌 Melhorias futuras

- Finalizar fluxo completo de checkout
- Adicionar integração real de pagamento
- Melhorar documentação da API
- Criar testes automatizados
- Publicar deploy online
- Adicionar prints no README

## 👩‍💻 Desenvolvedora

Desenvolvido por **Camila Santos de Oliveira**.

- GitHub: [CamilaSantosdeOliveira](https://github.com/CamilaSantosdeOliveira)
- LinkedIn: [Camila Santos](https://www.linkedin.com/in/camila-santos-dev)

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.

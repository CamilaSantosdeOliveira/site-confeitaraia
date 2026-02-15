#!/bin/bash

echo "========================================"
echo "   CONFEITARIA DELICIAS - DEV SETUP"
echo "========================================"
echo

echo "[1/5] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não encontrado!"
    echo "Instale o Node.js em: https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js encontrado"

echo
echo "[2/5] Instalando dependências do frontend..."
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências!"
    exit 1
fi
echo "✓ Dependências instaladas"

echo
echo "[3/5] Verificando PHP..."
if ! command -v php &> /dev/null; then
    echo "AVISO: PHP não encontrado!"
    echo "Instale o PHP para usar o backend completo"
    echo "Continuando apenas com frontend..."
    PHP_AVAILABLE=false
else
    echo "✓ PHP encontrado"
    PHP_AVAILABLE=true
fi

echo
echo "[4/5] Verificando MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "AVISO: MySQL não encontrado!"
    echo "Instale o MySQL para usar o banco de dados"
    echo "Continuando apenas com frontend..."
    MYSQL_AVAILABLE=false
else
    echo "✓ MySQL encontrado"
    MYSQL_AVAILABLE=true
fi

echo
echo "[5/5] Iniciando servidor de desenvolvimento..."
echo
echo "========================================"
echo "   AMBIENTE DE DESENVOLVIMENTO"
echo "========================================"
echo
echo "Frontend: http://localhost:3000"
if [ "$PHP_AVAILABLE" = true ]; then
    echo "Backend:  http://localhost:8000/api"
fi
echo
echo "Pressione Ctrl+C para parar os servidores"
echo

if [ "$PHP_AVAILABLE" = true ]; then
    echo "Iniciando frontend e backend..."
    # Inicia o frontend em background
    npm run dev &
    FRONTEND_PID=$!
    
    # Aguarda 3 segundos
    sleep 3
    
    # Inicia o backend em background
    cd backend && php -S localhost:8000 &
    BACKEND_PID=$!
    
    echo "Servidores iniciados com sucesso!"
    echo "Frontend PID: $FRONTEND_PID"
    echo "Backend PID: $BACKEND_PID"
    echo
    echo "Pressione Ctrl+C para parar..."
    
    # Aguarda interrupção
    trap "echo 'Parando servidores...'; kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit" INT
    wait
else
    echo "Iniciando apenas frontend..."
    npm run dev
fi













@echo off
echo ========================================
echo    INICIANDO BACKEND PHP
echo ========================================
echo.

echo Verificando PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: PHP nao encontrado!
    echo.
    echo Opcoes:
    echo 1. Instale o PHP: https://windows.php.net/download/
    echo 2. Ou use o XAMPP (ja vem com PHP)
    echo.
    pause
    exit /b 1
)

echo PHP encontrado!
echo.
echo Iniciando servidor PHP na porta 8000...
echo.
echo Backend: http://localhost:8000
echo API:     http://localhost:8000/products.php
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

cd /d "%~dp0api"
php -S localhost:8000





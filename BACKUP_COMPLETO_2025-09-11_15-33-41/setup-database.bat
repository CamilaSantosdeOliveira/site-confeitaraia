@echo off
echo ========================================
echo    CONFIGURACAO DO BANCO DE DADOS
echo ========================================
echo.

echo [1/4] Verificando MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: MySQL nao encontrado!
    echo Instale o MySQL em: https://dev.mysql.com/downloads/
    echo Ou use XAMPP: https://www.apachefriends.org/
    pause
    exit /b 1
)
echo ✓ MySQL encontrado

echo.
echo [2/4] Verificando PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: PHP nao encontrado!
    echo Instale o PHP para usar o backend
    pause
    exit /b 1
)
echo ✓ PHP encontrado

echo.
echo [3/4] Testando conexao com banco de dados...
cd /d "%~dp0"
php backend/config/database.local.php
if errorlevel 1 (
    echo ERRO: Falha ao configurar banco de dados!
    echo Verifique se o MySQL esta rodando
    pause
    exit /b 1
)

echo.
echo [4/4] Configuracao concluida!
echo.
echo ========================================
echo    BANCO DE DADOS CONFIGURADO
echo ========================================
echo.
echo ✓ Banco: confeitaria_db
echo ✓ Usuario: root
echo ✓ Senha: (vazia)
echo ✓ Host: localhost
echo ✓ Porta: 3306
echo.
echo Para acessar o phpMyAdmin:
echo http://localhost/phpmyadmin
echo.
echo Para testar a API:
echo http://localhost:8000/api/products
echo.
pause


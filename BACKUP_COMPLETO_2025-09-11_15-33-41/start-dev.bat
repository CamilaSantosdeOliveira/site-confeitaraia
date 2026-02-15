@echo off
echo ========================================
echo    CONFEITARIA DELICIAS - DEV SETUP
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [2/5] Instalando dependencias do frontend...
cd /d "%~dp0"
npm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas

echo.
echo [3/5] Verificando PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo AVISO: PHP nao encontrado!
    echo Instale o PHP para usar o backend completo
    echo Continuando apenas com frontend...
    set PHP_AVAILABLE=false
) else (
    echo ✓ PHP encontrado
    set PHP_AVAILABLE=true
)

echo.
echo [4/5] Verificando MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo AVISO: MySQL nao encontrado!
    echo Instale o MySQL para usar o banco de dados
    echo Continuando apenas com frontend...
    set MYSQL_AVAILABLE=false
) else (
    echo ✓ MySQL encontrado
    set MYSQL_AVAILABLE=true
)

echo.
echo [5/5] Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo    AMBIENTE DE DESENVOLVIMENTO
echo ========================================
echo.
echo Frontend: http://localhost:3000
if "%PHP_AVAILABLE%"=="true" (
    echo Backend:  http://localhost:8000/api
)
echo.
echo Pressione Ctrl+C para parar os servidores
echo.

if "%PHP_AVAILABLE%"=="true" (
    echo Iniciando frontend e backend...
    start "Frontend" cmd /k "npm run dev"
    timeout /t 3 /nobreak >nul
    start "Backend" cmd /k "cd backend && php -S localhost:8000"
) else (
    echo Iniciando apenas frontend...
    npm run dev
)

echo.
echo Servidores iniciados com sucesso!
pause


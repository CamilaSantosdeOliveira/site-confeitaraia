@echo off
echo ========================================
echo    INICIAR SITE COMPLETO
echo ========================================
echo.
echo Este script inicia:
echo - Frontend (porta 3001)
echo - Backend (porta 8000)
echo.
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Node.js nao encontrado!
    echo.
    echo Instale o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/3] Verificando Node.js...
echo ✅ Node.js encontrado!
echo.

REM Verificar se PHP está disponível (XAMPP ou sistema)
set PHP_PATH=
if exist "C:\xampp\php\php.exe" (
    set PHP_PATH=C:\xampp\php\php.exe
    echo [2/3] Verificando PHP (XAMPP)...
    echo ✅ PHP encontrado no XAMPP!
) else (
    php --version >nul 2>&1
    if errorlevel 1 (
        echo [2/3] Verificando PHP...
        echo ⚠️  PHP nao encontrado!
        echo.
        echo O backend nao vai funcionar sem PHP.
        echo Instale o XAMPP: https://www.apachefriends.org/
        echo.
        set PHP_PATH=
    ) else (
        set PHP_PATH=php
        echo [2/3] Verificando PHP...
        echo ✅ PHP encontrado no sistema!
    )
)
echo.

echo [3/3] Iniciando servidores...
echo.

REM Navegar para a pasta do projeto
cd /d "%~dp0"

REM Iniciar Backend (se PHP estiver disponível)
if defined PHP_PATH (
    echo 🚀 Iniciando BACKEND na porta 8000...
    echo.
    start "Backend PHP - Porta 8000" cmd /k "cd /d %~dp0api && %PHP_PATH% -S localhost:8000"
    timeout /t 2 /nobreak >nul
    echo ✅ Backend iniciado!
    echo    Teste: http://localhost:8000/products.php
    echo.
) else (
    echo ⚠️  Backend nao iniciado (PHP nao encontrado)
    echo.
)

REM Iniciar Frontend
echo 🚀 Iniciando FRONTEND na porta 3001...
echo.
start "Frontend Vite - Porta 3001" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
echo ✅ Frontend iniciado!
echo.

echo ========================================
echo    ✅ SERVIDORES INICIADOS!
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:3001
if defined PHP_PATH (
    echo 🔧 Backend:  http://localhost:8000
)
echo.
echo ⚠️  IMPORTANTE:
echo    - Deixe as janelas abertas enquanto usar o site
echo    - Para parar, feche as janelas ou pressione Ctrl+C
echo.
echo ========================================
echo.
pause


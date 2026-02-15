@echo off
title Iniciar Servidores Agora
echo ========================================
echo    INICIAR SERVIDORES AGORA
echo ========================================
echo.

REM Navegar para a pasta do projeto
cd /d "%~dp0"

REM Verificar se backend já está rodando
echo [1/2] Verificando Backend...
netstat -aon | findstr :8000 | findstr LISTENING >nul
if not errorlevel 1 (
    echo ✅ Backend ja esta rodando na porta 8000
    echo.
) else (
    echo 🚀 Iniciando Backend...
    
    REM Verificar PHP
    set PHP_PATH=
    if exist "C:\xampp\php\php.exe" (
        set PHP_PATH=C:\xampp\php\php.exe
    ) else (
        php --version >nul 2>&1
        if not errorlevel 1 (
            set PHP_PATH=php
        )
    )
    
    if defined PHP_PATH (
        start "Backend PHP - Porta 8000" /MIN cmd /k "cd /d %~dp0api && %PHP_PATH% -S localhost:8000"
        timeout /t 3 /nobreak >nul
        echo ✅ Backend iniciado na porta 8000
    ) else (
        echo ❌ PHP nao encontrado! Backend nao pode ser iniciado.
        echo    Instale o XAMPP: https://www.apachefriends.org/
    )
    echo.
)

REM Verificar se frontend já está rodando
echo [2/2] Verificando Frontend...
netstat -aon | findstr :3001 | findstr LISTENING >nul
if not errorlevel 1 (
    echo ✅ Frontend ja esta rodando na porta 3001
    echo.
) else (
    echo 🚀 Iniciando Frontend...
    
    REM Verificar Node.js
    node --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Node.js nao encontrado!
        echo    Instale o Node.js: https://nodejs.org/
    ) else (
        start "Frontend Vite - Porta 3001" /MIN cmd /k "cd /d %~dp0 && npm run dev"
        timeout /t 5 /nobreak >nul
        echo ✅ Frontend iniciado na porta 3001
    )
    echo.
)

echo ========================================
echo    VERIFICANDO STATUS FINAL
echo ========================================
echo.

REM Aguardar um pouco mais para garantir que iniciaram
timeout /t 3 /nobreak >nul

REM Verificar backend
netstat -aon | findstr :8000 | findstr LISTENING >nul
if errorlevel 1 (
    echo ❌ Backend NAO esta rodando
) else (
    echo ✅ Backend: http://localhost:8000
)

REM Verificar frontend
netstat -aon | findstr :3001 | findstr LISTENING >nul
if errorlevel 1 (
    echo ❌ Frontend NAO esta rodando
) else (
    echo ✅ Frontend: http://localhost:3001
)

echo.
echo ========================================
echo    PRONTO!
echo ========================================
echo.
echo Aguarde 5-10 segundos e acesse:
echo    🌐 Frontend: http://localhost:3001
echo    🔧 Backend:  http://localhost:8000/products.php
echo.
echo ⚠️  IMPORTANTE:
echo    - Deixe as janelas abertas (minimizadas)
echo    - Se fechar as janelas, os servidores param
echo.
echo Para verificar novamente, execute: VERIFICAR_SERVIDORES.bat
echo.
pause






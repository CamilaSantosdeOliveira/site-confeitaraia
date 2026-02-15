@echo off
title Configurar Inicio Automatico - Backend e Frontend
echo ========================================
echo    CONFIGURAR INICIO AUTOMATICO
echo ========================================
echo.
echo Este script configura o backend e frontend
echo para iniciarem automaticamente ao ligar o notebook.
echo.
echo ========================================
echo.

REM Verificar se esta rodando como administrador
net session >nul 2>&1
if errorlevel 1 (
    echo ⚠️  ATENCAO: Este script precisa de privilegios de administrador!
    echo.
    echo Clique com botao direito neste arquivo e selecione:
    echo "Executar como administrador"
    echo.
    pause
    exit /b 1
)

echo ✅ Privilegios de administrador confirmados!
echo.

REM Obter caminho do projeto
set "PROJECT_PATH=%~dp0"
set "PROJECT_PATH=%PROJECT_PATH:~0,-1%"

echo 📁 Caminho do projeto: %PROJECT_PATH%
echo.

REM Verificar se Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Node.js nao encontrado!
    echo.
    echo Instale o Node.js primeiro: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar se PHP esta disponivel
set PHP_PATH=
if exist "C:\xampp\php\php.exe" (
    set PHP_PATH=C:\xampp\php\php.exe
    echo ✅ PHP encontrado no XAMPP
) else (
    php --version >nul 2>&1
    if errorlevel 1 (
        echo ⚠️  PHP nao encontrado!
        echo O backend nao sera configurado.
        set PHP_PATH=
    ) else (
        set PHP_PATH=php
        echo ✅ PHP encontrado no sistema
    )
)
echo.

echo ========================================
echo    CRIANDO TAREFAS AGENDADAS
echo ========================================
echo.

REM Criar script temporario para backend
if defined PHP_PATH (
    echo [1/2] Configurando Backend...
    
    set "BACKEND_SCRIPT=%PROJECT_PATH%\INICIAR_BACKEND_AUTO.bat"
    
    (
        echo @echo off
        echo cd /d "%~dp0api"
        echo netstat -aon ^| findstr :8000 ^| findstr LISTENING ^>nul
        echo if not errorlevel 1 ^(
        echo     exit /b
        echo ^)
        echo start "" /B "%PHP_PATH%" -S localhost:8000
        echo echo %%date%% %%time%% - Backend iniciado ^>^> "%~dp0backend_log.txt"
    ) > "%BACKEND_SCRIPT%"
    
    REM Criar tarefa agendada para backend
    schtasks /create /tn "Backend PHP - Porta 8000" /tr "\"%BACKEND_SCRIPT%\"" /sc onstart /ru SYSTEM /f >nul 2>&1
    
    if errorlevel 1 (
        echo ❌ Erro ao criar tarefa do backend
    ) else (
        echo ✅ Tarefa do backend criada com sucesso!
        echo    Nome: "Backend PHP - Porta 8000"
    )
    echo.
)

REM Criar script temporario para frontend
echo [2/2] Configurando Frontend...

set "FRONTEND_SCRIPT=%PROJECT_PATH%\INICIAR_FRONTEND_AUTO.bat"

(
    echo @echo off
    echo cd /d "%~dp0"
    echo timeout /t 10 /nobreak ^>nul
    echo netstat -aon ^| findstr :3001 ^| findstr LISTENING ^>nul
    echo if not errorlevel 1 ^(
    echo     exit /b
    echo ^)
    echo start "" /MIN cmd /c "npm run dev"
    echo echo %%date%% %%time%% - Frontend iniciado ^>^> "%~dp0frontend_log.txt"
) > "%FRONTEND_SCRIPT%"

REM Criar tarefa agendada para frontend
schtasks /create /tn "Frontend Vite - Porta 3001" /tr "\"%FRONTEND_SCRIPT%\"" /sc onstart /ru SYSTEM /f >nul 2>&1

if errorlevel 1 (
    echo ❌ Erro ao criar tarefa do frontend
) else (
    echo ✅ Tarefa do frontend criada com sucesso!
    echo    Nome: "Frontend Vite - Porta 3001"
)
echo.

echo ========================================
echo    ✅ CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo 📋 Tarefas criadas:
if defined PHP_PATH (
    echo    ✅ Backend PHP - Porta 8000
)
echo    ✅ Frontend Vite - Porta 3001
echo.
echo 🔄 O que acontece agora:
echo    - Ao ligar o notebook, os servidores iniciarao automaticamente
echo    - Aguarde 10-15 segundos apos ligar para os servidores iniciarem
echo    - Backend: http://localhost:8000
echo    - Frontend: http://localhost:3001
echo.
echo 📝 Para verificar as tarefas:
echo    1. Pressione Win + R
echo    2. Digite: taskschd.msc
echo    3. Procure por "Backend PHP" e "Frontend Vite"
echo.
echo 🛑 Para desativar o inicio automatico:
echo    Execute: DESATIVAR_INICIO_AUTOMATICO.bat
echo.
echo ========================================
echo.
pause






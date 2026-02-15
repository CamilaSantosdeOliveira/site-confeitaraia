@echo off
title Configurar Inicio Automatico - Metodo Simples
echo ========================================
echo    CONFIGURAR INICIO AUTOMATICO
echo    (Metodo Simples - Sem Admin)
echo ========================================
echo.
echo Este metodo usa a pasta de inicializacao do Windows.
echo Os servidores iniciarao quando voce fizer login.
echo.
echo ========================================
echo.

REM Obter caminho do projeto
set "PROJECT_PATH=%~dp0"
set "PROJECT_PATH=%PROJECT_PATH:~0,-1%"

echo 📁 Caminho do projeto: %PROJECT_PATH%
echo.

REM Obter pasta de inicializacao do usuario
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

echo 📂 Pasta de inicializacao: %STARTUP_FOLDER%
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
echo    CRIANDO ATALHOS DE INICIALIZACAO
echo ========================================
echo.

REM Criar script para backend
if defined PHP_PATH (
    echo [1/2] Configurando Backend...
    
    set "BACKEND_SCRIPT=%PROJECT_PATH%\INICIAR_BACKEND_AUTO.bat"
    
    (
        echo @echo off
        echo cd /d "%PROJECT_PATH%\api"
        echo timeout /t 5 /nobreak ^>nul
        echo netstat -aon ^| findstr :8000 ^| findstr LISTENING ^>nul
        echo if not errorlevel 1 ^(
        echo     exit /b
        echo ^)
        echo start "" /MIN "%PHP_PATH%" -S localhost:8000
        echo echo %%date%% %%time%% - Backend iniciado ^>^> "%PROJECT_PATH%\backend_log.txt"
    ) > "%BACKEND_SCRIPT%"
    
    REM Criar atalho na pasta de inicializacao
    set "BACKEND_SHORTCUT=%STARTUP_FOLDER%\Backend PHP - Porta 8000.lnk"
    
    REM Usar PowerShell para criar atalho
    powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%BACKEND_SHORTCUT%'); $Shortcut.TargetPath = '%BACKEND_SCRIPT%'; $Shortcut.WorkingDirectory = '%PROJECT_PATH%\api'; $Shortcut.WindowStyle = 7; $Shortcut.Save()" >nul 2>&1
    
    if exist "%BACKEND_SHORTCUT%" (
        echo ✅ Atalho do backend criado!
    ) else (
        echo ⚠️  Erro ao criar atalho do backend
    )
    echo.
)

REM Criar script para frontend
echo [2/2] Configurando Frontend...

set "FRONTEND_SCRIPT=%PROJECT_PATH%\INICIAR_FRONTEND_AUTO.bat"

(
    echo @echo off
    echo cd /d "%PROJECT_PATH%"
    echo timeout /t 10 /nobreak ^>nul
    echo netstat -aon ^| findstr :3001 ^| findstr LISTENING ^>nul
    echo if not errorlevel 1 ^(
    echo     exit /b
    echo ^)
    echo start "" /MIN cmd /c "npm run dev"
    echo echo %%date%% %%time%% - Frontend iniciado ^>^> "%PROJECT_PATH%\frontend_log.txt"
) > "%FRONTEND_SCRIPT%"

REM Criar atalho na pasta de inicializacao
set "FRONTEND_SHORTCUT=%STARTUP_FOLDER%\Frontend Vite - Porta 3001.lnk"

REM Usar PowerShell para criar atalho
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%FRONTEND_SHORTCUT%'); $Shortcut.TargetPath = '%FRONTEND_SCRIPT%'; $Shortcut.WorkingDirectory = '%PROJECT_PATH%'; $Shortcut.WindowStyle = 7; $Shortcut.Save()" >nul 2>&1

if exist "%FRONTEND_SHORTCUT%" (
    echo ✅ Atalho do frontend criado!
) else (
    echo ⚠️  Erro ao criar atalho do frontend
)
echo.

echo ========================================
echo    ✅ CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo 📋 Atalhos criados na pasta de inicializacao:
if defined PHP_PATH (
    echo    ✅ Backend PHP - Porta 8000
)
echo    ✅ Frontend Vite - Porta 3001
echo.
echo 🔄 O que acontece agora:
echo    - Ao fazer login no Windows, os servidores iniciarao automaticamente
echo    - Aguarde 10-15 segundos apos fazer login
echo    - Backend: http://localhost:8000
echo    - Frontend: http://localhost:3001
echo.
echo 📝 Para verificar os atalhos:
echo    1. Pressione Win + R
echo    2. Digite: shell:startup
echo    3. Pressione Enter
echo    4. Voce vera os atalhos criados
echo.
echo 🛑 Para desativar o inicio automatico:
echo    Execute: DESATIVAR_INICIO_AUTOMATICO_SIMPLES.bat
echo    OU delete os atalhos da pasta de inicializacao
echo.
echo ========================================
echo.
pause






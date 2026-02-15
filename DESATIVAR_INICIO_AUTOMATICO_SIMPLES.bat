@echo off
title Desativar Inicio Automatico - Metodo Simples
echo ========================================
echo    DESATIVAR INICIO AUTOMATICO
echo    (Metodo Simples)
echo ========================================
echo.
echo Este script remove os atalhos da pasta
echo de inicializacao do Windows.
echo.
echo ========================================
echo.

REM Obter pasta de inicializacao do usuario
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

echo 📂 Pasta de inicializacao: %STARTUP_FOLDER%
echo.

echo Removendo atalhos...
echo.

REM Remover atalho do backend
set "BACKEND_SHORTCUT=%STARTUP_FOLDER%\Backend PHP - Porta 8000.lnk"
if exist "%BACKEND_SHORTCUT%" (
    del "%BACKEND_SHORTCUT%" >nul 2>&1
    if errorlevel 1 (
        echo ⚠️  Erro ao remover atalho do backend
    ) else (
        echo ✅ Atalho do backend removido
    )
) else (
    echo ⚠️  Atalho do backend nao encontrado
)

REM Remover atalho do frontend
set "FRONTEND_SHORTCUT=%STARTUP_FOLDER%\Frontend Vite - Porta 3001.lnk"
if exist "%FRONTEND_SHORTCUT%" (
    del "%FRONTEND_SHORTCUT%" >nul 2>&1
    if errorlevel 1 (
        echo ⚠️  Erro ao remover atalho do frontend
    ) else (
        echo ✅ Atalho do frontend removido
    )
) else (
    echo ⚠️  Atalho do frontend nao encontrado
)

echo.
echo ========================================
echo    ✅ ATALHOS REMOVIDOS!
echo ========================================
echo.
echo Os servidores nao iniciarao mais automaticamente.
echo.
echo Para reativar, execute:
echo CONFIGURAR_INICIO_AUTOMATICO_SIMPLES.bat
echo.
pause






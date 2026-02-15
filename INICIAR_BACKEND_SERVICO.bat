@echo off
title Backend PHP - Servico Permanente
echo ========================================
echo    BACKEND PHP - MODO PERMANENTE
echo ========================================
echo.
echo Este script inicia o backend como servico do Windows.
echo O backend continuara rodando mesmo apos fechar tudo.
echo.
echo Para parar: Execute PARAR_BACKEND.bat
echo.
echo ========================================
echo.

if exist "C:\xampp\php\php.exe" (
    echo Iniciando backend em modo permanente...
    echo.
    
    cd /d "%~dp0api"
    
    REM Verificar se ja esta rodando
    netstat -aon | findstr :8000 | findstr LISTENING >nul
    if not errorlevel 1 (
        echo ⚠️ Backend ja esta rodando na porta 8000!
        echo.
        echo Para parar, execute: PARAR_BACKEND.bat
        pause
        exit /b
    )
    
    REM Iniciar PHP em nova janela separada (independente)
    start "Backend PHP - Porta 8000" /MIN "C:\xampp\php\php.exe" -S localhost:8000
    
    REM Aguardar alguns segundos para iniciar
    timeout /t 3 /nobreak >nul
    
    echo.
    echo ✅ Backend iniciado em modo permanente!
    echo.
    echo Backend: http://localhost:8000
    echo API:     http://localhost:8000/products.php
    echo.
    echo O backend esta rodando em background.
    echo Voce pode fechar este terminal e o Cursor.
    echo.
    echo Para verificar se esta rodando:
    echo http://localhost:8000/products.php
    echo.
    echo Para parar, execute: PARAR_BACKEND.bat
    echo.
    pause
) else (
    echo ERRO: XAMPP nao encontrado em C:\xampp\
    echo.
    echo Instale o XAMPP: https://www.apachefriends.org/
    echo.
    pause
)


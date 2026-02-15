@echo off
title Forcar Reinicio Apache - Porta 8000
echo ========================================
echo    FORCAR REINICIO APACHE - PORTA 8000
echo ========================================
echo.
echo Este script vai:
echo 1. Parar o Apache
echo 2. Aguardar 5 segundos
echo 3. Iniciar o Apache
echo 4. Verificar se porta 8000 esta ativa
echo.
echo ========================================
echo.

REM Verificar se XAMPP existe
if not exist "C:\xampp\apache\bin\httpd.exe" (
    echo ERRO: XAMPP nao encontrado em C:\xampp\
    echo.
    echo Instale o XAMPP: https://www.apachefriends.org/
    echo.
    pause
    exit /b 1
)

echo [1/4] Parando Apache...
net stop Apache2.4 >nul 2>&1
if errorlevel 1 (
    echo Apache nao esta rodando como servico.
    echo Tentando parar via XAMPP...
    taskkill /F /IM httpd.exe >nul 2>&1
)

echo [2/4] Aguardando 5 segundos...
timeout /t 5 /nobreak >nul

echo [3/4] Iniciando Apache...
net start Apache2.4 >nul 2>&1
if errorlevel 1 (
    echo.
    echo AVISO: Nao foi possivel iniciar Apache como servico.
    echo.
    echo Por favor, inicie manualmente:
    echo 1. Abra XAMPP Control Panel
    echo 2. Clique "Start" ao lado de Apache
    echo.
    pause
    exit /b 1
)

echo [4/4] Verificando porta 8000...
timeout /t 3 /nobreak >nul

netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo.
    echo AVISO: Porta 8000 ainda nao esta ativa!
    echo.
    echo Possiveis causas:
    echo 1. Apache nao foi reiniciado corretamente
    echo 2. Configuracao nao foi aplicada
    echo.
    echo SOLUCAO MANUAL:
    echo 1. Abra XAMPP Control Panel
    echo 2. Clique "Stop" ao lado de Apache
    echo 3. Aguarde 5 segundos
    echo 4. Clique "Start" ao lado de Apache
    echo 5. Verifique se ficou verde
    echo.
) else (
    echo.
    echo ========================================
    echo    SUCESSO!
    echo ========================================
    echo.
    echo Apache esta escutando na porta 8000!
    echo.
    echo Teste agora:
    echo http://localhost:8000/products.php
    echo.
    echo ========================================
)

echo.
pause





@echo off
title Reiniciar Apache - Solucao Definitiva
color 0A
echo.
echo ========================================
echo    REINICIAR APACHE - SOLUCAO DEFINITIVA
echo ========================================
echo.

REM Verificar se XAMPP existe
if not exist "C:\xampp\apache\bin\httpd.exe" (
    echo ERRO: XAMPP nao encontrado!
    echo.
    pause
    exit /b 1
)

echo [PASSO 1/5] Verificando status atual...
echo.
netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo ❌ Porta 8000 NAO esta ativa
) else (
    echo ✅ Porta 8000 esta ativa
)
echo.

echo [PASSO 2/5] Parando Apache...
echo.
REM Tentar parar como servico
net stop Apache2.4 >nul 2>&1
if errorlevel 1 (
    echo Apache nao esta como servico, tentando parar processos...
    taskkill /F /IM httpd.exe >nul 2>&1
    if errorlevel 1 (
        echo Nenhum processo Apache encontrado
    ) else (
        echo ✅ Processos Apache parados
    )
) else (
    echo ✅ Apache parado como servico
)
echo.

echo [PASSO 3/5] Aguardando 5 segundos...
timeout /t 5 /nobreak >nul
echo ✅ Aguardado
echo.

echo [PASSO 4/5] Iniciando Apache...
echo.
net start Apache2.4 >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  NAO FOI POSSIVEL INICIAR COMO SERVICO
    echo.
    echo ========================================
    echo    INSTRUCOES MANUAIS
    echo ========================================
    echo.
    echo 1. Abra o XAMPP Control Panel
    echo 2. Clique "Stop" ao lado de Apache
    echo 3. Aguarde 5 segundos
    echo 4. Clique "Start" ao lado de Apache
    echo 5. Verifique se ficou VERDE
    echo.
    echo ========================================
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Apache iniciado como servico
)
echo.

echo [PASSO 5/5] Verificando porta 8000...
timeout /t 3 /nobreak >nul
netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo.
    echo ❌ Porta 8000 ainda NAO esta ativa!
    echo.
    echo ========================================
    echo    PROBLEMA ENCONTRADO
    echo ========================================
    echo.
    echo O Apache foi reiniciado, mas a porta 8000
    echo ainda nao esta ativa.
    echo.
    echo Possiveis causas:
    echo 1. Configuracao nao foi aplicada
    echo 2. Apache precisa ser reiniciado manualmente
    echo 3. Conflito com outra aplicacao
    echo.
    echo SOLUCAO:
    echo 1. Abra XAMPP Control Panel
    echo 2. Clique "Stop" no Apache
    echo 3. Aguarde 5 segundos
    echo 4. Clique "Start" no Apache
    echo 5. Verifique se ficou VERDE
    echo.
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo    SUCESSO!
    echo ========================================
    echo.
    echo ✅ Apache esta escutando na porta 8000!
    echo.
    echo Teste agora:
    echo http://localhost:8000/products.php
    echo http://localhost:8000/cart.php
    echo.
    echo ========================================
    echo.
)

pause





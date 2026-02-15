@echo off
title Backend PHP - Porta 8000
echo ========================================
echo    BACKEND PHP - RODANDO SEMPRE
echo ========================================
echo.
echo Este terminal DEVE ficar aberto!
echo.
echo Se fechar este terminal, o backend para.
echo.
echo Para parar: Pressione Ctrl+C
echo.
echo ========================================
echo.

if exist "C:\xampp\php\php.exe" (
    echo Iniciando servidor PHP na porta 8000...
    echo.
    echo Backend: http://localhost:8000
    echo API:     http://localhost:8000/products.php
    echo.
    echo Aguarde alguns segundos...
    echo.
    
    cd /d "%~dp0api"
    "C:\xampp\php\php.exe" -S localhost:8000
    
    echo.
    echo ========================================
    echo Backend parado!
    echo ========================================
    pause
) else (
    echo ERRO: XAMPP nao encontrado em C:\xampp\
    echo.
    echo Instale o XAMPP: https://www.apachefriends.org/
    echo.
    pause
)





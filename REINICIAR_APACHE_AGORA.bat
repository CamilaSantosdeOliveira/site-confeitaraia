@echo off
title Reiniciar Apache - Porta 8000
echo ========================================
echo    REINICIAR APACHE - PORTA 8000
echo ========================================
echo.
echo Este script vai ajudar voce a reiniciar o Apache.
echo.
echo IMPORTANTE:
echo 1. Abra o XAMPP Control Panel
echo 2. Clique "Stop" ao lado de Apache
echo 3. Aguarde 5 segundos
echo 4. Clique "Start" ao lado de Apache
echo.
echo ========================================
echo.
echo Apos reiniciar, teste:
echo http://localhost:8000/products.php
echo.
echo ========================================
echo.
echo Pressione qualquer tecla para abrir o XAMPP...
pause >nul

REM Tentar abrir XAMPP Control Panel
if exist "C:\xampp\xampp-control.exe" (
    start "" "C:\xampp\xampp-control.exe"
    echo.
    echo XAMPP Control Panel aberto!
    echo.
    echo Siga as instrucoes acima para reiniciar o Apache.
) else (
    echo.
    echo XAMPP nao encontrado em C:\xampp\
    echo.
    echo Abra o XAMPP manualmente e reinicie o Apache.
)

echo.
echo ========================================
echo.
pause





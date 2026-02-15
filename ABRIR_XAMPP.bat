@echo off
title Abrir XAMPP Control Panel
echo ========================================
echo    ABRINDO XAMPP CONTROL PANEL
echo ========================================
echo.

if exist "C:\xampp\xampp-control.exe" (
    echo Abrindo XAMPP Control Panel...
    start "" "C:\xampp\xampp-control.exe"
    echo.
    echo ========================================
    echo    INSTRUCOES
    echo ========================================
    echo.
    echo 1. No XAMPP Control Panel:
    echo    - Clique "Stop" ao lado de Apache
    echo    - Aguarde ate ficar vermelho
    echo.
    echo 2. Aguarde 5 segundos
    echo.
    echo 3. Clique "Start" ao lado de Apache
    echo    - Aguarde ate ficar VERDE
    echo.
    echo 4. Depois disso, a porta 8000 vai estar ativa!
    echo.
    echo ========================================
    echo.
) else (
    echo ERRO: XAMPP nao encontrado em C:\xampp\
    echo.
    echo Abra manualmente o XAMPP Control Panel
    echo.
)

pause





@echo off
echo ========================================
echo    BACKEND SEMPRE ATIVO - XAMPP
echo ========================================
echo.
echo Este script inicia o backend e mantem
echo ele rodando mesmo se fechar o terminal!
echo.

echo Verificando XAMPP...
if exist "C:\xampp\php\php.exe" (
    echo XAMPP encontrado!
    echo.
    echo Iniciando servidor PHP na porta 8000...
    echo Backend: http://localhost:8000
    echo.
    echo ========================================
    echo    IMPORTANTE
    echo ========================================
    echo.
    echo O servidor esta rodando em background!
    echo.
    echo Para PARAR o servidor, execute:
    echo PARAR_BACKEND.bat
    echo.
    echo Ou feche esta janela e execute:
    echo taskkill /F /IM php.exe
    echo.
    echo ========================================
    echo.
    
    cd /d "%~dp0api"
    start "Backend PHP - Porta 8000" /MIN "C:\xampp\php\php.exe" -S localhost:8000
    
    timeout /t 2 >nul
    echo ✅ Backend iniciado em background!
    echo.
    echo Teste acessando: http://localhost:8000/products.php
    echo.
) else (
    echo ❌ XAMPP nao encontrado em C:\xampp\
    echo.
    echo Opcoes:
    echo 1. Instale o XAMPP: https://www.apachefriends.org/
    echo 2. Ou mova a pasta api para C:\xampp\htdocs\
    echo.
    pause
)





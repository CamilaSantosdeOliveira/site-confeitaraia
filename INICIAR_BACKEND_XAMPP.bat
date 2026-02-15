@echo off
echo ========================================
echo    INICIANDO BACKEND COM XAMPP
echo ========================================
echo.

echo Verificando XAMPP...
if exist "C:\xampp\php\php.exe" (
    echo XAMPP encontrado!
    echo.
    echo Iniciando servidor PHP na porta 8000...
    echo.
    echo Backend: http://localhost:8000
    echo API:     http://localhost:8000/products.php
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo.
    
    cd /d "%~dp0api"
    "C:\xampp\php\php.exe" -S localhost:8000
) else (
    echo XAMPP nao encontrado em C:\xampp\
    echo.
    echo Opcoes:
    echo 1. Instale o XAMPP: https://www.apachefriends.org/
    echo 2. Ou mova a pasta api para C:\xampp\htdocs\
    echo.
    echo Se o XAMPP estiver em outro local, edite este arquivo
    echo e altere o caminho C:\xampp\php\php.exe
    echo.
    pause
)





@echo off
echo ========================================
echo    REVERTER CONFIGURACAO APACHE
echo ========================================
echo.
echo Este script reverte as mudancas feitas no Apache.
echo.
echo ATENCAO: Isso vai remover a configuracao da porta 8000.
echo.
set /p confirmar="Tem certeza? (S/N): "
if /i not "%confirmar%"=="S" (
    echo Operacao cancelada.
    pause
    exit /b
)

echo.
echo Procurando backups...
if exist "C:\xampp\apache\conf\httpd.conf.backup_*" (
    echo Backups encontrados:
    dir /B "C:\xampp\apache\conf\httpd.conf.backup_*"
    echo.
    echo Para restaurar, copie manualmente o backup desejado.
) else (
    echo Nenhum backup encontrado.
)

echo.
echo Removendo configuracao da porta 8000...
echo.
echo Por favor, edite manualmente:
echo 1. C:\xampp\apache\conf\httpd.conf
echo    - Remova a linha: Listen 8000
echo.
echo 2. C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo    - Remova o bloco VirtualHost *:8000
echo.
echo Depois reinicie o Apache no XAMPP.
echo.
pause





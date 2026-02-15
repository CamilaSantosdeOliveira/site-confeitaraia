@echo off
echo ========================================
echo    PARAR PHP E USAR APACHE
echo ========================================
echo.
echo Este script para os processos PHP
echo para que o Apache use a porta 8000.
echo.

echo Parando processos PHP na porta 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Processo encontrado: %%a
    taskkill /PID %%a /F >nul 2>&1
    if errorlevel 1 (
        echo ⚠️ Erro ao parar processo %%a
    ) else (
        echo ✅ Processo %%a parado
    )
)

echo.
echo ✅ Processos PHP parados!
echo.
echo ========================================
echo    PROXIMO PASSO
echo ========================================
echo.
echo Agora voce precisa:
echo.
echo 1. Abra XAMPP Control Panel
echo 2. Clique "Stop" ao lado de Apache
echo 3. Aguarde 3 segundos
echo 4. Clique "Start" ao lado de Apache
echo.
echo Depois disso, o Apache vai usar a porta 8000
echo e o backend vai rodar permanentemente!
echo.
echo ========================================
pause





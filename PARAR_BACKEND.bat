@echo off
echo ========================================
echo    PARANDO BACKEND PHP
echo ========================================
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
echo Parando todos os processos PHP.exe...
taskkill /F /IM php.exe >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Nenhum processo PHP encontrado
) else (
    echo ✅ Todos os processos PHP parados
)

echo.
echo ========================================
echo    BACKEND PARADO
echo ========================================
echo.
pause

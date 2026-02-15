@echo off
echo ========================================
echo    VERIFICANDO BACKEND PHP
echo ========================================
echo.

echo Verificando porta 8000...
netstat -aon | findstr :8000 | findstr LISTENING >nul

if errorlevel 1 (
    echo ❌ Backend NAO esta rodando!
    echo.
    echo Execute: INICIAR_BACKEND_SERVICO.bat
) else (
    echo ✅ Backend esta rodando!
    echo.
    echo Processos na porta 8000:
    netstat -aon | findstr :8000 | findstr LISTENING
    echo.
    echo Testando conexao...
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8000/products.php' -TimeoutSec 2 -UseBasicParsing; Write-Host '✅ Backend respondendo! Status:' $response.StatusCode -ForegroundColor Green } catch { Write-Host '⚠️ Backend rodando mas nao respondeu' -ForegroundColor Yellow }"
)

echo.
pause





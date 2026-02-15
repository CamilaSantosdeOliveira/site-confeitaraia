@echo off
echo ========================================
echo    TESTANDO CONFIGURACAO APACHE
echo ========================================
echo.

echo Verificando se Apache esta rodando...
netstat -aon | findstr :8000 | findstr LISTENING >nul

if errorlevel 1 (
    echo ❌ Apache nao esta rodando na porta 8000
    echo.
    echo Por favor:
    echo 1. Abra XAMPP Control Panel
    echo 2. Clique "Start" ao lado de Apache
    echo 3. Execute este script novamente
    echo.
    pause
    exit /b
)

echo ✅ Apache esta rodando na porta 8000!
echo.
echo Testando API...
echo.

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8000/products.php' -TimeoutSec 5 -UseBasicParsing; Write-Host '✅✅✅ SUCESSO! ✅✅✅' -ForegroundColor Green; Write-Host 'Status:' $response.StatusCode -ForegroundColor Green; Write-Host 'Backend funcionando perfeitamente!' -ForegroundColor Green } catch { Write-Host '⚠️ Erro ao conectar:' $_.Exception.Message -ForegroundColor Yellow; Write-Host 'Verifique se o Apache esta rodando e se a pasta api existe.' -ForegroundColor Yellow }"

echo.
pause





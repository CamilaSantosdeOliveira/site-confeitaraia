@echo off
title Verificar se Backend Funcionou
color 0A
echo.
echo ========================================
echo    VERIFICANDO SE BACKEND FUNCIONOU
echo ========================================
echo.

echo [1/3] Verificando Apache...
tasklist | findstr /I "httpd.exe" >nul
if errorlevel 1 (
    echo ❌ Apache NAO esta rodando!
    echo.
    echo Abra XAMPP e inicie o Apache
    echo.
    goto :fim
) else (
    echo ✅ Apache esta rodando
)

echo.
echo [2/3] Verificando porta 8000...
netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo ❌ Porta 8000 NAO esta ativa!
    echo.
    echo ⚠️  Apache nao foi reiniciado!
    echo.
    echo SOLUCAO:
    echo 1. XAMPP Control Panel
    echo 2. Stop no Apache
    echo 3. Aguarde 5 segundos
    echo 4. Start no Apache
    echo.
    goto :fim
) else (
    echo ✅ Porta 8000 esta ATIVA!
)

echo.
echo [3/3] Testando backend...
curl -s -o nul -w "%%{http_code}" http://localhost:8000/products.php >nul 2>&1
if errorlevel 1 (
    echo ❌ Backend nao esta respondendo
    echo.
    echo Verifique se os arquivos PHP estao na pasta api
    echo.
    goto :fim
) else (
    echo ✅ Backend esta respondendo!
)

echo.
echo ========================================
echo    SUCESSO!
echo ========================================
echo.
echo ✅ Apache rodando
echo ✅ Porta 8000 ativa
echo ✅ Backend funcionando
echo.
echo Teste no navegador:
echo http://localhost:8000/products.php
echo.
goto :end

:fim
echo.
echo ========================================
echo    NAO FUNCIONOU
echo ========================================
echo.
echo Siga as instrucoes acima para resolver.
echo.

:end
pause





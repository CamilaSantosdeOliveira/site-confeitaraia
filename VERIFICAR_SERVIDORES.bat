@echo off
title Verificar Status dos Servidores
echo ========================================
echo    VERIFICAR STATUS DOS SERVIDORES
echo ========================================
echo.

echo [1/3] Verificando Backend (porta 8000)...
netstat -aon | findstr :8000 | findstr LISTENING >nul
if errorlevel 1 (
    echo ❌ Backend NAO esta rodando na porta 8000
    echo.
) else (
    echo ✅ Backend ESTA rodando na porta 8000!
    netstat -aon | findstr :8000 | findstr LISTENING
    echo.
)

echo [2/3] Verificando Frontend (porta 3001)...
netstat -aon | findstr :3001 | findstr LISTENING >nul
if errorlevel 1 (
    echo ❌ Frontend NAO esta rodando na porta 3001
    echo.
) else (
    echo ✅ Frontend ESTA rodando na porta 3001!
    netstat -aon | findstr :3001 | findstr LISTENING
    echo.
)

echo [3/3] Resumo das portas...
echo.
echo Portas em uso:
netstat -aon | findstr ":8000 :3001" | findstr LISTENING

echo.
echo ========================================
echo    RESUMO
echo ========================================
echo.
echo Se algum servidor nao esta rodando:
echo    1. Execute: INICIAR_TUDO.bat
echo    2. OU execute os scripts individuais:
echo       - Para backend: INICIAR_BACKEND_SERVICO.bat
echo       - Para frontend: npm run dev (na pasta do projeto)
echo.
pause


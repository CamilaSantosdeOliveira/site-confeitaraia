@echo off
title Desativar Inicio Automatico
echo ========================================
echo    DESATIVAR INICIO AUTOMATICO
echo ========================================
echo.
echo Este script remove as tarefas agendadas
echo que iniciam automaticamente os servidores.
echo.
echo ========================================
echo.

REM Verificar se esta rodando como administrador
net session >nul 2>&1
if errorlevel 1 (
    echo ⚠️  ATENCAO: Este script precisa de privilegios de administrador!
    echo.
    echo Clique com botao direito neste arquivo e selecione:
    echo "Executar como administrador"
    echo.
    pause
    exit /b 1
)

echo ✅ Privilegios de administrador confirmados!
echo.

echo Removendo tarefas agendadas...
echo.

REM Remover tarefa do backend
schtasks /delete /tn "Backend PHP - Porta 8000" /f >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Tarefa do backend nao encontrada ou ja foi removida
) else (
    echo ✅ Tarefa do backend removida
)

REM Remover tarefa do frontend
schtasks /delete /tn "Frontend Vite - Porta 3001" /f >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Tarefa do frontend nao encontrada ou ja foi removida
) else (
    echo ✅ Tarefa do frontend removida
)

echo.
echo ========================================
echo    ✅ TAREFAS REMOVIDAS!
echo ========================================
echo.
echo Os servidores nao iniciarao mais automaticamente.
echo.
echo Para reativar, execute:
echo CONFIGURAR_INICIO_AUTOMATICO_COMPLETO.bat
echo.
pause






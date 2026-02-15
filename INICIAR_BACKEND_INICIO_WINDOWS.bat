@echo off
REM Script para iniciar backend automaticamente ao ligar o Windows
REM Configure no Agendador de Tarefas para executar na inicializacao

cd /d "%~dp0api"

REM Verificar se ja esta rodando
netstat -aon | findstr :8000 | findstr LISTENING >nul
if not errorlevel 1 (
    exit /b
)

REM Iniciar PHP em background
start "" /B "C:\xampp\php\php.exe" -S localhost:8000

REM Salvar PID em arquivo para poder parar depois
echo %date% %time% - Backend iniciado >> "%~dp0backend_log.txt"





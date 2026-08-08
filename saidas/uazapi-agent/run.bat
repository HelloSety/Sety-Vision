@echo off
cd /d "%~dp0"
:loop
echo [run.bat] iniciando uazapi-agent...
python app.py
echo [run.bat] processo caiu (codigo %errorlevel%). Reiniciando em 3s...
timeout /t 3 /nobreak >nul
goto loop

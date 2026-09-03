@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\zensical.exe" (
  echo Please run install.cmd first.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:8001/ in your browser. Press Ctrl+C to stop.
".venv\Scripts\python.exe" -m zensical serve --dev-addr 127.0.0.1:8001
pause

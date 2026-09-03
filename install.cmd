@echo off
setlocal
cd /d "%~dp0"
if exist ".venv\Scripts\python.exe" goto install
py -3 -m venv .venv
if errorlevel 1 (
  echo Python 3.10 or newer is required. Install Python, then run this file again.
  pause
  exit /b 1
)
:install
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
  echo Installation failed. Please copy the error message.
  pause
  exit /b 1
)
echo Installation complete. You can close this window.
pause

@echo off
setlocal
cd /d "%~dp0"
set "README_IN_HISTORY="
for /f %%i in ('git rev-list --all -- README.md 2^>nul') do set "README_IN_HISTORY=1"
if defined README_IN_HISTORY (
  echo README.md is still present in unpublished Git history.
  echo Publishing is blocked so the local-only README cannot be uploaded accidentally.
  echo Ask Codex to clean the unpublished history before the first publication.
  pause
  exit /b 1
)
echo Publishing existing commits to EussGaler/eussgaler-notes...
echo If GitHub asks you to sign in, complete the sign-in in your browser.
echo This script does not create commits or upload uncommitted edits.
git push -u origin main
if errorlevel 1 (
  echo.
  echo Push failed. Please copy the error shown above.
  pause
  exit /b 1
)
echo.
echo Push completed.
echo Check the workflow at https://github.com/EussGaler/eussgaler-notes/actions
pause

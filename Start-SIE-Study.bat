@echo off
setlocal EnableExtensions
title SIE 2026 Study Website
cd /d "%~dp0"

echo.
echo  SIE 2026 Study Website
echo  ======================
echo.

where npm.cmd >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js/npm not found. Install from https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm.cmd install
    if errorlevel 1 goto :failed
)

echo Building Compliance Defender + website...
call npm.cmd run build
if errorlevel 1 goto :failed

echo.
echo Starting website server...
echo.
echo  Open in your browser:  http://localhost:4173
echo  Press Ctrl+C in this window to stop the server.
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:4173/"

call npm.cmd run preview
goto :eof

:failed
echo.
echo Setup failed. See errors above.
pause
exit /b 1
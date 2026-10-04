@echo off
title SIE 2026 Study - Dev Mode
cd /d "%~dp0"

if not exist "node_modules\" call npm.cmd install

echo Starting dev server at http://localhost:5173
start "" "http://localhost:5173"
call npm.cmd run dev -- --host 127.0.0.1 --port 5173
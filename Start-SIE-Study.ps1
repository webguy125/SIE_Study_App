# SIE 2026 Study Website launcher
Set-Location $PSScriptRoot

Write-Host ""
Write-Host " SIE 2026 Study Website" -ForegroundColor Cyan
Write-Host " ======================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js/npm not found. Install from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm.cmd install
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

if (-not (Test-Path "dist\index.html")) {
    Write-Host "Building website..."
    npm.cmd run build
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

Write-Host ""
Write-Host "Starting at http://localhost:4173" -ForegroundColor Green
Write-Host "Keep this window open while studying." -ForegroundColor Yellow
Write-Host ""

Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:4173/"
} | Out-Null

npm.cmd run preview
# verify_go.ps1 - Helper script to diagnose Go installation issues

Write-Host "--- Go Environment Diagnostic ---" -ForegroundColor Cyan

# 1. Check PATH
$goInPath = Get-Command go -ErrorAction SilentlyContinue
if ($goInPath) {
    Write-Host "[OK] 'go' command found in PATH: $($goInPath.Source)" -ForegroundColor Green
    go version
} else {
    Write-Host "[FAIL] 'go' command NOT found in PATH." -ForegroundColor Red
}

# 2. Check Common Installation Paths
$commonPaths = @(
    "C:\Program Files\Go\bin\go.exe",
    "$env:USERPROFILE\go\bin\go.exe",
    "$env:LocalAppData\Programs\Go\bin\go.exe"
)

Write-Host "`nChecking common installation locations..."
foreach ($path in $commonPaths) {
    if (Test-Path $path) {
        Write-Host "[FOUND] Go executable at: $path" -ForegroundColor Yellow
        Write-Host "Suggestion: Add '$(Split-Path $path)' to your System/User PATH environment variable." -ForegroundColor Gray
    }
}

# 3. Check Docker status
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
if ($dockerInstalled) {
    Write-Host "`n[INFO] Docker is installed. You can use Docker as a workaround:" -ForegroundColor Cyan
    Write-Host "Run: docker-compose run --rm backend go mod tidy" -ForegroundColor Gray
}

Write-Host "`n--- Diagnostic Complete ---"
Write-Host "If Go is not installed, download it from https://go.dev/dl/" -ForegroundColor White

# ================================================================
# Automated Schema Fix Script (PowerShell)
# Replaces all course_name references with title
# ================================================================

Write-Host "🔧 Starting Schema Mismatch Fix..." -ForegroundColor Cyan
Write-Host ""

# Create backups
Write-Host "📦 Creating backups..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "backups"
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

Copy-Item -Path "frontend/src" -Destination "$backupDir/frontend-src-backup-$timestamp" -Recurse -Force
Copy-Item -Path "backend" -Destination "$backupDir/backend-backup-$timestamp" -Recurse -Force

Write-Host "✅ Backups created in ./backups/" -ForegroundColor Green
Write-Host ""

# Function to replace in files
function Replace-InFiles {
    param(
        [string]$Path,
        [string]$Find,
        [string]$Replace
    )
    
    Get-ChildItem -Path $Path -Include *.js,*.jsx -Recurse | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($content -match [regex]::Escape($Find)) {
            $content = $content -replace [regex]::Escape($Find), $Replace
            Set-Content -Path $_.FullName -Value $content -NoNewline
            Write-Host "  Updated: $($_.Name)" -ForegroundColor Gray
        }
    }
}

# Fix frontend
Write-Host "🔄 Fixing frontend files..." -ForegroundColor Yellow

Replace-InFiles -Path "frontend/src" -Find "course_name" -Replace "title"
Replace-InFiles -Path "frontend/src" -Find "course_description" -Replace "description"
Replace-InFiles -Path "frontend/src" -Find "course.course_name" -Replace "course.title"
Replace-InFiles -Path "frontend/src" -Find "course.course_description" -Replace "course.description"

Write-Host "✅ Frontend fixed" -ForegroundColor Green
Write-Host ""

# Fix backend
Write-Host "🔄 Fixing backend files..." -ForegroundColor Yellow

Replace-InFiles -Path "backend" -Find "course_name" -Replace "title"
Replace-InFiles -Path "backend" -Find "course_description" -Replace "description"

Write-Host "✅ Backend fixed" -ForegroundColor Green
Write-Host ""

# Update documentation
Write-Host "📝 Updating documentation..." -ForegroundColor Yellow

Get-ChildItem -Path "docs" -Include *.md,*.sql -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "course_name", "title"
    $content = $content -replace "course_description", "description"
    Set-Content -Path $_.FullName -Value $content -NoNewline
}

Write-Host "✅ Documentation updated" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Schema fix complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review changes: git diff"
Write-Host "2. Test your application"
Write-Host "3. If issues, restore from backups/"
Write-Host ""

# ============================================================================
# SCHEMA FIX VERIFICATION SCRIPT
# ============================================================================
# This script verifies that all schema fixes have been properly applied
# Run this after applying the fixes to ensure everything is correct
# ============================================================================

Write-Host "`n🔍 VERIFYING SCHEMA FIX..." -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Gray

# ============================================================================
# 1. CHECK FOR PROBLEMATIC REFERENCES
# ============================================================================

Write-Host "`n📋 Step 1: Checking for problematic references..." -ForegroundColor Yellow

$problematicFiles = @()

# Search for course_name in code files (excluding backups and docs)
Write-Host "   Searching for 'course_name' references..." -ForegroundColor Gray
$courseNameRefs = Get-ChildItem -Path . -Recurse -Include *.js,*.jsx -Exclude node_modules,backups,.git | 
    Select-String -Pattern "course_name" -CaseSensitive |
    Where-Object { $_.Line -notmatch "course\.title \|\| course\.course_name" -and 
                   $_.Line -notmatch "// " -and 
                   $_.Line -notmatch "DATABASE SCHEMA" }

if ($courseNameRefs) {
    Write-Host "   ⚠️  Found problematic 'course_name' references:" -ForegroundColor Red
    $courseNameRefs | ForEach-Object {
        Write-Host "      - $($_.Path):$($_.LineNumber)" -ForegroundColor Red
        $problematicFiles += $_.Path
    }
} else {
    Write-Host "   ✅ No problematic 'course_name' references found" -ForegroundColor Green
}

# Search for course_description in code files
Write-Host "   Searching for 'course_description' references..." -ForegroundColor Gray
$courseDescRefs = Get-ChildItem -Path . -Recurse -Include *.js,*.jsx -Exclude node_modules,backups,.git | 
    Select-String -Pattern "course_description" -CaseSensitive |
    Where-Object { $_.Line -notmatch "course\.description \|\| course\.course_description" -and 
                   $_.Line -notmatch "// " -and 
                   $_.Line -notmatch "DATABASE SCHEMA" }

if ($courseDescRefs) {
    Write-Host "   ⚠️  Found problematic 'course_description' references:" -ForegroundColor Red
    $courseDescRefs | ForEach-Object {
        Write-Host "      - $($_.Path):$($_.LineNumber)" -ForegroundColor Red
        $problematicFiles += $_.Path
    }
} else {
    Write-Host "   ✅ No problematic 'course_description' references found" -ForegroundColor Green
}

# ============================================================================
# 2. VERIFY KEY FILES EXIST
# ============================================================================

Write-Host "`n📋 Step 2: Verifying key files exist..." -ForegroundColor Yellow

$keyFiles = @(
    "frontend/src/services/courseService.js",
    "backend/controllers/Profile.js",
    "backend/controllers/Payments.js",
    "backend/controllers/RatingAndReview.js",
    "backend/controllers/Course.js",
    "backend/controllers/Admin.js"
)

$missingFiles = @()

foreach ($file in $keyFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (MISSING)" -ForegroundColor Red
        $missingFiles += $file
    }
}

# ============================================================================
# 3. VERIFY BACKUPS EXIST
# ============================================================================

Write-Host "`n📋 Step 3: Verifying backups exist..." -ForegroundColor Yellow

if (Test-Path "backups") {
    $backupDirs = Get-ChildItem -Path "backups" -Directory
    if ($backupDirs.Count -gt 0) {
        Write-Host "   ✅ Found $($backupDirs.Count) backup(s)" -ForegroundColor Green
        $backupDirs | ForEach-Object {
            Write-Host "      - $($_.Name)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ⚠️  Backups directory exists but is empty" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠️  No backups directory found" -ForegroundColor Yellow
}

# ============================================================================
# 4. CHECK SERVICE LAYER
# ============================================================================

Write-Host "`n📋 Step 4: Checking service layer..." -ForegroundColor Yellow

if (Test-Path "frontend/src/services/courseService.js") {
    $serviceContent = Get-Content "frontend/src/services/courseService.js" -Raw
    
    # Check for correct column names
    if ($serviceContent -match "\.select\([^)]*title[^)]*\)") {
        Write-Host "   ✅ Service layer uses 'title'" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Service layer might not use 'title'" -ForegroundColor Yellow
    }
    
    if ($serviceContent -match "\.select\([^)]*description[^)]*\)") {
        Write-Host "   ✅ Service layer uses 'description'" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Service layer might not use 'description'" -ForegroundColor Yellow
    }
    
    # Check for problematic patterns
    if ($serviceContent -match "course_name" -and $serviceContent -notmatch "DATABASE SCHEMA.*NOT course_name") {
        Write-Host "   ❌ Service layer still references 'course_name'" -ForegroundColor Red
    }
    
    if ($serviceContent -match "course_description" -and $serviceContent -notmatch "DATABASE SCHEMA.*NOT course_name") {
        Write-Host "   ❌ Service layer still references 'course_description'" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Service layer file not found" -ForegroundColor Red
}

# ============================================================================
# 5. CHECK BACKEND CONTROLLERS
# ============================================================================

Write-Host "`n📋 Step 5: Checking backend controllers..." -ForegroundColor Yellow

$controllers = @(
    "backend/controllers/Profile.js",
    "backend/controllers/Payments.js",
    "backend/controllers/Course.js",
    "backend/controllers/Admin.js"
)

foreach ($controller in $controllers) {
    if (Test-Path $controller) {
        $content = Get-Content $controller -Raw
        $hasIssue = $false
        
        # Check for problematic patterns (excluding comments)
        $lines = Get-Content $controller
        foreach ($line in $lines) {
            if ($line -match "course_name" -and $line -notmatch "^\s*//" -and $line -notmatch "^\s*\*") {
                Write-Host "   ⚠️  $controller still has 'course_name' reference" -ForegroundColor Yellow
                $hasIssue = $true
                break
            }
            if ($line -match "course_description" -and $line -notmatch "^\s*//" -and $line -notmatch "^\s*\*") {
                Write-Host "   ⚠️  $controller still has 'course_description' reference" -ForegroundColor Yellow
                $hasIssue = $true
                break
            }
        }
        
        if (-not $hasIssue) {
            Write-Host "   ✅ $controller looks good" -ForegroundColor Green
        }
    }
}

# ============================================================================
# 6. FINAL SUMMARY
# ============================================================================

Write-Host "`n" + ("=" * 70) -ForegroundColor Gray
Write-Host "📊 VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Gray

$allGood = $true

if ($problematicFiles.Count -gt 0) {
    Write-Host "`n❌ Found $($problematicFiles.Count) file(s) with problematic references" -ForegroundColor Red
    $allGood = $false
} else {
    Write-Host "`n✅ No problematic references found" -ForegroundColor Green
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Missing $($missingFiles.Count) key file(s)" -ForegroundColor Red
    $allGood = $false
} else {
    Write-Host "✅ All key files present" -ForegroundColor Green
}

if ($allGood) {
    Write-Host "`n🎉 ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host "Your schema fix has been successfully applied." -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Restart your development server: cd frontend && npm run dev" -ForegroundColor White
    Write-Host "2. Hard refresh your browser: Ctrl+Shift+R" -ForegroundColor White
    Write-Host "3. Test your dashboard: /dashboard/instructor" -ForegroundColor White
    Write-Host "4. Check browser console for errors (F12)" -ForegroundColor White
} else {
    Write-Host "`n⚠️  SOME ISSUES FOUND" -ForegroundColor Yellow
    Write-Host "Please review the issues above and fix them." -ForegroundColor Yellow
    Write-Host "`nFor help, see:" -ForegroundColor Cyan
    Write-Host "- FIX_APPLIED_SUMMARY.md" -ForegroundColor White
    Write-Host "- POST_FIX_CHECKLIST.md" -ForegroundColor White
    Write-Host "- CONTEXT_TRANSFER_SUMMARY.md" -ForegroundColor White
}

Write-Host "`n" + ("=" * 70) -ForegroundColor Gray
Write-Host ""

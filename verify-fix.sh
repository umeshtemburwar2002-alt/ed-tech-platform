#!/bin/bash

# ============================================================================
# SCHEMA FIX VERIFICATION SCRIPT
# ============================================================================
# This script verifies that all schema fixes have been properly applied
# Run this after applying the fixes to ensure everything is correct
# ============================================================================

echo ""
echo "🔍 VERIFYING SCHEMA FIX..."
echo "======================================================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# ============================================================================
# 1. CHECK FOR PROBLEMATIC REFERENCES
# ============================================================================

echo ""
echo -e "${YELLOW}📋 Step 1: Checking for problematic references...${NC}"

problematic_count=0

# Search for course_name in code files (excluding backups and docs)
echo -e "${GRAY}   Searching for 'course_name' references...${NC}"
course_name_refs=$(find . -type f \( -name "*.js" -o -name "*.jsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/backups/*" \
    -not -path "*/.git/*" \
    -not -path "*.md" \
    -exec grep -l "course_name" {} \; 2>/dev/null | \
    while read file; do
        # Exclude defensive fallbacks and comments
        if ! grep -q "course\.title || course\.course_name" "$file" && \
           ! grep -q "DATABASE SCHEMA.*NOT course_name" "$file"; then
            echo "$file"
            ((problematic_count++))
        fi
    done)

if [ -n "$course_name_refs" ]; then
    echo -e "${RED}   ⚠️  Found problematic 'course_name' references:${NC}"
    echo "$course_name_refs" | while read file; do
        echo -e "${RED}      - $file${NC}"
    done
else
    echo -e "${GREEN}   ✅ No problematic 'course_name' references found${NC}"
fi

# Search for course_description in code files
echo -e "${GRAY}   Searching for 'course_description' references...${NC}"
course_desc_refs=$(find . -type f \( -name "*.js" -o -name "*.jsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/backups/*" \
    -not -path "*/.git/*" \
    -not -path "*.md" \
    -exec grep -l "course_description" {} \; 2>/dev/null | \
    while read file; do
        # Exclude defensive fallbacks and comments
        if ! grep -q "course\.description || course\.course_description" "$file" && \
           ! grep -q "DATABASE SCHEMA.*NOT course_name" "$file"; then
            echo "$file"
        fi
    done)

if [ -n "$course_desc_refs" ]; then
    echo -e "${RED}   ⚠️  Found problematic 'course_description' references:${NC}"
    echo "$course_desc_refs" | while read file; do
        echo -e "${RED}      - $file${NC}"
    done
else
    echo -e "${GREEN}   ✅ No problematic 'course_description' references found${NC}"
fi

# ============================================================================
# 2. VERIFY KEY FILES EXIST
# ============================================================================

echo ""
echo -e "${YELLOW}📋 Step 2: Verifying key files exist...${NC}"

key_files=(
    "frontend/src/services/courseService.js"
    "backend/controllers/Profile.js"
    "backend/controllers/Payments.js"
    "backend/controllers/RatingAndReview.js"
    "backend/controllers/Course.js"
    "backend/controllers/Admin.js"
)

missing_count=0

for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}   ✅ $file${NC}"
    else
        echo -e "${RED}   ❌ $file (MISSING)${NC}"
        ((missing_count++))
    fi
done

# ============================================================================
# 3. VERIFY BACKUPS EXIST
# ============================================================================

echo ""
echo -e "${YELLOW}📋 Step 3: Verifying backups exist...${NC}"

if [ -d "backups" ]; then
    backup_count=$(find backups -maxdepth 1 -type d | wc -l)
    backup_count=$((backup_count - 1)) # Exclude the backups directory itself
    
    if [ $backup_count -gt 0 ]; then
        echo -e "${GREEN}   ✅ Found $backup_count backup(s)${NC}"
        find backups -maxdepth 1 -type d -not -path "backups" | while read dir; do
            echo -e "${GRAY}      - $(basename $dir)${NC}"
        done
    else
        echo -e "${YELLOW}   ⚠️  Backups directory exists but is empty${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  No backups directory found${NC}"
fi

# ============================================================================
# 4. CHECK SERVICE LAYER
# ============================================================================

echo ""
echo -e "${YELLOW}📋 Step 4: Checking service layer...${NC}"

if [ -f "frontend/src/services/courseService.js" ]; then
    service_content=$(cat "frontend/src/services/courseService.js")
    
    # Check for correct column names
    if echo "$service_content" | grep -q "\.select.*title"; then
        echo -e "${GREEN}   ✅ Service layer uses 'title'${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Service layer might not use 'title'${NC}"
    fi
    
    if echo "$service_content" | grep -q "\.select.*description"; then
        echo -e "${GREEN}   ✅ Service layer uses 'description'${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Service layer might not use 'description'${NC}"
    fi
    
    # Check for problematic patterns
    if echo "$service_content" | grep -q "course_name" && \
       ! echo "$service_content" | grep -q "DATABASE SCHEMA.*NOT course_name"; then
        echo -e "${RED}   ❌ Service layer still references 'course_name'${NC}"
    fi
    
    if echo "$service_content" | grep -q "course_description" && \
       ! echo "$service_content" | grep -q "DATABASE SCHEMA.*NOT course_name"; then
        echo -e "${RED}   ❌ Service layer still references 'course_description'${NC}"
    fi
else
    echo -e "${RED}   ❌ Service layer file not found${NC}"
fi

# ============================================================================
# 5. CHECK BACKEND CONTROLLERS
# ============================================================================

echo ""
echo -e "${YELLOW}📋 Step 5: Checking backend controllers...${NC}"

controllers=(
    "backend/controllers/Profile.js"
    "backend/controllers/Payments.js"
    "backend/controllers/Course.js"
    "backend/controllers/Admin.js"
)

for controller in "${controllers[@]}"; do
    if [ -f "$controller" ]; then
        has_issue=false
        
        # Check for problematic patterns (excluding comments)
        while IFS= read -r line; do
            if echo "$line" | grep -q "course_name" && \
               ! echo "$line" | grep -q "^\s*//" && \
               ! echo "$line" | grep -q "^\s*\*"; then
                echo -e "${YELLOW}   ⚠️  $controller still has 'course_name' reference${NC}"
                has_issue=true
                break
            fi
            if echo "$line" | grep -q "course_description" && \
               ! echo "$line" | grep -q "^\s*//" && \
               ! echo "$line" | grep -q "^\s*\*"; then
                echo -e "${YELLOW}   ⚠️  $controller still has 'course_description' reference${NC}"
                has_issue=true
                break
            fi
        done < "$controller"
        
        if [ "$has_issue" = false ]; then
            echo -e "${GREEN}   ✅ $controller looks good${NC}"
        fi
    fi
done

# ============================================================================
# 6. FINAL SUMMARY
# ============================================================================

echo ""
echo "======================================================================"
echo -e "${CYAN}📊 VERIFICATION SUMMARY${NC}"
echo "======================================================================"

all_good=true

if [ -n "$course_name_refs" ] || [ -n "$course_desc_refs" ]; then
    echo ""
    echo -e "${RED}❌ Found problematic references${NC}"
    all_good=false
else
    echo ""
    echo -e "${GREEN}✅ No problematic references found${NC}"
fi

if [ $missing_count -gt 0 ]; then
    echo -e "${RED}❌ Missing $missing_count key file(s)${NC}"
    all_good=false
else
    echo -e "${GREEN}✅ All key files present${NC}"
fi

if [ "$all_good" = true ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}Your schema fix has been successfully applied.${NC}"
    echo ""
    echo -e "${CYAN}Next steps:${NC}"
    echo -e "${NC}1. Restart your development server: cd frontend && npm run dev${NC}"
    echo -e "${NC}2. Hard refresh your browser: Ctrl+Shift+R${NC}"
    echo -e "${NC}3. Test your dashboard: /dashboard/instructor${NC}"
    echo -e "${NC}4. Check browser console for errors (F12)${NC}"
else
    echo ""
    echo -e "${YELLOW}⚠️  SOME ISSUES FOUND${NC}"
    echo -e "${YELLOW}Please review the issues above and fix them.${NC}"
    echo ""
    echo -e "${CYAN}For help, see:${NC}"
    echo -e "${NC}- FIX_APPLIED_SUMMARY.md${NC}"
    echo -e "${NC}- POST_FIX_CHECKLIST.md${NC}"
    echo -e "${NC}- CONTEXT_TRANSFER_SUMMARY.md${NC}"
fi

echo ""
echo "======================================================================"
echo ""

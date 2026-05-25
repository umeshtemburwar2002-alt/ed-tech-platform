#!/bin/bash

# ================================================================
# Automated Schema Fix Script
# Replaces all course_name references with title
# ================================================================

echo "🔧 Starting Schema Mismatch Fix..."
echo ""

# Backup
echo "📦 Creating backups..."
mkdir -p backups
cp -r frontend/src backups/frontend-src-backup-$(date +%Y%m%d-%H%M%S)
cp -r backend backups/backend-backup-$(date +%Y%m%d-%H%M%S)
echo "✅ Backups created in ./backups/"
echo ""

# Replace in frontend
echo "🔄 Fixing frontend files..."

# Service layer
sed -i 's/course_name/title/g' frontend/src/services/courseService.js
sed -i 's/course_description/description/g' frontend/src/services/courseService.js

# Components
find frontend/src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/course\.course_name/course.title/g' {} +
find frontend/src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/course\.course_description/course.description/g' {} +
find frontend/src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/courses\.course_name/courses.title/g' {} +

echo "✅ Frontend fixed"
echo ""

# Replace in backend
echo "🔄 Fixing backend files..."

find backend -type f -name "*.js" -exec sed -i 's/course_name/title/g' {} +
find backend -type f -name "*.js" -exec sed -i 's/course_description/description/g' {} +

echo "✅ Backend fixed"
echo ""

# Update documentation
echo "📝 Updating documentation..."
find docs -type f -name "*.md" -exec sed -i 's/course_name/title/g' {} +
find docs -type f -name "*.sql" -exec sed -i 's/course_name/title/g' {} +
find docs -type f -name "*.sql" -exec sed -i 's/course_description/description/g' {} +

echo "✅ Documentation updated"
echo ""

echo "🎉 Schema fix complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test your application"
echo "3. If issues, restore from backups/"
echo ""

# ⚡ QUICK START - Fix Schema Mismatch in 2 Minutes

## 🎯 Problem
**Error:** `column courses.course_name does not exist`

## ✅ Solution
Your database uses `title`, but code uses `course_name`. Let's fix it!

---

## 🚀 FIX IT NOW (Choose One)

### Option 1: Automated Fix (30 seconds) ⭐ RECOMMENDED

**Windows:**
```powershell
.\fix-schema-mismatch.ps1
```

**Mac/Linux:**
```bash
chmod +x fix-schema-mismatch.sh
./fix-schema-mismatch.sh
```

**Done!** ✅ All files fixed automatically.

---

### Option 2: Manual Fix (2 minutes)

**Step 1:** Replace service file
```bash
mv frontend/src/services/courseService.js frontend/src/services/courseService_OLD.js
mv frontend/src/services/courseService_FIXED.js frontend/src/services/courseService.js
```

**Step 2:** Update components
```bash
# Find and replace in your editor:
# Find: course_name
# Replace: title

# Find: course_description  
# Replace: description
```

**Done!** ✅

---

## 🧪 Test It

1. **Restart dev server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Hard refresh browser:** `Ctrl+Shift+R`

3. **Check dashboard:** Navigate to `/dashboard/instructor`

4. **Verify:** No errors, courses load! ✅

---

## ✨ Success!

You should now see:
- ✅ Dashboard loads
- ✅ Courses display
- ✅ No console errors
- ✅ Everything works!

---

## 🚨 Still Broken?

**Check your database:**
```sql
-- Run in Supabase SQL Editor
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'courses';
```

**If you see `course_name` (not `title`):**
```sql
-- Rename columns
ALTER TABLE courses RENAME COLUMN course_name TO title;
ALTER TABLE courses RENAME COLUMN course_description TO description;
```

---

## 📚 Need More Help?

- **Full Guide:** `COMPLETE_SCHEMA_FIX.md`
- **Details:** `FINAL_SCHEMA_FIX_SUMMARY.md`
- **Backups:** Check `./backups/` folder

---

**That's it! Your platform is fixed!** 🎉

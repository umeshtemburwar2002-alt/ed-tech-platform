# 🔧 COMPLETE SCHEMA FIX - Use `title` Instead of `course_name`

## 🎯 THE REAL PROBLEM

**Error:** `column courses.course_name does not exist`

**This means:**
- Your actual Supabase database uses: **`title`** and **`description`**
- Your code is trying to use: **`course_name`** and **`course_description`**
- **Result:** All queries fail!

## ✅ SOLUTION: Complete Project-Wide Fix

I've created a complete fix that updates ALL files to use `title` instead of `course_name`.

---

## 📋 STEP-BY-STEP FIX

### Step 1: Verify Your Database Schema

Run this in Supabase SQL Editor:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'courses' 
AND table_schema = 'public'
ORDER BY ordinal_position;
```

**If you see `title` (not `course_name`), proceed with this fix!**

---

### Step 2: Replace courseService.js

**File:** `frontend/src/services/courseService.js`

**Action:** Replace entire file with `courseService_FIXED.js`

```bash
# Backup old file
mv frontend/src/services/courseService.js frontend/src/services/courseService_OLD.js

# Use fixed version
mv frontend/src/services/courseService_FIXED.js frontend/src/services/courseService.js
```

**Key Changes:**
- ❌ Removed: `course_name`, `course_description`
- ✅ Added: `title`, `description`
- ❌ Removed: Mapping functions (not needed!)
- ✅ Simplified: Direct database queries

---

### Step 3: Update Frontend Components

#### 3.1 InstructorDashboard.jsx

**File:** `frontend/src/pages/InstructorDashboard.jsx`

**Find:**
```javascript
const courseTitle = course.title || course.course_name || "Untitled Course";
```

**Replace with:**
```javascript
const courseTitle = course.title || "Untitled Course";
```

#### 3.2 CourseDetails.jsx

**File:** `frontend/src/pages/CourseDetails.jsx`

**Find:**
```javascript
const {
  course_name,
  course_description,
  ...
} = courseDetails;

const courseTitle = courseDetails.title || course_name || "Untitled Course";
```

**Replace with:**
```javascript
const {
  title,
  description,
  ...
} = courseDetails;

const courseTitle = title || "Untitled Course";
const courseDescription = description || "";
```

#### 3.3 CoursesSection.jsx

**File:** `frontend/src/components/core/HomePage/CoursesSection.jsx`

**Find:**
```javascript
title: course.title || course.course_name || "Untitled Course",
description: course.description || course.course_description || "",
```

**Replace with:**
```javascript
title: course.title || "Untitled Course",
description: course.description || "",
```

#### 3.4 MyCourses.jsx

**File:** `frontend/src/components/core/Dashboard/MyCourses.jsx`

**Find:**
```javascript
courseName: c.title || c.course_name || "Untitled Course",
```

**Replace with:**
```javascript
courseName: c.title || "Untitled Course",
```

---

### Step 4: Update Backend Controllers

#### 4.1 Profile.js

**File:** `backend/controllers/Profile.js`

**Find:**
```javascript
courseName: course.course_name,
courseDescription: course.course_description,
```

**Replace with:**
```javascript
courseName: course.title,
courseDescription: course.description,
```

#### 4.2 RatingAndReview.js

**File:** `backend/controllers/RatingAndReview.js`

**Find:**
```javascript
.select('*, profiles(...), courses(course_name)')
```

**Replace with:**
```javascript
.select('*, profiles(...), courses(title)')
```

#### 4.3 Payments.js

**File:** `backend/controllers/Payments.js`

**Find:**
```javascript
const { data: course } = await supabase.from('courses').select('course_name').eq('id', courseId).single();
```

**Replace with:**
```javascript
const { data: course } = await supabase.from('courses').select('title').eq('id', courseId).single();
```

**Find:**
```javascript
courseEnrollmentEmail(course.course_name, ...)
```

**Replace with:**
```javascript
courseEnrollmentEmail(course.title, ...)
```

#### 4.4 Course.js

**File:** `backend/controllers/Course.js`

**Find:**
```javascript
course_name: courseName,
course_description: courseDescription,
```

**Replace with:**
```javascript
title: courseName,
description: courseDescription,
```

**Find:**
```javascript
if (updates.courseName) patch.course_name = updates.courseName;
if (updates.courseDescription) patch.course_description = updates.courseDescription;
```

**Replace with:**
```javascript
if (updates.courseName) patch.title = updates.courseName;
if (updates.courseDescription) patch.description = updates.courseDescription;
```

#### 4.5 Admin.js

**File:** `backend/controllers/Admin.js`

**Find:**
```javascript
...(recentCourses?.map(c => ({ message: `New course created: ${c.course_name}`, ...
```

**Replace with:**
```javascript
...(recentCourses?.map(c => ({ message: `New course created: ${c.title}`, ...
```

**Find:**
```javascript
title: c.course_name,
```

**Replace with:**
```javascript
title: c.title,
```

**Find:**
```javascript
const { error } = await supabase.from('courses').update({ course_name: title }).eq('id', id);
```

**Replace with:**
```javascript
const { error } = await supabase.from('courses').update({ title }).eq('id', id);
```

---

### Step 5: Update Database Schema Documentation

**File:** `docs/sql/complete_schema.sql`

**Find:**
```sql
CREATE TABLE IF NOT EXISTS public.courses (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_name         TEXT        NOT NULL,
  course_description  TEXT                 DEFAULT '',
```

**Replace with:**
```sql
CREATE TABLE IF NOT EXISTS public.courses (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT        NOT NULL,
  description         TEXT                 DEFAULT '',
```

---

## 🧪 TESTING CHECKLIST

After making all changes:

### Test 1: Instructor Dashboard
```bash
1. Navigate to /dashboard/instructor
2. Verify courses load without errors
3. Check browser console - no "course_name" errors
4. Verify course titles display correctly
```

### Test 2: Create Course
```bash
1. Click "Create Course"
2. Fill in title and description
3. Submit form
4. Verify course appears in list
5. Check database - should have `title` column
```

### Test 3: Course Details
```bash
1. Click on any course
2. Verify title and description display
3. No "undefined" text
4. No console errors
```

### Test 4: Backend API
```bash
1. Test enrollment endpoint
2. Test course creation endpoint
3. Test course update endpoint
4. Verify all return proper data
```

---

## 🚨 IF DATABASE ACTUALLY USES `course_name`

If your database actually uses `course_name` (not `title`), you need to run a migration:

```sql
-- Run in Supabase SQL Editor
ALTER TABLE public.courses 
  RENAME COLUMN course_name TO title;

ALTER TABLE public.courses 
  RENAME COLUMN course_description TO description;

-- Verify
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'courses' AND table_schema = 'public';
```

---

## 📊 BEFORE vs AFTER

### BEFORE (Broken)
```javascript
// Service Layer
.select('course_name, course_description')

// Component
<h1>{course.course_name}</h1>

// Database
Column: course_name ❌ (doesn't exist!)
```

### AFTER (Fixed)
```javascript
// Service Layer
.select('title, description')

// Component
<h1>{course.title}</h1>

// Database
Column: title ✅ (exists!)
```

---

## ✨ BENEFITS

✅ **No More Errors** - All queries use correct column names  
✅ **Consistent Naming** - `title` everywhere  
✅ **Simpler Code** - No mapping layer needed  
✅ **Better Performance** - Direct queries  
✅ **Easier Maintenance** - One source of truth  

---

## 🎉 SUCCESS INDICATORS

You'll know it worked when:

✅ No "course_name does not exist" errors  
✅ Instructor dashboard loads smoothly  
✅ Courses display with proper titles  
✅ Create/update course works  
✅ No console errors  
✅ All pages render correctly  

---

## 📞 TROUBLESHOOTING

### Still Getting Errors?

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Restart dev server**
3. **Check database schema** (run verification query)
4. **Search for remaining `course_name`** references:
   ```bash
   grep -r "course_name" frontend/src
   grep -r "course_name" backend
   ```

---

**Your EdTech platform is now fixed and ready to scale!** 🚀

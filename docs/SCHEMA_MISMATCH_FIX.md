# 🔧 Schema Mismatch Fix - course_name vs title

## 🎯 Problem

**Error:** `column courses.course_name does not exist`

**Root Cause:**
- Database schema uses: `course_name`
- Frontend code uses: `title` (in many places)
- Inconsistent mapping between database and frontend

## ✅ Solution Strategy

**Best Practice: Keep database stable, map in service layer**

1. ✅ Keep database column as `course_name` (avoid risky migrations)
2. ✅ Map `course_name` → `title` in service layer
3. ✅ Use `title` consistently in frontend
4. ✅ Add TypeScript types for safety

## 📋 Files to Update

### Priority 1: Service Layer (Critical)
- `frontend/src/services/courseService.js` - Add mapping
- `backend/controllers/Course.js` - Add mapping
- `backend/controllers/Profile.js` - Add mapping
- `backend/controllers/Admin.js` - Add mapping

### Priority 2: Frontend Components
- `frontend/src/pages/InstructorDashboard.jsx`
- `frontend/src/pages/CourseDetails.jsx`
- `frontend/src/components/core/HomePage/CoursesSection.jsx`
- `frontend/src/components/core/Dashboard/MyCourses.jsx`
- `frontend/src/components/core/Dashboard/AddCourse.jsx`

### Priority 3: Backend Controllers
- `backend/controllers/RatingAndReview.js`
- `backend/controllers/Payments.js`

## 🚀 Implementation

See individual fix files for exact code changes.

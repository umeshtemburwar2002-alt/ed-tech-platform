# Instructor Support System - Complete Setup Guide

## 📋 Overview
Production-ready Instructor Support Ticket System for EdTech SaaS platform with:
- Ticket creation and management
- File uploads to Supabase Storage
- Complete SQL schema and RLS policies
- Modern dark UI with animations

---

## 🚀 Quick Start

### 1. Set Up Supabase

Run the SQL from `instructor-support-supabase-sql.sql` in your Supabase SQL Editor to:
- Create `instructor_support_tickets` table
- Add indexes for performance
- Enable RLS policies
- Create `updated_at` trigger
- Set up storage policies

### 2. Create Storage Bucket
Create a bucket named `support-attachments` in Supabase Storage (Dashboard → Storage → New Bucket)

---

## 📁 Folder Structure

```
frontend/src/
├── pages/dashboard/instructor/
│   └── Support.jsx              # Main instructor support component
├── docs/
│   ├── instructor-support-supabase-sql.sql  # SQL setup
│   └── instructor-support-system-readme.md  # This file
```

---

## 🛠️ Features

### Form Fields
- ✅ Subject (required)
- ✅ Category dropdown (required)
- ✅ Course name (optional)
- ✅ Priority buttons
- ✅ Message (required)
- ✅ Screenshot upload (PNG/JPG/WEBP/PDF, max 5MB)

### Upload Structure
```
support-attachments/
└── instructor/
    └── {user-id}/
        └── {timestamp}-{filename}
```

### Ticket Management
- View all tickets
- Filter by status
- Search tickets
- View ticket details in modal

---

## 🔒 Security

### RLS Policies
- **Instructors**: Can only view/create/update their own tickets
- **Storage**: Can only upload/read/delete files in their own folder
- **Admins**: (Optional) Full access to all tickets and storage

---

## 📊 Database Schema

### instructor_support_tickets Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| instructor_id | UUID | Foreign key to auth.users |
| name | TEXT | Instructor's full name |
| email | TEXT | Instructor's email |
| subject | TEXT | Ticket subject (required) |
| category | TEXT | Issue category |
| course_name | TEXT | Related course (optional) |
| priority | TEXT | Priority (low/medium/high/urgent) |
| message | TEXT | Ticket message (required) |
| attachment_url | TEXT | Uploaded file URL |
| status | TEXT | Ticket status (open/pending/in_progress/resolved/closed) |
| admin_note | TEXT | Admin reply |
| created_at | TIMESTAMPTZ | Creation time |
| updated_at | TIMESTAMPTZ | Last update time |

---

## 🎨 UI Features
- Dark theme with glassmorphism
- Framer Motion animations
- Responsive design
- Loading spinners
- Toast notifications
- Ticket history with search/filter
- FAQ accordion

---

## 📝 Usage
1. Navigate to `/dashboard/instructor/support`
2. Fill out the support ticket form
3. Upload screenshots if needed
4. Click "Submit Ticket"
5. View your tickets in the "My Tickets" section

---

## 🐛 Troubleshooting
- **RLS Policy Errors**: Ensure the SQL was run correctly and RLS is enabled
- **Upload Failures**: Check bucket name is `support-attachments` and storage policies are set
- **Insert Errors**: Verify all required fields are filled and table exists

---

## 📚 Additional Resources
- Supabase Docs: https://supabase.com/docs
- React Docs: https://react.dev
- Framer Motion: https://www.framer.com/motion

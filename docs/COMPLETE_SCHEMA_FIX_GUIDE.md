# 🔧 Complete Schema Fix - Database Column Mismatch

## 🎯 Critical Issue

**Error:** `column courses.course_name does not exist`

**This means your actual Supabase database uses `title`, NOT `course_name`!**

## 🔍 Root Cause Analysis

### The Confusion:
1. **Schema file** (`docs/sql/complete_schema.sql`) shows: `course_name`
2. **Actual Supabase database** has: `title`
3. **Frontend code** uses: mix of both
4. **Result:** Database queries fail

### Why This Happened:
- Schema file was never run on your database, OR
- Database was created manually with different column names, OR
- Database was migrated/changed but schema file wasn't updated

## ✅ Solution: Standardize on `title`

Since your actual database uses `title`, we'll update ALL code to use `title`.

## 📋 Step-by-Step Fix

### Step 1: Verify Your Database Schema

Run this in Supabase SQL Editor:

```sql
-- Check actual column names
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'courses' 
AND table_schema = 'public'
ORDER BY ordinal_position;
```

**Expected output if database uses `title`:**
```
column_name          | data_type
---------------------|----------
id                   | uuid
title                | text      ← THIS
description          | text      ← THIS
instructor_id        | uuid
price                | numeric
...
```

### Step 2: Update Schema Documentation

Update `docs/sql/complete_schema.sql` to match reality:

```sql
CREATE TABLE IF NOT EXISTS public.courses (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT        NOT NULL,           -- ← CHANGED
  description         TEXT                 DEFAULT '', -- ← CHANGED
  instructor_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  what_you_will_learn TEXT                 DEFAULT '',
  price               NUMERIC(10,2)        DEFAULT 0,
  thumbnail           TEXT                 DEFAULT '',
  tags                TEXT[]               DEFAULT '{}',
  category_id         UUID                 REFERENCES public.categories(id) ON DELETE SET NULL,
  instructions        TEXT[]               DEFAULT '{}',
  status              TEXT        NOT NULL DEFAULT 'Draft'
                                  CHECK (status IN ('Draft', 'Published')),
  sold_count          INT                  DEFAULT 0,
  created_at          TIMESTAMPTZ          DEFAULT NOW(),
  updated_at          TIMESTAMPTZ          DEFAULT NOW()
);
```

## 📁 Files to Update

I'll provide exact fixes for each file...


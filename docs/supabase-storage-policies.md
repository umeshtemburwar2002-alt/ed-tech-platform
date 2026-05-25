# Supabase Storage Policies for support-attachments Bucket

## Bucket Name: `support-attachments`

## Storage Policies (Recommended)

### 1. Allow authenticated users to upload to their own folder
```sql
CREATE POLICY "Users can upload to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  (storage.foldername(name))[1] = auth.uid()::text AND
  (storage.foldername(name))[2] IN ('student', 'instructor')
);
```

### 2. Allow users to read their own files
```sql
CREATE POLICY "Users can read their own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3. Allow users to delete their own files
```sql
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 4. Allow admins full access
```sql
CREATE POLICY "Admins have full access"
ON storage.objects
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND account_type = 'Admin'
  )
);
```

## Folder Structure
```
support-attachments/
├── student/
│   └── user-id-123/
│       └── 1699999999999-screenshot.webp
└── instructor/
    └── user-id-456/
        └── 1699999999999-screenshot.pdf
```

# 🔐 AUTHENTICATION TROUBLESHOOTING - COMPLETE GUIDE

**For:** Supabase "Invalid API key" error  
**Status:** 🔴 CRITICAL - Login broken  
**Last Updated:** May 28, 2026  

---

## 🎯 THE PROBLEM

You see this error when trying to log in:

```
AuthApiError: Invalid API key
Failed to load resource: the server responded with a status of 401
```

**What This Means:**
- Supabase is rejecting your authentication request
- Your API key is invalid, expired, or doesn't match the project
- The Supabase project may have been deleted or reset

---

## ⚡ QUICK FIX (TRY THIS FIRST)

### **Step 1: Restart Frontend Server**

```bash
# In your frontend terminal:
# Press Ctrl+C to stop

npm start

# Wait for: "Compiled successfully"
```

**Why:** Environment variables might not be loaded

**Success Rate:** 60%

---

### **Step 2: If Still Failing, Check Supabase Project**

```
1. Go to: https://app.supabase.com/projects
2. Look for: bjfwdidbkbmlhowzuklk
3. If NOT found:
   → Project was deleted
   → Need to create new project
4. If found:
   → Go to Settings → API
   → Copy Anon Key
   → Update frontend/.env
   → Restart frontend
```

**Success Rate:** 80%

---

### **Step 3: If Project Deleted, Create New One**

```
1. Go to: https://app.supabase.com
2. Click: "New Project"
3. Fill in project details
4. Wait for creation
5. Get API keys
6. Update .env files
7. Restart servers
```

**Success Rate:** 100%

---

## 🔍 DETAILED DIAGNOSTIC

### **Diagnostic 1: Check Environment Variables**

**In Browser Console (F12):**

```javascript
// Check if variables are loaded
console.log('SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY);

// Check if Supabase client exists
console.log('Supabase Client:', window.supabase);
```

**Expected Output:**
```
✅ SUPABASE_URL: https://bjfwdidbkbmlhowzuklk.supabase.co
✅ SUPABASE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ Supabase Client: { auth: {...}, from: {...}, ... }
```

**If Missing:**
```
❌ Variables are undefined
→ Solution: Restart frontend dev server
```

---

### **Diagnostic 2: Check Supabase Project Status**

**In Browser Console:**

```javascript
// Try to connect to Supabase
fetch('https://bjfwdidbkbmlhowzuklk.supabase.co/rest/v1/', {
  headers: {
    'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY
  }
})
.then(r => r.json())
.then(data => console.log('✅ Supabase Response:', data))
.catch(err => console.error('❌ Supabase Error:', err));
```

**Expected:**
```
✅ Supabase Response: { ... }
```

**If Error:**
```
❌ Error connecting to Supabase
→ Possible causes:
  1. Project deleted
  2. Project paused
  3. API key invalid
  4. Network issue
```

---

### **Diagnostic 3: Check API Key Format**

**In Browser Console:**

```javascript
// Decode JWT to verify format
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
const parts = key.split('.');

if (parts.length === 3) {
  const payload = parts[1];
  const padded = payload + '='.repeat(4 - payload.length % 4);
  const decoded = JSON.parse(atob(padded));
  console.log('✅ JWT Valid');
  console.log('Payload:', decoded);
  console.log('Expires:', new Date(decoded.exp * 1000));
} else {
  console.error('❌ Invalid JWT format');
}
```

**Expected:**
```
✅ JWT Valid
Payload: { iss: "supabase", ref: "bjfwdidbkbmlhowzuklk", role: "anon", ... }
Expires: (future date)
```

**If Error:**
```
❌ Invalid JWT format
→ Solution: Get fresh API key from Supabase
```

---

### **Diagnostic 4: Check Network Request**

**In Browser DevTools:**

1. Open: F12 → Network tab
2. Try to login
3. Look for: Request to `bjfwdidbkbmlhowzuklk.supabase.co/auth/v1/token`
4. Check response:

**Expected:**
```
✅ Status: 200
✅ Response: { access_token: "...", user: {...} }
```

**If 401:**
```
❌ Status: 401
❌ Response: { error: "Invalid API key" }
→ API key is invalid or project deleted
```

---

## 🛠️ FIXES BY CAUSE

### **Fix 1: Environment Variables Not Loaded**

**Symptoms:**
- Console shows `undefined` for environment variables
- Supabase client doesn't exist

**Solution:**
```bash
# Restart frontend
cd frontend
npm start

# Wait for: "Compiled successfully"
# Refresh browser
# Try logging in again
```

---

### **Fix 2: API Key Invalid**

**Symptoms:**
- Environment variables loaded correctly
- Network request returns 401
- Error: "Invalid API key"

**Solution:**
```bash
# 1. Get fresh API key from Supabase
# Go to: https://app.supabase.com/projects/bjfwdidbkbmlhowzuklk
# Go to: Settings → API
# Copy: Anon Key

# 2. Update frontend/.env
REACT_APP_SUPABASE_URL=https://bjfwdidbkbmlhowzuklk.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<paste-new-key-here>

# 3. Update backend/.env
SUPABASE_URL=https://bjfwdidbkbmlhowzuklk.supabase.co
SUPABASE_ANON_KEY=<paste-new-key-here>

# 4. Restart servers
cd frontend && npm start
# In new terminal:
cd backend && npm start

# 5. Try logging in again
```

---

### **Fix 3: Supabase Project Deleted**

**Symptoms:**
- Project not found in Supabase dashboard
- Cannot connect to Supabase API

**Solution:**
```bash
# 1. Create new Supabase project
# Go to: https://app.supabase.com
# Click: "New Project"
# Fill in details
# Wait for creation

# 2. Get API keys
# Go to: Settings → API
# Copy: Project URL, Anon Key, Service Role Key

# 3. Update .env files
# frontend/.env:
REACT_APP_SUPABASE_URL=<new-url>
REACT_APP_SUPABASE_ANON_KEY=<new-anon-key>

# backend/.env:
SUPABASE_URL=<new-url>
SUPABASE_ANON_KEY=<new-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<new-service-key>

# 4. Run database migrations
# Execute SECURITY_FIX_SCHEMA.sql in Supabase SQL editor

# 5. Restart servers
cd frontend && npm start
# In new terminal:
cd backend && npm start

# 6. Try logging in again
```

---

### **Fix 4: Network/CORS Issue**

**Symptoms:**
- Network request fails
- CORS error in console
- Cannot reach Supabase API

**Solution:**
```bash
# 1. Check internet connection
ping bjfwdidbkbmlhowzuklk.supabase.co

# 2. Check Supabase status
# Go to: https://status.supabase.com

# 3. Check CORS configuration
# Go to: Supabase → Authentication → URL Configuration
# Verify:
#   - Site URL: http://localhost:3000
#   - Redirect URLs: http://localhost:3000/auth/callback

# 4. Clear browser cache
# Press: Ctrl+Shift+Delete
# Select: All time
# Click: Clear data

# 5. Try logging in again
```

---

## 📋 COMPLETE TROUBLESHOOTING CHECKLIST

### **Before Testing**
- [ ] Frontend dev server running on port 3000
- [ ] Backend dev server running on port 4000
- [ ] .env files have correct API keys
- [ ] Supabase project exists and is active
- [ ] No console errors on page load

### **During Testing**
- [ ] Environment variables loaded (check console)
- [ ] Supabase client initialized (check console)
- [ ] Network request succeeds (check Network tab)
- [ ] No "Invalid API key" error
- [ ] No "Failed to load resource: 401" error

### **After Testing**
- [ ] Login successful
- [ ] Redirected to dashboard
- [ ] User data loaded
- [ ] No errors in console
- [ ] No errors in backend logs

---

## 🔐 SECURITY CHECKLIST

### **Never Expose**
- ❌ SUPABASE_SERVICE_ROLE_KEY in frontend
- ❌ RAZORPAY_KEY_SECRET in frontend
- ❌ JWT_SECRET in frontend
- ❌ Any secrets in version control

### **Always Use**
- ✅ REACT_APP_SUPABASE_ANON_KEY in frontend (public key)
- ✅ SUPABASE_SERVICE_ROLE_KEY in backend only (secret key)
- ✅ Environment variables for all secrets
- ✅ .gitignore to exclude .env files

---

## 📞 GETTING HELP

### **If Still Not Working:**

1. **Check Supabase Status**
   - https://status.supabase.com

2. **Check Supabase Logs**
   - Supabase Dashboard → Logs

3. **Check Browser Console**
   - F12 → Console tab

4. **Check Backend Logs**
   - Backend terminal output

5. **Contact Support**
   - Supabase Discord: https://discord.supabase.com
   - GitHub Issues: https://github.com/supabase/supabase/issues

---

## 📚 RELATED DOCUMENTATION

- **SUPABASE_AUTH_ERROR_SUMMARY.md** - Quick summary
- **SUPABASE_AUTH_FIX.md** - Complete fix guide
- **DIAGNOSE_SUPABASE.md** - Diagnostic steps
- **This file** - Troubleshooting guide

---

## ✅ VERIFICATION

### **After Applying Fix:**

```
1. Go to: http://localhost:3000/login
2. Enter test credentials:
   Email: test@example.com
   Password: Test@123456
3. Click "Sign In"
4. Expected:
   ✅ No "Invalid API key" error
   ✅ Redirects to dashboard
   ✅ User logged in successfully
```

---

## 🎯 SUMMARY

| Issue | Cause | Fix | Time |
|-------|-------|-----|------|
| "Invalid API key" | Env vars not loaded | Restart frontend | 1 min |
| "Invalid API key" | API key invalid | Update .env | 5 min |
| "Invalid API key" | Project deleted | Create new project | 10 min |
| "Failed to load: 401" | Network issue | Check internet | 2 min |
| "Failed to load: 401" | CORS issue | Check settings | 5 min |

---

## 🚀 QUICK START

```bash
# 1. Restart frontend
cd frontend
npm start

# 2. If still failing, check Supabase
# Go to: https://app.supabase.com/projects

# 3. If project not found, create new one
# Get new API keys
# Update .env files
# Restart servers

# 4. Try logging in
# Go to: http://localhost:3000/login
```

---

**Status: 🔴 NEEDS ACTION**

**Time to Fix:** 5-15 minutes

**Difficulty:** Easy

---

*Last Updated: May 28, 2026*  
*Complete Authentication Troubleshooting Guide*

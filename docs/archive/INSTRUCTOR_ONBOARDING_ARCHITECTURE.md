# 🎓 Instructor Onboarding & Verification System - Architecture

## 📋 Complete System Overview

This document outlines the complete production-level instructor onboarding system for your AI-powered EdTech SaaS platform.

---

## 🏗️ FOLDER STRUCTURE

```
frontend/
├── src/
│   ├── pages/
│   │   ├── instructor/
│   │   │   ├── onboarding/
│   │   │   │   ├── OnboardingLayout.jsx          # Main wrapper
│   │   │   │   ├── Step1BasicProfile.jsx         # Step 1
│   │   │   │   ├── Step2Professional.jsx         # Step 2
│   │   │   │   ├── Step3Teaching.jsx             # Step 3
│   │   │   │   ├── Step4Verification.jsx         # Step 4
│   │   │   │   ├── Step5Payment.jsx              # Step 5
│   │   │   │   ├── Step6Review.jsx               # Step 6
│   │   │   │   └── OnboardingComplete.jsx        # Success page
│   │   │   └── InstructorDashboard.jsx           # Main dashboard
│   │   └── auth/
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       └── OAuthCallback.jsx
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── StepIndicator.jsx
│   │   │   ├── FileUploadField.jsx
│   │   │   ├── SkillSelector.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── CountrySelector.jsx
│   │   │   └── VerificationStatus.jsx
│   │   └── common/
│   │       ├── ProtectedRoute.jsx
│   │       ├── RoleBasedRedirect.jsx
│   │       └── LoadingSpinner.jsx
│   ├── services/
│   │   ├── instructorService.js        # Onboarding APIs
│   │   ├── uploadService.js            # File upload logic
│   │   ├── authService.js              # Auth APIs
│   │   └── verificationService.js      # Verification APIs
│   ├── hooks/
│   │   ├── useOnboarding.js            # Onboarding state
│   │   ├── useAuth.js                  # Auth state
│   │   ├── useFormValidation.js        # Form validation
│   │   └── useFileUpload.js            # File upload hook
│   ├── context/
│   │   ├── AuthContext.jsx             # Auth context
│   │   ├── OnboardingContext.jsx       # Onboarding context
│   │   └── UserContext.jsx             # User context
│   ├── utils/
│   │   ├── validators.js               # Validation functions
│   │   ├── formatters.js               # Data formatters
│   │   ├── constants.js                # Constants
│   │   └── errorHandler.js             # Error handling
│   └── config/
│       ├── supabaseClient.js
│       └── apiConfig.js

backend/
├── routes/
│   ├── instructor.js                   # Instructor routes
│   ├── onboarding.js                   # Onboarding routes
│   ├── verification.js                 # Verification routes
│   ├── payment.js                      # Payment routes
│   └── auth.js                         # Auth routes
├── controllers/
│   ├── instructorController.js         # Instructor logic
│   ├── onboardingController.js         # Onboarding logic
│   ├── verificationController.js       # Verification logic
│   ├── paymentController.js            # Payment logic
│   └── authController.js               # Auth logic
├── middleware/
│   ├── auth.js                         # Auth middleware
│   ├── roleCheck.js                    # Role check middleware
│   ├── validation.js                   # Validation middleware
│   ├── errorHandler.js                 # Error handler
│   └── fileUpload.js                   # File upload middleware
├── models/
│   ├── Instructor.js                   # Instructor model
│   ├── OnboardingStep.js               # Onboarding step model
│   ├── Verification.js                 # Verification model
│   └── Payment.js                      # Payment model
├── utils/
│   ├── validators.js                   # Validation logic
│   ├── fileHandler.js                  # File handling
│   ├── emailService.js                 # Email service
│   ├── aiScoring.js                    # AI scoring logic
│   └── constants.js                    # Constants
├── config/
│   ├── supabase.js                     # Supabase config
│   ├── cloudinary.js                   # Cloudinary config
│   └── email.js                        # Email config
└── index.js                            # Entry point
```

---

## 🗄️ DATABASE SCHEMA (Supabase)

### Tables

```sql
-- Instructors table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Profile
  full_name VARCHAR(255),
  headline VARCHAR(255),
  bio TEXT,
  profile_photo_url VARCHAR(500),
  country VARCHAR(100),
  city VARCHAR(100),
  languages TEXT[], -- Array of languages
  
  -- Professional Info
  skills TEXT[], -- Array of skills
  experience_years INTEGER,
  profession VARCHAR(255),
  company VARCHAR(255),
  resume_url VARCHAR(500),
  portfolio_website VARCHAR(500),
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  youtube_url VARCHAR(500),
  
  -- Teaching Info
  teaching_categories TEXT[], -- Array of categories
  course_language VARCHAR(100),
  teaching_experience_years INTEGER,
  certifications TEXT[], -- Array of certifications
  students_taught INTEGER DEFAULT 0,
  sample_video_url VARCHAR(500),
  
  -- Verification
  government_id_url VARCHAR(500),
  government_id_type VARCHAR(50), -- 'passport', 'aadhar', 'pan', etc.
  face_verification_url VARCHAR(500),
  phone_number VARCHAR(20),
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Payment
  bank_account_number VARCHAR(255),
  bank_ifsc_code VARCHAR(20),
  upi_id VARCHAR(255),
  paypal_email VARCHAR(255),
  gst_number VARCHAR(50),
  
  -- Status
  onboarding_status VARCHAR(50) DEFAULT 'not_started', -- not_started, in_progress, completed
  onboarding_step INTEGER DEFAULT 0,
  verification_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  is_verified BOOLEAN DEFAULT FALSE,
  verification_badge BOOLEAN DEFAULT FALSE,
  
  -- AI Scoring
  ai_instructor_score DECIMAL(3,2) DEFAULT 0.00,
  profile_completion_percentage INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  onboarding_completed_at TIMESTAMP,
  verified_at TIMESTAMP
);

-- Onboarding Steps table (for tracking progress)
CREATE TABLE onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_name VARCHAR(100),
  completed BOOLEAN DEFAULT FALSE,
  data JSONB, -- Store step data
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Verification Documents table
CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  document_type VARCHAR(50), -- 'government_id', 'face_verification', etc.
  document_url VARCHAR(500),
  verification_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  verified_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment Methods table
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  payment_type VARCHAR(50), -- 'bank', 'upi', 'paypal'
  is_primary BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  data JSONB, -- Encrypted payment details
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Instructor Scores table (for AI scoring)
CREATE TABLE instructor_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  profile_completeness DECIMAL(3,2),
  verification_score DECIMAL(3,2),
  experience_score DECIMAL(3,2),
  teaching_score DECIMAL(3,2),
  overall_score DECIMAL(3,2),
  calculated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 RLS Policies

```sql
-- Instructors table RLS
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own instructor profile"
  ON instructors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own instructor profile"
  ON instructors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own instructor profile"
  ON instructors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Onboarding Steps table RLS
ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own onboarding steps"
  ON onboarding_steps FOR SELECT
  USING (
    instructor_id IN (
      SELECT id FROM instructors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own onboarding steps"
  ON onboarding_steps FOR UPDATE
  USING (
    instructor_id IN (
      SELECT id FROM instructors WHERE user_id = auth.uid()
    )
  );

-- Similar policies for other tables...
```

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/github` - GitHub OAuth
- `GET /api/auth/me` - Get current user

### Instructor Profile
- `GET /api/instructor/profile` - Get instructor profile
- `POST /api/instructor/profile` - Create instructor profile
- `PUT /api/instructor/profile` - Update instructor profile
- `GET /api/instructor/profile/completion` - Get completion percentage

### Onboarding
- `GET /api/onboarding/status` - Get onboarding status
- `POST /api/onboarding/step/:step` - Save step data
- `GET /api/onboarding/step/:step` - Get step data
- `POST /api/onboarding/complete` - Complete onboarding
- `GET /api/onboarding/draft` - Get draft data

### Verification
- `POST /api/verification/upload-document` - Upload verification document
- `GET /api/verification/status` - Get verification status
- `POST /api/verification/face-check` - Face verification
- `POST /api/verification/phone-verify` - Phone verification

### Payment
- `POST /api/payment/setup` - Setup payment method
- `GET /api/payment/methods` - Get payment methods
- `PUT /api/payment/methods/:id` - Update payment method
- `DELETE /api/payment/methods/:id` - Delete payment method

### File Upload
- `POST /api/upload/profile-photo` - Upload profile photo
- `POST /api/upload/resume` - Upload resume
- `POST /api/upload/video` - Upload video
- `POST /api/upload/document` - Upload document

---

## 🔐 Authentication Flow

```
1. User Signs Up
   ↓
2. Email Verification
   ↓
3. Redirect to Onboarding
   ↓
4. Complete 6-Step Onboarding
   ↓
5. Submit for Verification
   ↓
6. Admin Reviews & Verifies
   ↓
7. Access Instructor Dashboard
```

---

## 📊 Onboarding Flow

```
Step 1: Basic Profile
├── Full Name
├── Headline
├── Bio
├── Profile Photo
├── Country
├── City
└── Languages

Step 2: Professional Information
├── Skills
├── Experience
├── Profession
├── Company
├── Resume Upload
├── Portfolio Website
├── LinkedIn
├── GitHub
└── YouTube

Step 3: Teaching Information
├── Teaching Categories
├── Course Language
├── Teaching Experience
├── Certifications
├── Students Taught
└── Sample Teaching Video

Step 4: Verification
├── Government ID Upload
├── PAN/Aadhar
├── Face Verification
└── Phone Number

Step 5: Payment Setup
├── Bank Details
├── UPI ID
├── PayPal
└── GST Number

Step 6: Final Review
├── Profile Preview
└── Submit Application
```

---

## 🎯 Key Features

### Frontend
- ✅ Multi-step wizard with progress tracking
- ✅ Autosave draft functionality
- ✅ Form validation with error messages
- ✅ File upload with preview
- ✅ Loading states and spinners
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Role-based redirects
- ✅ Responsive design
- ✅ Futuristic dark UI

### Backend
- ✅ Express routes and controllers
- ✅ Middleware for auth and validation
- ✅ File upload handling
- ✅ Email notifications
- ✅ AI instructor scoring
- ✅ Verification workflow
- ✅ Payment setup
- ✅ Error handling

### Database
- ✅ Supabase PostgreSQL
- ✅ RLS policies
- ✅ Proper relationships
- ✅ Audit timestamps
- ✅ JSONB for flexible data

---

## 🚀 Implementation Steps

1. **Database Setup** - Create tables and RLS policies
2. **Backend Setup** - Create routes, controllers, middleware
3. **Frontend Setup** - Create pages, components, services
4. **Authentication** - Implement auth flow
5. **Onboarding** - Implement 6-step wizard
6. **Verification** - Implement verification workflow
7. **Testing** - Test all flows
8. **Deployment** - Deploy to production

---

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.0.0",
  "react-hook-form": "^7.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "react-hot-toast": "^2.4.0",
  "@supabase/supabase-js": "^2.0.0",
  "axios": "^1.0.0",
  "react-dropzone": "^14.0.0",
  "react-select": "^5.0.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "supabase": "^1.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "multer": "^1.4.0",
  "cloudinary": "^1.30.0",
  "joi": "^17.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.0",
  "nodemailer": "^6.9.0",
  "dotenv": "^16.0.0"
}
```

---

## 🔒 Security Considerations

1. **Authentication** - JWT tokens with refresh
2. **Authorization** - Role-based access control
3. **File Upload** - Virus scanning, size limits
4. **Data Encryption** - Sensitive data encrypted
5. **Rate Limiting** - API rate limiting
6. **CORS** - Proper CORS configuration
7. **Input Validation** - Server-side validation
8. **SQL Injection** - Parameterized queries

---

## 📈 Scalability

1. **Database** - Indexed queries, proper relationships
2. **Caching** - Redis for frequently accessed data
3. **CDN** - CloudFront for static assets
4. **Load Balancing** - Multiple backend instances
5. **Monitoring** - Error tracking and logging
6. **Analytics** - Track onboarding completion rates

---

## 🎓 Next Steps

1. Create database tables
2. Set up RLS policies
3. Create backend routes and controllers
4. Create frontend pages and components
5. Implement authentication
6. Implement onboarding flow
7. Test all flows
8. Deploy to production

---

**This is a complete production-level system ready for implementation!**

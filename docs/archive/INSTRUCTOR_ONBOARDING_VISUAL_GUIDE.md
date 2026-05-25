# 🎓 Instructor Onboarding - Visual Guide & Flow Diagrams

## 📊 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────┘

1. SIGNUP/LOGIN
   ↓
   User creates account or logs in
   ↓
   ✅ Email verified
   ↓

2. ROLE SELECTION
   ↓
   User selects "Instructor" role
   ↓
   ✅ Role assigned
   ↓

3. REDIRECT TO ONBOARDING
   ↓
   User redirected to /onboarding
   ↓
   ✅ Onboarding started
   ↓

4. MULTI-STEP WIZARD
   ├─ Step 1: Basic Profile
   │  ├─ Profile photo
   │  ├─ Full name
   │  ├─ Headline
   │  ├─ Bio
   │  ├─ Country
   │  ├─ City
   │  └─ Languages
   │
   ├─ Step 2: Professional
   │  ├─ Skills
   │  ├─ Experience
   │  ├─ Profession
   │  ├─ Company
   │  ├─ Resume
   │  ├─ Portfolio
   │  ├─ LinkedIn
   │  ├─ GitHub
   │  └─ YouTube
   │
   ├─ Step 3: Teaching
   │  ├─ Categories
   │  ├─ Language
   │  ├─ Experience
   │  ├─ Certifications
   │  ├─ Students taught
   │  └─ Sample video
   │
   ├─ Step 4: Verification
   │  ├─ Government ID
   │  ├─ ID type
   │  ├─ Face verification
   │  └─ Phone number
   │
   ├─ Step 5: Payment
   │  ├─ Bank details
   │  ├─ UPI ID
   │  ├─ PayPal
   │  └─ GST number
   │
   └─ Step 6: Review
      ├─ Profile preview
      ├─ Data review
      └─ Submit
   ↓
   ✅ Onboarding completed
   ↓

5. VERIFICATION PROCESS
   ↓
   Admin reviews profile
   ├─ Approve → Verified badge
   └─ Reject → Request changes
   ↓
   ✅ Instructor verified
   ↓

6. DASHBOARD ACCESS
   ↓
   User redirected to /dashboard/instructor
   ↓
   ✅ Can create courses
```

---

## 🏗️ Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              OnboardingLayout.jsx                       │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ ProgressBar (0-100%)                             │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ StepIndicator (1-6)                              │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ Step Component (Dynamic)                         │  │   │
│  │  │ ├─ Step1BasicProfile                             │  │   │
│  │  │ ├─ Step2Professional                             │  │   │
│  │  │ ├─ Step3Teaching                                 │  │   │
│  │  │ ├─ Step4Verification                             │  │   │
│  │  │ ├─ Step5Payment                                  │  │   │
│  │  │ └─ Step6Review                                   │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ Navigation Buttons (Previous/Next/Save)          │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              OnboardingContext                          │   │
│  │  ├─ currentStep                                         │   │
│  │  ├─ formData (all 6 steps)                              │   │
│  │  ├─ loading                                             │   │
│  │  ├─ errors                                              │   │
│  │  ├─ completionPercentage                               │   │
│  │  └─ isDraft                                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Services (instructorService.js)            │   │
│  │  ├─ getInstructorProfile()                              │   │
│  │  ├─ updateInstructorProfile()                           │   │
│  │  ├─ saveOnboardingStep()                                │   │
│  │  ├─ completeOnboarding()                                │   │
│  │  └─ getProfileCompletion()                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Supabase Client                            │   │
│  │  ├─ Authentication                                      │   │
│  │  ├─ Database queries                                    │   │
│  │  └─ File storage                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                           ↓ HTTP
┌──────────────────────────────────────────────────────────────────┐
│                      BACKEND (Express)                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Routes                                     │   │
│  │  ├─ /api/instructor/*                                   │   │
│  │  └─ /api/onboarding/*                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Middleware                                 │   │
│  │  ├─ auth (JWT verification)                             │   │
│  │  ├─ roleCheck (instructor only)                         │   │
│  │  ├─ validation (input validation)                       │   │
│  │  └─ errorHandler (error handling)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Controllers                                │   │
│  │  ├─ instructorController.js                             │   │
│  │  │  ├─ getInstructorProfile()                           │   │
│  │  │  ├─ createInstructorProfile()                        │   │
│  │  │  ├─ updateInstructorProfile()                        │   │
│  │  │  ├─ getProfileCompletion()                           │   │
│  │  │  └─ getAIInstructorScore()                           │   │
│  │  │                                                      │   │
│  │  └─ onboardingController.js                             │   │
│  │     ├─ getOnboardingStatus()                            │   │
│  │     ├─ saveOnboardingStep()                             │   │
│  │     ├─ getOnboardingStep()                              │   │
│  │     ├─ completeOnboarding()                             │   │
│  │     └─ getDraftData()                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Utils                                      │   │
│  │  ├─ aiScoring.js (AI scoring)                           │   │
│  │  ├─ emailService.js (email notifications)              │   │
│  │  ├─ fileHandler.js (file uploads)                       │   │
│  │  └─ validators.js (validation logic)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Supabase                                   │   │
│  │  ├─ PostgreSQL Database                                 │   │
│  │  ├─ Authentication                                      │   │
│  │  └─ File Storage                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: BASIC PROFILE                        │
└─────────────────────────────────────────────────────────────────┘

User Input
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step1BasicProfile Component                                     │
│  ├─ Profile photo input → FileUploadField                       │
│  ├─ Full name input → text field                                │
│  ├─ Headline input → text field                                 │
│  ├─ Bio input → textarea                                        │
│  ├─ Country select → CountrySelector                            │
│  ├─ City input → text field                                     │
│  └─ Languages select → LanguageSelector                         │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ useFormValidation Hook                                          │
│  └─ validateStep1(data) → errors object                         │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ OnboardingContext                                               │
│  ├─ updateFormData(field, value)                                │
│  ├─ setFieldError(field, error)                                 │
│  └─ calculateCompletion()                                       │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ Save Draft (localStorage)                                       │
│  └─ localStorage.setItem('onboarding_draft', JSON.stringify())  │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ Next Step                                                       │
│  └─ goToStep(2)                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONBOARDING CONTEXT                           │
└─────────────────────────────────────────────────────────────────┘

Initial State
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ {                                                               │
│   currentStep: 1,                                               │
│   formData: { /* all fields */ },                               │
│   loading: false,                                               │
│   errors: {},                                                   │
│   completionPercentage: 0,                                      │
│   isDraft: false                                                │
│ }                                                               │
└─────────────────────────────────────────────────────────────────┘
    ↓
User fills Step 1
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ updateFormData('fullName', 'John Doe')                          │
│  └─ setFormData({ ...prev, fullName: 'John Doe' })             │
└─────────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ calculateCompletion()                                           │
│  └─ setCompletionPercentage(15)                                 │
└─────────────────────────────────────────────────────────────────┘
    ↓
User clicks Next
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ nextStep()                                                      │
│  └─ setCurrentStep(2)                                           │
└─────────────────────────────────────────────────────────────────┘
    ↓
User clicks Save Draft
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ saveDraft()                                                     │
│  ├─ localStorage.setItem('onboarding_draft', ...)              │
│  ├─ localStorage.setItem('onboarding_step', '2')               │
│  └─ setIsDraft(true)                                            │
└─────────────────────────────────────────────────────────────────┘
    ↓
User closes and reopens
    ↓
┌─────────────────────────────────────────────────────────────────┐
│ loadDraft()                                                     │
│  ├─ localStorage.getItem('onboarding_draft')                    │
│  ├─ setFormData(savedData)                                      │
│  └─ setCurrentStep(2)                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 UI Component Hierarchy

```
OnboardingLayout
├── Header
│   ├── Title
│   ├── Subtitle
│   └── Completion Percentage
├── ProgressBar
│   └── Animated progress indicator
├── Main Content Grid
│   ├── Sidebar (lg:col-span-1)
│   │   └── StepIndicator
│   │       ├── Step 1 Button
│   │       ├── Step 2 Button
│   │       ├── Step 3 Button
│   │       ├── Step 4 Button
│   │       ├── Step 5 Button
│   │       └── Step 6 Button
│   └── Content (lg:col-span-3)
│       ├── Step Header
│       │   ├── Step Number Badge
│       │   ├── Step Title
│       │   └── Step Description
│       ├── Step Content
│       │   └── Dynamic Step Component
│       │       ├── Form Fields
│       │       ├── Validation Messages
│       │       └── File Uploads
│       └── Navigation
│           ├── Previous Button
│           ├── Save Draft Button
│           └── Next Button
```

---

## 🗄️ Database Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA                               │
└──────────────────────────────────────────────────────────────────┘

auth.users
    │
    ├─ 1:1 ─→ instructors
    │         │
    │         ├─ 1:N ─→ onboarding_steps
    │         │
    │         ├─ 1:N ─→ verification_documents
    │         │
    │         ├─ 1:N ─→ payment_methods
    │         │
    │         └─ 1:1 ─→ instructor_scores
    │
    └─ 1:N ─→ courses
              │
              ├─ 1:N ─→ sections
              │         │
              │         └─ 1:N ─→ sub_sections
              │
              └─ 1:N ─→ enrollments
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTH FLOW                                    │
└─────────────────────────────────────────────────────────────────┘

1. User Signup
   ├─ Email/Password
   ├─ Google OAuth
   └─ GitHub OAuth
        ↓
   Supabase Auth
        ↓
   JWT Token Generated
        ↓

2. User Login
   ├─ Email/Password
   ├─ Google OAuth
   └─ GitHub OAuth
        ↓
   Supabase Auth
        ↓
   JWT Token Generated
        ↓

3. Token Storage
   ├─ localStorage
   ├─ sessionStorage
   └─ Cookie
        ↓

4. API Requests
   ├─ Authorization: Bearer {token}
   ├─ Backend verifies token
   └─ JWT decoded
        ↓

5. Role Check
   ├─ User role = 'instructor'
   ├─ Redirect to onboarding
   └─ Or redirect to dashboard
```

---

## 📊 Completion Percentage Calculation

```
Total Fields: 30

Step 1 (7 fields):
├─ fullName
├─ headline
├─ bio
├─ profilePhoto
├─ country
├─ city
└─ languages

Step 2 (9 fields):
├─ skills
├─ experienceYears
├─ profession
├─ company
├─ resume
├─ portfolioWebsite
├─ linkedinUrl
├─ githubUrl
└─ youtubeUrl

Step 3 (5 fields):
├─ teachingCategories
├─ courseLanguage
├─ teachingExperienceYears
├─ certifications
└─ studentsTaught

Step 4 (4 fields):
├─ governmentId
├─ governmentIdType
├─ faceVerification
└─ phoneNumber

Step 5 (5 fields):
├─ bankAccountNumber
├─ bankIfscCode
├─ upiId
├─ paypalEmail
└─ gstNumber

Calculation:
Percentage = (Filled Fields / Total Fields) × 100
```

---

## 🎨 UI/UX Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE FLOW                          │
└─────────────────────────────────────────────────────────────────┘

Step 1: Basic Profile
├─ Photo upload with preview
├─ Text inputs with validation
├─ Dropdown selectors
└─ Multi-select buttons
    ↓
Step 2: Professional
├─ Multi-select skills
├─ Number inputs
├─ Text inputs
├─ URL inputs
└─ File upload
    ↓
Step 3: Teaching
├─ Multi-select categories
├─ Dropdown language
├─ Number inputs
├─ Multi-select certifications
└─ File upload
    ↓
Step 4: Verification
├─ File upload (ID)
├─ Dropdown (ID type)
├─ File upload (Face)
└─ Phone input
    ↓
Step 5: Payment
├─ Text inputs (Bank)
├─ Text input (UPI)
├─ Email input (PayPal)
└─ Text input (GST)
    ↓
Step 6: Review
├─ Profile preview
├─ Data summary
└─ Submit button
    ↓
Success Page
├─ Confirmation message
├─ Next steps
└─ Dashboard link
```

---

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                         │
└──────────────────────────────────────────────────────────────────┘

Frontend (Vercel)
├─ React app
├─ Tailwind CSS
├─ Framer Motion
└─ Supabase client
    ↓ HTTPS
Backend (Heroku/Railway)
├─ Express server
├─ Controllers
├─ Middleware
└─ Utils
    ↓ HTTPS
Supabase (Cloud)
├─ PostgreSQL
├─ Authentication
├─ File Storage
└─ Real-time
    ↓
CDN (CloudFront)
├─ Static assets
├─ Images
└─ Videos
    ↓
Email Service (SendGrid/Gmail)
├─ Onboarding emails
├─ Verification emails
└─ Notifications
```

---

**This visual guide helps understand the complete system architecture and flow!**

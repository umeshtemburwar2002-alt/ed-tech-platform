
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import { useLocation } from "react-router-dom";

import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/profileSlice";
import { setToken } from "./slices/authSlice";
import { ACCOUNT_TYPE } from "./utils/constants";
import RoleRoute from "./components/core/auth/RoleRoute";
import AppSkeleton from "./components/core/Loaders/AppSkeleton";
import { ThemeProvider } from "./context/ThemeContext";
import { toast } from "react-hot-toast";

import { courseRoutes } from "./routes/courseRoutes";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOpenRoute from "./components/core/auth/AdminOpenRoute";
import { subscribeSupabaseAuthToStore } from "./services/syncSupabaseSession";

// Lazy loaded pages/components
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const CoursePurchase = React.lazy(() => import("./pages/CoursePurchase"));
const StudentSignup = React.lazy(() => import("./components/auth/StudentSignup"));
const InstructorSignup = React.lazy(() => import("./components/auth/InstructorSignup"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));

const PhoneVerification = React.lazy(() => import("./components/auth/PhoneVerification"));
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"));
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Students = React.lazy(() => import("./pages/Students"));

const CourseCatalog = React.lazy(() => import("./pages/CourseCatalog"));
const PythonBeginnersCourse = React.lazy(() => import("./pages/courses/PythonBeginnersCourse"));
const JavaProgrammingCourse = React.lazy(() => import("./pages/courses/JavaProgrammingCourse"));
const ReactJSCourse = React.lazy(() => import("./pages/courses/ReactJSCourse"));
const DataScienceCourse = React.lazy(() => import("./pages/courses/DataScienceCourse"));
const JavaScriptCourse = React.lazy(() => import("./pages/courses/JavaScriptCourse"));
const NodeJSCourse = React.lazy(() => import("./pages/courses/NodeJSCourse"));
const MachineLearningCourse = React.lazy(() => import("./pages/courses/MachineLearningCourse"));
const SQLDatabaseCourse = React.lazy(() => import("./pages/courses/SQLDatabaseCourse"));
const GitGitHubCourse = React.lazy(() => import("./pages/courses/GitGitHubCourse"));
const ReactNativeCourse = React.lazy(() => import("./pages/courses/ReactNativeCourse"));
const UIUXDesignCourse = React.lazy(() => import("./pages/courses/UIUXDesignCourse"));
const AWSCloudCourse = React.lazy(() => import("./pages/courses/AWSCloudCourse"));
const FlutterCourse = React.lazy(() => import("./pages/courses/FlutterCourse"));
const EthicalHackingCourse = React.lazy(() => import("./pages/courses/EthicalHackingCourse"));
const DockerKubernetesCourse = React.lazy(() => import("./pages/courses/DockerKubernetesCourse"));
const NetworkSecurityCourse = React.lazy(() => import("./pages/courses/NetworkSecurityCourse"));
const AdminLogin = React.lazy(() => import("./pages/admin/Login"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminUsers = React.lazy(() => import("./pages/admin/Users"));
const AdminCourses = React.lazy(() => import("./pages/admin/Courses"));
const AdminReports = React.lazy(() => import("./pages/admin/Reports"));
const InstructorSupport = React.lazy(() => import("./pages/dashboard/instructor/Support"));
const Careers = React.lazy(() => import("./pages/Careers"));
const Home = React.lazy(() => import("./pages/Home"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Offers = React.lazy(() => import("./pages/Offers"));
const SignupOffer = React.lazy(() => import("./pages/SignupOffer"));
const AllCoursesOffer = React.lazy(() => import("./pages/AllCoursesOffer"));
const StartLearningFree = React.lazy(() => import("./pages/StartLearningFree"));
const Cart = React.lazy(() => import("./pages/Cart"));


// Free Course Detail Pages
const HTMLCSSFundamentals = React.lazy(() => import("./pages/courses/HTMLCSSFundamentals"));
const JavaScriptBasics = React.lazy(() => import("./pages/courses/JavaScriptBasics"));
const PythonForBeginners = React.lazy(() => import("./pages/courses/PythonForBeginners"));

// Resources Pages
const Articles = React.lazy(() => import("./pages/resources/Articles"));
const Blog = React.lazy(() => import("./pages/resources/Blog"));

// Support Pages
const HelpCenter = React.lazy(() => import("./pages/support/HelpCenter"));

// Subject Pages
const AI = React.lazy(() => import("./pages/subjects/AI"));

// Language Pages
const Python = React.lazy(() => import("./pages/languages/Python"));

// Legal Pages
const PrivacyPolicy = React.lazy(() => import("./pages/legal/PrivacyPolicy"));
const CookiePolicy = React.lazy(() => import("./pages/legal/CookiePolicy"));
const TermsOfService = React.lazy(() => import("./pages/legal/TermsOfService"));

// Dashboard Pages
const MyLearning = React.lazy(() => import("./pages/dashboard/MyLearning"));
const Certificates = React.lazy(() => import("./pages/dashboard/Certificates"));
const Wishlist = React.lazy(() => import("./pages/dashboard/Wishlist"));
const Theme = React.lazy(() => import("./pages/dashboard/Theme"));
const QuickStart = React.lazy(() => import("./pages/dashboard/QuickStart"));
const StudentDashboardLayout = React.lazy(() => import("./components/core/Dashboard/StudentDashboardLayout"));
const StudentDashboard = React.lazy(() => import("./pages/StudentDashboard"));
const QuizInterface = React.lazy(() => import("./components/core/Dashboard/Student/QuizInterface"));
const Settings = React.lazy(() => import("./components/core/Dashboard/Settings"));
const Notifications = React.lazy(() => import("./pages/dashboard/Notifications"));
const Progress = React.lazy(() => import("./pages/dashboard/Progress"));
const InstructorDashboardLayout = React.lazy(() => import("./components/core/Dashboard/InstructorDashboardLayout"));

const MyProfile = React.lazy(() => import("./pages/dashboard/Profile"));
const StudentSupport = React.lazy(() => import("./pages/dashboard/Support"));

// New Student Dashboard Pages
const StudentDashboardHome = React.lazy(() => import("./pages/student-dashboard/Dashboard"));
const StudentCourses = React.lazy(() => import("./pages/student-dashboard/Courses"));
const StudentLearningPath = React.lazy(() => import("./pages/student-dashboard/LearningPath"));
const StudentQuiz = React.lazy(() => import("./pages/student-dashboard/Quiz"));
const StudentMessages = React.lazy(() => import("./pages/student-dashboard/Messages"));
const StudentFeedback = React.lazy(() => import("./pages/student-dashboard/Feedback"));
const StudentNotifications = React.lazy(() => import("./pages/student-dashboard/Notifications"));
const StudentCertificates = React.lazy(() => import("./pages/student-dashboard/Certificates"));
const StudentSupportPage = React.lazy(() => import("./pages/student-dashboard/Support"));

const EnrolledCourses = React.lazy(() => import("./components/core/Dashboard/EnrolledCourses"));
const DashboardCart = React.lazy(() => import("./components/core/Dashboard/Cart"));
const AddCourse = React.lazy(() => import("./components/core/Dashboard/AddCourse"));
const MyCourses = React.lazy(() => import("./components/core/Dashboard/MyCourses"));
const EditCourse = React.lazy(() => import("./components/core/Dashboard/EditCourse"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const CourseDetails = React.lazy(() => import("./pages/CourseDetails"));
const ViewCourse = React.lazy(() => import("./pages/ViewCourse"));
const VideoDetails = React.lazy(() => import("./components/core/ViewCourse/VideoDetails"));
const InstructorDashboard = React.lazy(() => import("./pages/InstructorDashboard"));
const Error = React.lazy(() => import("./pages/Error"));
const Forbidden403 = React.lazy(() => import("./pages/Forbidden403"));
const Quiz = React.lazy(() => import("./pages/dashboard/Quiz"));
const Notes = React.lazy(() => import("./pages/dashboard/Notes"));
const LiveClasses = React.lazy(() => import("./pages/dashboard/LiveClasses"));
const OAuthCallback = React.lazy(() => import("./pages/OAuthCallback"));

// Helper functions for dynamic lazy loading
const lazyStudentFeature = (exportName) => {
  const Comp = React.lazy(async () => {
    const mod = await import("./components/core/Dashboard/studentFeatures");
    return { default: mod[exportName] };
  });
  return Comp;
};

const LazyInstructorFeature = (exportName) => {
  const Comp = React.lazy(async () => {
    const mod = await import("./components/core/Dashboard/instructorFeatures");
    return { default: mod[exportName] };
  });
  return Comp;
};

const Recommendations = lazyStudentFeature("Recommendations");
const Calendar = lazyStudentFeature("Calendar");
const MockInterviews = lazyStudentFeature("MockInterviews");
const Badges = lazyStudentFeature("Badges");
const SkillGapAnalysis = lazyStudentFeature("SkillGapAnalysis");
const DoubtForum = lazyStudentFeature("DoubtForum");
const Leaderboard = lazyStudentFeature("Leaderboard");
const Assignments = lazyStudentFeature("Assignments");

const Revenue = LazyInstructorFeature("Revenue");
const Marketing = LazyInstructorFeature("Marketing");
const Reports = LazyInstructorFeature("Reports");
const Feedback = LazyInstructorFeature("Feedback");
const InstructorStudents = LazyInstructorFeature("InstructorStudents");
const InstructorMessages = LazyInstructorFeature("InstructorMessages");

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  
  useEffect(() => {
    const unsubscribe = subscribeSupabaseAuthToStore(dispatch);
    return unsubscribe;
  }, [dispatch]);
  
  return (
  <ThemeProvider>
  <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative transition-colors duration-300 dark:bg-richblack-900">
    {!location.pathname.startsWith("/dashboard") && 
     !location.pathname.startsWith("/instructor") && 
     !location.pathname.startsWith("/view-course") && 
     !location.pathname.startsWith("/admin") && <Navbar />}

    <div className="content-wrapper relative z-0">
      <div className="relative z-10">
  <Suspense fallback={<AppSkeleton />}> 
  <Routes>
  {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/all-courses-offer" element={<AllCoursesOffer />} />
        <Route path="/start-learning-free" element={<StartLearningFree />} />

        
        {/* Free Course Detail Pages */}
        <Route path="/free-courses/html-css-fundamentals" element={<HTMLCSSFundamentals />} />
        <Route path="/free-courses/javascript-basics" element={<JavaScriptBasics />} />
        <Route path="/free-courses/python-for-beginners" element={<PythonForBeginners />} />
        
        <Route path="catalog/:catalogName" element={<Catalog />} />

        <Route path="students" element={<Students />} />
        <Route path="course-catalog" element={<CourseCatalog />} />
        
        <Route path="course-purchase" element={<CoursePurchase />} />
        
        {/* Protected Course Routes */}
        <Route path="/courses/:courseId" element={<PrivateRoute><CourseDetails /></PrivateRoute>} />
        
        <Route path="cart" element={<Cart />} />
        
        {/* Admin */}
        <Route path="/admin/login" element={<AdminOpenRoute><AdminLogin /></AdminOpenRoute>} />
        <Route path="/admin" element={<PrivateRoute><RoleRoute allow={["Admin"]}><AdminLayout /></RoleRoute></PrivateRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
        <Route path="/403" element={<Forbidden403 />} />
        
        {/* Company Pages */}
        <Route path="/careers" element={<Careers />} />
        
        {/* Resources Pages */}
        <Route path="/resources/articles" element={<Articles />} />
        <Route path="/resources/blog" element={<Blog />} />
        
        {/* Support Pages */}
        <Route path="/support/help-center" element={<HelpCenter />} />
        
        {/* Subject Pages */}
        <Route path="/subjects/ai" element={<AI />} />
        
        {/* Language Pages */}
        <Route path="/languages/python" element={<Python />} />
        
        {/* Legal Pages */}
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
        <Route path="/legal/terms-of-service" element={<TermsOfService />} />
        
        {/* Student Dashboard Routes */}
        <Route element={<PrivateRoute><RoleRoute allow={["Student"]}><StudentDashboardLayout /></RoleRoute></PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<StudentDashboardHome />} />
          <Route path="dashboard/settings" element={<Settings />} />
          <Route path="dashboard/quizzes" element={<StudentQuiz />} />
          <Route path="dashboard/quizzes/scheduled" element={<StudentQuiz />} />
          <Route path="dashboard/quizzes/completed" element={<StudentQuiz />} />
          <Route path="dashboard/notes" element={<Notes />} />
          <Route path="dashboard/live-classes" element={<LiveClasses />} />
          <Route path="dashboard/enrolled-courses" element={<StudentCourses />} />
          <Route path="dashboard/learning-path" element={<StudentLearningPath />} />
          <Route path="dashboard/messages" element={<StudentMessages />} />
          <Route path="dashboard/feedback" element={<StudentFeedback />} />
          <Route path="dashboard/feedback/pending" element={<StudentFeedback />} />
          <Route path="dashboard/feedback/history" element={<StudentFeedback />} />
          <Route path="dashboard/notifications" element={<StudentNotifications />} />
          <Route path="dashboard/certificates" element={<StudentCertificates />} />
          <Route path="dashboard/support" element={<StudentSupportPage />} />
          <Route path="dashboard/cart" element={<DashboardCart />} />
        </Route>

        {/* Instructor Dashboard Routes */}
        <Route element={<PrivateRoute><RoleRoute allow={["Instructor"]}><InstructorDashboardLayout /></RoleRoute></PrivateRoute>}>
          <Route path="dashboard/instructor" element={<InstructorDashboard />} />
          <Route path="dashboard/instructor/my-courses" element={<MyCourses />} />
          <Route path="dashboard/instructor/add-course" element={<AddCourse />} />
          <Route path="dashboard/instructor/quizzes" element={<Quiz />} />
          <Route path="dashboard/instructor/notes" element={<Notes />} />
          <Route path="dashboard/instructor/live-classes" element={<LiveClasses />} />
          <Route path="dashboard/instructor/profile" element={<MyProfile />} />
          <Route path="dashboard/instructor/settings" element={<Settings />} />
          <Route path="dashboard/instructor/marketing" element={<Marketing />} />
          <Route path="dashboard/instructor/students" element={<InstructorStudents />} />
          <Route path="dashboard/instructor/messages" element={<InstructorMessages />} />
          <Route path="dashboard/instructor/analytics" element={<Reports />} />
          <Route path="dashboard/instructor/feedback" element={<Feedback />} />
          <Route path="dashboard/instructor/support" element={<InstructorSupport />} />
        </Route>
      
      {/* Auth Routes */}
      <Route path="login" element={<OpenRoute><Login /></OpenRoute>} />
      <Route path="signup" element={<OpenRoute><Signup /></OpenRoute>} />
      <Route path="register/student" element={<OpenRoute><StudentSignup /></OpenRoute>} />
      <Route path="register/instructor" element={<OpenRoute><InstructorSignup /></OpenRoute>} />
      <Route path="signup-offer" element={<OpenRoute><SignupOffer /></OpenRoute>} />
      <Route path="forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
      <Route path="phone-verification" element={<OpenRoute><PhoneVerification /></OpenRoute>} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="update-password" element={<UpdatePassword />} />


      {/* OAuth Callback — must be public, Supabase redirects here after Google/GitHub login */}
      <Route path="auth/callback" element={<OAuthCallback />} />

      {/* Static Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/course/:courseId" element={<CourseDetails />} />

    {/* Course Viewing Routes */}
    <Route
      path="view-course/:courseId"
      element={<PrivateRoute><ViewCourse /></PrivateRoute>}
    />

    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
      <Route
        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
        element={<PrivateRoute><ViewCourse /></PrivateRoute>}
      >
        <Route index element={<VideoDetails />} />
      </Route>
    )}

    {/* Course Routes - Protected by Authentication */}
    {courseRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}

    <Route path="*" element={<Error />} />


  </Routes>
    </Suspense>
      
      </div>
    </div>
  {/* Removed black overlay above footer */}
  </div>
  </ThemeProvider>
  );
}

export default App;

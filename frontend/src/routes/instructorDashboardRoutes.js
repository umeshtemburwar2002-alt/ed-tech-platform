import React from "react";

const InstructorDashboard = React.lazy(() => import("../pages/InstructorDashboard"));
const InstructorInfo = React.lazy(() => import("../pages/dashboard/instructor/InstructorInfo"));
const MyCourses = React.lazy(() => import("../components/core/Dashboard/MyCourses"));
const AddCourse = React.lazy(() => import("../components/core/Dashboard/AddCourse"));
const Quiz = React.lazy(() => import("../pages/dashboard/Quiz"));
const Notes = React.lazy(() => import("../pages/dashboard/Notes"));
const LiveClasses = React.lazy(() => import("../pages/dashboard/LiveClasses"));
const MyProfile = React.lazy(() => import("../pages/dashboard/Profile"));
const Settings = React.lazy(() => import("../components/core/Dashboard/Settings"));

const InstructorEarnings = React.lazy(() => import("../pages/dashboard/instructor/Earnings"));
const InstructorAnalytics = React.lazy(() => import("../pages/dashboard/instructor/Analytics"));
const InstructorAssignments = React.lazy(() => import("../pages/dashboard/instructor/Assignments"));
const InstructorNotifications = React.lazy(() => import("../pages/dashboard/instructor/Notifications"));
const InstructorReviews = React.lazy(() => import("../pages/dashboard/instructor/Reviews"));
const InstructorResources = React.lazy(() => import("../pages/dashboard/instructor/Resources"));
const InstructorCoupons = React.lazy(() => import("../pages/dashboard/instructor/Coupons"));
const InstructorWebinars = React.lazy(() => import("../pages/dashboard/instructor/Webinars"));
const InstructorAIAssistant = React.lazy(() => import("../pages/dashboard/instructor/AIAssistant"));
const InstructorStudentProgress = React.lazy(() => import("../pages/dashboard/instructor/StudentProgress"));
const InstructorAffiliate = React.lazy(() => import("../pages/dashboard/instructor/Affiliate"));
const InstructorVerification = React.lazy(() => import("../pages/dashboard/instructor/Verification"));
const InstructorAttendance = React.lazy(() => import("../pages/dashboard/instructor/Attendance"));
const InstructorCertificates = React.lazy(() => import("../pages/dashboard/instructor/Certificates"));
const InstructorSupport = React.lazy(() => import("../pages/dashboard/instructor/Support"));

const lazyFeature = (exportName) => {
  const Comp = React.lazy(async () => {
    const mod = await import("../components/core/Dashboard/instructorFeatures");
    return { default: mod[exportName] };
  });
  return Comp;
};

const Marketing = lazyFeature("Marketing");
const InstructorStudents = lazyFeature("InstructorStudents");
const InstructorMessages = lazyFeature("InstructorMessages");
const Feedback = lazyFeature("Feedback");

export const instructorDashboardRoutes = [
  { path: "dashboard/instructor", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/info", element: <InstructorInfo /> },
  { path: "dashboard/instructor/my-courses", element: <MyCourses /> },
  { path: "dashboard/instructor/add-course", element: <AddCourse /> },
  { path: "dashboard/instructor/course-builder", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/quizzes", element: <Quiz /> },
  { path: "dashboard/instructor/notes", element: <Notes /> },
  { path: "dashboard/instructor/live-classes", element: <LiveClasses /> },
  { path: "dashboard/instructor/profile", element: <MyProfile /> },
  { path: "dashboard/instructor/settings", element: <Settings /> },
  { path: "dashboard/instructor/marketing", element: <Marketing /> },
  { path: "dashboard/instructor/students", element: <InstructorStudents /> },
  { path: "dashboard/instructor/messages", element: <InstructorMessages /> },
  { path: "dashboard/instructor/feedback", element: <Feedback /> },
  { path: "dashboard/instructor/discussions", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/payouts", element: <InstructorEarnings /> },
  { path: "dashboard/instructor/reports", element: <InstructorAnalytics /> },
  { path: "dashboard/instructor/downloads", element: <InstructorResources /> },
  { path: "dashboard/instructor/jobs", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/announcements", element: <InstructorNotifications /> },
  { path: "dashboard/instructor/calendar", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/integrations", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/billing", element: <InstructorDashboard /> },
  { path: "dashboard/instructor/earnings", element: <InstructorEarnings /> },
  { path: "dashboard/instructor/analytics", element: <InstructorAnalytics /> },
  { path: "dashboard/instructor/assignments", element: <InstructorAssignments /> },
  { path: "dashboard/instructor/notifications", element: <InstructorNotifications /> },
  { path: "dashboard/instructor/reviews", element: <InstructorReviews /> },
  { path: "dashboard/instructor/resources", element: <InstructorResources /> },
  { path: "dashboard/instructor/coupons", element: <InstructorCoupons /> },
  { path: "dashboard/instructor/webinars", element: <InstructorWebinars /> },
  { path: "dashboard/instructor/ai-assistant", element: <InstructorAIAssistant /> },
  { path: "dashboard/instructor/student-progress", element: <InstructorStudentProgress /> },
  { path: "dashboard/instructor/affiliate", element: <InstructorAffiliate /> },
  { path: "dashboard/instructor/verification", element: <InstructorVerification /> },
  { path: "dashboard/instructor/attendance", element: <InstructorAttendance /> },
  { path: "dashboard/instructor/certificates", element: <InstructorCertificates /> },
  { path: "dashboard/instructor/support", element: <InstructorSupport /> },
];

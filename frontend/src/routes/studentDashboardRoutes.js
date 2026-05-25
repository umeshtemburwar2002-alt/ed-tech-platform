import React from "react";

const StudentDashboardHome = React.lazy(() => import("../pages/student-dashboard/Dashboard"));
const StudentCourses = React.lazy(() => import("../pages/student-dashboard/Courses"));
const StudentLearningPath = React.lazy(() => import("../pages/student-dashboard/LearningPath"));
const Wishlist = React.lazy(() => import("../pages/dashboard/Wishlist"));
const StudentQuiz = React.lazy(() => import("../pages/student-dashboard/Quiz"));
const StudentAssignments = React.lazy(() => import("../pages/student-dashboard/Assignments"));
const StudentAnalytics = React.lazy(() => import("../pages/student-dashboard/Analytics"));
const StudentAIAssistant = React.lazy(() => import("../pages/student-dashboard/AIAssistant"));
const StudentLeaderboard = React.lazy(() => import("../pages/student-dashboard/Leaderboard"));
const LiveClasses = React.lazy(() => import("../pages/dashboard/LiveClasses"));
const StudentMessages = React.lazy(() => import("../pages/student-dashboard/Messages"));
const StudentFeedback = React.lazy(() => import("../pages/student-dashboard/Feedback"));
const StudentNotifications = React.lazy(() => import("../pages/student-dashboard/Notifications"));
const StudentCertificates = React.lazy(() => import("../pages/student-dashboard/Certificates"));
const StudentSupportPage = React.lazy(() => import("../pages/student-dashboard/Support"));
const MyTickets = React.lazy(() => import("../pages/MyTickets"));
const Settings = React.lazy(() => import("../components/core/Dashboard/Settings"));
const DashboardCart = React.lazy(() => import("../components/core/Dashboard/Cart"));

export const studentDashboardRoutes = [
  { path: "dashboard/my-profile", element: <StudentDashboardHome /> },
  { path: "dashboard/enrolled-courses", element: <StudentCourses /> },
  { path: "dashboard/learning-path", element: <StudentLearningPath /> },
  { path: "dashboard/wishlist", element: <Wishlist /> },
  { path: "dashboard/quizzes", element: <StudentQuiz /> },
  { path: "dashboard/assignments", element: <StudentAssignments /> },
  { path: "dashboard/analytics", element: <StudentAnalytics /> },
  { path: "dashboard/ai-assistant", element: <StudentAIAssistant /> },
  { path: "dashboard/planner", element: <StudentDashboardHome /> },
  { path: "dashboard/achievements", element: <StudentDashboardHome /> },
  { path: "dashboard/notes", element: <StudentDashboardHome /> },
  { path: "dashboard/bookmarks", element: <StudentDashboardHome /> },
  { path: "dashboard/live-classes", element: <LiveClasses /> },
  { path: "dashboard/forums", element: <StudentDashboardHome /> },
  { path: "dashboard/leaderboard", element: <StudentLeaderboard /> },
  { path: "dashboard/calendar", element: <StudentDashboardHome /> },
  { path: "dashboard/downloads", element: <StudentDashboardHome /> },
  { path: "dashboard/interview-prep", element: <StudentDashboardHome /> },
  { path: "dashboard/jobs", element: <StudentDashboardHome /> },
  { path: "dashboard/resume", element: <StudentDashboardHome /> },
  { path: "dashboard/study-groups", element: <StudentDashboardHome /> },
  { path: "dashboard/resources", element: <StudentDashboardHome /> },
  { path: "dashboard/referral", element: <StudentDashboardHome /> },
  { path: "dashboard/messages", element: <StudentMessages /> },
  { path: "dashboard/feedback", element: <StudentFeedback /> },
  { path: "dashboard/notifications", element: <StudentNotifications /> },
  { path: "dashboard/certificates", element: <StudentCertificates /> },
  { path: "dashboard/support", element: <StudentSupportPage /> },
  { path: "dashboard/my-tickets", element: <MyTickets /> },
  { path: "dashboard/billing", element: <StudentDashboardHome /> },
  { path: "dashboard/settings", element: <Settings /> },
  { path: "dashboard/cart", element: <DashboardCart /> },
];

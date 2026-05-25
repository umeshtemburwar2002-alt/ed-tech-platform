import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaBookOpen, 
  FaChartLine, 
  FaClipboardList, 
  FaCommentDots,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSignOutAlt
} from 'react-icons/fa';
import { useOnboardingRedirect } from '../components/onboarding/InstructorOnboarding';

const DashboardLayout = () => {
  const location = useLocation();
  const { checking } = useOnboardingRedirect();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const studentLinks = [
    { path: '/dashboard/student', icon: FaHome, label: 'Dashboard' },
    { path: '/dashboard/student/quiz', icon: FaClipboardList, label: 'Quiz' },
    { path: '/dashboard/student/feedback', icon: FaCommentDots, label: 'Feedback' },
  ];

  const instructorLinks = [
    { path: '/dashboard/instructor', icon: FaChalkboardTeacher, label: 'Dashboard' },
    { path: '/dashboard/instructor/courses', icon: FaBookOpen, label: 'My Courses' },
    { path: '/dashboard/instructor/analytics', icon: FaChartLine, label: 'Analytics' },
  ];

  const isStudentRoute = location.pathname.includes('/dashboard/student');
  const isInstructorRoute = location.pathname.includes('/dashboard/instructor');

  if (checking && isInstructorRoute) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <svg className="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">Checking onboarding status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-richblack-900">
      {/* Sidebar */}
      <div className="w-64 bg-richblack-800 border-r border-richblack-700 fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <h1 className="text-xl font-bold text-white">EduTech</h1>
          </div>

          <nav className="space-y-2">
            {isStudentRoute && studentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-violet-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-white'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {isInstructorRoute && instructorLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-violet-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-white'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-richblack-700 text-richblack-300 hover:bg-red-600/20 hover:text-red-400 transition-colors">
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

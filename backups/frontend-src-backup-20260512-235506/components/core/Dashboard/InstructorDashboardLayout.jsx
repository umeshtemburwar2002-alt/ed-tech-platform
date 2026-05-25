import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import InstructorSidebar from './InstructorSidebar';
import DashboardNavbar from './DashboardNavbar';
import ErrorBoundary from '../../common/ErrorBoundary';

/**
 * InstructorDashboardLayout
 *
 * Removed the internal useEffect guard that called navigate('/login') when
 * user was null — that was a DUPLICATE of RoleRoute's guard and caused the
 * blank screen race condition:
 *
 *   RoleRoute passes (user is set) → Layout mounts → useEffect runs on first
 *   render → user might briefly be null due to React render order → navigate('/login')
 *   fires → loop → blank screen.
 *
 * The fix: RoleRoute (outside this layout) already guarantees we only render
 * this layout when user is a confirmed Instructor. No internal navigation needed.
 */
const InstructorDashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#000814] overflow-hidden">
      {/* Sidebar */}
      <InstructorSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#000814]">
          <div className="container mx-auto px-4 py-8 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorBoundary>
                  <Outlet />
                </ErrorBoundary>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboardLayout;

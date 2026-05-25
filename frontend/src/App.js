import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import RoleRoute from "./components/core/auth/RoleRoute";
import AppSkeleton from "./components/core/Loaders/AppSkeleton";
import { ThemeProvider } from "./context/ThemeContext";
import { subscribeSupabaseAuthToStore } from "./services/syncSupabaseSession";

import { publicRoutes } from "./routes/publicRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminLoginRoute, adminLayoutRoute } from "./routes/adminRoutes";
import { studentDashboardRoutes } from "./routes/studentDashboardRoutes";
import { instructorDashboardRoutes } from "./routes/instructorDashboardRoutes";
import { courseRoutes } from "./routes/courseRoutes";

const StudentDashboardLayout = React.lazy(() => import("./components/core/Dashboard/StudentDashboardLayout"));
const InstructorDashboardLayout = React.lazy(() => import("./components/core/Dashboard/InstructorDashboardLayout"));
const InstructorOnboarding = React.lazy(() => import("./components/onboarding/InstructorOnboarding"));
const ViewCourse = React.lazy(() => import("./pages/ViewCourse"));

const HIDE_NAVBAR_PREFIXES = ["/dashboard", "/instructor", "/view-course", "/admin"];

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeSupabaseAuthToStore(dispatch);
    return unsubscribe;
  }, [dispatch]);

  const showNavbar = !HIDE_NAVBAR_PREFIXES.some((p) => location.pathname.startsWith(p));

  return (
    <ThemeProvider>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative transition-colors duration-300 dark:bg-richblack-900">
        {showNavbar && <Navbar />}

        <div className="content-wrapper relative z-0">
          <div className="relative z-10">
            <Suspense fallback={<AppSkeleton />}>
              <Routes>
                {/* Public Routes */}
                {publicRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}

                {/* Auth Routes */}
                {authRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}

                {/* Admin Routes */}
                <Route path={adminLoginRoute.path} element={adminLoginRoute.element} />
                <Route path={adminLayoutRoute.path} element={adminLayoutRoute.element}>
                  {adminLayoutRoute.children.map((c) => (
                    <Route key={c.path} path={c.path} element={c.element} />
                  ))}
                </Route>

                {/* Student Dashboard */}
                <Route element={<PrivateRoute><RoleRoute allow={["Student"]}><StudentDashboardLayout /></RoleRoute></PrivateRoute>}>
                  {studentDashboardRoutes.map((r) => (
                    <Route key={r.path} path={r.path} element={r.element} />
                  ))}
                </Route>

                {/* Instructor Onboarding */}
                <Route
                  path="/instructor/setup"
                  element={<PrivateRoute><RoleRoute allow={["Instructor"]}><InstructorOnboarding /></RoleRoute></PrivateRoute>}
                />

                {/* Instructor Dashboard */}
                <Route element={<PrivateRoute><RoleRoute allow={["Instructor"]}><InstructorDashboardLayout /></RoleRoute></PrivateRoute>}>
                  {instructorDashboardRoutes.map((r) => (
                    <Route key={r.path} path={r.path} element={r.element} />
                  ))}
                </Route>

                {/* Course Viewing */}
                <Route
                  path="view-course/:courseId"
                  element={<PrivateRoute><ViewCourse /></PrivateRoute>}
                />

                {/* Dynamic Course Routes */}
                {courseRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

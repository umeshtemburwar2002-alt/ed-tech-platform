import React from "react";
import PrivateRoute from "../components/core/auth/PrivateRoute";
import RoleRoute from "../components/core/auth/RoleRoute";
import AdminOpenRoute from "../components/core/auth/AdminOpenRoute";
import AdminLayout from "../components/admin/AdminLayout";

const AdminLogin = React.lazy(() => import("../pages/admin/Login"));
const AdminDashboard = React.lazy(() => import("../pages/admin/Dashboard"));
const AdminUsers = React.lazy(() => import("../pages/admin/Users"));
const AdminCourses = React.lazy(() => import("../pages/admin/Courses"));
const AdminReports = React.lazy(() => import("../pages/admin/Reports"));

export const adminLoginRoute = {
  path: "/admin/login",
  element: <AdminOpenRoute><AdminLogin /></AdminOpenRoute>,
};

export const adminLayoutRoute = {
  path: "/admin",
  element: (
    <PrivateRoute>
      <RoleRoute allow={["Admin"]}>
        <AdminLayout />
      </RoleRoute>
    </PrivateRoute>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "users", element: <AdminUsers /> },
    { path: "courses", element: <AdminCourses /> },
    { path: "reports", element: <AdminReports /> },
  ],
};

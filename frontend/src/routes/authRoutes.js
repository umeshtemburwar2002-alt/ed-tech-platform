import React from "react";
import OpenRoute from "../components/core/auth/OpenRoute";

const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const StudentSignup = React.lazy(() => import("../components/auth/StudentSignup"));
const InstructorSignup = React.lazy(() => import("../components/auth/InstructorSignup"));
const SignupOffer = React.lazy(() => import("../pages/SignupOffer"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const PhoneVerification = React.lazy(() => import("../components/auth/PhoneVerification"));
const VerifyEmail = React.lazy(() => import("../pages/VerifyEmail"));
const UpdatePassword = React.lazy(() => import("../pages/UpdatePassword"));

export const authRoutes = [
  { path: "login", element: <OpenRoute><Login /></OpenRoute> },
  { path: "signup", element: <OpenRoute><Signup /></OpenRoute> },
  { path: "register/student", element: <OpenRoute><StudentSignup /></OpenRoute> },
  { path: "register/instructor", element: <OpenRoute><InstructorSignup /></OpenRoute> },
  { path: "signup-offer", element: <OpenRoute><SignupOffer /></OpenRoute> },
  { path: "forgot-password", element: <OpenRoute><ForgotPassword /></OpenRoute> },
  { path: "phone-verification", element: <OpenRoute><PhoneVerification /></OpenRoute> },
  { path: "verify-email", element: <VerifyEmail /> },
  { path: "update-password", element: <UpdatePassword /> },
];

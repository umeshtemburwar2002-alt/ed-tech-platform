import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PrivateRoute — guards any route that requires authentication.
 *
 * Decision table:
 * ┌─────────────────────────┬──────────────────────┬───────────────────────┐
 * │ authInitialized         │ token                │ Result                │
 * ├─────────────────────────┼──────────────────────┼───────────────────────┤
 * │ false                   │ any                  │ Spinner (never redir) │
 * │ true                    │ truthy               │ Render children       │
 * │ true                    │ null                 │ Navigate to /login    │
 * └─────────────────────────┴──────────────────────┴───────────────────────┘
 *
 * Why authInitialized matters:
 *   On first paint token=null because authSlice never hydrates from localStorage.
 *   Without the flag, PrivateRoute would immediately redirect to /login even for
 *   logged-in users, then onAuthStateChange fires → token set → OpenRoute
 *   redirects back → redirect loop → blank screen.
 *
 *   With the flag: we spin silently until onAuthStateChange fires (< 100ms).
 *   Only after that do we make a redirect decision.
 */
const Spinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] gap-4">
    <div className="w-10 h-10 border-2 border-white/10 border-t-[#00B4D8] rounded-full animate-spin" />
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">
      Verifying session…
    </p>
  </div>
);

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { token, authInitialized } = useSelector((s) => s.auth);

  // Auth check not yet complete — show spinner, never redirect
  if (!authInitialized) return <Spinner />;

  // Auth check done and we have a live JWT
  if (token) return children;

  // Auth check done and no session → send to login
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;

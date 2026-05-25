/**
 * AuthContext — thin compatibility wrapper.
 *
 * ⚠️  Previously this had its own onAuthStateChange listener which competed
 *     with subscribeSupabaseAuthToStore() in App.js. Two listeners racing
 *     each other meant the first SIGNED_OUT handler might not dispatch to
 *     Redux before the second one sets user back.
 *
 * Fix: AuthContext no longer manages auth state itself. It simply reads from
 * the Redux store (which is the single source of truth, fed by
 * subscribeSupabaseAuthToStore). This makes it a zero-cost adapter for any
 * old code that still uses `useAuth()`.
 *
 * Components that previously used `useAuth()` for user/logout will now
 * transparently read from Redux. No logic changes needed in those components.
 */
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { performLogout } from "../services/syncSupabaseSession";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const { token }  = useSelector((s) => s.auth);
  const { user }   = useSelector((s) => s.profile);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const logout = () => performLogout(dispatch, navigate);

  const value = {
    user,                          // app user from Redux (has accountType)
    loading:         false,        // no async loading — Redux is sync
    isAuthenticated: !!token,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

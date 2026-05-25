/**
 * Login Page — Role-based OAuth + Email/Password Authentication
 *
 * Flow:
 *  Step 1 → Role selection (Student / Instructor)
 *  Step 2 → Email/password form  OR  Google / GitHub OAuth
 *
 * Role is stored in sessionStorage under "oauth_selected_role"
 * and read back in OAuthCallback.jsx to set account_type.
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/operations/authAPI";
import {
  signInWithOAuth,
  OAUTH_ROLE_KEY,
} from "../services/operations/googleAuthAPI";
import RoleSelector from "../components/auth/RoleSelector";

// ─── Page-level animation variants ───────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const Login = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep] = useState(1); // 1 = role select, 2 = auth methods
  const [selectedRole, setSelectedRole] = useState(null); // "Student" | "Instructor"
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // "google" | "github" | null

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const isAnyLoading = !!oauthLoading || loading;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleRoleSelect = (role) => setSelectedRole(role);

  const handleContinue = () => {
    if (!selectedRole) return;
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setOauthLoading(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Store role so email login also knows what dashboard to go to
    sessionStorage.setItem(OAUTH_ROLE_KEY, selectedRole);
    dispatch(login(formData.email, formData.password, navigate, selectedRole));
  };

  const handleOAuth = async (provider) => {
    if (isAnyLoading) return;
    // ✅ Persist selected role BEFORE redirect — OAuthCallback reads this
    sessionStorage.setItem(OAUTH_ROLE_KEY, selectedRole);
    setOauthLoading(provider);
    try {
      await signInWithOAuth(provider);
    } finally {
      setOauthLoading(null); // only reachable on error (page navigates away on success)
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[45%] h-[45%] bg-blue-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[45%] h-[45%] bg-violet-900/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Card */}
        <div className="glass-dark rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">

          {/* ── Progress bar ─────────────────────────────────────────────────── */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00B4D8] to-violet-500"
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-8 md:p-10">

            {/* ── STEP 1: Role Selection ──────────────────────────────────── */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" {...fadeUp}>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
                      Step 1 of 2
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      Who are you?
                    </h1>
                    <p className="mt-2 text-slate-400 text-sm">
                      Select your role to get the right experience
                    </p>
                  </div>

                  {/* Role Cards */}
                  <RoleSelector
                    selectedRole={selectedRole}
                    onSelect={handleRoleSelect}
                    disabled={false}
                  />

                  {/* Continue Button */}
                  <motion.button
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className={`
                      mt-6 w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3
                      transition-all duration-300 relative overflow-hidden
                      ${selectedRole
                        ? "bg-gradient-to-r from-[#00B4D8] to-violet-500 text-white shadow-lg hover:shadow-[#00B4D8]/25 hover:scale-[1.01]"
                        : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                      }
                    `}
                    whileTap={selectedRole ? { scale: 0.98 } : undefined}
                  >
                    Continue as {selectedRole ?? "…"}
                    <i className="fas fa-arrow-right text-xs" />
                  </motion.button>

                  {/* Divider */}
                  <p className="mt-6 text-center text-slate-500 text-xs">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#00B4D8] font-bold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              )}

              {/* ── STEP 2: Auth Methods ────────────────────────────────────── */}
              {step === 2 && (
                <motion.div key="step2" {...fadeUp}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-7">
                    <button
                      onClick={handleBack}
                      className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Go back"
                    >
                      <i className="fas fa-arrow-left text-xs" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Step 2 of 2
                        </span>
                        <span className={`
                          text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full
                          ${selectedRole === "Instructor"
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-[#00B4D8]/20 text-[#00B4D8]"
                          }
                        `}>
                          {selectedRole}
                        </span>
                      </div>
                      <h1 className="text-xl font-bold text-white mt-0.5">
                        Sign in to continue
                      </h1>
                    </div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    <OAuthButton
                      provider="google"
                      label="Google"
                      icon="fab fa-google"
                      iconColor="text-red-400"
                      loading={oauthLoading === "google"}
                      disabled={isAnyLoading}
                      onClick={() => handleOAuth("google")}
                    />
                    <OAuthButton
                      provider="github"
                      label="GitHub"
                      icon="fab fa-github"
                      iconColor="text-white"
                      loading={oauthLoading === "github"}
                      disabled={isAnyLoading}
                      onClick={() => handleOAuth("github")}
                    />
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-[#000814] px-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
                        Or sign in with email
                      </span>
                    </div>
                  </div>

                  {/* Email/Password Form */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00B4D8] transition-colors">
                          <i className="fas fa-envelope text-xs" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isAnyLoading}
                          placeholder="name@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#00B4D8] text-white text-sm placeholder-slate-600 transition-all duration-300 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Password
                        </label>
                        <Link
                          to="/forgot-password"
                          className="text-[10px] font-bold text-[#00B4D8] hover:underline"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00B4D8] transition-colors">
                          <i className="fas fa-lock text-xs" />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isAnyLoading}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#00B4D8] text-white text-sm placeholder-slate-600 transition-all duration-300 disabled:opacity-50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                          tabIndex={-1}
                        >
                          <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-xs`} />
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isAnyLoading}
                      className="w-full mt-1 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B4D8] to-violet-500 text-white shadow-lg hover:shadow-[#00B4D8]/20 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Sign in as {selectedRole}
                          <i className="fas fa-arrow-right text-xs" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Footer */}
                  <p className="mt-6 text-center text-slate-500 text-xs">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-[#00B4D8] font-bold hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── OAuthButton — inline reusable sub-component ─────────────────────────────
const OAuthButton = ({ label, icon, iconColor, loading, disabled, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.02 } : undefined}
    whileTap={!disabled ? { scale: 0.97 } : undefined}
    className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200 font-bold text-slate-300 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : (
      <i className={`${icon} ${iconColor} text-sm`} />
    )}
    {label}
  </motion.button>
);

export default Login;

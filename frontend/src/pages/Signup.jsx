/**
 * Signup Page — Role-based registration
 *
 * Step 1: Animated role selection cards (Student / Instructor)
 * Step 2: Registration form + Google/GitHub OAuth
 *
 * Role is saved in:
 *  - formData.role (for email signup → profiles.account_type)
 *  - sessionStorage[OAUTH_ROLE_KEY] (for OAuth redirect → OAuthCallback reads it)
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { registerWithSupabase } from "../services/operations/authAPI";
import {
  signInWithOAuth,
  OAUTH_ROLE_KEY,
} from "../services/operations/googleAuthAPI";
import RoleSelector from "../components/auth/RoleSelector";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.22 } },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

function getPasswordStrength(pw) {
  if (!pw)          return { label: "", color: "bg-white/10", width: "0%" };
  if (pw.length < 6)  return { label: "Weak",   color: "bg-red-500",    width: "33%" };
  if (pw.length < 10) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
  return               { label: "Strong", color: "bg-cyan-500",  width: "100%" };
}

// ── Component ─────────────────────────────────────────────────────────────────
const Signup = () => {
  const [step, setStep]               = useState(1); // 1 = role, 2 = form
  const [selectedRole, setSelectedRole] = useState(null); // "Student" | "Instructor"
  const [formData, setFormData]       = useState(initialForm);
  const [showPw, setShowPw]           = useState(false);
  const [showCPw, setShowCPw]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [oauthLoading, setOauthLoading] = useState(null); // "google"|"github"|null

  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const isAnyLoading = loading || !!oauthLoading;

  // ── Input handlers ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  // ── Role continue ───────────────────────────────────────────────────────────
  const handleContinue = () => {
    if (!selectedRole) return;
    setStep(2);
  };

  // ── OAuth ───────────────────────────────────────────────────────────────────
  const handleOAuth = async (provider) => {
    if (isAnyLoading) return;
    sessionStorage.setItem(OAUTH_ROLE_KEY, selectedRole);
    setOauthLoading(provider);
    try {
      await signInWithOAuth(provider);
    } finally {
      setOauthLoading(null);
    }
  };

  // ── Form validation ─────────────────────────────────────────────────────────
  const validate = () => {
    const { firstName, lastName, email, contactNumber, password, confirmPassword, agreeTerms } = formData;
    const e = {};
    if (!firstName.trim())       e.firstName       = "First name is required";
    if (!lastName.trim())        e.lastName        = "Last name is required";
    if (!email.trim())           e.email           = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email  = "Invalid email format";
    if (!contactNumber.trim())   e.contactNumber   = "Phone number is required";
    else if (!/^\d+$/.test(contactNumber)) e.contactNumber = "Digits only";
    else if (contactNumber.length < 10)    e.contactNumber = "At least 10 digits";
    if (!password)               e.password        = "Password is required";
    else if (password.length < 6) e.password       = "At least 6 characters";
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!agreeTerms)             e.agreeTerms      = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Email signup ────────────────────────────────────────────────────────────
  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(
      setSignupData({
        ...formData,
        accountType: selectedRole, // "Student" | "Instructor"
      })
    );
    dispatch(registerWithSupabase(navigate));
  };

  const strength = getPasswordStrength(formData.password);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[45%] h-[45%] bg-blue-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[45%] h-[45%] bg-violet-900/15 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Card */}
        <div className="glass-dark rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">

          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00B4D8] to-violet-500"
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Role Selection ──────────────────────────────── */}
              {step === 1 && (
                <motion.div key="step1" {...fadeUp}>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
                      Step 1 of 2 — Create Account
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      I want to join as…
                    </h1>
                    <p className="mt-2 text-slate-400 text-sm">
                      Choose your role to get the right experience
                    </p>
                  </div>

                  <RoleSelector
                    selectedRole={selectedRole}
                    onSelect={setSelectedRole}
                    disabled={false}
                  />

                  <motion.button
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className={`
                      mt-6 w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2
                      transition-all duration-300
                      ${selectedRole
                        ? "bg-gradient-to-r from-[#00B4D8] to-violet-500 text-white shadow-lg hover:scale-[1.01]"
                        : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                      }
                    `}
                    whileTap={selectedRole ? { scale: 0.98 } : undefined}
                  >
                    Continue as {selectedRole ?? "…"}
                    <i className="fas fa-arrow-right text-xs" />
                  </motion.button>

                  <p className="mt-6 text-center text-slate-500 text-xs">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#00B4D8] font-bold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              )}

              {/* ── STEP 2: Registration Form ───────────────────────────── */}
              {step === 2 && (
                <motion.div key="step2" {...fadeUp}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-7">
                    <button
                      onClick={() => { setStep(1); setErrors({}); }}
                      className="w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Back"
                    >
                      <i className="fas fa-arrow-left text-xs" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Step 2 of 2
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full
                          ${selectedRole === "Instructor"
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-[#00B4D8]/20 text-[#00B4D8]"
                          }`}
                        >
                          {selectedRole}
                        </span>
                      </div>
                      <h1 className="text-xl font-bold text-white mt-0.5">Create your account</h1>
                    </div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <OAuthBtn
                      label="Google"
                      icon="fab fa-google"
                      iconColor="text-red-400"
                      loading={oauthLoading === "google"}
                      disabled={isAnyLoading}
                      onClick={() => handleOAuth("google")}
                    />
                    <OAuthBtn
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
                        Or register with email
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSignup} className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="First Name"
                        name="firstName"
                        icon="fa-user"
                        placeholder="John"
                        value={formData.firstName}
                        error={errors.firstName}
                        onChange={handleChange}
                        disabled={isAnyLoading}
                      />
                      <Field
                        label="Last Name"
                        name="lastName"
                        icon="fa-user"
                        placeholder="Doe"
                        value={formData.lastName}
                        error={errors.lastName}
                        onChange={handleChange}
                        disabled={isAnyLoading}
                      />
                    </div>

                    {/* Email */}
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      icon="fa-envelope"
                      placeholder="name@example.com"
                      value={formData.email}
                      error={errors.email}
                      onChange={handleChange}
                      disabled={isAnyLoading}
                    />

                    {/* Phone */}
                    <Field
                      label="Phone Number"
                      name="contactNumber"
                      type="tel"
                      icon="fa-phone"
                      placeholder="10-digit number"
                      value={formData.contactNumber}
                      error={errors.contactNumber}
                      onChange={handleChange}
                      disabled={isAnyLoading}
                      maxLength={15}
                      inputMode="numeric"
                    />

                    {/* Password row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Password */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                          Password
                        </label>
                        <div className="relative group">
                          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${errors.password ? "text-red-400" : "text-slate-600 group-focus-within:text-[#00B4D8]"}`}>
                            <i className="fas fa-lock" />
                          </span>
                          <input
                            type={showPw ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isAnyLoading}
                            placeholder="••••••••"
                            className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/5 focus:outline-none text-white text-sm placeholder-slate-600 transition-all ${errors.password ? "border-red-500/50" : "border-white/10 focus:border-[#00B4D8]"} disabled:opacity-50`}
                          />
                          <button type="button" onClick={() => setShowPw(!showPw)} tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
                            <i className={`fas ${showPw ? "fa-eye-slash" : "fa-eye"} text-xs`} />
                          </button>
                        </div>
                        {/* Strength bar */}
                        {formData.password && (
                          <div className="mt-1.5">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                animate={{ width: strength.width }}
                                className={`h-full ${strength.color} transition-all`}
                              />
                            </div>
                            <p className={`text-[10px] mt-0.5 font-bold uppercase ${strength.color.replace("bg-","text-").replace("500","400")}`}>
                              {strength.label}
                            </p>
                          </div>
                        )}
                        {errors.password && <p className="mt-1 text-[10px] font-bold text-red-400">{errors.password}</p>}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                          Confirm
                        </label>
                        <div className="relative group">
                          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${errors.confirmPassword ? "text-red-400" : "text-slate-600 group-focus-within:text-[#00B4D8]"}`}>
                            <i className="fas fa-check-circle" />
                          </span>
                          <input
                            type={showCPw ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isAnyLoading}
                            placeholder="••••••••"
                            className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/5 focus:outline-none text-white text-sm placeholder-slate-600 transition-all ${errors.confirmPassword ? "border-red-500/50" : "border-white/10 focus:border-[#00B4D8]"} disabled:opacity-50`}
                          />
                          <button type="button" onClick={() => setShowCPw(!showCPw)} tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
                            <i className={`fas ${showCPw ? "fa-eye-slash" : "fa-eye"} text-xs`} />
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-[10px] font-bold text-red-400">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-[#00B4D8] cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor="agreeTerms" className="text-xs text-slate-400 cursor-pointer leading-relaxed">
                        I agree to the{" "}
                        <Link to="/legal/terms-of-service" className="text-[#00B4D8] hover:underline font-bold">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/legal/privacy-policy" className="text-[#00B4D8] hover:underline font-bold">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.agreeTerms && (
                      <p className="text-[10px] font-bold text-red-400">{errors.agreeTerms}</p>
                    )}

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
                          Create {selectedRole} Account
                          <i className="fas fa-arrow-right text-xs" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-slate-500 text-xs">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#00B4D8] font-bold hover:underline">
                      Sign in
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

// ── Reusable Field component ──────────────────────────────────────────────────
const Field = ({ label, name, type = "text", icon, placeholder, value, error, onChange, disabled, maxLength, inputMode }) => (
  <div>
    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${error ? "text-red-400" : "text-slate-600 group-focus-within:text-[#00B4D8]"}`}>
        <i className={`fas ${icon}`} />
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/5 focus:outline-none text-white text-sm placeholder-slate-600 transition-all duration-300 ${error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#00B4D8]"} disabled:opacity-50`}
      />
    </div>
    {error && <p className="mt-1 text-[10px] font-bold text-red-400">{error}</p>}
  </div>
);

// ── OAuthBtn component ────────────────────────────────────────────────────────
const OAuthBtn = ({ label, icon, iconColor, loading, disabled, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.02 } : undefined}
    whileTap={!disabled ? { scale: 0.97 } : undefined}
    className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all font-bold text-slate-300 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : (
      <i className={`${icon} ${iconColor} text-sm`} />
    )}
    {label}
  </motion.button>
);

export default Signup;

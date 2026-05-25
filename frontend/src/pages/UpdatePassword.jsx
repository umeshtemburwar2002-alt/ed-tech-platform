import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../config/supabaseClient";

function UpdatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [busy, setBusy] = useState(false);

  const { password, confirmPassword } = formData;

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session?.user) {
        toast.error(
          "Open this page from the link in your Supabase password reset email."
        );
      }
      setCheckingSession(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You can sign in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to update password");
    } finally {
      setBusy(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "bg-white/10", width: "0%" };
    if (password.length < 6)
      return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (password.length < 10)
      return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-cyan-500", width: "100%" };
  };

  const strength = getPasswordStrength(password);

  if (checkingSession) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#000814] text-slate-400">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cyan-500/10 text-[#00B4D8] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,180,216,0.1)]">
            <i className="fas fa-lock-open text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Set New Password
          </h1>
          <p className="mt-2 text-slate-400 text-sm font-medium">
            Uses your Supabase recovery session from the reset email link.
          </p>
        </div>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              New Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00B4D8] transition-colors">
                <i className="fas fa-lock"></i>
              </span>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="••••••••"
                className="input-field pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Strength
                </span>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    strength.label === "Strong"
                      ? "text-cyan-400"
                      : strength.label === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: strength.width }}
                  className={`h-full ${strength.color} transition-all duration-500 shadow-[0_0_10px_rgba(0,180,216,0.3)]`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Confirm Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00B4D8] transition-colors">
                <i className="fas fa-check-circle"></i>
              </span>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="••••••••"
                className="input-field pl-12"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy || !password || password !== confirmPassword}
            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 group"
          >
            {busy ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Reset Password{" "}
                <i className="fas fa-sync-alt text-sm group-hover:rotate-180 transition-transform duration-500"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-slate-400 hover:text-[#00B4D8] font-bold text-sm transition-all group"
          >
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>{" "}
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdatePassword;

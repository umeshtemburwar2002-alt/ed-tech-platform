/**
 * ForgotPassword — /forgot-password
 *
 * Sends a real Supabase password recovery email.
 * Supabase emails the user a link → clicking it opens /update-password
 * where they set their new password via supabase.auth.updateUser().
 *
 * No fake OTP — uses production Supabase resetPasswordForEmail().
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordRecoveryEmail } from "../services/operations/authAPI";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
const ForgotPassword = () => {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);     // true after successful dispatch
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    const ok = await dispatch(sendPasswordRecoveryEmail(email));
    if (ok) setSent(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-cyan-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-violet-900/15 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-dark rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
          {/* Accent line */}
          <div className="h-0.5 bg-gradient-to-r from-[#00B4D8] to-violet-500" />

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Enter email ──────────────────────────────── */}
              {!sent && (
                <motion.div key="form" {...fadeUp} className="space-y-6">
                  {/* Icon */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00B4D8]/10 text-[#00B4D8] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00B4D8]/20 shadow-[0_0_20px_rgba(0,180,216,0.1)]">
                      <i className="fas fa-key text-2xl" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      Forgot Password?
                    </h1>
                    <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                      No worries. Enter your email and we'll send a secure reset link.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00B4D8] transition-colors text-xs">
                          <i className="fas fa-envelope" />
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                          placeholder="name@example.com"
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-[#00B4D8] text-white text-sm placeholder-slate-600 transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !isValidEmail(email)}
                      className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B4D8] to-violet-500 text-white shadow-lg hover:shadow-[#00B4D8]/20 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Reset Link
                          <i className="fas fa-paper-plane text-xs" />
                        </>
                      )}
                    </button>
                  </form>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-slate-400 hover:text-[#00B4D8] font-bold text-sm transition-all group"
                  >
                    <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </Link>
                </motion.div>
              )}

              {/* ── STEP 2: Email sent success ───────────────────────── */}
              {sent && (
                <motion.div key="sent" {...fadeUp} className="text-center space-y-6">
                  {/* Animated success icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="w-20 h-20 bg-green-500/10 border border-green-500/25 rounded-full flex items-center justify-center mx-auto"
                  >
                    <motion.i
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                      className="fas fa-envelope-circle-check text-green-400 text-3xl"
                    />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We've sent a password reset link to{" "}
                      <span className="text-white font-bold">{email}</span>.
                      <br />
                      Click the link in the email to set a new password.
                    </p>
                  </div>

                  {/* Info boxes */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <i className="fas fa-clock text-[#00B4D8] text-sm mt-0.5" />
                      <p className="text-xs text-slate-400">
                        The link expires in <span className="text-white font-bold">1 hour</span>.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <i className="fas fa-folder text-violet-400 text-sm mt-0.5" />
                      <p className="text-xs text-slate-400">
                        If you don't see it, check your <span className="text-white font-bold">spam or junk</span> folder.
                      </p>
                    </div>
                  </div>

                  {/* Resend */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => { setSent(false); }}
                      className="w-full py-3 rounded-2xl font-bold text-sm border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Try a different email
                    </button>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 text-slate-400 hover:text-[#00B4D8] font-bold text-sm transition-all group"
                    >
                      <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
                      Back to Login
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Security badge */}
        <p className="text-center text-slate-600 text-[11px] mt-4 flex items-center justify-center gap-1.5">
          <i className="fas fa-shield-alt text-[#00B4D8]/50" />
          Secured by Supabase Auth · TLS encrypted
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
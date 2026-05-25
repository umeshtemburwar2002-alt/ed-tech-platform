import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendSignupConfirmation } from "../services/operations/authAPI";

function VerifyEmail() {
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData?.email) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleResend = () => {
    dispatch(resendSignupConfirmation(signupData?.email));
  };

  const email = signupData?.email ?? "";

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
            <i className="fas fa-envelope-open-text text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Confirm your email
          </h1>
          <p className="mt-4 text-slate-400 text-sm font-medium leading-relaxed">
            We sent a verification link from Supabase to{" "}
            <span className="text-white font-bold">{email}</span>. Please open it
            to activate your account, then return here to log in.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleResend}
            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Resend confirmation email{" "}
                <i className="fas fa-redo-alt text-sm group-hover:rotate-180 transition-transform duration-500" />
              </>
            )}
          </button>

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 text-[#00B4D8] font-bold text-sm hover:bg-white/5 transition-all"
          >
            Go to Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-all group"
          >
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
            Back to Signup
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;

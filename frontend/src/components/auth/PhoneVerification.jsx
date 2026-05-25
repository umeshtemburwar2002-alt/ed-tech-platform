import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../../services/auth";
import { setUser } from "../../slices/profileSlice";
import { toast } from "react-hot-toast";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: input phone, 2: input otp
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const onSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }

    try {
      setLoading(true);
      // Initialize reCAPTCHA
      authService.setupRecaptcha("recaptcha-container");
      
      const result = await authService.signInWithPhone(phoneNumber);
      setConfirmationResult(result);
      setStep(2);
      setTimer(60);
      toast.success("Verification code sent!");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      setLoading(true);
      const user = await authService.confirmPhoneOtp(confirmationResult, otp);
      
      // Successfully verified, now complete the login process
      const u = {
        firstName: "User",
        lastName: user.phoneNumber,
        email: "",
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${user.phoneNumber}`,
        accountType: "Student",
        phoneNumber: user.phoneNumber
      };
      
      dispatch(setUser(u));
      localStorage.setItem("user", JSON.stringify(u));
      
      toast.success("Phone verified successfully!");
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000814] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-richblack-800 p-8">
        <h1 className="text-2xl font-bold text-white text-center">
          {step === 1 ? "Phone Login" : "Verify Phone"}
        </h1>
        <p className="mt-2 text-center text-sm text-richblack-300">
          {step === 1 
            ? "Enter your phone number to receive an OTP" 
            : `Enter the 6-digit code sent to ${phoneNumber}`}
        </p>

        {step === 1 ? (
          <form className="mt-6 space-y-4" onSubmit={onSendOtp}>
            <div>
              <label className="block text-sm text-richblack-200">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="mt-1 w-full rounded-lg border border-white/10 bg-richblack-900 px-3 py-2 text-white placeholder-richblack-400 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              />
              <p className="mt-1 text-xs text-richblack-400">Include country code (e.g., +1 for USA)</p>
            </div>
            
            <div id="recaptcha-container"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onVerifyOtp}>
            <div>
              <label className="block text-sm text-richblack-200">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="mt-1 w-full rounded-lg border border-white/10 bg-richblack-900 px-3 py-2 text-white text-center text-2xl tracking-widest placeholder-richblack-400 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-richblack-400">Resend code in {timer}s</p>
              ) : (
                <button
                  type="button"
                  onClick={onSendOtp}
                  className="text-sm text-yellow-50 font-medium"
                >
                  Resend Code
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-richblack-300 hover:text-white mt-2"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneVerification;

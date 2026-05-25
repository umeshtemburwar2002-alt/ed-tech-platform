const express = require("express");
const router = express.Router();

// Import Auth Controllers
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

// Import Reset Password Controllers
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Import Auth Middleware
const { auth } = require("../middleware/auth");

// ================================
// AUTH ROUTES
// ================================

// Login Route
router.post("/login", login);

// Signup Route
router.post("/signup", signUp);

// Send OTP Route
router.post("/sendotp", sendOTP);

// Change Password Route (Protected)
router.post("/changepassword", auth, changePassword);

// ================================
// RESET PASSWORD ROUTES
// ================================

// Generate Reset Password Token
router.post("/reset-password-token", resetPasswordToken);

// Reset Password
router.post("/reset-password", resetPassword);

// ================================
// EXPORT ROUTER
// ================================

module.exports = router;
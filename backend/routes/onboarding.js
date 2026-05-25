const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");
const {
  getOnboardingStatus,
  saveOnboardingStep,
  getOnboardingStep,
  completeOnboarding,
  getDraftData,
} = require("../controllers/onboardingController");

// All routes require authentication
router.use(auth);

// Get onboarding status
router.get("/status", getOnboardingStatus);

// Get draft data
router.get("/draft", getDraftData);

// Save onboarding step
router.post("/step/:step", saveOnboardingStep);

// Get onboarding step data
router.get("/step/:step", getOnboardingStep);

// Complete onboarding
router.post("/complete", completeOnboarding);

module.exports = router;

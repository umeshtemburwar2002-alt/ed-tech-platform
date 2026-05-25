const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getInstructorProfile,
  createInstructorProfile,
  updateInstructorProfile,
  getProfileCompletion,
  getAIInstructorScore,
} = require("../controllers/instructorController");

// All routes require authentication
router.use(auth);

// Get instructor profile
router.get("/profile", getInstructorProfile);

// Create instructor profile
router.post("/profile", createInstructorProfile);

// Update instructor profile
router.put("/profile", updateInstructorProfile);

// Get profile completion percentage
router.get("/profile/completion", getProfileCompletion);

// Get AI instructor score
router.get("/score", getAIInstructorScore);

module.exports = router;

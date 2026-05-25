const supabase = require("../config/supabase");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { calculateInstructorScore } = require("../utils/aiScoring");

// Get instructor profile
exports.getInstructorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error } = await supabase
      .from("instructors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No instructor profile yet
        return res.status(200).json({
          success: true,
          data: null,
          message: "No instructor profile found",
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor profile",
      error: error.message,
    });
  }
};

// Create instructor profile
exports.createInstructorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("instructors")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Instructor profile already exists",
      });
    }

    // Create new profile
    const { data: instructor, error } = await supabase
      .from("instructors")
      .insert([
        {
          user_id: userId,
          onboarding_status: "in_progress",
          onboarding_step: 1,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      data: instructor,
      message: "Instructor profile created",
    });
  } catch (error) {
    console.error("Error creating instructor profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create instructor profile",
      error: error.message,
    });
  }
};

// Update instructor profile
exports.updateInstructorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Remove sensitive fields
    delete updates.user_id;
    delete updates.id;
    delete updates.verification_status;
    delete updates.is_verified;

    // Add updated_at timestamp
    updates.updated_at = new Date().toISOString();

    const { data: instructor, error } = await supabase
      .from("instructors")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    // Calculate profile completion
    const completionPercentage = calculateProfileCompletion(instructor);
    
    // Update completion percentage
    await supabase
      .from("instructors")
      .update({ profile_completion_percentage: completionPercentage })
      .eq("id", instructor.id);

    return res.status(200).json({
      success: true,
      data: instructor,
      message: "Instructor profile updated",
    });
  } catch (error) {
    console.error("Error updating instructor profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update instructor profile",
      error: error.message,
    });
  }
};

// Get profile completion percentage
exports.getProfileCompletion = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error } = await supabase
      .from("instructors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(200).json({
          success: true,
          percentage: 0,
        });
      }
      throw error;
    }

    const percentage = calculateProfileCompletion(instructor);

    return res.status(200).json({
      success: true,
      percentage,
      data: instructor,
    });
  } catch (error) {
    console.error("Error getting profile completion:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get profile completion",
      error: error.message,
    });
  }
};

// Get AI instructor score
exports.getAIInstructorScore = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error } = await supabase
      .from("instructors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    // Calculate AI score
    const score = await calculateInstructorScore(instructor);

    // Update score in database
    await supabase
      .from("instructors")
      .update({ ai_instructor_score: score })
      .eq("id", instructor.id);

    return res.status(200).json({
      success: true,
      score,
      data: instructor,
    });
  } catch (error) {
    console.error("Error calculating AI score:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to calculate AI score",
      error: error.message,
    });
  }
};

// Helper function to calculate profile completion
function calculateProfileCompletion(instructor) {
  const fields = [
    "full_name",
    "headline",
    "bio",
    "profile_photo_url",
    "country",
    "city",
    "languages",
    "skills",
    "experience_years",
    "profession",
    "company",
    "resume_url",
    "portfolio_website",
    "linkedin_url",
    "github_url",
    "youtube_url",
    "teaching_categories",
    "course_language",
    "teaching_experience_years",
    "certifications",
    "students_taught",
    "sample_video_url",
    "government_id_url",
    "face_verification_url",
    "phone_number",
    "bank_account_number",
    "bank_ifsc_code",
    "upi_id",
    "paypal_email",
    "gst_number",
  ];

  let filledFields = 0;

  fields.forEach((field) => {
    const value = instructor[field];
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      filledFields++;
    }
  });

  return Math.round((filledFields / fields.length) * 100);
}

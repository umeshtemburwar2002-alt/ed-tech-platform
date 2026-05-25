const supabase = require("../config/supabase");
const { sendOnboardingEmail } = require("../utils/emailService");

// Get onboarding status
exports.getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error } = await supabase
      .from("instructors")
      .select("id, onboarding_status, onboarding_step, profile_completion_percentage")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(200).json({
          success: true,
          status: "not_started",
          step: 0,
          percentage: 0,
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      status: instructor.onboarding_status,
      step: instructor.onboarding_step,
      percentage: instructor.profile_completion_percentage,
    });
  } catch (error) {
    console.error("Error getting onboarding status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get onboarding status",
      error: error.message,
    });
  }
};

// Save onboarding step
exports.saveOnboardingStep = async (req, res) => {
  try {
    const userId = req.user.id;
    const { step, data } = req.body;

    if (!step || !data) {
      return res.status(400).json({
        success: false,
        message: "Step and data are required",
      });
    }

    // Get instructor
    const { data: instructor, error: instructorError } = await supabase
      .from("instructors")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (instructorError) throw instructorError;

    // Save step data
    const { error: stepError } = await supabase
      .from("onboarding_steps")
      .upsert(
        {
          instructor_id: instructor.id,
          step_number: step,
          step_name: getStepName(step),
          data,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "instructor_id,step_number" }
      );

    if (stepError) throw stepError;

    // Update instructor onboarding step
    await supabase
      .from("instructors")
      .update({
        onboarding_step: step,
        updated_at: new Date().toISOString(),
      })
      .eq("id", instructor.id);

    return res.status(200).json({
      success: true,
      message: `Step ${step} saved successfully`,
    });
  } catch (error) {
    console.error("Error saving onboarding step:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save onboarding step",
      error: error.message,
    });
  }
};

// Get onboarding step data
exports.getOnboardingStep = async (req, res) => {
  try {
    const userId = req.user.id;
    const { step } = req.params;

    const { data: instructor, error: instructorError } = await supabase
      .from("instructors")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (instructorError) throw instructorError;

    const { data: stepData, error: stepError } = await supabase
      .from("onboarding_steps")
      .select("*")
      .eq("instructor_id", instructor.id)
      .eq("step_number", parseInt(step))
      .single();

    if (stepError && stepError.code !== "PGRST116") throw stepError;

    return res.status(200).json({
      success: true,
      data: stepData || null,
    });
  } catch (error) {
    console.error("Error getting onboarding step:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get onboarding step",
      error: error.message,
    });
  }
};

// Complete onboarding
exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error: instructorError } = await supabase
      .from("instructors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (instructorError) throw instructorError;

    // Update onboarding status
    const { data: updated, error: updateError } = await supabase
      .from("instructors")
      .update({
        onboarding_status: "completed",
        onboarding_step: 6,
        onboarding_completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", instructor.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Send completion email
    try {
      await sendOnboardingEmail(instructor.email, "completed");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to complete onboarding",
      error: error.message,
    });
  }
};

// Get draft data
exports.getDraftData = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: instructor, error: instructorError } = await supabase
      .from("instructors")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (instructorError) {
      if (instructorError.code === "PGRST116") {
        return res.status(200).json({
          success: true,
          data: null,
        });
      }
      throw instructorError;
    }

    const { data: steps, error: stepsError } = await supabase
      .from("onboarding_steps")
      .select("*")
      .eq("instructor_id", instructor.id)
      .order("step_number", { ascending: true });

    if (stepsError) throw stepsError;

    // Combine all step data
    const draftData = {};
    steps.forEach((step) => {
      draftData[`step${step.step_number}`] = step.data;
    });

    return res.status(200).json({
      success: true,
      data: draftData,
    });
  } catch (error) {
    console.error("Error getting draft data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get draft data",
      error: error.message,
    });
  }
};

// Helper function to get step name
function getStepName(step) {
  const names = {
    1: "Basic Profile",
    2: "Professional Information",
    3: "Teaching Information",
    4: "Verification",
    5: "Payment Setup",
    6: "Final Review",
  };
  return names[step] || `Step ${step}`;
}

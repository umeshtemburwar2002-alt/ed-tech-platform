const supabase = require("../config/supabase");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { sanitizeArray } = require("../utils/arrayUtils");

// Create Course
exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,
            category,
            status,
            instructions: _instructions,
        } = req.body;

        const thumbnail = req.files.thumbnailImage;
        const tag = sanitizeArray(_tag);
        const instructions = sanitizeArray(_instructions);
        const whatYouWillLearnSanitized = sanitizeArray(whatYouWillLearn);

        console.log("Course create payload sanitized:", {
            title: courseName,
            description: courseDescription,
            tags: tag,
            instructions: instructions,
            what_you_will_learn: whatYouWillLearnSanitized
        });

        if (!courseName || !courseDescription || !price || !tag.length || !thumbnail || !category || !instructions.length) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const instructorId = req.user.id;

        // Upload to Cloudinary (Keeping Cloudinary for now, but can switch to Supabase Storage)
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Insert course into Supabase with title/description (matches user's live database)
        const { data: newCourse, error } = await supabase
            .from('courses')
            .insert([{
                title: courseName,
                description: courseDescription,
                instructor_id: instructorId,
                what_you_will_learn: whatYouWillLearnSanitized,
                price: Number(price),
                tags: tag,
                category_id: category,
                thumbnail: thumbnailImage.secure_url,
                status: status || 'draft',
                instructions: instructions,
            }])
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const { data: allCourses, error } = await supabase
            .from('courses')
            .select('*, instructor:instructor_id(first_name, last_name, image, avatar_url)')
            .eq('status', 'published'); // lowercase to match constraint

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        });
    }
};

// Get course details
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { data: course, error } = await supabase
            .from('courses')
            .select(`
                *,
                instructor:instructor_id(*),
                category:category_id(*),
                sections:sections(*, sub_sections:sub_sections(*))
            `)
            .eq('id', courseId)
            .single();

        if (error) throw error;

        // Calculate total duration (Simplified for Supabase refactor)
        let totalDuration = "0m"; 

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: {
                courseDetails: course,
                totalDuration,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Instructor Courses
exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*')
            .eq('instructor_id', instructorId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', courseId);

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// Edit Course (instructor only — req.user set by auth middleware)
exports.editCourse = async (req, res) => {
    try {
        const { courseId, ...updates } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        // Map camelCase fields to snake_case columns (uses title/description for user's live database)
        const patch = {};
        if (updates.courseName)        patch.title              = updates.courseName;
        if (updates.courseDescription) patch.description        = updates.courseDescription;
        if (updates.price !== undefined) patch.price            = Number(updates.price);
        if (updates.whatYouWillLearn)  patch.what_you_will_learn = sanitizeArray(updates.whatYouWillLearn);
        if (updates.tag)               patch.tags               = sanitizeArray(updates.tag);
        if (updates.category)          patch.category_id        = updates.category;
        if (updates.status)            patch.status             = updates.status; // "Draft" or "Published" (capitalized)
        if (updates.instructions)      patch.instructions       = sanitizeArray(updates.instructions);

        // Handle optional thumbnail upload
        if (req.files?.thumbnailImage) {
            const { uploadImageToCloudinary } = require("../utils/imageUploader");
            const img = await uploadImageToCloudinary(req.files.thumbnailImage, process.env.FOLDER_NAME);
            patch.thumbnail = img.secure_url;
        }

        patch.updated_at = new Date().toISOString();

        const { data: updatedCourse, error } = await supabase
            .from("courses")
            .update(patch)
            .eq("id", courseId)
            .eq("instructor_id", req.user.id) // prevent editing another instructor's course
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error("editCourse error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
        });
    }
};

// Get Full Course Details (authenticated — same deep query as getCourseDetails)
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        const { data: course, error } = await supabase
            .from("courses")
            .select(`
                *,
                instructor:instructor_id(*),
                category:category_id(*),
                sections:sections(*, sub_sections:sub_sections(*))
            `)
            .eq("id", courseId)
            .single();

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: { courseDetails: course },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


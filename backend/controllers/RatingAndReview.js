const supabase = require("../config/supabase");

// Create Rating
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        // 1. Check if user is enrolled
        const { data: enrollment, error: enrollError } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (enrollError || !enrollment) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        // 2. Check if user already reviewed
        const { data: existingReview } = await supabase
            .from('ratings_reviews')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (existingReview) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user",
            });
        }

        // 3. Create rating and review
        const { data: ratingReview, error: reviewError } = await supabase
            .from('ratings_reviews')
            .insert([{
                rating,
                review,
                course_id: courseId,
                user_id: userId,
            }])
            .select()
            .single();

        if (reviewError) throw reviewError;

        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Average Rating
exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        const { data, error } = await supabase
            .from('ratings_reviews')
            .select('rating')
            .eq('course_id', courseId);

        if (error) throw error;

        if (data && data.length > 0) {
            const avgRating = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
            return res.status(200).json({
                success: true,
                averageRating: avgRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no ratings given till now",
            averageRating: 0,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all ratings and reviews
exports.getAllRating = async (req, res) => {
    try {
        const { data: allReviews, error } = await supabase
            .from('ratings_reviews')
            .select('*, profiles(first_name, last_name, email, image), courses(title)')
            .order('rating', { ascending: false });

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

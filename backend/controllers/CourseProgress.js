const supabase = require("../config/supabase");

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    try {
        // 1. Fetch current progress
        const { data: progress, error } = await supabase
            .from('course_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows found'

        if (!progress) {
            // Create initial progress if it doesn't exist
            const { error: insertError } = await supabase
                .from('course_progress')
                .insert([{
                    user_id: userId,
                    course_id: courseId,
                    completed_videos: [subsectionId]
                }]);
            
            if (insertError) throw insertError;
        } else {
            // Update existing progress
            if (progress.completed_videos.includes(subsectionId)) {
                return res.status(400).json({ error: "Subsection already completed" });
            }

            const { error: updateError } = await supabase
                .from('course_progress')
                .update({
                    completed_videos: [...progress.completed_videos, subsectionId],
                    updated_at: new Date().toISOString()
                })
                .eq('id', progress.id);

            if (updateError) throw updateError;
        }

        return res.status(200).json({ success: true, message: "Course progress updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

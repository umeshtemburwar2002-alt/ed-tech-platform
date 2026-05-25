const supabase = require("../config/supabase");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties",
            });
        }
        
        const { data: newSection, error } = await supabase
            .from('sections')
            .insert([{ section_name: sectionName, course_id: courseId }])
            .select()
            .single();

        if (error) throw error;

        // Fetch updated course with all sections
        const { data: updatedCourse, error: courseError } = await supabase
            .from('courses')
            .select('*, sections(*, sub_sections(*))')
            .eq('id', courseId)
            .single();

        if (courseError) throw courseError;

        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;
        
        const { error } = await supabase
            .from('sections')
            .update({ section_name: sectionName })
            .eq('id', sectionId);

        if (error) throw error;

        const { data: updatedCourse, error: courseError } = await supabase
            .from('courses')
            .select('*, sections(*, sub_sections(*))')
            .eq('id', courseId)
            .single();

        if (courseError) throw courseError;

        res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message,
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;
        
        const { error } = await supabase
            .from('sections')
            .delete()
            .eq('id', sectionId);

        if (error) throw error;

        const { data: updatedCourse, error: courseError } = await supabase
            .from('courses')
            .select('*, sections(*, sub_sections(*))')
            .eq('id', courseId)
            .single();

        if (courseError) throw courseError;

        res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: error.message,
        });
    }
};

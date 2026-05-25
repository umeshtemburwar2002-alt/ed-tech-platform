const supabase = require("../config/supabase");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create SubSection
exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body;
        const video = req.files.video;
        
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Upload to Cloudinary (Keeping for now)
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        
        const { data: subSection, error } = await supabase
            .from('sub_sections')
            .insert([{
                section_id: sectionId,
                title: title,
                time_duration: `${uploadDetails.duration}`,
                description: description,
                video_url: uploadDetails.secure_url,
            }])
            .select()
            .single();

        if (error) throw error;

        const { data: updatedSection, error: sectionError } = await supabase
            .from('sections')
            .select('*, sub_sections(*)')
            .eq('id', sectionId)
            .single();

        if (sectionError) throw sectionError;

        return res.status(200).json({
            success: true,
            message: "Sub-section created successfully",
            data: updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;
        
        let updateData = { title, description };
        
        if (req.files && req.files.video) {
            const uploadDetails = await uploadImageToCloudinary(req.files.video, process.env.FOLDER_NAME);
            updateData.video_url = uploadDetails.secure_url;
            updateData.time_duration = `${uploadDetails.duration}`;
        }

        const { error } = await supabase
            .from('sub_sections')
            .update(updateData)
            .eq('id', subSectionId);

        if (error) throw error;

        const { data: updatedSection, error: sectionError } = await supabase
            .from('sections')
            .select('*, sub_sections(*)')
            .eq('id', sectionId)
            .single();

        if (sectionError) throw sectionError;

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
            error: error.message
        })
    }
}

// Delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        
        const { error } = await supabase
            .from('sub_sections')
            .delete()
            .eq('id', subSectionId);

        if (error) throw error;

        const { data: updatedSection, error: sectionError } = await supabase
            .from('sections')
            .select('*, sub_sections(*)')
            .eq('id', sectionId)
            .single();

        if (sectionError) throw sectionError;

        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
            error: error.message
        })
    }
}
